import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import TournamentManagement from '../../components/TournamentManagement';

const TournamentsManagementPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to access tournament management.</p>
        </div>
      </div>
    );
  }

  // Determine user role for tournament management
  const getUserRole = () => {
    if (['admin', 'super_admin'].includes(user.role)) {
      return 'admin';
    }
    if (['club', 'partner', 'state'].includes(user.user_type)) {
      return 'organizer';
    }
    return 'participant';
  };

  return (
    <TournamentManagement 
      userRole={getUserRole()} 
      userId={user.id} 
    />
  );
};

export default TournamentsManagementPage;