import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Activity, Phone, Globe, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const liveCallData = [
  { time: '09:00', calls: 45, waiting: 8 },
  { time: '10:00', calls: 62, waiting: 12 },
  { time: '11:00', calls: 71, waiting: 15 },
  { time: '12:00', calls: 58, waiting: 9 },
  { time: '13:00', calls: 52, waiting: 6 },
  { time: '14:00', calls: 68, waiting: 11 },
  { time: '15:00', calls: 74, waiting: 14 },
];

const activeCalls = [
  { id: 'C-2847', customer: 'John Smith', agent: 'Sarah Chen', duration: '04:32', topic: 'Account Balance', priority: 'medium' },
  { id: 'C-2848', customer: 'Maria Garcia', agent: 'Michael Torres', duration: '12:45', topic: 'Card Declined', priority: 'high' },
  { id: 'C-2849', customer: 'Robert Lee', agent: 'Emily Watson', duration: '02:18', topic: 'Wire Transfer', priority: 'high' },
  { id: 'C-2850', customer: 'Lisa Brown', agent: 'Jessica Liu', duration: '08:56', topic: 'Mobile App', priority: 'low' },
  { id: 'C-2851', customer: 'David Wilson', agent: 'Chris Anderson', duration: '15:22', topic: 'Fraud Alert', priority: 'high' },
];

const waitingQueue = [
  { id: 'W-102', customer: 'Jennifer Taylor', waitTime: '03:45', topic: 'Loan Inquiry', priority: 'medium' },
  { id: 'W-103', customer: 'Kevin Martinez', waitTime: '02:12', topic: 'Password Reset', priority: 'low' },
  { id: 'W-104', customer: 'Susan Anderson', waitTime: '06:33', topic: 'Dispute Charge', priority: 'high' },
];

const webSessions = [
  { page: 'Account Dashboard', users: 342, avgTime: '3:24' },
  { page: 'Transfer Funds', users: 156, avgTime: '2:18' },
  { page: 'Bill Pay', users: 98, avgTime: '4:52' },
  { page: 'Help Center', users: 234, avgTime: '5:15' },
  { page: 'Contact Support', users: 67, avgTime: '1:45' },
];

function getPriorityColor(priority) {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-700 border-red-200';
    case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'low': return 'bg-green-100 text-green-700 border-green-200';
    default: return 'bg-slate-100 text-slate-600 border-slate-200';
  }
}

// Reusable Components
function CallCard({ call }) {
  return (
    <div className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-white transition-colors">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-slate-900">{call.customer}</span>
            <Badge variant="outline" className={getPriorityColor(call.priority)}>{call.priority}</Badge>
          </div>
          <p className="text-slate-600">{call.topic}</p>
          <p className="text-slate-500">Agent: {call.agent}</p>
        </div>
        <div className="text-right">
          <p className="text-slate-500">ID: {call.id}</p>
          <Badge className="mt-2 bg-blue-500">{call.duration}</Badge>
        </div>
      </div>
    </div>
  );
}

function QueueItem({ item }) {
  return (
    <div className="p-4 border border-amber-200 rounded-lg bg-amber-50/50 hover:bg-amber-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-slate-900">{item.customer}</span>
            <Badge variant="outline" className={getPriorityColor(item.priority)}>{item.priority}</Badge>
          </div>
          <p className="text-slate-600">{item.topic}</p>
        </div>
        <div className="text-right">
          <p className="text-slate-500">ID: {item.id}</p>
          <Badge variant="outline" className="mt-2 border-amber-300 text-amber-700">
            <Clock className="size-3 mr-1" /> {item.waitTime}
          </Badge>
        </div>
      </div>
    </div>
  );
}

function WebSessionCard({ session }) {
  return (
    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Globe className="size-5 text-purple-600" />
        </div>
        <div>
          <p className="text-slate-900">{session.page}</p>
          <p className="text-slate-600 mt-1">{session.users} active users</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-slate-600">Avg Time</p>
          <p className="text-slate-900 mt-1">{session.avgTime}</p>
        </div>
        <Progress value={(session.users / 400) * 100} className="h-2 w-32 [&>div]:bg-purple-500" />
      </div>
    </div>
  );
}

// Main Component
export function LiveMonitoring() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
          <Activity className="size-6 text-white" />
        </div>
        <div>
          <h2 className="bg-gradient-to-r from-emerald-900 to-emerald-600 bg-clip-text text-transparent">
            Live Monitoring
          </h2>
          <p className="text-slate-600">Real-time call status and web activity tracking</p>
        </div>
      </div>

      {/* Live Stats */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700">Active Calls</p>
              <p className="text-blue-900 mt-2">{activeCalls.length}</p>
              <p className="text-blue-600 mt-1">In progress</p>
            </div>
            <div className="size-12 rounded-full bg-blue-500 flex items-center justify-center animate-pulse">
              <Phone className="size-6 text-white" />
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-700">In Queue</p>
              <p className="text-amber-900 mt-2">{waitingQueue.length}</p>
              <p className="text-amber-600 mt-1">Waiting</p>
            </div>
            <div className="size-12 rounded-full bg-amber-500 flex items-center justify-center">
              <Clock className="size-6 text-white" />
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-700">Web Sessions</p>
              <p className="text-purple-900 mt-2">897</p>
              <p className="text-purple-600 mt-1">Active now</p>
            </div>
            <div className="size-12 rounded-full bg-purple-500 flex items-center justify-center">
              <Globe className="size-6 text-white" />
            </div>
          </div>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 border-green-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700">Avg Wait Time</p>
              <p className="text-green-900 mt-2">4:10</p>
              <p className="text-green-600 mt-1 flex items-center gap-1">
                <TrendingUp className="size-4" /> Improving
              </p>
            </div>
            <div className="size-12 rounded-full bg-green-500 flex items-center justify-center">
              <Activity className="size-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Call Volume Chart */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
        <div className="space-y-4">
          <div>
            <h3 className="text-slate-900">Live Call Status</h3>
            <p className="text-slate-600">Real-time call volume and queue length</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={liveCallData}>
                <defs>
                  <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorWaiting" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Area type="monotone" dataKey="calls" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCalls)" name="Active Calls" />
                <Area type="monotone" dataKey="waiting" stroke="#f59e0b" fillOpacity={1} fill="url(#colorWaiting)" name="In Queue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Active Calls & Queue */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-900">Active Calls</h3>
                <p className="text-slate-600">Currently in progress</p>
              </div>
              <Badge className="bg-blue-100 text-blue-700">{activeCalls.length} active</Badge>
            </div>
            <div className="space-y-3">
              {activeCalls.map((call) => <CallCard key={call.id} call={call} />)}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-slate-900">Waiting Queue</h3>
                <p className="text-slate-600">Customers waiting for support</p>
              </div>
              <Badge className="bg-amber-100 text-amber-700">{waitingQueue.length} waiting</Badge>
            </div>
            <div className="space-y-3">
              {waitingQueue.map((item) => <QueueItem key={item.id} item={item} />)}
              {waitingQueue.some((i) => i.priority === 'high') && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="size-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-red-900">High Wait Time Alert</p>
                    <p className="text-red-700 mt-1">1 customer has been waiting over 6 minutes. Consider reassigning agents.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Web Activity */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
        <div className="space-y-4">
          <div>
            <h3 className="text-slate-900">Web-Live Monitoring</h3>
            <p className="text-slate-600">Current online banking activity</p>
          </div>
          <div className="space-y-3">
            {webSessions.map((session) => <WebSessionCard key={session.page} session={session} />)}
          </div>
        </div>
      </Card>
    </div>
  );
}
