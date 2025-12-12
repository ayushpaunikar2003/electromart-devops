terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
    http = { source = "hashicorp/http", version = "~> 3.0" }
  }
}

provider "aws" {
  region = var.region
}

data "http" "my_public_ip" {
  url = "http://ipv4.icanhazip.com"
}

locals {
  common_tags = {
    Project = var.project
    Env     = var.environment
  }
  my_current_ip = "${chomp(data.http.my_public_ip.response_body)}/32"
}

# -----------------------------
# IAM MODULE (New!)
# -----------------------------
module "iam" {
  source      = "./modules/iam"
  project     = var.project
  environment = var.environment
  tags        = local.common_tags
}

# -----------------------------
# VPC MODULE
# -----------------------------
module "vpc" {
  source = "./modules/vpc"

  project                  = var.project
  region                   = var.region
  vpc_cidr                 = var.vpc_cidr
  public_subnet_cidrs      = var.public_subnet_cidrs
  private_app_subnet_cidrs = var.private_app_subnet_cidrs
  private_db_subnet_cidrs  = var.private_db_subnet_cidrs
  availability_zones       = var.availability_zones
  tags                     = local.common_tags
}

# -----------------------------
# SECURITY GROUP MODULE
# -----------------------------
module "security_group" {
  source = "./modules/security_group"

  vpc_id            = module.vpc.vpc_id
  name_prefix       = var.project
  alb_ingress_cidrs = var.alb_ingress_cidrs
  ssh_ingress_cidrs = [local.my_current_ip]
  app_port          = var.app_port
  db_port           = var.db_port
  tags              = local.common_tags
}

# -----------------------------
# EC2 MODULE
# -----------------------------
module "ec2" {
  source = "./modules/ec2"

  web_subnet_ids = module.vpc.public_subnet_ids
  app_subnet_ids = module.vpc.private_app_subnet_ids
  db_subnet_ids  = module.vpc.private_db_subnet_ids

  web_sg_id     = module.security_group.alb_sg_id
  app_sg_id     = module.security_group.app_sg_id
  db_sg_id      = module.security_group.db_sg_id
  bastion_sg_id = module.security_group.bastion_sg_id

  # --- NEW: Pass the IAM Profile ---
  iam_instance_profile = module.iam.instance_profile_name

  instance_type = var.instance_type
  ami_id        = var.ami_id
  key_name      = var.key_name
  common_tags   = local.common_tags
}
