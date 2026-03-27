# Security Keys - Interview Questions

## Questions (1-10)

### 1. What is the difference between symmetric and asymmetric encryption?
**Answer:** Symmetric: same key for encrypt/decrypt (fast, key distribution challenge). Asymmetric: public/private key pair (secure, slower).

### 2. What are encryption keys?
**Answer:** Values used in encryption algorithms to encrypt/decrypt data. Must be kept secret (symmetric) or private key secret (asymmetric).

### 3. How does RSA encryption work?
**Answer:** Asymmetric algorithm. Public key encrypts, private key decrypts. Based on mathematical difficulty of factoring large numbers.

### 4. How does AES encryption work?
**Answer:** Symmetric algorithm. Same key encrypts and decrypts. Block cipher, key sizes 128, 192, 256 bits. Fast and secure.

### 5. What is key management?
**Answer:** Process of generating, storing, distributing, rotating, revoking encryption keys. Critical for security, use key management systems.

### 6. What is key rotation?
**Answer:** Regularly changing encryption keys. Reduces risk if key compromised, limits damage, follows compliance requirements.

### 7. How do you store encryption keys securely?
**Answer:** Use key management services (AWS KMS, Azure Key Vault), hardware security modules (HSM), never hardcode, encrypt at rest.

### 8. What is a public key infrastructure (PKI)?
**Answer:** Framework for managing digital certificates and public-private key pairs. Certificate authorities, certificate validation, trust chains.

### 9. What is digital signature?
**Answer:** Mathematical scheme verifying authenticity and integrity. Private key signs, public key verifies. Ensures message not tampered.

### 10. When would you use symmetric vs asymmetric encryption?
**Answer:** Symmetric: bulk data encryption (fast). Asymmetric: key exchange, digital signatures, SSL/TLS handshake (secure key distribution).

