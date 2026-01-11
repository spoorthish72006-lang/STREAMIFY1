import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Phone, Clock, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTickets } from '../contexts/TicketContext';

export function CustomerServiceDashboard() {
  const { tickets = [] } = useTickets();
  
  const openTickets = (tickets || []).filter(t => t.status === 'open' || t.status === 'in-progress');
  const avgWaitTime = openTickets.length > 0 
    ? Math.round(openTickets.reduce((acc, t) => acc + t.waitTime, 0) / openTickets.length)
    : 0;
  const urgentTickets = tickets.filter(t => t.priority === 'urgent' || t.priority === 'high');
  const resolvedToday = tickets.filter(t => {
    const today = new Date().toDateString();
    return (t.status === 'resolved' || t.status === 'closed') && 
           new Date(t.createdAt).toDateString() === today;
  }).length;
  const avgSatisfaction = 3.96;
  const satisfactionChange = -12;

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
      {/* Alert Banner */}
      <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50 shadow-lg shadow-red-500/10">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-100 rounded-xl">
              <AlertTriangle className="size-6 text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-red-900">High Call Volume Alert</h3>
              <p className="text-red-700 mt-1">
                Customer satisfaction has dropped by 12% this quarter due to increased wait times. 
                Current average wait time: {avgWaitTime} minutes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-slate-600">Active Calls/Tickets</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Phone className="size-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-blue-600">{openTickets.length}</div>
            <p className="text-slate-500 mt-1">Currently in queue</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-slate-600">Avg Wait Time</CardTitle>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="size-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-orange-600">{avgWaitTime} min</div>
            <p className="text-slate-500 mt-1">Target: {'<'}10 min</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-slate-600">Customer Satisfaction</CardTitle>
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="size-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-red-600">{avgSatisfaction.toFixed(2)}/5.0</span>
              <Badge variant="destructive" className="text-xs shadow-sm">{satisfactionChange}%</Badge>
            </div>
            <p className="text-slate-500 mt-1">Down from 4.5</p>
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
            <div className="text-green-600">{resolvedToday}</div>
            <p className="text-slate-500 mt-1">Tickets closed</p>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Tickets */}
      <Card className="shadow-md border-slate-200">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="size-5 text-red-600" />
            </div>
            Urgent & High Priority Tickets ({urgentTickets.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-3">
            {urgentTickets.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No urgent tickets at this time</p>
            ) : (
              urgentTickets.map(ticket => (
                <UrgentTicketCard key={ticket.id} ticket={ticket} />
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-md border-slate-200">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <CardTitle>Recent Ticket Activity</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-1">
            {tickets.slice(0, 5).map(ticket => (
              <div key={ticket.id} className="flex items-center justify-between py-4 px-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`size-3 rounded-full shadow-sm ${
                    ticket.status === 'resolved' || ticket.status === 'closed' ? 'bg-green-500 shadow-green-500/50' :
                    ticket.status === 'in-progress' ? 'bg-blue-500 shadow-blue-500/50' :
                    ticket.status === 'open' ? 'bg-orange-500 shadow-orange-500/50' :
                    'bg-slate-400 shadow-slate-400/50'
                  }`} />
                  <div>
                    <p className="text-slate-900">{ticket.customerName} - {ticket.subject}</p>
                    <p className="text-slate-500">{ticket.id} • {ticket.channel} • {formatDate(ticket.createdAt)}</p>
                  </div>
                </div>
                <Badge variant={
                  ticket.status === 'resolved' || ticket.status === 'closed' ? 'default' :
                  ticket.status === 'in-progress' ? 'secondary' :
                  'outline'
                } className="shadow-sm">
                  {ticket.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function UrgentTicketCard({ ticket }) {
  const { assignTicket } = useTickets();

  return (
    <div className="flex items-start justify-between p-5 border border-slate-200 rounded-xl hover:bg-slate-50 hover:shadow-md transition-all bg-white">
      <div className="flex-1">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant={ticket.priority === 'urgent' ? 'destructive' : 'default'} className="shadow-sm">
            {ticket.priority}
          </Badge>
          <span className="text-slate-900">{ticket.id}</span>
          <span className="text-slate-400">•</span>
          <span>{ticket.customerName}</span>
        </div>
        <p className="text-slate-700 mt-2">{ticket.subject}</p>
        <p className="text-slate-500 mt-1">{ticket.notes}</p>
      </div>
      <div className="text-right ml-4 flex flex-col items-end gap-2">
        <Badge variant={ticket.status === 'open' ? 'outline' : 'secondary'} className="shadow-sm">
          {ticket.status}
        </Badge>
        <p className="text-slate-500">Wait: {ticket.waitTime}m</p>
        {ticket.assignedTo ? (
          <p className="text-slate-600">{ticket.assignedTo}</p>
        ) : (
          <Button 
            size="sm" 
            className="shadow-sm"
            onClick={() => assignTicket(ticket.id, `Agent ${Math.floor(Math.random() * 7) + 1}`)}
          >
            Assign
          </Button>
        )}
      </div>
    </div>
  );
}
