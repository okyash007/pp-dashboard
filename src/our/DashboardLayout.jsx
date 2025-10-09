import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Home, BarChart3, Settings, LogOut, User } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

const menuItems = [
  {
    title: 'Overview',
    icon: Home,
    url: '/dashboard',
  },
  {
    title: 'Analytics',
    icon: BarChart3,
    url: '/dashboard/analytics',
  },
  {
    title: 'Rules',
    icon: Settings,
    url: '/dashboard/rules',
  },
]

export function DashboardLayout({ children }) {
  const { user, logout } = useAuthStore()
  const location = useLocation()

  console.log(user)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">PP Dashboard</span>
                <span className="text-xs text-muted-foreground">Creator Portal</span>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.url
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
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="p-4 border-t">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                  {user?.image?.src ? (
                    <img 
                      src={user.image.src} 
                      alt={user?.username || 'User'} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-5 h-5 text-primary-foreground" />
                  )}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-semibold text-foreground truncate">
                    {user?.firstName && user?.lastName 
                      ? `${user.firstName} ${user.lastName}` 
                      : user?.username || 'User'
                    }
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    @{user?.username || 'username'}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </span>
                  {user?.phone && (
                    <span className="text-xs text-muted-foreground truncate">
                      {user.phone}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                {user?.approved !== undefined && (
                  <div className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full ${user.approved ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <span className="text-muted-foreground">
                      {user.approved ? 'Approved Creator' : 'Pending Approval'}
                    </span>
                  </div>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={logout}
                  className="w-full justify-start gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 flex flex-col">
          <header className="flex items-center gap-2 p-4 border-b">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">
              {menuItems.find(item => item.url === location.pathname)?.title || 'Dashboard'}
            </h1>
          </header>
          
          <div className="flex-1 p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
