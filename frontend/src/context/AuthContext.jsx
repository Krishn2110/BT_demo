import { createContext, useState, useEffect } from 'react';
import authApi from '../api/authApi.js';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check persistent authentication session from cookies on page load
  const checkAuth = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.get('/auth/me');
      if (response.data && response.data.success) {
        setUser(response.data.user);
      }
    } catch (err) {
      // 401 error simply means no token exists; fail silently without console error spam
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * User login function
   */
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.post('/auth/login', { email, password });
      if (response.data && response.data.success) {
        setUser(response.data.user);
        return { success: true };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * User registration function
   */
  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.post('/auth/signup', { name, email, password });
      if (response.data && response.data.success) {
        setUser(response.data.user);
        return { success: true };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed. Please try again.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * User logout function
   */
  const logout = async () => {
    try {
      setLoading(true);
      await authApi.post('/auth/logout');
      setUser(null);
      setError(null);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Logout failed.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Google sign-in function
   */
  const googleLogin = async (credential) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authApi.post('/auth/google', { credential });
      if (response.data && response.data.success) {
        setUser(response.data.user);
        return { success: true };
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Google sign-in failed. Please try again.';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        googleLogin,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
