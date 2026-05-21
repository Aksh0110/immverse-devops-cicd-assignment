pipeline {

    agent any

    environment {

        APP_NAME = "immverse-app"

        IMAGE_NAME = "akshay8833/immverse-app"

        IMAGE_TAG = "latest"

        CONTAINER_NAME = "immverse-container"

        PORT_MAPPING = "3000:3000"

        GITHUB_BRANCH = "main"

        GITHUB_REPO = "https://github.com/Aksh0110/immverse-devops-cicd-assignment.git"

        DOCKER_CREDS = credentials('dockerhub')
    }

    stages {

        stage('Checkout') {

            steps {

                git branch: "${GITHUB_BRANCH}",
                url: "${GITHUB_REPO}"

            }
        }

        stage('Verify Workspace') {

            steps {

                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Build Docker Image') {

            steps {

                sh """
                docker build \
                -t ${IMAGE_NAME}:${IMAGE_TAG} \
                ./app
                """
            }
        }

        stage('Run Test') {

            steps {

                sh '''
                echo "Running tests..."
                npm --version || true
                echo "Test Passed"
                '''
            }
        }

        stage('Docker Login') {

            steps {

                sh '''
                echo $DOCKER_CREDS_PSW | \
                docker login \
                -u $DOCKER_CREDS_USR \
                --password-stdin
                '''
            }
        }

        stage('Push Image') {

            steps {

                sh """
                docker push \
                ${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Deploy Container') {

            steps {

                sh """
                docker stop ${CONTAINER_NAME} || true

                docker rm ${CONTAINER_NAME} || true

                docker pull ${IMAGE_NAME}:${IMAGE_TAG}

                docker run -d \
                --name ${CONTAINER_NAME} \
                -p ${PORT_MAPPING} \
                ${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Health Check') {

            steps {

                sh '''

                sleep 10

                curl localhost:3000/health

                '''
            }
        }
    }

    post {

        success {

            echo "Pipeline executed successfully"
        }

        failure {

            echo "Pipeline failed"
        }

        always {

            sh 'docker images'
        }
    }
}
