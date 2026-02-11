# CI/CD Examples and Definitions

This folder contains practical CI/CD pipeline examples for different platforms commonly used in fullstack development.

## 📚 Contents

### 1. GitHub Actions
- **Location**: `github-actions/`
- **Files**: `.github/workflows/` examples
- **Use Cases**: Node.js, React, Python, Docker builds, deployments

### 2. GitLab CI
- **Location**: `gitlab-ci/`
- **Files**: `.gitlab-ci.yml` examples
- **Use Cases**: Multi-stage pipelines, Docker builds, deployments

### 3. Jenkins
- **Location**: `jenkins/`
- **Files**: `Jenkinsfile` examples (Declarative and Scripted)
- **Use Cases**: Complex pipelines, multi-branch builds

### 4. CircleCI
- **Location**: `circleci/`
- **Files**: `.circleci/config.yml` examples
- **Use Cases**: Fast builds, parallel jobs, Docker workflows

### 5. Azure DevOps
- **Location**: `azure-devops/`
- **Files**: `azure-pipelines.yml` examples
- **Use Cases**: Microsoft ecosystem, .NET applications

## 🎯 Learning Path

1. **Start with GitHub Actions** - Most common, easy to understand
2. **Learn GitLab CI** - Similar concepts, different syntax
3. **Explore Jenkins** - More complex, powerful for enterprise
4. **Review CircleCI** - Modern, cloud-native approach
5. **Study Azure DevOps** - Enterprise Microsoft stack

## 🔑 Key Concepts in Examples

### Common Pipeline Stages:
1. **Checkout** - Get source code
2. **Install Dependencies** - npm install, pip install, etc.
3. **Build** - Compile, bundle, build artifacts
4. **Test** - Run unit, integration, e2e tests
5. **Lint** - Code quality checks
6. **Security Scan** - Vulnerability scanning
7. **Build Docker Image** - Container creation
8. **Deploy** - Push to staging/production

### Best Practices Demonstrated:
- ✅ Environment variables and secrets management
- ✅ Caching dependencies for faster builds
- ✅ Parallel job execution
- ✅ Conditional deployments
- ✅ Rollback strategies
- ✅ Multi-environment support

## 📖 How to Use These Examples

1. **Read the comments** - Each file has detailed explanations
2. **Adapt to your project** - Modify paths, commands, environments
3. **Test locally first** - Use CI/CD tools locally when possible
4. **Start simple** - Begin with basic pipelines, add complexity gradually
5. **Understand each step** - Don't copy blindly, understand what each step does

## 🚀 Quick Start

### For a Node.js/React Project:
```bash
# Copy GitHub Actions example
cp github-actions/nodejs-react.yml .github/workflows/ci.yml

# Copy GitLab CI example
cp gitlab-ci/nodejs-react.yml .gitlab-ci.yml
```

### For a Python/Django Project:
```bash
# Copy GitHub Actions example
cp github-actions/python-django.yml .github/workflows/ci.yml
```

## 💡 Interview Tips

When discussing CI/CD in interviews:
- **Explain the pipeline flow** - Checkout → Build → Test → Deploy
- **Mention specific tools** - "I've used GitHub Actions for..."
- **Discuss best practices** - Secrets management, caching, parallelization
- **Talk about challenges** - Flaky tests, deployment failures, rollbacks
- **Show examples** - Reference specific pipeline configurations

## 📝 Common Interview Questions

1. **"How would you set up CI/CD for a React app?"**
   - Answer: Use GitHub Actions with stages for install, build, test, deploy
   - Reference: `github-actions/nodejs-react.yml`

2. **"How do you handle secrets in CI/CD?"**
   - Answer: Use platform secret stores, environment variables, never commit secrets
   - Reference: All examples show proper secret usage

3. **"What's the difference between CI and CD?"**
   - CI: Automated testing on every commit
   - CD: Automated deployment (Continuous Deployment) or manual approval (Continuous Delivery)

4. **"How do you optimize CI/CD pipelines?"**
   - Answer: Caching dependencies, parallel jobs, conditional steps, matrix builds
   - Reference: Examples show caching and parallelization

## 🔗 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [CircleCI Documentation](https://circleci.com/docs/)
- [Azure DevOps Documentation](https://docs.microsoft.com/en-us/azure/devops/)
