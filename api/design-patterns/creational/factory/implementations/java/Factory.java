/**
 * Factory Pattern - Java Implementations
 * 
 * Multiple approaches to implement Factory pattern in Java
 */

// ============================================================================
// 1. SIMPLE FACTORY
// ============================================================================
class SimpleFactory {
    public static Product createProduct(String type) {
        switch (type) {
            case "A":
                return new ProductA();
            case "B":
                return new ProductB();
            default:
                throw new IllegalArgumentException("Unknown product type: " + type);
        }
    }
}

interface Product {
    String getName();
    void doSomething();
}

class ProductA implements Product {
    @Override
    public String getName() {
        return "Product A";
    }
    
    @Override
    public void doSomething() {
        System.out.println("Product A doing something");
    }
}

class ProductB implements Product {
    @Override
    public String getName() {
        return "Product B";
    }
    
    @Override
    public void doSomething() {
        System.out.println("Product B doing something");
    }
}

// ============================================================================
// 2. FACTORY METHOD PATTERN
// ============================================================================
interface ProductInterface {
    String operation();
}

class ConcreteProductA implements ProductInterface {
    @Override
    public String operation() {
        return "Result of ConcreteProductA";
    }
}

class ConcreteProductB implements ProductInterface {
    @Override
    public String operation() {
        return "Result of ConcreteProductB";
    }
}

abstract class Creator {
    public abstract ProductInterface createProduct();
    
    public String someOperation() {
        ProductInterface product = createProduct();
        return "Creator: " + product.operation();
    }
}

class ConcreteCreatorA extends Creator {
    @Override
    public ProductInterface createProduct() {
        return new ConcreteProductA();
    }
}

class ConcreteCreatorB extends Creator {
    @Override
    public ProductInterface createProduct() {
        return new ConcreteProductB();
    }
}

// ============================================================================
// 3. DATABASE CONNECTION FACTORY
// ============================================================================
interface DatabaseConnection {
    DatabaseConnection connect();
    void query(String sql);
    void disconnect();
}

class MySQLConnection implements DatabaseConnection {
    private String host;
    private int port;
    private boolean connected = false;
    
    public MySQLConnection(String host, int port) {
        this.host = host;
        this.port = port;
    }
    
    @Override
    public DatabaseConnection connect() {
        System.out.println("Connecting to MySQL: " + host + ":" + port);
        this.connected = true;
        return this;
    }
    
    @Override
    public void query(String sql) {
        if (!connected) {
            throw new RuntimeException("Not connected to database");
        }
        System.out.println("MySQL Query: " + sql);
    }
    
    @Override
    public void disconnect() {
        this.connected = false;
        System.out.println("MySQL disconnected");
    }
}

class PostgreSQLConnection implements DatabaseConnection {
    private String host;
    private int port;
    private boolean connected = false;
    
    public PostgreSQLConnection(String host, int port) {
        this.host = host;
        this.port = port;
    }
    
    @Override
    public DatabaseConnection connect() {
        System.out.println("Connecting to PostgreSQL: " + host + ":" + port);
        this.connected = true;
        return this;
    }
    
    @Override
    public void query(String sql) {
        if (!connected) {
            throw new RuntimeException("Not connected to database");
        }
        System.out.println("PostgreSQL Query: " + sql);
    }
    
    @Override
    public void disconnect() {
        this.connected = false;
        System.out.println("PostgreSQL disconnected");
    }
}

class MongoDBConnection implements DatabaseConnection {
    private String host;
    private int port;
    private boolean connected = false;
    
    public MongoDBConnection(String host, int port) {
        this.host = host;
        this.port = port;
    }
    
    @Override
    public DatabaseConnection connect() {
        System.out.println("Connecting to MongoDB: " + host + ":" + port);
        this.connected = true;
        return this;
    }
    
    @Override
    public void query(String operation) {
        if (!connected) {
            throw new RuntimeException("Not connected to database");
        }
        System.out.println("MongoDB Operation: " + operation);
    }
    
    @Override
    public void disconnect() {
        this.connected = false;
        System.out.println("MongoDB disconnected");
    }
}

class DatabaseFactory {
    public static DatabaseConnection createConnection(String type, String host, int port) {
        switch (type.toLowerCase()) {
            case "mysql":
                return new MySQLConnection(host, port);
            case "postgresql":
                return new PostgreSQLConnection(host, port);
            case "mongodb":
                return new MongoDBConnection(host, port);
            default:
                throw new IllegalArgumentException("Unsupported database type: " + type);
        }
    }
}

// ============================================================================
// 4. PAYMENT PROCESSOR FACTORY
// ============================================================================
interface PaymentProcessor {
    PaymentResult processPayment(double amount);
}

class PaymentResult {
    private boolean success;
    private String transactionId;
    
    public PaymentResult(boolean success, String transactionId) {
        this.success = success;
        this.transactionId = transactionId;
    }
    
    public boolean isSuccess() {
        return success;
    }
    
    public String getTransactionId() {
        return transactionId;
    }
}

class CreditCardProcessor implements PaymentProcessor {
    @Override
    public PaymentResult processPayment(double amount) {
        System.out.println("Processing " + amount + " via Credit Card");
        return new PaymentResult(true, "CC-" + System.currentTimeMillis());
    }
}

class PayPalProcessor implements PaymentProcessor {
    @Override
    public PaymentResult processPayment(double amount) {
        System.out.println("Processing " + amount + " via PayPal");
        return new PaymentResult(true, "PP-" + System.currentTimeMillis());
    }
}

class BitcoinProcessor implements PaymentProcessor {
    @Override
    public PaymentResult processPayment(double amount) {
        System.out.println("Processing " + amount + " via Bitcoin");
        return new PaymentResult(true, "BTC-" + System.currentTimeMillis());
    }
}

class PaymentProcessorFactory {
    public static PaymentProcessor createProcessor(String type) {
        switch (type.toLowerCase()) {
            case "creditcard":
                return new CreditCardProcessor();
            case "paypal":
                return new PayPalProcessor();
            case "bitcoin":
                return new BitcoinProcessor();
            default:
                throw new IllegalArgumentException("Unsupported payment processor: " + type);
        }
    }
}

// ============================================================================
// 5. NOTIFICATION FACTORY
// ============================================================================
interface Notification {
    NotificationResult send();
}

class NotificationResult {
    private boolean success;
    private String method;
    
    public NotificationResult(boolean success, String method) {
        this.success = success;
        this.method = method;
    }
    
    public boolean isSuccess() {
        return success;
    }
    
    public String getMethod() {
        return method;
    }
}

class EmailNotification implements Notification {
    private String recipient;
    private String message;
    
    public EmailNotification(String recipient, String message) {
        this.recipient = recipient;
        this.message = message;
    }
    
    @Override
    public NotificationResult send() {
        System.out.println("Sending email to " + recipient + ": " + message);
        return new NotificationResult(true, "email");
    }
}

class SMSNotification implements Notification {
    private String recipient;
    private String message;
    
    public SMSNotification(String recipient, String message) {
        this.recipient = recipient;
        this.message = message;
    }
    
    @Override
    public NotificationResult send() {
        System.out.println("Sending SMS to " + recipient + ": " + message);
        return new NotificationResult(true, "sms");
    }
}

class PushNotification implements Notification {
    private String recipient;
    private String message;
    
    public PushNotification(String recipient, String message) {
        this.recipient = recipient;
        this.message = message;
    }
    
    @Override
    public NotificationResult send() {
        System.out.println("Sending push notification to " + recipient + ": " + message);
        return new NotificationResult(true, "push");
    }
}

class NotificationFactory {
    public static Notification createNotification(String type, String recipient, String message) {
        switch (type.toLowerCase()) {
            case "email":
                return new EmailNotification(recipient, message);
            case "sms":
                return new SMSNotification(recipient, message);
            case "push":
                return new PushNotification(recipient, message);
            default:
                throw new IllegalArgumentException("Unsupported notification type: " + type);
        }
    }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================
public class Factory {
    public static void main(String[] args) {
        // Simple Factory
        Product productA = SimpleFactory.createProduct("A");
        Product productB = SimpleFactory.createProduct("B");
        productA.doSomething();
        productB.doSomething();
        
        // Factory Method
        Creator creatorA = new ConcreteCreatorA();
        Creator creatorB = new ConcreteCreatorB();
        System.out.println(creatorA.someOperation());
        System.out.println(creatorB.someOperation());
        
        // Database Factory
        DatabaseConnection mysql = DatabaseFactory.createConnection("mysql", "localhost", 3306);
        mysql.connect().query("SELECT * FROM users");
        
        DatabaseConnection postgres = DatabaseFactory.createConnection("postgresql", "localhost", 5432);
        postgres.connect().query("SELECT * FROM users");
        
        // Payment Factory
        PaymentProcessor creditCard = PaymentProcessorFactory.createProcessor("creditcard");
        creditCard.processPayment(100);
        
        PaymentProcessor paypal = PaymentProcessorFactory.createProcessor("paypal");
        paypal.processPayment(200);
        
        // Notification Factory
        Notification email = NotificationFactory.createNotification("email", "user@example.com", "Hello!");
        email.send();
        
        Notification sms = NotificationFactory.createNotification("sms", "+1234567890", "Hello!");
        sms.send();
    }
}
