'use client';

import type { ReactNode } from 'react';
import { cn } from '@workspace/ui/lib/utils';

export interface BoxProps {
  className?: string;
  children: ReactNode;
}

export const Box = ({ className, children }: BoxProps) => (
  <div className={cn('flex flex-1 flex-col gap-4 p-4 pt-0', className)}>{children}</div>
);
