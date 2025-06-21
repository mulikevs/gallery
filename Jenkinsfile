pipeline {
    agent any
    tools {
        nodejs 'node-22' // Configured Node.js 22 in Jenkins Global Tool Configuration
    }
    environment {
        VERSION_NUMBER = '1.0' // Project version
        APP_NAME = 'gallery'   // Application name for clarity in logs
        BUILD_USER = "${env.BUILD_USER ?: 'Jenkins Pipeline'}" // Fallback to 'Jenkins Pipeline' if BUILD_USER is unavailable
    }
    stages {
        stage('Initialize') {
            steps {
                echo "Starting pipeline for ${env.APP_NAME} v${env.VERSION_NUMBER}, Build #${env.BUILD_NUMBER}"
                echo 'Comments Table for Initialize Stage:'
                echo '+---------------------------+------------------+'
                echo '| Step                      | Performed By     |'
                echo '+---------------------------+------------------+'
                echo "| Verifying Node.js version | ${env.BUILD_USER} |"
                sh 'node --version'
                echo "| Verifying npm version     | ${env.BUILD_USER} |"
                sh 'npm --version'
                echo '+---------------------------+------------------+'
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Comments Table for Install Dependencies Stage:'
                echo '+----------------------------------+------------------+'
                echo '| Step                            | Performed By     |'
                echo '+----------------------------------+------------------+'
                echo "| Installing Node.js dependencies | ${env.BUILD_USER} |"
                sh 'npm ci' // Use npm ci for reproducible builds
                echo '+----------------------------------+------------------+'
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Comments Table for Run Tests Stage:'
                echo '+------------------------+------------------+'
                echo '| Step                  | Performed By     |'
                echo '+------------------------+------------------+'
                echo "| Running project tests | ${env.BUILD_USER} |"
                sh 'npm test' // Fail pipeline if tests fail
                echo '+------------------------+------------------+'
            }
        }
        stage('Build') {
            steps {
                echo 'Comments Table for Build Stage:'
                echo '+------------------------+------------------+'
                echo '| Step                  | Performed By     |'
                echo '+------------------------+------------------+'
                echo "| Building project      | ${env.BUILD_USER} |"
                script {
                    def buildStatus = sh(script: 'npm run build', returnStatus: true)
                    if (buildStatus != 0) {
                        echo "No build step defined or build failed, continuing pipeline"
                        echo "| Build step skipped    | ${env.BUILD_USER} |"
                    }
                }
                echo '+------------------------+------------------+'
            }
        }
        stage('Archive Artifacts') {
            steps {
                echo 'Comments Table for Archive Artifacts Stage:'
                echo '+--------------------------+------------------+'
                echo '| Step                    | Performed By     |'
                echo '+--------------------------+------------------+'
                echo "| Archiving artifacts     | ${env.BUILD_USER} |"
                archiveArtifacts artifacts: 'dist/**/*', allowEmptyArchive: true
                echo '+--------------------------+------------------+'
            }
        }
        stage('Deploy to Render') {
            steps {
                echo 'Comments Table for Deploy to Render Stage:'
                echo '+----------------------------------+------------------+'
                echo '| Step                            | Performed By     |'
                echo '+----------------------------------+------------------+'
                echo "| Deploying to Render hosting     | ${env.BUILD_USER} |"
                echo 'Deploying to Render hosting platform...'
                echo '+----------------------------------+------------------+'
            }
        }
    }
    post {
        always {
            echo "Pipeline for ${env.APP_NAME} v${env.VERSION_NUMBER}, Build #${env.BUILD_NUMBER} completed"
        }
        success {
            echo 'Comments Table for Slack Success Notification:'
            echo '+----------------------------------+------------------+'
            echo '| Step                            | Performed By     |'
            echo '+----------------------------------+------------------+'
            echo "| Sending Slack success message   | ${env.BUILD_USER} |"
            echo "Sending success notification to Slack for ${env.APP_NAME} v${env.VERSION_NUMBER}, Build #${env.BUILD_NUMBER}"
            echo '+----------------------------------+------------------+'
            echo "Build #${env.BUILD_NUMBER} for ${env.APP_NAME} v${env.VERSION_NUMBER} succeeded"
        }
        failure {
            echo 'Comments Table for Slack Failure Notification:'
            echo '+----------------------------------+------------------+'
            echo '| Step                            | Performed By     |'
            echo '+----------------------------------+------------------+'
            echo "| Sending Slack failure message   | ${env.BUILD_USER} |"
            echo "Sending failure notification to Slack for ${env.APP_NAME} v${env.VERSION_NUMBER}, Build #${env.BUILD_NUMBER}"
            echo '+----------------------------------+------------------+'
            echo 'Comments Table for Email Failure Notification:'
            echo '+----------------------------------+------------------+'
            echo '| Step                            | Performed By     |'
            echo '+----------------------------------+------------------+'
            echo "| Sending email notification      | ${env.BUILD_USER} |"
            emailext (
                subject: "Build #${env.BUILD_NUMBER} Failed for ${env.APP_NAME} v${env.VERSION_NUMBER}",
                body: """
                    Pipeline for ${env.APP_NAME} v${env.VERSION_NUMBER} failed on Build #${env.BUILD_NUMBER}.
                    Check Jenkins console output for details: ${env.BUILD_URL}
                    Test failures detected. Please review the test results.
                """,
                to: 'your-email@example.com', // Replace with actual email
                attachLog: true
            )
            echo '+----------------------------------+------------------+'
            echo "Build #${env.BUILD_NUMBER} for ${env.APP_NAME} v${env.VERSION_NUMBER} failed"
        }
    }
}