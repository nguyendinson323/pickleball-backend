import LoginPage from "./pages/auth/LoginPage";
import SelectUserTypePage from "./pages/auth/SelectUserTypePage";
import RequiredFieldsPage from "./pages/auth/RequiredFieldsPage";
import OptionalFieldsPage from "./pages/auth/OptionalFieldsPage";
import ProfilePage from "./pages/auth/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import VerifyCredential from "./pages/VerifyCredential";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";

  // Admin pages
  import AdminProfile from "./pages/admin/AdminProfile";
import Analytics from "./pages/admin/Analytics";
import SystemManagement from "./pages/admin/SystemManagement";
import UserManagement from "./pages/admin/UserManagement";
import BannersPage from "./pages/admin/BannersPage";
import AdminDashboard from "./pages/admin/dashboard";
import DigitalCredentialsManagement from "./pages/admin/DigitalCredentialsManagement";
import CourtReservationDashboard from "./pages/admin/CourtReservationDashboard";
import TournamentsManagementPage from "./pages/admin/TournamentsManagementPage";
import MessagingCenter from "./pages/admin/MessagingCenter";
import CoachRefereeProfile from "./pages/coach/CoachRefereeProfile";
// Coach finder page
import CoachFinderPage from "./pages/common/CoachFinderPage";
// Coach profile component for public viewing
import CoachProfile from "./components/CoachProfile";

// Common pages (accessible to all logged-in users)
import ClubsPage from "./pages/common/ClubsPage";
import TournamentsPage from "./pages/common/TournamentsPage";
import Rankings from "./pages/common/Rankings";
import RankingsPage from "./pages/common/RankingsPage";
import PlayerFinderPage from "./pages/common/PlayerFinderPage";
import CourtReservationsPage from "./pages/common/CourtReservationsPage";
import FindCourt from "./pages/common/FindCourt";
import Membership from "./pages/common/Membership";
import MessagePage from "./pages/common/MessagePage";

// Home pages (public)
import About from "./pages/home/About";
import Events from "./pages/home/Events";
import News from "./pages/home/News";
import Contact from "./pages/home/Contact";
import Home from "./pages/home/Home";
import PrivacyPolicy from "./pages/home/PrivacyPolicy";

// Player pages
import PlayerDashboard from "./pages/player/dashboard";
import PlayerProfile from "./pages/player/PlayerProfile";
import PlayerCredentials from "./pages/player/dashboard/Credentials";

// Coach pages
import CoachDashboard from "./pages/coach/dashboard";
import CoachProfilePage from "./pages/coach/CoachProfile";
import Credentials from "./pages/coach/Credentials";
import Students from "./pages/coach/Students";
import Sessions from "./pages/coach/Sessions";
import Certifications from "./pages/coach/Certifications";

// Club pages
import ClubDashboard from "./pages/club/dashboard";
import ClubProfile from "./pages/club/ClubProfile";
import ClubCourtManagement from "./pages/club/CourtManagement";
import ClubMemberManagement from "./pages/club/MemberManagement";
import ClubMicrosite from "./pages/club/ClubMicrosite";

// Partner pages
import PartnerDashboard from "./pages/partner/dashboard";
import BusinessProfile from "./pages/partner/BusinessProfile";
import PartnerCourtManagement from "./pages/partner/CourtManagement";
import BusinessMicrosite from "./pages/partner/BusinessMicrosite";
import PartnerAnalytics from "./pages/partner/Analytics";

// State pages
import StateDashboard from "./pages/state/dashboard";
import StateProfile from "./pages/state/StateProfile";
import StateMemberManagement from "./pages/state/MemberManagement";
import StateCourtManagement from "./pages/state/CourtManagement";
import StateMicrosite from "./pages/state/StateMicrosite";
import Announcements from "./pages/state/Announcements";
import Statistics from "./pages/state/Statistics";

const routes = [
  // Public routes
  {
    key: 'root',
    path: '/',
    element: <Home />,
    public: true
  },
  {
    key: 'about',
    path: '/about',
    element: <About />,
    public: true
  },
  {
    key: 'events',
    path: '/events',
    element: <Events />,
    public: true
  },
  {
    key: 'news',
    path: '/news',
    element: <News />,
    public: true
  },
  {
    key: 'contact',
    path: '/contact',
    element: <Contact />,
    public: true
  },
  {
    key: 'privacy-policy',
    path: '/privacy-policy',
    element: <PrivacyPolicy />,
    public: true
  },
  {
    key: 'login',
    path: '/login',
    element: <LoginPage />,
    public: true
  },
  {
    key: 'register',
    path: '/register',
    element: <SelectUserTypePage />,
    public: true
  },
  {
    key: 'register-select-type',
    path: '/register/select-type',
    element: <SelectUserTypePage />,
    public: true
  },
  {
    key: 'register-required-fields',
    path: '/register/required-fields',
    element: <RequiredFieldsPage />,
    public: true
  },
  {
    key: 'register-optional-fields',
    path: '/register/optional-fields',
    element: <OptionalFieldsPage />,
    public: true
  },
  {
    key: 'verify-credential',
    path: '/verify-credential/:verificationCode',
    element: <VerifyCredential />,
    public: true
  },

  // Common functionality routes (accessible to all logged-in users)
  {
    key: 'tournaments',
    path: '/tournaments',
    element: <TournamentsPage />,
    public: true
  },
  {
    key: 'rankings',
    path: '/rankings',
    element: <Rankings />,
    public: true
  },
  {
    key: 'rankings-page',
    path: '/rankings-page',
    element: <RankingsPage />,
    public: true
  },
  {
    key: 'find-court',
    path: '/find-court',
    element: <FindCourt />,
    public: true
  },
  {
    key: 'player-finder',
    path: '/player-finder',
    element: <PlayerFinderPage />,
    public: true
  },
  {
    key: 'clubs',
    path: '/clubs',
    element: <ClubsPage />,
    public: true
  },
  {
    key: 'court-reservations',
    path: '/court-reservations',
    element: <CourtReservationsPage />,
    public: true
  },
  {
    key: 'membership',
    path: '/membership',
    element: <Membership />,
    public: true
  },
  {
    key: 'messages',
    path: '/messages',
    element: <MessagePage />,
    public: true
  },
  {
    key: 'coach-finder',
    path: '/coach-finder',
    element: <CoachFinderPage />,
    public: true
  },
  {
    key: 'coach-profile-public',
    path: '/coaches/:coachId/profile',
    element: <CoachProfile />,
    public: true
  },

  // Player-specific routes
  {
    key: 'player',
    path: '/player',
    element: <ProtectedRoute allowedRoles={['player']}><PlayerDashboard /></ProtectedRoute>,
    public: false
  },
  {
    key: 'player-dashboard',
    path: '/player/dashboard',
    element: <ProtectedRoute allowedRoles={['player']}><PlayerDashboard /></ProtectedRoute>,
    public: false
  },
  {
    key: 'player-profile',
    path: '/player/profile',
    element: <ProtectedRoute allowedRoles={['player']}><PlayerProfile /></ProtectedRoute>,
    public: false
  },
  {
    key: 'player-credentials',
    path: '/player/credentials',
    element: <ProtectedRoute allowedRoles={['player']}><PlayerCredentials /></ProtectedRoute>,
    public: false
  },

  // Coach-specific routes
  {
    key: 'coach',
    path: '/coach',
    element: <ProtectedRoute allowedRoles={['coach']}><CoachDashboard /></ProtectedRoute>,
    public: false
  },
  {
    key: 'coach-dashboard',
    path: '/coach/dashboard',
    element: <ProtectedRoute allowedRoles={['coach']}><CoachDashboard /></ProtectedRoute>,
    public: false
  },
  {
    key: 'coach-profile',
    path: '/coach/profile',
    element: <ProtectedRoute allowedRoles={['coach']}><CoachProfilePage /></ProtectedRoute>,
    public: false
  },
  {
    key: 'coach-referee',
    path: '/coach/referee',
    element: <ProtectedRoute allowedRoles={['coach']}><CoachRefereeProfile /></ProtectedRoute>,
    public: false
  },
  {
    key: 'coach-credentials',
    path: '/coach/credentials',
    element: <ProtectedRoute allowedRoles={['coach']}><Credentials /></ProtectedRoute>,
    public: false
  },
  {
    key: 'coach-students',
    path: '/coach/students',
    element: <ProtectedRoute allowedRoles={['coach']}><Students /></ProtectedRoute>,
    public: false
  },
  {
    key: 'coach-sessions',
    path: '/coach/sessions',
    element: <ProtectedRoute allowedRoles={['coach']}><Sessions /></ProtectedRoute>,
    public: false
  },
  {
    key: 'coach-certifications',
    path: '/coach/certifications',
    element: <ProtectedRoute allowedRoles={['coach']}><Certifications /></ProtectedRoute>,
    public: false
  },

  // Club-specific routes
  {
    key: 'club',
    path: '/club',
    element: <ProtectedRoute allowedRoles={['club']}><ClubDashboard /></ProtectedRoute>,
    public: false
  },
  {
    key: 'club-dashboard',
    path: '/club/dashboard',
    element: <ProtectedRoute allowedRoles={['club']}><ClubDashboard /></ProtectedRoute>,
    public: false
  },
  {
    key: 'club-profile',
    path: '/club/profile',
    element: <ProtectedRoute allowedRoles={['club']}><ClubProfile /></ProtectedRoute>,
    public: false
  },
  {
    key: 'club-courts',
    path: '/club/courts',
    element: <ProtectedRoute allowedRoles={['club']}><ClubCourtManagement /></ProtectedRoute>,
    public: false
  },
  {
    key: 'club-members',
    path: '/club/members',
    element: <ProtectedRoute allowedRoles={['club']}><ClubMemberManagement /></ProtectedRoute>,
    public: false
  },
  {
    key: 'club-microsite',
    path: '/club/microsite',
    element: <ProtectedRoute allowedRoles={['club']}><ClubMicrosite /></ProtectedRoute>,
    public: false
  },

  // Partner-specific routes
  {
    key: 'partner',
    path: '/partner',
    element: <ProtectedRoute allowedRoles={['partner']}><PartnerDashboard /></ProtectedRoute>,
    public: false
  },
  {
    key: 'partner-dashboard',
    path: '/partner/dashboard',
    element: <ProtectedRoute allowedRoles={['partner']}><PartnerDashboard /></ProtectedRoute>,
    public: false
  },
  {
    key: 'partner-profile',
    path: '/partner/profile',
    element: <ProtectedRoute allowedRoles={['partner']}><BusinessProfile /></ProtectedRoute>,
    public: false
  },
  {
    key: 'partner-courts',
    path: '/partner/courts',
    element: <ProtectedRoute allowedRoles={['partner']}><PartnerCourtManagement /></ProtectedRoute>,
    public: false
  },
  {
    key: 'partner-microsite',
    path: '/partner/microsite',
    element: <ProtectedRoute allowedRoles={['partner']}><BusinessMicrosite /></ProtectedRoute>,
    public: false
  },
  {
    key: 'partner-analytics',
    path: '/partner/analytics',
    element: <ProtectedRoute allowedRoles={['partner']}><PartnerAnalytics /></ProtectedRoute>,
    public: false
  },

  // State-specific routes
  {
    key: 'state',
    path: '/state',
    element: <ProtectedRoute allowedRoles={['state']}><StateDashboard /></ProtectedRoute>,
    public: false
  },
  {
    key: 'state-dashboard',
    path: '/state/dashboard',
    element: <ProtectedRoute allowedRoles={['state']}><StateDashboard /></ProtectedRoute>,
    public: false
  },
  {
    key: 'state-profile',
    path: '/state/profile',
    element: <ProtectedRoute allowedRoles={['state']}><StateProfile /></ProtectedRoute>,
    public: false
  },
  {
    key: 'state-members',
    path: '/state/members',
    element: <ProtectedRoute allowedRoles={['state']}><StateMemberManagement /></ProtectedRoute>,
    public: false
  },
  {
    key: 'state-courts',
    path: '/state/courts',
    element: <ProtectedRoute allowedRoles={['state']}><StateCourtManagement /></ProtectedRoute>,
    public: false
  },
  {
    key: 'state-microsite',
    path: '/state/microsite',
    element: <ProtectedRoute allowedRoles={['state']}><StateMicrosite /></ProtectedRoute>,
    public: false
  },
  {
    key: 'state-announcements',
    path: '/state/announcements',
    element: <ProtectedRoute allowedRoles={['state']}><Announcements /></ProtectedRoute>,
    public: false
  },
  {
    key: 'state-statistics',
    path: '/state/statistics',
    element: <ProtectedRoute allowedRoles={['state']}><Statistics /></ProtectedRoute>,
    public: false
  },

  // Admin-specific routes
  {
    key: 'admin-dashboard',
    path: '/admin/dashboard',
    element: <ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>,
    public: false
  },
  {
    key: 'admin-profile',
    path: '/admin/profile',
    element: <ProtectedRoute allowedRoles={['admin']}><AdminProfile /></ProtectedRoute>,
    public: false
  },
  {
    key: 'admin-users',
    path: '/admin/users',
    element: <ProtectedRoute allowedRoles={['admin']}><UserManagement /></ProtectedRoute>,
    public: false
  },
  {
    key: 'admin-system',
    path: '/admin/system',
    element: <ProtectedRoute allowedRoles={['admin']}><SystemManagement /></ProtectedRoute>,
    public: false
  },
  {
    key: 'admin-analytics',
    path: '/admin/analytics',
    element: <ProtectedRoute allowedRoles={['admin']}><Analytics /></ProtectedRoute>,
    public: false
  },

  // Admin routes
  {
    key: 'admin',
    path: '/admin',
    element: <Navigate to="/admin/dashboard" replace />,
    public: false
  },
  {
    key: 'banners',
    path: '/admin/banners',
    element: <ProtectedRoute allowedRoles={['admin']}><BannersPage /></ProtectedRoute>,
    public: false
  },
  {
    key: 'admin-digital-credentials',
    path: '/admin/digital-credentials',
    element: <ProtectedRoute allowedRoles={['admin']}><DigitalCredentialsManagement /></ProtectedRoute>,
    public: false
  },
  {
    key: 'admin-court-reservations',
    path: '/admin/court-reservations',
    element: <ProtectedRoute allowedRoles={['admin']}><CourtReservationDashboard /></ProtectedRoute>,
    public: false
  },
  {
    key: 'admin-tournaments',
    path: '/admin/tournaments',
    element: <ProtectedRoute allowedRoles={['admin']}><TournamentsManagementPage /></ProtectedRoute>,
    public: false
  },
  {
    key: 'admin-messaging',
    path: '/admin/messaging',
    element: <ProtectedRoute allowedRoles={['admin']}><MessagingCenter /></ProtectedRoute>,
    public: false
  },
  {
    key: 'admin-settings',
    path: '/admin/settings',
    element: <Navigate to="/admin/system" replace />,
    public: false
  },
  {
    key: 'admin-payments',
    path: '/admin/payments',
    element: <Navigate to="/admin/analytics" replace />,
    public: false
  },
  {
    key: 'admin-content',
    path: '/admin/content',
    element: <Navigate to="/admin/system" replace />,
    public: false
  },

  // Legacy routes (keeping for backward compatibility)
  {
    key: 'profile',
    path: '/profile',
    element: <ProtectedRoute allowedRoles={['player', 'coach', 'club', 'partner', 'state', 'admin']}><ProfilePage /></ProtectedRoute>,
    public: false
  },

  // 404 route
  {
    key: '404',
    path: '*',
    element: <NotFoundPage />,
    public: true
  }
]

export default routes;