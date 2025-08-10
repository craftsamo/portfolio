'use client';

import { Switcher, type SwitcherMenuItemProps } from '@/components/Sidebar';

const items: SwitcherMenuItemProps[] = [
  { text: 'Switcher1', logoProps: { src: '', alt: 'Switcher1' } },
  { text: 'Switcher2', logoProps: { src: '', alt: 'Switcher2' } },
  { text: 'Switcher3', logoProps: { src: '', alt: 'Switcher3' } },
  { text: 'Switcher4', logoProps: { src: '', alt: 'Switcher4' } },
  { text: 'Switcher5', logoProps: { src: '', alt: 'Switcher5' } },
];

export const SidebarSwitcher = () => <Switcher label='Switcher' items={items} />;
