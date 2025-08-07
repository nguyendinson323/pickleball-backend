import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../store'
import { registerUser } from '../store/slices/authSlice'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { animationConfigs, getAnimationVariants } from '../lib/animations'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    user_type: 'player' as const,
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    state: '',
    city: '',
    phone: '',
    skill_level: '3.0' as const,
  })

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state: RootState) => state.auth)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await dispatch(registerUser(formData)).unwrap()
      toast.success('Registration successful!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(error || 'Registration failed')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
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
                Create your account
              </CardTitle>
            </motion.div>
            <motion.div
              variants={getAnimationVariants('up', 0.7, 0.3)}
            >
              <CardDescription className="text-center">
                Join the pickleball federation community
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
              <Label htmlFor="user_type">Account Type</Label>
              <Select value={formData.user_type} onValueChange={(value) => handleSelectChange('user_type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="player">Player</SelectItem>
                  <SelectItem value="coach">Coach</SelectItem>
                  <SelectItem value="club">Club</SelectItem>
                  <SelectItem value="partner">Partner</SelectItem>
                  <SelectItem value="state">State</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
            
            <motion.div 
              className="space-y-2"
              variants={getAnimationVariants('right', 0.7, 0.2)}
            >
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
              />
            </motion.div>

            <motion.div 
              className="space-y-2"
              variants={getAnimationVariants('left', 0.6, 0.3)}
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
              variants={getAnimationVariants('right', 0.7, 0.4)}
            >
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
              />
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={getAnimationVariants('up', 0.8, 0.5)}
            >
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last name"
                />
              </div>
            </motion.div>

            <motion.div 
              className="grid grid-cols-2 gap-4"
              variants={getAnimationVariants('down', 0.5, 0.6)}
            >
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
              </div>
            </motion.div>

            <motion.div 
              className="space-y-2"
              variants={getAnimationVariants('left', 0.6, 0.7)}
            >
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </motion.div>

            {formData.user_type === 'player' && (
              <motion.div 
                className="space-y-2"
                variants={getAnimationVariants('up', 0.8, 0.8)}
              >
                <Label htmlFor="skill_level">Skill Level</Label>
                <Select value={formData.skill_level} onValueChange={(value) => handleSelectChange('skill_level', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2.5">2.5 - Beginner</SelectItem>
                    <SelectItem value="3.0">3.0 - Novice</SelectItem>
                    <SelectItem value="3.5">3.5 - Intermediate</SelectItem>
                    <SelectItem value="4.0">4.0 - Advanced</SelectItem>
                    <SelectItem value="4.5">4.5 - Expert</SelectItem>
                    <SelectItem value="5.0">5.0 - Professional</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>
            )}

            <motion.div
              variants={getAnimationVariants('up', 0.7, 0.9)}
            >
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
            </motion.div>
          </motion.form>
          <motion.div 
            className="mt-4 text-center"
            variants={getAnimationVariants('up', 0.6, 1.0)}
          >
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </motion.div>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  )
}

export default RegisterPage 