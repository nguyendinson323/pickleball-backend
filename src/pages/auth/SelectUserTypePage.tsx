import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';

const userTypes = [
  {
    type: 'player',
    title: 'Player',
    description: 'Join tournaments, find partners, and track your rankings',
    color: 'bg-blue-500',
    features: ['Tournament registration', 'Player finder', 'Ranking tracking', 'Match scheduling']
  },
  {
    type: 'coach',
    title: 'Coach',
    description: 'Offer training sessions and manage your coaching business',
    color: 'bg-green-500',
    features: ['Training sessions', 'Student management', 'Skill assessments', 'Coaching calendar']
  },
  {
    type: 'club',
    title: 'Club',
    description: 'Manage your pickleball club and court reservations',
    color: 'bg-purple-500',
    features: ['Court management', 'Member management', 'Tournament hosting', 'Equipment rental']
  },
  {
    type: 'partner',
    title: 'Partner',
    description: 'Business partnerships and equipment sales',
    color: 'bg-orange-500',
    features: ['Equipment sales', 'Sponsorship opportunities', 'Business networking', 'Event partnerships']
  },
  {
    type: 'state',
    title: 'State Committee',
    description: 'Manage state-level pickleball activities and regional associations',
    color: 'bg-red-500',
    features: ['State tournaments', 'Regional management', 'Member oversight', 'State microsite']
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

  const getIcon = (type: string) => {
    switch (type) {
      case 'player':
        return (
          <svg className="w-8 h-8 text-white transition-transform duration-300 hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'coach':
        return (
          <svg className="w-8 h-8 text-white transition-transform duration-300 hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        );
      case 'club':
        return (
          <svg className="w-8 h-8 text-white transition-transform duration-300 hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'partner':
        return (
          <svg className="w-8 h-8 text-white transition-transform duration-300 hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'state':
        return (
          <svg className="w-8 h-8 text-white transition-transform duration-300 hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-white transition-transform duration-300 hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 
            className="text-4xl font-bold text-gray-900 mb-4 transition-all duration-500 hover:text-blue-600 hover:scale-105 animate-on-scroll"
            style={{
              animation: 'fadeInUp 0.8s ease-out forwards'
            }}
          >
            Choose Your Account Type
          </h1>
          <p 
            className="text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-500 hover:text-gray-800 animate-on-scroll"
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
            return (
              <div key={userType.type}>
                <div 
                  data-user-type={userType.type}
                  className={`card cursor-pointer transition-all duration-500 ease-out hover:shadow-2xl hover:scale-105 transform hover:-translate-y-1 bg-white rounded-lg shadow-lg border border-gray-200 p-6 animate-on-scroll ${
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
                  <div className="text-center pb-4">
                    <div 
                      className={`w-16 h-16 rounded-full ${userType.color} flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110 hover:rotate-3 animate-on-scroll`}
                      style={{
                        animationDelay: `${index * 0.1 + 0.2}s`,
                        animation: 'bounceIn 0.8s ease-out forwards'
                      }}
                    >
                      {getIcon(userType.type)}
                    </div>
                    <h2 
                      className="text-xl font-semibold text-gray-900 transition-all duration-300 hover:text-blue-600 animate-on-scroll"
                      style={{
                        animationDelay: `${index * 0.1 + 0.3}s`,
                        animation: 'slideInRight 0.6s ease-out forwards'
                      }}
                    >
                      {userType.title}
                    </h2>
                    <p 
                      className="text-gray-600 transition-all duration-300 hover:text-gray-800 animate-on-scroll"
                      style={{
                        animationDelay: `${index * 0.1 + 0.4}s`,
                        animation: 'fadeIn 0.8s ease-out forwards'
                      }}
                    >
                      {userType.description}
                    </p>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      {userType.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className="flex items-center text-sm text-gray-600 transition-all duration-300 hover:text-blue-600 animate-on-scroll"
                          style={{
                            animationDelay: `${index * 0.1 + 0.5 + featureIndex * 0.1}s`,
                            animation: 'slideInLeft 0.6s ease-out forwards'
                          }}
                        >
                          <div className={`w-2 h-2 rounded-full ${userType.color} mr-3 transition-all duration-300 hover:scale-150 hover:animate-pulse animate-on-scroll`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center max-w-md mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:scale-105 hover:-translate-x-2 transition-all duration-300 hover:shadow-lg hover:bg-gray-100 animate-on-scroll"
            style={{
              animationDelay: '0.8s',
              animation: 'slideInLeft 0.6s ease-out forwards'
            }}
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          
          <button
            onClick={handleContinue}
            disabled={!selectedType}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:scale-105 hover:translate-x-2 transition-all duration-300 hover:shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed animate-on-scroll"
            style={{
              animationDelay: '0.9s',
              animation: 'slideInRight 0.6s ease-out forwards'
            }}
          >
            Continue
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectUserTypePage; 