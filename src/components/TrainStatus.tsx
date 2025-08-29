import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Train, MapPin, Clock, AlertCircle } from "lucide-react";

const trains = [
  {
    id: "IC-2501",
    route: "London → Manchester",
    status: "on-time",
    delay: 0,
    location: "Mile 127.3",
    nextStation: "Birmingham New Street",
    eta: "14:23",
    priority: "high"
  },
  {
    id: "FR-8842",
    route: "Manchester → Liverpool",
    status: "delayed",
    delay: 8,
    location: "Mile 89.7",
    nextStation: "Warrington Central",
    eta: "14:31",
    priority: "medium"
  },
  {
    id: "LC-5603",
    route: "Liverpool → London",
    status: "on-time",
    delay: 0,
    location: "Mile 203.1",
    nextStation: "Crewe",
    eta: "15:07",
    priority: "high"
  },
  {
    id: "EX-1247",
    route: "Birmingham → Cardiff",
    status: "critical",
    delay: 15,
    location: "Mile 45.2",
    nextStation: "Newport",
    eta: "14:45",
    priority: "critical"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "on-time":
      return "bg-signal-green text-signal-green-foreground";
    case "delayed":
      return "bg-signal-amber text-signal-amber-foreground";
    case "critical":
      return "bg-signal-red text-signal-red-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "critical":
      return <AlertCircle className="h-4 w-4 text-signal-red animate-pulse-signal" />;
    case "high":
      return <AlertCircle className="h-4 w-4 text-signal-amber" />;
    default:
      return <Train className="h-4 w-4 text-muted-foreground" />;
  }
};

export function TrainStatus() {
  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Train className="h-5 w-5 text-primary" />
          <span>Active Train Operations</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trains.map((train) => (
            <div
              key={train.id}
              className="flex items-center justify-between p-4 rounded-lg bg-control-panel border border-border hover:bg-accent transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {getPriorityIcon(train.priority)}
                  <div>
                    <div className="font-mono font-bold text-sm text-foreground">
                      {train.id}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {train.route}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-xs">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{train.location}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-xs">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Next: {train.nextStation} @ {train.eta}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Badge className={getStatusColor(train.status)}>
                  {train.status.toUpperCase()}
                  {train.delay > 0 && ` +${train.delay}min`}
                </Badge>
                
                <Button size="sm" variant="outline" className="text-xs">
                  Manage
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Active: {trains.length} trains</span>
            <Button variant="outline" size="sm">
              View All Operations
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}