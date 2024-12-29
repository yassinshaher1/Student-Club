import { useState, useEffect } from 'react';
import { StatsCards } from './stats-cards';
import { ActivityChart } from './activity-chart';
import { EventDistributionChart } from './event-distribution-chart';
import { UserGrowthChart } from './user-growth-chart';
import { listUsers } from '@/lib/services/users';
import { listEvents } from '@/lib/services/events';
import { listRegistrations } from '@/lib/services/eventRegistrations';

export function Dashboard() {
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    activeEvents: 0,
    totalEvents: 0,
  });

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [users, events, registrations] = await Promise.all([
          listUsers(),
          listEvents(),
          listRegistrations(),
        ]);

        const activeEvents = events.filter(
          event => new Date(event.eventDate) > new Date()
        ).length;

        setStatsData({
          totalUsers: users.length,
          activeEvents,
          totalEvents: events.length,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
      <StatsCards data={statsData} />
      <div className="grid gap-6 md:grid-cols-2">
        <ActivityChart />
        <EventDistributionChart />
      </div>
      <UserGrowthChart />
    </div>
  );
} 