# ⚡ Electromart – End-to-End DevOps Automation on AWS

![Build Status](https://img.shields.io/github/actions/workflow/status/ayushpaunikar2003/electromart-devops/ci-cd.yml?label=Build%20%26%20Deploy&style=for-the-badge)
![Terraform](https://img.shields.io/badge/Terraform-IaC-purple?style=for-the-badge&logo=terraform)
![Ansible](https://img.shields.io/badge/Ansible-Config%20Mgmt-red?style=for-the-badge&logo=ansible)
![AWS](https://img.shields.io/badge/AWS-Free%20Tier-orange?style=for-the-badge&logo=amazon-aws)
![Docker](https://img.shields.io/badge/Architecture-Microservices-blue?style=for-the-badge&logo=docker)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 📖 Project Overview

**Electromart** is a full-stack MERN (MongoDB, Express, React, Node) e-commerce application deployed on **AWS** using a production-grade **DevOps pipeline**.

This project demonstrates a complete **Infrastructure as Code (IaC)** and **CI/CD** workflow. It transforms a legacy manual setup into a **Self-Healing, Zero-Trust Architecture** using **Terraform**, **Ansible**, **GitHub Actions**, and **Prometheus/Grafana**.

---

## 🏗️ Architecture Design

The infrastructure is designed for high security and availability using a **Hub-and-Spoke** network model. The Database and Application servers reside in **Private Subnets**, accessible only via a hardened Bastion Host.

```mermaid
graph TD
    User((User)) -->|HTTP:80| Web[Web Server / Load Balancer]
    User -->|API:5000| Web
    Admin((DevOps)) -->|SSH:22| Bastion[Bastion Host]

    subgraph AWS_Cloud ["AWS VPC (ap-south-1)"]
        subgraph Public_Zone [Public Subnet]
            Web
            Bastion
            NAT[NAT Gateway]
        end

        subgraph Private_Zone [Private Subnet]
            App[Backend API Container]
            DB[(MongoDB Database)]
        end
    end

    Web <-->|Internal Traffic| App
    App <-->|Internal Traffic| DB

    Bastion -.->|Ansible Tunnel| Web
    Bastion -.->|Ansible Tunnel| App
    Bastion -.->|Ansible Tunnel| DB

    subgraph Observability
        Prometheus[Prometheus]
        Grafana[Grafana]
    end

    Bastion -->|Scrapes Metrics| Web
    Bastion -->|Scrapes Metrics| App
    Bastion -->|Scrapes Metrics| DB
````

-----

## 🛠️ Tech Stack

| Domain | Tool | Usage |
| :--- | :--- | :--- |
| **Cloud** | **AWS** | VPC, EC2, ECR, IAM, Security Groups, NAT Gateway |
| **IaC** | **Terraform** | Modular provisioning of networking and compute resources |
| **Config** | **Ansible** | Dynamic Inventory, Role-based configuration, Idempotency |
| **CI/CD** | **GitHub Actions** | Multi-Arch Builds (ARM64), Security Scans, Auto-Deployment |
| **Containers** | **Docker** | Microservices containerization, Docker Compose |
| **Monitoring** | **Prometheus/Grafana** | Real-time metrics scraping via private SSH tunnels |
| **Security** | **Trivy & Hadolint** | Image vulnerability scanning and static code analysis |

-----

## 🚀 Key Features

### 1\. Zero-Touch Infrastructure (Terraform)

  * **Modular Design:** Infrastructure allows distinct management of Networking (`vpc`), Security (`security_group`), and Compute (`ec2`).
  * **Automated Provisioning:** A single script builds the entire environment from scratch in minutes.

### 2\. Self-Healing CI/CD Pipeline

  * **Dynamic Inventory:** The pipeline queries the AWS API to fetch current Private IPs, generating the Ansible inventory on the fly. This ensures deployments succeed even if servers are replaced.
  * **Bastion Tunneling:** Deployments are tunneled through the Bastion Host, keeping private servers completely isolated from the internet.
  * **Cross-Compilation:** Uses **QEMU** to build Docker images compatible with AWS Graviton (ARM64) instances.

### 3\. Comprehensive Observability

  * **Secure Monitoring:** Prometheus runs on the Bastion and scrapes `node_exporter` and `cadvisor` metrics from private instances over the internal network.
  * **Visual Dashboards:** Grafana provides insights into CPU, Memory, and Container health.

-----

## 🔌 Port Reference

| Service | Port | Access | Description |
| :--- | :--- | :--- | :--- |
| **Frontend** | `80` | Public | React Application (Nginx) |
| **Backend API** | `5000` | Public | Node.js API Endpoints |
| **SSH** | `22` | Admin IP | Secure Administration (Bastion Only) |
| **MongoDB** | `27017` | Private | Database Access (Internal Only) |
| **Prometheus** | `9090` | Tunnel | Metrics Collection |
| **Grafana** | `3000` | Tunnel | Monitoring Dashboard |

-----

## 📂 Project Structure

```text
electromart-devops/
├── .github/workflows/
│   └── ci-cd.yml             # Master Pipeline (Build -> Scan -> Deploy)
├── ansible/
│   ├── deploy-containers.yml # App Deployment Playbook
│   ├── deploy-db.yml         # Database Setup Playbook
│   ├── deploy-monitoring.yml # Monitoring Stack Playbook
│   ├── install-docker.yml    # Docker Runtime Setup
│   └── inventory.ini         # (Generated Dynamically)
├── app/
│   ├── frontend/             # React.js Source
│   └── backend/              # Node.js Source
├── monitoring/
│   ├── install-monitoring.sh # Setup Script
│   └── prometheus.yml        # Scraping Rules
├── scripts/
│   ├── full_automation.sh    # One-Click Deployment Script
│   └── terraform_deploy.sh   # IaC Helper Script
├── security/
│   ├── trivy_scan.sh         # Vulnerability Scanner
│   └── .hadolint.yaml        # Linting Config
└── terraform/
    ├── main.tf               # Root Config
    └── modules/              # Custom Modules (vpc, ec2, security_group)
```

-----

## 💻 Getting Started

### Prerequisites

  * AWS Account (Free Tier).
  * Terraform (`v1.0+`) & Ansible installed locally.
  * SSH Key Pair (`electromart-key.pem`) in your home directory.

### Step 1: Clone Repository

```bash
git clone [https://github.com/ayushpaunikar2003/electromart-devops.git](https://github.com/ayushpaunikar2003/electromart-devops.git)
cd electromart-devops
```

### Step 2: One-Click Deployment

Run the master automation script. This will provision infrastructure, configure servers, and deploy the application.

```bash
chmod +x scripts/full_automation.sh
./scripts/full_automation.sh
```

### Step 3: Access the Application

Once complete, the script will output your **Web Server Public IP**.

  * **Frontend:** `http://<WEB_SERVER_IP>`
  * **Backend:** `http://<WEB_SERVER_IP>:5000`

-----

## 📊 Accessing Monitoring Dashboards

For security, the monitoring stack is not exposed to the public internet. Use an SSH tunnel to access it.

1.  **Open Tunnel:**

    ```bash
    ssh -i ~/electromart-key.pem -L 3000:localhost:3000 -L 9090:localhost:9090 ubuntu@<BASTION_IP>
    ```

2.  **View Dashboards:**

      * **Grafana:** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) (User: `admin` / Pass: `admin`)
      * **Prometheus:** [http://localhost:9090](https://www.google.com/search?q=http://localhost:9090)

-----

## 🛡️ Security Implementation

  * **Least Privilege:** Security groups restrict traffic strictly (e.g., DB accepts connections *only* from App).
  * **Pre-Commit Hooks:** Prevents committing secrets or keys to the repository.
  * **Continuous Scanning:** Every commit is scanned for vulnerabilities using **Trivy** and **Hadolint**.

-----

**Author:** Ayush Paunikar
**GitHub:** [ayushpaunikar2003](https://www.google.com/search?q=https://github.com/ayushpaunikar2003)
