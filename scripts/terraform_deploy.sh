#!/bin/bash
set -e

echo "íº€ Starting Terraform Deployment..."

cd infra/terraform

terraform init
terraform validate
terraform plan -out=tfplan
terraform apply -auto-approve tfplan

echo "âœ… Terraform deployment completed successfully."

