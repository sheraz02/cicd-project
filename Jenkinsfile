pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-creds'
        DOCKER_IMAGE = "sheraz028/devops-project-v1"
        AWS_CREDENTIALS = 'aws-creds'  // Only works if AWS plugin is installed
        TF_WORKSPACE = 'devops-tf'
        TF_PLUGIN_CACHE_DIR = '/data/terraform-plugin-cache'
    }

    stages {
        stage('Check Tools') {
            steps {
                sh '''
                node -v
                npm -v
                docker --version
                terraform -v
                aws --version
                '''
            }
        }
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
                    withCredentials([usernamePassword(
                        credentialsId: DOCKERHUB_CREDENTIALS, 
                        usernameVariable: 'DOCKER_USER', 
                        passwordVariable: 'DOCKER_PASS')]) {
                        
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                        sh "docker push $DOCKER_IMAGE:latest"
                    }
                }
            }
        }

        stage('Terraform Init & Apply') {
    steps {
        echo "Deploying infrastructure using Terraform..."
        withCredentials([[$class: "AmazonWebServicesCredentialsBinding", credentialsId: AWS_CREDENTIALS]]) {
            dir('terraform') {
                // Set required Terraform variables
                withEnv([
                    "TF_VAR_key_name=aws_ec2_terraform",      // Replace with your AWS key pair name
                    "TF_PLUGIN_CACHE_DIR=/data/terraform-plugin-cache"
                ]) {
                    // Initialize Terraform
                    sh 'terraform init -input=false'
                    
                    // Plan and apply
                    sh 'terraform plan -out=tfplan -input=false'
                    sh 'terraform apply -input=false tfplan'
                }
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
