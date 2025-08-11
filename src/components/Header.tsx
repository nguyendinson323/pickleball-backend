import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { logout } from '../store/slices/authSlice'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { 
  Menu, 
  X, 
  Bell, 
  Search, 
  Settings,
  User,
  LogOut
} from 'lucide-react'
import { getUserNavigation } from '../lib/navigation'

const Header = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user, token } = useSelector((state: RootState) => state.auth)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const location = useLocation()

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user

  const handleLogout = () => {
    dispatch(logout())
  }

  const isActive = (path: string) => location.pathname === path

  // Get dynamic navigation based on user type and role
  const userNavigation = getUserNavigation(user)
  
  // Separate navigation into logical groups
  const baseNavigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ]
  
  // All common functionality for logged-in users in one array
  const allCommonFeatures = [
    { name: 'Tournaments', href: '/tournaments' },
    { name: 'Rankings', href: '/rankings' },
    { name: 'Find Court', href: '/find-court' },
    { name: 'Player Finder', href: '/player-finder' },
    { name: 'Clubs', href: '/clubs' },
    { name: 'Court Reservations', href: '/court-reservations' },
    { name: 'Messages', href: '/messages' },
    { name: 'Membership', href: '/membership' },
  ]
  
  const adminNavigation = userNavigation.admin || []

  // Get user display name
  const getUserDisplayName = () => {
    if (user?.full_name) return user.full_name
    if (user?.business_name) return user.business_name
    return user?.username || 'User'
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (user?.full_name) {
      const names = user.full_name.split(' ')
      return names.map(name => name.charAt(0)).join('').toUpperCase()
    }
    if (user?.business_name) {
      return user.business_name.charAt(0).toUpperCase()
    }
    return user?.username?.charAt(0).toUpperCase() || 'U'
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-all duration-200 group">
              <div className="relative">
                <img src="/logo.jpeg" alt="Logo" className="h-10 w-10 rounded-lg shadow-md group-hover:scale-105 transition-transform duration-200" />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pickleball
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {/* Base Navigation Tabs */}
            <div className="hidden xl:flex items-center space-x-1">
              {baseNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50 border border-blue-200'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Services Mega Menu */}
            {isAuthenticated && (
              <div className="relative group">
                <button
                  className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-50 text-gray-700 hover:text-blue-600"
                >
                  <span>Services</span>
                  <div className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="grid grid-cols-1 gap-2">
                    {allCommonFeatures.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center p-3 rounded-md transition-all duration-200 hover:bg-gray-50 group ${
                          isActive(item.href) ? 'bg-blue-50 border border-blue-200' : ''
                        }`}
                      >
                        <div className={`font-medium ${isActive(item.href) ? 'text-blue-600' : 'text-gray-900'}`}>
                          {item.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Admin Navigation */}
            {isAuthenticated && user?.role === 'admin' && adminNavigation.filter(item => !item.public).map((item) => (
              <div key={item.name} className="relative">
                <Link
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-50 group ${
                    isActive(item.href)
                      ? 'text-red-600 bg-red-50 border border-red-200'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </div>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && (
              <>
                {/* Search Button */}
                <Button variant="ghost" size="sm" className="relative p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
                  <Search className="h-4 w-4 text-gray-600" />
                </Button>
                
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
                  <Bell className="h-4 w-4 text-gray-600" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 hover:bg-red-600">
                    3
                  </Badge>
                </Button>
              </>
            )}
            
            {isAuthenticated ? (
              <div className="relative">
                <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-100 transition-all duration-200 group">
                      <Avatar className="h-10 w-10 ring-2 ring-transparent group-hover:ring-blue-200 transition-all duration-200">
                        <AvatarImage src={user?.profile_photo} alt={getUserDisplayName()} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 p-4" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal p-0 mb-3">
                      <div className="flex flex-col space-y-2">
                        <p className="text-sm font-semibold leading-none text-gray-900">
                          {getUserDisplayName()}
                        </p>
                        <p className="text-xs leading-none text-gray-500">
                          {user?.email}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="text-xs capitalize">
                            {user?.user_type}
                          </Badge>
                          <Badge variant="outline" className="text-xs capitalize">
                            {user?.role}
                          </Badge>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-3" />
                    <div className="space-y-1">
                      {userNavigation.user.filter(item => !item.public).map((item) => (
                        <DropdownMenuItem key={item.name} asChild className="p-2 rounded-lg hover:bg-gray-50">
                          <Link to={item.href} className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-500" />
                            <span>{item.name}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    {adminNavigation.length > 0 && (
                      <>
                        <DropdownMenuSeparator className="my-3" />
                        <div className="space-y-1">
                          {adminNavigation.filter(item => !item.public).map((item) => (
                            <DropdownMenuItem key={item.name} asChild className="p-2 rounded-lg hover:bg-gray-50">
                              <Link to={item.href} className="flex items-center space-x-2">
                                <Settings className="h-4 w-4 text-gray-500" />
                                <span>{item.name}</span>
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </div>
                      </>
                    )}
                    <DropdownMenuSeparator className="my-3" />
                    <DropdownMenuItem 
                      onClick={handleLogout} 
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Button variant="ghost" asChild className="hover:text-blue-600 transition-colors duration-200">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                  <Link to="/register/select-type">Join Now</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-gray-100">
            <div className="py-4 space-y-2">
              {/* Base Navigation */}
              <div className="px-4 pb-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Main</h3>
                <div className="space-y-1">
                  {baseNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive(item.href)
                          ? 'text-blue-600 bg-blue-50 border border-blue-200'
                          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Services Section */}
              {isAuthenticated && (
                <div className="px-4 pb-2">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Services</h3>
                  <div className="space-y-1">
                    {allCommonFeatures.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          isActive(item.href)
                            ? 'text-blue-600 bg-blue-50 border border-blue-200'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Admin Navigation */}
              {isAuthenticated && user?.role === 'admin' && (
                <div className="px-4 pb-2">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Admin</h3>
                  <div className="space-y-1">
                    {adminNavigation.filter(item => !item.public).map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          isActive(item.href)
                            ? 'text-red-600 bg-red-50 border border-red-200'
                            : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {isAuthenticated ? (
                <>
                  <div className="px-4 py-3 border-t border-gray-100">
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.profile_photo} alt={getUserDisplayName()} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {userNavigation.user.filter(item => !item.public).map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => {
                          handleLogout()
                          setMobileMenuOpen(false)
                        }}
                        className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                      >
                        <span>Log out</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="px-4 pt-4 border-t border-gray-100">
                  <div className="flex space-x-3">
                    <Button variant="ghost" asChild className="flex-1">
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                        Login
                      </Link>
                    </Button>
                    <Button asChild className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                      <Link to="/register/select-type" onClick={() => setMobileMenuOpen(false)}>
                        Join Now
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header