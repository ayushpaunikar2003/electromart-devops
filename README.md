# Electromart – DevOps Internship Challenge

## 🌐 Overview

**Electromart** is a **full-stack e-commerce web application** designed for DevOps interns to gain **hands-on experience with real-world infrastructure challenges**.  
The project simulates a **complete CI/CD and cloud deployment workflow** involving containerization, automation, monitoring, and security scanning.

Interns are required to identify and fix **existing misconfigurations and errors** in the setup, and then **successfully deploy the solution using AWS Free Tier** resources.

---

## 🎯 Objective

Your task as an intern is to:

- Analyze and troubleshoot **infrastructure, configuration, and deployment issues** within the existing project.  
- Deploy the complete system — **frontend**, **backend**, **monitoring**, and **security pipeline** — on **AWS** (Free Tier only).  
- Ensure the application runs **end-to-end** with correct communication between services.  
- Document your debugging process, root cause analysis, and fixes.

---

## 🔧 Core Technologies

* **Docker** & **Docker Compose**
* **Terraform (IaC)**
* **Prometheus** & **Grafana** (Monitoring)
* **GitHub Actions** (CI/CD)
* **Trivy** & **Hadolint** (Security)
* **Node.js**, **Express**, **React**
* **AWS Free Tier Deployment**

---

## 🚀 Your Challenge

You are provided with a **partially misconfigured Azure-based setup**.
Your mission is to **debug, correct, and implement** the same end-to-end DevOps flow **on AWS Free Tier**.

Key expectations:

1. **Identify** hidden bugs and misconfigurations in scripts, Docker, Terraform, and CI/CD files.
2. **Rebuild** the infrastructure using **AWS services only** (e.g., ECS, ECR, S3, EC2, CloudWatch).
3. **Automate** deployment and verification using provided shell and Terraform scripts.
4. **Monitor** your deployment using Prometheus and Grafana.
5. **Perform security scans** using Trivy and ensure zero high/critical vulnerabilities.

---

## 📘 Deliverables

Each intern must provide the following:

1. ✅ Working AWS deployment (with URLs for frontend & backend).
2. 🧠 A **report or markdown log** describing:

   * Identified issues.
   * Steps taken to fix them.
   * Commands or configurations used.
3. Updated Terraform or Docker Compose files for AWS.

---

## ⚠️ Rules

* Do **not use paid AWS services** — use only **Free Tier** offerings.
* Do **not remove or rewrite the entire codebase** — your goal is to **fix and optimize**.
* Keep all configurations and scripts modular and production-ready.
* Maintain proper **Git commit messages** for each fix.

---

## 🧠 Tips

* Start by analyzing the `docker-compose.yml`, Terraform, and CI/CD pipeline.
* Use AWS services like ECS, ECR, CloudWatch, and IAM with least-privilege policies.
* Test each step incrementally — build, deploy, scan, and monitor.
* Document your learning process thoroughly.

---

## 🏁 Completion Criteria

Your project will be considered **successful** when:

* The full-stack application runs on AWS using free resources.
* Monitoring and logging tools are operational.
* Security and lint scans pass successfully.
* Documentation clearly explains fixes and deployment steps.


