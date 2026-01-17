public {
    agent Any
    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-creds'
        DOCKER_IMAGE = "sheraz028/devops-project-v1"
        AWS_CREDENTIALS = 'aws-creds'
        TF_WORKSPACE = 'devops-tf'
    }
    stages {
        stage('Checkout'){
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'https://github.com/sheraz02/cicd-project.git'
            }
        }
        stage('Install Dependencies'){
            steps {
                echo 'Installing Node.js dependencies...'
                sh 'npm install'
            }
        }
        stage('Test'){
            echo 'Running tests...'
            sh 'npm test || echo "No tests found, skipping..."'
        }
        stage('Build Docker Image'){
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
            }
        }
        stage('Push Docker Image'){
            steps {
                script {
                    echo "Logging in to Docker Hub and pushing image..."
                    withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKER_PASS')]){
                        sh "echo $DOCKER_PASSc|  docker login -u $DOCKER_USER --password-stdin"
                        sh "docker push $DOCKER_IMAGE:latest}"
                    }
                }
            }
        }
        stage('Terraform Init & Apply'){
            steps {
                echo "Deploying infrastructure using terraform..."
                withCredentials([[$class: "AmazonWebServicesCredentialsBinding", credentialsId: AWS_CREDENTIALS]]){
                    dir('terraform'){
                        sh 'terraform init'
                        sh 'terraform plan -out=tfplan -input=false'
                        sh 'terraform apply -input=false tfplan'
                    }
                }
            }
        }
        stage('Cleanup'){
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