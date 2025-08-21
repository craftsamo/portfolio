'use client';

import { useAppSelector } from '@/store';

export const GameStats = ({ compact = false }: { compact?: boolean }) => {
  const { score, lines, level, status } = useAppSelector((state) => state.tetris);

  if (compact) {
    return (
      <div className='bg-gray-800 rounded-lg p-2 shadow-lg h-20 flex flex-col'>
        <h3 className='text-white text-sm font-bold mb-1 text-center'>STATS</h3>
        <div className='flex-1 flex flex-col justify-center space-y-1 overflow-hidden'>
          <div className='text-center'>
            <div className='text-gray-300 text-xs'>SCORE</div>
            <div className='text-white font-mono text-sm truncate'>{score.toLocaleString()}</div>
          </div>
          <div className='text-center'>
            <div className='text-gray-300 text-xs'>LV.{level}</div>
            <div
              className={`font-mono text-sm uppercase truncate ${
                status === 'playing'
                  ? 'text-green-400'
                  : status === 'paused'
                    ? 'text-yellow-400'
                    : status === 'gameOver'
                      ? 'text-red-400'
                      : 'text-gray-400'
              }`}
            >
              {status}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gray-800 rounded-lg p-4 shadow-lg space-y-3'>
      <h3 className='text-white text-sm font-bold mb-3 text-center'>STATS</h3>

      <div className='space-y-2'>
        <div className='flex justify-between items-center'>
          <span className='text-gray-300 text-xs'>SCORE</span>
          <span className='text-white font-mono text-sm'>{score.toLocaleString()}</span>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-gray-300 text-xs'>LINES</span>
          <span className='text-white font-mono text-sm'>{lines}</span>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-gray-300 text-xs'>LEVEL</span>
          <span className='text-white font-mono text-sm'>{level}</span>
        </div>

        <div className='flex justify-between items-center'>
          <span className='text-gray-300 text-xs'>STATUS</span>
          <span
            className={`font-mono text-xs uppercase ${
              status === 'playing'
                ? 'text-green-400'
                : status === 'paused'
                  ? 'text-yellow-400'
                  : status === 'gameOver'
                    ? 'text-red-400'
                    : 'text-gray-400'
            }`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};
