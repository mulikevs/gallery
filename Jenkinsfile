tools {
    nodejs 'node-22'
}

environment {
    VERSION_NUMBER = '1.0' // my comment
}

stages {
    stage('Clone Repository') {
        steps {
            echo 'Cloning repository...'
            git url: 'https://github.com/mulikevs/gallery.git', branch: 'master'
        }
    }

    stage('Install Dependencies') {
        steps {
            echo 'Installing Node.js dependencies...'
            sh 'npm install'
        }
    }

    stage('Verify Build') {
        steps {
            echo "Dependencies installed successfully for Express.js project v${VERSION_NUMBER}, Build #${BUILD_NUMBER}"
        }
    }
}

post {
    success {
        echo "Build #${BUILD_NUMBER} for Express.js project v${VERSION_NUMBER} completed successfully"
    }
    failure {
        echo "Build #${BUILD_NUMBER} for Express.js project v${VERSION_NUMBER} failed"
    }
}
