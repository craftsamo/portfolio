'use client';

import type { ReactNode } from 'react';
import { cn } from '@workspace/ui/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';

export interface ChartCardProps {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
}

export const ChartCard = ({ title, description, className, children }: ChartCardProps) => (
  <Card className={cn('pt-0', className)}>
    <CardHeader className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
      <div className='grid flex-1 gap-1'>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </div>
    </CardHeader>
    <CardContent className='px-2 pt-4 sm::px-6 sm:pt-6'>{children}</CardContent>
  </Card>
);
