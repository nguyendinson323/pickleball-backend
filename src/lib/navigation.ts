import { User } from '../types/api'

export interface NavigationItem {
  name: string
  href: string
  public: boolean
  icon?: string
  badge?: string
}

export interface UserNavigation {
  main: NavigationItem[]
  user: NavigationItem[]
  admin?: NavigationItem[]
}

// Common tabs available to all logged-in users
export const commonLoggedInTabs: NavigationItem[] = [
  { name: 'Tournaments', href: '/tournaments', public: true },
  { name: 'Rankings', href: '/rankings', public: true },
  { name: 'Find Court', href: '/find-court', public: true },
  { name: 'Player Finder', href: '/player-finder', public: true },
  { name: 'Clubs', href: '/clubs', public: true },
  { name: 'Court Reservations', href: '/court-reservations', public: true },
  { name: 'Messages', href: '/messages', public: true },
  { name: 'Membership', href: '/membership', public: true },
]

// Base public navigation for all users
export const basePublicNavigation: NavigationItem[] = [
  { name: 'Home', href: '/', public: true },
  { name: 'About', href: '/about', public: true },
  { name: 'Events', href: '/events', public: true },
  { name: 'News', href: '/news', public: true },
  { name: 'Contact', href: '/contact', public: true },
]

// Player navigation - only private tabs
export const playerPrivateTabs: NavigationItem[] = [
  { name: 'Dashboard', href: '/player/dashboard', public: false },
  { name: 'My Profile', href: '/player/profile', public: false },
]

// Coach navigation - only private tabs
export const coachPrivateTabs: NavigationItem[] = [
  { name: 'Dashboard', href: '/coach/dashboard', public: false },
  { name: 'My Profile', href: '/coach/profile', public: false },
  { name: 'My Credentials', href: '/coach/credentials', public: false },
  { name: 'My Students', href: '/coach/students', public: false },
  { name: 'Training Sessions', href: '/coach/sessions', public: false },
  { name: 'Certifications', href: '/coach/certifications', public: false },
]

// Club navigation - only private tabs
export const clubPrivateTabs: NavigationItem[] = [
  { name: 'Dashboard', href: '/club/dashboard', public: false },
  { name: 'Club Profile', href: '/club/profile', public: false },
  { name: 'Court Management', href: '/club/courts', public: false },
  { name: 'Member Management', href: '/club/members', public: false },
  { name: 'Club Microsite', href: '/club/microsite', public: false },
]

// Partner navigation - only private tabs
export const partnerPrivateTabs: NavigationItem[] = [
  { name: 'Dashboard', href: '/partner/dashboard', public: false },
  { name: 'Business Profile', href: '/partner/profile', public: false },
  { name: 'Court Management', href: '/partner/courts', public: false },
  { name: 'Business Microsite', href: '/partner/microsite', public: false },
  { name: 'Analytics', href: '/partner/analytics', public: false },
]

// State navigation - only private tabs
export const statePrivateTabs: NavigationItem[] = [
  { name: 'Dashboard', href: '/state/dashboard', public: false },
  { name: 'State Profile', href: '/state/profile', public: false },
  { name: 'Member Management', href: '/state/members', public: false },
  { name: 'Court Management', href: '/state/courts', public: false },
  { name: 'State Microsite', href: '/state/microsite', public: false },
  { name: 'Announcements', href: '/state/announcements', public: false },
  { name: 'Statistics', href: '/state/statistics', public: false },
]

// Super Admin navigation - only private tabs
export const superAdminPrivateTabs: NavigationItem[] = [
  { name: 'Dashboard', href: '/super-admin/dashboard', public: false },
  { name: 'Admin Profile', href: '/super-admin/profile', public: false },
  { name: 'User Management', href: '/super-admin/users', public: false },
  { name: 'System Management', href: '/super-admin/system', public: false },
  { name: 'Analytics', href: '/super-admin/analytics', public: false },
]

// Super Admin additional admin tabs
export const superAdminAdminTabs: NavigationItem[] = [
  { name: 'Admin Dashboard', href: '/admin', public: false },
  { name: 'Banner Management', href: '/admin/banners', public: false },
  { name: 'Global Settings', href: '/admin/settings', public: false },
  { name: 'Payment Management', href: '/admin/payments', public: false },
  { name: 'Content Management', href: '/admin/content', public: false },
]

// Get navigation based on user type and role
export const getUserNavigation = (user: User | null): UserNavigation => {
  if (!user) {
    return {
      main: basePublicNavigation,
      user: []
    }
  }

  // For logged-in users, combine base public + common tabs + private tabs
  const mainNavigation = [...basePublicNavigation, ...commonLoggedInTabs]
  
  // Super admin gets special navigation
  if (user.role === 'super_admin') {
    return {
      main: mainNavigation,
      user: superAdminPrivateTabs,
      admin: superAdminAdminTabs
    }
  }

  // Regular admin gets admin navigation
  if (user.role === 'admin') {
    const privateTabs = getPrivateTabsByUserType(user.user_type)
    return {
      main: mainNavigation,
      user: privateTabs,
      admin: [
        { name: 'Admin Dashboard', href: '/admin', public: false },
        { name: 'Banner Management', href: '/admin/banners', public: false },
      ]
    }
  }

  // Regular users get their type-specific private tabs
  const privateTabs = getPrivateTabsByUserType(user.user_type)
  return {
    main: mainNavigation,
    user: privateTabs
  }
}

// Get private tabs by user type
const getPrivateTabsByUserType = (userType: string): NavigationItem[] => {
  switch (userType) {
    case 'player':
      return playerPrivateTabs
    case 'coach':
      return coachPrivateTabs
    case 'club':
      return clubPrivateTabs
    case 'partner':
      return partnerPrivateTabs
    case 'state':
      return statePrivateTabs
    case 'federation':
      return superAdminPrivateTabs
    default:
      return playerPrivateTabs
  }
}