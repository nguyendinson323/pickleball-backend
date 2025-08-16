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

  // Separate state for file uploads
  const [files, setFiles] = useState({
    profile_photo: null as File | null,
    verification_document: null as File | null,
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

  const handleFileChange = (name: string, file: File | null) => {
    setFiles(prev => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleFileDrop = (name: string, droppedFiles: FileList | null) => {
    if (droppedFiles && droppedFiles.length > 0) {
      const file = droppedFiles[0];
      handleFileChange(name, file);
    }
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
      // Validate required files for players and coaches
      if ((userType === 'player' || userType === 'coach')) {
        if (!files.profile_photo) {
          toast.error('Profile photo is required for players and coaches');
          return;
        }
        if (!files.verification_document) {
          toast.error('Verification document is required for players and coaches');
          return;
        }
      }
      console.log('formData', formData);
      
      // Create FormData for file uploads
      const formDataToSend = new FormData();
      
      // Add basic registration data
      formDataToSend.append('user_type', userType);
      Object.entries(requiredFields).forEach(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          formDataToSend.append(key, String(value));
        }
      });
      
      // Add optional form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== '' && value !== undefined && typeof value === 'string') {
          formDataToSend.append(key, value);
        }
      });

      // Add files
      if (files.profile_photo) {
        formDataToSend.append('profile_photo', files.profile_photo);
      }
      if (files.verification_document) {
        formDataToSend.append('verification_document', files.verification_document);
      }

      // Validate required fields before sending
      const validationErrors = [];
      
      // Check for missing required fields for players and coaches
      if (userType === 'player' || userType === 'coach') {
        if (!files.profile_photo) {
          validationErrors.push('Profile photo is required');
        }
        if (!files.verification_document) {
          validationErrors.push('Verification document is required');
        }
        if (!requiredFields.full_name || requiredFields.full_name.trim() === '') {
          validationErrors.push('Full name is required');
        }
      }
      
      // Check for missing required fields for clubs and partners
      if (userType === 'club' || userType === 'partner') {
        if (!requiredFields.business_name || requiredFields.business_name.trim() === '') {
          validationErrors.push('Business name is required');
        }
      }
      
      // Check privacy policy acceptance
      if (!requiredFields.privacy_policy_accepted) {
        validationErrors.push('You must accept the privacy policy');
      }
      
      // Check other required fields
      if (!requiredFields.username || requiredFields.username.trim() === '') {
        validationErrors.push('Username is required');
      }
      if (!requiredFields.email || requiredFields.email.trim() === '') {
        validationErrors.push('Email is required');
      }
      if (!requiredFields.password || requiredFields.password.trim() === '') {
        validationErrors.push('Password is required');
      }
      
      // If there are validation errors, show them and stop
      if (validationErrors.length > 0) {
        toast.error(`Please fix the following issues:\n${validationErrors.join('\n')}`);
        return;
      }

      const result = await dispatch(registerUser(formDataToSend));
      
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
        localStorage.removeItem('registration_required_fields');
        toast.success('Registration successful! Welcome to the pickleball community!');
        
        // Navigate to appropriate dashboard based on user type
        const userType = apiResponse.data.user.user_type;
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
        // Registration failed - show error and stay on page
        toast.error('Registration failed - Invalid response from server');
        console.error('Registration failed - Invalid response structure:', apiResponse);
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

      // Validate required fields before sending
      const validationErrors = [];
      
      // Check for missing required fields for clubs and partners
      if (userType === 'club' || userType === 'partner') {
        if (!requiredFields.business_name || requiredFields.business_name.trim() === '') {
          validationErrors.push('Business name is required');
        }
      }
      
      // Check privacy policy acceptance
      if (!requiredFields.privacy_policy_accepted) {
        validationErrors.push('You must accept the privacy policy');
      }
      
      // Check other required fields
      if (!requiredFields.username || requiredFields.username.trim() === '') {
        validationErrors.push('Username is required');
      }
      if (!requiredFields.email || requiredFields.email.trim() === '') {
        validationErrors.push('Email is required');
      }
      if (!requiredFields.password || requiredFields.password.trim() === '') {
        validationErrors.push('Password is required');
      }
      
      // If there are validation errors, show them and stop
      if (validationErrors.length > 0) {
        toast.error(`Please fix the following issues:\n${validationErrors.join('\n')}`);
        return;
      }

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
        localStorage.removeItem('registration_required_fields');
        toast.success('Registration successful! You can complete your profile later.');
        
        // Navigate to appropriate dashboard based on user type
        const userType = apiResponse.data.user.user_type;
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
        // Registration failed - show error and stay on page
        toast.error('Registration failed - Invalid response from server');
        console.error('Registration failed - Invalid response structure:', apiResponse);
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

        {/* File Upload Section for Players and Coaches */}
        {(userType === 'player' || userType === 'coach') && (
          <div className="mt-8">
            <Card className="animate-on-scroll w-full">
              <CardHeader>
                <CardTitle className="animate-on-scroll text-xl flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Required Documents
                </CardTitle>
                <CardDescription className="animate-on-scroll">
                  Please upload your profile photo and verification document
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-6">
                  {/* Profile Photo Upload */}
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="profile_photo" className="animate-on-scroll">
                      Profile Photo *
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      {files.profile_photo ? (
                        <div className="space-y-2">
                          <div className="w-20 h-20 mx-auto rounded-full overflow-hidden bg-gray-100">
                            <img
                              src={URL.createObjectURL(files.profile_photo)}
                              alt="Profile preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-sm text-gray-600">{files.profile_photo.name}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFileChange('profile_photo', null)}
                          >
                            Remove Photo
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-gray-500">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-400">PNG, JPG, WebP up to 5MB</p>
                          <input
                            id="profile_photo"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange('profile_photo', e.target.files?.[0] || null)}
                            className="hidden"
                          />
                          <Button
                            variant="outline"
                            onClick={() => document.getElementById('profile_photo')?.click()}
                          >
                            Choose Photo
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Verification Document Upload */}
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="verification_document" className="animate-on-scroll">
                      Verification Document (INE/Passport) *
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      {files.verification_document ? (
                        <div className="space-y-2">
                          <div className="w-16 h-20 mx-auto bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-2xl">📄</span>
                          </div>
                          <p className="text-sm text-gray-600">{files.verification_document.name}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleFileChange('verification_document', null)}
                          >
                            Remove Document
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-gray-500">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-400">PDF, PNG, JPG up to 5MB</p>
                          <input
                            id="verification_document"
                            type="file"
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={(e) => handleFileChange('verification_document', e.target.files?.[0] || null)}
                            className="hidden"
                          />
                          <Button
                            variant="outline"
                            onClick={() => document.getElementById('verification_document')?.click()}
                          >
                            Choose Document
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

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