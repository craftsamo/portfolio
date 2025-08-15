'use client';

import { ClockIcon } from 'lucide-react';

export interface PlayTimeProps {
  playTime: string;
}

export const PlayTime = ({ playTime }: PlayTimeProps) => (
  <div className='flex items-center gap-1'>
    <ClockIcon className='h-4 w-4' />
    <span>{playTime}</span>
  </div>
);
