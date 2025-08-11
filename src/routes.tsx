import LoginPage from "./pages/auth/LoginPage";
import SelectUserTypePage from "./pages/auth/SelectUserTypePage";
import RequiredFieldsPage from "./pages/auth/RequiredFieldsPage";
import OptionalFieldsPage from "./pages/auth/OptionalFieldsPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/auth/ProfilePage";
import AdminPage from "./pages/superAdmin/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import BannersPage from "./pages/superAdmin/BannersPage";

// Common pages (accessible to all logged-in users)
import ClubsPage from "./pages/common/ClubsPage";
import TournamentsPage from "./pages/common/TournamentsPage";
import Rankings from "./pages/common/Rankings";
import PlayerFinderPage from "./pages/common/PlayerFinderPage";
import CourtReservationsPage from "./pages/common/CourtReservationsPage";
import FindCourt from "./pages/common/FindCourt";
import Membership from "./pages/common/Membership";

// Home pages (public)
import About from "./pages/home/About";
import Events from "./pages/home/Events";
import News from "./pages/home/News";
import Contact from "./pages/home/Contact";
import Home from "./pages/home/Home";
import { PlayerProfile } from "./pages/player";


const routes = [
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
    key: 'rankings',
    path: '/rankings',
    element: <Rankings />,
    public: true
  },
  {
    key: 'membership',
    path: '/membership',
    element: <Membership />,
    public: true
  },
  {
    key: 'find-court',
    path: '/find-court',
    element: <FindCourt />,
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
    key: 'clubs',
    path: '/clubs',
    element: <ClubsPage />,
    public: true
  },
  {
    key: 'tournaments',
    path: '/tournaments',
    element: <TournamentsPage />,
    public: true
  },
  {
    key: 'player-finder',
    path: '/player-finder',
    element: <PlayerFinderPage />,
    public: true
  },
  {
    key: 'court-reservations',
    path: '/court-reservations',
    element: <CourtReservationsPage />,
    public: true
  },
  // Public messages page for everyone
  {
    key: 'messages',
    path: '/messages',
    element: <DashboardPage />,
    public: true
  },
  // Legacy dashboard routes (keeping for backward compatibility)
  {
    key: 'dashboard',
    path: '/dashboard',
    element: <DashboardPage />,
    public: false
  },
  // Legacy profile route (keeping for backward compatibility)
  {
    key: 'profile',
    path: '/profile',
    element: <ProfilePage />,
    public: false
  },
  // Player-specific routes
  {
    key: 'player-dashboard',
    path: '/player/dashboard',
    element: <DashboardPage />,
    public: false
  },
  {
    key: 'player-profile',
    path: '/player/profile',
    element: <PlayerProfile />,
    public: false
  },
  {
    key: 'player-rankings',
    path: '/player/rankings',
    element: <Rankings />,
    public: false
  },
  {
    key: 'player-courts',
    path: '/player/courts',
    element: <CourtReservationsPage />,
    public: false
  },
  // Coach-specific routes
  {
    key: 'coach-dashboard',
    path: '/coach/dashboard',
    element: <DashboardPage />,
    public: false
  },
  {
    key: 'coach-profile',
    path: '/coach/profile',
    element: <ProfilePage />,
    public: false
  },
  {
    key: 'coach-credentials',
    path: '/coach/credentials',
    element: <DashboardPage />,
    public: false
  },
  {
    key: 'coach-students',
    path: '/coach/students',
    element: <DashboardPage />,
    public: false
  },
  {
    key: 'coach-sessions',
    path: '/coach/sessions',
    element: <DashboardPage />,
    public: false
  },
  {
    key: 'coach-certifications',
    path: '/coach/certifications',
    element: <DashboardPage />,
    public: false
  },
  // Club-specific routes
  {
    key: 'club-dashboard',
    path: '/club/dashboard',
    element: <DashboardPage />,
    public: false
  },
  {
    key: 'club-profile',
    path: '/club/profile',
    element: <ProfilePage />,
    public: false
  },
  {
    key: 'club-courts',
    path: '/club/courts',
    element: <CourtReservationsPage />,
    public: false
  },
  {
    key: 'club-members',
    path: '/club/members',
    element: <DashboardPage />,
    public: false
  },
  {
    key: 'club-microsite',
    path: '/club/microsite',
    element: <DashboardPage />,
    public: false
  },
  // Partner-specific routes
  {
    key: 'partner-dashboard',
    path: '/partner/dashboard',
    element: <DashboardPage />,
    public: false
  },
  {
    key: 'partner-profile',
    path: '/partner/profile',
    element: <ProfilePage />,
    public: false
  },
  {
    key: 'partner-courts',
    path: '/partner/courts',
    element: <CourtReservationsPage />,
    public: false
  },
  {
    key: 'partner-microsite',
    path: '/partner/microsite',
    element: <DashboardPage />,
    public: false
  },
  {
    key: 'partner-analytics',
    path: '/partner/analytics',
    element: <DashboardPage />,
    public: false
  },
  // State-specific routes
  {
    key: 'state-dashboard',
    path: '/state/dashboard',
    element: <DashboardPage />,
    public: false
  },
  {
    key: 'state-profile',
    path: '/state/profile',
    element: <ProfilePage />,
    public: false
  },
  {
    key: 'state-members',
    path: '/state/members',
    element: <DashboardPage />,
    public: false
  },
  {
    key: 'state-courts',
    path: '/state/courts',
    element: <CourtReservationsPage />,
    public: false
  },
  {
    key: 'state-microsite',
    path: '/state/microsite',
    element: <DashboardPage />,
    public: false
  },
  {
    key: 'state-announcements',
    path: '/state/announcements',
    element: <DashboardPage />,
    public: false
  },
  {
    key: 'state-statistics',
    path: '/state/statistics',
    element: <DashboardPage />,
    public: false
  },
  // Super Admin-specific routes
  {
    key: 'super-admin-dashboard',
    path: '/super-admin/dashboard',
    element: <DashboardPage />,
    public: false
  },
  {
    key: 'super-admin-profile',
    path: '/super-admin/profile',
    element: <ProfilePage />,
    public: false
  },
  {
    key: 'super-admin-users',
    path: '/super-admin/users',
    element: <AdminPage />,
    public: false
  },
  {
    key: 'super-admin-system',
    path: '/super-admin/system',
    element: <AdminPage />,
    public: false
  },
  {
    key: 'super-admin-analytics',
    path: '/super-admin/analytics',
    element: <AdminPage />,
    public: false
  },
  // Admin routes
  {
    key: 'admin',
    path: '/admin',
    element: <AdminPage />,
    public: false
  },
  {
    key: 'banners',
    path: '/admin/banners',
    element: <BannersPage />,
    public: false
  },
  {
    key: '404',
    path: '*',
    element: <NotFoundPage />,
    public: true
  }
]

export default routes;