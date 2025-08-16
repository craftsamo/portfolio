'use client';

import type { ReactNode } from 'react';
import { cn } from '@workspace/ui/lib/utils';

export interface RowsProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export const Rows = ({ id, className, children }: RowsProps) => (
  <div id={id} className={cn('grid auto-rows-min gap-4', className)}>
    {children}
  </div>
);
