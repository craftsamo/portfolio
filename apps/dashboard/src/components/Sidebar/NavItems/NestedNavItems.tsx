'use client';

import Link from 'next/link';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@workspace/ui/components/collapsible';
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@workspace/ui/components/sidebar';
import { NavGroup } from '../NavGroup';
import type { BaseNavItem } from './types';

export interface NestedNavItem extends Omit<BaseNavItem, 'url'> {
  type: 'nested';
  icon: LucideIcon;
  items: BaseNavItem[];
  isActive?: boolean;
}

export function NestedNavItemComponent({ title, icon: Icon, items, isActive }: NestedNavItem) {
  return (
    <Collapsible asChild defaultOpen={isActive} className='group/collapsible'>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={title}>
            <Icon />
            <span>{title}</span>
            <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((item) => (
              <SidebarMenuSubItem key={item.title}>
                <SidebarMenuSubButton asChild>
                  <Link href={item.url}>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export interface NestedNavItemsProps {
  title: string;
  items: NestedNavItem;
}

export const NestedNavItems = ({ title, items }: NestedNavItemsProps) => (
  <NavGroup title={title}>
    <NestedNavItemComponent {...items} />
  </NavGroup>
);
