'use client';

import { PlayIcon } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';

export interface PlayButtonProps {
  href: string;
  isComingSoon?: boolean;
}

export const PlayButton = ({ href, isComingSoon }: PlayButtonProps) => (
  <Button asChild={!isComingSoon} className='w-full group-hover:bg-primary/90 transition-colors' disabled={isComingSoon}>
    <Link href={href}>
      {!isComingSoon && <PlayIcon className='mr-2 h-4 w-4' />}
      {isComingSoon ? 'Coming Soon' : 'Play'}
    </Link>
  </Button>
);
