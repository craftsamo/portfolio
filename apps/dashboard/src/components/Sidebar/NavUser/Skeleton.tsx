'use client';

import { Skeleton } from '@workspace/ui/components/skeleton';

/**
 * Skeleton component for NavUser (Client)
 * Can be used as a "fallback" until the Promise inside NavUser is resolved
 */
export const NavUserSkeleton = () => {
  return (
    <div className='flex flex-row items-center gap-2 p-2'>
      <Skeleton className='h-8 w-8 rounded-full' />
      <div className='flex flex-col gap-2'>
        <Skeleton className='h-3 w-16' />
        <Skeleton className='h-2.5 w-32' />
      </div>
    </div>
  );
};
