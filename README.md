# 🍔 FoodDelivery — Full Stack Food Ordering Platform

A production-ready, end-to-end food delivery web application built with **React + Vite** on the frontend and **Spring Boot + MongoDB** on the backend. Supports customer ordering flows, admin food/order management, JWT authentication, Razorpay payments, and AWS S3 image uploads.

---

## 📸 Project Overview

| Layer | Tech |
|---|---|
| Customer App | React, Vite, Bootstrap, React Router, Axios |
| Admin Panel | React, Vite, Bootstrap, React Router, Axios |
| Backend API | Java 21, Spring Boot 3, Spring Data MongoDB |
| Auth | Spring Security + JWT |
| Payments | Razorpay |
| Image Storage | AWS S3 |

---

## 📁 Project Structure

```
FoodDeliveryApplication-FullStack/
├── backend/                 # Spring Boot REST API
└── frontend/
    ├── foodies/             # Customer-facing app
    └── adminpanel/          # Admin dashboard
```

---

## ✨ Features

### 🧑‍💻 Customer App (`frontend/foodies`)
- User registration and login
- Browse and search food catalog
- View food item details
- Add/remove items from cart
- Place orders with Razorpay payment
- View personal order history

### 🛠️ Admin Panel (`frontend/adminpanel`)
- Add food items with image upload (AWS S3)
- View and delete food listings
- View all customer orders
- Update order status in real time

### ⚙️ Backend API (`backend`)
- Auth endpoints (register / login) with JWT
- Food CRUD endpoints
- Cart management endpoints
- Order creation and Razorpay payment verification
- Protected routes via JWT middleware

---

## 🧰 Prerequisites

Ensure the following are installed before running the project locally:

- **Java 21+**
- **Maven 3.9+** *(or use the included `mvnw` wrapper)*
- **Node.js 18+** and **npm**
- **MongoDB** *(local instance or cloud URI)*
- *(Optional)* AWS S3 credentials — required for food image uploads
- *(Optional)* Razorpay credentials — required for payment flow

---

## 🔐 Environment Variables

### Backend

Export these in your shell or inject via your IDE run configuration:

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `AWS_ACCESS_KEY` | AWS access key for S3 |
| `AWS_SECRET_KEY` | AWS secret key for S3 |
| `JWT_SECRET` | Secret key for signing JWTs |
| `RAZORPAY_ID` | Razorpay key ID |
| `RAZORPAY_SECRET` | Razorpay secret key |
| `PORT` | Server port *(optional, defaults to `8080`)* |

### Customer App (`frontend/foodies`)

Create a `.env` file in `frontend/foodies/`:

```env
VITE_API_URL=http://localhost:8080
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Admin Panel (`frontend/adminpanel`)

Create a `.env` file in `frontend/adminpanel/`:

```env
VITE_API_URL=http://localhost:8080
```

> **Note:** Some admin service files may use a hardcoded local API path. If you encounter issues, update the API base URL in the admin service files to consistently use `VITE_API_URL`.

---

## 🚀 Running Locally

### 1. Start the Backend

```bash
cd backend
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`.

### 2. Start the Customer App

```bash
cd frontend/foodies
npm install
npm run dev
```

### 3. Start the Admin Panel

```bash
cd frontend/adminpanel
npm install
npm run dev
```

---

## 📜 API Reference

**Base URL:** `http://localhost:8080`

> All protected endpoints require the header: `Authorization: Bearer <token>`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/register` | Register a new user 
| `POST` | `/api/login` | Login and receive JWT 
| `GET` | `/api/foods` | List all food items 
| `POST` | `/api/foods` | Add a new food item 
| `DELETE` | `/api/foods/{id}` | Delete a food item 
| `GET` | `/api/cart` | Get user's cart 
| `POST` | `/api/cart` | Update cart 
| `POST` | `/api/orders/create` | Create an order 
| `POST` | `/api/orders/verify` | Verify Razorpay payment 
| `GET` | `/api/orders` | Get user's orders 
| `GET` | `/api/orders/all` | Get all orders (admin) 
| `PATCH` | `/api/orders/status/{orderId}?status=` | Update order status 

---

## 🛠️ Useful Scripts

### Frontend (Customer & Admin)

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run preview   # Preview production build
```

### Backend

```bash
./mvnw spring-boot:run   # Start API server
./mvnw test              # Run unit tests
```

---


> Built with ☕ Java, ⚛️ React, and 🍕 passion.
