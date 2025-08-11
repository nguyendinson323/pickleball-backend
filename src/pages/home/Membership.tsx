import React, { useState } from "react";

// Simple SVG icon components
const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XMarkIcon = () => (
  <svg className="w-5 h-5 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Membership = () => {
  const [selectedUserType, setSelectedUserType] = useState<'player' | 'coach' | 'club' | 'partner' | 'state'>('player');

  // User type-specific membership plans
  const userTypePlans = {
    player: [
      {
        name: "Free",
        price: "$0",
        period: "month",
        description: "Basic access to federation resources",
        features: [
          "Access to public rankings",
          "Event calendar viewing",
          "Newsletter subscription",
          "Basic court finder"
        ],
        popular: false,
        color: "gray",
        type: "free"
      },
      {
        name: "Basic",
        price: "$49.99",
        period: "year",
        description: "Annual membership for casual players",
        features: [
          "All Free features",
          "Tournament registration",
          "Player profile & statistics",
          "Club affiliation",
          "Email support"
        ],
        popular: true,
        color: "blue",
        type: "basic"
      },
      {
        name: "Premium",
        price: "$99.99",
        period: "year",
        description: "Enhanced features for serious players",
        features: [
          "All Basic features",
          "Advanced analytics",
          "Priority tournament access",
          "Player finder (nearby players)",
          "Court reservations",
          "Phone support"
        ],
        popular: false,
        color: "purple",
        type: "premium"
      }
    ],
    coach: [
      {
        name: "Free",
        price: "$0",
        period: "month",
        description: "Basic access to federation resources",
        features: [
          "Access to public rankings",
          "Event calendar viewing",
          "Newsletter subscription"
        ],
        popular: false,
        color: "gray",
        type: "free"
      },
      {
        name: "Professional",
        price: "$79.99",
        period: "year",
        description: "Annual membership for coaches",
        features: [
          "All Free features",
          "Tournament registration",
          "Coach profile & credentials",
          "Student management tools",
          "Training session scheduling",
          "Email support"
        ],
        popular: true,
        color: "green",
        type: "professional"
      },
      {
        name: "Elite Coach",
        price: "$149.99",
        period: "year",
        description: "Premium coaching features",
        features: [
          "All Professional features",
          "Advanced student analytics",
          "Priority tournament access",
          "Coach finder (student matching)",
          "Training facility access",
          "Phone support"
        ],
        popular: false,
        color: "green",
        type: "elite"
      }
    ],
    club: [
      {
        name: "Basic Affiliation",
        price: "$199.99",
        period: "year",
        description: "Basic club affiliation",
        features: [
          "Club profile & microsite",
          "Member management",
          "Tournament hosting",
          "Court registry",
          "Email support"
        ],
        popular: true,
        color: "purple",
        type: "basic"
      },
      {
        name: "Premium Club",
        price: "$399.99",
        period: "year",
        description: "Advanced club management",
        features: [
          "All Basic features",
          "Advanced analytics",
          "Priority tournament access",
          "Court reservations",
          "Player & coach oversight",
          "Phone support"
        ],
        popular: false,
        color: "purple",
        type: "premium"
      }
    ],
    partner: [
      {
        name: "Premium Partner",
        price: "$299.99",
        period: "year",
        description: "Partner membership",
        features: [
          "Partner profile & microsite",
          "Tournament hosting",
          "Court registry",
          "Player & coach oversight",
          "Email support"
        ],
        popular: true,
        color: "orange",
        type: "premium"
      },
      {
        name: "Enterprise Partner",
        price: "$599.99",
        period: "year",
        description: "Enterprise partner features",
        features: [
          "All Premium features",
          "Advanced analytics",
          "Priority tournament access",
          "Court reservations",
          "Full member oversight",
          "Phone support"
        ],
        popular: false,
        color: "orange",
        type: "enterprise"
      }
    ],
    state: [
      {
        name: "State Affiliation",
        price: "$499.99",
        period: "year",
        description: "State federation affiliation",
        features: [
          "State profile & microsite",
          "Full member management",
          "Tournament creation & hosting",
          "Court registry management",
          "Player & club oversight",
          "State-wide announcements",
          "Priority support"
        ],
        popular: true,
        color: "purple",
        type: "federation"
      }
    ]
  };

  const currentPlans = userTypePlans[selectedUserType];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero/Header Section */}
        <div className="text-center mb-16">
          <h2 className="animate-on-scroll text-4xl font-bold text-gray-900 mb-6">
            Choose Your Membership
          </h2>
          <p className="animate-on-scroll text-xl text-gray-600 max-w-3xl mx-auto">
            Join the Pickleball Federation and unlock exclusive benefits, tournaments, and community features.
          </p>
        </div>

        {/* User Type Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-2xl p-2 shadow-lg border border-gray-200">
            {Object.keys(userTypePlans).map((userType, index) => {
              const isSelected = selectedUserType === userType;
              const getIcon = (type: string) => {
                switch (type) {
                  case 'player':
                    return (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    );
                  case 'coach':
                    return (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    );
                  case 'club':
                    return (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    );
                  case 'partner':
                    return (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    );
                  case 'state':
                    return (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    );
                  default:
                    return null;
                }
              };

              const getColorClasses = (type: string) => {
                switch (type) {
                  case 'player':
                    return isSelected ? 'bg-blue-500 text-white shadow-blue-200' : 'text-blue-600 hover:bg-blue-50';
                  case 'coach':
                    return isSelected ? 'bg-green-500 text-white shadow-green-200' : 'text-green-600 hover:bg-green-50';
                  case 'club':
                    return isSelected ? 'bg-purple-500 text-white shadow-purple-200' : 'text-purple-600 hover:bg-purple-50';
                  case 'partner':
                    return isSelected ? 'bg-orange-500 text-white shadow-orange-200' : 'text-orange-600 hover:bg-orange-50';
                  case 'state':
                    return isSelected ? 'bg-indigo-500 text-white shadow-indigo-200' : 'text-indigo-600 hover:bg-indigo-50';
                  default:
                    return isSelected ? 'bg-gray-500 text-white shadow-gray-200' : 'text-gray-600 hover:bg-gray-50';
                }
              };

              return (
                <button
                  key={userType}
                  onClick={() => setSelectedUserType(userType as keyof typeof userTypePlans)}
                  className={`relative px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isSelected 
                      ? 'shadow-lg scale-105' 
                      : 'hover:shadow-md'
                  } ${getColorClasses(userType)}`}
                >
                  <div className="flex items-center space-x-2">
                    <span className={`transition-all duration-300 ${isSelected ? 'scale-110' : ''}`}>
                      {getIcon(userType)}
                    </span>
                    <span className="font-medium">
                      {userType.charAt(0).toUpperCase() + userType.slice(1)}
                    </span>
                  </div>
                  
                  {/* Active indicator */}
                  {isSelected && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-current rounded-full animate-pulse"></div>
                  )}
                  
                  {/* Hover effect */}
                  <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
                    isSelected ? 'opacity-0' : 'opacity-0 hover:opacity-10'
                  } bg-current`}></div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Membership Plans Section */}
        <div className={`grid gap-6 mb-16 ${
          currentPlans.length === 1 ? 'md:grid-cols-1 max-w-2xl mx-auto' :
          currentPlans.length === 2 ? 'md:grid-cols-2 max-w-4xl mx-auto' :
          'md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {currentPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`animate-on-scroll card relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ring-2  ${
                plan.popular ? 'ring-purple-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-purple-500 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className={`p-6 ${plan.popular ? 'pt-12' : ''}`}>
                <div className="text-center mb-6">
                  <h3 className={`animate-on-scroll text-2xl font-bold mb-2 ${
                    plan.color === 'purple' ? 'text-purple-600' :
                    plan.color === 'blue' ? 'text-blue-600' :
                    plan.color === 'green' ? 'text-green-600' :
                    plan.color === 'orange' ? 'text-orange-600' : 'text-gray-600'
                  }`}>
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="animate-on-scroll text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="animate-on-scroll text-gray-500 ml-1">
                      /{plan.period}
                    </span>
                  </div>
                  <p className="animate-on-scroll text-gray-600 text-sm">
                    {plan.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li 
                      key={feature}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <svg 
                        className="animate-on-scroll w-4 h-4 mr-3 text-green-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="animate-on-scroll">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className={`animate-on-scroll w-full py-3 px-6 rounded-lg font-semibold transition-colors hover:scale-105 transform ${
                  plan.popular 
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}>
                  {plan.name === 'Free' ? 'Get Started' : 'Choose Plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="text-center">
          <div className="animate-on-scroll bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h3 className="animate-on-scroll text-2xl font-bold mb-4">
              Ready to Join?
            </h3>
            <p className="animate-on-scroll text-lg mb-6 opacity-90">
              Start your pickleball journey with the Pickleball Federation today.
            </p>
            <button className="animate-on-scroll bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 hover:scale-105 transform">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;