import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
}

const StatCard = ({ title, value, subtitle, icon: Icon, trend }: StatCardProps) => (
  <div className="stat-card-gradient rounded-xl border border-border p-5 flex items-start justify-between">
    <div>
      <p className="text-sm text-muted-foreground font-medium">{title}</p>
      <p className="text-3xl font-heading font-bold text-foreground mt-1">{value}</p>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      {trend && <p className="text-xs text-accent font-medium mt-1">{trend}</p>}
    </div>
    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
      <Icon className="w-5 h-5 text-primary" />
    </div>
  </div>
);

export default StatCard;
