import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { PhoneCall, TrendingUp, TrendingDown, Clock, Users, Calendar } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';

const dailyCallVolume = [
  { day: 'Mon', incoming: 245, handled: 232, missed: 13 },
  { day: 'Tue', incoming: 268, handled: 251, missed: 17 },
  { day: 'Wed', incoming: 291, handled: 275, missed: 16 },
  { day: 'Thu', incoming: 312, handled: 298, missed: 14 },
  { day: 'Fri', incoming: 334, handled: 310, missed: 24 },
  { day: 'Sat', incoming: 189, handled: 181, missed: 8 },
  { day: 'Sun', incoming: 156, handled: 149, missed: 7 },
];

const hourlyDistribution = [
  { hour: '8AM', calls: 45 },
  { hour: '9AM', calls: 78 },
  { hour: '10AM', calls: 92 },
  { hour: '11AM', calls: 105 },
  { hour: '12PM', calls: 88 },
  { hour: '1PM', calls: 72 },
  { hour: '2PM', calls: 95 },
  { hour: '3PM', calls: 112 },
  { hour: '4PM', calls: 98 },
  { hour: '5PM', calls: 68 },
];

const callTypeDistribution = [
  { name: 'Account Inquiries', value: 425, color: '#3b82f6' },
  { name: 'Technical Support', value: 312, color: '#8b5cf6' },
  { name: 'Fraud/Security', value: 198, color: '#ef4444' },
  { name: 'Card Services', value: 267, color: '#10b981' },
  { name: 'Loan Questions', value: 156, color: '#f59e0b' },
  { name: 'Other', value: 89, color: '#64748b' },
];

const performanceMetrics = [
  { metric: 'Average Handle Time', value: '5:32', change: -8, target: '6:00' },
  { metric: 'First Call Resolution', value: '76%', change: -4, target: '85%' },
  { metric: 'Service Level (30s)', value: '82%', change: 3, target: '90%' },
  { metric: 'Abandonment Rate', value: '8.2%', change: 12, target: '5%' },
];

const historicalData = [
  { month: 'May', volume: 5234, satisfaction: 88 },
  { month: 'Jun', volume: 5678, satisfaction: 86 },
  { month: 'Jul', volume: 6012, satisfaction: 84 },
  { month: 'Aug', volume: 6345, satisfaction: 82 },
  { month: 'Sep', volume: 6789, satisfaction: 78 },
  { month: 'Oct', volume: 7123, satisfaction: 76 },
];

export function CallVolumeOverview() {
  const totalCalls = dailyCallVolume.reduce((sum, day) => sum + day.incoming, 0);
  const totalHandled = dailyCallVolume.reduce((sum, day) => sum + day.handled, 0);
  const totalMissed = dailyCallVolume.reduce((sum, day) => sum + day.missed, 0);
  const handleRate = ((totalHandled / totalCalls) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg">
          <PhoneCall className="size-6 text-white" />
        </div>
        <div>
          <h2 className="bg-gradient-to-r from-indigo-900 to-indigo-600 bg-clip-text text-transparent">Call Volume Overview</h2>
          <p className="text-slate-600">Comprehensive call analytics and historical trends</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700">Total Calls</p>
              <p className="text-blue-900 mt-2">{totalCalls.toLocaleString()}</p>
              <p className="text-blue-600 mt-1 flex items-center gap-1">
                <TrendingUp className="size-4" />
                +12% vs last week
              </p>
            </div>
            <div className="size-12 rounded-full bg-blue-500 flex items-center justify-center">
              <PhoneCall className="size-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 border-green-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700">Handled</p>
              <p className="text-green-900 mt-2">{totalHandled.toLocaleString()}</p>
              <p className="text-green-600 mt-1">{handleRate}% success rate</p>
            </div>
            <div className="size-12 rounded-full bg-green-500 flex items-center justify-center">
              <Users className="size-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100/50 border-red-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-700">Missed</p>
              <p className="text-red-900 mt-2">{totalMissed}</p>
              <p className="text-red-600 mt-1 flex items-center gap-1">
                <TrendingUp className="size-4" />
                +18% increase
              </p>
            </div>
            <div className="size-12 rounded-full bg-red-500 flex items-center justify-center">
              <TrendingDown className="size-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-700">Avg Duration</p>
              <p className="text-purple-900 mt-2">5:32</p>
              <p className="text-purple-600 mt-1 flex items-center gap-1">
                <TrendingDown className="size-4" />
                8% improvement
              </p>
            </div>
            <div className="size-12 rounded-full bg-purple-500 flex items-center justify-center">
              <Clock className="size-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Daily Volume Chart */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
        <div className="space-y-4">
          <div>
            <h3 className="text-slate-900">Daily Call Volume</h3>
            <p className="text-slate-600">7-day call activity breakdown</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyCallVolume}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Legend />
                <Bar dataKey="handled" fill="#10b981" name="Handled" radius={[8, 8, 0, 0]} />
                <Bar dataKey="missed" fill="#ef4444" name="Missed" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Hourly and Type Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hourly Distribution */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
          <div className="space-y-4">
            <div>
              <h3 className="text-slate-900">Hourly Distribution</h3>
              <p className="text-slate-600">Peak call times today</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="hour" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }} 
                  />
                  <Line type="monotone" dataKey="calls" stroke="#6366f1" strokeWidth={3} dot={{ fill: '#6366f1', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>

        {/* Call Type Distribution */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
          <div className="space-y-4">
            <div>
              <h3 className="text-slate-900">Call Type Distribution</h3>
              <p className="text-slate-600">Breakdown by category</p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={callTypeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {callTypeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
