# -------------------------------------------------------------------------
# Bastion Host (Public - For SSH Access Only)
# -------------------------------------------------------------------------
resource "aws_instance" "bastion" {
  ami                         = var.ami_id
  
  # CHANGE THIS: Use the variable (t4g.small) instead of "t2.micro"
  instance_type               = var.instance_type 
  
  # Place in the first Public Subnet
  subnet_id                   = var.web_subnet_ids[0]
  key_name                    = var.key_name
  vpc_security_group_ids      = [var.bastion_sg_id]
  associate_public_ip_address = true

  # Attach IAM Role (Good practice to keep consistent)
  iam_instance_profile        = var.iam_instance_profile

  tags = merge(var.common_tags, { Name = "electromart-bastion", Tier = "bastion" })
}

# -------------------------------------------------------------------------
# Web Tier (Frontend - Public)
# -------------------------------------------------------------------------
resource "aws_instance" "web" {
  count                  = length(var.web_subnet_ids)
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = var.web_subnet_ids[count.index]
  key_name               = var.key_name
  vpc_security_group_ids = [var.web_sg_id]
  associate_public_ip_address = true

  # Attach IAM Role
  iam_instance_profile = var.iam_instance_profile

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y nginx
              systemctl enable nginx
              systemctl start nginx
              EOF

  tags = merge(var.common_tags, { Name = "electromart-web-${count.index + 1}", Tier = "web" })
}

# -------------------------------------------------------------------------
# App Tier (Backend - Private)
# -------------------------------------------------------------------------
resource "aws_instance" "app" {
  count                  = length(var.app_subnet_ids)
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = var.app_subnet_ids[count.index]
  key_name               = var.key_name
  vpc_security_group_ids = [var.app_sg_id]

  # Attach IAM Role
  iam_instance_profile = var.iam_instance_profile

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              EOF

  tags = merge(var.common_tags, { Name = "electromart-app-${count.index + 1}", Tier = "app" })
}

# -------------------------------------------------------------------------
# DB Tier (Database - Private)
# -------------------------------------------------------------------------
resource "aws_instance" "db" {
  count                  = length(var.db_subnet_ids)
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = var.db_subnet_ids[count.index]
  key_name               = var.key_name
  vpc_security_group_ids = [var.db_sg_id]

  # Attach IAM Role
  iam_instance_profile = var.iam_instance_profile

  user_data = <<-EOF
              #!/bin/bash
              apt-get update -y
              apt-get install -y mongodb
              systemctl enable mongodb
              systemctl start mongodb
              EOF

  tags = merge(var.common_tags, { Name = "electromart-db-${count.index + 1}", Tier = "db" })
}