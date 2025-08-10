'use client';

import { Skeleton } from '@workspace/ui/components/skeleton';

export interface NavItemsSkeletonProps {
  itemCount?: number;
}

/**
 * Skeleton component for NavItems (Client)
 * Can be used as a "fallback" until the Promise inside NavItems is resolved
 * @param itemCount - Number of Skeletons to display (default: 1)
 */
export const NavItemsSkeleton = ({ itemCount }: NavItemsSkeletonProps) => {
  const count = itemCount ?? 1;

  return (
    <div className='flex flex-col gap-2 p-2'>
      <Skeleton className='h-4 w-12' />
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='flex flex-row gap-2 p-1'>
          <Skeleton className='h-6 w-6 rounded-full' />
          <Skeleton className='h-6 w-32' />
        </div>
      ))}
    </div>
  );
};
