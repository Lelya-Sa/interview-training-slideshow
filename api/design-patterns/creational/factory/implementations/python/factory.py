"""
Factory Pattern - Python Implementations

Multiple approaches to implement Factory pattern in Python
"""

from abc import ABC, abstractmethod

# ============================================================================
# 1. SIMPLE FACTORY
# ============================================================================
class SimpleFactory:
    @staticmethod
    def create_product(product_type):
        if product_type == 'A':
            return ProductA()
        elif product_type == 'B':
            return ProductB()
        else:
            raise ValueError(f"Unknown product type: {product_type}")

class ProductA:
    def get_name(self):
        return 'Product A'
    
    def do_something(self):
        print('Product A doing something')

class ProductB:
    def get_name(self):
        return 'Product B'
    
    def do_something(self):
        print('Product B doing something')

# ============================================================================
# 2. FACTORY METHOD PATTERN
# ============================================================================
class Product(ABC):
    @abstractmethod
    def operation(self):
        pass

class ConcreteProductA(Product):
    def operation(self):
        return 'Result of ConcreteProductA'

class ConcreteProductB(Product):
    def operation(self):
        return 'Result of ConcreteProductB'

class Creator(ABC):
    @abstractmethod
    def create_product(self):
        pass
    
    def some_operation(self):
        product = self.create_product()
        return f"Creator: {product.operation()}"

class ConcreteCreatorA(Creator):
    def create_product(self):
        return ConcreteProductA()

class ConcreteCreatorB(Creator):
    def create_product(self):
        return ConcreteProductB()

# ============================================================================
# 3. DATABASE CONNECTION FACTORY
# ============================================================================
class DatabaseConnection(ABC):
    @abstractmethod
    def connect(self):
        pass
    
    @abstractmethod
    def query(self, sql):
        pass
    
    @abstractmethod
    def disconnect(self):
        pass

class MySQLConnection(DatabaseConnection):
    def __init__(self, config):
        self.config = config
        self.connected = False
    
    def connect(self):
        print(f"Connecting to MySQL: {self.config['host']}:{self.config['port']}")
        self.connected = True
        return self
    
    def query(self, sql):
        if not self.connected:
            raise Exception("Not connected to database")
        print(f"MySQL Query: {sql}")
        return {"rows": []}
    
    def disconnect(self):
        self.connected = False
        print("MySQL disconnected")

class PostgreSQLConnection(DatabaseConnection):
    def __init__(self, config):
        self.config = config
        self.connected = False
    
    def connect(self):
        print(f"Connecting to PostgreSQL: {self.config['host']}:{self.config['port']}")
        self.connected = True
        return self
    
    def query(self, sql):
        if not self.connected:
            raise Exception("Not connected to database")
        print(f"PostgreSQL Query: {sql}")
        return {"rows": []}
    
    def disconnect(self):
        self.connected = False
        print("PostgreSQL disconnected")

class MongoDBConnection(DatabaseConnection):
    def __init__(self, config):
        self.config = config
        self.connected = False
    
    def connect(self):
        print(f"Connecting to MongoDB: {self.config['host']}:{self.config['port']}")
        self.connected = True
        return self
    
    def query(self, operation):
        if not self.connected:
            raise Exception("Not connected to database")
        print(f"MongoDB Operation: {operation}")
        return {"documents": []}
    
    def disconnect(self):
        self.connected = False
        print("MongoDB disconnected")

class DatabaseFactory:
    @staticmethod
    def create_connection(db_type, config):
        factories = {
            'mysql': MySQLConnection,
            'postgresql': PostgreSQLConnection,
            'mongodb': MongoDBConnection
        }
        
        connection_class = factories.get(db_type.lower())
        if not connection_class:
            raise ValueError(f"Unsupported database type: {db_type}")
        
        return connection_class(config)

# ============================================================================
# 4. PAYMENT PROCESSOR FACTORY
# ============================================================================
class PaymentProcessor(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass

class CreditCardProcessor(PaymentProcessor):
    def process_payment(self, amount):
        print(f"Processing {amount} via Credit Card")
        return {"success": True, "transaction_id": f"CC-{__import__('time').time()}"}

class PayPalProcessor(PaymentProcessor):
    def process_payment(self, amount):
        print(f"Processing {amount} via PayPal")
        return {"success": True, "transaction_id": f"PP-{__import__('time').time()}"}

class BitcoinProcessor(PaymentProcessor):
    def process_payment(self, amount):
        print(f"Processing {amount} via Bitcoin")
        return {"success": True, "transaction_id": f"BTC-{__import__('time').time()}"}

class PaymentProcessorFactory:
    @staticmethod
    def create_processor(processor_type):
        processors = {
            'creditcard': CreditCardProcessor,
            'paypal': PayPalProcessor,
            'bitcoin': BitcoinProcessor
        }
        
        processor_class = processors.get(processor_type.lower())
        if not processor_class:
            raise ValueError(f"Unsupported payment processor: {processor_type}")
        
        return processor_class()

# ============================================================================
# 5. NOTIFICATION FACTORY
# ============================================================================
class Notification(ABC):
    def __init__(self, recipient, message):
        self.recipient = recipient
        self.message = message
    
    @abstractmethod
    def send(self):
        pass

class EmailNotification(Notification):
    def send(self):
        print(f"Sending email to {self.recipient}: {self.message}")
        return {"success": True, "method": "email"}

class SMSNotification(Notification):
    def send(self):
        print(f"Sending SMS to {self.recipient}: {self.message}")
        return {"success": True, "method": "sms"}

class PushNotification(Notification):
    def send(self):
        print(f"Sending push notification to {self.recipient}: {self.message}")
        return {"success": True, "method": "push"}

class NotificationFactory:
    @staticmethod
    def create_notification(notification_type, recipient, message):
        notifications = {
            'email': EmailNotification,
            'sms': SMSNotification,
            'push': PushNotification
        }
        
        notification_class = notifications.get(notification_type.lower())
        if not notification_class:
            raise ValueError(f"Unsupported notification type: {notification_type}")
        
        return notification_class(recipient, message)

# ============================================================================
# USAGE EXAMPLES
# ============================================================================
if __name__ == "__main__":
    # Simple Factory
    product_a = SimpleFactory.create_product('A')
    product_b = SimpleFactory.create_product('B')
    product_a.do_something()
    product_b.do_something()
    
    # Factory Method
    creator_a = ConcreteCreatorA()
    creator_b = ConcreteCreatorB()
    print(creator_a.some_operation())
    print(creator_b.some_operation())
    
    # Database Factory
    mysql = DatabaseFactory.create_connection('mysql', {'host': 'localhost', 'port': 3306})
    mysql.connect().query('SELECT * FROM users')
    
    postgres = DatabaseFactory.create_connection('postgresql', {'host': 'localhost', 'port': 5432})
    postgres.connect().query('SELECT * FROM users')
    
    # Payment Factory
    credit_card = PaymentProcessorFactory.create_processor('creditcard')
    credit_card.process_payment(100)
    
    paypal = PaymentProcessorFactory.create_processor('paypal')
    paypal.process_payment(200)
    
    # Notification Factory
    email = NotificationFactory.create_notification('email', 'user@example.com', 'Hello!')
    email.send()
    
    sms = NotificationFactory.create_notification('sms', '+1234567890', 'Hello!')
    sms.send()
