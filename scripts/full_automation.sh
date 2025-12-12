#!/bin/bash
set -e

# ==============================================================================
# 🚀 ELECTROMART PRODUCTION PIPELINE (Dynamic Monitoring Fix)
# ==============================================================================

# --- Configuration ---
REGION="ap-south-1"
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
PROJECT_ROOT="$SCRIPT_DIR/.."
cd "$PROJECT_ROOT"

echo "🌟 Starting Production Deployment Pipeline..."

# ------------------------------------------------------------------------------
# PHASE 1: SECURITY SCANNING
# ------------------------------------------------------------------------------
echo "----------------------------------------------------------------"
echo "🛡️  [1/5] Running Security Scans..."

if [ -f "security/trivy_scan.sh" ]; then
    chmod +x security/trivy_scan.sh
    ./security/trivy_scan.sh
else
    echo "⚠️  Security script not found. Skipping."
fi

# ------------------------------------------------------------------------------
# PHASE 2: BUILD & PUSH TO AWS ECR
# ------------------------------------------------------------------------------
echo "----------------------------------------------------------------"
echo "🐳 [2/5] Checking Docker Images..."

# Get Account ID & Define ECR URL
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_URL="${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com"

# Login
echo "🔑 Logging into ECR..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin "$ECR_URL"

# Build Function
build_and_push() {
    IMAGE_NAME=$1
    DIR=$2
    FULL_IMAGE_URI="$ECR_URL/electromart/$IMAGE_NAME:latest"

    echo "   🔨 Building $IMAGE_NAME..."
    cd "$PROJECT_ROOT/app/$DIR"
    docker build -t "$FULL_IMAGE_URI" .
    docker push "$FULL_IMAGE_URI"
}

# Only build if explicitly asked (to save time)
# Note: For strict 'no-touch' automation, remove the 'read' and uncomment calls below
# build_and_push "backend" "backend"
# build_and_push "frontend" "frontend"
echo "   ⏭️  Skipping build (Assuming images exist. Uncomment in script to enable)."

# ------------------------------------------------------------------------------
# PHASE 3: INFRASTRUCTURE (TERRAFORM)
# ------------------------------------------------------------------------------
echo "----------------------------------------------------------------"
echo "🏗️  [3/5] Enforcing Infrastructure State..."

cd "$PROJECT_ROOT/terraform"
terraform init -input=false
terraform apply -auto-approve

# Capture Outputs
echo "📝 Capturing IP Addresses..."
BASTION_IP=$(terraform output -raw bastion_ip)
WEB_IP=$(terraform output -json web_private_ips | grep -o '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | head -1)
APP_IP=$(terraform output -json app_ips | grep -o '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | head -1)
DB_IP=$(terraform output -json db_ips | grep -o '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | head -1)
WEB_PUBLIC_IP=$(terraform output -json web_ips | grep -o '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | head -1)

# ------------------------------------------------------------------------------
# PHASE 4: DYNAMIC INVENTORY (THE FIX)
# ------------------------------------------------------------------------------
echo "----------------------------------------------------------------"
echo "📝 [4/5] Generating Dynamic Inventory..."

# 🔍 FETCH PRIVATE IP FOR MONITORING
# We ask AWS: "What is the Private IP for the instance with this Public IP?"
echo "   🔍 Looking up Bastion Private IP..."
BASTION_PRIVATE_IP=$(aws ec2 describe-instances \
    --filters "Name=ip-address,Values=$BASTION_IP" \
    --query "Reservations[].Instances[].PrivateIpAddress" \
    --output text \
    --region $REGION)

if [[ -z "$BASTION_PRIVATE_IP" ]]; then
    echo "❌ ERROR: Could not find Bastion Private IP. Monitoring will fail."
    exit 1
fi

echo "   ✅ Found Bastion Private IP: $BASTION_PRIVATE_IP"

cd "$PROJECT_ROOT/ansible"

# Generate inventory.ini with the Private IP for monitoring
cat > inventory.ini <<EOF
[bastion]
bastion1 ansible_host=$BASTION_IP monitoring_ip=$BASTION_PRIVATE_IP

[web]
web1 ansible_host=$WEB_IP

[app]
app1 ansible_host=$APP_IP

[db]
db1 ansible_host=$DB_IP

[all:vars]
ansible_user=ubuntu
ansible_ssh_private_key_file=/home/demo/electromart-key.pem
ansible_ssh_common_args='-o StrictHostKeyChecking=no -o IdentitiesOnly=yes'

[jumped_hosts:children]
web
app
db

[jumped_hosts:vars]
ansible_ssh_common_args='-o StrictHostKeyChecking=no -o IdentitiesOnly=yes -o ProxyCommand="ssh -o StrictHostKeyChecking=no -o IdentitiesOnly=yes -i /home/demo/electromart-key.pem -W %h:%p -q ubuntu@$BASTION_IP"'
EOF

echo "   ✅ Inventory updated."

# ------------------------------------------------------------------------------
# PHASE 5: CONFIGURATION (ANSIBLE)
# ------------------------------------------------------------------------------
echo "----------------------------------------------------------------"
echo "⚙️  [5/5] Configuring Servers..."

# Update monitoring config on the server
ansible-playbook -i inventory.ini deploy-monitoring.yml

# (Optional: Run other playbooks if infrastructure changed)
# ansible-playbook -i inventory.ini install-docker.yml
# ansible-playbook -i inventory.ini deploy-containers.yml

# Force restart Prometheus to pick up the new config
echo "   🔄 Restarting Prometheus..."
ansible bastion1 -m shell -a "docker restart prometheus" -i inventory.ini --become

# ==============================================================================
echo "🎉 DEPLOYMENT SUCCESSFUL!"
echo "----------------------------------------------------------------"
echo "🌍 Website URL: http://$WEB_PUBLIC_IP"
echo "📊 Grafana URL: http://localhost:3000 (Requires SSH Tunnel)"
echo "----------------------------------------------------------------"
