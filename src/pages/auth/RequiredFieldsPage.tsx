import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { registerUser } from '../../store/slices/authSlice';
import { toast } from 'sonner';

const RequiredFieldsPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    business_name: '',
    privacy_policy_accepted: false,
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
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    console.log('Form field change:', { name, value, type, checked, newValue });
    
    setFormData({
      ...formData,
      [name]: newValue,
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
      
      // Require privacy policy acceptance for players and coaches
      console.log('Validating privacy policy for:', userType);
      console.log('Privacy policy value:', formData.privacy_policy_accepted, typeof formData.privacy_policy_accepted);
      if (!formData.privacy_policy_accepted) {
        toast.error('You must accept the privacy policy to continue');
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
      privacy_policy_accepted: formData.privacy_policy_accepted,
    }));

    navigate('/register/optional-fields');
  };

  const handleBack = () => {
    navigate('/register/select-type');
  };

  const handleSkipToRegister = async () => {
    console.log('handleSkipToRegister called');
    console.log('Current form data:', formData);
    console.log('Privacy policy accepted:', formData.privacy_policy_accepted);
    
    if (!validateForm()) return;

    // Players and coaches must go through the full registration process (including file uploads)
    if (userType === 'player' || userType === 'coach') {
      toast.error('Players and coaches must complete the full registration process including document uploads');
      return;
    }

    try {
      const registrationData = {
        user_type: userType as any,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        business_name: formData.business_name,
        privacy_policy_accepted: Boolean(formData.privacy_policy_accepted),
      };

      console.log('Sending registration data:', registrationData);
      console.log('Privacy policy accepted:', formData.privacy_policy_accepted, typeof formData.privacy_policy_accepted);
      console.log('Form data state:', formData);
      console.log('User type:', userType);

      const result = await dispatch(registerUser(registrationData));
      
      // Check if registration was successful
      // The result is a Redux action object with { type, payload, meta }
      const registrationResult = result as any;
      console.log('Registration result:', registrationResult);
      
      // Extract the actual API response data from the payload
      const apiResponse = registrationResult?.payload;
      console.log('API response from payload:', apiResponse);
      
      if (apiResponse?.data?.user && apiResponse?.data?.tokens) {
        // Registration successful - clear localStorage and navigate
        localStorage.removeItem('registration_user_type');
        toast.success('Registration successful! Welcome to the pickleball community!');
        
        // Navigate to appropriate dashboard based on user type
        const userType = apiResponse.data.user.user_type;
        switch (userType) {
          case 'club':
            navigate('/club/dashboard');
            break;
          case 'partner':
            navigate('/partner/dashboard');
            break;
          case 'state':
            navigate('/state/dashboard');
            break;
          default:
            navigate('/club/dashboard');
        }
      } else {
        // Registration failed - show error and stay on page
        toast.error('Registration failed - Invalid response from server');
        console.error('Registration failed - Invalid response structure:', apiResponse);
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
          <div className="animate-on-scroll w-full bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="animate-on-scroll text-xl font-semibold text-gray-900">Account Details</h2>
              <p className="animate-on-scroll text-gray-600">
                These fields are required to create your account
              </p>
            </div>
            <div className="px-6 py-4 space-y-6">
              {getRequiredFields().map((field, index) => (
                <div
                  key={field.name}
                  className="space-y-2"
                >
                  <label htmlFor={field.name} className="animate-on-scroll block text-sm font-medium text-gray-700">{field.label}</label>
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
                      value={formData[field.name as keyof typeof formData] as string}
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
                          ? (showPassword ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            ))
                          : (showConfirmPassword ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            ))
                        }
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Privacy Policy Section */}
        {(userType === 'player' || userType === 'coach') && (
          <div className="mt-6">
            <div className="animate-on-scroll w-full bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="animate-on-scroll text-xl font-semibold text-gray-900">Privacy Policy</h2>
                <p className="animate-on-scroll text-gray-600">
                  Please read and accept our privacy policy to continue
                </p>
              </div>
              <div className="px-6 py-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input
                      id="privacy_policy_accepted"
                      name="privacy_policy_accepted"
                      type="checkbox"
                      checked={formData.privacy_policy_accepted}
                      onChange={handleChange}
                      required
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Current value: {formData.privacy_policy_accepted ? 'true' : 'false'}
                    </span>
                    <div className="text-sm text-gray-700">
                      <label htmlFor="privacy_policy_accepted" className="font-medium">
                        I have read and accept the{' '}
                        <a 
                          href="/privacy-policy" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          Privacy Policy
                        </a>
                        {' '}and agree to the collection and use of my personal information as described.
                      </label>
                      <p className="mt-1 text-gray-600">
                        This includes consent to process your personal data, send you communications about your account, 
                        and share information with other players when you use the player finder feature.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-8">
          <button
            className="animate-on-scroll flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto hover:scale-105 transition-transform duration-300"
            onClick={handleBack}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              className="animate-on-scroll px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors w-full sm:w-auto hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSkipToRegister}
              disabled={loading || userType === 'player' || userType === 'coach'}
              title={userType === 'player' || userType === 'coach' ? 'Players and coaches must complete full registration' : 'Skip optional fields and register now'}
            >
              {loading ? 'Creating Account...' : 'Skip & Register Now'}
            </button>
            
            <button
              className="animate-on-scroll flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto hover:scale-105 transition-transform duration-300"
              onClick={handleContinue}
              disabled={loading}
            >
              Continue
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequiredFieldsPage; 