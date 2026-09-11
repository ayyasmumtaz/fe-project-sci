import { BarChart3, Home, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useLogout } from '@/features/auth/hooks/use-login';
import { ROUTE_PATHS } from '@/routes/route-paths';

const menuItems = [
  {
    title: 'Dashboard',
    url: ROUTE_PATHS.dashboard,
    icon: Home,
  },
  {
    title: 'Charts',
    url: ROUTE_PATHS.charts,
    icon: BarChart3,
  },
];

export function AppSidebar() {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    void navigate(ROUTE_PATHS.login, { replace: true });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg my-3">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Popover>
              <PopoverTrigger asChild>
                <SidebarMenuButton tooltip="Logout" className="cursor-pointer">
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="center">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Confirm Logout</h4>
                    <p className="text-sm text-muted-foreground">
                      Are you sure you want to logout?
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        const trigger = e.currentTarget
                          .closest('[data-state]')
                          ?.querySelector('button');
                        trigger?.click();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
