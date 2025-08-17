import LoginPage from "./pages/auth/LoginPage";
import SelectUserTypePage from "./pages/auth/SelectUserTypePage";
import RequiredFieldsPage from "./pages/auth/RequiredFieldsPage";
import OptionalFieldsPage from "./pages/auth/OptionalFieldsPage";
import ProfilePage from "./pages/auth/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";
import { Navigate } from "react-router-dom";

  // Admin pages
  import AdminProfile from "./pages/admin/AdminProfile";
  import Analytics from "./pages/admin/Analytics";
  import SystemManagement from "./pages/admin/SystemManagement";
  import UserManagement from "./pages/admin/UserManagement";
  import BannersPage from "./pages/admin/BannersPage";
  import AdminDashboard from "./pages/admin/dashboard";

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

// Coach pages
import CoachDashboard from "./pages/coach/dashboard";
import CoachProfile from "./pages/coach/CoachProfile";
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
import PartnerDashboard from "./pages/partner/Dashboard";
import BusinessProfile from "./pages/partner/BusinessProfile";
import PartnerCourtManagement from "./pages/partner/CourtManagement";
import BusinessMicrosite from "./pages/partner/BusinessMicrosite";
import PartnerAnalytics from "./pages/partner/Analytics";

// State pages
import StateDashboard from "./pages/state/Dashboard";
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

  // Player-specific routes
  {
    key: 'player-dashboard',
    path: '/player/dashboard',
    element: <PlayerDashboard />,
    public: false
  },
  {
    key: 'player-profile',
    path: '/player/profile',
    element: <PlayerProfile />,
    public: false
  },

  // Coach-specific routes
  {
    key: 'coach-dashboard',
    path: '/coach/dashboard',
    element: <CoachDashboard />,
    public: false
  },
  {
    key: 'coach-profile',
    path: '/coach/profile',
    element: <CoachProfile />,
    public: false
  },
  {
    key: 'coach-credentials',
    path: '/coach/credentials',
    element: <Credentials />,
    public: false
  },
  {
    key: 'coach-students',
    path: '/coach/students',
    element: <Students />,
    public: false
  },
  {
    key: 'coach-sessions',
    path: '/coach/sessions',
    element: <Sessions />,
    public: false
  },
  {
    key: 'coach-certifications',
    path: '/coach/certifications',
    element: <Certifications />,
    public: false
  },

  // Club-specific routes
  {
    key: 'club-dashboard',
    path: '/club/dashboard',
    element: <ClubDashboard />,
    public: false
  },
  {
    key: 'club-profile',
    path: '/club/profile',
    element: <ClubProfile />,
    public: false
  },
  {
    key: 'club-courts',
    path: '/club/courts',
    element: <ClubCourtManagement />,
    public: false
  },
  {
    key: 'club-members',
    path: '/club/members',
    element: <ClubMemberManagement />,
    public: false
  },
  {
    key: 'club-microsite',
    path: '/club/microsite',
    element: <ClubMicrosite />,
    public: false
  },

  // Partner-specific routes
  {
    key: 'partner-dashboard',
    path: '/partner/dashboard',
    element: <PartnerDashboard />,
    public: false
  },
  {
    key: 'partner-profile',
    path: '/partner/profile',
    element: <BusinessProfile />,
    public: false
  },
  {
    key: 'partner-courts',
    path: '/partner/courts',
    element: <PartnerCourtManagement />,
    public: false
  },
  {
    key: 'partner-microsite',
    path: '/partner/microsite',
    element: <BusinessMicrosite />,
    public: false
  },
  {
    key: 'partner-analytics',
    path: '/partner/analytics',
    element: <PartnerAnalytics />,
    public: false
  },

  // State-specific routes
  {
    key: 'state-dashboard',
    path: '/state/dashboard',
    element: <StateDashboard />,
    public: false
  },
  {
    key: 'state-profile',
    path: '/state/profile',
    element: <StateProfile />,
    public: false
  },
  {
    key: 'state-members',
    path: '/state/members',
    element: <StateMemberManagement />,
    public: false
  },
  {
    key: 'state-courts',
    path: '/state/courts',
    element: <StateCourtManagement />,
    public: false
  },
  {
    key: 'state-microsite',
    path: '/state/microsite',
    element: <StateMicrosite />,
    public: false
  },
  {
    key: 'state-announcements',
    path: '/state/announcements',
    element: <Announcements />,
    public: false
  },
  {
    key: 'state-statistics',
    path: '/state/statistics',
    element: <Statistics />,
    public: false
  },

  // Admin-specific routes
  {
    key: 'admin-dashboard',
    path: '/admin/dashboard',
    element: <AdminDashboard />,
    public: false
  },
  {
    key: 'admin-profile',
    path: '/admin/profile',
    element: <AdminProfile />,
    public: false
  },
  {
    key: 'admin-users',
    path: '/admin/users',
    element: <UserManagement />,
    public: false
  },
  {
    key: 'admin-system',
    path: '/admin/system',
    element: <SystemManagement />,
    public: false
  },
  {
    key: 'admin-analytics',
    path: '/admin/analytics',
    element: <Analytics />,
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
    element: <BannersPage />,
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
    element: <ProfilePage />,
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