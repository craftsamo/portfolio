'use client';

import { useAppSelector, useAppDispatch } from '@/store';
import { setStatus, reset } from '@/store/slices/tetris';
import { useGameEngine } from '../hooks/useGameEngine';

export const GameController = () => {
  const { status } = useAppSelector((state) => state.tetris);
  const dispatch = useAppDispatch();
  const { moveCurrentPiece, rotateCurrentPiece, hardDropCurrentPiece, holdCurrentPiece } = useGameEngine();

  const handleStart = () => {
    dispatch(setStatus('playing'));
  };

  const handlePause = () => {
    const newStatus = status === 'paused' ? 'playing' : 'paused';
    dispatch(setStatus(newStatus));
  };

  const handleReset = () => {
    dispatch(reset());
    dispatch(setStatus('ready'));
  };

  return (
    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-1 sm:gap-2 p-0.5 sm:p-1 max-h-full overflow-hidden'>
      {/* Game Control Buttons */}
      <div className='flex flex-wrap gap-1 sm:gap-2 justify-center md:justify-start'>
        {/* Start/Resume Button */}
        {(status === 'ready' || status === 'init') && (
          <button
            onClick={handleStart}
            className='px-2 py-1 sm:px-3 sm:py-1.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors duration-200 min-w-[60px] sm:min-w-[70px] text-xs sm:text-sm'
          >
            START
          </button>
        )}

        {/* Pause/Resume Button */}
        {(status === 'playing' || status === 'paused') && (
          <button
            onClick={handlePause}
            className={`px-2 py-1 sm:px-3 sm:py-1.5 font-bold rounded-lg transition-colors duration-200 min-w-[60px] sm:min-w-[70px] text-xs sm:text-sm ${
              status === 'paused' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-yellow-600 hover:bg-yellow-700 text-white'
            }`}
          >
            {status === 'paused' ? 'RESUME' : 'PAUSE'}
          </button>
        )}

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className='px-2 py-1 sm:px-3 sm:py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors duration-200 min-w-[60px] sm:min-w-[70px] text-xs sm:text-sm'
        >
          RESET
        </button>
      </div>

      {/* Touch Controls - shown on all devices */}
      <div className='w-full mt-0.5 sm:mt-1 md:mt-0 max-w-xs mx-auto'>
        {/* Direction pad - 3x3 grid */}
        <div className='grid grid-cols-3 gap-0.5 mb-0.5'>
          <div></div>
          <button
            className='px-2 py-1 sm:px-2 sm:py-1.5 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded transition-colors text-xs'
            onClick={rotateCurrentPiece}
            disabled={status !== 'playing'}
          >
            ↑
          </button>
          <div></div>

          <button
            className='px-2 py-1 sm:px-2 sm:py-1.5 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded transition-colors text-xs'
            onClick={() => moveCurrentPiece('left')}
            disabled={status !== 'playing'}
          >
            ←
          </button>

          <button
            className='px-2 py-1 sm:px-2 sm:py-1.5 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded transition-colors text-xs'
            onClick={() => moveCurrentPiece('down')}
            disabled={status !== 'playing'}
          >
            ↓
          </button>

          <button
            className='px-2 py-1 sm:px-2 sm:py-1.5 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded transition-colors text-xs'
            onClick={() => moveCurrentPiece('right')}
            disabled={status !== 'playing'}
          >
            →
          </button>
        </div>

        {/* Action buttons - 2 columns */}
        <div className='grid grid-cols-2 gap-0.5'>
          <button
            className='px-2 py-1 sm:px-3 sm:py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded transition-colors text-xs'
            onClick={holdCurrentPiece}
            disabled={status !== 'playing'}
          >
            HOLD
          </button>

          <button
            className='px-2 py-1 sm:px-3 sm:py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded transition-colors text-xs'
            onClick={hardDropCurrentPiece}
            disabled={status !== 'playing'}
          >
            DROP
          </button>
        </div>
      </div>

      {/* Desktop Controls Info - positioned on the right */}
      <div className='hidden md:block text-gray-400 text-xs text-right flex-shrink-0'>
        <div>← → : Move | ↓ : Soft Drop | ↑ : Rotate</div>
        <div>SPACE : Hard Drop | C : Hold | P : Pause</div>
      </div>
    </div>
  );
};
