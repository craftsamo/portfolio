'use client';

import type { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@workspace/ui/components/card';
import { cn } from '@workspace/ui/lib/utils';

export interface ShiningCardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  shining?: boolean;
}

const BaseCard = ({ title, description, shining, className, children }: ShiningCardProps) => (
  <Card className={cn('rounded-[10px]', shining ? 'bg-background' : 'bg-card')}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className={cn('flex flex-col items-center', className)}>{children}</CardContent>
  </Card>
);

export const ShiningCard = ({ title, description, className, children, shining }: ShiningCardProps) => {
  return shining ? (
    <>
      {/* Border Shining Animation Keyframes Inline Style */}
      <style>{`
          @keyframes border-shine {
            0% { background-position: 0% 0%; }
            100% { background-position: 200% 0%; }
          }
          .shine-border {
            background: linear-gradient(120deg, #4f8cff, #e75480, #a084ee, #4f8cff 80%);
            background-size: 200% 200%;
            animation: border-shine 3s linear infinite;
            border-radius: 12px;
            padding: 2px;
            position: relative;
          }
          .shine-inner {
            background: var(--card-bg, #fff);
            border-radius: 10px;
            position: relative;
            z-index: 2;
          }
        `}</style>
      <div className='shine-border shadow-lg'>
        <div className='shine-inner'>
          <BaseCard shining className={className} title={title} description={description}>
            {children}
          </BaseCard>
        </div>
      </div>
    </>
  ) : (
    <BaseCard className={className} title={title} description={description}>
      {children}
    </BaseCard>
  );
};
