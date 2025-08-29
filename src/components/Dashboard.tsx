import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrainIcon, AlertTriangle, TrendingUp, Clock } from "lucide-react";
import { TrainStatus } from "./TrainStatus";
import { PerformanceMetrics } from "./PerformanceMetrics";
import { DecisionPanel } from "./DecisionPanel";
import { WhatIfSimulation } from "./WhatIfSimulation";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <TrainIcon className="h-8 w-8 text-primary animate-status-glow" />
            <h1 className="text-2xl font-bold text-foreground">RailMind Flow</h1>
          </div>
          <Badge variant="secondary" className="bg-signal-green text-signal-green-foreground">
            System Online
          </Badge>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            Last Update: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </header>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card border-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Trains</CardTitle>
            <TrainIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">47</div>
            <p className="text-xs text-muted-foreground">
              +3 from last hour
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-signal-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-signal-green">94.2%</div>
            <p className="text-xs text-muted-foreground">
              +1.2% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Delay</CardTitle>
            <Clock className="h-4 w-4 text-signal-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-signal-amber">2.4min</div>
            <p className="text-xs text-muted-foreground">
              -0.6min from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-signal-red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-signal-red">3</div>
            <p className="text-xs text-muted-foreground">
              2 high priority
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Train Status - Takes 2 columns */}
        <div className="lg:col-span-2">
          <TrainStatus />
        </div>

        {/* Decision Panel */}
        <div>
          <DecisionPanel />
        </div>

        {/* Performance Metrics */}
        <div className="lg:col-span-2">
          <PerformanceMetrics />
        </div>

        {/* What-If Simulation */}
        <div>
          <WhatIfSimulation />
        </div>
      </div>
    </div>
  );
}