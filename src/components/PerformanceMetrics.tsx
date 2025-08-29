import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react";

const metrics = [
  {
    label: "Section Throughput",
    value: 87,
    target: 95,
    unit: "%",
    trend: "+2.3%",
    color: "data-high"
  },
  {
    label: "Platform Utilization",
    value: 73,
    target: 85,
    unit: "%",
    trend: "+1.8%",
    color: "data-medium"
  },
  {
    label: "Conflict Resolution",
    value: 96,
    target: 98,
    unit: "%",
    trend: "+0.5%",
    color: "data-high"
  },
  {
    label: "Resource Efficiency",
    value: 82,
    target: 90,
    unit: "%",
    trend: "-0.3%",
    color: "data-medium"
  }
];

const recentEvents = [
  {
    time: "14:23",
    event: "Automatic precedence granted to IC-2501",
    type: "optimization",
    impact: "2min saved"
  },
  {
    time: "14:18",
    event: "Platform 3 allocation optimized",
    type: "resource",
    impact: "Improved flow"
  },
  {
    time: "14:15",
    event: "Weather delay compensation activated",
    type: "adaptation",
    impact: "5 trains affected"
  },
  {
    time: "14:12",
    event: "Conflict resolved: EX-1247 vs FR-8842",
    type: "conflict",
    impact: "No delays"
  }
];

const getEventIcon = (type: string) => {
  switch (type) {
    case "optimization":
      return <TrendingUp className="h-3 w-3 text-signal-green" />;
    case "resource":
      return <Users className="h-3 w-3 text-primary" />;
    case "adaptation":
      return <Clock className="h-3 w-3 text-signal-amber" />;
    case "conflict":
      return <BarChart3 className="h-3 w-3 text-signal-red" />;
    default:
      return <BarChart3 className="h-3 w-3 text-muted-foreground" />;
  }
};

export function PerformanceMetrics() {
  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <span>Performance Analytics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Metrics */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Key Performance Indicators</h3>
            {metrics.map((metric) => (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{metric.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-foreground">
                      {metric.value}{metric.unit}
                    </span>
                    <span 
                      className={`text-xs ${
                        metric.trend.startsWith('+') ? 'text-signal-green' : 'text-signal-red'
                      }`}
                    >
                      {metric.trend}
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <Progress 
                    value={metric.value} 
                    className="h-2 bg-muted"
                  />
                  <div 
                    className="absolute top-0 h-2 bg-control-grid rounded-full opacity-50"
                    style={{ width: `${metric.target}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>Target: {metric.target}%</span>
                  <span>100%</span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Events */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Recent System Events</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentEvents.map((event, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-control-panel border border-border"
                >
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    {getEventIcon(event.type)}
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-foreground">{event.event}</div>
                      <div className="text-xs text-signal-green">{event.impact}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {event.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}