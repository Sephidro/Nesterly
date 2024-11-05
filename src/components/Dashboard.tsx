import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats, fetchLeads, fetchEngagementData } from '../lib/api';
import { BarChart, Users, Clock, TrendingUp } from 'lucide-react';
import LeadTable from './LeadTable';
import EngagementChart from './EngagementChart';

export function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats
  });

  const { data: leads, isLoading: leadsLoading } = useQuery({
    queryKey: ['leads'],
    queryFn: fetchLeads
  });

  const { data: engagementData, isLoading: engagementLoading } = useQuery({
    queryKey: ['engagement'],
    queryFn: fetchEngagementData
  });

  const displayStats = [
    {
      label: 'Total Leads',
      value: stats?.totalLeads || 0,
      icon: Users,
      color: 'text-blue-500'
    },
    {
      label: 'Active Leads',
      value: stats?.activeLeads || 0,
      icon: BarChart,
      color: 'text-green-500'
    },
    {
      label: 'Conversion Rate',
      value: `${stats?.conversionRate || 0}%`,
      icon: TrendingUp,
      color: 'text-purple-500'
    },
    {
      label: 'Avg Response Time',
      value: stats?.averageResponseTime || '0',
      icon: Clock,
      color: 'text-orange-500'
    }
  ];

  if (statsLoading || leadsLoading || engagementLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4"
          >
            <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Engagement Overview</h2>
          <div className="h-80">
            <EngagementChart data={engagementData || []} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Leads</h2>
          <LeadTable leads={leads || []} />
        </div>
      </div>
    </div>
  );
}