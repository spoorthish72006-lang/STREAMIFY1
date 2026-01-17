import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Phone, Clock, TrendingUp, AlertTriangle, CheckCircle, UserCheck } from 'lucide-react';
import { useTickets } from '../contexts/TicketContext';

export function AgentDashboard({ user }) {
  const { tickets = [] } = useTickets();
  
  // Filter tickets for the current agent
  // Assuming user.fullName or user.id matches the assignedTo field
  // In a real app, we'd use IDs. Here we might match name string as seen in TicketManagement.
  const agentName = user?.fullName || 'Agent'; 
  
  const myTickets = tickets.filter(t => {
     if (!t.assignedTo) return false;
     if (typeof t.assignedTo === 'object') return t.assignedTo.name === agentName;
     return t.assignedTo === agentName;
  });

  const openTickets = myTickets.filter(t => t.status === 'open' || t.status === 'in-progress');
  
  const avgResolutionTime = 45; // Mock data for now, in minutes
  
  const resolvedToday = myTickets.filter(t => {
    const today = new Date().toDateString();
    return (t.status === 'resolved' || t.status === 'closed') && 
           new Date(t.createdAt).toDateString() === today;
  }).length;
  
  const custSatisfaction = 4.8; // Mock data

  const urgentTickets = myTickets.filter(t => t.priority === 'urgent' || t.priority === 'high');

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Welcome back, {agentName}</h2>
        <Badge variant="outline" className="text-sm py-1 px-3 bg-white">
            Status: <span className="text-green-600 font-bold ml-1">Active</span>
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-slate-600">My Active Tickets</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserCheck className="size-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-blue-600 text-2xl font-bold">{openTickets.length}</div>
            <p className="text-slate-500 mt-1 text-sm">Assigned to you</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-slate-600">Resolved Today</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="size-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
             <div className="text-green-600 text-2xl font-bold">{resolvedToday}</div>
             <p className="text-slate-500 mt-1 text-sm">Keep it up!</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white shadow-md hover:shadow-lg transition-shadow">
           <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-slate-600">Avg Resolution</CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="size-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-purple-600 text-2xl font-bold">{avgResolutionTime}m</div>
             <p className="text-slate-500 mt-1 text-sm">Target: 30m</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-slate-600">Satisfaction</CardTitle>
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="size-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-orange-600 text-2xl font-bold">{custSatisfaction}/5.0</div>
            <p className="text-slate-500 mt-1 text-sm">Based on recent feedback</p>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Assigned Tickets */}
      {urgentTickets.length > 0 && (
        <Card className="shadow-md border-red-200">
            <CardHeader className="bg-gradient-to-r from-red-50 to-white border-b border-red-100">
            <CardTitle className="flex items-center gap-2 text-red-900">
                <AlertTriangle className="size-5 text-red-600" />
                Urgent Attention Required
            </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                 <div className="space-y-3">
                    {urgentTickets.map(ticket => (
                        <div key={ticket.id} className="flex items-start justify-between p-4 border border-red-100 rounded-lg bg-red-50/30">
                            <div>
                                <h4 className="font-semibold text-slate-900">{ticket.title}</h4>
                                <p className="text-sm text-slate-600 mt-1">{ticket.description}</p>
                                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                                    <span className="font-mono">{ticket.id}</span>
                                    <span>•</span>
                                    <span>{ticket.customerName}</span>
                                    <span>•</span>
                                     <span>Wait: {ticket.waitTime}m</span>
                                </div>
                            </div>
                            <Badge variant="destructive">Urgent</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      )}

      {/* Recent Activity / My Tickets List */}
      <Card className="shadow-md border-slate-200">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <CardTitle className="text-slate-900">My Active Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {openTickets.length === 0 ? (
                 <p className="text-slate-500 text-center py-8">Good job! Your queue is empty.</p>
            ) : (
                openTickets.slice(0, 5).map(ticket => (
                <div key={ticket.id} className="flex items-start justify-between py-4 px-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 rounded-lg transition-colors group">
                    <div className="flex items-start gap-4">
                    <div className={`mt-1.5 size-3 rounded-full shadow-sm shrink-0 ${
                        ticket.status === 'in-progress' ? 'bg-blue-500 shadow-blue-500/50' :
                        'bg-orange-500 shadow-orange-500/50'
                    }`} />
                    <div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-slate-900 font-medium group-hover:text-blue-700 transition-colors">
                                {ticket.title || ticket.subject || 'Untitled Ticket'}
                            </p>
                            <Badge variant="outline" className="text-xs font-normal border-slate-300 text-slate-500">
                                {ticket.category}
                            </Badge>
                        </div>
                        
                        <p className="text-slate-500 text-sm mt-0.5">
                            <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 mr-2">{ticket.id}</span>
                            {ticket.customerName} • {ticket.channel} • {formatDate(ticket.createdAt)}
                        </p>
                    </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <Badge variant={ticket.status === 'in-progress' ? 'secondary' : 'outline'} className="shadow-sm">
                        {ticket.status}
                        </Badge>
                        <span className="text-xs text-slate-400">
                            {ticket.priority} priority
                        </span>
                    </div>
                </div>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
