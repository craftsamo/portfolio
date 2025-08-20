'use client';

import type { ReactNode } from 'react';
import { cn } from '@workspace/ui/lib/utils';

export interface HeaderProps {
  title: string;
  className?: string;
  children?: ReactNode;
}

export const Header = ({ title, className, children }: HeaderProps) => (
  <header className={cn('text-center border-b-2 border-white/10', className)}>
    <h1 className='text-4xl md:text-5xl lg:text-6xl font-black tracking-[0.2em] bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-green-400 bg-clip-text text-transparent animate-pulse drop-shadow-[0_0_20px_rgba(0,245,255,0.3)] mb-2'>
      {title}
    </h1>
    {children}
  </header>
);
