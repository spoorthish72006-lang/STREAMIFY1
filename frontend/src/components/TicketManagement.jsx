import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useTickets } from '../contexts/TicketContext';
import { Search, Plus, Clock, User, Trash2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export function TicketManagement() {
  const { tickets, addTicket, assignTicket, resolveTicket, deleteTicket } = useTickets();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    customerId: '',
    subject: '',
    category: 'general',
    priority: 'medium',
    channel: 'phone',
    notes: ''
  });

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      ticket.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateTicket = () => {
    if (!formData.customerName || !formData.subject) {
      toast.error('Please fill in required fields');
      return;
    }

    addTicket({
      customerId: formData.customerId || `CUST-${Math.floor(Math.random() * 9999)}`,
      customerName: formData.customerName,
      subject: formData.subject,
      category: formData.category,
      priority: formData.priority,
      channel: formData.channel,
      notes: formData.notes,
      status: 'open'
    });

    setFormData({
      customerName: '',
      customerId: '',
      subject: '',
      category: 'general',
      priority: 'medium',
      channel: 'phone',
      notes: ''
    });

    setIsDialogOpen(false);
    toast.success('Ticket created successfully');
  };

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
      case 'closed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters & New Ticket */}
      <Card className="shadow-md border-slate-200">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <div className="flex items-center justify-between">
            <CardTitle>All Tickets ({filteredTickets.length})</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="shadow-sm">
                  <Plus className="size-4 mr-2" />
                  New Ticket
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Create New Ticket</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Customer Name *</Label>
                    <Input
                      placeholder="Enter customer name"
                      className="mt-1"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Customer ID</Label>
                    <Input
                      placeholder="Auto-generated if empty"
                      className="mt-1"
                      value={formData.customerId}
                      onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Subject *</Label>
                    <Input
                      placeholder="Brief description"
                      className="mt-1"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="account">Account</SelectItem>
                          <SelectItem value="transaction">Transaction</SelectItem>
                          <SelectItem value="loan">Loan</SelectItem>
                          <SelectItem value="card">Card</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Priority</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) => setFormData({ ...formData, priority: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Channel</Label>
                    <Select
                      value={formData.channel}
                      onValueChange={(value) => setFormData({ ...formData, channel: value })}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="chat">Chat</SelectItem>
                        <SelectItem value="in-person">In-Person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Notes</Label>
                    <Textarea
                      placeholder="Additional details"
                      className="mt-1"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </div>
                  <Button className="w-full" onClick={handleCreateTicket}>
                    Create Ticket
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
                className="pl-10 bg-slate-50 border-slate-200 focus:bg-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-slate-50 border-slate-200">
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
              <SelectTrigger className="w-full md:w-[180px] bg-slate-50 border-slate-200">
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
              No tickets found matching your criteria
            </CardContent>
          </Card>
        ) : (
          filteredTickets.map(ticket => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              getPriorityColor={getPriorityColor}
              getStatusColor={getStatusColor}
              onAssign={assignTicket}
              onResolve={resolveTicket}
              onDelete={deleteTicket}
            />
          ))
        )}
      </div>
    </div>
  );
}

function TicketCard({ ticket, getPriorityColor, getStatusColor, onAssign, onResolve, onDelete }) {
  const [showResolveDialog, setShowResolveDialog] = useState(false);
  const [satisfactionScore, setSatisfactionScore] = useState(5);

  const formatDate = (date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  const handleResolve = () => {
    onResolve(ticket.id, satisfactionScore);
    setShowResolveDialog(false);
    toast.success('Ticket resolved successfully');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this ticket?')) {
      onDelete(ticket.id);
      toast.success('Ticket deleted');
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all border-slate-200 shadow-md bg-white">
      <CardContent className="pt-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-slate-900">{ticket.id}</span>
              <Badge variant={getPriorityColor(ticket.priority)} className="shadow-sm">{ticket.priority}</Badge>
              <Badge className={getStatusColor(ticket.status) + " shadow-sm"}>{ticket.status}</Badge>
              <Badge variant="outline" className="capitalize border-slate-300">{ticket.category}</Badge>
            </div>
            <h3 className="text-slate-900">{ticket.customerName}</h3>
            <p className="text-slate-700">{ticket.subject}</p>
            <p className="text-slate-500">{ticket.notes}</p>
            <div className="flex items-center gap-4 text-slate-500 flex-wrap">
              <div className="flex items-center gap-1">
                <Clock className="size-4" />
                <span>Wait: {ticket.waitTime}m</span>
              </div>
              {ticket.assignedTo && (
                <div className="flex items-center gap-1">
                  <User className="size-4" />
                  <span>{ticket.assignedTo}</span>
                </div>
              )}
              <span className="capitalize">{ticket.channel}</span>
              <span>{formatDate(ticket.createdAt)}</span>
              {ticket.satisfactionScore && <span>⭐ {ticket.satisfactionScore}/5</span>}
            </div>
          </div>
          <div className="flex lg:flex-col gap-2">
            {ticket.status === 'open' && (
              <Button 
                className="flex-1 lg:flex-none shadow-sm"
                onClick={() => {
                  onAssign(ticket.id, `Agent ${Math.floor(Math.random() * 7) + 1}`);
                  toast.success('Ticket assigned');
                }}
              >
                Assign
              </Button>
            )}
            {ticket.status === 'in-progress' && (
              <Dialog open={showResolveDialog} onOpenChange={setShowResolveDialog}>
                <DialogTrigger asChild>
                  <Button className="flex-1 lg:flex-none shadow-sm">
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
                          className="shadow-sm"
                          onClick={() => setSatisfactionScore(score)}
                        >
                          {score}
                        </Button>
                      ))}
                    </div>
                    <Button className="w-full shadow-sm" onClick={handleResolve}>Confirm Resolution</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <Button 
              variant="outline" 
              size="icon"
              className="lg:w-full border-slate-300 hover:bg-red-50"
              onClick={handleDelete}
            >
              <Trash2 className="size-4 text-red-600" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
