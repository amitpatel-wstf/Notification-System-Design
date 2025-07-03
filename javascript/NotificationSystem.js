/*============================
     Notification & Decorators
=============================*/

class SimpleNotification {
    constructor(_text) {
        this.text = _text;
    }

    getContent() {
        return this.text;
    }
}

class NotificationDecorator {
    constructor(_notification) {
        if (new.target === NotificationDecorator) {
            throw new TypeError("Cannot instantiate abstract class.");
        }
        this.notification = _notification;
    }

    getContent() {
        throw new Error("Method 'getContent()' must be implemented.");
    }
}

// Time decorator
class TimeDecorator extends NotificationDecorator {
    constructor(_notification) {
        super(_notification);
    }

    getContent() {
        const timestamp = new Date().toLocaleString();
        return `${timestamp} ${this.notification.getContent()}`;
    }
}

// Signature decorator
class SignatureDecorator extends NotificationDecorator {
    constructor(_notification, _signature) {
        super(_notification);
        this.signature = _signature;
    }

    getContent() {
        return `${this.notification.getContent()}\n-- ${this.signature}\n\n`;
    }
}

/*============================
      Observer Pattern
=============================*/

class NotificationObservable {
    constructor() {
        this.Observers = [];
        this.currentNotifications = null;
    }

    addObserver(_observer) {
        this.Observers.push(_observer);
    }

    removeObserver(observer) {
        this.Observers = this.Observers.filter(obs => obs !== observer);
    }

    notifyObservers() {
        this.Observers.forEach(observer => observer.update());
    }

    setNotification(_notification) {
        this.currentNotifications = _notification;
        this.notifyObservers();
    }

    getNotification() {
        return this.currentNotifications;
    }

    getNotificationContent() {
        return this.currentNotifications?.getContent() ?? '';
    }
}

/*============================
         Logger Observer
=============================*/

class Logger {
    constructor(_observerable) {
        this.Observerable = _observerable;
        this.Observerable.addObserver(this);
    }

    update() {
        console.log("Logging New Notification:\n" + this.Observerable.getNotificationContent());
    }
}

/*============================
     Notification Strategies
=============================*/

class EmailStrategy {
    constructor(_email) {
        this.email = _email;
    }

    sendNotification(content) {
        console.log(`Sending Email to ${this.email}:\n${content}`);
    }
}

class SMSStrategy {
    constructor(_mobileNumber) {
        this.mobileNumber = _mobileNumber;
    }

    sendNotification(content) {
        console.log(`Sending SMS to ${this.mobileNumber}:\n${content}`);
    }
}

class PopUpStrategy {
    sendNotification(content) {
        console.log("Popup Notification:\n" + content);
    }
}

/*============================
    Notification Engine
=============================*/

class NotificationEngine {
    constructor(_observerable) {
        this.observerable = _observerable;
        this.strategy = [];
        this.observerable.addObserver(this);
    }

    addStrategy(_strategy) {
        this.strategy.push(_strategy);
    }

    update() {
        const content = this.observerable.getNotificationContent();
        for (const str of this.strategy) {
            str.sendNotification(content);
        }
    }
}

/*============================
     Singleton Service Layer
=============================*/

class NotificationService {
    constructor() {
        if (NotificationService.instance) {
            return NotificationService.instance;
        }

        this.observable = new NotificationObservable();
        this.notifications = [];

        NotificationService.instance = this;
    }

    static getInstance() {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }

    getObservarble() {
        return this.observable;
    }

    sendNotification(notification) {
        this.notifications.push(notification);
        this.observable.setNotification(notification);
    }
}

/*============================
            Main
=============================*/

function main() {
    const service = NotificationService.getInstance();
    const observable = service.getObservarble();

    const logger = new Logger(observable);
    const engine = new NotificationEngine(observable);

    engine.addStrategy(new EmailStrategy("random.person@gmail.com"));
    engine.addStrategy(new SMSStrategy("+91 9876543210"));
    engine.addStrategy(new PopUpStrategy());

    let notification = new SimpleNotification("Your order has been shipped!");
    notification = new TimeDecorator(notification);
    notification = new SignatureDecorator(notification, "Customer Care");

    service.sendNotification(notification);
}

main();
