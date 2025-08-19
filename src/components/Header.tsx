import { useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import { logout } from '../store/slices/authSlice'
import { 
  Menu, 
  X, 
  Bell, 
  Settings,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react'
import { getUserNavigation } from '../lib/navigation'
import { imageBaseURL } from '../lib/const'

const Header = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { user, token } = useSelector((state: RootState) => state.auth)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [commonMenuOpen, setCommonMenuOpen] = useState(false)
  
  // Timeout references for hover effects
  const userMenuTimeoutRef = useRef(null)
  const commonMenuTimeoutRef = useRef(null)
  const location = useLocation()

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const isActive = (path: string) => location.pathname === path

  // Get dynamic navigation based on user type and role
  const userNavigation = getUserNavigation(user)

  // Home pages - always visible
  const homePages = [
    { name: 'Home', href: '/', public: true },
    { name: 'About', href: '/about', public: true },
    { name: 'Events', href: '/events', public: true },
    { name: 'News', href: '/news', public: true },
    { name: 'Contact', href: '/contact', public: true },
    { name: 'Privacy Policy', href: '/privacy-policy', public: true },
  ]

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

          {/* Desktop Navigation - Home Pages Always Visible */}
          <nav className="hidden lg:flex items-center space-x-1">
            {homePages.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive(item.href) ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Common Features Dropdown for Logged-in Users */}
            {isAuthenticated && (
              <div 
                className="relative"
                onMouseEnter={() => {
                  if (commonMenuTimeoutRef.current) {
                    clearTimeout(commonMenuTimeoutRef.current)
                  }
                  setCommonMenuOpen(true)
                }}
                onMouseLeave={() => {
                  commonMenuTimeoutRef.current = setTimeout(() => {
                    setCommonMenuOpen(false)
                  }, 150)
                }}
              >
                <button
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-200"
                >
                  <span>Features</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* Common Features Dropdown Menu */}
                {commonMenuOpen && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50"
                    onMouseEnter={() => {
                      if (commonMenuTimeoutRef.current) {
                        clearTimeout(commonMenuTimeoutRef.current)
                      }
                    }}
                    onMouseLeave={() => {
                      commonMenuTimeoutRef.current = setTimeout(() => {
                        setCommonMenuOpen(false)
                      }, 150)
                    }}
                  >
                    {userNavigation.main?.slice(5).map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setCommonMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div 
                className="relative"
                onMouseEnter={() => {
                  if (userMenuTimeoutRef.current) {
                    clearTimeout(userMenuTimeoutRef.current)
                  }
                  setUserMenuOpen(true)
                }}
                onMouseLeave={() => {
                  userMenuTimeoutRef.current = setTimeout(() => {
                    setUserMenuOpen(false)
                  }, 150)
                }}
              >
                <button
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                    {user?.profile_photo ? (
                      <img 
                        src={`${imageBaseURL}${user.profile_photo}`} 
                        alt={getUserDisplayName()} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      getUserInitials()
                    )}
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-gray-700">
                    {getUserDisplayName()}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50"
                    onMouseEnter={() => {
                      if (userMenuTimeoutRef.current) {
                        clearTimeout(userMenuTimeoutRef.current)
                      }
                    }}
                    onMouseLeave={() => {
                      userMenuTimeoutRef.current = setTimeout(() => {
                        setUserMenuOpen(false)
                      }, 150)
                    }}
                  >
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-semibold">
                          {user?.profile_photo ? (
                            <img 
                              src={`${imageBaseURL}${user.profile_photo}`} 
                              alt={getUserDisplayName()} 
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            getUserInitials()
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{getUserDisplayName()}</p>
                          <span className="text-xs capitalize bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {user?.user_type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Profile Link */}
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>

                    {/* User-specific Navigation in Dropdown */}
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      My Account
                    </div>
                    {userNavigation.user?.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}

                    {/* Admin Navigation in Dropdown */}
                    {user?.user_type === 'admin' && userNavigation.admin?.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}

                    <div className="border-t border-gray-200 my-2"></div>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  Sign in
                </Link>
                <Link
                  to="/register/select-type"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-md font-medium transition-all duration-200 hover:shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-all duration-200"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            {/* Mobile Navigation */}
            <div className="space-y-1">
              {/* Home Pages */}
              {homePages.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-all duration-200 ${
                    isActive(item.href) ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Common Features for Mobile */}
              {isAuthenticated && (
                <>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Features
                    </div>
                  </div>
                  {userNavigation.main?.slice(5).map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block px-3 py-2 text-base font-medium rounded-md transition-all duration-200 ${
                        isActive(item.href) ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </>
              )}

              {/* User-specific Navigation for Mobile */}
              {isAuthenticated && (
                <>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      My Account
                    </div>
                  </div>
                  {userNavigation.user?.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`block px-3 py-2 text-base font-medium rounded-md transition-all duration-200 ${
                        isActive(item.href) ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </>
              )}

              {/* Admin Navigation for Mobile */}
              {isAuthenticated && user?.user_type === 'admin' && userNavigation.admin?.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-all duration-200 ${
                    isActive(item.href) ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Auth Buttons for Non-authenticated Users */}
              {!isAuthenticated && (
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Link
                    to="/login"
                    className="block w-full text-center px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register/select-type"
                    className="block w-full text-center px-3 py-2 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-md transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
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