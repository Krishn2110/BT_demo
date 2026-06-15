import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';


export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/login');
    }
  };

  if (!user) return null;

  const getInitials = (fullName) => {
    if (!fullName) return 'U';
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 w-full transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand Name */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center shadow-md shadow-indigo-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] bg-clip-text text-transparent">
              AuthSecure
            </span>
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-50 py-1.5 pl-2 pr-3.5 rounded-full border border-slate-100">
              {/* Profile Avatar Card */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#4F46E5] to-[#7C3AED] text-white flex items-center justify-center font-bold text-xs shadow-sm shadow-indigo-100 select-none">
                {getInitials(user.name)}
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-[#1E293B]">
                {user.name}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-sm shadow-indigo-100 transition-all duration-150 cursor-pointer"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
