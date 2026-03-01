pipeline {
    agent any
    tools {
        nodejs 'Node20' 
    }
    stages {
        stage('Install') {
            steps {
                // Use 'bat' for Windows instead of 'sh'
                bat 'npm ci'
                bat 'npx playwright install --with-deps'
            }
        }
        stage('Test') {
            steps {
                // Use 'bat' here as well
                bat 'npx playwright test'
            }
        }
    }
    post {
        always {
            script {
                allure includeProperties: false, 
                       jdk: '', 
                       results: [[path: 'allure-results']]
            }
        }
    }
}