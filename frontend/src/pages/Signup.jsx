import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { GoogleLogin } from '@react-oauth/google';


export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { user, signup, googleLogin, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  // Redirect to home if user session already exists
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
    // Clean any prior global context errors on page mount
    setError(null);
  }, [user, navigate, setError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // Local form validations
    if (!name || !email || !password || !confirmPassword) {
      setFormError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    const result = await signup(name, email, password);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-[#F1F5F9] via-[#EEF2F6] to-[#E2E8F0] p-4 relative overflow-hidden">
      {/* Decorative Blur Spheres for Premium Glassmorphism Look */}
      <div className="absolute top-1/4 -left-16 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-16 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-45 animate-pulse delay-75"></div>

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-xl shadow-slate-200/50 z-10 transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] items-center justify-center shadow-lg shadow-indigo-200 mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-[#1E293B] tracking-tight">Create Account</h2>
          <p className="text-sm font-medium text-slate-500 mt-2">Get started with your free secure profile</p>
        </div>

        {/* Error Display */}
        {(formError || error) && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-xl text-xs font-semibold text-red-600 flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <span>{formError || error}</span>
          </div>
        )}

        {/* Google OAuth Signup Button */}
        <div className="flex flex-col items-center justify-center mb-6">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              const res = await googleLogin(credentialResponse.credential);
              if (res.success) {
                navigate('/');
              }
            }}
            onError={() => {
              setError('Google Sign-In failed. Please try again.');
            }}
            useOneTap
            shape="circle"
            theme="outline"
            text="signup_with"
            width="100%"
          />
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-slate-200 w-full"></div>
          <span className="absolute bg-white/95 border border-slate-100 rounded-full px-3.5 py-0.5 text-xs font-bold uppercase tracking-wider text-slate-400 select-none">
            or
          </span>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </span>
              <input
                id="name"
                type="text"
                required
                disabled={loading}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setFormError('');
                }}
                placeholder="Kislay rai"
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl outline-none transition-all duration-200 text-sm font-medium text-slate-800 disabled:bg-slate-50 disabled:text-slate-400"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5" htmlFor="email">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                </svg>
              </span>
              <input
                id="email"
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFormError('');
                }}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl outline-none transition-all duration-200 text-sm font-medium text-slate-800 disabled:bg-slate-50 disabled:text-slate-400"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                disabled={loading}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFormError('');
                }}
                placeholder="At least 6 characters"
                className="w-full pl-11 pr-11 py-2.5 bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl outline-none transition-all duration-200 text-sm font-medium text-slate-800 disabled:bg-slate-50 disabled:text-slate-400"
              />
              <button
                type="button"
                disabled={loading}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none cursor-pointer"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </span>
              <input
                id="confirmPassword"
                type="password"
                required
                disabled={loading}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setFormError('');
                }}
                placeholder="Confirm your password"
                className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl outline-none transition-all duration-200 text-sm font-medium text-slate-800 disabled:bg-slate-50 disabled:text-slate-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] text-white font-semibold rounded-xl shadow-lg shadow-indigo-200/50 hover:shadow-indigo-300/50 active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        {/* Redirect to Login */}
        <div className="mt-6 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm font-medium text-slate-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
