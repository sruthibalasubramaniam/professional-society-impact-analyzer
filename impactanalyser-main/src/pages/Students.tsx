import { students } from "@/lib/mockData";

const Students = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-2xl font-heading font-bold text-foreground">Students</h1>
      <p className="text-sm text-muted-foreground mt-1">Student participation and impact tracking</p>
    </div>

    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="text-left py-3 px-5 text-muted-foreground font-medium">Name</th>
            <th className="text-left py-3 px-5 text-muted-foreground font-medium">Reg No</th>
            <th className="text-left py-3 px-5 text-muted-foreground font-medium">Society</th>
            <th className="text-left py-3 px-5 text-muted-foreground font-medium">Events</th>
            <th className="text-left py-3 px-5 text-muted-foreground font-medium">Impact Score</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
              <td className="py-3.5 px-5 font-medium text-foreground">{s.name}</td>
              <td className="py-3.5 px-5 text-muted-foreground font-mono text-xs">{s.regNo}</td>
              <td className="py-3.5 px-5">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">{s.society}</span>
              </td>
              <td className="py-3.5 px-5 text-foreground">{s.events}</td>
              <td className="py-3.5 px-5">
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${s.impactScore * 10}%` }} />
                  </div>
                  <span className="font-semibold text-foreground">{s.impactScore}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Students;
