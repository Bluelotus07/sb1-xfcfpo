import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  taps: number;
  level: number;
  coins: number;
  multiplier: number;
  autoTapActive: boolean;
}

const initialState: GameState = {
  taps: 0,
  level: 0,
  coins: 0,
  multiplier: 1,
  autoTapActive: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    incrementTaps: (state) => {
      state.taps += 1;
      state.coins += state.multiplier;
    },
    setMultiplier: (state, action: PayloadAction<number>) => {
      state.multiplier = action.payload;
    },
    toggleAutoTap: (state) => {
      state.autoTapActive = !state.autoTapActive;
    },
    incrementLevel: (state) => {
      state.level += 1;
    },
  },
});

export const { incrementTaps, setMultiplier, toggleAutoTap, incrementLevel } = gameSlice.actions;
export default gameSlice.reducer;