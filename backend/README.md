# Secure Authentication Backend

This is the backend server for the React-Express-MongoDB JWT authentication system. It uses Node.js, Express, Mongoose, and cookie-based JWT sessions.

## Tech Stack
- **Node.js** & **Express**
- **MongoDB** & **Mongoose**
- **JWT (JsonWebToken)** for session authentication
- **Bcrypt.js** for high-strength password hashing
- **Cookie-Parser** for HTTP-only cookie parsing

## Features
- **User Signup**: Registers a user, hashes password, generates JWT, and sets cookie.
- **User Login**: Validates credentials, sets cookie, and returns profile details.
- **User Logout**: Clears cookie to terminate session.
- **Me Endpoint**: Retrieves profile of current user after verifying cookie.

## API Endpoints

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Public | Register new user. Returns user profile & stores JWT in cookie. |
| `POST` | `/api/auth/login` | Public | Authenticates credentials. Returns user profile & stores JWT in cookie. |
| `POST` | `/api/auth/logout` | Public | Clears session cookie. |
| `GET` | `/api/auth/me` | Protected | Verifies JWT cookie and returns the active user profile. |

## Quick Start

1. **Configure Environment Variables**
   Rename or update your `.env` variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string_here
   JWT_SECRET=your_jwt_secret_here
   FRONTEND_URL=http://localhost:5173
   NODE_ENV=development
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run in Development Mode**
   ```bash
   npm run dev
   ```

4. **Start Production Server**
   ```bash
   npm start
   ```
