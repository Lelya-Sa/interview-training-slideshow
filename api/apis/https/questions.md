# HTTPS - Interview Questions

## Questions (1-10)

### 1. What is HTTPS? How does it differ from HTTP?
**Answer:** HTTPS is HTTP over TLS/SSL encryption. Provides secure communication, encrypts data in transit.

### 2. How does SSL/TLS work?
**Answer:** Handshake establishes encrypted connection: client hello, server certificate, key exchange, symmetric encryption.

### 3. What is a digital certificate?
**Answer:** Electronic document proving identity. Contains public key, domain, issuer, expiration, digital signature.

### 4. What is a Certificate Authority (CA)?
**Answer:** Trusted entity that issues digital certificates. Verifies identity before issuing certificates.

### 5. Explain the TLS handshake process.
**Answer:** Client hello, server hello + certificate, client verification, key exchange, cipher suite agreement, encrypted communication.

### 6. What is the difference between symmetric and asymmetric encryption?
**Answer:** Symmetric: same key for encrypt/decrypt (fast). Asymmetric: public/private key pair (secure key exchange).

### 7. Why is HTTPS important?
**Answer:** Prevents eavesdropping, man-in-the-middle attacks, data tampering, protects sensitive information.

### 8. What is HTTP Strict Transport Security (HSTS)?
**Answer:** Security header forcing browsers to use HTTPS. Prevents downgrade attacks.

### 9. What happens if a certificate is invalid or expired?
**Answer:** Browser shows warning, user can proceed but connection not secure. Should not accept invalid certificates.

### 10. How do you implement HTTPS in a web application?
**Answer:** Obtain SSL certificate, configure web server (Nginx, Apache), redirect HTTP to HTTPS, use port 443.

