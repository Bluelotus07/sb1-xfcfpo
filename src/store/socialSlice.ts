import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocialState {
  twitterFollowed: boolean;
  discordJoined: boolean;
  youtubeSubscribed: boolean;
  instagramFollowed: boolean;
  telegramJoined: boolean;
  socialMultiplier: number;
}

const initialState: SocialState = {
  twitterFollowed: false,
  discordJoined: false,
  youtubeSubscribed: false,
  instagramFollowed: false,
  telegramJoined: false,
  socialMultiplier: 1,
};

const socialSlice = createSlice({
  name: 'social',
  initialState,
  reducers: {
    toggleSocialPlatform: (state, action: PayloadAction<keyof Omit<SocialState, 'socialMultiplier'>>) => {
      const platform = action.payload;
      state[platform] = !state[platform];
      
      // Calculate multiplier based on connected platforms
      const connectedPlatforms = Object.values(state).filter(Boolean).length;
      state.socialMultiplier = 1 + (connectedPlatforms * 0.2); // 20% boost per platform
    },
  },
});

export const { toggleSocialPlatform } = socialSlice.actions;
export default socialSlice.reducer;