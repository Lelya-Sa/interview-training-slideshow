/**
 * Singleton Pattern - Java Implementations
 * 
 * Multiple approaches to implement Singleton pattern in Java
 */

import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

// ============================================================================
// 1. EAGER INITIALIZATION
// ============================================================================
class EagerSingleton {
    // Instance created immediately when class is loaded
    private static final EagerSingleton instance = new EagerSingleton();
    
    // Private constructor
    private EagerSingleton() {
        // Prevent instantiation
    }
    
    public static EagerSingleton getInstance() {
        return instance;
    }
    
    public String getData() {
        return "Eager Singleton Data";
    }
}

// ============================================================================
// 2. LAZY INITIALIZATION (Not Thread-Safe)
// ============================================================================
class LazySingleton {
    private static LazySingleton instance;
    
    private LazySingleton() {
    }
    
    public static LazySingleton getInstance() {
        if (instance == null) {
            instance = new LazySingleton();
        }
        return instance;
    }
    
    public String getData() {
        return "Lazy Singleton Data";
    }
}

// ============================================================================
// 3. THREAD-SAFE WITH SYNCHRONIZED METHOD
// ============================================================================
class ThreadSafeSingleton {
    private static ThreadSafeSingleton instance;
    
    private ThreadSafeSingleton() {
    }
    
    // Synchronized method - thread-safe but slow
    public static synchronized ThreadSafeSingleton getInstance() {
        if (instance == null) {
            instance = new ThreadSafeSingleton();
        }
        return instance;
    }
    
    public String getData() {
        return "Thread-Safe Singleton Data";
    }
}

// ============================================================================
// 4. DOUBLE-CHECKED LOCKING
// ============================================================================
class DoubleCheckedSingleton {
    // volatile ensures visibility across threads
    private static volatile DoubleCheckedSingleton instance;
    
    private DoubleCheckedSingleton() {
    }
    
    public static DoubleCheckedSingleton getInstance() {
        if (instance == null) {
            synchronized (DoubleCheckedSingleton.class) {
                // Double-check after acquiring lock
                if (instance == null) {
                    instance = new DoubleCheckedSingleton();
                }
            }
        }
        return instance;
    }
    
    public String getData() {
        return "Double-Checked Singleton Data";
    }
}

// ============================================================================
// 5. BILL PUGH SOLUTION (Static Inner Class) - RECOMMENDED
// ============================================================================
class BillPughSingleton {
    private BillPughSingleton() {
    }
    
    // Static inner class holds the instance
    private static class SingletonHelper {
        private static final BillPughSingleton INSTANCE = new BillPughSingleton();
    }
    
    public static BillPughSingleton getInstance() {
        return SingletonHelper.INSTANCE;
    }
    
    public String getData() {
        return "Bill Pugh Singleton Data";
    }
}

// ============================================================================
// 6. ENUM SINGLETON (BEST FOR JAVA) - RECOMMENDED
// ============================================================================
enum EnumSingleton {
    INSTANCE;
    
    private String data = "Enum Singleton Data";
    
    public String getData() {
        return data;
    }
    
    public void setData(String data) {
        this.data = data;
    }
    
    // Business methods
    public void doSomething() {
        System.out.println("Doing something...");
    }
}

// ============================================================================
// 7. DATABASE CONNECTION EXAMPLE
// ============================================================================
class DatabaseConnection {
    private static volatile DatabaseConnection instance;
    private boolean connected = false;
    private String connectionString = "";
    
    private DatabaseConnection() {
    }
    
    public static DatabaseConnection getInstance() {
        if (instance == null) {
            synchronized (DatabaseConnection.class) {
                if (instance == null) {
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }
    
    public DatabaseConnection connect(String connectionString) {
        if (this.connected) {
            System.out.println("Already connected");
            return this;
        }
        
        this.connectionString = connectionString;
        this.connected = true;
        System.out.println("Connected to: " + connectionString);
        return this;
    }
    
    public void disconnect() {
        this.connected = false;
        System.out.println("Disconnected");
    }
    
    public void query(String sql) {
        if (!this.connected) {
            throw new RuntimeException("Not connected to database");
        }
        System.out.println("Executing: " + sql);
    }
}

// ============================================================================
// 8. LOGGER EXAMPLE
// ============================================================================
class Logger {
    private static volatile Logger instance;
    private List<LogEntry> logs;
    
    private Logger() {
        this.logs = new ArrayList<>();
    }
    
    public static Logger getInstance() {
        if (instance == null) {
            synchronized (Logger.class) {
                if (instance == null) {
                    instance = new Logger();
                }
            }
        }
        return instance;
    }
    
    private static class LogEntry {
        String timestamp;
        String level;
        String message;
        
        LogEntry(String level, String message) {
            this.timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            this.level = level;
            this.message = message;
        }
    }
    
    private void log(String level, String message) {
        LogEntry entry = new LogEntry(level, message);
        logs.add(entry);
        System.out.println("[" + entry.timestamp + "] " + level + ": " + message);
    }
    
    public void info(String message) {
        log("INFO", message);
    }
    
    public void error(String message) {
        log("ERROR", message);
    }
    
    public void warn(String message) {
        log("WARN", message);
    }
    
    public List<LogEntry> getLogs() {
        return new ArrayList<>(logs);
    }
    
    public void clearLogs() {
        logs.clear();
    }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================
public class Singleton {
    public static void main(String[] args) {
        // Eager Singleton
        EagerSingleton eager1 = EagerSingleton.getInstance();
        EagerSingleton eager2 = EagerSingleton.getInstance();
        System.out.println(eager1 == eager2); // true
        System.out.println(eager1.getData());
        
        // Lazy Singleton
        LazySingleton lazy1 = LazySingleton.getInstance();
        LazySingleton lazy2 = LazySingleton.getInstance();
        System.out.println(lazy1 == lazy2); // true
        
        // Thread-Safe Singleton
        ThreadSafeSingleton thread1 = ThreadSafeSingleton.getInstance();
        ThreadSafeSingleton thread2 = ThreadSafeSingleton.getInstance();
        System.out.println(thread1 == thread2); // true
        
        // Double-Checked Singleton
        DoubleCheckedSingleton dcl1 = DoubleCheckedSingleton.getInstance();
        DoubleCheckedSingleton dcl2 = DoubleCheckedSingleton.getInstance();
        System.out.println(dcl1 == dcl2); // true
        
        // Bill Pugh Singleton
        BillPughSingleton bill1 = BillPughSingleton.getInstance();
        BillPughSingleton bill2 = BillPughSingleton.getInstance();
        System.out.println(bill1 == bill2); // true
        
        // Enum Singleton (BEST)
        EnumSingleton enum1 = EnumSingleton.INSTANCE;
        EnumSingleton enum2 = EnumSingleton.INSTANCE;
        System.out.println(enum1 == enum2); // true
        enum1.doSomething();
        
        // Database Connection
        DatabaseConnection db1 = DatabaseConnection.getInstance();
        DatabaseConnection db2 = DatabaseConnection.getInstance();
        System.out.println(db1 == db2); // true
        
        db1.connect("postgresql://localhost:5432/mydb");
        db2.query("SELECT * FROM users");
        
        // Logger
        Logger logger1 = Logger.getInstance();
        Logger logger2 = Logger.getInstance();
        System.out.println(logger1 == logger2); // true
        
        logger1.info("Application started");
        logger2.error("Something went wrong");
        logger1.warn("This is a warning");
    }
}
