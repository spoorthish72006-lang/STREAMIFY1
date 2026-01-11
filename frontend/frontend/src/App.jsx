import { useState } from 'react';
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
  X
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

function AppContent() {
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
      <Toaster />

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
              <h1 className="bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
                Retail Bank Customer Service Portal
              </h1>
              <p className="text-slate-600 mt-1">
                Manage customer inquiries and improve satisfaction
              </p>
            </div>
          </div>

          <Badge
            variant="destructive"
            className="flex items-center gap-2 px-4 py-2 shadow-lg shadow-red-500/20"
          >
            <AlertCircle className="size-4" />
            Satisfaction -12%
          </Badge>
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
  return (
    <TicketProvider>
      <AppContent />
    </TicketProvider>
  );
}
