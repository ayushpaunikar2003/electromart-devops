variable "web_subnet_ids" {
  description = "List of public subnet IDs for web tier"
  type        = list(string)
}

variable "app_subnet_ids" {
  description = "List of private subnet IDs for app tier"
  type        = list(string)
}

variable "db_subnet_ids" {
  description = "List of private subnet IDs for db tier (MongoDB)"
  type        = list(string)
}

variable "web_sg_id" {
  description = "Security group ID for web tier instances"
  type        = string
}

variable "app_sg_id" {
  description = "Security group ID for app tier instances"
  type        = string
}

variable "db_sg_id" {
  description = "Security group ID for db tier instances"
  type        = string
}

variable "bastion_sg_id" {
  description = "Security group ID for the Bastion Host"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type for all tiers"
  type        = string
  default     = "t2.micro"
}

variable "ami_id" {
  description = "AMI ID for EC2 instances"
  type        = string
}

variable "key_name" {
  description = "EC2 key pair name for SSH access"
  type        = string
}

variable "common_tags" {
  description = "Common tags for all EC2 instances"
  type        = map(string)
  default     = {}
}

# --- NEW: IAM Instance Profile Variable ---
variable "iam_instance_profile" {
  description = "IAM instance profile name to attach to EC2 instances"
  type        = string
  default     = null
}
