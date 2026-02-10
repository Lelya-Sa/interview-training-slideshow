/**
 * Observer Pattern - JavaScript Implementations
 * 
 * Multiple approaches to implement Observer pattern in JavaScript
 */

// ============================================================================
// 1. CLASSIC OBSERVER PATTERN
// ============================================================================
class Subject {
    constructor() {
        this.observers = [];
    }
    
    attach(observer) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }
    
    detach(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    
    update(data) {
        console.log(`${this.name} received:`, data);
    }
}

// ============================================================================
// 2. EVENT EMITTER (Node.js style)
// ============================================================================
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
    
    once(event, callback) {
        const wrapper = (data) => {
            callback(data);
            this.off(event, wrapper);
        };
        this.on(event, wrapper);
    }
}

// ============================================================================
// 3. STOCK MARKET EXAMPLE
// ============================================================================
class StockMarket {
    constructor() {
        this.observers = [];
        this.stocks = {};
    }
    
    subscribe(observer) {
        this.observers.push(observer);
    }
    
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    
    setPrice(symbol, price) {
        const oldPrice = this.stocks[symbol];
        this.stocks[symbol] = price;
        this.notify({ symbol, oldPrice, newPrice: price });
    }
    
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

class StockDisplay {
    constructor(name) {
        this.name = name;
        this.prices = {};
    }
    
    update(data) {
        this.prices[data.symbol] = data.newPrice;
        console.log(`[${this.name}] ${data.symbol}: $${data.newPrice} (was $${data.oldPrice})`);
    }
    
    getPrice(symbol) {
        return this.prices[symbol];
    }
}

// ============================================================================
// 4. NEWS PUBLISHER EXAMPLE
// ============================================================================
class NewsPublisher {
    constructor() {
        this.subscribers = [];
        this.articles = [];
    }
    
    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }
    
    unsubscribe(subscriber) {
        this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
    }
    
    publish(article) {
        this.articles.push(article);
        this.notify(article);
    }
    
    notify(article) {
        this.subscribers.forEach(subscriber => subscriber.receive(article));
    }
}

class NewsSubscriber {
    constructor(name) {
        this.name = name;
        this.receivedArticles = [];
    }
    
    receive(article) {
        this.receivedArticles.push(article);
        console.log(`[${this.name}] New article: ${article.title}`);
    }
}

// ============================================================================
// 5. REACT-LIKE STATE MANAGEMENT
// ============================================================================
class StateManager {
    constructor(initialState = {}) {
        this.state = initialState;
        this.listeners = [];
    }
    
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
    
    setState(updates) {
        const prevState = { ...this.state };
        this.state = { ...this.state, ...updates };
        this.notify(prevState, this.state);
    }
    
    getState() {
        return this.state;
    }
    
    notify(prevState, newState) {
        this.listeners.forEach(listener => listener(newState, prevState));
    }
}

// ============================================================================
// 6. BUTTON CLICK OBSERVER
// ============================================================================
class Button {
    constructor() {
        this.clickHandlers = [];
    }
    
    onClick(handler) {
        this.clickHandlers.push(handler);
    }
    
    click() {
        console.log('Button clicked!');
        this.clickHandlers.forEach(handler => handler());
    }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Classic Observer
const subject = new Subject();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

subject.attach(observer1);
subject.attach(observer2);
subject.notify('Hello World');

// Event Emitter
const emitter = new EventEmitter();
emitter.on('user-login', (user) => {
    console.log(`User logged in: ${user.name}`);
});
emitter.on('user-login', (user) => {
    console.log(`Sending welcome email to: ${user.email}`);
});
emitter.emit('user-login', { name: 'John', email: 'john@example.com' });

// Stock Market
const market = new StockMarket();
const display1 = new StockDisplay('Display 1');
const display2 = new StockDisplay('Display 2');

market.subscribe(display1);
market.subscribe(display2);

market.setPrice('AAPL', 150.50);
market.setPrice('GOOGL', 2800.00);

// News Publisher
const publisher = new NewsPublisher();
const subscriber1 = new NewsSubscriber('Subscriber 1');
const subscriber2 = new NewsSubscriber('Subscriber 2');

publisher.subscribe(subscriber1);
publisher.subscribe(subscriber2);

publisher.publish({ title: 'Breaking News', content: '...' });

// State Manager
const stateManager = new StateManager({ count: 0 });
const unsubscribe = stateManager.subscribe((newState, prevState) => {
    console.log(`State changed from ${prevState.count} to ${newState.count}`);
});

stateManager.setState({ count: 1 });
stateManager.setState({ count: 2 });

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Subject,
        Observer,
        EventEmitter,
        StockMarket,
        NewsPublisher,
        StateManager
    };
}
