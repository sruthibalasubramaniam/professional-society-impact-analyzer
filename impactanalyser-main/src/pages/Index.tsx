import { Users, Calendar, Award, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import StatCard from "@/components/StatCard";
import { monthlyParticipation, eventTypes, events } from "@/lib/mockData";

const COLORS = [
  "hsl(192, 70%, 42%)",
  "hsl(168, 55%, 45%)",
  "hsl(38, 92%, 55%)",
  "hsl(262, 52%, 55%)",
];

const Dashboard = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
      <p className="text-sm text-muted-foreground mt-1">Overview of professional society activities and impact</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Students" value={448} icon={Users} trend="+12% this sem" />
      <StatCard title="Events Held" value={39} icon={Calendar} trend="+5 this month" />
      <StatCard title="Avg Impact Score" value="8.1" icon={Award} subtitle="Out of 10" />
      <StatCard title="Engagement Rate" value="76%" icon={TrendingUp} trend="+8% growth" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">Monthly Participation</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyParticipation}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 16%, 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="IEEE" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
            <Bar dataKey="ACM" fill={COLORS[1]} radius={[4, 4, 0, 0]} />
            <Bar dataKey="CSI" fill={COLORS[2]} radius={[4, 4, 0, 0]} />
            <Bar dataKey="ISTE" fill={COLORS[3]} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">Event Distribution</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={eventTypes} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value">
              {eventTypes.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend iconType="circle" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-heading font-semibold text-foreground mb-4">Recent Events</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Event</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Society</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Type</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Participants</th>
              <th className="text-left py-3 px-4 text-muted-foreground font-medium">Impact</th>
            </tr>
          </thead>
          <tbody>
            {events.slice(0, 5).map((event) => (
              <tr key={event.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4 font-medium text-foreground">{event.name}</td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">{event.society}</span>
                </td>
                <td className="py-3 px-4 text-muted-foreground">{event.type}</td>
                <td className="py-3 px-4 text-foreground">{event.participants}</td>
                <td className="py-3 px-4">
                  <span className={`font-semibold ${event.impactScore >= 8 ? "text-accent" : "text-muted-foreground"}`}>
                    {event.impactScore}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Dashboard;
