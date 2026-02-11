# CI/CD - Interview Questions

## Questions (1-15)

### 1. What is CI/CD?
**Answer:** Continuous Integration (automated testing on code commits) and Continuous Deployment (automated deployment to production).

### 2. What is Continuous Integration?
**Answer:** Practice of frequently integrating code, running automated tests, detecting issues early. Merge code often, test automatically.

### 3. What is Continuous Deployment?
**Answer:** Automatically deploying code to production after tests pass. Every change goes to production automatically.

### 4. What is Continuous Delivery?
**Answer:** Code is always deployable, but deployment is manual. Automated up to production, human approval for release.

### 5. What are the benefits of CI/CD?
**Answer:** Faster releases, early bug detection, reduced manual work, consistent deployments, faster feedback, improved quality.

### 6. What is a CI/CD pipeline?
**Answer:** Automated sequence of steps: build, test, deploy. Defined in configuration file, runs on code changes.

### 7. What are common CI/CD tools?
**Answer:** Jenkins, GitHub Actions, GitLab CI, CircleCI, Travis CI, Azure DevOps, AWS CodePipeline, TeamCity.

### 8. What stages are in a CI/CD pipeline?
**Answer:** Source (code checkout), Build (compile), Test (unit, integration), Deploy (staging, production), Verify (health checks).

### 9. How do you handle secrets in CI/CD?
**Answer:** Use secret management (vaults, environment variables), never commit secrets, use CI/CD secret stores, rotate regularly.

### 10. What is blue-green deployment?
**Answer:** Two identical environments (blue, green). Deploy to inactive one, switch traffic when ready. Enables instant rollback.

### 11. What is canary deployment?
**Answer:** Deploy new version to small subset of users, monitor, gradually increase traffic. Reduces risk of bad releases.

### 12. How do you implement CI/CD for microservices?
**Answer:** Separate pipelines per service, independent deployments, service-specific tests, versioning, integration tests between services.

### 13. What is infrastructure as code (IaC) in CI/CD?
**Answer:** Define infrastructure in code (Terraform, CloudFormation). Version control, reproducible, automated provisioning in pipeline.

### 14. How do you test in CI/CD pipeline?
**Answer:** Unit tests, integration tests, e2e tests, linting, security scanning, performance tests, run in parallel when possible.

### 15. How do you handle deployment failures?
**Answer:** Automated rollback, health checks, monitoring, alerts, gradual rollout, feature flags, canary deployments.
