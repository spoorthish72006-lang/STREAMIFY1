import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ticketsApi } from '../lib/api';
import { useTickets } from '../contexts/TicketContext';
import { Search, Clock, User, CheckCircle, RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';

export function AgentTicketManagement({ user }) {
  const { resolveTicket } = useTickets();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const fetchAssignedTickets = async () => {
    try {
      setLoading(true);
      const data = await ticketsApi.getAssignedTickets();
      // Ensure data is array and normalize IDs
      const mappedData = Array.isArray(data) ? data.map(t => ({...t, id: t._id || t.id})) : [];
      setTickets(mappedData);
    } catch (err) {
      console.error("Failed to fetch assigned tickets:", err);
      toast.error("Failed to load your tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedTickets();
  }, []);

  // Filter for agent's assigned tickets (now done by backend, but we keep local filters)
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      (ticket.customerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ticket.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ticket.id || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
      case 'closed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'waiting': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="shadow-md border-slate-200">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-900">My Tickets ({filteredTickets.length})</CardTitle>
            <Button variant="ghost" size="sm" onClick={fetchAssignedTickets}>
              <RefreshCcw className="size-4 mr-2" /> Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                placeholder="Search by customer, subject, or ticket ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white text-slate-900 placeholder:text-slate-400"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-slate-50 border-slate-200 text-slate-900">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-slate-50 border-slate-200 text-slate-900">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Cards */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <Card className="shadow-md border-slate-200">
            <CardContent className="py-12 text-center text-slate-500">
              No tickets found in your queue
            </CardContent>
          </Card>
        ) : (
          filteredTickets.map(ticket => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              getPriorityColor={getPriorityColor}
              getStatusColor={getStatusColor}
              onResolve={async (id, score) => {
                 await resolveTicket(id, score);
                 fetchAssignedTickets(); // Refresh list after resolution
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

function TicketCard({ ticket, getPriorityColor, getStatusColor, onResolve }) {
  const [showResolveDialog, setShowResolveDialog] = useState(false);
  const [satisfactionScore, setSatisfactionScore] = useState(5);

  const formatDate = (date) => {
    if (!date) return '';
    const dateObj = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  const handleResolve = () => {
    onResolve(ticket.id, satisfactionScore);
    setShowResolveDialog(false);
    toast.success('Ticket resolved successfully');
  };

  return (
    <Card className="hover:shadow-lg transition-all border-slate-200 shadow-md bg-white group">
      <CardContent className="pt-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                 {/* Title & Status */}
                 <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {ticket.title || ticket.subject || 'Untitled Ticket'}
                    </h3>
                    <Badge className={getStatusColor(ticket.status) + " shadow-none font-normal"}>
                      {ticket.status}
                    </Badge>
                    <Badge variant={getPriorityColor(ticket.priority)} className="shadow-none font-normal">
                      {ticket.priority}
                    </Badge>
                 </div>
                 
                 {/* Secondary Meta Data */}
                 <div className="flex items-center gap-3 text-sm text-slate-500 flex-wrap">
                    <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                      ID: {ticket.id}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="size-3.5" />
                      {ticket.customerName || 'Unknown Customer'}
                    </span>
                 </div>
              </div>
            </div>

            {/* Description & Extra Meta */}
            <p className="text-slate-600 text-sm line-clamp-2 max-w-3xl">
              {ticket.description || ticket.notes || 'No description provided.'}
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
               <div className="flex items-center gap-1">
                <Clock className="size-3" />
                <span>Created {formatDate(ticket.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="size-3" />
                <span>Wait: {ticket.waitTime || 0}m</span>
              </div>
              <span className="capitalize px-2 py-0.5 bg-slate-50 border border-slate-100 rounded">
                Category: {ticket.category}
              </span>
               <span className="capitalize px-2 py-0.5 bg-slate-50 border border-slate-100 rounded">
                Channel: {ticket.channel}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex lg:flex-col gap-2 min-w-[120px]">
            {ticket.status !== 'resolved' && ticket.status !== 'closed' && (
              <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
                <DialogTrigger asChild>
                  <Button className="flex-1 lg:flex-none shadow-sm text-black">
                    <CheckCircle className="size-4 mr-2" /> Resolve
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Resolve Ticket</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <p className="text-slate-600">Rate customer satisfaction:</p>
                    <div className="flex items-center justify-center gap-2">
                      {[1,2,3,4,5].map(score => (
                        <Button
                          key={score}
                          variant={satisfactionScore === score ? 'default' : 'outline'}
                          size="lg"
                          className="shadow-sm text-black"
                          onClick={() => setSatisfactionScore(score)}
                        >
                          {score}
                        </Button>
                      ))}
                    </div>
                    <Button className="w-full shadow-sm text-black" onClick={handleResolve}>Confirm Resolution</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
