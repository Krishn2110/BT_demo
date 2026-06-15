import { User } from '../models/User.js';

/**
 * Registers a new user.
 * @param {Object} userData - User information
 * @param {string} userData.name - Full name
 * @param {string} userData.email - Unique email address
 * @param {string} userData.password - Plaintext password
 * @returns {Promise<Object>} Newly created user model
 */
export const registerUser = async ({ name, email, password }) => {
  // Check if email already registered (duplicate checking)
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('Email address is already registered');
    error.code = 11000; // Trigger custom duplicate handler in errorMiddleware
    throw error;
  }

  // Create user (password is hashed in pre-save middleware)
  const user = await User.create({
    name,
    email,
    password,
  });

  return user;
};

/**
 * Authenticates an existing user by email and password.
 * @param {Object} credentials - User credentials
 * @param {string} credentials.email - Email address
 * @param {string} credentials.password - Plaintext password
 * @returns {Promise<Object>} Authenticated user instance
 */
export const loginUser = async ({ email, password }) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compare passwords using instance method
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  return user;
};

/**
 * Retrieves a user profile by ID (excluding password).
 * @param {string} userId - User ID
 * @returns {Promise<Object>} User document without password
 */
export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User profile not found');
  }
  return user;
};

import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client();

/**
 * Verifies a Google ID token.
 * @param {string} idToken - Client-supplied Google token
 */
export const verifyGoogleToken = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload(); // Returns email, name, sub (googleId), etc.
  } catch (error) {
    throw new Error(`Google token validation failed: ${error.message}`);
  }
};

/**
 * Finds or creates a user from their verified Google profile.
 */
export const upsertGoogleUser = async ({ googleId, email, name }) => {
  // Find by googleId
  let user = await User.findOne({ googleId });
  if (user) return user;

  // Find by email (user signed up via traditional email/password first)
  user = await User.findOne({ email });
  if (user) {
    user.googleId = googleId; // Link account
    await user.save();
    return user;
  }

  // Create new user (password is optional since they are a Google user)
  user = await User.create({
    name,
    email,
    googleId,
  });

  return user;
};
