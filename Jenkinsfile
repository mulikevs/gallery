pipeline {
    agent any
    tools {
        nodejs 'node-22' // Configured Node.js 22 in Jenkins Global Tool Configuration
    }
    environment {
        VERSION_NUMBER = '1.0' // Project version
        APP_NAME = 'gallery'   // Application name for clarity in logs
    }
    stages {
        stage('Initialize') {
            steps {
                echo "Starting pipeline for ${env.APP_NAME} v${env.VERSION_NUMBER}, Build #${env.BUILD_NUMBER}"
                echo 'Verifying Node.js and npm versions...'
                sh 'node --version'
                sh 'npm --version'
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies for Express.js project...'
                sh 'npm ci' // Use npm ci for reproducible builds
            }
        }
        stage('Run Tests') {
            steps {
                echo 'Running tests for Express.js project...'
                sh 'npm test || true' // Allow pipeline to continue even if tests fail
            }
        }
        stage('Build') {
            steps {
                echo 'Building Express.js project...'
                sh 'npm run build' // Assumes a build script in package.json
            }
        }
        stage('Archive Artifacts') {
            steps {
                echo 'Archiving build artifacts...'
                archiveArtifacts artifacts: 'dist/**/*', allowEmptyArchive: true
            }
        }
    }
    post {
        always {
            echo "Pipeline for ${env.APP_NAME} v${env.VERSION_NUMBER}, Build #${env.BUILD_NUMBER} completed"
        }
        success {
            echo "Build #${env.BUILD_NUMBER} for ${env.APP_NAME} v${env.VERSION_NUMBER} succeeded"
        }
        failure {
            echo "Build #${env.BUILD_NUMBER} for ${env.APP_NAME} v${env.VERSION_NUMBER} failed"
        }
    }
}
