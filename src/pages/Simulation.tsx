import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  FlaskConical, 
  Play, 
  RotateCcw, 
  Download,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  BarChart3
} from "lucide-react";

const predefinedScenarios = [
  {
    id: "WEATHER_001",
    name: "Heavy Rain - 30% Speed Reduction",
    description: "Simulate impact of adverse weather conditions on network",
    disruption: "weather",
    affectedTrains: 15
  },
  {
    id: "SIGNAL_001", 
    name: "Signal Failure - Junction B",
    description: "Major junction signal failure requiring rerouting",
    disruption: "technical",
    affectedTrains: 8
  },
  {
    id: "INCIDENT_001",
    name: "Passenger Emergency - Platform 3",
    description: "Medical emergency causing platform blockage",
    disruption: "incident",
    affectedTrains: 5
  }
];

const simulationResults = [
  {
    scenario: "Current Schedule",
    onTimePerformance: 94.2,
    averageDelay: 2.4,
    throughput: 87,
    conflicts: 3,
    trend: "baseline"
  },
  {
    scenario: "Weather Disruption",
    onTimePerformance: 76.8,
    averageDelay: 8.7,
    throughput: 71,
    conflicts: 12,
    trend: "negative"
  },
  {
    scenario: "Optimized Routing",
    onTimePerformance: 91.5,
    averageDelay: 3.2,
    throughput: 82,
    conflicts: 5,
    trend: "improved"
  }
];

export default function Simulation() {
  const [selectedScenario, setSelectedScenario] = useState("");
  const [customScenario, setCustomScenario] = useState({
    name: "",
    description: "",
    disruption: "",
    duration: "",
    affectedSections: ""
  });
  const [simulationRunning, setSimulationRunning] = useState(false);

  const runSimulation = () => {
    setSimulationRunning(true);
    // TODO: Implement actual simulation logic
    setTimeout(() => {
      setSimulationRunning(false);
    }, 3000);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improved":
        return <TrendingUp className="h-4 w-4 text-signal-green" />;
      case "negative":
        return <TrendingDown className="h-4 w-4 text-signal-red" />;
      default:
        return <BarChart3 className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "improved":
        return "text-signal-green";
      case "negative":
        return "text-signal-red";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Scenario Simulation</h1>
            <p className="text-muted-foreground">Test impact of disruptions and optimization strategies</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-control-panel text-foreground">
              <FlaskConical className="h-3 w-3 mr-1" />
              Simulation Ready
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scenario Setup */}
          <Card className="lg:col-span-2 bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FlaskConical className="h-5 w-5 text-primary" />
                <span>Scenario Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Predefined Scenarios */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Quick Scenarios</h3>
                <div className="grid grid-cols-1 gap-3">
                  {predefinedScenarios.map((scenario) => (
                    <div
                      key={scenario.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedScenario === scenario.id
                          ? "bg-primary/10 border-primary"
                          : "bg-control-panel border-border hover:bg-accent"
                      }`}
                      onClick={() => setSelectedScenario(scenario.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-sm text-foreground">
                            {scenario.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {scenario.description}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {scenario.affectedTrains} trains affected
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Scenario */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Custom Scenario</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="scenarioName">Scenario Name</Label>
                    <Input
                      id="scenarioName"
                      placeholder="e.g., Bridge Maintenance"
                      value={customScenario.name}
                      onChange={(e) => setCustomScenario({...customScenario, name: e.target.value})}
                      className="bg-control-panel border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="60"
                      value={customScenario.duration}
                      onChange={(e) => setCustomScenario({...customScenario, duration: e.target.value})}
                      className="bg-control-panel border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the disruption scenario..."
                    value={customScenario.description}
                    onChange={(e) => setCustomScenario({...customScenario, description: e.target.value})}
                    className="bg-control-panel border-border h-20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="affectedSections">Affected Sections</Label>
                  <Input
                    id="affectedSections"
                    placeholder="e.g., SEC-A1, SEC-B2"
                    value={customScenario.affectedSections}
                    onChange={(e) => setCustomScenario({...customScenario, affectedSections: e.target.value})}
                    className="bg-control-panel border-border"
                  />
                </div>
              </div>

              {/* Simulation Controls */}
              <div className="flex items-center space-x-2 pt-4 border-t border-border">
                <Button 
                  onClick={runSimulation}
                  disabled={simulationRunning}
                  className="bg-primary hover:bg-primary/90"
                >
                  {simulationRunning ? (
                    <>
                      <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                      Running Simulation...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Run Simulation
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  Save Scenario
                </Button>
                <Button variant="outline" size="sm">
                  Load Scenario
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Simulation Status */}
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Simulation Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  {simulationRunning ? (
                    <div className="space-y-2">
                      <div className="animate-pulse">
                        <div className="text-2xl font-mono font-bold text-primary">
                          Running...
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Analyzing network impact
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-2xl font-mono font-bold text-foreground">
                        Ready
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Configure scenario to begin
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Model Version</span>
                    <span className="font-mono font-bold text-foreground">v2.1.3</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Network Nodes</span>
                    <span className="font-mono font-bold text-foreground">127</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Constraints</span>
                    <span className="font-mono font-bold text-foreground">2,341</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Optimization Time</span>
                    <span className="font-mono font-bold text-signal-green">&lt;2s</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Simulation Results */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>Simulation Results</span>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {simulationResults.map((result, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-control-panel border border-border"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-sm text-foreground">
                        {result.scenario}
                      </h4>
                      {getTrendIcon(result.trend)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">On-Time Performance</div>
                      <div className={`font-mono font-bold ${getTrendColor(result.trend)}`}>
                        {result.onTimePerformance}%
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Average Delay</div>
                      <div className={`font-mono font-bold ${getTrendColor(result.trend)}`}>
                        {result.averageDelay}min
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Throughput</div>
                      <div className={`font-mono font-bold ${getTrendColor(result.trend)}`}>
                        {result.throughput}%
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Conflicts</div>
                      <div className={`font-mono font-bold ${getTrendColor(result.trend)}`}>
                        {result.conflicts}
                      </div>
                    </div>
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