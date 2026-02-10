# Docker - Interview Questions

## Questions (1-15)

### 1. What is Docker? How does it work?
**Answer:** Docker is containerization platform. Packages applications with dependencies into containers that run consistently anywhere.

### 2. Explain the difference between Docker image and container.
**Answer:** Image is read-only template. Container is running instance of image.

### 3. What is a Dockerfile?
**Answer:** Text file with instructions to build Docker image. Contains base image, commands, and configuration.

### 4. Explain the difference between container and virtual machine.
**Answer:** Container shares OS kernel, lighter. VM has full OS, more isolated but heavier.

### 5. What is Docker Compose?
**Answer:** Tool for defining and running multi-container Docker applications using YAML file.

### 6. What are Docker volumes?
**Answer:** Persistent storage for containers. Data survives container deletion.

### 7. Explain Docker networking.
**Answer:** Containers can communicate via Docker networks. Bridge network is default, containers can be on same or different networks.

### 8. What is the difference between CMD and ENTRYPOINT?
**Answer:** CMD provides default command, can be overridden. ENTRYPOINT sets main command, always executed.

### 9. How do you optimize Docker images?
**Answer:** Use multi-stage builds, alpine images, minimize layers, use .dockerignore, combine RUN commands.

### 10. What is Docker Hub?
**Answer:** Public registry for Docker images. Can push/pull images, similar to GitHub for code.

### 11. Explain Docker layers and caching.
**Answer:** Dockerfile commands create layers. Unchanged layers are cached, speeding up builds.

### 12. How do you handle secrets in Docker?
**Answer:** Use environment variables, Docker secrets, or external secret management. Never hardcode in Dockerfile.

### 13. What is the difference between COPY and ADD?
**Answer:** COPY copies files. ADD can copy and extract archives, fetch from URLs. Prefer COPY.

### 14. How do you debug a Docker container?
**Answer:** Use `docker exec` to enter container, `docker logs` for logs, `docker inspect` for details.

### 15. What are Docker best practices?
**Answer:** Use .dockerignore, multi-stage builds, don't run as root, use specific tags, minimize layers, health checks.

