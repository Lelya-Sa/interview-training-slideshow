/**
 * Adapter Pattern - JavaScript Implementations
 * 
 * Multiple approaches to implement Adapter pattern in JavaScript
 */

// ============================================================================
// 1. CLASSIC ADAPTER PATTERN
// ============================================================================
// Target interface (what client expects)
class Target {
    request() {
        throw new Error('request() must be implemented');
    }
}

// Adaptee (incompatible interface)
class Adaptee {
    specificRequest() {
        return 'Adaptee specific request';
    }
}

// Adapter (adapts Adaptee to Target)
class Adapter extends Target {
    constructor(adaptee) {
        super();
        this.adaptee = adaptee;
    }
    
    request() {
        return `Adapter: ${this.adaptee.specificRequest()}`;
    }
}

// ============================================================================
// 2. PAYMENT GATEWAY ADAPTER
// ============================================================================
// Target interface
class PaymentProcessor {
    processPayment(amount, currency) {
        throw new Error('processPayment() must be implemented');
    }
}

// Adaptee 1: Stripe (incompatible interface)
class StripeAPI {
    charge(amountInCents, currencyCode) {
        console.log(`Stripe: Charging ${amountInCents} cents in ${currencyCode}`);
        return {
            success: true,
            transactionId: `stripe_${Date.now()}`
        };
    }
}

// Adaptee 2: PayPal (incompatible interface)
class PayPalAPI {
    makePayment(amount, currency) {
        console.log(`PayPal: Making payment of ${amount} ${currency}`);
        return {
            success: true,
            transactionId: `paypal_${Date.now()}`
        };
    }
}

// Adapter for Stripe
class StripeAdapter extends PaymentProcessor {
    constructor() {
        super();
        this.stripe = new StripeAPI();
    }
    
    processPayment(amount, currency) {
        // Convert dollars to cents for Stripe
        const amountInCents = Math.round(amount * 100);
        return this.stripe.charge(amountInCents, currency);
    }
}

// Adapter for PayPal
class PayPalAdapter extends PaymentProcessor {
    constructor() {
        super();
        this.paypal = new PayPalAPI();
    }
    
    processPayment(amount, currency) {
        return this.paypal.makePayment(amount, currency);
    }
}

// ============================================================================
// 3. DATA FORMAT ADAPTER
// ============================================================================
// Target: JSON format
class JSONData {
    constructor(data) {
        this.data = data;
    }
    
    getData() {
        return this.data;
    }
}

// Adaptee: XML format
class XMLData {
    constructor(xmlString) {
        this.xml = xmlString;
    }
    
    getXML() {
        return this.xml;
    }
}

// Adapter: XML to JSON
class XMLToJSONAdapter {
    constructor(xmlData) {
        this.xmlData = xmlData;
    }
    
    getData() {
        const xml = this.xmlData.getXML();
        // Simplified XML to JSON conversion
        const json = this.parseXML(xml);
        return json;
    }
    
    parseXML(xml) {
        // Simplified parser (in real app, use proper XML parser)
        const result = {};
        const tagRegex = /<(\w+)>(.*?)<\/\1>/g;
        let match;
        while ((match = tagRegex.exec(xml)) !== null) {
            result[match[1]] = match[2];
        }
        return result;
    }
}

// ============================================================================
// 4. LEGACY CODE ADAPTER
// ============================================================================
// Legacy class (old interface)
class LegacyCalculator {
    calculate(a, b, operation) {
        switch (operation) {
            case 'add':
                return a + b;
            case 'subtract':
                return a - b;
            case 'multiply':
                return a * b;
            case 'divide':
                return b !== 0 ? a / b : Infinity;
            default:
                throw new Error('Unknown operation');
        }
    }
}

// Modern interface
class ModernCalculator {
    add(a, b) {
        return a + b;
    }
    
    subtract(a, b) {
        return a - b;
    }
    
    multiply(a, b) {
        return a * b;
    }
    
    divide(a, b) {
        return b !== 0 ? a / b : Infinity;
    }
}

// Adapter: Legacy to Modern
class CalculatorAdapter extends ModernCalculator {
    constructor() {
        super();
        this.legacy = new LegacyCalculator();
    }
    
    add(a, b) {
        return this.legacy.calculate(a, b, 'add');
    }
    
    subtract(a, b) {
        return this.legacy.calculate(a, b, 'subtract');
    }
    
    multiply(a, b) {
        return this.legacy.calculate(a, b, 'multiply');
    }
    
    divide(a, b) {
        return this.legacy.calculate(a, b, 'divide');
    }
}

// ============================================================================
// 5. MEDIA PLAYER ADAPTER
// ============================================================================
// Target interface
class MediaPlayer {
    play(audioType, fileName) {
        throw new Error('play() must be implemented');
    }
}

// Adaptee: Advanced media player
class AdvancedMediaPlayer {
    playVlc(fileName) {
        console.log(`Playing VLC file: ${fileName}`);
    }
    
    playMp4(fileName) {
        console.log(`Playing MP4 file: ${fileName}`);
    }
}

// Adapter
class MediaAdapter extends MediaPlayer {
    constructor(audioType) {
        super();
        this.advancedPlayer = new AdvancedMediaPlayer();
        this.audioType = audioType;
    }
    
    play(audioType, fileName) {
        if (audioType === 'vlc') {
            this.advancedPlayer.playVlc(fileName);
        } else if (audioType === 'mp4') {
            this.advancedPlayer.playMp4(fileName);
        }
    }
}

// ============================================================================
// 6. DATABASE ADAPTER
// ============================================================================
// Target interface
class Database {
    query(sql) {
        throw new Error('query() must be implemented');
    }
}

// Adaptee: MongoDB (different interface)
class MongoDB {
    find(collection, filter) {
        console.log(`MongoDB: Finding in ${collection} with filter:`, filter);
        return { documents: [] };
    }
}

// Adapter: MongoDB to SQL-like interface
class MongoDBAdapter extends Database {
    constructor() {
        super();
        this.mongo = new MongoDB();
    }
    
    query(sql) {
        // Parse SQL to MongoDB query (simplified)
        const match = sql.match(/SELECT \* FROM (\w+)(?: WHERE (.+))?/i);
        if (match) {
            const collection = match[1];
            const filter = match[2] ? this.parseWhere(match[2]) : {};
            return this.mongo.find(collection, filter);
        }
        throw new Error('Invalid SQL query');
    }
    
    parseWhere(whereClause) {
        // Simplified WHERE parser
        const filter = {};
        const conditions = whereClause.split(' AND ');
        conditions.forEach(condition => {
            const [key, value] = condition.split('=').map(s => s.trim());
            filter[key] = value.replace(/['"]/g, '');
        });
        return filter;
    }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Classic Adapter
const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);
console.log(adapter.request());

// Payment Gateway Adapter
const stripeAdapter = new StripeAdapter();
stripeAdapter.processPayment(100, 'USD');

const paypalAdapter = new PayPalAdapter();
paypalAdapter.processPayment(200, 'EUR');

// Data Format Adapter
const xmlData = new XMLData('<name>John</name><age>30</age>');
const xmlAdapter = new XMLToJSONAdapter(xmlData);
console.log(xmlAdapter.getData());

// Legacy Code Adapter
const calcAdapter = new CalculatorAdapter();
console.log(calcAdapter.add(5, 3));
console.log(calcAdapter.multiply(5, 3));

// Media Player Adapter
const mediaAdapter = new MediaAdapter('mp4');
mediaAdapter.play('mp4', 'movie.mp4');

// Database Adapter
const dbAdapter = new MongoDBAdapter();
dbAdapter.query("SELECT * FROM users WHERE name='John'");

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Adapter,
        StripeAdapter,
        PayPalAdapter,
        XMLToJSONAdapter,
        CalculatorAdapter,
        MediaAdapter,
        MongoDBAdapter
    };
}
