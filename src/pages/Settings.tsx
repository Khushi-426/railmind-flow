import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings as SettingsIcon, 
  Wifi, 
  Shield, 
  Bell,
  Database,
  Key,
  RefreshCw,
  Save,
  TestTube,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";

const apiConnections = [
  {
    id: "signaling",
    name: "Signaling System API",
    endpoint: "https://signals.railway.internal/api/v1",
    status: "connected",
    lastSync: "2 minutes ago",
    description: "Real-time signal status and control"
  },
  {
    id: "tms",
    name: "Traffic Management System",
    endpoint: "https://tms.railway.internal/api/v2",
    status: "connected", 
    lastSync: "1 minute ago",
    description: "Train positions and scheduling data"
  },
  {
    id: "rolling_stock",
    name: "Rolling Stock Database",
    endpoint: "https://stock.railway.internal/api/v1",
    status: "warning",
    lastSync: "15 minutes ago",
    description: "Vehicle status and maintenance data"
  },
  {
    id: "weather",
    name: "Weather Service API",
    endpoint: "https://weather.metoffice.gov.uk/api",
    status: "disconnected",
    lastSync: "2 hours ago",
    description: "Weather conditions affecting operations"
  }
];

const systemSettings = {
  aiConfidenceThreshold: 85,
  autoImplementThreshold: 95,
  conflictLookahead: 30,
  refreshInterval: 5,
  notifications: {
    highPriorityConflicts: true,
    systemOverrides: true,
    performanceAlerts: false,
    maintenanceWarnings: true
  },
  optimization: {
    prioritizePassengerTrains: true,
    enablePredictiveAnalysis: true,
    useWeatherData: true,
    enableAutoRouting: false
  }
};

export default function Settings() {
  const [settings, setSettings] = useState(systemSettings);
  const [newApiKey, setNewApiKey] = useState("");
  const [testingConnection, setTestingConnection] = useState("");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-signal-green" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-signal-amber" />;
      case "disconnected":
        return <XCircle className="h-4 w-4 text-signal-red" />;
      default:
        return <RefreshCw className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-signal-green text-signal-green-foreground";
      case "warning":
        return "bg-signal-amber text-signal-amber-foreground";
      case "disconnected":
        return "bg-signal-red text-signal-red-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const testConnection = (apiId: string) => {
    setTestingConnection(apiId);
    // TODO: Implement actual connection test
    setTimeout(() => {
      setTestingConnection("");
    }, 2000);
  };

  const saveSettings = () => {
    // TODO: Implement settings save
    console.log("Saving settings:", settings);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">System Settings & Integrations</h1>
            <p className="text-muted-foreground">Configure system parameters and external connections</p>
          </div>
          <Button onClick={saveSettings} className="bg-primary hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* API Integrations */}
          <Card className="lg:col-span-2 bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wifi className="h-5 w-5 text-primary" />
                <span>External API Connections</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {apiConnections.map((api) => (
                <div
                  key={api.id}
                  className="p-4 rounded-lg bg-control-panel border border-border"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(api.status)}
                      <div>
                        <div className="font-semibold text-sm text-foreground">
                          {api.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {api.description}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(api.status)}>
                      {api.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Endpoint:</span>
                      <span className="font-mono text-foreground">{api.endpoint}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Last Sync:</span>
                      <span className="text-foreground">{api.lastSync}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-3">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => testConnection(api.id)}
                      disabled={testingConnection === api.id}
                    >
                      {testingConnection === api.id ? (
                        <>
                          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        <>
                          <TestTube className="h-3 w-3 mr-1" />
                          Test
                        </>
                      )}
                    </Button>
                    <Button size="sm" variant="outline">
                      Configure
                    </Button>
                    <Button size="sm" variant="outline">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Sync
                    </Button>
                  </div>
                </div>
              ))}

              {/* Add New API */}
              <div className="p-4 rounded-lg border border-dashed border-border">
                <h4 className="font-semibold text-sm text-foreground mb-3">Add New API Integration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="apiName">API Name</Label>
                    <Input
                      id="apiName"
                      placeholder="e.g., Passenger Information"
                      className="bg-control-panel border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apiEndpoint">Endpoint URL</Label>
                    <Input
                      id="apiEndpoint"
                      placeholder="https://api.example.com/v1"
                      className="bg-control-panel border-border"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <Button size="sm" variant="outline">
                    <Key className="h-3 w-3 mr-1" />
                    Add Integration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Configuration */}
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5 text-primary" />
                <span>System Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* AI Settings */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-foreground">AI Decision Engine</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="confidenceThreshold">
                      Confidence Threshold: {settings.aiConfidenceThreshold}%
                    </Label>
                    <input
                      type="range"
                      id="confidenceThreshold"
                      min="60"
                      max="99"
                      value={settings.aiConfidenceThreshold}
                      onChange={(e) => setSettings({
                        ...settings,
                        aiConfidenceThreshold: parseInt(e.target.value)
                      })}
                      className="w-full h-2 bg-control-panel rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="autoThreshold">
                      Auto-Implement Threshold: {settings.autoImplementThreshold}%
                    </Label>
                    <input
                      type="range"
                      id="autoThreshold"
                      min="90"
                      max="99"
                      value={settings.autoImplementThreshold}
                      onChange={(e) => setSettings({
                        ...settings,
                        autoImplementThreshold: parseInt(e.target.value)
                      })}
                      className="w-full h-2 bg-control-panel rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Performance Settings */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-foreground">Performance</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="lookahead">Conflict Lookahead (minutes)</Label>
                    <Input
                      id="lookahead"
                      type="number"
                      value={settings.conflictLookahead}
                      onChange={(e) => setSettings({
                        ...settings,
                        conflictLookahead: parseInt(e.target.value)
                      })}
                      className="bg-control-panel border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="refresh">Refresh Interval (seconds)</Label>
                    <Input
                      id="refresh"
                      type="number"
                      value={settings.refreshInterval}
                      onChange={(e) => setSettings({
                        ...settings,
                        refreshInterval: parseInt(e.target.value)
                      })}
                      className="bg-control-panel border-border"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications & Optimization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notifications */}
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key} className="text-sm">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        [key]: checked
                      }
                    })}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Optimization */}
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-primary" />
                <span>Optimization Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(settings.optimization).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key} className="text-sm">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      optimization: {
                        ...settings.optimization,
                        [key]: checked
                      }
                    })}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Security */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Security & Access Control</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-foreground">API Security</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="newApiKey">Add New API Key</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="newApiKey"
                        type="password"
                        placeholder="Enter API key..."
                        value={newApiKey}
                        onChange={(e) => setNewApiKey(e.target.value)}
                        className="bg-control-panel border-border"
                      />
                      <Button size="sm" variant="outline">
                        Add
                      </Button>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <p>Keys are encrypted and stored securely. Only authorized personnel can view or modify API credentials.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-sm text-foreground">Access Logs</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Sessions:</span>
                    <span className="font-mono text-foreground">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Failed Logins (24h):</span>
                    <span className="font-mono text-foreground">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Password Change:</span>
                    <span className="font-mono text-foreground">30 days ago</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  View Full Security Log
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}