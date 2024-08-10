pipeline {
  agent any
  stages {
    stage('Git Checkout') {
      steps {
        git(credentialsId: 'Github-1', url: 'git@github.com:MarttinezJS/SARWeb.git', branch: 'master')
      }
    }

  }
}