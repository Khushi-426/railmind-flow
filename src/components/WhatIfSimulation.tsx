import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { TestTube, Play, RotateCcw, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

const scenarios = [
  {
    name: "Platform Closure Simulation",
    description: "Platform 3 unavailable for 2 hours",
    impact: {
      throughput: -15,
      delay: +8,
      reroutes: 12
    }
  },
  {
    name: "Weather Delay Scenario",
    description: "Reduced visibility, speed restrictions",
    impact: {
      throughput: -25,
      delay: +12,
      reroutes: 8
    }
  },
  {
    name: "Peak Hour Optimization",
    description: "Increased train frequency (25% more)",
    impact: {
      throughput: +18,
      delay: +3,
      reroutes: 15
    }
  }
];

export function WhatIfSimulation() {
  const [selectedScenario, setSelectedScenario] = useState("0");
  const [delayFactor, setDelayFactor] = useState([5]);
  const [isRunning, setIsRunning] = useState(false);

  const currentScenario = scenarios[parseInt(selectedScenario)];

  const runSimulation = () => {
    setIsRunning(true);
    // Simulate analysis time
    setTimeout(() => {
      setIsRunning(false);
    }, 3000);
  };

  return (
    <Card className="bg-card border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TestTube className="h-5 w-5 text-primary" />
          <span>What-If Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Scenario Type
            </label>
            <Select value={selectedScenario} onValueChange={setSelectedScenario}>
              <SelectTrigger className="bg-control-panel border-border">
                <SelectValue placeholder="Select scenario" />
              </SelectTrigger>
              <SelectContent>
                {scenarios.map((scenario, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {scenario.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Additional Delay Factor: {delayFactor[0]} minutes
            </label>
            <Slider
              value={delayFactor}
              onValueChange={setDelayFactor}
              max={30}
              min={0}
              step={1}
              className="mt-2"
            />
          </div>
        </div>

        {currentScenario && (
          <div className="p-4 rounded-lg bg-control-panel border border-border">
            <h4 className="font-semibold text-sm text-foreground mb-2">
              {currentScenario.name}
            </h4>
            <p className="text-xs text-muted-foreground mb-3">
              {currentScenario.description}
            </p>
            
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="text-center p-2 rounded bg-background border border-border">
                <div className="flex items-center justify-center mb-1">
                  {currentScenario.impact.throughput > 0 ? (
                    <TrendingUp className="h-3 w-3 text-signal-green" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-signal-red" />
                  )}
                </div>
                <div className="font-mono font-bold text-foreground">
                  {currentScenario.impact.throughput > 0 ? '+' : ''}
                  {currentScenario.impact.throughput}%
                </div>
                <div className="text-muted-foreground">Throughput</div>
              </div>
              
              <div className="text-center p-2 rounded bg-background border border-border">
                <div className="flex items-center justify-center mb-1">
                  {currentScenario.impact.delay > 0 ? (
                    <TrendingUp className="h-3 w-3 text-signal-amber" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-signal-green" />
                  )}
                </div>
                <div className="font-mono font-bold text-foreground">
                  +{currentScenario.impact.delay}min
                </div>
                <div className="text-muted-foreground">Avg Delay</div>
              </div>
              
              <div className="text-center p-2 rounded bg-background border border-border">
                <div className="flex items-center justify-center mb-1">
                  <RotateCcw className="h-3 w-3 text-primary" />
                </div>
                <div className="font-mono font-bold text-foreground">
                  {currentScenario.impact.reroutes}
                </div>
                <div className="text-muted-foreground">Reroutes</div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Button 
            onClick={runSimulation}
            disabled={isRunning}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isRunning ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Running Simulation...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run Analysis
              </>
            )}
          </Button>

          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Analyzing scenarios...</span>
                <span>47% complete</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1">
                <div className="bg-primary h-1 rounded-full animate-data-flow" style={{ width: '47%' }}></div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Last simulation: 13:45</span>
            <Badge variant="outline" className="text-xs">
              Model v2.3.1
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}