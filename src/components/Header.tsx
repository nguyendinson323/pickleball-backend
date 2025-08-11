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
import { Menu, X, Bell, Search } from 'lucide-react'

const Header = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user, token } = useSelector((state: RootState) => state.auth)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user

  const handleLogout = () => {
    dispatch(logout())
  }

  const isActive = (path: string) => location.pathname === path

  const navigation = [
    { name: 'Home', href: '/', public: true },
    { name: 'About', href: '/about', public: true },
    { name: 'Events', href: '/events', public: true },
    { name: 'Rankings', href: '/rankings', public: true },
    { name: 'Membership', href: '/membership', public: true },
    { name: 'Find a Court', href: '/find-court', public: true },
    { name: 'News', href: '/news', public: true },
    { name: 'Contact', href: '/contact', public: true },
  ]

  const adminNavigation = [
    { name: 'Admin Dashboard', href: '/admin', public: false },
    { name: 'Banner Management', href: '/admin/banners', public: false },
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
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b z-50 animate-on-scroll">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="animate-on-scroll">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img src="/logo.jpeg" alt="Logo" className="h-8 w-8 rounded animate-on-scroll" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <div key={item.name} className="">
                <Link
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              </div>
            ))}
            {isAuthenticated && user?.role === 'admin' && adminNavigation.map((item, index) => (
              <div key={item.name} className="animate-on-scroll nav-item">
                <Link
                  to={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4 animate-on-scroll">
            {isAuthenticated && (
              <>
                {/* Search Button */}
                <div className="animate-on-scroll">
                  <Button variant="ghost" size="sm" className="relative">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Notifications */}
                <div className="animate-on-scroll">
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                      3
                    </Badge>
                  </Button>
                </div>
              </>
            )}
            
            {isAuthenticated ? (
              <div className="animate-on-scroll">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full hover:bg-gray-100">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.profile_photo} alt={getUserDisplayName()} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {getUserDisplayName()}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground capitalize">
                          {user?.user_type} • {user?.role}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {user?.role === 'admin' && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/admin">Admin Dashboard</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/admin/banners">Banner Management</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex space-x-4 animate-on-scroll">
                <div className="animate-on-scroll">
                  <Button variant="ghost" asChild>
                    <Link to="/login" className="hover:text-blue-600">Login</Link>
                  </Button>
                </div>
                <div className="animate-on-scroll">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link to="/register/select-type">Join Now</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden animate-on-scroll">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {navigation.map((item, index) => (
                <div key={item.name} className="animate-on-scroll">
                  <Link
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
              {isAuthenticated && user?.role === 'admin' && adminNavigation.map((item, index) => (
                <div key={item.name} className="animate-on-scroll nav-item">
                  <Link
                    to={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 border-b border-gray-200 animate-on-scroll">
                    <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.user_type} • {user?.role}</p>
                  </div>
                  <div className="animate-on-scroll">
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </div>
                  <div className="animate-on-scroll">
                    <Link
                      to="/profile"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </div>
                  {user?.role === 'admin' && (
                    <>
                      <div className="animate-on-scroll">
                        <Link
                          to="/admin"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      </div>
                      <div className="animate-on-scroll">
                        <Link
                          to="/admin/banners"
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Banner Management
                        </Link>
                      </div>
                    </>
                  )}
                  <div className="animate-on-scroll">
                    <button
                      onClick={() => {
                        handleLogout()
                        setMobileMenuOpen(false)
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Log out
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-4 pb-3 border-t border-gray-200 animate-on-scroll">
                  <div className="flex space-x-4">
                    <div className="flex-1 animate-on-scroll">
                      <Button variant="ghost" asChild className="w-full">
                        <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                          Login
                        </Link>
                      </Button>
                    </div>
                    <div className="flex-1 animate-on-scroll">
                      <Button asChild className="w-full">
                        <Link to="/register/select-type" onClick={() => setMobileMenuOpen(false)}>
                          Join Now
                        </Link>
                      </Button>
                    </div>
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