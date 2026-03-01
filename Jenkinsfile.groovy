pipeline {
    agent any
    tools {
        nodejs 'Node20'
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Test') {
            steps {
                // Playwright will now drop data into 'allure-results'
                sh 'npx playwright test'
            }
        }
    }
    post {
        always {
            // Generate and archive the Allure Report
            script {
                allure includeProperties: false, 
                       jdk: '', 
                       results: [[path: 'allure-results']]
            }
        }
    }
}
