import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrainIcon, 
  LayoutDashboard, 
  MapPin, 
  FlaskConical, 
  History, 
  Settings,
  LogOut,
  User
} from "lucide-react";

const navigationItems = [
  {
    path: "/",
    name: "Dashboard",
    icon: LayoutDashboard
  },
  {
    path: "/decision-support",
    name: "Decision Support",
    icon: MapPin
  },
  {
    path: "/simulation",
    name: "Simulation",
    icon: FlaskConical
  },
  {
    path: "/history",
    name: "History & Logs",
    icon: History
  },
  {
    path: "/settings",
    name: "Settings",
    icon: Settings
  }
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-lg transition-smooth">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and System Status */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <TrainIcon className="h-7 w-7 text-primary animate-status-glow" />
              <h1 className="text-lg font-bold text-foreground tracking-tight">RailMind Flow</h1>
            </div>
            <Badge variant="secondary" className="bg-signal-green/10 text-signal-green border-signal-green/20 font-medium">
              <div className="w-2 h-2 bg-signal-green rounded-full animate-pulse mr-2"></div>
              System Online
            </Badge>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center space-x-2 transition-smooth hover-lift relative ${
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-md" 
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                    size="sm"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3 px-3 py-2 rounded-lg bg-accent/30">
              <User className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <div className="font-medium text-foreground">Controller_001</div>
                <div className="text-xs text-muted-foreground">Section 4B</div>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-destructive border-destructive/20 hover:bg-destructive/10 transition-smooth"
            >
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}