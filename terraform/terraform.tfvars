project     = "electromart"
region      = "ap-south-1"

# VPC Configuration
vpc_cidr = "10.0.0.0/16"

# CHANGED: Reduced to 1 subnet per tier to save costs
public_subnet_cidrs      = ["10.0.1.0/24"]
private_app_subnet_cidrs = ["10.0.11.0/24"]
private_db_subnet_cidrs  = ["10.0.21.0/24"]

# CHANGED: Using only 1 AZ
availability_zones       = ["ap-south-1a"]

# Security Group
alb_ingress_cidrs = ["0.0.0.0/0"]

# Instance Details
instance_type = "t2.micro"
ami_id        = "ami-02b8269d5e85954ef"

# REPLACE THIS with your actual AWS Key Pair name
key_name      = "ubuntu-key"