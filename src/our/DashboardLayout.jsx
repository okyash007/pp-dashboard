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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="bg-blue-50 border-r-2 border-black">
          <SidebarHeader className="p-4 border-b-2 border-black bg-gradient-to-r from-blue-400 to-purple-400">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-400 rounded-lg flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]">
                <Home className="w-4 h-4 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-black">
                  PP Dashboard
                </span>
                <span className="text-xs text-black font-semibold">
                  Creator Portal
                </span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-3">
            <SidebarGroup>
              <SidebarGroupLabel className="text-sm font-medium text-muted-foreground px-3 py-2 mb-3">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.url;
                    const colors = [
                      {
                        bg: "bg-pink-200",
                        hover: "hover:bg-pink-300",
                        active: "bg-pink-300",
                      },
                      {
                        bg: "bg-green-200",
                        hover: "hover:bg-green-300",
                        active: "bg-green-300",
                      },
                      {
                        bg: "bg-purple-200",
                        hover: "hover:bg-purple-300",
                        active: "bg-purple-300",
                      },
                    ];
                    const colorScheme = colors[index % colors.length];

                    return (
                      <SidebarMenuItem key={item.title}>
                        <Link
                          to={item.url}
                          className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all duration-150 ${
                            isActive
                              ? `font-bold text-black border-2 border-black ${colorScheme.active}`
                              : `text-foreground hover:font-bold hover:text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none ${colorScheme.bg} ${colorScheme.hover}`
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
            <SidebarGroup className="mt-6">
              <SidebarGroupContent className="space-y-3">
                <Card className="p-3 flex flex-col gap-2 bg-orange-200 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-black" />
                    <span className="text-xs font-bold text-black">
                      Live link
                    </span>
                  </div>
                  <a
                    href={`https://link.apextip.space/vt/${user?.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-black hover:underline cursor-pointer truncate font-semibold bg-white px-2 py-1 rounded-lg border border-black block"
                  >
                    {`https://link.apextip.space/${user?.username}`}
                  </a>
                </Card>
                <Card className="p-3 flex flex-col gap-2 bg-orange-200 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-black" />
                    <span className="text-xs font-bold text-black">
                      Overlay link
                    </span>
                  </div>
                  <a
                    href={`https://link.apextip.space/vo/${user?.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-black hover:underline cursor-pointer truncate font-semibold bg-white px-2 py-1 rounded-lg border border-black block"
                  >
                    {`https://link.apextip.space/overlay/${user?.username}`}
                  </a>
                </Card>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-3">
            <div>
              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full bg-red-400 hover:bg-red-500 justify-start gap-3 p-3 h-auto border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
                  >
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)]">
                      {user?.image?.src ? (
                        <img
                          src={user.image.src}
                          alt={user?.username || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-black" />
                      )}
                    </div>
                    <div className="flex flex-col items-start text-left flex-1 min-w-0 overflow-hidden">
                      <span className="text-sm font-bold text-black truncate w-full">
                        {user?.firstName && user?.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : user?.username || "User"}
                      </span>
                      <span className="text-xs text-black truncate w-full font-semibold">
                        {user?.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="w-4 h-4 text-black" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-56 bg-yellow-100 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] p-3 space-y-2"
                  align="start"
                  side="top"
                >
                  {/* User Info Header */}
                  <div className="flex items-center gap-3 p-3 bg-blue-200 rounded-lg border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)]">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)]">
                      {user?.image?.src ? (
                        <img
                          src={user.image.src}
                          alt={user?.username || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-black" />
                      )}
                    </div>
                    <div className="flex flex-col items-start text-left flex-1 min-w-0 overflow-hidden">
                      <span className="text-sm font-bold text-black truncate w-full">
                        {user?.firstName && user?.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : user?.username || "User"}
                      </span>
                      <span className="text-xs text-black truncate w-full font-semibold">
                        {user?.email}
                      </span>
                    </div>
                  </div>

                  {/* Upgrade Section */}
                  <DropdownMenuItem className="gap-2 bg-green-200 hover:bg-green-300 rounded-lg font-bold text-black border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] p-3">
                    <Star className="w-4 h-4" />
                    <span>Upgrade to Pro</span>
                  </DropdownMenuItem>

                  {/* Account Management */}
                  <DropdownMenuItem className="gap-2 bg-purple-200 hover:bg-purple-300 rounded-lg font-bold text-black border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] p-3">
                    <Check className="w-4 h-4" />
                    <span>Account</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="gap-2 bg-pink-200 hover:bg-pink-300 rounded-lg font-bold text-black border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] p-3">
                    <CreditCard className="w-4 h-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="gap-2 bg-orange-200 hover:bg-orange-300 rounded-lg font-bold text-black border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] p-3">
                    <Bell className="w-4 h-4" />
                    <span>Notifications</span>
                  </DropdownMenuItem>

                  {/* Logout */}
                  <DropdownMenuItem
                    className="gap-2 bg-red-200 hover:bg-red-300 rounded-lg font-bold text-black border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,0.6)] p-3"
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
