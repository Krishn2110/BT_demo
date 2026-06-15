import { registerUser, loginUser, verifyGoogleToken, upsertGoogleUser } from '../services/authService.js';
import { generateToken } from '../utils/generateToken.js';

/**
 * @desc    Register a new user & set cookie
 * @route   POST /api/auth/signup
 * @access  Public
 */
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Simple input validation
  if (!name || !email || !password) {
    res.status(400);
    return next(new Error('Please fill in all fields (name, email, password)'));
  }

  if (password.length < 6) {
    res.status(400);
    return next(new Error('Password must be at least 6 characters long'));
  }

  try {
    const user = await registerUser({ name, email, password });

    // Generate JWT and store in HTTP-only cookie
    generateToken(res, user._id);

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user & set cookie
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Simple input validation
  if (!email || !password) {
    res.status(400);
    return next(new Error('Please enter both email and password'));
  }

  try {
    const user = await loginUser({ email, password });

    // Generate JWT and store in HTTP-only cookie
    generateToken(res, user._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(401); // Unauthorized for invalid credentials
    next(error);
  }
};

/**
 * @desc    Logout user & clear cookie
 * @route   POST /api/auth/logout
 * @access  Public
 */
export const logout = async (req, res) => {
  // Clear cookie by setting its expiry time in the past
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

/**
 * @desc    Get current authenticated user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const me = async (req, res) => {
  // req.user is populated by the protect middleware
  return res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
};

/**
 * @desc    Authenticate with Google OAuth token
 * @route   POST /api/auth/google
 * @access  Public
 */
export const googleLogin = async (req, res, next) => {
  const { credential } = req.body;

  if (!credential) {
    res.status(400);
    return next(new Error('Google credential token is required'));
  }

  try {
    // Verify client token using Google SDK
    const payload = await verifyGoogleToken(credential);
    const { sub: googleId, email, name } = payload;

    // Retrieve or register user database record
    const user = await upsertGoogleUser({ googleId, email, name });

    // Set cookie
    generateToken(res, user._id);

    return res.status(200).json({
      success: true,
      message: 'Google login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(401); // Google OAuth authentication failure
    next(error);
  }
};
