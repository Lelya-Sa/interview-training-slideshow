/**
 * Singleton Pattern - JavaScript Implementations
 * 
 * Multiple approaches to implement Singleton pattern in JavaScript
 */

// ============================================================================
// 1. EAGER INITIALIZATION
// ============================================================================
class EagerSingleton {
    // Instance created immediately when class is defined
    static instance = new EagerSingleton();

    // Private constructor (simulated with Symbol)
    constructor() {
        if (EagerSingleton.instance) {
            throw new Error('Use getInstance() instead of new');
        }
        this.data = 'Eager Singleton Data';
    }

    static getInstance() {
        return EagerSingleton.instance;
    }

    getData() {
        return this.data;
    }
}

// ============================================================================
// 2. LAZY INITIALIZATION
// ============================================================================
class LazySingleton {
    static instance = null;

    constructor() {
        if (LazySingleton.instance) {
            throw new Error('Use getInstance() instead of new');
        }
        this.data = 'Lazy Singleton Data';
    }

    static getInstance() {
        if (!LazySingleton.instance) {
            LazySingleton.instance = new LazySingleton();
        }
        return LazySingleton.instance;
    }

    getData() {
        return this.data;
    }
}

// ============================================================================
// 3. MODULE PATTERN (JavaScript-specific, simplest approach)
// ============================================================================
const ModuleSingleton = (function() {
    let instance;

    function createInstance() {
        return {
            data: 'Module Singleton Data',
            getData() {
                return this.data;
            }
        };
    }

    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

// ============================================================================
// 4. ES6 MODULE (Node.js/Modern JavaScript - Best Practice)
// ============================================================================
// In a separate file: logger.js
// let instance = null;
// 
// class Logger {
//     constructor() {
//         if (instance) {
//             return instance;
//         }
//         instance = this;
//         this.logs = [];
//     }
// 
//     log(message) {
//         this.logs.push(message);
//         console.log(message);
//     }
// }
// 
// export default new Logger(); // Export single instance

// ============================================================================
// 5. WITH PRIVATE FIELDS (ES2022)
// ============================================================================
class ModernSingleton {
    static #instance = null;

    #data = 'Modern Singleton Data';

    constructor() {
        if (ModernSingleton.#instance) {
            return ModernSingleton.#instance;
        }
        ModernSingleton.#instance = this;
    }

    static getInstance() {
        if (!ModernSingleton.#instance) {
            ModernSingleton.#instance = new ModernSingleton();
        }
        return ModernSingleton.#instance;
    }

    getData() {
        return this.#data;
    }
}

// ============================================================================
// 6. DATABASE CONNECTION EXAMPLE
// ============================================================================
class DatabaseConnection {
    static instance = null;
    static connectionCount = 0;

    constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }
        
        // Simulate expensive connection setup
        this.connected = false;
        this.connectionString = '';
        DatabaseConnection.instance = this;
    }

    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    connect(connectionString) {
        if (this.connected) {
            console.log('Already connected');
            return this;
        }
        
        this.connectionString = connectionString;
        this.connected = true;
        DatabaseConnection.connectionCount++;
        console.log(`Connected to: ${connectionString}`);
        return this;
    }

    disconnect() {
        this.connected = false;
        console.log('Disconnected');
    }

    query(sql) {
        if (!this.connected) {
            throw new Error('Not connected to database');
        }
        console.log(`Executing: ${sql}`);
        return { rows: [] };
    }
}

// ============================================================================
// 7. LOGGER EXAMPLE
// ============================================================================
class Logger {
    static instance = null;
    logs = [];

    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }
        Logger.instance = this;
    }

    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    log(level, message) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            level,
            message
        };
        this.logs.push(logEntry);
        console.log(`[${logEntry.timestamp}] ${level}: ${message}`);
    }

    info(message) {
        this.log('INFO', message);
    }

    error(message) {
        this.log('ERROR', message);
    }

    warn(message) {
        this.log('WARN', message);
    }

    getLogs() {
        return this.logs;
    }

    clearLogs() {
        this.logs = [];
    }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Eager Singleton
const eager1 = EagerSingleton.getInstance();
const eager2 = EagerSingleton.getInstance();
console.log(eager1 === eager2); // true

// Lazy Singleton
const lazy1 = LazySingleton.getInstance();
const lazy2 = LazySingleton.getInstance();
console.log(lazy1 === lazy2); // true

// Module Singleton
const module1 = ModuleSingleton.getInstance();
const module2 = ModuleSingleton.getInstance();
console.log(module1 === module2); // true

// Modern Singleton
const modern1 = ModernSingleton.getInstance();
const modern2 = ModernSingleton.getInstance();
console.log(modern1 === modern2); // true

// Database Connection
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log(db1 === db2); // true

db1.connect('postgresql://localhost:5432/mydb');
db2.query('SELECT * FROM users'); // Works, same instance

// Logger
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();
console.log(logger1 === logger2); // true

logger1.info('Application started');
logger2.error('Something went wrong');
logger1.warn('This is a warning');

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EagerSingleton,
        LazySingleton,
        ModuleSingleton,
        ModernSingleton,
        DatabaseConnection,
        Logger
    };
}
