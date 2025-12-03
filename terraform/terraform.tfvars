project     = "electromart"
region      = "ap-south-1"

# VPC Configuration
vpc_cidr                 = "10.0.0.0/16"
public_subnet_cidrs      = ["10.0.1.0/24", "10.0.2.0/24"]
private_app_subnet_cidrs = ["10.0.11.0/24", "10.0.12.0/24"]
private_db_subnet_cidrs  = ["10.0.21.0/24", "10.0.22.0/24"]
availability_zones       = ["ap-south-1a", "ap-south-1b"]

# Security Group
alb_ingress_cidrs = ["0.0.0.0/0"]

# --- ARM CONFIGURATION (NEW) ---
# Using Graviton2 (Free Tier Trial eligible)
instance_type = "t4g.small"

# Ubuntu 24.04 LTS (ARM64 Architecture)
ami_id        = "ami-0bdf6fbe8c9e0565a"

# NEW Key Pair Name
key_name      = "electromart-key"