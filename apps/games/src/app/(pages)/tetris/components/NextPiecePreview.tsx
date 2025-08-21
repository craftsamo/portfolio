'use client';

import { useMemo } from 'react';
import { useAppSelector } from '@/store';
import { type TetrominoType, getPieceShape } from '@/store/slices/tetris';

// Color mapping for tetromino types
const COLORS: Record<TetrominoType, string> = {
  I: 'bg-cyan-500 border-cyan-400',
  O: 'bg-yellow-500 border-yellow-400',
  T: 'bg-purple-500 border-purple-400',
  S: 'bg-green-500 border-green-400',
  Z: 'bg-red-500 border-red-400',
  J: 'bg-blue-500 border-blue-400',
  L: 'bg-orange-500 border-orange-400',
};

interface PiecePreviewProps {
  type: TetrominoType;
  size?: 'sm' | 'md';
}

const PiecePreview = ({ type, size = 'md' }: PiecePreviewProps) => {
  const shape = getPieceShape(type, 0);
  const cellSize = size === 'sm' ? 'w-2 h-2' : 'w-4 h-4';
  const colorClasses = COLORS[type];

  // Calculate the actual bounds of the piece for proper centering
  const bounds = useMemo(() => {
    let minX = 4,
      maxX = -1,
      minY = 4,
      maxY = -1;
    shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
        }
      });
    });
    return { minX, maxX, minY, maxY, width: maxX - minX + 1, height: maxY - minY + 1 };
  }, [shape]);

  return (
    <div className='flex justify-center items-center p-1'>
      <div
        className='grid gap-0.5'
        style={{
          gridTemplateColumns: `repeat(${bounds.width}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${bounds.height}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: bounds.height }, (_, y) =>
          Array.from({ length: bounds.width }, (_, x) => {
            const actualY = y + bounds.minY;
            const actualX = x + bounds.minX;
            const cell = shape[actualY]?.[actualX];
            return (
              <div
                key={`${x}-${y}`}
                className={`${cellSize} border transition-colors duration-75 ${
                  cell ? `${colorClasses} border-opacity-60` : 'bg-transparent border-transparent'
                }`}
              />
            );
          }),
        )}
      </div>
    </div>
  );
};

export const NextPiecePreview = ({ compact = false }: { compact?: boolean }) => {
  const { nextPieces } = useAppSelector((state) => state.tetris);

  if (compact) {
    return (
      <div className='bg-gray-800 rounded-lg p-2 shadow-lg h-20 flex flex-col'>
        <h3 className='text-white text-sm font-bold mb-1 text-center'>NEXT</h3>
        <div className='flex-1 bg-gray-700 rounded flex items-center justify-center overflow-hidden'>
          {nextPieces.length > 0 && (
            <div className='flex items-center justify-center w-full h-full'>
              <PiecePreview type={nextPieces[0]} size='sm' />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gray-800 rounded-lg p-3 shadow-lg'>
      <h3 className='text-white text-sm font-bold mb-2 text-center'>NEXT</h3>
      <div className='space-y-2'>
        {nextPieces.slice(0, 5).map((pieceType, index) => (
          <div
            key={`${pieceType}-${index}`}
            className={`bg-gray-700 rounded h-12 flex items-center justify-center ${index === 0 ? 'ring-2 ring-blue-400' : ''}`}
          >
            <PiecePreview type={pieceType} size={index === 0 ? 'md' : 'sm'} />
          </div>
        ))}
      </div>
    </div>
  );
};
