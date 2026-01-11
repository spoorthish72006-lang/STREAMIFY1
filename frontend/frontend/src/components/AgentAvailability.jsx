import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import {
  Users,
  Coffee,
  Phone,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const agents = [
  { id: 1, name: 'Sarah Chen', status: 'available', calls: 12, avgTime: '4:32', satisfaction: 94, team: 'Accounts' },
  { id: 2, name: 'Michael Torres', status: 'on-call', calls: 8, avgTime: '6:15', satisfaction: 89, team: 'Technical' },
  { id: 3, name: 'Emily Watson', status: 'available', calls: 15, avgTime: '3:48', satisfaction: 96, team: 'Loans' },
  { id: 4, name: 'David Kim', status: 'break', calls: 10, avgTime: '5:20', satisfaction: 88, team: 'Cards' },
  { id: 5, name: 'Jessica Liu', status: 'on-call', calls: 9, avgTime: '4:55', satisfaction: 92, team: 'Accounts' },
  { id: 6, name: 'Robert Johnson', status: 'available', calls: 11, avgTime: '4:10', satisfaction: 90, team: 'Technical' },
  { id: 7, name: 'Amanda Martinez', status: 'offline', calls: 0, avgTime: '0:00', satisfaction: 0, team: 'Loans' },
  { id: 8, name: 'Chris Anderson', status: 'on-call', calls: 13, avgTime: '5:45', satisfaction: 87, team: 'Cards' },
];

const teamStats = [
  { team: 'Accounts', total: 8, available: 3, onCall: 2, satisfaction: 91 },
  { team: 'Technical', total: 6, available: 2, onCall: 3, satisfaction: 88 },
  { team: 'Loans', total: 5, available: 2, onCall: 1, satisfaction: 93 },
  { team: 'Cards', total: 5, available: 1, onCall: 2, satisfaction: 89 },
];

function getStatusColor(status) {
  switch (status) {
    case 'available':
      return 'bg-green-500';
    case 'on-call':
      return 'bg-blue-500';
    case 'break':
      return 'bg-yellow-500';
    case 'offline':
      return 'bg-slate-400';
    default:
      return 'bg-slate-400';
  }
}

function getStatusIcon(status) {
  switch (status) {
    case 'available':
      return <CheckCircle2 className="size-4" />;
    case 'on-call':
      return <Phone className="size-4" />;
    case 'break':
      return <Coffee className="size-4" />;
    case 'offline':
      return <XCircle className="size-4" />;
    default:
      return null;
  }
}

function getStatusBadge(status) {
  const variant =
    status === 'available'
      ? 'default'
      : status === 'on-call'
      ? 'secondary'
      : 'outline';

  const className =
    status === 'available'
      ? 'bg-green-100 text-green-700 border-green-200'
      : status === 'on-call'
      ? 'bg-blue-100 text-blue-700 border-blue-200'
      : status === 'break'
      ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
      : 'bg-slate-100 text-slate-600 border-slate-200';

  return (
    <Badge
      variant={variant}
      className={`${className} flex items-center gap-1 capitalize`}
    >
      {getStatusIcon(status)}
      {status}
    </Badge>
  );
}

export function AgentAvailability() {
  const availableCount = agents.filter(a => a.status === 'available').length;
  const onCallCount = agents.filter(a => a.status === 'on-call').length;
  const breakCount = agents.filter(a => a.status === 'break').length;
  const offlineCount = agents.filter(a => a.status === 'offline').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
          <Users className="size-6 text-white" />
        </div>
        <div>
          <h2 className="bg-gradient-to-r from-green-900 to-green-600 bg-clip-text text-transparent">
            Agent Availability
          </h2>
          <p className="text-slate-600">
            Real-time agent status and performance monitoring
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 border-green-200 shadow-lg">
          <p className="text-green-700">Available</p>
          <p className="text-green-900 mt-2">{availableCount}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200 shadow-lg">
          <p className="text-blue-700">On Call</p>
          <p className="text-blue-900 mt-2">{onCallCount}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-yellow-200 shadow-lg">
          <p className="text-yellow-700">On Break</p>
          <p className="text-yellow-900 mt-2">{breakCount}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100/50 border-slate-200 shadow-lg">
          <p className="text-slate-700">Offline</p>
          <p className="text-slate-900 mt-2">{offlineCount}</p>
        </Card>
      </div>

      {/* Team Performance */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {teamStats.map(team => (
            <div key={team.team} className="p-4 border rounded-lg bg-slate-50/50">
              <h4>{team.team}</h4>
              <Progress value={team.satisfaction} className="h-2 mt-2" />
            </div>
          ))}
        </div>
      </Card>

      {/* Agent List */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
        {agents.map(agent => (
          <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>
                  {agent.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p>{agent.name}</p>
                {getStatusBadge(agent.status)}
              </div>
            </div>
            <span>{agent.satisfaction}%</span>
          </div>
        ))}
      </Card>
    </div>
  );
}
