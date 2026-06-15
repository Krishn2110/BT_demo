import jwt from 'jsonwebtoken';


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
