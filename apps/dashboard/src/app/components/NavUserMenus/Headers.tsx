'use client';

import { Bell } from 'lucide-react';
import { NavUserItemGroup } from '@/components/Sidebar';
import { DropdownMenuGroup } from '@workspace/ui/components/dropdown-menu';

const items = [{ icon: Bell, text: 'Notifications' }];

export const NavUserHeaderMenus = () => (
  <DropdownMenuGroup>
    <NavUserItemGroup items={items} />
  </DropdownMenuGroup>
);
