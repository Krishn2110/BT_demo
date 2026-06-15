import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login.jsx';
import { Signup } from '../pages/Signup.jsx';
import { Home } from '../pages/Home.jsx';
import { ProtectedRoute } from '../components/ProtectedRoute.jsx';
import { Navbar } from '../components/Navbar.jsx';

/**
 * AppRoutes defines the navigation mappings for the application.
 */
export const AppRoutes = () => {
  return (
    <>
      {/* Navbar will render automatically only when user is logged in */}
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes - Wrapped with ProtectedRoute layout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Fallback Catch-all Route - Redirect to Dashboard */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
