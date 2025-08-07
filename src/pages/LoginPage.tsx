import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../store'
import { loginUser } from '../store/slices/authSlice'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { animationConfigs, getAnimationVariants } from '../lib/animations'

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
      await dispatch(loginUser(formData)).unwrap()
      toast.success('Login successful!')
      navigate('/dashboard')
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
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1
            }
          }
        }}
      >
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <motion.div
              variants={getAnimationVariants('up', 0.7, 0.2)}
            >
              <CardTitle className="text-2xl font-bold text-center">
                Sign in to your account
              </CardTitle>
            </motion.div>
            <motion.div
              variants={getAnimationVariants('up', 0.7, 0.3)}
            >
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent>
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.4
                  }
                }
              }}
            >
              <motion.div 
                className="space-y-2"
                variants={getAnimationVariants('left', 0.6, 0.1)}
              >
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </motion.div>
              <motion.div 
                className="space-y-2"
                variants={getAnimationVariants('right', 0.7, 0.2)}
              >
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </motion.div>
              <motion.div
                variants={getAnimationVariants('up', 0.8, 0.5)}
              >
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign in'}
                </Button>
              </motion.div>
            </motion.form>
            <motion.div 
              className="mt-4 text-center"
              variants={getAnimationVariants('up', 0.6, 0.7)}
            >
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-600 hover:text-blue-500">
                  Sign up
                </Link>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default LoginPage 