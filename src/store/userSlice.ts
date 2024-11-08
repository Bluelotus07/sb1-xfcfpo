import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isPremium: boolean;
  referralCount: number;
  referralEarnings: number;
  dailyTasksCompleted: string[];
  lastDailyBonus: string | null;
  totalEarnings: number;
}

const initialState: UserState = {
  isPremium: false,
  referralCount: 0,
  referralEarnings: 0,
  dailyTasksCompleted: [],
  lastDailyBonus: null,
  totalEarnings: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPremiumStatus: (state, action: PayloadAction<boolean>) => {
      state.isPremium = action.payload;
    },
    addReferral: (state) => {
      state.referralCount += 1;
    },
    updateReferralEarnings: (state, action: PayloadAction<number>) => {
      state.referralEarnings += action.payload;
      state.totalEarnings += action.payload;
    },
    completeDailyTask: (state, action: PayloadAction<string>) => {
      if (!state.dailyTasksCompleted.includes(action.payload)) {
        state.dailyTasksCompleted.push(action.payload);
      }
    },
    claimDailyBonus: (state, action: PayloadAction<number>) => {
      state.lastDailyBonus = new Date().toISOString();
      state.totalEarnings += action.payload;
    },
    resetDailyTasks: (state) => {
      state.dailyTasksCompleted = [];
    },
  },
});

export const {
  setPremiumStatus,
  addReferral,
  updateReferralEarnings,
  completeDailyTask,
  claimDailyBonus,
  resetDailyTasks,
} = userSlice.actions;

export default userSlice.reducer;