import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TrainIcon, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "controller"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication logic with Supabase
    console.log("Login attempt:", formData);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <TrainIcon className="h-10 w-10 text-primary animate-status-glow" />
            <h1 className="text-3xl font-bold text-foreground">RailMind Flow</h1>
          </div>
          <p className="text-muted-foreground">
            Intelligent Railway Operations Control
          </p>
          <Badge variant="secondary" className="bg-signal-green text-signal-green-foreground">
            System Online
          </Badge>
        </div>

        {/* Login Form */}
        <Card className="bg-card border-border shadow-lg">
          <CardHeader>
            <CardTitle>Controller Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="controller@railway.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-control-panel border-border"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="bg-control-panel border-border pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Access Level</Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-3 py-2 text-sm bg-control-panel border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="controller">Section Controller</option>
                  <option value="supervisor">Operations Supervisor</option>
                  <option value="admin">System Administrator</option>
                </select>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Access Control System
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                New to the system?{" "}
                <Link to="/signup" className="text-primary hover:underline">
                  Request Access
                </Link>
              </p>
              <p className="text-xs text-muted-foreground">
                Emergency Contact: +44 020 7946 0958
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="bg-control-panel border-border">
          <CardContent className="pt-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Demo Credentials</h3>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><strong>Controller:</strong> controller@demo.com / demo123</p>
              <p><strong>Supervisor:</strong> supervisor@demo.com / demo123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}