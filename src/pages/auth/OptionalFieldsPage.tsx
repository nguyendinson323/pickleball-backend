import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { registerUser } from '../../store/slices/authSlice';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowLeft, CheckCircle, User, MapPin, Phone, Globe, Calendar, Award } from 'lucide-react';
import { toast } from 'sonner';

const OptionalFieldsPage = () => {
  const [formData, setFormData] = useState({
    date_of_birth: '',
    gender: '',
    phone: '',
    profile_photo: '',
    bio: '',
    skill_level: '',
    state: '',
    city: '',
    address: '',
    latitude: '',
    longitude: '',
    timezone: '',
    curp: '',
    rfc: '',
    website: '',
    contact_person: '',
    job_title: '',
  });
  const [userType, setUserType] = useState<string>('');
  const [requiredFields, setRequiredFields] = useState<any>({});

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const storedUserType = localStorage.getItem('registration_user_type');
    const storedRequiredFields = localStorage.getItem('registration_required_fields');
    
    if (!storedUserType || !storedRequiredFields) {
      navigate('/register/select-type');
      return;
    }
    
    setUserType(storedUserType);
    setRequiredFields(JSON.parse(storedRequiredFields));
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getOptionalFields = () => {
    const baseFields = [
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter your phone number', icon: Phone },
      { name: 'state', label: 'State', type: 'text', placeholder: 'Enter your state', icon: MapPin },
      { name: 'city', label: 'City', type: 'text', placeholder: 'Enter your city', icon: MapPin },
      { name: 'address', label: 'Address', type: 'textarea', placeholder: 'Enter your address', icon: MapPin },
      { name: 'website', label: 'Website', type: 'url', placeholder: 'Enter your website URL', icon: Globe },
    ];

    if (userType === 'player' || userType === 'coach') {
      return [
        ...baseFields,
        { name: 'date_of_birth', label: 'Date of Birth', type: 'date', placeholder: '', icon: Calendar },
        { name: 'gender', label: 'Gender', type: 'select', options: ['male', 'female', 'other', 'prefer_not_to_say'], icon: User },
        { name: 'skill_level', label: 'Skill Level', type: 'select', options: ['2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'], icon: Award },
        { name: 'curp', label: 'CURP', type: 'text', placeholder: 'Enter your CURP (18 characters)', icon: User },
      ];
    } else if (userType === 'club' || userType === 'partner') {
      return [
        ...baseFields,
        { name: 'contact_person', label: 'Contact Person', type: 'text', placeholder: 'Enter contact person name', icon: User },
        { name: 'job_title', label: 'Job Title', type: 'text', placeholder: 'Enter job title', icon: User },
        { name: 'rfc', label: 'RFC', type: 'text', placeholder: 'Enter your RFC (max 13 characters)', icon: User },
      ];
    } else {
      return baseFields;
    }
  };

  const handleRegister = async () => {
    try {
      // Combine required and optional fields
      const registrationData = {
        user_type: userType as any,
        ...requiredFields,
        ...formData,
        // Convert empty strings to undefined for optional fields
        ...Object.fromEntries(
          Object.entries(formData).map(([key, value]) => [
            key, 
            value === '' ? undefined : value
          ])
        ),
      };

      const result = await dispatch(registerUser(registrationData));
      
      // Clear localStorage
      localStorage.removeItem('registration_user_type');
      localStorage.removeItem('registration_required_fields');
      
      toast.success('Registration successful! Welcome to the pickleball community!');
      
      // Navigate to appropriate dashboard based on user type
      const response = result as any;
      if (response?.data?.user?.user_type) {
        const userType = response.data.user.user_type;
        switch (userType) {
          case 'player':
            navigate('/player/dashboard');
            break;
          case 'coach':
            navigate('/coach/dashboard');
            break;
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
            navigate('/player/dashboard');
        }
      } else {
        navigate('/player/dashboard');
      }
    } catch (err) {
      toast.error(error || 'Registration failed');
    }
  };

  const handleBack = () => {
    navigate('/register/required-fields');
  };

  const handleSkip = async () => {
    try {
      const registrationData = {
        user_type: userType as any,
        ...requiredFields,
      };

      const result = await dispatch(registerUser(registrationData));
      
      // Clear localStorage
      localStorage.removeItem('registration_user_type');
      localStorage.removeItem('registration_required_fields');
      
      toast.success('Registration successful! You can complete your profile later.');
      
      // Navigate to appropriate dashboard based on user type
      const response = result as any;
      if (response?.data?.user?.user_type) {
        const userType = response.data.user.user_type;
        switch (userType) {
          case 'player':
            navigate('/player/dashboard');
            break;
          case 'coach':
            navigate('/coach/dashboard');
            break;
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
            navigate('/player/dashboard');
        }
      } else {
        navigate('/player/dashboard');
      }
    } catch (err) {
      toast.error(error || 'Registration failed');
    }
  };

  const renderField = (field: any, index: number) => {
    const IconComponent = field.icon;
    
    return (
      <div
        key={field.name}
        className="space-y-2"
      >
        <Label htmlFor={field.name} className="animate-on-scroll flex items-center gap-2">
          <IconComponent className="w-4 h-4" />
          {field.label}
        </Label>
        
        {field.type === 'select' ? (
          <Select
            value={formData[field.name as keyof typeof formData]}
            onValueChange={(value) => handleSelectChange(field.name, value)}
          >
            <SelectTrigger className="animate-on-scroll">
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option: string) => (
                <SelectItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1).replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : field.type === 'textarea' ? (
          <Textarea
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name as keyof typeof formData]}
            onChange={handleChange}
            rows={3}
            className="animate-on-scroll"
          />
        ) : (
          <Input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name as keyof typeof formData]}
            onChange={handleChange}
            className="animate-on-scroll"
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="animate-on-scroll text-3xl font-bold text-gray-900 mb-4">
            Complete Your Profile
          </h1>
          <p className="animate-on-scroll text-lg text-gray-600">
            Add optional information to enhance your {userType} profile
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card className="animate-on-scroll w-full">
              <CardHeader>
                <CardTitle className="animate-on-scroll text-xl flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Personal Information
                </CardTitle>
                <CardDescription className="animate-on-scroll">
                  Help others learn more about you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {getOptionalFields().slice(0, Math.ceil(getOptionalFields().length / 2)).map((field, index) => 
                  renderField(field, index)
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="animate-on-scroll w-full">
              <CardHeader>
                <CardTitle className="animate-on-scroll text-xl flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Additional Details
                </CardTitle>
                <CardDescription className="animate-on-scroll">
                  Additional information for your profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {getOptionalFields().slice(Math.ceil(getOptionalFields().length / 2)).map((field, index) => 
                  renderField(field, index + Math.ceil(getOptionalFields().length / 2))
                )}
              </CardContent>
            </Card>
          </div>
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
              onClick={handleSkip}
              disabled={loading}
              className="animate-on-scroll w-full sm:w-auto hover:scale-105 transition-transform duration-300"
            >
              {loading ? 'Creating Account...' : 'Skip & Register Now'}
            </Button>
            
            <Button
              onClick={handleRegister}
              disabled={loading}
              className="animate-on-scroll w-full sm:w-auto hover:scale-105 transition-transform duration-300"
            >
              {loading ? 'Creating Account...' : 'Complete Registration'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionalFieldsPage; 