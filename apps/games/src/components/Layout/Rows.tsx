'use client';

import type { ReactNode } from 'react';
import { cn } from '@workspace/ui/lib/utils';

export interface RowsProps {
  className?: string;
  children: ReactNode;
}

export const Rows = ({ className, children }: RowsProps) => (
  <div className={cn('grid auto-rows-min gap-4', className)}>{children}</div>
);
