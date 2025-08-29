import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Route, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Train,
  Zap,
  RefreshCw
} from "lucide-react";

const networkSections = [
  {
    id: "SEC-A1",
    name: "London-Birmingham Corridor",
    status: "active",
    trains: 8,
    conflicts: 1,
    capacity: 85
  },
  {
    id: "SEC-B2", 
    name: "Manchester Junction",
    status: "congested",
    trains: 12,
    conflicts: 3,
    capacity: 92
  },
  {
    id: "SEC-C3",
    name: "Liverpool Terminal",
    status: "optimal",
    trains: 5,
    conflicts: 0,
    capacity: 67
  }
];

const activeConflicts = [
  {
    id: "CONF-001",
    priority: "high",
    trains: ["IC-2501", "FR-8842"],
    location: "Junction B - Mile 127.3",
    type: "crossing",
    eta: "14:28",
    recommendation: "Grant precedence to IC-2501 (passenger priority)",
    impact: "7min delay reduction",
    confidence: 94
  },
  {
    id: "CONF-002", 
    priority: "medium",
    trains: ["EX-1247", "LC-5603"],
    location: "Platform 2 - Birmingham",
    type: "platform",
    eta: "14:35",
    recommendation: "Reroute EX-1247 to Platform 4",
    impact: "Avoid 12min delay",
    confidence: 87
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "optimal":
      return "bg-signal-green text-signal-green-foreground";
    case "active":
      return "bg-signal-amber text-signal-amber-foreground";
    case "congested":
      return "bg-signal-red text-signal-red-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-signal-red text-signal-red-foreground";
    case "medium":
      return "bg-signal-amber text-signal-amber-foreground";
    case "low":
      return "bg-signal-green text-signal-green-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function DecisionSupport() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Live Decision Support</h1>
            <p className="text-muted-foreground">Real-time conflict resolution and optimization</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-signal-green text-signal-green-foreground">
              <Zap className="h-3 w-3 mr-1" />
              AI Active
            </Badge>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Analysis
            </Button>
          </div>
        </div>

        {/* Network Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Network Status Overview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {networkSections.map((section) => (
                  <div
                    key={section.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-control-panel border border-border"
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <div className="font-mono font-bold text-sm text-foreground">
                          {section.id}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {section.name}
                        </div>
                      </div>
                      <Badge className={getStatusColor(section.status)}>
                        {section.status.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-1">
                        <Train className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground font-mono">{section.trains}</span>
                        <span className="text-muted-foreground">trains</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <AlertTriangle className="h-4 w-4 text-signal-red" />
                        <span className="text-foreground font-mono">{section.conflicts}</span>
                        <span className="text-muted-foreground">conflicts</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Route className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground font-mono">{section.capacity}%</span>
                        <span className="text-muted-foreground">capacity</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    View Full Network Map
                  </Button>
                  <Button size="sm" variant="outline">
                    Generate Section Report
                  </Button>
                  <Button size="sm" variant="outline">
                    Export Current Status
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-time Clock and Status */}
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>System Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-mono font-bold text-foreground">
                    {new Date().toLocaleTimeString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Active Conflicts</span>
                    <span className="font-mono font-bold text-signal-red">2</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Trains in Network</span>
                    <span className="font-mono font-bold text-foreground">25</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">System Response</span>
                    <span className="font-mono font-bold text-signal-green">0.3s</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">AI Confidence</span>
                    <span className="font-mono font-bold text-primary">91%</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="flex items-center space-x-2 text-xs text-signal-green">
                    <CheckCircle className="h-3 w-3" />
                    <span>All systems operational</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Conflicts */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-signal-red animate-pulse-signal" />
              <span>Active Conflicts Requiring Decision</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeConflicts.map((conflict) => (
                <div
                  key={conflict.id}
                  className="p-4 rounded-lg bg-control-panel border border-border space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(conflict.priority)}>
                        {conflict.priority.toUpperCase()}
                      </Badge>
                      <span className="font-mono text-xs text-muted-foreground">
                        {conflict.id}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {conflict.type}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ETA: {conflict.eta}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">
                        Conflict Details
                      </h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground">Trains:</span>
                          <span className="font-mono text-foreground">
                            {conflict.trains.join(" vs ")}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground">Location:</span>
                          <span className="text-foreground">{conflict.location}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm text-foreground mb-2">
                        AI Recommendation
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p className="text-foreground">{conflict.recommendation}</p>
                        <div className="flex items-center space-x-4 text-xs">
                          <div className="flex items-center space-x-1">
                            <span className="text-muted-foreground">Impact:</span>
                            <span className="text-signal-green font-medium">{conflict.impact}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-muted-foreground">Confidence:</span>
                            <span className="text-primary font-mono font-bold">{conflict.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Button size="sm" className="bg-signal-green hover:bg-signal-green/90 text-signal-green-foreground">
                      Implement Recommendation
                    </Button>
                    <Button size="sm" variant="outline">
                      Override Decision
                    </Button>
                    <Button size="sm" variant="outline">
                      Request Simulation
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}