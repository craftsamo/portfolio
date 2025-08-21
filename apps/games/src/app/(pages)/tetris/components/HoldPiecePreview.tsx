'use client';

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
  disabled?: boolean;
}

const PiecePreview = ({ type, disabled = false }: PiecePreviewProps) => {
  const shape = getPieceShape(type, 0);
  const colorClasses = COLORS[type];

  return (
    <div className='flex justify-center items-center p-1'>
      <div className='grid grid-cols-4 gap-0.5'>
        {shape.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`w-2 h-2 border transition-colors duration-75 ${
                cell
                  ? `${colorClasses} border-opacity-60 ${disabled ? 'opacity-40 grayscale' : ''}`
                  : 'bg-transparent border-transparent'
              }`}
            />
          )),
        )}
      </div>
    </div>
  );
};

export const HoldPiecePreview = ({ compact = false }: { compact?: boolean }) => {
  const { holdPiece, canHold } = useAppSelector((state) => state.tetris);

  if (compact) {
    return (
      <div className='bg-gray-800 rounded-lg p-2 shadow-lg h-20 flex flex-col'>
        <h3 className='text-white text-sm font-bold mb-1 text-center'>HOLD</h3>
        <div className='bg-gray-700 rounded flex-1 flex items-center justify-center overflow-hidden'>
          {holdPiece ? (
            <div className='flex items-center justify-center w-full h-full'>
              <PiecePreview type={holdPiece} disabled={!canHold} />
            </div>
          ) : (
            <div className='text-gray-500 text-xs text-center'>Empty</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gray-800 rounded-lg p-3 shadow-lg'>
      <h3 className='text-white text-sm font-bold mb-2 text-center'>HOLD</h3>
      <div className='bg-gray-700 rounded min-h-[60px] flex items-center justify-center'>
        {holdPiece ? (
          <PiecePreview type={holdPiece} disabled={!canHold} />
        ) : (
          <div className='text-gray-500 text-xs text-center'>Empty</div>
        )}
      </div>
      {!canHold && holdPiece && <div className='text-red-400 text-xs text-center mt-1'>Cannot hold</div>}
    </div>
  );
};
