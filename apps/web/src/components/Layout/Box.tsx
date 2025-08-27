'use client';

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@workspace/ui/lib/utils';

export interface BoxProps {
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
}

export const Box = ({ className, children, style }: BoxProps) => (
  <div className={cn('flex flex-1 flex-col gap-4 p-4 pt-0', className)} style={style}>
    {children}
  </div>
);

export const Center = ({ className, children }: BoxProps) => (
  <Box className={cn('items-center justify-center pt-4', className)}>{children}</Box>
);
