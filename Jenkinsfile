#!/usr/bin/env groovy
@Library('jenkins-pipeline-helpers@master') _

properties([
  buildDiscarder(
    logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '20', daysToKeepStr: '', numToKeepStr: '50')
  ),
  disableConcurrentBuilds()
])

def maybeUpdateJira(scm) {
  if (env.BRANCH_NAME == 'master'){
    updateJira scm
  }
}

def runTheTests() {
  try {
    sh script: 'yarn run test:jenkins'
  } finally {
    junit 'test-report.xml'
    cobertura coberturaReportFile: 'coverage/*.xml', onlyStable: false
  }
}

def runLinting() {
  try {
    sh script: 'yarn run --silent lint:jenkins > eslint.xml'
  } finally {
    checkstyle pattern: 'eslint.xml'
  }
}

pipeline {
  agent {
    dockerfile { dir 'test' }
  }
  environment {
    CI = true
    FURY_AUTH = credentials('FURY_AUTH')
  }
  stages {
    stage('Install') {
      steps {
        sh 'yarn install'
      }
    }
    stage('Test') {
      steps {
        runTheTests()
      }
    }
    stage('Lint') {
      steps {
        runLinting()
      }
    }
  }
  post {
    unstable {
      maybeUpdateJira scm
    }
    failure {
      maybeUpdateJira scm
    }
    always {
      deleteDir()
      slackResult channel: "#deployments"
    }
  }
}