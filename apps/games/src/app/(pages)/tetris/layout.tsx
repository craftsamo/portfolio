import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Header, Main, Controller } from '../components';

export const metadata: Metadata = {
  title: 'Tetris | Games',
  description: 'Classic Tetris game built with React and TypeScript',
};

export default function TetrisLayout({ children }: { children: ReactNode }) {
  return (
    <div className='max-h-screen flex flex-col justify-center items-center overflow-hidden font-mono select-none'>
      <div className='w-full max-w-7xl h-screen flex flex-col justify-between px-6'>
        <Header className='pt-2' title='TETRIS' />
        <Main>{children}</Main>
        <Controller className='py-2'>
          <div className='min-h-full rounded-xl bg-muted/50' />
        </Controller>
      </div>
    </div>
  );
}
