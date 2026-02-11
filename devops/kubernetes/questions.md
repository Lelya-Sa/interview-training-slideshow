# Kubernetes - Interview Questions

## Questions (1-15)

### 1. What is Kubernetes?
**Answer:** Container orchestration platform. Automates deployment, scaling, management of containerized applications.

### 2. What are Kubernetes pods?
**Answer:** Smallest deployable unit. Contains one or more containers, shared network and storage, co-located, scheduled together.

### 3. What is a deployment in Kubernetes?
**Answer:** Manages replica set of pods. Declarative updates, rolling updates, rollbacks, scaling, self-healing.

### 4. What are Kubernetes services?
**Answer:** Abstraction exposing pods as network service. Provides stable IP, load balancing, service discovery.

### 5. What is a namespace in Kubernetes?
**Answer:** Virtual cluster within cluster. Isolates resources, organize objects, separate environments, resource quotas.

### 6. What are ConfigMaps and Secrets?
**Answer:** ConfigMaps: store configuration data. Secrets: store sensitive data (base64 encoded). Injected into pods.

### 7. How does Kubernetes handle scaling?
**Answer:** Horizontal Pod Autoscaler (HPA) scales based on metrics. Manual scaling with replicas. Cluster autoscaler for nodes.

### 8. What is a Kubernetes ingress?
**Answer:** Manages external access to services. HTTP/HTTPS routing, load balancing, SSL termination, domain-based routing.

### 9. How do you update applications in Kubernetes?
**Answer:** Rolling updates (gradual replacement), blue-green (switch between versions), canary (gradual traffic shift).

### 10. What are Kubernetes volumes?
**Answer:** Storage attached to pods. Types: emptyDir, persistentVolume, configMap, secret. Persist data beyond pod lifetime.

### 11. What is Kubernetes networking?
**Answer:** Pod network, service networking, ingress networking. Each pod has IP, services provide stable endpoints, CNI plugins.

### 12. How do you monitor Kubernetes?
**Answer:** Metrics server, Prometheus, Grafana, logging (EFK stack), health checks, resource usage, application metrics.

### 13. What is a StatefulSet?
**Answer:** Manages stateful applications. Stable network identity, ordered deployment, persistent storage, pod naming.

### 14. How do you handle secrets in Kubernetes?
**Answer:** Create Secret objects, mount as volumes or env vars, use external secret managers, encrypt at rest, RBAC.

### 15. What is Helm in Kubernetes?
**Answer:** Package manager for Kubernetes. Charts define applications, templating, versioning, simplifies deployment of complex apps.
