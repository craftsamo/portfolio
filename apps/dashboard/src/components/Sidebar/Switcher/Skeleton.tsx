'use client';

import { Skeleton } from '@workspace/ui/components/skeleton';

/**
 * Switcher Skeleton Component (Client)
 * Can be used as a "fallback" until the Promise inside the Switcher is resolved
 */
export const SwitcherSkeleton = () => {
  return (
    <div className='flex flex-row items-center gap-2 p-2'>
      <Skeleton className='h-8 w-8 rounded-lg' />
      <Skeleton className='h-5 w-36' />
    </div>
  );
};
