/**
 * Strategy Pattern - JavaScript Implementations
 * 
 * Multiple approaches to implement Strategy pattern in JavaScript
 */

// ============================================================================
// 1. CLASSIC STRATEGY PATTERN
// ============================================================================
class Context {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    
    executeStrategy(data) {
        return this.strategy.execute(data);
    }
}

class Strategy {
    execute(data) {
        throw new Error('execute() must be implemented');
    }
}

class ConcreteStrategyA extends Strategy {
    execute(data) {
        return `Strategy A: ${data}`;
    }
}

class ConcreteStrategyB extends Strategy {
    execute(data) {
        return `Strategy B: ${data}`;
    }
}

// ============================================================================
// 2. SORTING STRATEGIES
// ============================================================================
class Sorter {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    
    sort(array) {
        return this.strategy.sort([...array]);
    }
}

class QuickSortStrategy {
    sort(array) {
        console.log('Using QuickSort');
        // Simplified QuickSort
        if (array.length <= 1) return array;
        const pivot = array[Math.floor(array.length / 2)];
        const left = array.filter(x => x < pivot);
        const middle = array.filter(x => x === pivot);
        const right = array.filter(x => x > pivot);
        return [...this.sort(left), ...middle, ...this.sort(right)];
    }
}

class MergeSortStrategy {
    sort(array) {
        console.log('Using MergeSort');
        // Simplified MergeSort
        if (array.length <= 1) return array;
        const mid = Math.floor(array.length / 2);
        const left = this.sort(array.slice(0, mid));
        const right = this.sort(array.slice(mid));
        return this.merge(left, right);
    }
    
    merge(left, right) {
        const result = [];
        let i = 0, j = 0;
        while (i < left.length && j < right.length) {
            result.push(left[i] < right[j] ? left[i++] : right[j++]);
        }
        return result.concat(left.slice(i)).concat(right.slice(j));
    }
}

class BubbleSortStrategy {
    sort(array) {
        console.log('Using BubbleSort');
        const arr = [...array];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr;
    }
}

// ============================================================================
// 3. PAYMENT PROCESSING STRATEGIES
// ============================================================================
class PaymentProcessor {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    
    processPayment(amount) {
        return this.strategy.process(amount);
    }
}

class PaymentStrategy {
    process(amount) {
        throw new Error('process() must be implemented');
    }
}

class CreditCardStrategy extends PaymentStrategy {
    process(amount) {
        console.log(`Processing $${amount} via Credit Card`);
        return {
            success: true,
            method: 'creditcard',
            transactionId: `CC-${Date.now()}`
        };
    }
}

class PayPalStrategy extends PaymentStrategy {
    process(amount) {
        console.log(`Processing $${amount} via PayPal`);
        return {
            success: true,
            method: 'paypal',
            transactionId: `PP-${Date.now()}`
        };
    }
}

class BitcoinStrategy extends PaymentStrategy {
    process(amount) {
        console.log(`Processing $${amount} via Bitcoin`);
        return {
            success: true,
            method: 'bitcoin',
            transactionId: `BTC-${Date.now()}`
        };
    }
}

// ============================================================================
// 4. DISCOUNT CALCULATION STRATEGIES
// ============================================================================
class PriceCalculator {
    constructor(discountStrategy) {
        this.discountStrategy = discountStrategy;
    }
    
    setDiscountStrategy(strategy) {
        this.discountStrategy = strategy;
    }
    
    calculate(price) {
        return this.discountStrategy.calculate(price);
    }
}

class DiscountStrategy {
    calculate(price) {
        throw new Error('calculate() must be implemented');
    }
}

class RegularDiscount extends DiscountStrategy {
    calculate(price) {
        return price; // No discount
    }
}

class PremiumDiscount extends DiscountStrategy {
    calculate(price) {
        return price * 0.9; // 10% discount
    }
}

class VIPDiscount extends DiscountStrategy {
    calculate(price) {
        return price * 0.8; // 20% discount
    }
}

// ============================================================================
// 5. VALIDATION STRATEGIES
// ============================================================================
class Validator {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    
    validate(value) {
        return this.strategy.validate(value);
    }
}

class ValidationStrategy {
    validate(value) {
        throw new Error('validate() must be implemented');
    }
}

class EmailValidation extends ValidationStrategy {
    validate(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    }
}

class PhoneValidation extends ValidationStrategy {
    validate(value) {
        const phoneRegex = /^\+?[\d\s-()]+$/;
        return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10;
    }
}

class CreditCardValidation extends ValidationStrategy {
    validate(value) {
        // Luhn algorithm
        const digits = value.replace(/\D/g, '');
        let sum = 0;
        let isEven = false;
        for (let i = digits.length - 1; i >= 0; i--) {
            let digit = parseInt(digits[i]);
            if (isEven) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            isEven = !isEven;
        }
        return sum % 10 === 0 && digits.length >= 13;
    }
}

// ============================================================================
// 6. FUNCTION-BASED STRATEGY (JavaScript-specific)
// ============================================================================
class Calculator {
    constructor(operation) {
        this.operation = operation;
    }
    
    setOperation(operation) {
        this.operation = operation;
    }
    
    calculate(a, b) {
        return this.operation(a, b);
    }
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b !== 0 ? a / b : Infinity;

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Classic Strategy
const context = new Context(new ConcreteStrategyA());
console.log(context.executeStrategy('data'));

context.setStrategy(new ConcreteStrategyB());
console.log(context.executeStrategy('data'));

// Sorting Strategies
const sorter = new Sorter(new QuickSortStrategy());
console.log(sorter.sort([3, 1, 4, 1, 5, 9, 2, 6]));

sorter.setStrategy(new MergeSortStrategy());
console.log(sorter.sort([3, 1, 4, 1, 5, 9, 2, 6]));

// Payment Strategies
const payment = new PaymentProcessor(new CreditCardStrategy());
payment.processPayment(100);

payment.setStrategy(new PayPalStrategy());
payment.processPayment(200);

// Discount Strategies
const calculator = new PriceCalculator(new RegularDiscount());
console.log(calculator.calculate(100));

calculator.setDiscountStrategy(new PremiumDiscount());
console.log(calculator.calculate(100));

// Validation Strategies
const validator = new Validator(new EmailValidation());
console.log(validator.validate('test@example.com'));

validator.setStrategy(new PhoneValidation());
console.log(validator.validate('+1234567890'));

// Function-based Strategy
const calc = new Calculator(add);
console.log(calc.calculate(5, 3));

calc.setOperation(multiply);
console.log(calc.calculate(5, 3));

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Context,
        Sorter,
        PaymentProcessor,
        PriceCalculator,
        Validator,
        Calculator
    };
}
