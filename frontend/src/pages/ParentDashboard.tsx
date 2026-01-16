import { useState, useEffect } from 'react';
import { Menu, X, LogOut, ClipboardList, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import JebsenTest from '../components/JebsenTest.tsx';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, login, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('jebsen');
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !redirecting) {
      // Redirect to login if not authenticated
      setRedirecting(true);
      login();
    }
  }, [isLoading, isAuthenticated, redirecting, login]);

  const handleLogout = () => {
    logout();
  };

  if (isLoading || redirecting) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } transition-all duration-300 bg-[#1C1C1E] border-r border-[#38383A] flex flex-col h-screen overflow-y-auto flex-shrink-0`}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#38383A] flex items-center justify-between">
          {isSidebarOpen && (
            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-[#2C2C2E] rounded-lg transition-colors"
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5 text-[#8E8E93]" />
            ) : (
              <Menu className="w-5 h-5 text-[#8E8E93]" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => navigate('/child')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-[#8E8E93] hover:bg-[#2C2C2E]"
          >
            <Users className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="text-sm font-medium">Select Child</span>}
          </button>
          
          <button
            onClick={() => setActiveTab('jebsen')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all relative ${
              activeTab === 'jebsen'
                ? 'bg-[#0A84FF] text-white'
                : 'text-[#8E8E93] hover:bg-[#2C2C2E]'
            }`}
          >
            <ClipboardList className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="text-sm font-medium">Jebsen Hand Test</span>}
            {activeTab === 'jebsen' && (
              <div className="absolute right-3 w-2 h-2 rounded-full bg-white animate-pulse" />
            )}
          </button>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-[#38383A]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#FF453A] hover:bg-[#2C2C2E] transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen bg-black">
        {/* Content Area */}
        <div className="p-8">
          {activeTab === 'jebsen' && <JebsenTest />}
        </div>
      </main>
    </div>
  );
};

export default ParentDashboard;
