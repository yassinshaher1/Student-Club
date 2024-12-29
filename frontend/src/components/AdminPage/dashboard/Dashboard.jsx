import { StatsCards } from './stats-cards';
import { ActivityChart } from './activity-chart';
import { EventDistributionChart } from './event-distribution-chart';
import { UserGrowthChart } from './user-growth-chart';

export function Dashboard() {
  const statsData = {
    totalUsers: 156,
    activeEvents: 12,
    totalEvents: 25,
  };

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