import bcrypt from 'bcryptjs';

/**
 * Hashes a plaintext password.
 * @param {string} password - Plaintext password
 * @returns {Promise<string>} Hashed password
 */
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

/**
 * Compares plaintext password with its hashed version.
 * @param {string} enteredPassword - Plaintext password entered by user
 * @param {string} hashedPassword - Hashed password stored in database
 * @returns {Promise<boolean>} Match result
 */
export const comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};
