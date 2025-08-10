'use client';

import { Square, FormInput } from 'lucide-react';
import { SingleNavItems } from '@/components/Sidebar';

const items = [
  { title: 'Button', url: 'buttons', icon: Square },
  { title: 'Input', url: 'inputs', icon: FormInput },
];

export const SidebarComponentNavItems = () => <SingleNavItems title='Components' items={items} />;
