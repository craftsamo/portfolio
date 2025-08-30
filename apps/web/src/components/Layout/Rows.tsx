'use client';

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@workspace/ui/lib/utils';

export interface RowsProps {
  id?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

export const Rows = ({ id, className, style, children }: RowsProps) => (
  <div id={id} className={cn('grid auto-rows-min gap-4', className)} style={style}>
    {children}
  </div>
);
