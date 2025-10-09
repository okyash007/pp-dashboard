import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  BarChart3,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Star,
  CreditCard,
  Bell,
  Check,
  ChevronsUpDown,
  ExternalLink,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

const menuItems = [
  {
    title: "Analytics",
    icon: BarChart3,
    url: "/dashboard",
  },
  {
    title: "Overview",
    icon: Home,
    url: "/dashboard/overview",
  },
  {
    title: "Rules",
    icon: Settings,
    url: "/dashboard/rules",
  },
];

export function DashboardLayout({ children }) {
  const { user, logout, loading } = useAuthStore();
  const location = useLocation();

  console.log("DashboardLayout - user:", user);
  console.log("DashboardLayout - loading:", loading);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">PP Dashboard</span>
                <span className="text-xs text-muted-foreground">
                  Creator Portal
                </span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <Link
                          to={item.url}
                          className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-colors ${
                            isActive
                              ? "bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                              : "hover:bg-muted/50 text-foreground hover:text-foreground"
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* Live Link Card */}
            <SidebarGroup>
              <SidebarGroupContent>
                <Card className="p-3 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-xs font-medium">Live link</span>
                  </div>
                  <p className="text-xs text-muted-foreground hover:underline cursor-pointer truncate">
                    {`https://link.apextip.space/${user?.username}`}
                  </p>
                </Card>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <div>
              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full bg-white justify-start gap-3 p-3 h-auto hover:bg-muted"
                  >
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                      {user?.image?.src ? (
                        <img
                          src={user.image.src}
                          alt={user?.username || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex flex-col items-start text-left flex-1 min-w-0 overflow-hidden">
                      <span className="text-sm font-medium text-foreground truncate w-full">
                        {user?.firstName && user?.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : user?.username || "User"}
                      </span>
                      <span className="text-xs text-muted-foreground truncate w-full">
                        {user?.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-56 ml-2 mb-2"
                  align="start"
                  side="top"
                >
                  {/* User Info Header */}
                  <DropdownMenuLabel className="p-0">
                    <div className="flex items-center gap-3 p-2">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                        {user?.image?.src ? (
                          <img
                            src={user.image.src}
                            alt={user?.username || "User"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {user?.firstName && user?.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : user?.username || "User"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {user?.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  {/* Upgrade Section */}
                  <DropdownMenuItem className="gap-2">
                    <Star className="w-4 h-4" />
                    <span>Upgrade to Pro</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  {/* Account Management */}
                  <DropdownMenuItem className="gap-2">
                    <Check className="w-4 h-4" />
                    <span>Account</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="gap-2">
                    <Bell className="w-4 h-4" />
                    <span>Notifications</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  {/* Logout */}
                  <DropdownMenuItem
                    className="gap-2 text-destructive focus:text-destructive"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="flex items-center gap-2 p-4 border-b">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">
              {menuItems.find((item) => item.url === location.pathname)
                ?.title || "Dashboard"}
            </h1>
          </header>

          <div className="flex-1 p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
