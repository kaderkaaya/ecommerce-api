
---

# 🛒 E-Commerce Backend Platform

This project is an **e-commerce backend platform** built with **Node.js + Express + Sequelize**, designed with a **microservice-like, port-segmented architecture**. It takes real-world production concerns into account, such as authentication, order lifecycle, queueing, file uploads, logging, rate limiting, and security.

> Goal: To deliver a **production-ready, scalable, and secure** backend infrastructure.

---

## 🚀 Technologies & Libraries Used

### Core

* **Node.js** (ES Modules)
* **Express.js (v5)**
* **Sequelize ORM**
* **MySQL** (`mysql2`)

### Security & Auth

* `jsonwebtoken` – JWT Authentication
* `bcrypt` – Password hashing
* `helmet` – HTTP security headers
* `cors`
* `express-rate-limit`

### Validation & API

* `joi`
* `express-validator`
* `swagger-jsdoc`
* `swagger-ui-express`

### Queue & Async Jobs

* `bullmq`
<!-- * `ioredis` -->

### File Upload & Cloud

* `multer`
* `multer-s3`
* `aws-sdk` (v2)

<!-- ### Logging & Monitoring

* `winston`
* `winston-daily-rotate-file` -->

### Utilities

* `uuid`
* `dotenv`

---

## 🧩 Architectural Approach

Instead of a single monolith, this project is structured as **domain-based services running on separate ports**, closely aligned with **microservice principles**.

Each service runs its own Express instance and is bootstrapped via `node index.js`.

```text
USER SERVICE     → :3001
PRODUCT SERVICE  → :3002
ORDER SERVICE    → :3003
CART SERVICE     → :3004
PANEL (ADMIN)    → :3000
```

> This approach enables **bounded-context separation** before fully transitioning to microservices.

---

## 📊 Architecture Overview

The project avoids **monolithic complexity** while also steering clear of **full microservice overhead** by adopting a **port-based, domain-driven architecture**.

The goal is to keep the system **readable, scalable, and production-ready**, while making a future migration to real microservices straightforward.

---

### 🧠 Architectural Principles

* Each **business domain** (User, Product, Order, Cart, Panel) runs in its **own Express instance**
* Services are exposed via **separate ports**
* Shared infrastructure (DB, Auth, Logging) is reused in a **controlled and explicit** manner

This design applies *bounded context* principles directly at the backend level.

---

### 🔌 Service Distribution

| Service         | Port | Responsibility             |
| --------------- | ---- | -------------------------- |
| Panel (Admin)   | 3000 | Administration & dashboard |
| User Service    | 3001 | Authentication & users     |
| Product Service | 3002 | Products & inventory       |
| Order Service   | 3003 | Order lifecycle            |
| Cart Service    | 3004 | Cart management            |

---

### 🔄 Request Flow (High-Level)

1. Client (Web / Mobile) sends an HTTP request to the relevant service
2. Request is validated by **JWT middleware**
3. Request is routed to the appropriate **domain module**
4. Business logic is executed
5. Data is read from / written to **MySQL**
6. Async operations are triggered via **Queue**, when needed

This flow keeps synchronous APIs lightweight and improves system scalability.

---

### 📦 Async & Background Jobs

* Orders are created in a **temporary `pending` state**
* A **delayed job** is added using **BullMQ + Redis**
* If the order is not marked as **paid** within the defined time window:

  * The order is automatically **cancelled**
  * Stock and cart state are rolled back

This mechanism prevents abandoned payments from polluting the system and ensures **data consistency**.

---

### 🔐 Security Layer

* JWT-based authentication
* Password hashing with `bcrypt`
* Rate limiting (brute-force protection)
* Secure HTTP headers via `helmet`

---

### 🗄️ Data Layer

* MySQL with Sequelize ORM
* All model relationships are managed **centrally** in `associates.js`
* Designed to be extended with transactions and consistency controls

---

### 🚀 What This Architecture Provides

* Clear domain separation
* Easier maintenance and extensibility
* A solid foundation for microservice migration
* Production-grade system design

---

## 📂 Project Structure

```text
ecommerce-api/
├── src/
│   ├── config/
│   │   └── config.js        # Database & environment configuration
│   │
│   ├── models/              # Sequelize ORM models
│   │   ├── user/
│   │   ├── panel-user/
│   │   ├── product/
│   │   ├── order/
│   │   └── cart/
│   │
│   ├── modules/             # Business logic & domain services
│   │   ├── user/
│   │   ├── panel/
│   │   ├── product/
│   │   ├── order/
│   │   └── cart/
│   │
│   ├── utils/               # Shared utilities (helpers, constants, etc.)
│   ├── tests/               # Test structure (unit / integration ready)
│   │
│   ├── routes.js            # Central route registration
│   └── index.js             # Application bootstrap
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

### Core Principles

* Separation of business logic and routing
* Centralized model-association management
* Domain-driven modular structure

---

## ⚙️ Setup

### 1️⃣ Clone the Repository

```bash
git clone <https://github.com/kaderkaaya/ecommerce-api.git>
cd ecommerce-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables (.env)

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=******
DB_NAME=e-commerce
DB_DIALECT=mysql

PANEL_PORT=3000
USER_PORT=3001
PRODUCT_PORT=3002
ORDER_PORT=3003
CART_PORT=3004

JWT_SECRET=your_secret_key
```

### 4️⃣ Run Services

```bash
node index.js
```

---

## 🧠 Domain Flows

### Authentication

* JWT-based authentication
* Passwords are hashed using bcrypt

### Order Flow

1. User creates an order
2. Order & OrderItem records are created
3. (Extensible) Transaction & queue integration

### File Upload

* Multer + S3 integration
* Product images are managed via cloud storage

---

## 🔗 Model Relationships

* **User → Order** (One-to-Many)
* **Order → OrderItem** (One-to-Many)
* **Product → OrderItem** (One-to-Many)

All relationships are defined in `models/associates.js`.

---

## 🧪 Testing & Quality Notes

* Project is test-ready
* Centralized error handling is recommended
* Transaction & rollback logic can be enhanced

---

## 📌 Development Roadmap

* Database transaction management
* Centralized error handling
* Role-based authorization
<!-- * Integration tests
* Redis caching layer -->

---
