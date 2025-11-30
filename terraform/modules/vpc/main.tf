resource "aws_vpc" "this" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true
  tags = merge(var.tags, { Name = "${var.project}-vpc" })
}

resource "aws_internet_gateway" "this" {
  vpc_id = aws_vpc.this.id
  tags   = merge(var.tags, { Name = "${var.project}-igw" })
}

# -------------------------------------------------------------------------
# Public Subnets
# -------------------------------------------------------------------------
resource "aws_subnet" "public" {
  count                   = length(var.public_subnet_cidrs)
  vpc_id                  = aws_vpc.this.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true
  tags = merge(var.tags, { Name = "${var.project}-public-${count.index + 1}" })
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.this.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.this.id
  }
  tags = merge(var.tags, { Name = "${var.project}-public-rt" })
}

resource "aws_route_table_association" "public_assoc" {
  count          = length(aws_subnet.public)
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# -------------------------------------------------------------------------
# NAT INSTANCE (Free Tier Replacement for NAT Gateway)
# -------------------------------------------------------------------------

# 1. Security Group SPECIFICALLY for the NAT Instance
resource "aws_security_group" "nat" {
  name        = "${var.project}-nat-sg"
  description = "Security Group for NAT Instance"
  vpc_id      = aws_vpc.this.id

  # Allow all traffic from inside the VPC (Private Subnets)
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.vpc_cidr]
  }

  # Allow SSH for debugging
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outbound traffic to the internet
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.tags, { Name = "${var.project}-nat-sg" })
}

# 2. The NAT Instance Itself
# -------------------------------------------------------------------------
# NAT INSTANCE (Automated)
# -------------------------------------------------------------------------

resource "aws_security_group" "nat" {
  name        = "${var.project}-nat-sg"
  description = "Security Group for NAT Instance"
  vpc_id      = aws_vpc.this.id

  # Allow all traffic from inside the VPC
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.vpc_cidr]
  }

  # Allow SSH for debugging
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow outbound
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(var.tags, { Name = "${var.project}-nat-sg" })
}

resource "aws_instance" "nat" {
  ami                         = var.ami_id
  instance_type               = "t2.micro"
  subnet_id                   = aws_subnet.public[0].id
  key_name                    = var.key_name
  vpc_security_group_ids      = [aws_security_group.nat.id]
  associate_public_ip_address = true
  
  # --- AUTOMATION 1: AWS CONSOLE SETTING ---
  # This automatically unchecks "Source/Destination Check" in the AWS Console
  # You never have to click this manually again.
  source_dest_check = false

  # --- AUTOMATION 2: LINUX COMMANDS ---
  # This script runs automatically when the instance turns on (as root)
  user_data = <<-EOF
              #!/bin/bash
              # 1. Enable IP Forwarding
              echo "net.ipv4.ip_forward=1" >> /etc/sysctl.conf
              sysctl -p
              
              # 2. Configure IPTables Masquerading
              /sbin/iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
              
              # 3. (Optional) Install persistence so it survives reboots
              # checking if apt is free first
              while fuser /var/lib/dpkg/lock >/dev/null 2>&1 ; do sleep 1 ; done
              apt-get update -y
              apt-get install -y iptables-persistent
              netfilter-persistent save
              EOF

  tags = merge(var.tags, { Name = "${var.project}-nat-instance" })
}

# -------------------------------------------------------------------------
# Private App Subnets & Routing
# -------------------------------------------------------------------------
resource "aws_subnet" "private_app" {
  count             = length(var.private_app_subnet_cidrs)
  vpc_id            = aws_vpc.this.id
  cidr_block        = var.private_app_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]
  tags = merge(var.tags, { Name = "${var.project}-private-app-${count.index + 1}" })
}

resource "aws_route_table" "private_app" {
  vpc_id = aws_vpc.this.id
  
  # Route 0.0.0.0/0 to the NAT INSTANCE Network Interface
  route {
    cidr_block           = "0.0.0.0/0"
    network_interface_id = aws_instance.nat.primary_network_interface_id
  }
  
  tags = merge(var.tags, { Name = "${var.project}-private-app-rt" })
}

resource "aws_route_table_association" "private_app_assoc" {
  count          = length(aws_subnet.private_app)
  subnet_id      = aws_subnet.private_app[count.index].id
  route_table_id = aws_route_table.private_app.id
}

# -------------------------------------------------------------------------
# Private DB Subnets & Routing
# -------------------------------------------------------------------------
resource "aws_subnet" "private_db" {
  count             = length(var.private_db_subnet_cidrs)
  vpc_id            = aws_vpc.this.id
  cidr_block        = var.private_db_subnet_cidrs[count.index]
  availability_zone = var.availability_zones[count.index]
  tags = merge(var.tags, { Name = "${var.project}-private-db-${count.index + 1}" })
}

resource "aws_route_table" "private_db" {
  vpc_id = aws_vpc.this.id
  
  # Route 0.0.0.0/0 to the NAT INSTANCE Network Interface
  route {
    cidr_block           = "0.0.0.0/0"
    network_interface_id = aws_instance.nat.primary_network_interface_id
  }
  
  tags = merge(var.tags, { Name = "${var.project}-private-db-rt" })
}

resource "aws_route_table_association" "private_db_assoc" {
  count          = length(aws_subnet.private_db)
  subnet_id      = aws_subnet.private_db[count.index].id
  route_table_id = aws_route_table.private_db.id
}