import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type SectionInViewState = {
  current: number;
  maxIndex: number;
  direction: 'next' | 'prev' | null;
};

const initialState: SectionInViewState = {
  current: 0,
  maxIndex: 1,
  direction: null,
};

const sectionInView = createSlice({
  name: 'sectionInView',
  initialState,
  reducers: {
    setSection: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
    setMaxIndex: (state, action: PayloadAction<number>) => {
      state.maxIndex = action.payload;
    },
    nextSection: (state) => {
      if (state.current < state.maxIndex) {
        state.current += 1;
        state.direction = 'next';
      }
    },
    prevSection: (state) => {
      if (state.current > 0) {
        state.current -= 1;
        state.direction = 'prev';
      }
    },
    resetSection: (state) => {
      state.current = 0;
      state.direction = null;
    },
  },
});

export const { setSection, setMaxIndex, nextSection, prevSection, resetSection } = sectionInView.actions;
export default sectionInView.reducer;
