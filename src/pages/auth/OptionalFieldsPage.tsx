import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { registerUser } from '../../store/slices/authSlice';
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
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: 'Enter your phone number', icon: 'phone' },
      { name: 'state', label: 'State', type: 'text', placeholder: 'Enter your state', icon: 'mapPin' },
      { name: 'city', label: 'City', type: 'text', placeholder: 'Enter your city', icon: 'mapPin' },
      { name: 'address', label: 'Address', type: 'textarea', placeholder: 'Enter your address', icon: 'mapPin' },
      { name: 'website', label: 'Website', type: 'url', placeholder: 'Enter your website URL', icon: 'globe' },
    ];

    if (userType === 'player' || userType === 'coach') {
      return [
        ...baseFields,
        { name: 'date_of_birth', label: 'Date of Birth', type: 'date', placeholder: '', icon: 'calendar' },
        { name: 'gender', label: 'Gender', type: 'select', options: ['male', 'female', 'other', 'prefer_not_to_say'], icon: 'user' },
        { name: 'skill_level', label: 'Skill Level', type: 'select', options: ['2.5', '3.0', '3.5', '4.0', '4.5', '5.0', '5.5'], icon: 'award' },
        { name: 'curp', label: 'CURP', type: 'text', placeholder: 'Enter your CURP (18 characters)', icon: 'user' },
      ];
    } else if (userType === 'club' || userType === 'partner') {
      return [
        ...baseFields,
        { name: 'contact_person', label: 'Contact Person', type: 'text', placeholder: 'Enter contact person name', icon: 'user' },
        { name: 'job_title', label: 'Job Title', type: 'text', placeholder: 'Enter job title', icon: 'user' },
        { name: 'rfc', label: 'RFC', type: 'text', placeholder: 'Enter your RFC (max 13 characters)', icon: 'user' },
      ];
    } else {
      return baseFields;
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'phone':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        );
      case 'mapPin':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'globe':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'calendar':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'user':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'award':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
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
    return (
      <div
        key={field.name}
        className="space-y-2"
      >
        <label htmlFor={field.name} className="animate-on-scroll flex items-center gap-2 text-sm font-medium text-gray-700">
          {getIcon(field.icon)}
          {field.label}
        </label>
        
        {field.type === 'select' ? (
          <select
            value={formData[field.name as keyof typeof formData]}
            onChange={(e) => handleSelectChange(field.name, e.target.value)}
            className="animate-on-scroll w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select {field.label.toLowerCase()}</option>
            {field.options.map((option: string) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>
        ) : field.type === 'textarea' ? (
          <textarea
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name as keyof typeof formData]}
            onChange={handleChange}
            rows={3}
            className="animate-on-scroll w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name as keyof typeof formData]}
            onChange={handleChange}
            className="animate-on-scroll w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
            <div className="animate-on-scroll w-full bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="animate-on-scroll text-xl flex items-center gap-2 font-semibold text-gray-900">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Required Documents
                </h2>
                <p className="animate-on-scroll text-gray-600 mt-1">
                  Please upload your profile photo and verification document
                </p>
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Why these are required:</strong> Profile photos help other players recognize you, 
                    and verification documents ensure the safety and authenticity of our community. 
                    These documents are securely stored and only used for verification purposes.
                  </p>
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="flex gap-6">
                  {/* Profile Photo Upload */}
                  <div className="flex-1 space-y-2">
                    <label htmlFor="profile_photo" className="animate-on-scroll flex items-center gap-2 text-sm font-medium text-gray-700">
                      <span>Profile Photo</span>
                      <span className="text-red-500 font-bold">*</span>
                      <span className="text-xs text-gray-500">(Required)</span>
                    </label>
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
                          <button
                            className="animate-on-scroll px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                            onClick={() => handleFileChange('profile_photo', null)}
                          >
                            Remove Photo
                          </button>
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
                          <button
                            className="animate-on-scroll px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => document.getElementById('profile_photo')?.click()}
                          >
                            Choose Photo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Verification Document Upload */}
                  <div className="flex-1 space-y-2">
                    <label htmlFor="verification_document" className="animate-on-scroll flex items-center gap-2 text-sm font-medium text-gray-700">
                      <span>Verification Document (INE/Passport)</span>
                      <span className="text-red-500 font-bold">*</span>
                      <span className="text-xs text-gray-500">(Required)</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      {files.verification_document ? (
                        <div className="space-y-2">
                          <div className="w-16 h-20 mx-auto bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-2xl">📄</span>
                          </div>
                          <p className="text-sm text-gray-600">{files.verification_document.name}</p>
                          <button
                            className="animate-on-scroll px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                            onClick={() => handleFileChange('verification_document', null)}
                          >
                            Remove Document
                          </button>
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
                          <button
                            className="animate-on-scroll px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => document.getElementById('verification_document')?.click()}
                          >
                            Choose Document
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="animate-on-scroll w-full bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="animate-on-scroll text-xl flex items-center gap-2 font-semibold text-gray-900">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Personal Information
                </h2>
                <p className="animate-on-scroll text-gray-600 mt-1">
                  Help others learn more about you
                </p>
              </div>
              <div className="px-6 py-4 space-y-6">
                {getOptionalFields().slice(0, Math.ceil(getOptionalFields().length / 2)).map((field, index) => 
                  renderField(field, index)
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="animate-on-scroll w-full bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="animate-on-scroll text-xl flex items-center gap-2 font-semibold text-gray-900">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Additional Details
                </h2>
                <p className="animate-on-scroll text-gray-600 mt-1">
                  Additional information for your profile
                </p>
              </div>
              <div className="px-6 py-4 space-y-6">
                {getOptionalFields().slice(Math.ceil(getOptionalFields().length / 2)).map((field, index) => 
                  renderField(field, index + Math.ceil(getOptionalFields().length / 2))
                )}
              </div>
            </div>
          </div>
        </div>

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
              onClick={handleSkip}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Skip & Register Now'}
            </button>
            
            <button
              className="animate-on-scroll px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Complete Registration'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionalFieldsPage; 