import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ('player' | 'coach' | 'club' | 'partner' | 'state' | 'admin')[];
  requireAuth?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  allowedRoles, 
  requireAuth = true 
}: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Check authentication
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (allowedRoles && user && !allowedRoles.includes(user.user_type)) {
    // Redirect to appropriate dashboard based on user type
    const userDashboardRoutes = {
      player: '/player/dashboard',
      coach: '/coach/dashboard',
      club: '/club/dashboard',
      partner: '/partner/dashboard',
      state: '/state/dashboard',
      admin: '/admin/dashboard'
    };

    return <Navigate to={userDashboardRoutes[user.user_type]} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;