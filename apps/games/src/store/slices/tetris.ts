import { createSlice } from '@reduxjs/toolkit';

type TetrisState = {
  loading: boolean;
  score: number;
  lines: number;
  level: number;
  status: 'init' | 'ready' | 'playing' | 'paused' | 'gameOver';
  fallSpeed: number;
  canHold: boolean;
};

const initialState = {
  loading: true,
  score: 0,
  lines: 0,
  level: 1,
  status: 'init',
  fallSpeed: 1000,
  canHold: false,
} as TetrisState;

const tetris = createSlice({
  name: 'tetris',
  initialState,
  reducers: {
    reset: () => initialState,
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setScore: (state, { payload }) => {
      state.score = payload;
    },
    setLines: (state, { payload }) => {
      state.lines = payload;
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
  },
});

export const { reset, setLoading, setScore, setLines, setLevel, setStatus, setFallSpeed, setHold } = tetris.actions;

export default tetris.reducer;
