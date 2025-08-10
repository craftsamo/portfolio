'use client';

import type { ReactNode } from 'react';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu } from '@workspace/ui/components/sidebar';

export interface NavGroupProps {
  title: string;
  className?: string;
  children: ReactNode;
}

export const NavGroup = ({ title, className, children }: NavGroupProps) => (
  <SidebarGroup className={className}>
    <SidebarGroupLabel>{title}</SidebarGroupLabel>
    <SidebarMenu>{children}</SidebarMenu>
  </SidebarGroup>
);
