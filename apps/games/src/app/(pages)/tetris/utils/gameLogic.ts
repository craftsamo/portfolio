import type { Board, Piece, TetrominoType, Position } from '@/store/slices/tetris';
import { getPieceShape } from '@/store/slices/tetris';

/**
 * Check if a piece can be placed at a specific position
 */
export const isValidPosition = (
  board: Board,
  piece: Piece,
  position: Position = piece.position
): boolean => {
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const newX = position.x + x;
        const newY = position.y + y;

        // Check boundaries
        if (newX < 0 || newX >= 10 || newY >= 20) {
          return false;
        }

        // Check collision with existing pieces (skip if above board)
        if (newY >= 0 && board[newY][newX]) {
          return false;
        }
      }
    }
  }
  return true;
};

/**
 * Place a piece on the board
 */
export const placePiece = (board: Board, piece: Piece): Board => {
  const newBoard = board.map(row => [...row]);
  
  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardX = piece.position.x + x;
        const boardY = piece.position.y + y;
        
        if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
          newBoard[boardY][boardX] = piece.type;
        }
      }
    }
  }
  
  return newBoard;
};

/**
 * Move piece in a direction
 */
export const movePiece = (
  board: Board,
  piece: Piece,
  direction: 'left' | 'right' | 'down'
): Piece | null => {
  const offset = {
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 },
    down: { x: 0, y: 1 },
  };

  const newPosition = {
    x: piece.position.x + offset[direction].x,
    y: piece.position.y + offset[direction].y,
  };

  const newPiece = { ...piece, position: newPosition };

  return isValidPosition(board, newPiece) ? newPiece : null;
};

/**
 * Rotate piece
 */
export const rotatePiece = (board: Board, piece: Piece): Piece | null => {
  const newRotation = (piece.rotation + 1) % 4;
  const newShape = getPieceShape(piece.type, newRotation);
  const newPiece = { ...piece, shape: newShape, rotation: newRotation };

  // Try basic rotation
  if (isValidPosition(board, newPiece)) {
    return newPiece;
  }

  // Try wall kicks (SRS - Super Rotation System)
  const kicks = getWallKicks(piece.type, piece.rotation, newRotation);
  
  for (const kick of kicks) {
    const kickedPiece = {
      ...newPiece,
      position: {
        x: newPiece.position.x + kick.x,
        y: newPiece.position.y + kick.y,
      },
    };
    
    if (isValidPosition(board, kickedPiece)) {
      return kickedPiece;
    }
  }

  return null;
};

/**
 * Get wall kick offsets for SRS
 */
const getWallKicks = (
  type: TetrominoType,
  fromRotation: number,
  toRotation: number
): Position[] => {
  if (type === 'I') {
    // I-piece has different wall kicks
    const iKicks = {
      '0->1': [{ x: 0, y: 0 }, { x: -2, y: 0 }, { x: 1, y: 0 }, { x: -2, y: -1 }, { x: 1, y: 2 }],
      '1->2': [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 2 }, { x: 2, y: -1 }],
      '2->3': [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 1 }, { x: -1, y: -2 }],
      '3->0': [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -2, y: 0 }, { x: 1, y: -2 }, { x: -2, y: 1 }],
      '1->0': [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 1 }, { x: -1, y: -2 }],
      '2->1': [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -2, y: 0 }, { x: 1, y: -2 }, { x: -2, y: 1 }],
      '3->2': [{ x: 0, y: 0 }, { x: -2, y: 0 }, { x: 1, y: 0 }, { x: -2, y: -1 }, { x: 1, y: 2 }],
      '0->3': [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 2, y: 0 }, { x: -1, y: 2 }, { x: 2, y: -1 }],
    };
    return iKicks[`${fromRotation}->${toRotation}` as keyof typeof iKicks] || [];
  } else if (type === 'O') {
    // O-piece doesn't rotate
    return [];
  } else {
    // Standard kicks for J, L, S, T, Z
    const standardKicks = {
      '0->1': [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: -2 }, { x: -1, y: -2 }],
      '1->2': [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
      '2->3': [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: -2 }, { x: 1, y: -2 }],
      '3->0': [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 2 }, { x: -1, y: 2 }],
      '1->0': [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: -2 }, { x: 1, y: -2 }],
      '2->1': [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 2 }, { x: -1, y: 2 }],
      '3->2': [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: -2 }, { x: -1, y: -2 }],
      '0->3': [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: 2 }, { x: 1, y: 2 }],
    };
    return standardKicks[`${fromRotation}->${toRotation}` as keyof typeof standardKicks] || [];
  }
};

/**
 * Hard drop piece to bottom
 */
export const hardDrop = (board: Board, piece: Piece): Piece => {
  let newPiece = { ...piece };
  
  while (true) {
    const droppedPiece = movePiece(board, newPiece, 'down');
    if (!droppedPiece) break;
    newPiece = droppedPiece;
  }
  
  return newPiece;
};

/**
 * Get ghost piece position (preview of where piece will land)
 */
export const getGhostPiece = (board: Board, piece: Piece): Piece => {
  return hardDrop(board, piece);
};

/**
 * Check if game is over
 */
export const isGameOver = (board: Board): boolean => {
  // Check if top rows have any filled cells
  return board.slice(0, 2).some(row => row.some(cell => cell !== null));
};
