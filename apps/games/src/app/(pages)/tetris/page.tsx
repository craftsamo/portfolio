'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { setLoading } from '@/store/slices/tetris';
import { LoadingScreen } from './components/LoadingScreen';

/**
 * Responsive layout:
 * - Desktop (md and up): 2 : 6 : 2 using a 10-column grid
 * - Mobile (below md): 0 : 10 : 0 (sidebars hidden, main takes full width)
 */
export default function TetrisApp() {
  const tetrisState = useAppSelector((state) => state.tetris);
  const dispatch = useAppDispatch();

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setLoading(tetrisState.status === 'init'));
    }, 5000);
    return () => clearTimeout(timer);
  }, [tetrisState.status, dispatch]);

  return tetrisState.loading ? (
    <LoadingScreen />
  ) : (
    <div className='w-full'>
      <div className='grid grid-cols-10 gap-2 items-start'>
        {/* Left sidebar: hidden on small screens, spans 2 cols on md+ */}
        <aside className='hidden md:block md:col-span-2' aria-hidden>
          {/* Left sidebar area (optional) */}
          <div className='min-h-[75vh] rounded-xl bg-muted/50' />
        </aside>
        {/* Main content: full-width on mobile (col-span-10), 6 cols on md+ */}
        <main className='col-span-10 md:col-span-6 py-2'>
          <div className='min-h-[75vh] rounded-xl bg-muted/50' />
        </main>
        {/* Right sidebar: hidden on small screens, spans 2 cols on md+ */}
        <aside className='hidden md:block md:col-span-2' aria-hidden>
          {/* Right sidebar area (optional) */}
          <div className='min-h-[75vh] rounded-xl bg-muted/50' />
        </aside>
      </div>
    </div>
  );
}
