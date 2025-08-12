import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import {
  loginUser,
  registerUser,
  getProfile,
} from '../store/slices/authSlice';
import {
  fetchUsers,
  fetchPlayers,
  fetchUser,
  updateUser,
} from '../store/slices/usersSlice';
import {
  fetchClubs,
  fetchClub,
  createClub,
  fetchClubCourts,
  fetchClubTournaments,
} from '../store/slices/clubsSlice';
import {
  fetchTournaments,
  fetchUpcomingTournaments,
  fetchTournament,
  createTournament,
  registerForTournament,
} from '../store/slices/tournamentsSlice';
import {
  fetchCourts,
  fetchCourt,
  createCourt,
  bookCourt,
  getCourtAvailability,
  getCourtBookings,
} from '../store/slices/courtsSlice';
import {
  fetchPayments,
  createPayment,
  processPayment,
} from '../store/slices/paymentsSlice';
import {
  fetchRankings,
  fetchTopPlayers,
  fetchUserRankings,
} from '../store/slices/rankingsSlice';
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from '../store/slices/notificationsSlice';
import {
  fetchDashboardStats,
  fetchAdminUsers,
  updateUserRole,
} from '../store/slices/adminSlice';
import {
  fetchOverviewStats,
  fetchUserStats,
} from '../store/slices/statsSlice';
import {
  fetchBanners,
  fetchCarouselBanners,
  fetchActiveBanners,
  createBanner,
  updateBanner,
  deleteBanner,
  toggleBannerStatus,
  updateBannerPosition,
  trackBannerView,
  trackBannerClick,
} from '../store/slices/bannersSlice';
import {
  searchPlayers,
  fetchNearbyPlayers,
  fetchPlayerFinderPreferences,
  updatePlayerFinderPreferences,
  togglePlayerFinderStatus,
  fetchPlayerFinderStats,
  sendMatchRequest,
} from '../store/slices/playerFinderSlice';
import {
  createCourtReservation,
  fetchCourtReservations,
  cancelCourtReservation,
} from '../store/slices/courtReservationsSlice';



// Auth hooks
export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const login = useCallback(
    (credentials: { email: string; password: string }) => {
      return dispatch(loginUser(credentials));
    },
    [dispatch]
  );

  const register = useCallback(
    (userData: any) => {
      return dispatch(registerUser(userData));
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    dispatch({ type: 'auth/logout' });
  }, [dispatch]);

  const getProfileData = useCallback(() => {
    return dispatch(getProfile());
  }, [dispatch]);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    getProfile: getProfileData,
  };
}

// Users hooks
export function useUsers() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, currentUser, loading, error, pagination } = useSelector(
    (state: RootState) => state.users
  );

  const fetchUsersData = useCallback(
    (params: any) => {
      return dispatch(fetchUsers(params));
    },
    [dispatch]
  );

  const fetchPlayersData = useCallback(
    (params: any) => {
      return dispatch(fetchPlayers(params));
    },
    [dispatch]
  );

  const fetchUserData = useCallback(
    (id: string) => {
      return dispatch(fetchUser(id));
    },
    [dispatch]
  );

  const updateUserData = useCallback(
    (id: string, userData: any) => {
      return dispatch(updateUser({ id, userData }));
    },
    [dispatch]
  );

  return {
    users,
    currentUser,
    loading,
    error,
    pagination,
    fetchUsers: fetchUsersData,
    fetchPlayers: fetchPlayersData,
    fetchUser: fetchUserData,
    updateUser: updateUserData,
  };
}

// Clubs hooks
export function useClubs() {
  const dispatch = useDispatch<AppDispatch>();
  const { clubs, currentClub, loading, error, pagination } = useSelector(
    (state: RootState) => state.clubs
  );

  const fetchClubsData = useCallback(
    (params: any) => {
      return dispatch(fetchClubs(params));
    },
    [dispatch]
  );

  const fetchClubData = useCallback(
    (id: string) => {
      return dispatch(fetchClub(id));
    },
    [dispatch]
  );

  const createClubData = useCallback(
    (clubData: any) => {
      return dispatch(createClub(clubData));
    },
    [dispatch]
  );

  const fetchClubCourtsData = useCallback(
    (clubId: string) => {
      return dispatch(fetchClubCourts(clubId));
    },
    [dispatch]
  );

  const fetchClubTournamentsData = useCallback(
    (clubId: string) => {
      return dispatch(fetchClubTournaments(clubId));
    },
    [dispatch]
  );

  return {
    clubs,
    currentClub,
    loading,
    error,
    pagination,
    fetchClubs: fetchClubsData,
    fetchClub: fetchClubData,
    createClub: createClubData,
    fetchClubCourts: fetchClubCourtsData,
    fetchClubTournaments: fetchClubTournamentsData,
  };
}

// Tournaments hooks
export function useTournaments() {
  const dispatch = useDispatch<AppDispatch>();
  const { tournaments, currentTournament, upcomingTournaments, loading, error, pagination } = useSelector(
    (state: RootState) => state.tournaments
  );

  const fetchTournamentsData = useCallback(
    (params: any) => {
      return dispatch(fetchTournaments(params));
    },
    [dispatch]
  );

  const fetchUpcomingTournamentsData = useCallback(
    (limit: number = 5) => {
      return dispatch(fetchUpcomingTournaments(limit));
    },
    [dispatch]
  );

  const fetchTournamentData = useCallback(
    (id: string) => {
      return dispatch(fetchTournament(id));
    },
    [dispatch]
  );

  const createTournamentData = useCallback(
    (tournamentData: any) => {
      return dispatch(createTournament(tournamentData));
    },
    [dispatch]
  );

  const registerForTournamentData = useCallback(
    (tournamentId: string, registrationData: any) => {
      return dispatch(registerForTournament({ tournamentId, registrationData }));
    },
    [dispatch]
  );

  return {
    tournaments,
    currentTournament,
    upcomingTournaments,
    loading,
    error,
    pagination,
    fetchTournaments: fetchTournamentsData,
    fetchUpcomingTournaments: fetchUpcomingTournamentsData,
    fetchTournament: fetchTournamentData,
    createTournament: createTournamentData,
    registerForTournament: registerForTournamentData,
  };
}

// Courts hooks
export function useCourts() {
  const dispatch = useDispatch<AppDispatch>();
  const { courts, currentCourt, loading, error, pagination } = useSelector(
    (state: RootState) => state.courts
  );

  const fetchCourtsData = useCallback(
    (params: any) => {
      return dispatch(fetchCourts(params));
    },
    [dispatch]
  );

  const fetchCourtData = useCallback(
    (id: string) => {
      return dispatch(fetchCourt(id));
    },
    [dispatch]
  );

  const createCourtData = useCallback(
    (courtData: any) => {
      return dispatch(createCourt(courtData));
    },
    [dispatch]
  );

  const bookCourtData = useCallback(
    (courtId: string, bookingData: any) => {
      return dispatch(bookCourt({ courtId, bookingData }));
    },
    [dispatch]
  );

  const getCourtAvailabilityData = useCallback(
    (courtId: string, params: any) => {
      return dispatch(getCourtAvailability({ courtId, params }));
    },
    [dispatch]
  );

  const getCourtBookingsData = useCallback(
    (courtId: string, params: any) => {
      return dispatch(getCourtBookings({ courtId, params }));
    },
    [dispatch]
  );

  return {
    courts,
    currentCourt,
    loading,
    error,
    pagination,
    fetchCourts: fetchCourtsData,
    fetchCourt: fetchCourtData,
    createCourt: createCourtData,
    bookCourt: bookCourtData,
    getCourtAvailability: getCourtAvailabilityData,
    getCourtBookings: getCourtBookingsData,
  };
}

// Payments hooks
export function usePayments() {
  const dispatch = useDispatch<AppDispatch>();
  const { payments, currentPayment, loading, error, pagination } = useSelector(
    (state: RootState) => state.payments
  );

  const fetchPaymentsData = useCallback(
    (params: any) => {
      return dispatch(fetchPayments(params));
    },
    [dispatch]
  );

  const createPaymentData = useCallback(
    (paymentData: any) => {
      return dispatch(createPayment(paymentData));
    },
    [dispatch]
  );

  const processPaymentData = useCallback(
    (paymentId: string, paymentData: any) => {
      return dispatch(processPayment({ paymentId, paymentData }));
    },
    [dispatch]
  );

  return {
    payments,
    currentPayment,
    loading,
    error,
    pagination,
    fetchPayments: fetchPaymentsData,
    createPayment: createPaymentData,
    processPayment: processPaymentData,
  };
}

// Rankings hooks
export function useRankings() {
  const dispatch = useDispatch<AppDispatch>();
  const { rankings, topPlayers, userRankings, loading, error, pagination } = useSelector(
    (state: RootState) => state.rankings
  );

  const fetchRankingsData = useCallback(
    (params: any) => {
      return dispatch(fetchRankings(params));
    },
    [dispatch]
  );

  const fetchTopPlayersData = useCallback(
    (params: any) => {
      return dispatch(fetchTopPlayers(params));
    },
    [dispatch]
  );

  const fetchUserRankingsData = useCallback(
    (userId: string) => {
      return dispatch(fetchUserRankings(userId));
    },
    [dispatch]
  );

  return {
    rankings,
    topPlayers,
    userRankings,
    loading,
    error,
    pagination,
    fetchRankings: fetchRankingsData,
    fetchTopPlayers: fetchTopPlayersData,
    fetchUserRankings: fetchUserRankingsData,
  };
}

// Notifications hooks
export function useNotifications() {
  const dispatch = useDispatch<AppDispatch>();
  const { notifications, loading, error, pagination, unreadCount } = useSelector(
    (state: RootState) => state.notifications
  );

  const fetchNotificationsData = useCallback(
    (params: any) => {
      return dispatch(fetchNotifications(params));
    },
    [dispatch]
  );

  const markNotificationAsReadData = useCallback(
    (notificationId: string) => {
      return dispatch(markNotificationAsRead(notificationId));
    },
    [dispatch]
  );

  const markAllNotificationsAsReadData = useCallback(() => {
    return dispatch(markAllNotificationsAsRead());
  }, [dispatch]);

  return {
    notifications,
    loading,
    error,
    pagination,
    unreadCount,
    fetchNotifications: fetchNotificationsData,
    markNotificationAsRead: markNotificationAsReadData,
    markAllNotificationsAsRead: markAllNotificationsAsReadData,
  };
}

// Admin hooks
export function useAdmin() {
  const dispatch = useDispatch<AppDispatch>();
  const { dashboardStats, adminUsers, loading, error, pagination } = useSelector(
    (state: RootState) => state.admin
  );

  const fetchDashboardStatsData = useCallback(() => {
    return dispatch(fetchDashboardStats());
  }, [dispatch]);

  const fetchAdminUsersData = useCallback(
    (params: any) => {
      return dispatch(fetchAdminUsers(params));
    },
    [dispatch]
  );

  const updateUserRoleData = useCallback(
    (userId: string, roleData: any) => {
      return dispatch(updateUserRole({ userId, roleData }));
    },
    [dispatch]
  );

  return {
    dashboardStats,
    adminUsers,
    loading,
    error,
    pagination,
    fetchDashboardStats: fetchDashboardStatsData,
    fetchAdminUsers: fetchAdminUsersData,
    updateUserRole: updateUserRoleData,
  };
}

// Stats hooks
export function useStats() {
  const dispatch = useDispatch<AppDispatch>();
  const { overviewStats, userStats, loading, error } = useSelector(
    (state: RootState) => state.stats
  );

  const fetchOverviewStatsData = useCallback(() => {
    return dispatch(fetchOverviewStats());
  }, [dispatch]);

  const fetchUserStatsData = useCallback(
    (params: any) => {
      return dispatch(fetchUserStats(params));
    },
    [dispatch]
  );

  return {
    overviewStats,
    userStats,
    loading,
    error,
    fetchOverviewStats: fetchOverviewStatsData,
    fetchUserStats: fetchUserStatsData,
  };
}

// Banners hooks
export function useBanners() {
  const dispatch = useDispatch<AppDispatch>();
  const { banners, carouselBanners, activeBanners, currentBanner, loading, error, pagination } = useSelector(
    (state: RootState) => state.banners
  );

  const fetchBannersData = useCallback(
    (params: any) => {
      return dispatch(fetchBanners(params));
    },
    [dispatch]
  );

  const fetchCarouselBannersData = useCallback(() => {
    return dispatch(fetchCarouselBanners());
  }, [dispatch]);

  const fetchActiveBannersData = useCallback(
    (params: any) => {
      return dispatch(fetchActiveBanners(params));
    },
    [dispatch]
  );

  const createBannerData = useCallback(
    (bannerData: any) => {
      return dispatch(createBanner(bannerData));
    },
    [dispatch]
  );

  const updateBannerData = useCallback(
    (id: string, bannerData: any) => {
      return dispatch(updateBanner({ id, bannerData }));
    },
    [dispatch]
  );

  const deleteBannerData = useCallback(
    (id: string) => {
      return dispatch(deleteBanner(id));
    },
    [dispatch]
  );

  const toggleBannerStatusData = useCallback(
    (id: string) => {
      return dispatch(toggleBannerStatus(id));
    },
    [dispatch]
  );

  const updateBannerPositionData = useCallback(
    (id: string, position: number) => {
      return dispatch(updateBannerPosition({ id, position }));
    },
    [dispatch]
  );

  const trackBannerViewData = useCallback(
    (id: string) => {
      return dispatch(trackBannerView(id));
    },
    [dispatch]
  );

  const trackBannerClickData = useCallback(
    (id: string) => {
      return dispatch(trackBannerClick(id));
    },
    [dispatch]
  );

  return {
    banners,
    carouselBanners,
    activeBanners,
    currentBanner,
    loading,
    error,
    pagination,
    fetchBanners: fetchBannersData,
    fetchCarouselBanners: fetchCarouselBannersData,
    fetchActiveBanners: fetchActiveBannersData,
    createBanner: createBannerData,
    updateBanner: updateBannerData,
    deleteBanner: deleteBannerData,
    toggleBannerStatus: toggleBannerStatusData,
    updateBannerPosition: updateBannerPositionData,
    trackBannerView: trackBannerViewData,
    trackBannerClick: trackBannerClickData,
  };
}

// Player Finder hooks
export function usePlayerFinder() {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, nearbyPlayers, preferences, stats, loading, error, pagination } = useSelector(
    (state: RootState) => state.playerFinder
  );

  const searchPlayersData = useCallback(
    (params: any) => {
      return dispatch(searchPlayers(params));
    },
    [dispatch]
  );

  const fetchNearbyPlayersData = useCallback(
    (limit: number = 10) => {
      return dispatch(fetchNearbyPlayers(limit));
    },
    [dispatch]
  );

  const fetchPlayerFinderPreferencesData = useCallback(() => {
    return dispatch(fetchPlayerFinderPreferences());
  }, [dispatch]);

  const updatePlayerFinderPreferencesData = useCallback(
    (preferences: any) => {
      return dispatch(updatePlayerFinderPreferences(preferences));
    },
    [dispatch]
  );

  const togglePlayerFinderStatusData = useCallback(() => {
    return dispatch(togglePlayerFinderStatus());
  }, [dispatch]);

  const fetchPlayerFinderStatsData = useCallback(() => {
    return dispatch(fetchPlayerFinderStats());
  }, [dispatch]);

  const sendMatchRequestData = useCallback(
    (targetUserId: string, requestData: any) => {
      return dispatch(sendMatchRequest({ targetUserId, requestData }));
    },
    [dispatch]
  );

  return {
    searchResults,
    nearbyPlayers,
    preferences,
    stats,
    loading,
    error,
    pagination,
    searchPlayers: searchPlayersData,
    fetchNearbyPlayers: fetchNearbyPlayersData,
    fetchPlayerFinderPreferences: fetchPlayerFinderPreferencesData,
    updatePlayerFinderPreferences: updatePlayerFinderPreferencesData,
    togglePlayerFinderStatus: togglePlayerFinderStatusData,
    fetchPlayerFinderStats: fetchPlayerFinderStatsData,
    sendMatchRequest: sendMatchRequestData,
  };
}

// Court Reservations hooks
export function useCourtReservations() {
  const dispatch = useDispatch<AppDispatch>();
  const { reservations, currentReservation, courtAvailability, courtBookings, loading, error, pagination } = useSelector(
    (state: RootState) => state.courtReservations
  );

  const createCourtReservationData = useCallback(
    (courtId: string, bookingData: any) => {
      return dispatch(createCourtReservation({ courtId, bookingData }));
    },
    [dispatch]
  );

  const fetchCourtReservationsData = useCallback(
    (params: any) => {
      return dispatch(fetchCourtReservations(params));
    },
    [dispatch]
  );

  const getCourtAvailabilityData = useCallback(
    (courtId: string, params: any) => {
      return dispatch(getCourtAvailability({ courtId, params }));
    },
    [dispatch]
  );

  const getCourtBookingsData = useCallback(
    (courtId: string, params: any) => {
      return dispatch(getCourtBookings({ courtId, params }));
    },
    [dispatch]
  );

  const cancelCourtReservationData = useCallback(
    (reservationId: string) => {
      return dispatch(cancelCourtReservation(reservationId));
    },
    [dispatch]
  );

  return {
    reservations,
    currentReservation,
    courtAvailability,
    courtBookings,
    loading,
    error,
    pagination,
    createCourtReservation: createCourtReservationData,
    fetchCourtReservations: fetchCourtReservationsData,
    getCourtAvailability: getCourtAvailabilityData,
    getCourtBookings: getCourtBookingsData,
    cancelCourtReservation: cancelCourtReservationData,
  };
} 