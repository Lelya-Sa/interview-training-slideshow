# Simple CI/CD Examples

This folder contains beginner-friendly, minimal CI/CD examples to help you understand the basics.

## 📚 Files

### `basic-ci.yml`
A minimal GitHub Actions workflow that demonstrates the core concepts:
- Checking out code
- Setting up the environment
- Installing dependencies
- Running tests
- Building the application

## 🎯 Learning Objectives

After studying these examples, you should understand:
1. What triggers a CI/CD pipeline
2. Basic pipeline structure
3. Common steps in a pipeline
4. How to read and understand CI/CD configuration files

## 🚀 Getting Started

1. **Read `basic-ci.yml`** - Start with the simplest example
2. **Understand each step** - What does each step do?
3. **Try it yourself** - Copy to your project and adapt
4. **Move to advanced examples** - Check out `github-actions/` folder

## 💡 Key Concepts

### Pipeline Trigger
```yaml
on:
  push:
    branches: [ main ]
```
This means: "Run the pipeline when code is pushed to the main branch"

### Job
```yaml
jobs:
  build-and-test:
```
A job is a collection of steps that run on the same machine

### Step
```yaml
- name: Run tests
  run: npm test
```
A step is a single action in the pipeline

## 📝 Next Steps

Once you understand the basics:
1. Explore `github-actions/nodejs-react.yml` for a complete example
2. Learn about caching, parallel jobs, and deployments
3. Study other platforms (GitLab CI, Jenkins)
4. Practice creating your own pipelines
