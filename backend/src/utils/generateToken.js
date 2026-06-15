import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token and sets it as an HTTP-Only cookie in the response.
 * @param {Object} res - Express response object
 * @param {string} userId - User ID to embed in the payload
 * @returns {string} The generated JWT token
 */
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });

  // Configure cookie options
  const cookieOptions = {
    httpOnly: true, // Prevents client-side JS from accessing the cookie (mitigates XSS)
    secure: process.env.NODE_ENV === 'production', // Only transmit over HTTPS in production
    sameSite: 'lax', // Protects against CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days matching the JWT expiration
  };

  res.cookie('token', token, cookieOptions);

  return token;
};

export default generateToken;
export { generateToken };
