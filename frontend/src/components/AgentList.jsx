import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { getInitials } from '../lib/utils';
import { Search, Mail, Phone, MoreHorizontal, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { agentsApi } from '../lib/api';
import { toast } from 'sonner';

export function AgentList() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const data = await agentsApi.getAgents();
      setAgents(data);
    } catch (error) {
        // Fallback mock data if API fails or is empty for demo
      console.error("Failed to fetch agents:", error);
      toast.error("Failed to load agents");
    } finally {
      setLoading(false);
    }
  };

  const filteredAgents = agents.filter(agent => 
    agent.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="shadow-md border-slate-200">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
           <div className="flex items-center justify-between">
            <CardTitle className="text-slate-900">Agents ({filteredAgents.length})</CardTitle>
            <div className="relative w-72">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                 <Input 
                    placeholder="Search agents..." 
                    className="pl-10 bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                 />
            </div>
           </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
             {loading ? (
                 <div className="p-8 text-center text-slate-500">Loading agents...</div>
             ) : filteredAgents.length === 0 ? (
                 <div className="p-8 text-center text-slate-500">No agents found</div>
             ) : (
                 filteredAgents.map(agent => (
                     <div key={agent._id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                             <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold overflow-hidden">
                                {agent.profilePic ? (
                                    <img src={agent.profilePic} alt={agent.fullName} className="w-full h-full object-cover" />
                                ) : (
                                    getInitials(agent.fullName)
                                )}
                             </div>
                             <div>
                                 <h4 className="font-medium text-slate-900">{agent.fullName}</h4>
                                 <div className="flex items-center gap-3 text-sm text-slate-500">
                                     <span className="flex items-center gap-1">
                                         <Mail className="size-3" /> {agent.email}
                                     </span>
                                     <span className="flex items-center gap-1">
                                         <User className="size-3" /> {agent.role}
                                     </span>
                                 </div>
                             </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Badge variant={agent.isOnboareded ? 'default' : 'secondary'} className="capitalize">
                                {agent.isOnboareded ? 'Active' : 'Pending'}
                            </Badge>
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="size-4 text-slate-400" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
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
