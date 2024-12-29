import { useState, useEffect } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listEvents } from '@/lib/services/events';

export function ActivityChart() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchEventActivity() {
      try {
        const events = await listEvents();
        const monthlyData = events.reduce((acc, event) => {
          const month = new Date(event.eventDate).toLocaleString('default', { month: 'short' });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {});

        const data = Object.entries(monthlyData).map(([name, events]) => ({
          name,
          events
        }));

        setChartData(data);
      } catch (error) {
        console.error('Failed to fetch event activity:', error);
      }
    }

    fetchEventActivity();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Activity</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Line
              type="monotone"
              dataKey="events"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
            <Tooltip 
              contentStyle={{
                background: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 