# CI/CD - Interview Material

## Definition

**CI/CD** stands for **Continuous Integration** and **Continuous Deployment/Delivery**. It's a set of practices and tools that automate the software development lifecycle, enabling teams to deliver code changes more frequently and reliably.

### Key Concepts

- **Continuous Integration (CI)**: Practice of frequently integrating code changes into a shared repository, where automated builds and tests are run
- **Continuous Delivery**: Code is always deployable, with automated deployment to staging, but manual approval for production
- **Continuous Deployment**: Automatically deploying every change that passes tests directly to production

## 📁 Folder Structure

This folder contains:
- **README.md** (this file) - Definitions and overview
- **questions.md** - Interview questions and answers
- **examples/** - Practical CI/CD pipeline examples and configurations
  - GitHub Actions examples
  - GitLab CI examples
  - Jenkins examples
  - CircleCI examples
  - Azure DevOps examples
  - Simple beginner examples

## 🎯 Key Topics

### Core Concepts
- CI vs CD vs Continuous Deployment
- Pipeline stages (Source → Build → Test → Deploy)
- Build automation
- Test automation
- Deployment automation

### Tools and Platforms
- GitHub Actions
- GitLab CI/CD
- Jenkins
- CircleCI
- Azure DevOps
- Travis CI

### Best Practices
- Secret management
- Caching dependencies
- Parallel job execution
- Conditional deployments
- Rollback strategies
- Multi-environment support

### Deployment Strategies
- Blue-Green Deployment
- Canary Deployment
- Rolling Deployment
- Feature Flags

## 📚 Learning Resources

1. **Start Here**: Read `questions.md` for interview questions
2. **Study Examples**: Explore `examples/` folder for practical configurations
3. **Beginner Friendly**: Check `examples/simple-example/` for basic concepts
4. **Definitions**: See `examples/definitions.md` for detailed explanations

## 💡 Interview Tips

When discussing CI/CD in interviews:
- Explain the difference between CI and CD
- Describe pipeline stages and their purpose
- Mention specific tools you've used
- Discuss best practices (secrets, caching, parallelization)
- Talk about deployment strategies
- Reference real examples from the `examples/` folder

## 🔗 Related Topics

- **Docker** (`../docker/`) - Containerization for CI/CD
- **Kubernetes** (`../kubernetes/`) - Container orchestration
- **Scaling** (`../scaling/`) - Scaling strategies
- **Observability** (`../observability/`) - Monitoring deployments
