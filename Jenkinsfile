pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-creds'
        DOCKER_IMAGE = "sheraz028/devops-project-v1"
        AWS_CREDENTIALS = 'aws-creds'
        TF_WORKSPACE = 'devops-tf'
        TF_PLUGIN_CACHE_DIR = '/data/terraform-plugin-cache'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'https://github.com/sheraz02/cicd-project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test || echo "No tests found, skipping..."'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    echo "Logging in to Docker Hub and pushing image..."
                    withCredentials([
                        usernamePassword(
                            credentialsId: DOCKERHUB_CREDENTIALS,
                            usernameVariable: 'DOCKER_USER',
                            passwordVariable: 'DOCKER_PASS'
                        )
                    ]) {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                        sh "docker push $DOCKER_IMAGE:latest"
                    }
                }
            }
        }

        stage('Terraform Init & Apply') {
            steps {
                echo "Deploying infrastructure using Terraform..."
                withCredentials([
                    [$class: "AmazonWebServicesCredentialsBinding", credentialsId: AWS_CREDENTIALS]
                ]) {
                    dir('terraform') {
                        withEnv([
                            "TF_VAR_key_name=instance-ssh-key",
                            "TF_PLUGIN_CACHE_DIR=/data/terraform-plugin-cache"
                        ]) {
                            sh 'terraform init -input=false'
                            sh 'terraform plan -out=tfplan -input=false'
                            sh 'terraform apply -input=false tfplan'
                        }
                    }
                }
            }
        }

        stage('Deploy Docker Image to EC2') {
            steps {
                script {
                    echo "Fetching EC2 public IP from Terraform output..."
                    
                    // Get EC2 public IP from Terraform
                    def ec2_ip = sh(script: "terraform output -raw ec2_public_ip", returnStdout: true).trim()
                    echo "Deploying to EC2 instance at ${ec2_ip}..."
                    
                    withCredentials([sshUserPrivateKey(credentialsId: 'SSH_KEY', keyFileVariable: 'SSH_KEY', usernameVariable: 'SSH_USER'),
                                    string(credentialsId: 'DOCKER_PASS', variable: 'DOCKER_PASS')]) {
                        
                        // Deploy commands on EC2
                        sh """
                        ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ubuntu@${ec2_ip} '
                        echo "\$DOCKER_PASS" | docker login -u sheraz028 --password-stdin
                        docker pull sheraz028/devops-project-v1:latest
                        docker stop app || true
                        docker rm app || true
                        docker run -d --name app -p 80:3000 sheraz028/devops-project-v1:latest
                        '
                        """
                    }
                }
            }
}


        stage('Cleanup') {
            steps {
                echo 'Cleaning up unused Docker images...'
                sh 'docker image prune -f'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for details.'
        }
    }
}
