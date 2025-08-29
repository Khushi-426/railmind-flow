import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  History as HistoryIcon, 
  Search, 
  Download, 
  Filter,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar
} from "lucide-react";

const auditLog = [
  {
    id: "LOG-2024-001",
    timestamp: "2024-01-15 14:23:47",
    user: "controller_001",
    action: "precedence_granted",
    details: "Granted precedence to IC-2501 over FR-8842 at Junction B",
    trains: ["IC-2501", "FR-8842"],
    outcome: "success",
    impact: "7min delay reduction",
    overridden: false
  },
  {
    id: "LOG-2024-002", 
    timestamp: "2024-01-15 14:18:23",
    user: "supervisor_01",
    action: "route_override",
    details: "Manual override: Rerouted EX-1247 to Platform 4 instead of AI recommendation",
    trains: ["EX-1247"],
    outcome: "partial",
    impact: "3min additional delay",
    overridden: true
  },
  {
    id: "LOG-2024-003",
    timestamp: "2024-01-15 14:15:12", 
    user: "system_ai",
    action: "conflict_resolution",
    details: "Automated conflict resolution: Weather delay compensation activated",
    trains: ["IC-2501", "FR-8842", "LC-5603", "EX-1247", "GW-9876"],
    outcome: "success",
    impact: "Network stability maintained",
    overridden: false
  },
  {
    id: "LOG-2024-004",
    timestamp: "2024-01-15 14:12:35",
    user: "controller_002", 
    action: "emergency_stop",
    details: "Emergency stop initiated due to signal failure at Mile 127.3",
    trains: ["FR-8842"],
    outcome: "success",
    impact: "Safety protocol executed",
    overridden: false
  },
  {
    id: "LOG-2024-005",
    timestamp: "2024-01-15 14:08:19",
    user: "controller_001",
    action: "schedule_adjustment",
    details: "Manual schedule adjustment for LC-5603 due to passenger loading delay",
    trains: ["LC-5603"],
    outcome: "failure",
    impact: "12min cascading delay",
    overridden: false
  }
];

const performanceMetrics = [
  {
    period: "Today",
    decisions: 47,
    aiAccuracy: 94.2,
    overrideRate: 8.5,
    avgResponseTime: 0.3
  },
  {
    period: "This Week", 
    decisions: 312,
    aiAccuracy: 91.7,
    overrideRate: 12.1,
    avgResponseTime: 0.4
  },
  {
    period: "This Month",
    decisions: 1248,
    aiAccuracy: 89.3,
    overrideRate: 15.2,
    avgResponseTime: 0.5
  }
];

export default function History() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const getActionIcon = (action: string) => {
    switch (action) {
      case "precedence_granted":
        return <CheckCircle className="h-4 w-4 text-signal-green" />;
      case "route_override":
        return <AlertTriangle className="h-4 w-4 text-signal-amber" />;
      case "emergency_stop":
        return <XCircle className="h-4 w-4 text-signal-red" />;
      case "conflict_resolution":
        return <CheckCircle className="h-4 w-4 text-primary" />;
      case "schedule_adjustment":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      default:
        return <HistoryIcon className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case "success":
        return "bg-signal-green text-signal-green-foreground";
      case "partial":
        return "bg-signal-amber text-signal-amber-foreground";
      case "failure":
        return "bg-signal-red text-signal-red-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredLogs = auditLog.filter(log => {
    const matchesSearch = searchTerm === "" || 
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.trains.some(train => train.toLowerCase().includes(searchTerm.toLowerCase())) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === "all" || 
      (selectedFilter === "overrides" && log.overridden) ||
      (selectedFilter === "ai" && log.user === "system_ai") ||
      (selectedFilter === "manual" && log.user !== "system_ai");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Historical Logs & Audit Trail</h1>
            <p className="text-muted-foreground">Track decisions, overrides, and system performance</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className="bg-card border-border shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">{metric.period}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-muted-foreground">Decisions</div>
                    <div className="font-mono font-bold text-foreground">{metric.decisions}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">AI Accuracy</div>
                    <div className="font-mono font-bold text-signal-green">{metric.aiAccuracy}%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Override Rate</div>
                    <div className="font-mono font-bold text-signal-amber">{metric.overrideRate}%</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Response Time</div>
                    <div className="font-mono font-bold text-primary">{metric.avgResponseTime}s</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HistoryIcon className="h-5 w-5 text-primary" />
              <span>Decision Audit Log</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by train ID, user, or action..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-control-panel border-border"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-3 py-2 text-sm bg-control-panel border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All Actions</option>
                  <option value="overrides">Overrides Only</option>
                  <option value="ai">AI Decisions</option>
                  <option value="manual">Manual Actions</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 rounded-lg bg-control-panel border border-border hover:bg-accent transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getActionIcon(log.action)}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs text-muted-foreground">{log.id}</span>
                          <Badge className={getOutcomeColor(log.outcome)}>
                            {log.outcome}
                          </Badge>
                          {log.overridden && (
                            <Badge variant="outline" className="text-signal-amber border-signal-amber">
                              OVERRIDE
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-foreground mt-1">{log.details}</div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground text-right">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{log.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <User className="h-3 w-3" />
                        <span>{log.user}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-4">
                      <div>
                        <span className="text-muted-foreground">Trains: </span>
                        <span className="font-mono text-foreground">
                          {log.trains.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="text-muted-foreground">
                      Impact: <span className="text-foreground">{log.impact}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredLogs.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No logs found matching your search criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}