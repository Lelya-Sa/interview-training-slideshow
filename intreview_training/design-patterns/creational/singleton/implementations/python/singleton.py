"""
Singleton Pattern - Python Implementations

Multiple approaches to implement Singleton pattern in Python
"""

# ============================================================================
# 1. MODULE-LEVEL SINGLETON (Simplest - Pythonic way)
# ============================================================================
# In Python, modules are singletons by default
# Just create instance at module level
_singleton_instance = None

def get_singleton():
    global _singleton_instance
    if _singleton_instance is None:
        _singleton_instance = SingletonClass()
    return _singleton_instance


# ============================================================================
# 2. DECORATOR APPROACH
# ============================================================================
def singleton(cls):
    """Decorator to make a class a singleton"""
    instances = {}
    
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    
    return get_instance


@singleton
class DecoratedSingleton:
    def __init__(self):
        self.data = "Decorated Singleton Data"
    
    def get_data(self):
        return self.data


# ============================================================================
# 3. __new__ METHOD APPROACH (Classic Python way)
# ============================================================================
class ClassicSingleton:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ClassicSingleton, cls).__new__(cls)
            cls._instance.data = "Classic Singleton Data"
        return cls._instance
    
    def get_data(self):
        return self.data


# ============================================================================
# 4. METACLASS APPROACH (Advanced)
# ============================================================================
class SingletonMeta(type):
    """Metaclass for creating singleton classes"""
    _instances = {}
    
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(SingletonMeta, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class MetaclassSingleton(metaclass=SingletonMeta):
    def __init__(self):
        self.data = "Metaclass Singleton Data"
    
    def get_data(self):
        return self.data


# ============================================================================
# 5. THREAD-SAFE SINGLETON
# ============================================================================
import threading

class ThreadSafeSingleton:
    _instance = None
    _lock = threading.Lock()
    
    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                # Double-checked locking pattern
                if cls._instance is None:
                    cls._instance = super(ThreadSafeSingleton, cls).__new__(cls)
                    cls._instance.data = "Thread-Safe Singleton Data"
        return cls._instance
    
    def get_data(self):
        return self.data


# ============================================================================
# 6. DATABASE CONNECTION EXAMPLE
# ============================================================================
class DatabaseConnection:
    _instance = None
    _lock = threading.Lock()
    
    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super(DatabaseConnection, cls).__new__(cls)
                    cls._instance.connected = False
                    cls._instance.connection_string = ""
        return cls._instance
    
    def connect(self, connection_string):
        if self.connected:
            print("Already connected")
            return self
        
        self.connection_string = connection_string
        self.connected = True
        print(f"Connected to: {connection_string}")
        return self
    
    def disconnect(self):
        self.connected = False
        print("Disconnected")
    
    def query(self, sql):
        if not self.connected:
            raise Exception("Not connected to database")
        print(f"Executing: {sql}")
        return {"rows": []}


# ============================================================================
# 7. LOGGER EXAMPLE
# ============================================================================
class Logger:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Logger, cls).__new__(cls)
            cls._instance.logs = []
        return cls._instance
    
    def log(self, level, message):
        log_entry = {
            "timestamp": __import__('datetime').datetime.now().isoformat(),
            "level": level,
            "message": message
        }
        self.logs.append(log_entry)
        print(f"[{log_entry['timestamp']}] {level}: {message}")
    
    def info(self, message):
        self.log("INFO", message)
    
    def error(self, message):
        self.log("ERROR", message)
    
    def warn(self, message):
        self.log("WARN", message)
    
    def get_logs(self):
        return self.logs
    
    def clear_logs(self):
        self.logs = []


# ============================================================================
# USAGE EXAMPLES
# ============================================================================
if __name__ == "__main__":
    # Decorated Singleton
    decorated1 = DecoratedSingleton()
    decorated2 = DecoratedSingleton()
    print(decorated1 is decorated2)  # True
    print(decorated1.get_data())
    
    # Classic Singleton
    classic1 = ClassicSingleton()
    classic2 = ClassicSingleton()
    print(classic1 is classic2)  # True
    print(classic1.get_data())
    
    # Metaclass Singleton
    meta1 = MetaclassSingleton()
    meta2 = MetaclassSingleton()
    print(meta1 is meta2)  # True
    print(meta1.get_data())
    
    # Thread-Safe Singleton
    thread1 = ThreadSafeSingleton()
    thread2 = ThreadSafeSingleton()
    print(thread1 is thread2)  # True
    print(thread1.get_data())
    
    # Database Connection
    db1 = DatabaseConnection()
    db2 = DatabaseConnection()
    print(db1 is db2)  # True
    
    db1.connect("postgresql://localhost:5432/mydb")
    db2.query("SELECT * FROM users")
    
    # Logger
    logger1 = Logger()
    logger2 = Logger()
    print(logger1 is logger2)  # True
    
    logger1.info("Application started")
    logger2.error("Something went wrong")
    logger1.warn("This is a warning")
