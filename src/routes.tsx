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

const routes = [
  {
    key: 'home',
    path: '/',
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
    key: 'rankings',
    path: '/rankings',
    element: <RankingsPage />,
    public: true
  },
  {
    key: 'admin',
    path: '/admin',
    element: <AdminPage />,
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