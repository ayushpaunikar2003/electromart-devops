#!/bin/bash
set -e

# ❌ Intentional Bug: Static old image name
IMAGE_NAME="vanshp17/backend:latest"
echo "🔍 Scanning image: $IMAGE_NAME"


echo "🔍 Scanning image: $IMAGE_NAME"
trivy image --severity HIGH,CRITICAL --ignore-unfixed $IMAGE_NAME || true

echo "🔍 Scanning local project for secrets..."
trivy fs --security-checks secret ./app || true

echo "✅ Trivy scan done."
