import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../../store'
import { loginUser } from '../../store/slices/authSlice'
import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { toast } from 'sonner'
const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state: RootState) => state.auth)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const result = await dispatch(loginUser(formData)).unwrap()
      toast.success('Login successful!')
      
      // Navigate to appropriate dashboard based on user type
      // Handle the API response structure properly
      const response = result as any
      const userType = response?.user?.user_type || response?.user_type
      switch (userType) {
        case 'player':
          navigate('/player/dashboard')
          break
        case 'coach':
          navigate('/coach/dashboard')
          break
        case 'club':
          navigate('/club/dashboard')
          break
        case 'partner':
          navigate('/partner/dashboard')
          break
        case 'state':
          navigate('/state/dashboard')
          break
        case 'admin':
          navigate('/admin/dashboard')
          break
        case 'super_admin':
          navigate('/super-admin/dashboard')
          break
        default:
          navigate('/player/dashboard')
      }
    } catch (err) {
      toast.error(error || 'Login failed')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div>
        <Card className="animate-on-scroll w-full max-w-md">
          <CardHeader className="space-y-1">
            <div>
              <CardTitle className="animate-on-scroll text-2xl font-bold text-center">
                Sign in to your account
              </CardTitle>
            </div>
            <div>
              <CardDescription className="animate-on-scroll text-center">
                Enter your credentials to access your account
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form 
              onSubmit={handleSubmit} 
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="animate-on-scroll">Email</Label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="animate-on-scroll">Password</Label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <Button type="submit" className="animate-on-scroll w-full hover:scale-105 transition-transform duration-300" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign in'}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <p className="animate-on-scroll text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register/select-type" className="text-blue-600 hover:text-blue-500 hover:scale-105 transition-transform duration-300">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage 