variable "project" {
  type = string
}

variable "region" {
  type = string
}

variable "vpc_cidr" {
  type = string
}

variable "public_subnet_cidrs" {
  type = list(string)
}

variable "private_app_subnet_cidrs" {
  type = list(string)
}

variable "private_db_subnet_cidrs" {
  type = list(string)
}

variable "availability_zones" {
  type = list(string)
}

variable "tags" {
  type    = map(string)
  default = {}
}

# --- NEW VARIABLES FOR NAT INSTANCE ---
variable "ami_id" {
  description = "AMI ID for the NAT Instance"
  type        = string
}

variable "key_name" {
  description = "Key Name for the NAT Instance"
  type        = string
}