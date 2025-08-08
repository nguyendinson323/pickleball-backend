import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { motion } from 'framer-motion';
import { getAnimationVariants } from '../../lib/animations';
import { 
  User, 
  Users, 
  Building2, 
  Handshake, 
  MapPin, 
  Globe,
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
  },
  {
    type: 'state',
    title: 'State Federation',
    description: 'Manage state-level tournaments and regulations',
    icon: MapPin,
    color: 'bg-red-500',
    features: ['State tournaments', 'Regulation management', 'Regional rankings', 'Federation oversight']
  },
  {
    type: 'federation',
    title: 'National Federation',
    description: 'National-level governance and major tournaments',
    icon: Globe,
    color: 'bg-indigo-500',
    features: ['National tournaments', 'Policy making', 'International relations', 'Major event hosting']
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={getAnimationVariants('up', 0.7, 0.1)}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Account Type
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the type of account that best describes your role in the pickleball community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {userTypes.map((userType, index) => {
            const IconComponent = userType.icon;
            return (
              <motion.div
                key={userType.type}
                variants={getAnimationVariants('up', 0.7, 0.2 + index * 0.1)}
                initial="hidden"
                animate="visible"
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedType === userType.type 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedType(userType.type)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-full ${userType.color} flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {userType.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {userType.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {userType.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <div className={`w-2 h-2 rounded-full ${userType.color} mr-3`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          variants={getAnimationVariants('up', 0.7, 0.8)}
          initial="hidden"
          animate="visible"
          className="flex justify-between items-center max-w-md mx-auto"
        >
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <Button
            onClick={handleContinue}
            disabled={!selectedType}
            className="flex items-center gap-2"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default SelectUserTypePage; 