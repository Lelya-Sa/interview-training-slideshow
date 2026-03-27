# gRPC - Interview Questions

## Questions (1-10)

### 1. What is gRPC?
**Answer:** High-performance RPC framework using HTTP/2 and Protocol Buffers. Enables efficient communication between services.

### 2. What are the advantages of gRPC?
**Answer:** Performance (HTTP/2, binary), strong typing (protobuf), streaming, code generation, language agnostic.

### 3. What is Protocol Buffers?
**Answer:** Binary serialization format. More efficient than JSON, strongly typed, language-neutral, backward compatible.

### 4. What are gRPC service types?
**Answer:** Unary (request-response), server streaming, client streaming, bidirectional streaming.

### 5. How does gRPC compare to REST?
**Answer:** gRPC: binary, HTTP/2, streaming, code generation. REST: JSON, HTTP/1.1, stateless, simple.

### 6. When would you use gRPC?
**Answer:** Microservices communication, high performance needed, streaming data, polyglot environments, internal APIs.

### 7. What is the difference between gRPC and GraphQL?
**Answer:** gRPC: RPC, binary, streaming, code generation. GraphQL: query language, JSON, client-driven queries.

### 8. How do you handle errors in gRPC?
**Answer:** Status codes and error messages. Use status codes like NOT_FOUND, INVALID_ARGUMENT, INTERNAL. Include error details.

### 9. What is gRPC-Web?
**Answer:** JavaScript client for browsers. Translates gRPC to HTTP/1.1, enables browser clients to use gRPC services.

### 10. How do you implement authentication in gRPC?
**Answer:** Use interceptors, metadata for tokens, TLS for encryption, implement authentication logic in interceptor.

