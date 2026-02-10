# CI/CD Definitions and Concepts

## Core Definitions

### CI/CD
**CI/CD** stands for **Continuous Integration** and **Continuous Deployment/Delivery**. It's a set of practices and tools that automate the software development lifecycle.

### Continuous Integration (CI)
**Definition**: The practice of frequently integrating code changes into a shared repository, where automated builds and tests are run.

**Key Points**:
- Developers commit code frequently (multiple times per day)
- Each commit triggers an automated build and test process
- Issues are detected early, before they reach production
- Reduces integration problems

**Benefits**:
- Early bug detection
- Faster feedback loop
- Reduced integration conflicts
- Higher code quality

### Continuous Delivery (CD)
**Definition**: The practice of keeping code in a deployable state at all times, with automated deployment to staging environments, but manual approval for production.

**Key Points**:
- Code is always ready to deploy
- Automated deployment to staging/test environments
- Manual approval gate before production
- Reduces deployment risk

**Benefits**:
- Faster time to market
- Lower deployment risk
- Consistent deployment process
- Easy rollback capability

### Continuous Deployment
**Definition**: The practice of automatically deploying every change that passes automated tests directly to production, without manual intervention.

**Key Points**:
- Fully automated deployment pipeline
- No manual approval gates
- Requires high confidence in automated tests
- Every successful build goes to production

**Benefits**:
- Fastest time to market
- Reduced manual work
- Consistent deployments
- Requires robust testing

## CI/CD Pipeline Stages

### 1. Source/Checkout
- **Purpose**: Get the latest code from version control
- **Tools**: Git, SVN, Mercurial
- **Actions**: Clone repository, checkout specific branch/commit

### 2. Build
- **Purpose**: Compile code, install dependencies, create artifacts
- **Examples**: 
  - `npm install` for Node.js
  - `mvn compile` for Java
  - `docker build` for containers
- **Output**: Build artifacts (compiled code, packages, images)

### 3. Test
- **Purpose**: Verify code quality and functionality
- **Types**:
  - **Unit Tests**: Test individual components
  - **Integration Tests**: Test component interactions
  - **E2E Tests**: Test complete user flows
  - **Performance Tests**: Test under load
- **Tools**: Jest, pytest, JUnit, Cypress, Selenium

### 4. Lint/Code Quality
- **Purpose**: Check code style and quality
- **Tools**: ESLint, Pylint, SonarQube
- **Checks**: Code style, complexity, security vulnerabilities

### 5. Security Scan
- **Purpose**: Identify security vulnerabilities
- **Types**:
  - Dependency scanning (npm audit, pip check)
  - Static code analysis (SAST)
  - Container scanning
- **Tools**: Snyk, OWASP Dependency Check, Trivy

### 6. Build Artifacts
- **Purpose**: Package application for deployment
- **Examples**:
  - Docker images
  - JAR/WAR files
  - npm packages
  - Compiled binaries

### 7. Deploy to Staging
- **Purpose**: Deploy to test environment for validation
- **Environment**: Staging/test servers
- **Validation**: Smoke tests, integration tests

### 8. Deploy to Production
- **Purpose**: Deploy to live environment
- **Strategies**:
  - **Blue-Green**: Two identical environments, switch traffic
  - **Canary**: Gradual rollout to subset of users
  - **Rolling**: Update instances one by one
- **Approval**: Manual or automatic based on policy

## Common CI/CD Tools

### Cloud-Based (SaaS)
1. **GitHub Actions**
   - Integrated with GitHub
   - YAML-based configuration
   - Free for public repos
   - Easy to use

2. **GitLab CI/CD**
   - Integrated with GitLab
   - YAML-based configuration
   - Built-in Docker registry
   - Comprehensive features

3. **CircleCI**
   - Fast builds
   - Parallel execution
   - Docker support
   - Good for startups

4. **Travis CI**
   - Simple configuration
   - Good for open source
   - Multiple language support

5. **Azure DevOps**
   - Microsoft ecosystem
   - Integrated with Azure
   - Good for enterprise

### Self-Hosted
1. **Jenkins**
   - Most popular self-hosted
   - Highly customizable
   - Large plugin ecosystem
   - Complex setup

2. **GitLab Runner**
   - Self-hosted GitLab CI runners
   - Flexible deployment
   - Good performance

3. **TeamCity**
   - JetBrains product
   - User-friendly UI
   - Good for .NET projects

## Pipeline Best Practices

### 1. Fast Feedback
- Keep pipeline execution time short
- Run critical tests first
- Use parallel execution
- Cache dependencies

### 2. Security
- Never commit secrets
- Use secret management tools
- Scan for vulnerabilities
- Use least privilege principle

### 3. Reliability
- Make pipelines idempotent
- Handle failures gracefully
- Implement retry logic
- Monitor pipeline health

### 4. Maintainability
- Keep configurations simple
- Use reusable components
- Document complex steps
- Version control pipeline configs

### 5. Visibility
- Clear stage names
- Detailed logs
- Test result reporting
- Deployment notifications

## Common Patterns

### Matrix Builds
Run tests against multiple versions/configurations:
```yaml
strategy:
  matrix:
    node-version: [14, 16, 18]
    os: [ubuntu-latest, windows-latest]
```

### Conditional Steps
Execute steps based on conditions:
```yaml
if: github.ref == 'refs/heads/main'
```

### Parallel Jobs
Run independent jobs simultaneously:
```yaml
jobs:
  test-unit:
  test-integration:
  test-e2e:
```

### Artifact Passing
Share files between jobs:
```yaml
artifacts:
  paths:
    - build/
```

## Deployment Strategies

### 1. Blue-Green Deployment
- Two identical production environments
- Deploy to inactive environment
- Switch traffic when ready
- Instant rollback by switching back

### 2. Canary Deployment
- Deploy to small subset of users
- Monitor metrics
- Gradually increase traffic
- Rollback if issues detected

### 3. Rolling Deployment
- Update instances one by one
- No downtime
- Gradual rollout
- Automatic rollback on failure

### 4. Feature Flags
- Deploy code with features disabled
- Enable features gradually
- Instant rollback by disabling flag
- A/B testing capability

## Interview Key Points

### What to Know:
1. **CI vs CD**: CI is automated testing, CD is automated deployment
2. **Pipeline Stages**: Source → Build → Test → Deploy
3. **Common Tools**: GitHub Actions, GitLab CI, Jenkins
4. **Best Practices**: Security, caching, parallelization
5. **Deployment Strategies**: Blue-green, canary, rolling

### Common Questions:
- "What is CI/CD?" → Explain CI and CD separately
- "How do you handle secrets?" → Secret management, never commit
- "How do you optimize pipelines?" → Caching, parallel jobs, conditional steps
- "What's your deployment strategy?" → Blue-green, canary, or rolling
- "How do you handle failures?" → Retry logic, rollback, monitoring

### Example Answers:
- **"Describe your CI/CD setup"**: "We use GitHub Actions with stages for checkout, install, test, build, and deploy. We cache dependencies, run tests in parallel, and deploy to staging automatically, with manual approval for production."
- **"How do you ensure quality?"**: "We run linters, unit tests, integration tests, and security scans. We also use code coverage requirements and require all tests to pass before deployment."
