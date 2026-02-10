# Docker - Interview Material

## Definition
Docker is a platform for developing, shipping, and running applications using containerization technology.

## Key Concepts

### Container
- Lightweight, executable package
- Includes application and dependencies
- Runs isolated from host system
- Shares OS kernel with host

### Image
- Read-only template for creating containers
- Built from Dockerfile
- Stored in registries (Docker Hub)
- Immutable once created

### Dockerfile
- Text file with instructions
- Defines how to build image
- Commands: FROM, RUN, COPY, CMD, etc.

### Container vs Virtual Machine
- **Container**: Shares OS kernel, lighter, faster
- **VM**: Full OS, heavier, more isolated

## Docker Commands

### Basic Commands
```bash
docker build -t image-name .      # Build image
docker run -d image-name     # Run container in background
docker ps                   # List running containers
docker ps -a                # List all containers
docker stop container-id    # Stop container
docker rm container-id      # Remove container
docker images               # List images
docker rmi image-id         # Remove image
```

### Container Management
```bash
docker exec -it container-id bash  # Execute command in container
docker logs container-id            # View logs
docker inspect container-id         # Inspect container
docker cp file container-id:/path  # Copy file to/from container
```

## Dockerfile Example

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

## Docker Compose

- Define multi-container applications
- YAML file for configuration
- Manage services together

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
  db:
    image: postgres:14
    environment:
      POSTGRES_PASSWORD: password
```

## Benefits

- **Consistency**: Same environment everywhere
- **Isolation**: Applications don't interfere
- **Portability**: Run anywhere Docker runs
- **Efficiency**: Less resource usage than VMs
- **Scalability**: Easy to scale containers

## Use Cases

- Development environments
- Microservices
- CI/CD pipelines
- Production deployments
- Testing environments

## Best Practices

- Use .dockerignore
- Multi-stage builds for smaller images
- Don't run as root
- Use specific tags, not `latest`
- Minimize layers
- Use alpine images when possible
- Don't store secrets in images
- Health checks in Dockerfile

