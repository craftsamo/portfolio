'use client';

import { Settings } from 'lucide-react';
import { NavUserItemGroup } from '@/components/Sidebar';
import { DropdownMenuGroup } from '@workspace/ui/components/dropdown-menu';

const items = [{ icon: Settings, text: 'Settings' }];

export const NavUserBodyMenus = () => (
  <DropdownMenuGroup>
    <NavUserItemGroup items={items} />
  </DropdownMenuGroup>
);
