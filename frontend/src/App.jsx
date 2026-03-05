import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { TicketProvider } from './contexts/TicketContext';
import { CustomerServiceDashboard } from './components/CustomerServiceDashboard';
import { TicketManagement } from './components/TicketManagement';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { CustomerSettings } from './components/CustomerSettings';
import { SatisfactionTracking } from './components/SatisfactionTracking';
import { AgentAvailability } from './components/AgentAvailability';
import { LiveMonitoring } from './components/LiveMonitoring';
import { CallVolumeOverview } from './components/CallVolumeOverview';
import { AgentDashboard } from './components/AgentDashboard';
import { AgentTicketManagement } from './components/AgentTicketManagement';
import { AgentList } from './components/AgentList';
import { Toaster } from './components/ui/sonner';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { authApi } from './lib/api';
import { Button } from './components/ui/button';
import {
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
  Loader2,
  UserCheck
} from 'lucide-react';

const adminNavigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'tickets', label: 'Tickets', icon: Ticket, path: '/tickets' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/analytics' },
  { id: 'satisfaction', label: 'Satisfaction', icon: Star, path: '/satisfaction' },
  { id: 'agents', label: 'Agents', icon: Users, path: '/agents' },
  { id: 'monitoring', label: 'Live Monitoring', icon: Activity, path: '/monitoring' },
  { id: 'call-volume', label: 'Call Volume', icon: PhoneCall, path: '/call-volume' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

const agentNavigationItems = [
  { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'my-tickets', label: 'My Tickets', icon: UserCheck, path: '/my-tickets' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

function AppContent({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const userRole = user.role || 'admin'; 
  const navigationItems = userRole === 'agent' ? agentNavigationItems : adminNavigationItems;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 w-screen">
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
                {userRole === 'agent' ? 'Agent Portal' : 'Retail Bank Customer Service Portal'}
              </h1>
              <h1 className="bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent md:hidden">
                CS Portal
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden md:flex flex-col items-end text-sm">
               <span className="font-medium text-slate-700">{user.fullName}</span>
               <span className="text-slate-500 capitalize">{userRole}</span>
            </div>
            
            <Button variant="ghost" size="icon" onClick={onLogout} title="Logout" style={{backgroundColor: "#bebebe15", color: "#000"}}>
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

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => `
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                  style={({ isActive }) => isActive ? {} : {backgroundColor: "#ffffff40", color: "#000"}}
                >
                  <Icon className="size-5" />
                  <span className={location.pathname === item.path ? 'text-white' : 'text-black'}>{item.label}</span>
                </NavLink>
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
          <div className="max-w-7xl mx-auto">
            <Routes>
              {userRole === 'agent' ? (
                <>
                  <Route path="/" element={<AgentDashboard user={user} />} />
                  <Route path="/my-tickets" element={<AgentTicketManagement user={user} />} />
                  <Route path="/settings" element={<CustomerSettings />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<CustomerServiceDashboard />} />
                  <Route path="/tickets" element={<TicketManagement />} />
                  <Route path="/analytics" element={<AnalyticsDashboard />} />
                  <Route path="/settings" element={<CustomerSettings />} />
                  <Route path="/satisfaction" element={<SatisfactionTracking />} />
                  <Route path="/agents" element={<AgentList />} />
                  <Route path="/monitoring" element={<LiveMonitoring />} />
                  <Route path="/call-volume" element={<CallVolumeOverview />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )}
            </Routes>
          </div>
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 w-screen">
        <Loader2 className="size-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <TicketProvider>
        <Toaster />
        {!user ? (
          <>
            {authView === 'login' ? (
              <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setAuthView('signup')} />
            ) : (
              <SignupPage onLogin={handleLogin} onSwitchToLogin={() => setAuthView('login')} />
            )}
          </>
        ) : (
          <AppContent user={user} onLogout={handleLogout} />
        )}
      </TicketProvider>
    </BrowserRouter>
  );
}
