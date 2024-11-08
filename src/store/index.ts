import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';
import userReducer from './userSlice';
import socialReducer from './socialSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    user: userReducer,
    social: socialReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;