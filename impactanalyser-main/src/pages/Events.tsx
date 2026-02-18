import { events } from "@/lib/mockData";
import { Calendar, Users, Star } from "lucide-react";

const Events = () => (
  <div className="space-y-8">
    <div>
      <h1 className="text-2xl font-heading font-bold text-foreground">Events</h1>
      <p className="text-sm text-muted-foreground mt-1">All professional society events and activities</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {events.map((event) => (
        <div key={event.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">{event.society}</span>
            <span className="text-xs text-muted-foreground">{event.type}</span>
          </div>
          <h3 className="font-heading font-semibold text-foreground text-lg">{event.name}</h3>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" /> {event.date}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-3.5 h-3.5" /> {event.participants} participants
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-3.5 h-3.5" /> Feedback: {event.feedback}/5
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Impact Score</span>
            <span className={`text-lg font-heading font-bold ${event.impactScore >= 8 ? "text-accent" : "text-primary"}`}>
              {event.impactScore}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Events;
