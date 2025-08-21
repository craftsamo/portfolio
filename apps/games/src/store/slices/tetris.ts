import { createSlice } from '@reduxjs/toolkit';

export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export type Position = {
  x: number;
  y: number;
};

export type Piece = {
  type: TetrominoType;
  shape: number[][];
  position: Position;
  rotation: number;
};

export type Board = (TetrominoType | null)[][];

type TetrisState = {
  loading: boolean;
  score: number;
  lines: number;
  level: number;
  status: 'init' | 'ready' | 'playing' | 'paused' | 'gameOver';
  fallSpeed: number;
  canHold: boolean;
  board: Board;
  currentPiece: Piece | null;
  nextPieces: TetrominoType[];
  holdPiece: TetrominoType | null;
  lastDrop: number;
  keys: {
    left: boolean;
    right: boolean;
    down: boolean;
    rotate: boolean;
    drop: boolean;
    hold: boolean;
    pause: boolean;
  };
};

// Create empty 20x10 board
const createEmptyBoard = (): Board =>
  Array(20)
    .fill(null)
    .map(() => Array(10).fill(null));

// Generate bag of 7 pieces
const generateBag = (): TetrominoType[] => {
  const pieces: TetrominoType[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];
  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
  }
  return pieces;
};

const initialState = {
  loading: true,
  score: 0,
  lines: 0,
  level: 1,
  status: 'init',
  fallSpeed: 1000,
  canHold: true,
  board: createEmptyBoard(),
  currentPiece: null,
  nextPieces: [...generateBag(), ...generateBag()],
  holdPiece: null,
  lastDrop: 0,
  keys: {
    left: false,
    right: false,
    down: false,
    rotate: false,
    drop: false,
    hold: false,
    pause: false,
  },
} as TetrisState;

const tetris = createSlice({
  name: 'tetris',
  initialState,
  reducers: {
    reset: () => ({
      ...initialState,
      loading: false,
      board: createEmptyBoard(),
      nextPieces: [...generateBag(), ...generateBag()],
    }),
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setScore: (state, { payload }) => {
      state.score = payload;
    },
    addScore: (state, { payload }) => {
      state.score += payload;
    },
    setLines: (state, { payload }) => {
      state.lines = payload;
    },
    addLines: (state, { payload }) => {
      state.lines += payload;
      state.level = Math.floor(state.lines / 10) + 1;
      state.fallSpeed = Math.max(50, 1000 - (state.level - 1) * 50);
    },
    setLevel: (state, { payload }) => {
      state.level = payload;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
    setFallSpeed: (state, { payload }) => {
      state.fallSpeed = payload;
    },
    setHold: (state, { payload }) => {
      state.canHold = payload;
    },
    setBoard: (state, { payload }) => {
      state.board = payload;
    },
    setCurrentPiece: (state, { payload }) => {
      state.currentPiece = payload;
    },
    setNextPieces: (state, { payload }) => {
      state.nextPieces = payload;
    },
    setHoldPiece: (state, { payload }) => {
      state.holdPiece = payload;
    },
    setLastDrop: (state, { payload }) => {
      state.lastDrop = payload;
    },
    setKeys: (state, { payload }) => {
      state.keys = { ...state.keys, ...payload };
    },
    spawnPiece: (state) => {
      if (state.nextPieces.length > 0) {
        const pieceType = state.nextPieces[0];
        state.nextPieces = state.nextPieces.slice(1);

        // Add new bag if running low
        if (state.nextPieces.length < 7) {
          state.nextPieces = [...state.nextPieces, ...generateBag()];
        }

        // Create new piece at spawn position
        state.currentPiece = {
          type: pieceType,
          shape: getPieceShape(pieceType, 0),
          position: { x: 4, y: 0 },
          rotation: 0,
        };

        state.canHold = true;
      }
    },
    clearLines: (state) => {
      const newBoard = state.board.filter((row) => row.some((cell) => cell === null));
      const clearedLines = 20 - newBoard.length;

      if (clearedLines > 0) {
        // Add empty rows at the top
        for (let i = 0; i < clearedLines; i++) {
          newBoard.unshift(Array(10).fill(null));
        }

        state.board = newBoard;
        state.lines += clearedLines;
        state.level = Math.floor(state.lines / 10) + 1;
        state.fallSpeed = Math.max(50, 1000 - (state.level - 1) * 50);

        // Calculate score based on level and lines cleared
        const lineScores = [0, 40, 100, 300, 1200];
        state.score += lineScores[clearedLines] * state.level;
      }
    },
  },
});

// Tetromino shapes
const SHAPES = {
  I: [
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  ],
  O: [
    [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  T: [
    [
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  S: [
    [
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  Z: [
    [
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  J: [
    [
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  L: [
    [
      [0, 0, 1, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
};

export const getPieceShape = (type: TetrominoType, rotation: number): number[][] => {
  return SHAPES[type][rotation % 4];
};

export const {
  reset,
  setLoading,
  setScore,
  addScore,
  setLines,
  addLines,
  setLevel,
  setStatus,
  setFallSpeed,
  setHold,
  setBoard,
  setCurrentPiece,
  setNextPieces,
  setHoldPiece,
  setLastDrop,
  setKeys,
  spawnPiece,
  clearLines,
} = tetris.actions;

export default tetris.reducer;
