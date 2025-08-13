'use client';

import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { SidebarMenuButton, SidebarMenuItem } from '@workspace/ui/components/sidebar';
import { NavGroup } from '../NavGroup';
import type { BaseNavItem } from './types';

export interface SingleNavItem extends BaseNavItem {
  type?: 'single';
  icon: LucideIcon;
}

export function SingleNavItemComponent({ title, url, icon: Icon }: SingleNavItem) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={url}>
          <Icon />
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export interface SingleNavItemsProps {
  title: string;
  items: SingleNavItem[];
}

export const SingleNavItems = ({ title, items }: SingleNavItemsProps) => {
  return (
    <NavGroup title={title} className='group-data-[collapsible=icon]:hidden'>
      {items.map((item) => (
        <SingleNavItemComponent key={item.title} {...item} />
      ))}
    </NavGroup>
  );
};
