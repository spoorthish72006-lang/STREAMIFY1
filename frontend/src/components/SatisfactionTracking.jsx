import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Smile, Meh, Frown, TrendingDown, TrendingUp, Star, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const satisfactionData = [
  { month: 'May', score: 88, target: 85 },
  { month: 'Jun', score: 86, target: 85 },
  { month: 'Jul', score: 84, target: 85 },
  { month: 'Aug', score: 82, target: 85 },
  { month: 'Sep', score: 78, target: 85 },
  { month: 'Oct', score: 76, target: 85 },
];

const categoryScores = [
  { category: 'Response Time', score: 72, previous: 85 },
  { category: 'Resolution Quality', score: 81, previous: 88 },
  { category: 'Agent Courtesy', score: 89, previous: 91 },
  { category: 'Follow-up', score: 68, previous: 80 },
  { category: 'Technical Support', score: 75, previous: 86 },
];

const sentimentData = [
  { type: 'Positive', count: 1245, percentage: 42, color: 'bg-green-500' },
  { type: 'Neutral', count: 892, percentage: 30, color: 'bg-yellow-500' },
  { type: 'Negative', count: 823, percentage: 28, color: 'bg-red-500' },
];

// Reusable Components
function CategoryScore({ item }) {
  const change = item.score - item.previous;
  const isNegative = change < 0;
  const colorClass = item.score < 75 ? 'bg-red-500' : item.score < 85 ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-slate-700">{item.category}</span>
        <div className="flex items-center gap-2">
          <span className="text-slate-900">{item.score}%</span>
          <Badge 
            variant="outline" 
            className={`${isNegative ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'} flex items-center gap-1`}
          >
            {isNegative ? <TrendingDown className="size-3" /> : <TrendingUp className="size-3" />}
            {Math.abs(change)}
          </Badge>
        </div>
      </div>
      <Progress value={item.score} className={`h-2 [&>div]:${colorClass}`} />
    </div>
  );
}

function SentimentItem({ item }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`size-3 rounded-full ${item.color}`} />
          <span className="text-slate-700">{item.type}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500">{item.count.toLocaleString()}</span>
          <span className="text-slate-900 w-12 text-right">{item.percentage}%</span>
        </div>
      </div>
      <Progress value={item.percentage} className={`h-2 [&>div]:${item.color}`} />
    </div>
  );
}

// Main Component
export function SatisfactionTracking() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
            <Star className="size-6 text-white" />
          </div>
          <div>
            <h2 className="bg-gradient-to-r from-purple-900 to-purple-600 bg-clip-text text-transparent">
              Satisfaction Tracking
            </h2>
            <p className="text-slate-600">Monitor customer satisfaction scores and trends</p>
          </div>
        </div>
        <Badge variant="destructive" className="flex items-center gap-2 px-4 py-2 shadow-lg shadow-red-500/20">
          <TrendingDown className="size-4" /> -12% This Quarter
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100/50 border-red-200 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-red-700">Current Score</p>
              <p className="text-red-900 mt-2">76%</p>
              <p className="text-red-600 mt-1 flex items-center gap-1">
                <TrendingDown className="size-4" /> Down from 88%
              </p>
            </div>
            <div className="p-3 bg-red-200 rounded-xl">
              <Frown className="size-6 text-red-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-amber-700">Target Score</p>
              <p className="text-amber-900 mt-2">85%</p>
              <p className="text-amber-600 mt-1">9 points gap</p>
            </div>
            <div className="p-3 bg-amber-200 rounded-xl">
              <Meh className="size-6 text-amber-700" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-700">Total Responses</p>
              <p className="text-blue-900 mt-2">2,960</p>
              <p className="text-blue-600 mt-1">This quarter</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-xl">
              <Star className="size-6 text-blue-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Satisfaction Trend Chart */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
        <div className="space-y-4">
          <div>
            <h3 className="text-slate-900">6-Month Satisfaction Trend</h3>
            <p className="text-slate-600">Tracking performance against target score</p>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={satisfactionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" domain={[70, 95]} />
                <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#dc2626" strokeWidth={3} name="Actual Score" dot={{ fill: '#dc2626', r: 5 }} />
                <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Target Score" dot={{ fill: '#10b981', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Category Scores & Sentiment */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
          <div className="space-y-4">
            <div>
              <h3 className="text-slate-900">Category Scores</h3>
              <p className="text-slate-600">Performance by service category</p>
            </div>
            <div className="space-y-4">
              {categoryScores.map((item) => <CategoryScore key={item.category} item={item} />)}
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 shadow-lg">
          <div className="space-y-4">
            <div>
              <h3 className="text-slate-900">Customer Sentiment</h3>
              <p className="text-slate-600">Feedback sentiment distribution</p>
            </div>
            <div className="space-y-4">
              {sentimentData.map((item) => <SentimentItem key={item.type} item={item} />)}
            </div>
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="size-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="text-amber-900">Action Required</p>
                  <p className="text-amber-700 mt-1">Negative sentiment has increased by 8% this month. Review recent ticket feedback for common issues.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
