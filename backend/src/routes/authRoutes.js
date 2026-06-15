import express from 'express';
import { signup, login, logout, me, googleLogin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/google', googleLogin);

// Protected routes (requires valid HTTP-only JWT cookie)
router.get('/me', protect, me);

export default router;
