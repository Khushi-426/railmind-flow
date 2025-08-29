import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, ChevronRight, Clock, AlertTriangle, CheckCircle } from "lucide-react";

const recommendations = [
  {
    id: "REC-001",
    priority: "high",
    title: "Grant precedence to IC-2501",
    description: "Freight train FR-8842 can wait 3 minutes to optimize passenger flow",
    impact: "Save 7 minutes overall delay",
    confidence: 94,
    timeframe: "Next 2 minutes",
    status: "pending"
  },
  {
    id: "REC-002",
    priority: "medium",
    title: "Reroute EX-1247 via Platform 4",
    description: "Alternative routing to avoid congestion at Platform 2",
    impact: "Reduce platform conflict by 85%",
    confidence: 87,
    timeframe: "Next 8 minutes",
    status: "pending"
  },
  {
    id: "REC-003",
    priority: "low",
    title: "Optimize signal timing at Junction B",
    description: "Adjust signal sequence to improve throughput",
    impact: "Increase section capacity by 12%",
    confidence: 76,
    timeframe: "Within 15 minutes",
    status: "approved"
  }
];

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

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <CheckCircle className="h-4 w-4 text-signal-green" />;
    case "pending":
      return <Clock className="h-4 w-4 text-signal-amber animate-pulse-signal" />;
    default:
      return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
  }
};

export function DecisionPanel() {
  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-primary animate-status-glow" />
          <span>AI Decision Support</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <span>Active Recommendations</span>
            <span className="font-mono">Analysis Updated: 14:23:47</span>
          </div>

          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-lg bg-control-panel border border-border space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className={getPriorityColor(rec.priority)}>
                    {rec.priority.toUpperCase()}
                  </Badge>
                  {getStatusIcon(rec.status)}
                  <span className="font-mono text-xs text-muted-foreground">
                    {rec.id}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {rec.timeframe}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-foreground mb-1">
                  {rec.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {rec.description}
                </p>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <span className="text-muted-foreground">Impact:</span>
                    <span className="text-signal-green font-medium">{rec.impact}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="text-primary font-mono font-bold">{rec.confidence}%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {rec.status === "pending" ? (
                  <>
                    <Button size="sm" className="bg-signal-green hover:bg-signal-green/90 text-signal-green-foreground">
                      Accept
                    </Button>
                    <Button size="sm" variant="outline">
                      Modify
                    </Button>
                    <Button size="sm" variant="outline" className="text-signal-red border-signal-red">
                      Reject
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center space-x-2 text-xs text-signal-green">
                    <CheckCircle className="h-3 w-3" />
                    <span>Implementation in progress</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-border">
            <Button variant="outline" className="w-full" size="sm">
              <Brain className="h-4 w-4 mr-2" />
              Run New Analysis
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}