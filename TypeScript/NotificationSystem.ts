/*============================
     Notification & Decorators
=============================*/

interface INotification {
    getContent(): string;
}


class SimpleNotification implements INotification {
    private text : string;

    constructor (_text:string){
        this.text = _text;
    }

    getContent(): string {
        return this.text
    }
}


abstract class NotificationDecorator implements INotification {
    protected notification : INotification;

    constructor(_notification: INotification){
        this.notification = _notification;
    }

    abstract getContent(): string;
}
// time decorator
class TimeDecorator extends NotificationDecorator {

    constructor(_notification:INotification){
        super(_notification);
    }

    getContent(): string {
        const timestamp = Date.now().toLocaleString();
        return `${timestamp} ${this.notification.getContent()}`;
    }
}
// signature decorator
class SignatureDecorator extends NotificationDecorator {
    private signature:string;

    constructor(_notification:INotification, _signature:string){
        super(_notification);
        this.signature = _signature;
    }

    getContent(): string {
        return `${this.notification.getContent()}\n-- ${this.signature}\n\n`;
    }
}


/*============================
      Observer Pattern
=============================*/

interface IObserver {
    update(): void;
}

interface IObservable {
    addObserver(observer: IObserver): void;
    removeObserver(observer: IObserver): void;
    notifyObservers(): void;
}


// notification observable
class NotificationObservable implements IObservable{
    private Observers: IObserver[];
    private currentNotifications: INotification | null = null;

    addObserver(_observer: IObserver): void {
        this.Observers.push(_observer);
    }

    removeObserver(observer: IObserver): void {
        this.Observers = this.Observers.filter(obs => obs !== observer);
    }

    notifyObservers(): void {
        this.Observers.forEach((observer:IObserver)=>observer.update());
    }

    setNotification(_notification:INotification){
        this.currentNotifications = _notification;
        this.notifyObservers();
    }

    getNotification() : INotification | null {
        return this.currentNotifications;
    }

    getNotificationContent() : string {
        return this.currentNotifications?.getContent() ?? '';
    }
}

/*============================
         Logger Observer
=============================*/

class Logger implements IObserver{
    private Observerable : NotificationObservable;

    constructor(_observerable: NotificationObservable){
        this.Observerable = _observerable;
    }

    update(): void {
        console.log("Logging New Notification:\n" + this.Observerable.getNotificationContent());
    }
}

/*============================
     Notification Strategies
=============================*/
interface INotificationStrategy {
    sendNotification(content: string): void;
}

class EmailStrategy implements INotificationStrategy{
    private email :string;

    constructor(_email:string){
        this.email = _email;
    }

    sendNotification(content: string): void {
        console.log(`Sending Email to ${this.email}:\n${content}`);
    }
}

// sms strategy 
class SMSStrategy implements INotificationStrategy {
    private mobileNumber : string;
    
    constructor(_mobileNumber:string){
        this.mobileNumber = _mobileNumber;
    }

    sendNotification(content: string): void {
        console.log(`Sending SMS to ${this.mobileNumber}:\n${content}`);
    }
}

class PopUpStrategy implements INotificationStrategy{
 
    sendNotification(content:string){
        console.log("Popup Notification:\n" + content);
    }
}

/*============================
    Notification Engine
=============================*/

class NotificationEngine implements IObserver{
    private observerable:NotificationObservable;
    private strategy : INotificationStrategy[] = [];
    
    constructor(_observerable:NotificationObservable){
        this.observerable = _observerable;
        this.observerable.addObserver(this);
    }

    addStrategy(_strategy:INotificationStrategy){
        this.strategy.push(_strategy);
    }

    update(): void {
        const content = this.observerable.getNotificationContent();
        for(const str of this.strategy){
            str.sendNotification(content);
        }
    }
}

/*============================
     Singleton Service Layer
=============================*/

class NotificationService {
    private static instance : NotificationService;
    private observable: NotificationObservable = new NotificationObservable();
    private notifications : INotification[] = [];
    
    private constructor(){}

    static getInstance():NotificationService{
        if(!this.instance){
            this.instance = new NotificationService();
        }
        return this.instance;
    }

    getObservarble():NotificationObservable{
        return this.observable;
    }

    sendNotification(notification: INotification): void {
        this.notifications.push(notification); // Store for history
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

    let notification: INotification = new SimpleNotification("Your order has been shipped!");
    notification = new TimeDecorator(notification);
    notification = new SignatureDecorator(notification, "Customer Care");

    service.sendNotification(notification);
}

main();
