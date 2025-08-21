import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Header, Main, Controller } from '../components';
import { GameController } from './components/GameController';

export const metadata: Metadata = {
  title: 'Tetris | Games',
  description: 'Classic Tetris game built with React and TypeScript',
};

export default function TetrisLayout({ children }: { children: ReactNode }) {
  return (
    <div className='h-screen flex flex-col overflow-hidden font-mono select-none bg-gray-900'>
      <div className='w-full h-full flex flex-col px-0.5 sm:px-1 md:px-2'>
        {/* Header - minimal fixed height */}
        <Header className='flex-shrink-0 py-1 sm:py-2' title='TETRIS' />

        {/* Main content - takes remaining space */}
        <Main className='flex-1 min-h-0 overflow-hidden'>{children}</Main>

        {/* Controller - adaptive height with constraints */}
        <Controller className='flex-shrink-0 py-1 sm:py-2'>
          <GameController />
        </Controller>
      </div>
    </div>
  );
}
