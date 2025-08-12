import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { registerUser } from '../../store/slices/authSlice';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const RequiredFieldsPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    business_name: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const storedUserType = localStorage.getItem('registration_user_type');
    if (!storedUserType) {
      navigate('/register/select-type');
      return;
    }
    setUserType(storedUserType);
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.username || formData.username.length < 3) {
      toast.error('Username must be at least 3 characters long');
      return false;
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.password || formData.password.length < 3) {
      toast.error('Password must be at least 3 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    if (userType === 'club' || userType === 'partner') {
      if (!formData.business_name) {
        toast.error('Business name is required');
        return false;
      }
    } else {
      if (!formData.full_name) {
        toast.error('Full name is required');
        return false;
      }
    }
    return true;
  };

  const handleContinue = () => {
    if (!validateForm()) return;

    // Store required fields in localStorage for the next step
    localStorage.setItem('registration_required_fields', JSON.stringify({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      full_name: formData.full_name,
      business_name: formData.business_name,
    }));

    navigate('/register/optional-fields');
  };

  const handleBack = () => {
    navigate('/register/select-type');
  };

  const handleSkipToRegister = async () => {
    if (!validateForm()) return;

    try {
      const registrationData = {
        user_type: userType as any,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        ...(userType === 'club' || userType === 'partner' 
          ? { business_name: formData.business_name }
          : { full_name: formData.full_name }
        ),
      };

      const result = await dispatch(registerUser(registrationData)).unwrap();
      toast.success('Registration successful!');
      
      // Navigate to appropriate dashboard based on user type
      const response = result as any;
      const resultUserType = response?.user?.user_type || response?.user_type;
      switch (resultUserType) {
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
      toast.error(error || 'Registration failed');
    }
  };

  const getRequiredFields = () => {
    const baseFields = [
      { name: 'username', label: 'Username', type: 'text', placeholder: 'Enter your username' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email address' },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' },
      { name: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Confirm your password' },
    ];

    if (userType === 'club' || userType === 'partner') {
      return [...baseFields, { name: 'business_name', label: 'Business Name', type: 'text', placeholder: 'Enter your business name' }];
    } else {
      return [...baseFields, { name: 'full_name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name' }];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="animate-on-scroll text-3xl font-bold text-gray-900 mb-4">
            Required Information
          </h1>
          <p className="animate-on-scroll text-lg text-gray-600">
            Please provide the essential information to create your {userType} account
          </p>
        </div>

        <div>
          <Card className="animate-on-scroll w-full">
            <CardHeader>
              <CardTitle className="animate-on-scroll text-xl">Account Details</CardTitle>
              <CardDescription className="animate-on-scroll">
                These fields are required to create your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {getRequiredFields().map((field, index) => (
                <div
                  key={field.name}
                  className="space-y-2"
                >
                  <Label htmlFor={field.name} className="animate-on-scroll">{field.label}</Label>
                  <div className="relative">
                    <input
                      id={field.name}
                      name={field.name}
                      type={
                        field.type === 'password' 
                          ? (field.name === 'password' ? (showPassword ? 'text' : 'password') : (showConfirmPassword ? 'text' : 'password'))
                          : field.type
                      }
                      // placeholder={field.placeholder}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      required
                      className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {field.type === 'password' && (
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:scale-110 transition-transform duration-300"
                        onClick={() => {
                          if (field.name === 'password') {
                            setShowPassword(!showPassword);
                          } else {
                            setShowConfirmPassword(!showConfirmPassword);
                          }
                        }}
                      >
                        {field.name === 'password' 
                          ? (showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)
                          : (showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)
                        }
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            className="animate-on-scroll flex items-center gap-2 w-full sm:w-auto hover:scale-105 transition-transform duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={handleSkipToRegister}
              disabled={loading}
              className="animate-on-scroll w-full sm:w-auto hover:scale-105 transition-transform duration-300"
            >
              {loading ? 'Creating Account...' : 'Skip & Register Now'}
            </Button>
            
            <Button
              onClick={handleContinue}
              disabled={loading}
              className="animate-on-scroll flex items-center gap-2 w-full sm:w-auto hover:scale-105 transition-transform duration-300"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequiredFieldsPage; 