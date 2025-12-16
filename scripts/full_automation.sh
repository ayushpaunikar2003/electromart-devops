#!/bin/bash

# ==============================================================================
# ⚡ ELECTROMART PRODUCTION PIPELINE (Final Robust Version)
# ==============================================================================
# This script handles:
# 1. Security Scans
# 2. Docker Build & Push (Cross-Platform)
# 3. Infrastructure Provisioning (Terraform)
# 4. Dynamic Inventory Generation
# 5. Configuration & Deployment (Ansible)

set -e # Exit immediately if a command exits with a non-zero status

# --- Configuration ---
REGION="ap-south-1"
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
PROJECT_ROOT="$SCRIPT_DIR/.."
cd "$PROJECT_ROOT"

echo "🌟 Starting Production Deployment Pipeline..."
echo "----------------------------------------------------------------"

# ------------------------------------------------------------------------------
# PHASE 1: SECURITY SCANNING
# ------------------------------------------------------------------------------
echo "🛡️  [1/6] Running Security Scans..."

if [ -f "security/trivy_scan.sh" ]; then
    chmod +x security/trivy_scan.sh
    ./security/trivy_scan.sh || echo "⚠️  Security Scan found issues, but proceeding..."
else
    echo "⚠️  Security script not found. Skipping."
fi

# ------------------------------------------------------------------------------
# PHASE 2: BUILD & PUSH TO AWS ECR
# ------------------------------------------------------------------------------
echo "----------------------------------------------------------------"
echo "🐳 [2/6] Building & Pushing Docker Images..."

# Get Account ID & Define ECR URL
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_URL="${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com"

# Login to ECR
echo "🔑 Logging into ECR..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin "$ECR_URL"

# Build Function (Includes ARM64 Check)
build_and_push() {
    IMAGE_NAME=$1
    DIR=$2
    FULL_IMAGE_URI="$ECR_URL/electromart/$IMAGE_NAME:latest"

    echo "   🔨 Building $IMAGE_NAME..."
    cd "$PROJECT_ROOT/app/$DIR"

    # Check Architecture for AWS Graviton (ARM64) compatibility
    ARCH=$(uname -m)
    if [ "$ARCH" = "aarch64" ]; then
        docker build -t "$FULL_IMAGE_URI" .
    else
        # If on Intel/AMD, we might need buildx for multi-arch,
        # but for this script we assume standard build is sufficient or relying on CI/CD.
        docker build -t "$FULL_IMAGE_URI" .
    fi

    docker push "$FULL_IMAGE_URI"
}

# Uncomment these lines to enable building on every run
# build_and_push "backend" "backend"
# build_and_push "frontend" "frontend"
echo "   ⏭️  Skipping build (Assuming images exist. Uncomment in script to enable)."

# ------------------------------------------------------------------------------
# PHASE 3: INFRASTRUCTURE (TERRAFORM)
# ------------------------------------------------------------------------------
echo "----------------------------------------------------------------"
echo "🏗️  [3/6] Enforcing Infrastructure State..."

cd "$PROJECT_ROOT/terraform"
terraform init -input=false
terraform apply -auto-approve

# Capture Outputs for Display
WEB_PUBLIC_IP=$(terraform output -json web_ips | grep -o '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | head -1)
BASTION_PUBLIC_IP=$(terraform output -raw bastion_ip)

# ------------------------------------------------------------------------------
# PHASE 4: DYNAMIC INVENTORY GENERATION
# ------------------------------------------------------------------------------
echo "----------------------------------------------------------------"
echo "📝 [4/6] Generating Dynamic Inventory..."

# 1. Fetch Private IPs directly from AWS CLI (Most Reliable Method)
echo "   🔍 Querying AWS API for Private IPs..."
WEB_PRIVATE=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=electromart-web-1" "Name=instance-state-name,Values=running" --query "Reservations[].Instances[].PrivateIpAddress" --output text --region $REGION)
APP_PRIVATE=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=electromart-app-1" "Name=instance-state-name,Values=running" --query "Reservations[].Instances[].PrivateIpAddress" --output text --region $REGION)
DB_PRIVATE=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=electromart-db-1" "Name=instance-state-name,Values=running" --query "Reservations[].Instances[].PrivateIpAddress" --output text --region $REGION)
BASTION_PRIVATE=$(aws ec2 describe-instances --filters "Name=tag:Name,Values=electromart-bastion" "Name=instance-state-name,Values=running" --query "Reservations[].Instances[].PrivateIpAddress" --output text --region $REGION)

if [[ -z "$WEB_PRIVATE" || -z "$APP_PRIVATE" || -z "$DB_PRIVATE" ]]; then
    echo "❌ ERROR: Could not find Private IPs for one or more instances. Is Terraform finished?"
    exit 1
fi

echo "   ✅ Found IPs -> Web: $WEB_PRIVATE | App: $APP_PRIVATE | DB: $DB_PRIVATE"

cd "$PROJECT_ROOT/ansible"

# 2. Create Inventory File
cat > inventory.ini <<EOF
[bastion]
bastion1 ansible_host=$BASTION_PUBLIC_IP monitoring_ip=$BASTION_PRIVATE

[web]
web1 ansible_host=$WEB_PRIVATE

[app]
app1 ansible_host=$APP_PRIVATE

[db]
db1 ansible_host=$DB_PRIVATE

[all:vars]
ansible_user=ubuntu
ansible_ssh_private_key_file=~/electromart-key.pem
ansible_ssh_common_args='-o StrictHostKeyChecking=no -o IdentitiesOnly=yes'

[jumped_hosts:children]
web
app
db

[jumped_hosts:vars]
ansible_ssh_common_args='-o StrictHostKeyChecking=no -o IdentitiesOnly=yes -o ProxyCommand="ssh -o StrictHostKeyChecking=no -o IdentitiesOnly=yes -i ~/electromart-key.pem -W %h:%p -q ubuntu@$BASTION_PUBLIC_IP"'
EOF

echo "   ✅ Inventory generated."

# ------------------------------------------------------------------------------
# PHASE 5: PROVISIONING & CONFIGURATION (THE FIX)
# ------------------------------------------------------------------------------
echo "----------------------------------------------------------------"
echo "⚙️  [5/6] Provisioning Servers..."

# Wait for SSH to be ready (Critical for new instances)
echo "   ⏳ Waiting 30s for SSH to initialize..."
sleep 30

# A. Install Docker & Dependencies (CRITICAL FIRST STEP)
echo "   🛠️  Installing Docker & Tools..."
ansible-playbook -i inventory.ini install-docker.yml

# B. Setup Database
echo "   🗄️  Setting up Database..."
ansible-playbook -i inventory.ini deploy-db.yml

# ------------------------------------------------------------------------------
# PHASE 6: DEPLOYMENT
# ------------------------------------------------------------------------------
echo "----------------------------------------------------------------"
echo "🚀 [6/6] Deploying Applications & Monitoring..."

# C. Deploy Frontend & Backend
echo "   📦 Deploying Containers..."
ansible-playbook -i inventory.ini deploy-containers.yml

# D. Deploy Monitoring Stack
echo "   📊 Deploying Monitoring..."
ansible-playbook -i inventory.ini deploy-monitoring.yml

# ==============================================================================
echo "🎉 DEPLOYMENT SUCCESSFUL!"
echo "----------------------------------------------------------------"
echo "🌍 Website URL:      http://$WEB_PUBLIC_IP"
echo "🔌 Backend API:      http://$WEB_PUBLIC_IP:5000"
echo "📊 Grafana URL:      http://localhost:3000 (Requires SSH Tunnel)"
echo "----------------------------------------------------------------"
