'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { setLoading, setStatus } from '@/store/slices/tetris';
import { LoadingScreen } from './components/LoadingScreen';
import { GameBoard } from './components/GameBoard';
import { HoldPiecePreview } from './components/HoldPiecePreview';
import { GameStats } from './components/GameStats';
import { useGameEngine } from './hooks/useGameEngine';

/**
 * Responsive layout:
 * - Desktop (md and up): 2 : 6 : 2 using a 10-column grid
 * - Mobile (below md): 0 : 10 : 0 (sidebars hidden, main takes full width)
 */
export default function TetrisApp() {
  const tetrisState = useAppSelector((state) => state.tetris);
  const dispatch = useAppDispatch();

  // Initialize game engine
  useGameEngine();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoading(false));
      if (tetrisState.status === 'init') {
        dispatch(setStatus('ready'));
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [dispatch, tetrisState.status]);

  return tetrisState.loading ? (
    <LoadingScreen />
  ) : (
    <div className='w-full h-full flex flex-col overflow-hidden'>
      {/* Mobile layout - show compact previews above game board in 3 columns */}
      <div className='md:hidden flex-shrink-0 px-0.5 mb-1'>
        <div className='grid grid-cols-3 gap-0.5'>
          <div className='transform scale-90 origin-center'>
            <HoldPiecePreview compact />
          </div>
          <div className='transform scale-90 origin-center'>
          </div>
          <div className='transform scale-90 origin-center'>
            <GameStats compact />
          </div>
        </div>
      </div>

      <div className='grid grid-cols-10 gap-0.5 md:gap-0.5 lg:gap-1 flex-1 min-h-0 overflow-hidden'>
        {/* Left sidebar: hidden on small screens, spans 2 cols on md+ */}
        <aside className='hidden md:block md:col-span-2 space-y-1 overflow-y-auto'>
          <HoldPiecePreview />
          <GameStats />
        </aside>

        {/* Main content: full-width on mobile (col-span-10), 6 cols on md+ */}
        <main className='col-span-10 md:col-span-6 flex justify-center items-center min-h-0'>
          <div className='w-full h-full flex items-center justify-center overflow-hidden'>
            <GameBoard />
          </div>
        </main>

        {/* Right sidebar: hidden on small screens, spans 2 cols on md+ */}
        <aside className='hidden md:block md:col-span-2 space-y-1 overflow-y-auto'>
        </aside>
      </div>
    </div>
  );
}
