# 📢 Notification System – Design & Implementation

This project demonstrates a **flexible Notification System** implemented in **C++**, **Java**, and **TypeScript** using Object-Oriented Design Patterns.

---

## 📦 Features

- **Decorator Pattern** to enhance notifications (e.g., timestamp, signature)
- **Observer Pattern** to broadcast notifications to different receivers (like loggers and engines)
- **Strategy Pattern** to dynamically select delivery methods (Email, SMS, Popup)
- **Singleton Pattern** to centralize the notification service
- **Pluggable architecture** for extensibility

---

## 🛠 Design Patterns Used

| Pattern     | Purpose                                                  |
|-------------|-----------------------------------------------------------|
| Decorator   | Dynamically add responsibilities to notifications         |
| Observer    | Allow multiple receivers (observers) to get notified      |
| Strategy    | Swap notification delivery methods at runtime             |
| Singleton   | Ensure a single instance of the notification service      |

---

## 📁 Project Structure

.
├── cpp/
│ └── NotificationSystem.cpp
├── java/
│ └── NotificationSystem.java
├── ts/
│ └── NotificationSystem.ts
└── README.md

yaml
Copy
Edit

---

## 🚀 How to Run

### 🔹 C++ Version

#### 📄 File
`cpp/NotificationSystem.cpp`

#### 🧪 Compile & Run
```bash
g++ -std=c++11 NotificationSystem.cpp -o notification_system
./notification_system
🔸 Java Version
⚠️ Note: You’ll need to write the Java version based on the C++/TS design if not already implemented.

📄 File
java/NotificationSystem.java

🧪 Compile & Run
bash
Copy
Edit
javac NotificationSystem.java
java NotificationSystem
🟦 TypeScript Version
📄 File
ts/NotificationSystem.ts

🧪 Setup
Ensure Node.js and TypeScript are installed:

bash
Copy
Edit
npm install -g typescript
Compile:

bash
Copy
Edit
tsc NotificationSystem.ts
Run:

bash
Copy
Edit
node NotificationSystem.js
🧩 Example Output
sql
Copy
Edit
Logging New Notification:
[2025-04-13 14:22:00] Your order has been shipped!
-- Customer Care

Sending email Notification to: random.person@gmail.com
[2025-04-13 14:22:00] Your order has been shipped!
-- Customer Care

Sending SMS Notification to: +91 9876543210
[2025-04-13 14:22:00] Your order has been shipped!
-- Customer Care

Sending Popup Notification:
[2025-04-13 14:22:00] Your order has been shipped!
-- Customer Care
🧠 Extensibility Ideas
Add support for WebSocket notifications

Use real-time timestamps

Store notification history in a database

Use DI frameworks in Java/TypeScript (e.g., Spring, InversifyJS)

📚 License
MIT License – use freely for learning, modifying, and extending.# Notification-System-Design
