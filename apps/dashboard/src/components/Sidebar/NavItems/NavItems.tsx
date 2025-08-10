'use client';

import { NavGroup } from '../NavGroup';
import { SingleNavItemComponent, type SingleNavItem } from './SingleNavItems';
import { NestedNavItemComponent, type NestedNavItem } from './NestedNavItems';

export type NavItem = SingleNavItem | NestedNavItem;

export interface NavItemsProps {
  title: string;
  items: NavItem[];
}

const renderNavItem = (item: NavItem, index: number) => {
  if ('type' in item && item.type === 'nested') {
    return <NestedNavItemComponent key={index} {...item} />;
  }
  return <SingleNavItemComponent key={index} {...item} />;
};

export const NavItems = ({ title, items }: NavItemsProps) => <NavGroup title={title}>{items.map(renderNavItem)}</NavGroup>;
