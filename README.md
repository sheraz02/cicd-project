# 🚀 End-to-End CI/CD Pipeline with Jenkins, Docker, Terraform & AWS

This project demonstrates a **complete end-to-end CI/CD pipeline** that automates the process from code commit to production deployment on AWS.  
It reflects a **real-world DevOps workflow** used in production environments.
## 📌 Project Overview
When a developer pushes code to the repository, the pipeline automatically:
1. Triggers a Jenkins build
2. Builds a Docker image
3. Pushes the image to a **private Docker registry**
4. Provisions AWS infrastructure using **Terraform**
5. Pulls the Docker image on an **AWS EC2 instance**
6. Deploys the Docker container and makes the application live
## 🏗️ Architecture Flow Diagram
<img width="851" height="444" alt="diagram-export-18-01-2026-02_34_48" src="https://github.com/user-attachments/assets/78aa385d-46a6-4802-922a-926b522dcebb" />

## 🛠️ Tech Stack
- **GitHub** – Source code management  
- **Jenkins** – CI/CD automation (hosted on AWS EC2 instance)
- **Docker** – Containerization  
- **Private Docker Registry** – Secure image storage  
- **Terraform** – Infrastructure as Code (IaC)  
- **AWS** – VPC & EC2  
## ⚙️ CI/CD Pipeline Workflow

### 1️⃣ Code Push
- Developer pushes code to the GitHub repository.
### 2️⃣ Jenkins Trigger
- GitHub webhook triggers the Jenkins pipeline automatically.
### 3️⃣ Docker Image Build & Push
- Jenkins builds a Docker image from the application.
- Image is pushed to a private Docker registry.
### 4️⃣ Infrastructure Provisioning
- Terraform creates required AWS resources:
  - VPC
  - Subnets
  - Security Groups
  - EC2 Instance
### 5️⃣ Deployment
- EC2 instance pulls the Docker image from the private registry.
- Docker container is started and the application goes live.
## 📚 What I Learned
- Core concepts of **Jenkins pipelines**
- Writing and managing **Terraform configurations**
- Infrastructure provisioning using **IaC**
- Secure handling of Docker images
- How **real-world production CI/CD pipelines** work
- End-to-end automation from development to deployment
## 🎯 Key Takeaways
- CI/CD automation reduces manual effort and deployment risks
- Infrastructure as Code makes environments reproducible and scalable
- Jenkins, Docker, and Terraform together form a powerful DevOps toolchain
- Building projects end to end is the best way to understand production systems
## 🚧 Future Improvements
- Add **Application Load Balancer**
- Implement **Auto Scaling**
- Migrate deployment to **Amazon EKS**
- Add **Monitoring & Logging** (CloudWatch / Prometheus)
- Improve security with IAM best practices
## 🔚 Closing Remarks
This project gave me hands-on experience with a **production-grade CI/CD pipeline** and strengthened my understanding of modern DevOps practices.  
I look forward to extending this setup with more advanced cloud-native features and continuing to build scalable, automated systems.

**Happy Automating 🚀**
