'use client';

import { Skeleton } from '@workspace/ui/components/skeleton';

export const BreadcrumbSkeleton = () => {
  return (
    <div className='flex items-center gap-2'>
      <Skeleton className='h-4 w-24' />
      <Skeleton className='h-4 w-24' />
      <Skeleton className='h-4 w-24' />
    </div>
  );
};
