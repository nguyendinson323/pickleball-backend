import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import clubsReducer from './slices/clubsSlice';
import tournamentsReducer from './slices/tournamentsSlice';
import courtsReducer from './slices/courtsSlice';
import paymentsReducer from './slices/paymentsSlice';
import rankingsReducer from './slices/rankingsSlice';
import notificationsReducer from './slices/notificationsSlice';
import adminReducer from './slices/adminSlice';
import statsReducer from './slices/statsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    clubs: clubsReducer,
    tournaments: tournamentsReducer,
    courts: courtsReducer,
    payments: paymentsReducer,
    rankings: rankingsReducer,
    notifications: notificationsReducer,
    admin: adminReducer,
    stats: statsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 