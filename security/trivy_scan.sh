#!/bin/bash
set -e

# 1. Get Directory Context (So script works from anywhere)
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
PROJECT_ROOT="$SCRIPT_DIR/.."
APP_DIR="$PROJECT_ROOT/app"

# 2. Get AWS Account ID & Region dynamically
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION="ap-south-1"
IMAGE_NAME="${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/electromart/backend:latest"

echo "--------------------------------------------------------"
echo "🔍 Target Image: $IMAGE_NAME"
echo "--------------------------------------------------------"

# 3. Login to ECR
echo "🔑 Logging into AWS ECR..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com

# 4. Scan Docker Image (Software Vulnerabilities)
echo "🚀 Starting Image Vulnerability Scan..."
trivy image --severity HIGH,CRITICAL --ignore-unfixed --scanners vuln $IMAGE_NAME || true

# 5. Scan Local Source Code (Secrets/Passwords)
echo "--------------------------------------------------------"
echo "🔐 Scanning local source code for secrets..."
echo "   Target: $APP_DIR"
trivy fs --scanners secret "$APP_DIR" || true

echo "✅ Trivy scan complete!"
