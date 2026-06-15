import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

/**
 * Route protection wrapper component.
 * Blocks rendering of child elements if user is logged out and redirects to /login.
 */
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Premium loading state while validating JWT cookie
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            {/* Pulsing outer rings for premium look */}
            <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-ping"></div>
            <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
          </div>
          <span className="text-sm font-semibold tracking-wide text-[#1E293B] animate-pulse">
            Establishing secure connection...
          </span>
        </div>
      </div>
    );
  }

  // Redirect to login if user session doesn't exist
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render child routes
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
