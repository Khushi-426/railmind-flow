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
    <nav className="bg-card border-b border-border shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and System Status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <TrainIcon className="h-8 w-8 text-primary animate-status-glow" />
              <h1 className="text-xl font-bold text-foreground">RailMind Flow</h1>
            </div>
            <Badge variant="secondary" className="bg-signal-green text-signal-green-foreground">
              System Online
            </Badge>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center space-x-2 ${
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                    size="sm"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden md:inline">{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Controller_001</span>
            </div>
            <Button variant="outline" size="sm" className="text-signal-red border-signal-red/20">
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}