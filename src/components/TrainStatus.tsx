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
    <Card className="bg-card border-border shadow-lg hover-lift transition-smooth">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Train className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-semibold">Active Train Operations</span>
          </div>
          <Badge variant="secondary" className="bg-signal-green/10 text-signal-green border-signal-green/20">
            {trains.length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {trains.map((train) => (
            <div
              key={train.id}
              className="group p-4 rounded-lg bg-control-panel border border-border hover:bg-accent/50 hover:border-accent transition-smooth cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getPriorityIcon(train.priority)}
                  <div>
                    <div className="font-mono font-bold text-sm text-foreground">
                      {train.id}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      {train.route}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(train.status)}>
                    {train.status.replace('-', ' ').toUpperCase()}
                    {train.delay > 0 && ` +${train.delay}min`}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3 text-primary" />
                    <span className="text-muted-foreground font-medium">{train.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-primary" />
                    <span className="text-muted-foreground">
                      {train.nextStation} @ <span className="font-mono font-semibold">{train.eta}</span>
                    </span>
                  </div>
                </div>
                
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="opacity-0 group-hover:opacity-100 transition-smooth text-xs h-7 px-3"
                >
                  Manage
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{trains.length}</span> trains in operation
              <span className="mx-2">•</span>
              <span className="font-medium text-signal-green">{trains.filter(t => t.status === 'on-time').length}</span> on-time
              <span className="mx-2">•</span>
              <span className="font-medium text-signal-red">{trains.filter(t => t.status === 'critical').length}</span> critical
            </div>
            <Button variant="outline" size="sm" className="transition-smooth hover-lift">
              View All Operations
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}