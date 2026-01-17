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
    title: '',
    category: 'general',
    priority: 'medium',
    channel: 'phone',
    description: ''
  });

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch =
      (ticket.customerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ticket.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ticket.id || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateTicket = () => {
    if (!formData.customerName || !formData.title) {
      toast.error('Please fill in required fields');
      return;
    }

    addTicket({
      customerId: formData.customerId || `CUST-${Math.floor(Math.random() * 9999)}`,
      customerName: formData.customerName,
      title: formData.title,
      category: formData.category,
      priority: formData.priority,
      channel: formData.channel,
      description: formData.description,
      status: 'open'
    });

    setFormData({
      customerName: '',
      customerId: '',
      title: '',
      category: 'general',
      priority: 'medium',
      channel: 'phone',
      description: ''
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
      case 'closed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'waiting': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters & New Ticket */}
      <Card className="shadow-md border-slate-200">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-900">All Tickets ({filteredTickets.length})</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="shadow-sm text-slate-900">
                  <Plus className="size-4 mr-2" />
                  New Ticket
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-slate-900">Create New Ticket</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label className="text-slate-700">Customer Name *</Label>
                    <Input
                      placeholder="Enter customer name"
                      className="mt-1 text-slate-900 placeholder:text-slate-400"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-700">Customer ID</Label>
                    <Input
                      placeholder="Auto-generated if empty"
                      className="mt-1 text-slate-900 placeholder:text-slate-400"
                      value={formData.customerId}
                      onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-700">Subject *</Label>
                    <Input
                      placeholder="Brief description of the issue"
                      className="mt-1 text-slate-900 placeholder:text-slate-400"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-700">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger className="mt-1 text-slate-900">
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
                      <Label className="text-slate-700">Priority</Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value) => setFormData({ ...formData, priority: value })}
                      >
                        <SelectTrigger className="mt-1 text-slate-900">
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
                    <Label className="text-slate-700">Channel</Label>
                    <Select
                      value={formData.channel}
                      onValueChange={(value) => setFormData({ ...formData, channel: value })}
                    >
                      <SelectTrigger className="mt-1 text-slate-900">
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
                    <Label className="text-slate-700">Notes/Description</Label>
                    <Textarea
                      placeholder="Additional details"
                      className="mt-1 text-slate-900 placeholder:text-slate-400"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <Button className="w-full text-slate-900" onClick={handleCreateTicket}>
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

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this ticket?')) {
      onDelete(ticket.id);
      toast.success('Ticket deleted');
    }
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
                    {ticket.assignedTo && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-600 bg-blue-50 px-2 py-0.5 rounded-full">
                          <User className="size-3.5" />
                          {typeof ticket.assignedTo === 'object' ? ticket.assignedTo.name : ticket.assignedTo}
                        </span>
                      </>
                    )}
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
            {ticket.status === 'open' && (
              <Button 
                variant="outline"
                size="sm"
                className="flex-1 lg:flex-none shadow-sm text-slate-700 hover:text-blue-700 hover:border-blue-200 hover:bg-blue-50"
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
