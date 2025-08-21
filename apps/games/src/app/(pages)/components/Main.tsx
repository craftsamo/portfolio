'use client';

import type { ReactNode } from 'react';
import { cn } from '@workspace/ui/lib/utils';

export interface MainProps {
  className?: string;
  children?: ReactNode;
}

export const Main = ({ className, children }: MainProps) => (
  <main className={cn('flex-1 flex justify-center items-center w-full', className)}>{children}</main>
);
