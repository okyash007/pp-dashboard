import { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Home,
  LogOut,
  User,
  ChevronDown,
  Star,
  CreditCard,
  Bell,
  UserCircle,
  TreePine,
  Heart,
  Sparkles,
  IndianRupee,
  Palette,
  HelpCircle,
  FileText,
  ArrowBigLeft,
  ArrowBigRight,
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import coolPotato from '@/assets/cool.svg?url';
import { Copy, ExternalLinkIcon } from 'lucide-react';
import { toast } from 'sonner';

// Custom Sidebar Trigger with Arrow Icons
function CustomSidebarTrigger() {
  const { toggleSidebar, state } = useSidebar();
  const isOpen = state === 'expanded';

  return (
    <button
      onClick={toggleSidebar}
      className='p-0 bg-transparent border-0 cursor-pointer flex items-center justify-center hover:scale-110 transition-all duration-200'
      aria-label='Toggle Sidebar'
    >
      {isOpen ? (
        <ArrowBigLeft className='h-6 w-6 fill-[#FEF18C] stroke-black stroke-2 drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-200' />
      ) : (
        <ArrowBigRight className='h-6 w-6 fill-[#FEF18C] stroke-black stroke-2 drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-200' />
      )}
      <span className='sr-only'>Toggle Sidebar</span>
    </button>
  );
}

const menuItems = [
  {
    title: 'Creator Stats',
    subtitle: 'Understand your tip flow, conversion patterns, and engagement health',
    icon: IndianRupee,
    url: '/dashboard',
    type: 'tab',
  },
  {
    title: 'Overlays',
    subtitle:
      'Manage and customize your overlays, including QR styles, alerts, and leaderboard settings',
    icon: Home,
    url: '/dashboard/overview',
    type: 'tab',
  },
  {
    title: 'Tip Page',
    subtitle: 'Set up and design your tip page exactly the way you want',
    icon: Palette,
    url: '/dashboard/tip-page',
    type: 'tab',
  },
  {
    title: 'Potato Tree',
    subtitle: 'Customize the appearance and layout of your Potato Tree page',
    icon: TreePine,
    url: '/dashboard/potato-tree',
    type: 'tab',
  },
  {
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to common questions about Potatopay',
    url: '/dashboard/faq',
    type: 'all',
  },
  {
    title: 'Terms & Conditions',
    subtitle: 'Everything you should know about how our features and services work',
    url: '/dashboard/tnc',
    type: 'all',
  },
  {
    title: 'My Space',
    subtitle: 'Edit your personal information and customize your profile',
    url: '/dashboard/profile',
    type: 'all',
  },
];

export function DashboardLayout({ children }) {
  const { user, logout, loading } = useAuthStore();
  const location = useLocation();

  const potatoMascots = [coolPotato];
  const [currentPotato, setCurrentPotato] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPotato((prev) => (prev + 1) % potatoMascots.length);
    }, 3000); // Change potato every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const shareLinks = useMemo(
    () => [
      {
        id: 'tip',
        label: 'My Tip Jar',
        title: 'Tip Page',
        href: `https://link.apextip.space/vt/${user?.username}`,
        subtitle: 'A little tip goes a long fry',
      },
      {
        id: 'tree',
        label: 'Branch Out',
        title: 'Potato Tree',
        href: `https://link.apextip.space/vl/${user?.username}`,
        subtitle: 'Because even potatoes have branches',
      },
    ],
    [user?.username]
  );

  const copyLink = (href) => {
    if (typeof navigator !== 'undefined' && navigator?.clipboard) {
      navigator.clipboard
        .writeText(href)
        .then(() => {
          toast.success('Copied!', {
            description: 'Link copied to clipboard',
            duration: 2000,
          });
        })
        .catch(() => {
          toast.error('Failed to copy', {
            description: 'Please try again',
            duration: 2000,
          });
        });
    }
  };

  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full relative bg-gradient-to-br from-[#FEF18C]/20 via-[#FEF18C]/10 to-[#828BF8]/15'>
        <Sidebar className='bg-white border-r-[4px]! border-black shadow-2xl'>
          <SidebarHeader className='h-34 px-5 py-6 bg-gradient-to-br from-[#828BF8] via-[#828BF8] to-[#5C66D4] border-b-[3px] border-black relative overflow-hidden'>
            {/* Animated background pattern */}
            <div className='absolute inset-0 opacity-20'>
              <div className='absolute top-0 left-0 w-32 h-32 bg-[#FEF18C] rounded-full blur-3xl animate-pulse'></div>
              <div className='absolute bottom-0 right-0 w-32 h-32 bg-[#FEF18C]/70 rounded-full blur-3xl animate-pulse delay-1000'></div>
            </div>

            <div className='flex items-center relative z-10 -ml-5'>
              {/* Rotating Potato Mascot */}
              <div className='relative'>
                {/* <div className='w-20 h-20 bg-gradient-to-br from-[#FEF18C] via-[#FEF18C] to-[#FEF18C]/80 border-[5px] border-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:scale-105 cursor-pointer rotate-3 hover:rotate-0'> */}
                <img
                  src={potatoMascots[currentPotato]}
                  alt='Potato Pay Mascot'
                  className='h-24 w-24 transition-all duration-500'
                />
                {/* </div> */}
              </div>

              <div className='flex flex-col flex-1'>
                <div className='flex items-center gap-2'>
                  <span className='text-3xl font-black text-white tracking-tight drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)] leading-none uppercase'>
                    POTATO<span className='text-[#FEF18C]'>PAY</span>.CO
                  </span>
                </div>
                <span className='text-[11px] text-white/90 font-bold tracking-wide mt-1 uppercase leading-3.5'>
                  The Future of Digital Payments & Fun Fan Funding
                </span>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className='px-4  py-2 space-y-3'>
            <SidebarGroup>
              {/* <SidebarGroupLabel className='text-[10px] font-black text-black uppercase tracking-widest px-3 py-2 mb-4 flex items-center justify-center gap-2 bg-[#FEF18C] border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                <Zap className='w-3 h-3' />
                <span>YOUR COMMAND CENTER</span>
                <Zap className='w-3 h-3' />
              </SidebarGroupLabel> */}
              <SidebarGroupContent>
                <SidebarMenu className='space-y-3'>
                  <p className='text-xs'>Navigate</p>
                  {menuItems
                    .filter((item) => item.type === 'tab')
                    .map((item, index) => {
                      const isActive = location.pathname === item.url;

                      return (
                        <SidebarMenuItem key={item.title}>
                          <Link
                            to={item.url}
                            className={`group flex items-center gap-3 w-full px-4 py-2 transition-all duration-200 border-[2px] border-black ${
                              isActive
                                ? `bg-gradient-to-r from-[#828BF8] to-[#828BF8]/90 text-white shadow-[4px_3px_0px_0px_rgba(0,0,0,1)]`
                                : `bg-white text-slate-800 hover:bg-[#FEF18C] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
                            }`}
                          >
                            <item.icon
                              className={`w-5 h-5 ${
                                isActive ? 'text-white' : 'text-[#828BF8] group-hover:text-black'
                              }`}
                            />
                            <div className='flex-1 min-w-0'>
                              <div className='flex items-center gap-2'>
                                <span
                                  className={`text-sm font-black leading-tight ${
                                    isActive ? 'text-white' : 'text-black'
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
                            </div>
                            {isActive && (
                              <div className='flex items-center gap-1'>
                                <div className='w-2 h-2 bg-[#FEF18C] shadow-lg'></div>
                              </div>
                            )}
                          </Link>
                        </SidebarMenuItem>
                      );
                    })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {/* SIDEBAR LINKS : TIP AND POTATOTREE */}
            <div className='p-2 space-y-3'>
              <p className='text-xs'>My Links</p>
              {shareLinks.map((link) => (
                <div
                  key={link.id}
                  className='group relative border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 overflow-hidden'
                >
                  {/* Background gradient based on link type */}
                  <div
                    className={`absolute inset-0 opacity-10 ${
                      link.id === 'tip'
                        ? 'bg-gradient-to-br from-[#FEF18C] to-[#FFF8D0]'
                        : 'bg-gradient-to-br from-[#AAD6B8] to-[#C8E6D3]'
                    }`}
                  ></div>

                  <div className='relative p-3 space-y-2.5'>
                    {/* Header with icon and title */}
                    <div className='flex items-start justify-between gap-2'>
                      <div className='flex items-start gap-2.5 flex-1 min-w-0'>
                        <div
                          className={`mt-0.5 p-1.5 border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                            link.id === 'tip' ? 'bg-[#FEC4FF]' : 'bg-[#AAD6B8]'
                          }`}
                        >
                          {link.id === 'tip' ? (
                            <Heart className='w-4 h-4 text-black' />
                          ) : (
                            <TreePine className='w-4 h-4 text-black' />
                          )}
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='text-[10px] font-black uppercase tracking-wider text-black/50 mb-0.5'>
                            {link.label}
                          </p>
                          <p className='text-sm font-black text-black leading-tight truncate'>
                            {link.title}
                          </p>
                        </div>
                      </div>
                      <Button
                        asChild
                        size='icon'
                        className='h-8 w-8 bg-black hover:bg-[#828BF8] text-white border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex-shrink-0'
                      >
                        <a href={link.href} target='_blank' rel='noopener noreferrer'>
                          <ExternalLinkIcon className='w-3.5 h-3.5' />
                        </a>
                      </Button>
                    </div>

                    {/* Subtitle */}
                    {/* <p className='text-[10px] font-bold text-black/60 leading-tight'>
                      {link.subtitle}
                    </p> */}

                    {/* Link with copy button */}
                    <div className='flex items-center gap-1.5 border-[2px] border-black rounded-sm bg-white px-2.5 py-1.5'>
                      <span className='text-[10px] font-semibold text-black/80 truncate flex-1'>
                        {link.href}
                      </span>
                      <Button
                        variant='ghost'
                        size='icon'
                        onClick={() => copyLink(link.href)}
                        className='h-6 w-6 cursor-pointer hover:bg-[#FEF18C] transition-all duration-200 flex-shrink-0'
                        title='Copy link'
                      >
                        <Copy className='w-3 h-3 text-black' />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SidebarContent>

          <SidebarFooter className='p-5 bg-gradient-to-br from-[#828BF8] via-[#5C66D4] to-[#828BF8]/90 border-t-[3px] border-black relative overflow-hidden'>
            {/* Animated background pattern */}
            <div className='absolute inset-0 opacity-20'>
              <div className='absolute top-0 right-0 w-32 h-32 bg-[#FEF18C] rounded-full blur-3xl animate-pulse'></div>
              <div className='absolute bottom-0 left-0 w-32 h-32 bg-[#5C66D4] rounded-full blur-3xl animate-pulse delay-1000'></div>
            </div>

            <div className='relative z-10 flex gap-2'>
              {/* FAQ Button */}
              <Button
                asChild
                className='flex-1 h-auto bg-white hover:bg-[#FEF18C] text-black font-black text-xs px-3 py-2.5 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200'
              >
                <Link to='/dashboard/faq' className='flex items-center justify-center gap-2'>
                  <HelpCircle className='w-4 h-4' />
                  <span>FAQ</span>
                </Link>
              </Button>

              {/* Terms & Conditions Button */}
              <Button
                asChild
                className='flex-1 h-auto bg-white hover:bg-[#FEF18C] text-black font-black text-xs px-3 py-2.5 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200'
              >
                <Link to='/dashboard/tnc' className='flex items-center justify-center gap-2'>
                  <FileText className='w-4 h-4' />
                  <span>T&C</span>
                </Link>
              </Button>
            </div>

            <div className='text-xs font-semibold text-[#FEF18C] mt-3 text-center'>
              © 2025 PotatoPay. GSTIN 09ABFFP5606F1Z8.
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className='flex-1 flex flex-col '>
          <header className='h-34 flex items-center justify-between gap-4 px-6 py-6 border-b-[3px] border-black sticky top-0 bg-white/60 z-20  backdrop-blur'>
            <div className='flex items-center gap-4'>
              <CustomSidebarTrigger />
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
              {/* Tip Page and Potato Tree buttons commented out */}
              {/* <Button
                asChild
                className="h-auto bg-[#FEF18C] hover:bg-[#FEF18C]/80 text-black font-black text-xs px-4 py-3 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 group"
              >
                <a
                  href={`https://link.apextip.space/vt/${user?.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-start gap-0.5"
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <span className="text-[8px] font-black text-black/60 uppercase tracking-widest">
                      Tip Page
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span className="uppercase tracking-wide">My Tip Jar</span>
                    <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[9px] font-bold text-black/70 group-hover:text-black transition-colors leading-tight">
                    A little tip goes a long fry
                  </span>
                </a>
              </Button>
              <Button
                asChild
                className="h-auto bg-[#AAD6B8] hover:bg-[#AAD6B8]/80 text-black font-black text-xs px-4 py-3 border-[4px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 group"
              >
                <a
                  href={`https://link.apextip.space/vl/${user?.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-start gap-0.5"
                >
                  <div className="flex items-center gap-1 mb-0.5">
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                    <span className="text-[8px] font-black text-black/60 uppercase tracking-widest">
                      Potato Tree
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TreePine className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    <span className="uppercase tracking-wide">Branch Out</span>
                    <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[9px] font-bold text-black/70 group-hover:text-black transition-colors leading-tight">
                    Because even potatoes have branches
                  </span>
                </a>
              </Button>

              {/* Notification Button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='h-12 w-12 bg-white hover:bg-[#FEF18C] border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 relative cursor-pointer'
                  >
                    <Bell className='w-5 h-5 text-black' />
                    {/* Notification Badge */}
                    <span className='absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-[2px] border-black rounded-full'></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className='w-80 bg-white border-[4px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-3'
                  align='end'
                  side='bottom'
                >
                  <div className='p-2'>
                    <p className='text-sm font-black text-black uppercase'>Notifications 🔔</p>
                    <p className='text-xs text-black/60 mt-1'>No new notifications</p>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile Dropdown - Compact */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant='ghost'
                    className='h-18 px-2 transition-all duration-200 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 overflow-hidden relative group bg-white cursor-pointer'
                  >
                    <div className='flex items-center gap-2'>
                      <div className='w-12 h-12 bg-gradient-to-br from-[#FEF18C] via-[#FEF18C] to-[#FEF18C]/80 border-[3px] border-black flex items-center justify-center overflow-hidden flex-shrink-0 rounded-sm'>
                        {user?.image?.src ? (
                          <img
                            src={user.image.src}
                            alt={user?.username || 'User'}
                            className='w-full h-full object-cover'
                          />
                        ) : (
                          <User className='w-4 h-4 text-black' />
                        )}
                      </div>
                      <div className='flex flex-col items-start text-left min-w-0 lg:block'>
                        <div className='text-[9px]'>{user?.username}</div>
                        <span className='text-[11px] font-black text-black truncate max-w-[120px] uppercase tracking-tight leading-tight'>
                          {user?.firstName && user?.lastName
                            ? `${user.firstName}`
                            : user?.username || 'User'}
                        </span>
                        {/* <span className='text-[9px] text-black/60 truncate max-w-[120px] font-bold leading-tight'>
                          {user?.email?.split('@')[0] || ''}
                        </span> */}
                      </div>
                      <ChevronDown className='w-3.5 h-3.5 text-black/50 hidden lg:block flex-shrink-0' />
                    </div>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className='w-64 bg-[#828BF8] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-3 space-y-2'
                  align='end'
                  side='bottom'
                >
                  {/* User Header */}
                  <div
                    className='flex items-center justify-end gap-3 p-3 border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden'
                    style={{
                      backgroundImage: user?.banner_image?.src
                        ? `url(${user.banner_image.src})`
                        : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundColor: user?.banner_image?.src ? 'transparent' : '#6E77F6',
                    }}
                  >
                    <div className='absolute inset-0 bg-[#6E77F6]/20'></div>
                    <div className='px-4 py-2 bg-gradient-to-br from-[#FEF18C] via-[#FEF18C] to-[#FEF18C]/80 border-[5px] border-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:scale-105 cursor-pointer rotate-3 hover:rotate-0'>
                      <span className='text-xs font-black text-black uppercase truncate'>
                        Hey!{' '}
                        {user?.firstName && user?.lastName
                          ? `${user.firstName}`
                          : user?.username || 'User'}
                      </span>
                      {/* <span className='text-[10px] text-black/80 truncate font-semibold'>
                        {user?.email}
                      </span> */}
                    </div>
                  </div>

                  {/* Go Pro */}
                  <DropdownMenuItem className='gap-3 bg-white hover:bg-white/90 border-[2px] border-black font-black p-2.5 text-xs uppercase cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5'>
                    <Star className='w-4 h-4 text-[#FFD700]' />
                    <span className='bg-gradient-to-r from-[#FFD700] to-black bg-clip-text text-transparent'>
                      Go Pro!
                    </span>
                    <Sparkles className='w-3 h-3 ml-auto text-[#FFD700]' />
                  </DropdownMenuItem>

                  {/* Account Items */}
                  <DropdownMenuItem asChild className='p-0'>
                    <Link
                      to='/dashboard/profile'
                      className='flex items-center gap-3 w-full px-3 py-2 bg-white hover:bg-white/90 border-[2px] border-black font-bold text-black text-xs cursor-pointer transition-all duration-150 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5'
                    >
                      <UserCircle className='w-4 h-4' />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className='gap-3 bg-white hover:bg-white/90 border-[2px] border-black font-bold text-black p-2 text-xs cursor-pointer transition-all duration-150 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5'>
                    <CreditCard className='w-4 h-4' />
                    <span>Payouts</span>
                  </DropdownMenuItem>

                  {/* Logout */}
                  <DropdownMenuItem
                    className='gap-3 bg-[#FEC4FF] hover:bg-[#FDB8FF]! border-[2px] border-black font-black text-black p-2 text-xs uppercase cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 hover:translate-x-0.5 hover:translate-y-0.5'
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                    }}
                  >
                    <LogOut className='w-4 h-4 text-black' />
                    <span>Peace Out!</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <div className='flex-1 p-6 relative overflow-auto bg-[#FEF18C]/15'>
            <style>{`
              @keyframes dashboardStripeMove {
                0% { background-position: 0 0, 0 0; }
                100% { background-position: 200px 0, 0 200px; }
              }
            `}</style>
            <div
              className='absolute inset-0 opacity-40 pointer-events-none'
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, rgba(254,241,140,0.25) 0px, rgba(254,241,140,0.25) 14px, transparent 14px, transparent 28px), radial-gradient(circle, rgba(130,139,248,0.15) 2px, transparent 3px)',
                backgroundSize: 'auto, 26px 26px',
                animation: 'dashboardStripeMove 25s linear infinite',
              }}
            ></div>
            <div className='relative z-10 max-md:hidden'>{children}</div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
