'use client';

import { useMemo } from 'react';
import { cn } from '@workspace/ui/lib/utils';
import { useAppSelector } from '@/store';
import type { Board, TetrominoType } from '@/store/slices/tetris';
import { placePiece, getGhostPiece } from '../utils/gameLogic';

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

interface CellProps {
  type: TetrominoType | null;
  isGhost?: boolean;
  className?: string;
}

const Cell = ({ type, isGhost = false, className }: CellProps) => {
  const baseClasses = 'aspect-square border-2 transition-colors duration-75';

  if (!type) {
    return <div className={cn(baseClasses, 'bg-gray-900 border-gray-700', className)} />;
  }

  const colorClasses = COLORS[type];

  return (
    <div
      className={cn(baseClasses, isGhost ? 'bg-transparent border-gray-400 border-dashed opacity-50' : colorClasses, className)}
    />
  );
};

export const GameBoard = () => {
  const { board, currentPiece, status } = useAppSelector((state) => state.tetris);

  // Create display board with current piece and ghost piece
  const displayBoard = useMemo(() => {
    let result: Board = board.map((row) => [...row]);

    if (currentPiece) {
      // Add ghost piece
      const ghostPiece = getGhostPiece(board, currentPiece);
      result = placePiece(result, { ...ghostPiece, type: currentPiece.type });

      // Add current piece (will override ghost piece cells)
      result = placePiece(result, currentPiece);
    }

    return result;
  }, [board, currentPiece]);

  // Create ghost board for ghost piece visualization
  const ghostBoard = useMemo(() => {
    if (!currentPiece) return null;

    const result: (TetrominoType | null)[][] = Array(20)
      .fill(null)
      .map(() => Array(10).fill(null));
    const ghostPiece = getGhostPiece(board, currentPiece);

    // Only add ghost piece if it's different from current piece position
    if (ghostPiece.position.y !== currentPiece.position.y) {
      return placePiece(result, { ...ghostPiece, type: currentPiece.type });
    }

    return null;
  }, [board, currentPiece]);

  return (
    <div className='relative w-full h-full flex items-center justify-center'>
      {/* Main game board */}
      <div className='grid grid-cols-10 gap-0.5 p-0.5 sm:p-1 md:p-1.5 bg-gray-800 rounded-lg shadow-xl max-w-full max-h-full'>
        {displayBoard.map((row, y) =>
          row.map((cell, x) => {
            const isCurrentPiece =
              currentPiece &&
              currentPiece.shape.some((shapeRow, sy) =>
                shapeRow.some(
                  (shapeCell, sx) => shapeCell && currentPiece.position.x + sx === x && currentPiece.position.y + sy === y,
                ),
              );

            const isGhost = !!(ghostBoard && ghostBoard[y][x] && !isCurrentPiece && !board[y][x]);

            return (
              <Cell
                key={`${x}-${y}`}
                type={cell}
                isGhost={isGhost}
                className='w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10'
              />
            );
          }),
        )}
      </div>

      {/* Game over overlay */}
      {status === 'gameOver' && (
        <div className='absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg'>
          <div className='text-white px-4 py-3 text-center'>
            <h2 className='text-xl md:text-2xl font-bold mb-2'>GAME OVER</h2>
            <p className='text-xs md:text-sm'>Press RESET to play again</p>
          </div>
        </div>
      )}
    </div>
  );
};
