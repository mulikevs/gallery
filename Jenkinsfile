pipeline {
    agent any
    tools {
        nodejs 'node-22' // Configured Node.js 22 in Jenkins Global Tool Configuration
    }
    environment {
        VERSION_NUMBER = '1.0'      // Project version
        APP_NAME = 'gallery'        // Application name for clarity in logs
        SLACK_CHANNEL = '#mulikevs' // Slack channel for notifications
        RENDER_URL = 'https://gallery-1-52ks.onrender.com/' // Render deployment URL
        BUILD_USER = "${env.BUILD_USER ?: 'Jenkins Pipeline'}" // Fallback to 'Jenkins Pipeline' if BUILD_USER is unavailable
    }
    stages {
        stage('Clone Repository') { // Clone the git repository and checkout the master branch
            steps {
                echo "Starting stage: Clone Repository for ${env.APP_NAME} v${env.VERSION_NUMBER}, Build #${env.BUILD_NUMBER}"
                echo 'Comments Table for Clone Repository Stage:'
                echo '+---------------------------+------------------+'
                echo '| Step                      | Performed By     |'
                echo '+---------------------------+------------------+'
                echo "| Cloning Git repository    | ${env.BUILD_USER} |"
                git branch: 'master', url: 'https://github.com/mulikevs/gallery.git'
                echo '+---------------------------+------------------+'
            }
        }
        stage('Install Dependencies') { // Install all required Node.js dependencies from package.json
            steps {
                echo "Starting stage: Install Dependencies for ${env.APP_NAME} v${env.VERSION_NUMBER}, Build #${env.BUILD_NUMBER}"
                echo 'Comments Table for Install Dependencies Stage:'
                echo '+----------------------------------+------------------+'
                echo '| Step                            | Performed By     |'
                echo '+----------------------------------+------------------+'
                echo "| Installing Node.js dependencies | ${env.BUILD_USER} |"
                sh 'npm ci' // Use npm ci for reproducible builds
                echo '+----------------------------------+------------------+'
            }
        }
        stage('Start Server') { // Start the Node.js server in the background
            steps {
                echo "Starting stage: Start Server for ${env.APP_NAME} v${env.VERSION_NUMBER}, Build #${env.BUILD_NUMBER}"
                echo 'Comments Table for Start Server Stage:'
                echo '+---------------------------+------------------+'
                echo '| Step                      | Performed By     |'
                echo '+---------------------------+------------------+'
                echo "| Starting Node.js server   | ${env.BUILD_USER} |"
                sh 'nohup node server.js &'
                echo '+---------------------------+------------------+'
            }
        }
        stage('Test') { // Run tests to verify the server functionality
            steps {
                echo "Starting stage: Test for ${env.APP_NAME} v${env.VERSION_NUMBER}, Build #${env.BUILD_NUMBER}"
                echo 'Comments Table for Test Stage:'
                echo '+------------------------+------------------+'
                echo '| Step                  | Performed By     |'
                echo '+------------------------+------------------+'
                echo "| Running project tests  | ${env.BUILD_USER} |"
                sh 'npm test' // Fail pipeline if tests fail
                echo '+------------------------+------------------+'
            }
        }
        stage('Stop Server') { // Stop the server after tests
            steps {
                echo "Starting stage: Stop Server for ${env.APP_NAME} v${env.VERSION_NUMBER}, Build #${env.BUILD_NUMBER}"
                echo 'Comments Table for Stop Server Stage:'
                echo '+---------------------------+------------------+'
                echo '| Step                      | Performed By     |'
                echo '+---------------------------+------------------+'
                echo "| Stopping Node.js server   | ${env.BUILD_USER} |"
                sh 'pkill -f "node server.js" || true'
                echo '+---------------------------+------------------+'
            }
        }
        stage('Deploy to Render') { // Deploy to Render
            steps {
                echo "Starting stage: Deploy to Render for ${env.APP_NAME} v${env.VERSION_NUMBER}, Build #${env.BUILD_NUMBER}"
                echo 'Comments Table for Deploy to Render Stage:'
                echo '+----------------------------------+------------------+'
                echo '| Step                            | Performed By     |'
                echo '+----------------------------------+------------------+'
                echo "| Deploying to Render hosting     | ${env.BUILD_USER} |"
                echo "Deploying to ${env.RENDER_URL}..."
                echo '+----------------------------------+------------------+'
            }
        }
    }
    post {
        always {
            echo "Pipeline for ${env.APP_NAME} v${env.VERSION_NUMBER}, Build #${env.BUILD_NUMBER} completed"
        }
        success {
            echo "Starting post-action: Success Notification for ${env.APP_NAME} v${env.VERSION_NUMBER}, Build #${env.BUILD_NUMBER}"
            echo 'Comments Table for Slack Success Notification:'
            echo '+----------------------------------+------------------+'
            echo '| Step                            | Performed By     |'
            echo '+----------------------------------+------------------+'
            echo "| Sending Slack success message   | ${env.BUILD_USER} |"
            slackSend(
                channel: env.SLACK_CHANNEL,
                color: 'good',
                message: "Build #${env.BUILD_NUMBER} of ${env.APP_NAME} v${env.VERSION_NUMBER} successfully deployed to ${env.RENDER_URL}"
            )
            echo "Build #${env.BUILD_NUMBER} for ${env.APP_NAME} v${env.VERSION_NUMBER} succeeded"
            echo '+----------------------------------+------------------+'
        }
        failure {
            echo "Starting post-action: Failure Notification for ${env.APP_NAME} v${env.VERSION_NUMBER}, Build #${env.BUILD_NUMBER}"
            echo 'Comments Table for Slack Failure Notification:'
            echo '+----------------------------------+------------------+'
            echo '| Step                            | Performed By     |'
            echo '+----------------------------------+------------------+'
            echo "| Sending Slack failure message   | ${env.BUILD_USER} |"
            slackSend(
                channel: env.SLACK_CHANNEL,
                color: 'danger',
                message: "Build #${env.BUILD_NUMBER} of ${env.APP_NAME} v${env.VERSION_NUMBER} failed. Check Jenkins: ${env.BUILD_URL}"
            )
            echo '+----------------------------------+------------------+'
            echo 'Comments Table for Email Failure Notification:'
            echo '+----------------------------------+------------------+'
            echo '| Step                            | Performed By     |'
            echo '+----------------------------------+------------------+'
            echo "| Sending email notification      | ${env.BUILD_USER} |"
            emailext(
                attachLog: true,
                subject: "FAILED: Build #${env.BUILD_NUMBER} - ${env.APP_NAME} v${env.VERSION_NUMBER}",
                body: """
                    <html>
                    <body>
                        <h3>Pipeline Failure Notification</h3>
                        <p><b>Job:</b> ${env.JOB_NAME} #${env.BUILD_NUMBER}</p>
                        <p><b>Application:</b> ${env.APP_NAME} v${env.VERSION_NUMBER}</p>
                        <p><b>Status:</b> FAILED at ${new java.util.Date().format('yyyy-MM-dd HH:mm:ss z')}</p>
                        <p>The pipeline encountered an error during execution. Details are below:</p>
                        <ul>
                            <li><b>Console Output:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></li>
                            <li><b>Deployed Site:</b> <a href="${env.RENDER_URL}">${env.RENDER_URL}</a> (if applicable)</li>
                        </ul>
                        <p><b>Failure Details:</b> Please review the attached build log for specific error messages.</p>
                        <p><b>Recommended Action:</b> Investigate the failure cause, fix the issue, and re-run the pipeline.</p>
                        <p><i>Build log is attached for your convenience.</i></p>
                    </body>
                    </html>
                """,
                to: 'mulikevs@gmail.com',
                mimeType: 'text/html'
            )
            echo "Build #${env.BUILD_NUMBER} for ${env.APP_NAME} v${env.VERSION_NUMBER} failed"
            echo '+----------------------------------+------------------+'
        }
    }
}
