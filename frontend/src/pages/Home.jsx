import { useAuth } from '../hooks/useAuth.js';

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <main className="max-w-4xl mx-auto px-4 py-12 w-full flex-1 flex flex-col justify-start">
        {/* Welcome Header */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] tracking-tight">
            Hello, {user?.name || 'User'} 👋
          </h1>
          <p className="text-lg sm:text-xl font-medium text-slate-500 mt-2">
            Welcome Back!
          </p>
        </div>

        {/* Dashboard layout */}
        <div className="w-full max-w-2xl bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1E293B]">{user?.name}</h3>
                <p className="text-xs font-semibold text-indigo-600">Account Owner</p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-4">
              <div className="flex justify-between items-center py-1">
                <span className="text-sm font-semibold text-slate-500">Email Address</span>
                <span className="text-sm font-bold text-[#1E293B]">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm font-semibold text-slate-500">Unique Identifier</span>
                <span className="text-xs font-mono bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1.5 rounded-lg select-all">
                  {user?.id}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-sm font-semibold text-slate-500">Session Status</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 border border-green-100 text-green-700">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Authenticated
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-indigo-50/50 border border-indigo-100/50 rounded-2xl flex items-center gap-3">
            <div className="text-indigo-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <p className="text-xs text-indigo-900 font-medium leading-relaxed">
              Your session is fully secured with an <strong>HTTP-Only cookie</strong>. This prevents script-based credential thefts (XSS).
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
