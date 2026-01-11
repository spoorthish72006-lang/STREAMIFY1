import { useState, useEffect } from 'react';
import { TicketProvider } from './contexts/TicketContext';
import { CustomerServiceDashboard } from './components/CustomerServiceDashboard';
import { TicketManagement } from './components/TicketManagement';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { CustomerSettings } from './components/CustomerSettings';
import { SatisfactionTracking } from './components/SatisfactionTracking';
import { AgentAvailability } from './components/AgentAvailability';
import { LiveMonitoring } from './components/LiveMonitoring';
import { CallVolumeOverview } from './components/CallVolumeOverview';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Toaster } from './components/ui/sonner';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { authApi } from './lib/api';
import {
  AlertCircle,
  LayoutDashboard,
  Ticket,
  BarChart3,
  Settings,
  Star,
  Users,
  Activity,
  PhoneCall,
  Menu,
  X,
  LogOut,
  Loader2
} from 'lucide-react';

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'tickets', label: 'Tickets', icon: Ticket },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'satisfaction', label: 'Satisfaction', icon: Star },
  { id: 'agents', label: 'Agent Availability', icon: Users },
  { id: 'monitoring', label: 'Live Monitoring', icon: Activity },
  { id: 'call-volume', label: 'Call Volume', icon: PhoneCall },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function AppContent({ user, onLogout }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <CustomerServiceDashboard />;
      case 'tickets':
        return <TicketManagement />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'settings':
        return <CustomerSettings />;
      case 'satisfaction':
        return <SatisfactionTracking />;
      case 'agents':
        return <AgentAvailability />;
      case 'monitoring':
        return <LiveMonitoring />;
      case 'call-volume':
        return <CallVolumeOverview />;
      default:
        return <CustomerServiceDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-5 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
            <div>
              <h1 className="bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent hidden md:block">
                Retail Bank Customer Service Portal
              </h1>
              <h1 className="bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent md:hidden">
                Customer Service
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end text-sm">
               <span className="font-medium text-slate-700">{user.fullName}</span>
               <span className="text-slate-500">{user.email}</span>
            </div>
            
            <Button variant="ghost" size="icon" onClick={onLogout} title="Logout">
              <LogOut className="size-5 text-slate-500 hover:text-red-500" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-[89px] left-0 h-[calc(100vh-89px)] w-64
            bg-white/80 backdrop-blur-md border-r border-slate-200
            transition-transform duration-300 z-10 shadow-lg lg:shadow-none
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                >
                  <Icon className="size-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-0 lg:hidden top-[89px]"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">{renderPage()}</div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authView, setAuthView] = useState('login'); // 'login' or 'signup'

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authApi.check();
        setUser(userData);
      } catch (error) {
        // Not authenticated
        console.log("User not authenticated");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="size-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Toaster />
        {authView === 'login' ? (
          <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setAuthView('signup')} />
        ) : (
          <SignupPage onLogin={handleLogin} onSwitchToLogin={() => setAuthView('login')} />
        )}
      </>
    );
  }

  return (
    <TicketProvider>
      <Toaster />
      <AppContent user={user} onLogout={handleLogout} />
    </TicketProvider>
  );
}
