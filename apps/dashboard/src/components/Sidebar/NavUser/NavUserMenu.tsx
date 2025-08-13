'use client';

import type { LucideIcon } from 'lucide-react';
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from '@workspace/ui/components/dropdown-menu';

export interface NavUserMenuItemProps {
  icon: LucideIcon;
  text: string;
  onClick?: () => void;
}

/**
 * NavUserMenuItem is a component for rendering a single user menu item with an icon and text.
 *
 * @param icon - The LucideIcon component to display.
 * @param onClick - Optional click handler for the menu item.
 * @param text - The label text for the menu item.
 */
export const NavUserMenuItem = ({ icon, onClick, text }: NavUserMenuItemProps) => {
  const Icon = icon;
  return (
    <DropdownMenuItem onClick={onClick}>
      <Icon />
      {text}
    </DropdownMenuItem>
  );
};

export interface NavItemGroupProps {
  items: NavUserMenuItemProps[];
}

/**
 * NavUserItemGroup is a component that renders a group of user menu items inside a DropdownMenuGroup.
 *
 * @param items - An array of NavUserMenuItemProps representing each menu item in the group.
 */
export const NavUserItemGroup = ({ items }: NavItemGroupProps) => {
  return (
    <DropdownMenuGroup>
      {items.map((item, index) => (
        <NavUserMenuItem key={index} icon={item.icon} text={item.text} />
      ))}
    </DropdownMenuGroup>
  );
};

export interface NavUserMenuProps {
  header?: NavUserMenuItemProps[];
  body?: NavUserMenuItemProps[];
  footer?: NavUserMenuItemProps[];
}

export const NavUserMenu = ({ header, body, footer }: NavUserMenuProps) => (
  <>
    {header && (
      <>
        <DropdownMenuGroup>
          <NavUserItemGroup items={header} />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </>
    )}

    {body && (
      <>
        <DropdownMenuGroup>
          <NavUserItemGroup items={body} />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </>
    )}

    {footer && (
      <>
        <DropdownMenuSeparator />
        <NavUserItemGroup items={footer} />
      </>
    )}
  </>
);
