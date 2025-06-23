import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Roles } from '../user/api/types';

export interface SessionState {
  userId: number | null;
  role: Roles | null;
  name: string | null;
  followedProductIds: number[];
  isInitialized: boolean;
}

const initialState: SessionState = {
  userId: null,
  role: null,
  name: null,
  followedProductIds: [],
  isInitialized: false,
};

// const initialState: SessionState = {
//   userId: 1,
//   role: "ROLE_USER" as Roles,
// };

// const initialState: SessionState = {
//   userId: 2,
//   role: "ROLE_ADMIN" as Roles,
// };


const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Omit<SessionState, 'isInitialized'>>) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.followedProductIds = action.payload.followedProductIds;
      state.isInitialized = true;
    },
    updateFollowedIds: (state, action: PayloadAction<number[]>) => {
      state.followedProductIds = action.payload;
    },
    clearSession: (state) => {
      state.userId = null;
      state.role = null;
      state.name = null;
      state.followedProductIds = [];
      state.isInitialized = true;
    },
  },
});

export const { setSession, clearSession, updateFollowedIds } = sessionSlice.actions;

export default sessionSlice.reducer;
