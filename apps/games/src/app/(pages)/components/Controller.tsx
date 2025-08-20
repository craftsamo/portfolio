'use client';

import { cn } from '@workspace/ui/lib/utils';
import type { ReactNode } from 'react';

export interface ControllerProps {
  className?: string;
  children: ReactNode;
}

export const Controller = ({ children, className }: ControllerProps) => (
  <footer className={cn('min-h-[100px] border-t-2 border-white/10', className)}>{children}</footer>
);
