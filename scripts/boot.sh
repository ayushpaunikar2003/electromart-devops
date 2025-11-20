#!/bin/bash
set -e

sudo apt update -y
sudo apt install -y docker.io docker-compose git

sudo systemctl enable docker
sudo systemctl start docker

git clone https://github.com/<your-username>/Dynamic-DevOps-Project.git
cd Dynamic-DevOps-Project/docker

sudo docker-compose up -d
