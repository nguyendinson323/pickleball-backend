import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import ClubsPage from "./pages/ClubsPage";
import TournamentsPage from "./pages/TournamentsPage";
import RankingsPage from "./pages/RankingsPage";
import AdminPage from "./pages/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import BannersPage from "./pages/BannersPage";
import PlayerFinderPage from "./pages/PlayerFinderPage";
import CourtReservationsPage from "./pages/CourtReservationsPage";
import LandingPage from "./pages/Index";

const routes = [
  {
    key: 'root',
    path: '/',
    element: <LandingPage />,
    public: true
  },
  {
    key: 'home',
    path: '/home',
    element: <HomePage />,
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
    element: <RegisterPage />,
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
    key: 'rankings',
    path: '/rankings',
    element: <RankingsPage />,
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
  {
    key: 'dashboard',
    path: '/dashboard',
    element: <DashboardPage />,
    public: false
  },
  {
    key: 'profile',
    path: '/profile',
    element: <ProfilePage />,
    public: false
  },
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