import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '@/05_entities/session/sessionSlice';
import { wishlistReducer } from '@/05_entities/wishlist/model/slice';
import { api } from '@/06_shared/api/api'; 

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    wishlist: wishlistReducer,
    [api.reducerPath]: api.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;