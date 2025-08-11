# User Type-Specific Routing Structure

This document outlines the new routing structure that supports individual dashboard and profile pages for different user types.

## Overview

The application now supports user type-specific routes that allow each user type to have their own dedicated dashboard and profile pages. This provides better organization and allows for future customization of each user type's experience.

## Public Pages (Accessible to Everyone)

The following pages are public and can be accessed by anyone, whether logged in or not:

- **Home** (`/`) - Landing page
- **About** (`/about`) - About information
- **Events** (`/events`) - Events listing
- **Rankings** (`/rankings`) - Player rankings
- **Membership** (`/membership`) - Membership information
- **Find a Court** (`/find-court`) - Court finder
- **News** (`/news`) - News and updates
- **Contact** (`/contact`) - Contact information
- **Clubs** (`/clubs`) - Club listings
- **Tournaments** (`/tournaments`) - Tournament listings and information
- **Player Finder** (`/player-finder`) - Find other players
- **Court Reservations** (`/court-reservations`) - Court reservation system
- **Messages** (`/messages`) - Public messaging system
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration

## User Types and Private Routes

### Player Routes
- `/player/dashboard` - Player dashboard
- `/player/profile` - Player profile
- `/player/rankings` - Player's personal rankings
- `/player/courts` - Player's court reservations

### Coach Routes
- `/coach/dashboard` - Coach dashboard
- `/coach/profile` - Coach profile
- `/coach/credentials` - Coach credentials
- `/coach/students` - Coach's students
- `/coach/sessions` - Training sessions
- `/coach/certifications` - Coach certifications

### Club Routes
- `/club/dashboard` - Club dashboard
- `/club/profile` - Club profile
- `/club/courts` - Court management
- `/club/members` - Member management
- `/club/microsite` - Club microsite

### Partner Routes
- `/partner/dashboard` - Partner dashboard
- `/partner/profile` - Business profile
- `/partner/courts` - Court management
- `/partner/microsite` - Business microsite
- `/partner/analytics` - Business analytics

### State Routes
- `/state/dashboard` - State dashboard
- `/state/profile` - State profile
- `/state/members` - Member management
- `/state/courts` - Court management
- `/state/microsite` - State microsite
- `/state/announcements` - State announcements
- `/state/statistics` - State statistics

### Super Admin Routes
- `/super-admin/dashboard` - Super admin dashboard
- `/super-admin/profile` - Admin profile
- `/super-admin/users` - User management
- `/super-admin/system` - System management
- `/super-admin/analytics` - System analytics

## Legacy Routes

The following legacy routes are maintained for backward compatibility:
- `/dashboard` - Generic dashboard
- `/profile` - Generic profile

## Navigation Structure

The navigation is dynamically generated based on the user's type and role using the `getUserNavigation()` function in `src/lib/navigation.ts`. This function returns the appropriate navigation items for each user type.

**Key Changes:**
- **Tournaments** and **Messages** are now public pages accessible to everyone
- Individual tournament routes for user types have been removed since tournaments are public
- Messages are accessible through the main public navigation

## Future Development

### Creating User Type-Specific Components

To create dedicated components for each user type:

1. Create new components in the appropriate user type directory:
   ```
   src/pages/player/PlayerDashboard.tsx
   src/pages/coach/CoachDashboard.tsx
   src/pages/club/ClubDashboard.tsx
   ```

2. Update the routes to use these new components instead of the generic ones.

3. Customize each component to show relevant information for that user type.

### Example: Player Dashboard Component

```tsx
// src/pages/player/PlayerDashboard.tsx
import React from 'react';

const PlayerDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Player Dashboard</h1>
      
      {/* Player-specific content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">My Rankings</h3>
          {/* Ranking-specific content */}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Court Reservations</h3>
          {/* Court reservation content */}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
          {/* Quick action buttons */}
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;
```

### Updating Routes for New Components

Once you create user type-specific components, update the routes:

```tsx
// In routes.tsx
import PlayerDashboard from "./pages/player/PlayerDashboard";
import CoachDashboard from "./pages/coach/CoachDashboard";

// Update the route
{
  key: 'player-dashboard',
  path: '/player/dashboard',
  element: <PlayerDashboard />, // Use the specific component
  public: false
}
```

## Benefits

1. **Better Organization**: Each user type has its own dedicated space
2. **Customization**: Can tailor the experience for each user type
3. **Scalability**: Easy to add new features for specific user types
4. **Maintenance**: Clear separation of concerns
5. **User Experience**: Users see relevant content for their role
6. **Public Access**: Tournaments and messages are accessible to everyone, promoting community engagement

## Security

- All user type-specific routes are protected (`public: false`) and require authentication
- Public pages (`public: true`) are accessible to everyone
- The navigation only shows routes that the user has access to based on their user type and role
- Tournaments and messages are now public, allowing community engagement without requiring login 