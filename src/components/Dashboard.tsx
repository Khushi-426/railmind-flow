import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrainIcon, AlertTriangle, TrendingUp, Clock } from "lucide-react";
import { TrainStatus } from "./TrainStatus";
import { PerformanceMetrics } from "./PerformanceMetrics";
import { DecisionPanel } from "./DecisionPanel";
import { WhatIfSimulation } from "./WhatIfSimulation";

export function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Real-time railway operations overview</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground bg-accent/30 px-3 py-2 rounded-lg">
              <span className="font-medium text-foreground">Last Update:</span> {new Date().toLocaleTimeString()}
            </div>
          </div>
        </header>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border shadow-lg hover-lift transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Trains</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrainIcon className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-foreground tracking-tight">47</div>
              <p className="text-xs text-signal-green font-medium flex items-center mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3 from last hour
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-lg hover-lift transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">On-Time Performance</CardTitle>
              <div className="p-2 bg-signal-green/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-signal-green" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-signal-green tracking-tight">94.2%</div>
              <p className="text-xs text-signal-green font-medium flex items-center mt-2">
                <TrendingUp className="h-3 w-3 mr-1" />
                +1.2% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-lg hover-lift transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Average Delay</CardTitle>
              <div className="p-2 bg-signal-amber/10 rounded-lg">
                <Clock className="h-5 w-5 text-signal-amber" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-signal-amber tracking-tight">2.4min</div>
              <p className="text-xs text-signal-green font-medium flex items-center mt-2">
                <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                -0.6min from yesterday
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-lg hover-lift transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Alerts</CardTitle>
              <div className="p-2 bg-signal-red/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-signal-red" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-3xl font-bold text-signal-red tracking-tight">3</div>
              <p className="text-xs text-muted-foreground font-medium mt-2">
                2 high priority alerts
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Train Status - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            <TrainStatus />
            <PerformanceMetrics />
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            <DecisionPanel />
            <WhatIfSimulation />
          </div>
        </div>
      </div>
    </div>
  );
}