import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { 
  User, 
  Users, 
  Building2, 
  Handshake, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const userTypes = [
  {
    type: 'player',
    title: 'Player',
    description: 'Join tournaments, find partners, and track your rankings',
    icon: User,
    color: 'bg-blue-500',
    features: ['Tournament registration', 'Player finder', 'Ranking tracking', 'Match scheduling']
  },
  {
    type: 'coach',
    title: 'Coach',
    description: 'Offer training sessions and manage your coaching business',
    icon: Users,
    color: 'bg-green-500',
    features: ['Training sessions', 'Student management', 'Skill assessments', 'Coaching calendar']
  },
  {
    type: 'club',
    title: 'Club',
    description: 'Manage your pickleball club and court reservations',
    icon: Building2,
    color: 'bg-purple-500',
    features: ['Court management', 'Member management', 'Tournament hosting', 'Equipment rental']
  },
  {
    type: 'partner',
    title: 'Partner',
    description: 'Business partnerships and equipment sales',
    icon: Handshake,
    color: 'bg-orange-500',
    features: ['Equipment sales', 'Sponsorship opportunities', 'Business networking', 'Event partnerships']
  }
];

const SelectUserTypePage = () => {
  const [selectedType, setSelectedType] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedType) {
      // Store the selected user type in localStorage for the next step
      localStorage.setItem('registration_user_type', selectedType);
      navigate('/register/required-fields');
    }
  };

  const handleBack = () => {
    navigate('/register');
  };

  const handleCardClick = (userType: string) => {
    setSelectedType(userType);
    
    // Add selection animation
    const cardElement = document.querySelector(`[data-user-type="${userType}"]`);
    if (cardElement) {
      cardElement.classList.add('selected');
      setTimeout(() => {
        cardElement.classList.remove('selected');
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 
            className="text-4xl font-bold text-gray-900 mb-4 transition-all duration-500 hover:text-blue-600 hover:scale-105"
            style={{
              animation: 'fadeInUp 0.8s ease-out forwards'
            }}
          >
            Choose Your Account Type
          </h1>
          <p 
            className="text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-500 hover:text-gray-800"
            style={{
              animationDelay: '0.2s',
              animation: 'fadeInUp 0.8s ease-out forwards'
            }}
          >
            Select the type of account that best describes your role in the pickleball community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
          {userTypes.map((userType, index) => {
            const IconComponent = userType.icon;
            return (
              <div key={userType.type}>
                <Card 
                  data-user-type={userType.type}
                  className={`card cursor-pointer transition-all duration-500 ease-out hover:shadow-2xl hover:scale-105 transform hover:-translate-y-1 ${
                    selectedType === userType.type 
                      ? 'ring-2 ring-blue-500 bg-blue-50 scale-105 shadow-xl' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleCardClick(userType.type)}
                  style={{
                    animationDelay: `${index * 0.5}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <CardHeader className="text-center pb-4">
                    <div 
                      className={`w-16 h-16 rounded-full ${userType.color} flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110 hover:rotate-3`}
                      style={{
                        animationDelay: `${index * 0.1 + 0.2}s`,
                        animation: 'bounceIn 0.8s ease-out forwards'
                      }}
                    >
                      <IconComponent className="w-8 h-8 text-white transition-transform duration-300 hover:scale-125" />
                    </div>
                    <CardTitle 
                      className="text-xl font-semibold text-gray-900 transition-all duration-300 hover:text-blue-600"
                      style={{
                        animationDelay: `${index * 0.1 + 0.3}s`,
                        animation: 'slideInRight 0.6s ease-out forwards'
                      }}
                    >
                      {userType.title}
                    </CardTitle>
                    <CardDescription 
                      className="text-gray-600 transition-all duration-300 hover:text-gray-800"
                      style={{
                        animationDelay: `${index * 0.1 + 0.4}s`,
                        animation: 'fadeIn 0.8s ease-out forwards'
                      }}
                    >
                      {userType.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {userType.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className="flex items-center text-sm text-gray-600 transition-all duration-300 hover:text-blue-600"
                          style={{
                            animationDelay: `${index * 0.1 + 0.5 + featureIndex * 0.1}s`,
                            animation: 'slideInLeft 0.6s ease-out forwards'
                          }}
                        >
                          <div className={`w-2 h-2 rounded-full ${userType.color} mr-3 transition-all duration-300 hover:scale-150 hover:animate-pulse`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center max-w-md mx-auto">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2 hover:scale-105 hover:-translate-x-2 transition-all duration-300 hover:shadow-lg hover:bg-gray-100"
            style={{
              animationDelay: '0.8s',
              animation: 'slideInLeft 0.6s ease-out forwards'
            }}
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back
          </Button>
          
          <Button
            onClick={handleContinue}
            disabled={!selectedType}
            className="flex items-center gap-2 hover:scale-105 hover:translate-x-2 transition-all duration-300 hover:shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              animationDelay: '0.9s',
              animation: 'slideInRight 0.6s ease-out forwards'
            }}
          >
            Continue
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectUserTypePage; 