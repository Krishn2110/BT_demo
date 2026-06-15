# Authentication System

A full-stack authentication application built using React, Node.js, Express, and MongoDB. The project demonstrates a production-oriented authentication flow with secure user registration, login, protected routes, JWT-based authentication, password hashing, and HTTP-only cookies.

## Features

* User Registration (Signup)
* User Login
* Secure Password Hashing using bcrypt
* JWT Authentication
* HTTP-Only Cookie Storage
* Protected Routes
* User Session Validation
* Logout Functionality
* Responsive UI
* Clean and Scalable Folder Structure
* MongoDB Database Integration

## Tech Stack

### Frontend

* React
* Vite
* React Router DOM
* Axios
* Context API

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Security

* JWT (JSON Web Token)
* bcrypt
* HTTP-Only Cookies
* Helmet
* CORS
* Express Rate Limiting

## Project Structure

### Backend

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env
└── package.json
```

### Frontend

```text
frontend/
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── routes/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

## Authentication Flow

### User Registration

1. User submits registration form.
2. Server validates input.
3. Password is hashed using bcrypt.
4. User is stored in MongoDB.
5. Success response is returned.

### User Login

1. User submits email and password.
2. Server verifies credentials.
3. JWT token is generated.
4. JWT is stored in an HTTP-only cookie.
5. User is authenticated successfully.

### Protected Route Access

1. Client requests protected resource.
2. JWT is automatically sent via cookie.
3. Middleware verifies token.
4. Access is granted if token is valid.

## API Endpoints

### Register User

```http
POST /api/auth/signup
```

### Login User

```http
POST /api/auth/login
```

### Get Current User

```http
GET /api/auth/me
```

### Logout User

```http
POST /api/auth/logout
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Security Practices Implemented

* Password hashing with bcrypt
* JWT authentication
* HTTP-only cookies
* Protected routes
* CORS configuration
* Helmet security middleware
* Rate limiting against brute-force attacks
* Input validation

## Future Improvements

* Email Verification
* Forgot Password
* Refresh Token Rotation
* Role-Based Access Control (RBAC)
* OAuth Login (Google/GitHub)
* Two-Factor Authentication (2FA)

## Author

Kislay Rai

Built as part of an authentication system assignment to demonstrate secure and scalable full-stack application development practices.
