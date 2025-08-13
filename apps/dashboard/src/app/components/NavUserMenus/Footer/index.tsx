'use client';

import { DropdownMenuGroup } from '@workspace/ui/components/dropdown-menu';
import { LogoutItem } from './Logout';

export const NavUserFooterMenus = () => (
  <DropdownMenuGroup>
    <LogoutItem />
  </DropdownMenuGroup>
);
