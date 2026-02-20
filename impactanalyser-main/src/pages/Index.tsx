import { Users, Calendar, Award, TrendingUp } from "lucide-react";
import StatCard from "@/components/StatCard";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [summary, setSummary] = useState<any>(null);
  const [topStudents, setTopStudents] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDashboard = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:5000/api/analytics/dashboard-summary",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        setSummary(data);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    const fetchTopStudents = async () => {
      try {
        const res = await fetch(
          "http://127.0.0.1:5000/api/analytics/top-students",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        setTopStudents(data);
      } catch (error) {
        console.error("Top students error:", error);
      }
    };

    fetchDashboard();
    fetchTopStudents();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of professional society activities and impact
        </p>
      </div>

      {/* ---- STATS ---- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Students" value={summary?.total_students || 0} icon={Users} />
        <StatCard title="Total Events" value={summary?.total_events || 0} icon={Calendar} />
        <StatCard title="Top Student Score" value={summary?.top_student_score || 0} icon={Award} />
        <StatCard title="Total Participations" value={summary?.total_attended_participations || 0} icon={TrendingUp} />
      </div>

      {/* ---- TOP STUDENTS ---- */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-heading font-semibold text-foreground mb-4">
          Top 3 Students
        </h3>

        {topStudents.length === 0 ? (
          <p className="text-muted-foreground text-sm">No data available</p>
        ) : (
          <div className="space-y-3">
            {topStudents.map((student, index) => (
              <div
                key={student.student_id}
                className="flex justify-between items-center p-4 rounded-lg bg-muted/50"
              >
                <div>
                  <p className="font-semibold text-foreground">
                    #{index + 1} {student.name}
                  </p>
                </div>
                <div className="text-accent font-bold text-lg">
                  {student.impact_score}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
