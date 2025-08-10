'use client';

import type { ReactNode } from 'react';
import { ChevronsUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@workspace/ui/components/sidebar';
import { NavUserInfo, type NavUserInfoProps } from './NavUserInfo';

export interface NavUserProps {
  username: NavUserInfoProps['username'];
  email: NavUserInfoProps['email'];
  avatar?: NavUserInfoProps['avatar'];
  children?: ReactNode;
}

/**
 * NavUser component renders the user information and provides a dropdown menu for user-related actions.
 * It displays the user's avatar, username, and email, and shows additional children elements in the dropdown.
 * The dropdown direction adapts based on whether the sidebar is in mobile mode.
 *
 * @param {NavUserProps} props - The properties for the NavUser component.
 * @param {string} props.username - The username to display.
 * @param {string} props.email - The email address to display.
 * @param {string} props.avatar - The avatar image URL or identifier.
 * @param {ReactNode} [props.children] - Optional additional elements to render within the dropdown.
 *
 * @example
 * ```tsx
 * 'use client';
 *
 * import { Bell, Settings, LogOut } from 'lucide-react';
 * import {
 *   DropdownMenuGroup,
 *   DropdownMenuSeparator,
 *   DropdownMenuItem
 * } from '@workspace/ui/components/dropdown-menu';
 * import { NavUserMenu, DropdownMenuGroup } from '@/components/Sidebar';
 *
 * const SidebarNavUser () => {
 *  const topItems = [{ icon: Bell, text: 'Notifications' }]
 *  const centerItems = [{ icon: Settings, text: 'Settings' }]
 *  return (
 *   <NavUser username='test' email='test@example.com' avatar='/images/test1.png'>
 *     <NavUserMenu>
 *       // Simple Menus
 *       <DropdownMenuGroup>
 *         <NavUserItemGroup items={topItems} />
 *       </DropdownMenuGroup>
 *       <DropdownMenuSeparator />
 *
 *       <DropdownMenuGroup>
 *         <NavUserItemGroup items={centerItems} />
 *       </DropdownMenuGroup>
 *       <DropdownMenuSeparator />
 *
 *       // Custom Menus
 *       <DropdownMenuGroup>
 *        <DropdownMenuItem onClick={handleClick}>
 *          <LogOut />
 *          Logout
 *        </DropdownMenuItem>
 *       </DropdownMenuGroup>
 *       <NavUserMenu />
 *   <NavUser />
 *  );
 * }
 * ```
 */
export const NavUser = ({ username, email, avatar, children }: NavUserProps) => {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <NavUserInfo username={username} email={email} avatar={avatar} />
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <NavUserInfo className='px-1 py-1.5' username={username} email={email} avatar={avatar} />
            </DropdownMenuLabel>
            {children}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
