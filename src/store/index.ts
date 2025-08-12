import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import usersReducer from './slices/usersSlice'
import clubsReducer from './slices/clubsSlice'
import tournamentsReducer from './slices/tournamentsSlice'
import courtsReducer from './slices/courtsSlice'
import paymentsReducer from './slices/paymentsSlice'
import rankingsReducer from './slices/rankingsSlice'
import notificationsReducer from './slices/notificationsSlice'
import adminReducer from './slices/adminSlice'
import statsReducer from './slices/statsSlice'
import bannersReducer from './slices/bannersSlice'
import playerFinderReducer from './slices/playerFinderSlice'
import courtReservationsReducer from './slices/courtReservationsSlice'
import pendingReducer from './slices/pendingSlice'

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
    banners: bannersReducer,
    playerFinder: playerFinderReducer,
    courtReservations: courtReservationsReducer,
    pending: pendingReducer,
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