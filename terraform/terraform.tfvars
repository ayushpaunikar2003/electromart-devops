project     = "electromart"
region      = "ap-south-1"

# VPC Configuration
vpc_cidr                 = "10.0.0.0/16"

# CHANGED: Only 1 subnet per tier (Removing the second zone CIDs)
public_subnet_cidrs      = ["10.0.1.0/24"]
private_app_subnet_cidrs = ["10.0.11.0/24"]
private_db_subnet_cidrs  = ["10.0.21.0/24"]

# CHANGED: Only 1 Availability Zone
availability_zones       = ["ap-south-1a"]

# Security Group
alb_ingress_cidrs = ["0.0.0.0/0"]

# --- ARM CONFIGURATION ---
instance_type = "t4g.small"
ami_id        = "ami-04eeb425707fa843c" # ARM Ubuntu 24.04
key_name      = "electromart-key"


# Change App Port to match your Docker container
app_port = 8091

# Ensure DB Port matches too (standard is 27017)
db_port  = 27017
