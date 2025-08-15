'use client';

import { UsersIcon } from 'lucide-react';

export interface PlayersProps {
  players: string;
}

export const Players = ({ players }: PlayersProps) => (
  <div className='flex items-center gap-1'>
    <UsersIcon className='h-4 w-4' />
    <span>{players}</span>
  </div>
);
