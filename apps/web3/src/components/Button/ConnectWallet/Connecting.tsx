'use client';

import type { ReactNode } from 'react';
import { Loader2Icon } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';

export interface ConnectingProps {
  className?: string;
  text?: ReactNode;
}

export const Connecting = ({ className, text }: ConnectingProps) => (
  <Button className={cn(className)} disabled>
    <Loader2Icon className='animate-spin' />
    <span className='ml-1'>{text}</span>
  </Button>
);
