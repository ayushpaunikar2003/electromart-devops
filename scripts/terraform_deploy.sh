#!/bin/bash
set -e

# 1. Dynamic Path Resolution
# This ensures the script finds the 'terraform' folder
# regardless of where you run this script from.
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
PROJECT_ROOT="$SCRIPT_DIR/.."
TERRAFORM_DIR="$PROJECT_ROOT/terraform"

echo "🚀 Starting Terraform Deployment..."
echo "📂 Working Directory: $TERRAFORM_DIR"

cd "$TERRAFORM_DIR"

# 2. Format & Validate (Best Practice)
echo "🧹 Auto-formatting code..."
terraform fmt -recursive

echo "⚙️ Initializing..."
terraform init

echo "🔍 Validating configuration..."
terraform validate

# 3. Plan & Apply
echo "📋 Generating Plan..."
terraform plan -out=tfplan

echo "🏗️ Applying Infrastructure..."
terraform apply -auto-approve tfplan

# 4. Show Results
echo "✅ Deployment Successful!"
echo "--------------------------------------------------"
echo "🌍 Infrastructure Outputs (IPs):"
terraform output
echo "--------------------------------------------------"
