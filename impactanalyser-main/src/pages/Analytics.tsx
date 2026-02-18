import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from "recharts";
import { skillMetrics, societies } from "@/lib/mockData";

const Analytics = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-2xl font-heading font-bold text-foreground">Analytics</h1>
      <p className="text-sm text-muted-foreground mt-1">In-depth analysis of engagement and skill development</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">Skill Development (Before vs After)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={skillMetrics} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 16%, 90%)" />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
            <YAxis dataKey="skill" type="category" tick={{ fontSize: 12 }} width={110} />
            <Tooltip />
            <Legend />
            <Bar dataKey="before" fill="hsl(210, 16%, 80%)" name="Before" radius={[0, 4, 4, 0]} />
            <Bar dataKey="after" fill="hsl(192, 70%, 42%)" name="After" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">Society Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={societies.map(s => ({ subject: s.name, members: s.members, events: s.events * 10, impact: s.avgImpact * 10 }))}>
            <PolarGrid stroke="hsl(210, 16%, 90%)" />
            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis tick={{ fontSize: 10 }} />
            <Legend />
            <Radar name="Members" dataKey="members" stroke="hsl(192, 70%, 42%)" fill="hsl(192, 70%, 42%)" fillOpacity={0.2} />
            <Radar name="Impact" dataKey="impact" stroke="hsl(168, 55%, 45%)" fill="hsl(168, 55%, 45%)" fillOpacity={0.2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {societies.map((s) => (
        <div key={s.id} className="bg-card rounded-xl border border-border p-5 text-center">
          <h4 className="font-heading font-bold text-lg text-foreground">{s.name}</h4>
          <p className="text-3xl font-heading font-bold text-primary mt-2">{s.avgImpact}</p>
          <p className="text-xs text-muted-foreground mt-1">Avg Impact Score</p>
          <div className="mt-3 flex justify-center gap-4 text-xs text-muted-foreground">
            <span>{s.members} members</span>
            <span>{s.events} events</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Analytics;
