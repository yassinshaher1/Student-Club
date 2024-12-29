import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { chartStyles } from "@/components/charts/base-chart-components";
import { listEvents } from '@/lib/services/events';

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

export function EventDistributionChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchEventDistribution() {
      try {
        const events = await listEvents();
        const now = new Date();
        
        const distribution = events.reduce((acc, event) => {
          const eventDate = new Date(event.eventDate);
          if (eventDate > now) {
            acc.upcoming += 1;
          } else {
            acc.completed += 1;
          }
          return acc;
        }, { upcoming: 0, completed: 0 });

        setData([
          { name: "Upcoming Events", value: distribution.upcoming },
          { name: "Completed Events", value: distribution.completed },
        ]);
      } catch (error) {
        console.error('Failed to fetch event distribution:', error);
      }
    }

    fetchEventDistribution();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={chartStyles.tooltip.contentStyle} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 