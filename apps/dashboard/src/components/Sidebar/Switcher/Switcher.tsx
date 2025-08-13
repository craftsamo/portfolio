'use client';

import { ChevronsUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@workspace/ui/components/sidebar';
import { AddSwitcherMenuItem, SwitcherMenuItem, type SwitcherMenuItemProps } from './SwitcherMenuItem';
import { SwitcherLogo } from './SwitcherLogo';

export interface SwitcherProps {
  label: string;
  items: SwitcherMenuItemProps[];
}

export const Switcher = ({ label, items }: SwitcherProps) => {
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
              <SwitcherLogo className='bg-sidebar-primary text-sidebar-primary-foreground' {...items[0].logoProps} />
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{items[0].text}</span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-background'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-xs text-muted-foreground'>{label}</DropdownMenuLabel>
            {items.map((item, index) => (
              <SwitcherMenuItem key={index} {...item} />
            ))}
            <DropdownMenuSeparator />
            <AddSwitcherMenuItem />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
