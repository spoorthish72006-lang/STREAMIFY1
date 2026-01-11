import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { callVolumeData, satisfactionData } from '../lib/mockData'; // Keeping for charts until backend sends time-series
import { useTickets } from '../contexts/TicketContext';
import { metricsApi } from '../lib/api';
import { TrendingDown } from 'lucide-react';

export function AnalyticsDashboard() {
  const { tickets } = useTickets();
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await metricsApi.getMetrics();
        setMetrics(data);
      } catch (err) {
        console.error("Failed to fetch metrics", err);
      }
    };
    fetchMetrics();
  }, []);

  const analytics = useMemo(() => {
    // If we have API metrics, we could use them here, but for now maintaining local calculation based on tickets context
    // or hybrid approach. 

    // Category breakdown
    const categoryBreakdown = tickets.reduce((acc, ticket) => {
      acc[ticket.category] = (acc[ticket.category] || 0) + 1;
      return acc;
    }, {});

    const categoryData = Object.entries(categoryBreakdown).map(
      ([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        tickets: value
      })
    );

    // Channel breakdown
    const channelBreakdown = tickets.reduce((acc, ticket) => {
      acc[ticket.channel] = (acc[ticket.channel] || 0) + 1;
      return acc;
    }, {});

    const channelData = Object.entries(channelBreakdown).map(
      ([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        tickets: value
      })
    );

    // Resolution metrics
    const resolvedTickets = tickets.filter(t => t.resolutionTime);
    const avgResolutionTime =
      resolvedTickets.length > 0
        ? Math.round(
            resolvedTickets.reduce(
              (acc, t) => acc + (t.resolutionTime || 0),
              0
            ) / resolvedTickets.length
          )
        : 0;

    // Most common category
    const mostCommonCategory = Object.entries(categoryBreakdown).sort(
      ([, a], [, b]) => b - a
    )[0];

    return {
      categoryData,
      channelData,
      avgResolutionTime: metrics?.avgResolutionTime || avgResolutionTime, // Prefer API if available
      mostCommonCategory: mostCommonCategory
        ? { name: mostCommonCategory[0], count: mostCommonCategory[1] }
        : { name: 'N/A', count: 0 }
    };
  }, [tickets, metrics]);

  return (
    <div className="space-y-6">
      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-md">
          <CardHeader>
            <CardTitle className="text-slate-600">
              Avg Resolution Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-blue-600">
              {analytics.avgResolutionTime} minutes
            </div>
            <p className="text-slate-500 mt-1">For resolved tickets</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white shadow-md">
          <CardHeader>
            <CardTitle className="text-slate-600">
              Call Volume Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingDown className="size-5 text-green-600" />
              <span className="text-green-600">-12% vs last week</span>
            </div>
            <p className="text-slate-500 mt-1">Decreasing trend</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white shadow-md">
          <CardHeader>
            <CardTitle className="text-slate-600">
              Most Common Issue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-900 capitalize">
              {analytics.mostCommonCategory.name}
            </div>
            <p className="text-slate-500 mt-1">
              {analytics.mostCommonCategory.count} tickets
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Call Volume Trend */}
      <Card className="shadow-md border-slate-200">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <CardTitle>
            Call Volume & Wait Time Trend (Last 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={callVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" />
              <YAxis yAxisId="left" stroke="#64748b" />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#64748b"
              />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="calls"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Call Volume"
                dot={{ fill: '#3b82f6', r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="avgWaitTime"
                stroke="#f59e0b"
                strokeWidth={3}
                name="Avg Wait Time (min)"
                dot={{ fill: '#f59e0b', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Customer Satisfaction Trend */}
      <Card className="shadow-md border-slate-200">
        <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
          <div className="flex items-center justify-between">
            <CardTitle>
              Customer Satisfaction Trend (6 Months)
            </CardTitle>
            <div className="flex items-center gap-2 text-red-600">
              <TrendingDown className="size-4" />
              <span>-12% from Q2</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={satisfactionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis domain={[0, 5]} stroke="#64748b" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#ef4444"
                strokeWidth={3}
                name="Satisfaction Score"
                dot={{ fill: '#ef4444', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category & Channel Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md border-slate-200">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
            <CardTitle>Tickets by Category</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar
                  dataKey="tickets"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md border-slate-200">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100">
            <CardTitle>Tickets by Channel</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.channelData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar
                  dataKey="tickets"
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
