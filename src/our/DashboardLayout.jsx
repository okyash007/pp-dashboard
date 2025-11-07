import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  UserCircle,
  TreePine,
  Heart,
  Shield,
  Sparkles,
  IndianRupee,
  Palette,
  Zap,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import coolPotato from '@/assets/cool.svg?url';
import joyPotato from '@/assets/joy.svg?url';
import pissedPotato from '@/assets/pissed.svg?url';
import famPotato from '@/assets/fam.svg?url';

// Gen Z menu structure - prioritize what matters: MONEY, VIBES, then settings
const menuItems = [
  {
    title: 'Creator Stats',
    subtitle: 'Your earnings at a glance',
    icon: IndianRupee,
    url: '/dashboard',
  },
  {
    title: 'Overview',
    icon: Home,
    url: '/dashboard/overview',
  },
  // {
  //   title: 'Rules',
  //   icon: Settings,
  //   url: '/dashboard/rules',
  // },
  {
    title: 'Tip Page',
    icon: Palette,
    url: '/dashboard/tip-page',
  },
  {
    title: 'Potato Tree',
    icon: TreePine,
    url: '/dashboard/potato-tree',
  },

  {
    title: 'My Space',
    icon: UserCircle,
    url: '/dashboard/profile',
  },
];

export function DashboardLayout({ children }) {
  const { user, logout, loading } = useAuthStore();
  const location = useLocation();

  // Rotating potato mascots for Gen Z vibes
  const potatoMascots = [coolPotato, joyPotato, pissedPotato, famPotato];
  const [currentPotato, setCurrentPotato] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPotato((prev) => (prev + 1) % potatoMascots.length);
    }, 3000); // Change potato every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full relative bg-gradient-to-br from-[#FEF18C]/20 via-[#828BF8]/10 to-[#AAD6B8]/15'>
        <Sidebar className='bg-white border-r-[6px] border-black shadow-2xl'>
          <SidebarHeader className='p-5 bg-gradient-to-br from-[#828BF8] via-[#828BF8] to-[#828BF8]/90 border-b-[6px] border-black relative overflow-hidden'>
            {/* Animated background pattern */}
            <div className='absolute inset-0 opacity-20'>
              <div className='absolute top-0 left-0 w-32 h-32 bg-[#FEF18C] rounded-full blur-3xl animate-pulse'></div>
              <div className='absolute bottom-0 right-0 w-32 h-32 bg-[#AAD6B8] rounded-full blur-3xl animate-pulse delay-1000'></div>
            </div>

            <div className='flex items-center gap-4 relative z-10'>
              {/* Rotating Potato Mascot */}
              <div className='relative'>
                <div className='w-20 h-20 bg-gradient-to-br from-[#FEF18C] via-[#FEF18C] to-[#FEF18C]/80 border-[5px] border-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:scale-105 cursor-pointer rotate-3 hover:rotate-0'>
                  <img
                    src={potatoMascots[currentPotato]}
                    alt='Potato Pay Mascot'
                    className='w-14 h-14 transition-all duration-500'
                  />
                </div>
                {/* badges on mascot */}
                <div className='absolute -top-2 -right-2 bg-[#AAD6B8] border-[3px] border-black px-2 py-0.5 text-[10px] font-black rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'>
                  FRESH
                </div>
              </div>

              {/* Brand Name */}
              <div className='flex flex-col flex-1'>
                <div className='flex items-center gap-2'>
                  <span className='text-3xl font-black text-white tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)] leading-none'>
                    POTATO
                  </span>
                  <span className='text-2xl'>🥔</span>
                </div>
                <span className='text-2xl font-black text-[#FEF18C] tracking-tighter drop-shadow-[3px_3px_0px_rgba(0,0,0,0.3)] leading-none'>
                  PAY
                </span>
                <span className='text-[11px] text-white/90 font-bold tracking-wide mt-1 uppercase'>
                  The easiest way to tip creators you love{' '}
                </span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className='p-4'>
            <SidebarGroup>
              <SidebarGroupLabel className='text-[10px] font-black text-black uppercase tracking-widest px-3 py-2 mb-4 flex items-center justify-center gap-2 bg-[#FEF18C] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                <Zap className='w-3 h-3' />
                <span>YOUR COMMAND CENTER</span>
                <Zap className='w-3 h-3' />
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className='space-y-3'>
                  {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.url;

                    return (
                      <SidebarMenuItem key={item.title}>
                        <Link
                          to={item.url}
                          className={`group flex items-center gap-3 w-full px-4 py-2 transition-all duration-200 border-[2px] border-black ${
                            isActive
                              ? `bg-gradient-to-r from-[#828BF8] to-[#828BF8]/90 text-white shadow-[4px_3px_0px_0px_rgba(0,0,0,1)] translate-x-1 translate-y-1`
                              : `bg-white text-slate-800 hover:bg-[#FEF18C] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
                          }`}
                        >
                          {/* Icon */}
                          <div
                            className={`mt-1 transition-all duration-300 ${
                              isActive ? 'rotate-12' : 'group-hover:rotate-12'
                            }`}
                          >
                            <item.icon
                              className={`w-5 h-5 ${
                                isActive ? 'text-white' : 'text-[#828BF8] group-hover:text-black'
                              }`}
                            />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center gap-2'>
                              <span
                                className={`text-sm font-black leading-tight ${
                                  isActive ? 'text-white' : 'text-black'
                                }`}
                              >
                                {item.title}
                              </span>
                            </div>
                          </div>
                          {isActive && (
                            <div className='mt-1.5 flex items-center gap-1'>
                              <div className='w-2 h-2 bg-[#FEF18C] border-[2px] border-white shadow-lg animate-pulse'></div>
                            </div>
                          )}
                        </Link>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className='p-5 bg-gradient-to-br from-[#AAD6B8] via-[#AAD6B8] to-[#AAD6B8]/90 border-t-[6px] border-black relative overflow-hidden'>
            {/* Animated background pattern */}
            <div className='absolute inset-0 opacity-20'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-[#FEF18C] rounded-full blur-3xl animate-pulse'></div>
              <div className='absolute bottom-0 left-0 w-32 h-32 bg-[#828BF8] rounded-full blur-3xl animate-pulse delay-1000'></div>
            </div>

            <div className='relative z-10'>
              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='w-full h-auto p-0 hover:opacity-90 transition-all duration-200 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 overflow-hidden relative group'
                  >
                    {/* Background Image */}
                    <div className='absolute inset-0'>
                      {user?.image?.src ? (
                        <img
                          src={user.image.src}
                          alt={user?.username || 'User'}
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        <div className='w-full h-full bg-gradient-to-br from-[#FEF18C] via-[#FEF18C] to-[#FEF18C]/80 flex items-center justify-center'>
                          <User className='w-12 h-12 text-black/30' />
                        </div>
                      )}
                      {/* Gradient overlay: transparent on left, opaque on right */}
                      <div className='absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent'></div>
                    </div>

                    {/* Text Content on Left */}
                    <div className='relative z-10 w-full p-4 flex items-center justify-between gap-3'>
                      <div className='flex flex-col items-start text-left flex-1 min-w-0'>
                        <span className='text-sm font-black text-black truncate w-full uppercase tracking-tight'>
                          {user?.firstName && user?.lastName
                            ? `${user.firstName} ${user.lastName}`
                            : user?.username || 'User'}
                        </span>
                        <span className='text-[10px] text-black/70 truncate w-full font-bold'>
                          {user?.email}
                        </span>
                      </div>
                      <ChevronsUpDown className='w-5 h-5 text-black/50' />
                    </div>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className='w-64 bg-white border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-3 space-y-2'
                  align='start'
                  side='top'
                >
                  {/* User Info Header */}
                  <div className='flex items-center gap-3 p-3 bg-[#828BF8] border-[3px] border-black mb-2'>
                    <div className='w-10 h-10 bg-[#FEF18C] border-[3px] border-black flex items-center justify-center overflow-hidden flex-shrink-0'>
                      {user?.image?.src ? (
                        <img
                          src={user.image.src}
                          alt={user?.username || 'User'}
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        <User className='w-5 h-5 text-black' />
                      )}
                    </div>
                    <div className='flex flex-col items-start text-left flex-1 min-w-0 overflow-hidden'>
                      <span className='text-xs font-black text-white truncate w-full uppercase'>
                        {user?.firstName && user?.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : user?.username || 'User'}
                      </span>
                      <span className='text-[10px] text-white/80 truncate w-full font-bold'>
                        {user?.email}
                      </span>
                    </div>
                  </div>

                  {/* Upgrade Section */}
                  <DropdownMenuItem className='gap-3 bg-[#FEF18C] hover:bg-[#FEF18C]/80 border-[3px] border-black font-black text-black p-3 transition-all duration-200 cursor-pointer uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5'>
                    <Star className='w-4 h-4' />
                    <span>Go Pro! ✨</span>
                    <Sparkles className='w-3 h-3 ml-auto' />
                  </DropdownMenuItem>

                  {/* Account Management */}
                  <DropdownMenuItem className='gap-3 hover:bg-[#AAD6B8] border-[3px] border-black font-bold text-black p-2.5 transition-all duration-200 cursor-pointer text-xs'>
                    <Settings className='w-4 h-4' />
                    <span>Settings 🔧</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className='gap-3 hover:bg-[#AAD6B8] border-[3px] border-black font-bold text-black p-2.5 transition-all duration-200 cursor-pointer text-xs'>
                    <CreditCard className='w-4 h-4' />
                    <span>Payouts 💰</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className='gap-3 hover:bg-[#AAD6B8] border-[3px] border-black font-bold text-black p-2.5 transition-all duration-200 cursor-pointer text-xs'>
                    <Bell className='w-4 h-4' />
                    <span>Notifications 🔔</span>
                  </DropdownMenuItem>

                  <div className='border-t-[3px] border-black my-2'></div>

                  {/* Logout */}
                  <DropdownMenuItem
                    className='gap-3 bg-red-500 hover:bg-red-600 border-[3px] border-black font-black text-white p-2.5 transition-all duration-200 cursor-pointer text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                    }}
                  >
                    <LogOut className='w-4 h-4' />
                    <span>Peace Out! ✌️</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className='flex-1 flex flex-col'>
          <header className='flex items-center justify-between gap-4 p-5 border-b-[2px] border-black sticky top-0 bg-gradient-to-r from-white via-[#FEF18C]/10 to-white z-20 shadow-[0_6px_0px_0px_rgba(0,0,0,1)] backdrop-blur-sm'>
            <div className='flex items-center gap-4'>
              <SidebarTrigger className='bg-[#828BF8] hover:bg-[#828BF8]/80 p-4 border-[2px] border-black  hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 text-white font-bold' />
              <div className='relative'>
                <h1 className='text-2xl font-black text-black tracking-tight uppercase leading-none'>
                  {menuItems.find((item) => item.url === location.pathname)?.title || 'Dashboard'}
                </h1>
                <p className='text-[11px] font-bold text-black/60 mt-0.5'>
                  {menuItems.find((item) => item.url === location.pathname)?.subtitle ||
                    'Your creator hub'}
                </p>
              </div>
            </div>

            <div className='flex items-center gap-3'>
              <Button
                asChild
                className='h-auto bg-[#FEF18C] hover:bg-[#FEF18C]/80 text-black font-black text-xs px-4 py-3 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 group'
              >
                <a
                  href={`https://link.apextip.space/vt/${user?.username}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex flex-col items-start gap-0.5'
                >
                  {/* Category Label */}
                  <div className='flex items-center gap-1 mb-0.5'>
                    <div className='w-1 h-1 bg-black rounded-full'></div>
                    <span className='text-[8px] font-black text-black/60 uppercase tracking-widest'>
                      Tip Page
                    </span>
                  </div>
                  {/* Main Title */}
                  <div className='flex items-center gap-1.5'>
                    <Heart className='w-3.5 h-3.5 group-hover:scale-110 transition-transform' />
                    <span className='uppercase tracking-wide'>My Tip Jar</span>
                    <ExternalLink className='w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity' />
                  </div>
                  {/* Subtitle */}
                  <span className='text-[9px] font-bold text-black/70 group-hover:text-black transition-colors leading-tight'>
                    A little tip goes a long fry
                  </span>
                </a>
              </Button>
              <Button
                asChild
                className='h-auto bg-[#AAD6B8] hover:bg-[#AAD6B8]/80 text-black font-black text-xs px-4 py-3 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 group'
              >
                <a
                  href={`https://link.apextip.space/vl/${user?.username}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex flex-col items-start gap-0.5'
                >
                  {/* Category Label */}
                  <div className='flex items-center gap-1 mb-0.5'>
                    <div className='w-1 h-1 bg-black rounded-full'></div>
                    <span className='text-[8px] font-black text-black/60 uppercase tracking-widest'>
                      Potato Tree
                    </span>
                  </div>
                  {/* Main Title */}
                  <div className='flex items-center gap-1.5'>
                    <TreePine className='w-3.5 h-3.5 group-hover:scale-110 transition-transform' />
                    <span className='uppercase tracking-wide'>Branch Out</span>
                    <ExternalLink className='w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity' />
                  </div>
                  {/* Subtitle */}
                  <span className='text-[9px] font-bold text-black/70 group-hover:text-black transition-colors leading-tight'>
                    Because even potatoes have branches
                  </span>
                </a>
              </Button>
            </div>
          </header>

          <div className='flex-1 p-6 bg-gradient-to-br from-[#FEF18C]/10 via-white to-[#828BF8]/5 relative overflow-auto'>
            {/* Fun background pattern */}
            <div className='absolute inset-0 opacity-5 pointer-events-none'>
              <div className='absolute top-10 left-10 text-6xl'>🥔</div>
              <div className='absolute top-40 right-20 text-6xl'>💰</div>
              <div className='absolute bottom-20 left-40 text-6xl'>✨</div>
              <div className='absolute bottom-40 right-10 text-6xl'>🔥</div>
            </div>
            <div className='relative z-10'>{children}</div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
