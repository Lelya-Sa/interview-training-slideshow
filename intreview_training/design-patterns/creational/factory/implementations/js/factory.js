/**
 * Factory Pattern - JavaScript Implementations
 * 
 * Multiple approaches to implement Factory pattern in JavaScript
 */

// ============================================================================
// 1. SIMPLE FACTORY
// ============================================================================
class SimpleFactory {
    static createProduct(type) {
        switch (type) {
            case 'A':
                return new ProductA();
            case 'B':
                return new ProductB();
            default:
                throw new Error(`Unknown product type: ${type}`);
        }
    }
}

class ProductA {
    getName() {
        return 'Product A';
    }
    
    doSomething() {
        console.log('Product A doing something');
    }
}

class ProductB {
    getName() {
        return 'Product B';
    }
    
    doSomething() {
        console.log('Product B doing something');
    }
}

// ============================================================================
// 2. FACTORY METHOD PATTERN
// ============================================================================
// Abstract Creator
class Creator {
    // Factory method - to be overridden
    createProduct() {
        throw new Error('createProduct() must be implemented');
    }
    
    // Template method using factory method
    someOperation() {
        const product = this.createProduct();
        return `Creator: ${product.operation()}`;
    }
}

// Concrete Creators
class ConcreteCreatorA extends Creator {
    createProduct() {
        return new ConcreteProductA();
    }
}

class ConcreteCreatorB extends Creator {
    createProduct() {
        return new ConcreteProductB();
    }
}

// Product Interface
class Product {
    operation() {
        throw new Error('operation() must be implemented');
    }
}

// Concrete Products
class ConcreteProductA extends Product {
    operation() {
        return 'Result of ConcreteProductA';
    }
}

class ConcreteProductB extends Product {
    operation() {
        return 'Result of ConcreteProductB';
    }
}

// ============================================================================
// 3. DATABASE CONNECTION FACTORY
// ============================================================================
class DatabaseFactory {
    static createConnection(type, config) {
        switch (type.toLowerCase()) {
            case 'mysql':
                return new MySQLConnection(config);
            case 'postgresql':
                return new PostgreSQLConnection(config);
            case 'mongodb':
                return new MongoDBConnection(config);
            default:
                throw new Error(`Unsupported database type: ${type}`);
        }
    }
}

class DatabaseConnection {
    connect() {
        throw new Error('connect() must be implemented');
    }
    
    query(sql) {
        throw new Error('query() must be implemented');
    }
    
    disconnect() {
        throw new Error('disconnect() must be implemented');
    }
}

class MySQLConnection extends DatabaseConnection {
    constructor(config) {
        super();
        this.config = config;
        this.connected = false;
    }
    
    connect() {
        console.log(`Connecting to MySQL: ${this.config.host}:${this.config.port}`);
        this.connected = true;
        return this;
    }
    
    query(sql) {
        if (!this.connected) {
            throw new Error('Not connected to database');
        }
        console.log(`MySQL Query: ${sql}`);
        return { rows: [] };
    }
    
    disconnect() {
        this.connected = false;
        console.log('MySQL disconnected');
    }
}

class PostgreSQLConnection extends DatabaseConnection {
    constructor(config) {
        super();
        this.config = config;
        this.connected = false;
    }
    
    connect() {
        console.log(`Connecting to PostgreSQL: ${this.config.host}:${this.config.port}`);
        this.connected = true;
        return this;
    }
    
    query(sql) {
        if (!this.connected) {
            throw new Error('Not connected to database');
        }
        console.log(`PostgreSQL Query: ${sql}`);
        return { rows: [] };
    }
    
    disconnect() {
        this.connected = false;
        console.log('PostgreSQL disconnected');
    }
}

class MongoDBConnection extends DatabaseConnection {
    constructor(config) {
        super();
        this.config = config;
        this.connected = false;
    }
    
    connect() {
        console.log(`Connecting to MongoDB: ${this.config.host}:${this.config.port}`);
        this.connected = true;
        return this;
    }
    
    query(operation) {
        if (!this.connected) {
            throw new Error('Not connected to database');
        }
        console.log(`MongoDB Operation: ${operation}`);
        return { documents: [] };
    }
    
    disconnect() {
        this.connected = false;
        console.log('MongoDB disconnected');
    }
}

// ============================================================================
// 4. PAYMENT PROCESSOR FACTORY
// ============================================================================
class PaymentProcessorFactory {
    static createProcessor(type) {
        const processors = {
            'creditcard': () => new CreditCardProcessor(),
            'paypal': () => new PayPalProcessor(),
            'bitcoin': () => new BitcoinProcessor(),
            'stripe': () => new StripeProcessor()
        };
        
        const processor = processors[type.toLowerCase()];
        if (!processor) {
            throw new Error(`Unsupported payment processor: ${type}`);
        }
        
        return processor();
    }
}

class PaymentProcessor {
    processPayment(amount) {
        throw new Error('processPayment() must be implemented');
    }
}

class CreditCardProcessor extends PaymentProcessor {
    processPayment(amount) {
        console.log(`Processing ${amount} via Credit Card`);
        return { success: true, transactionId: 'CC-' + Date.now() };
    }
}

class PayPalProcessor extends PaymentProcessor {
    processPayment(amount) {
        console.log(`Processing ${amount} via PayPal`);
        return { success: true, transactionId: 'PP-' + Date.now() };
    }
}

class BitcoinProcessor extends PaymentProcessor {
    processPayment(amount) {
        console.log(`Processing ${amount} via Bitcoin`);
        return { success: true, transactionId: 'BTC-' + Date.now() };
    }
}

class StripeProcessor extends PaymentProcessor {
    processPayment(amount) {
        console.log(`Processing ${amount} via Stripe`);
        return { success: true, transactionId: 'STR-' + Date.now() };
    }
}

// ============================================================================
// 5. NOTIFICATION FACTORY
// ============================================================================
class NotificationFactory {
    static createNotification(type, recipient, message) {
        const notifications = {
            'email': () => new EmailNotification(recipient, message),
            'sms': () => new SMSNotification(recipient, message),
            'push': () => new PushNotification(recipient, message),
            'slack': () => new SlackNotification(recipient, message)
        };
        
        const notification = notifications[type.toLowerCase()];
        if (!notification) {
            throw new Error(`Unsupported notification type: ${type}`);
        }
        
        return notification();
    }
}

class Notification {
    constructor(recipient, message) {
        this.recipient = recipient;
        this.message = message;
    }
    
    send() {
        throw new Error('send() must be implemented');
    }
}

class EmailNotification extends Notification {
    send() {
        console.log(`Sending email to ${this.recipient}: ${this.message}`);
        return { success: true, method: 'email' };
    }
}

class SMSNotification extends Notification {
    send() {
        console.log(`Sending SMS to ${this.recipient}: ${this.message}`);
        return { success: true, method: 'sms' };
    }
}

class PushNotification extends Notification {
    send() {
        console.log(`Sending push notification to ${this.recipient}: ${this.message}`);
        return { success: true, method: 'push' };
    }
}

class SlackNotification extends Notification {
    send() {
        console.log(`Sending Slack message to ${this.recipient}: ${this.message}`);
        return { success: true, method: 'slack' };
    }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Simple Factory
const productA = SimpleFactory.createProduct('A');
const productB = SimpleFactory.createProduct('B');
productA.doSomething();
productB.doSomething();

// Factory Method
const creatorA = new ConcreteCreatorA();
const creatorB = new ConcreteCreatorB();
console.log(creatorA.someOperation());
console.log(creatorB.someOperation());

// Database Factory
const mysql = DatabaseFactory.createConnection('mysql', { host: 'localhost', port: 3306 });
mysql.connect().query('SELECT * FROM users');

const postgres = DatabaseFactory.createConnection('postgresql', { host: 'localhost', port: 5432 });
postgres.connect().query('SELECT * FROM users');

// Payment Factory
const creditCard = PaymentProcessorFactory.createProcessor('creditcard');
creditCard.processPayment(100);

const paypal = PaymentProcessorFactory.createProcessor('paypal');
paypal.processPayment(200);

// Notification Factory
const email = NotificationFactory.createNotification('email', 'user@example.com', 'Hello!');
email.send();

const sms = NotificationFactory.createNotification('sms', '+1234567890', 'Hello!');
sms.send();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SimpleFactory,
        DatabaseFactory,
        PaymentProcessorFactory,
        NotificationFactory
    };
}
