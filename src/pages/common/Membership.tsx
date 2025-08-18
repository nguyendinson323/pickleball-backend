import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

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
  const { user } = useSelector((state: RootState) => state.auth);
  
  // Default to player if no user type is available
  const userType = user?.user_type || 'player';

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

  const currentPlans = userTypePlans[userType as keyof typeof userTypePlans];

  // Get user type display name
  const getUserTypeDisplayName = (type: string) => {
    switch (type) {
      case 'player': return 'Player';
      case 'coach': return 'Coach';
      case 'club': return 'Club';
      case 'partner': return 'Partner';
      case 'state': return 'State Federation';
      default: return 'User';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero/Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {getUserTypeDisplayName(userType)} Membership Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect membership plan for your {getUserTypeDisplayName(userType).toLowerCase()} needs and unlock exclusive benefits, tournaments, and community features.
          </p>
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
              className={`relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ring-2  ${
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
                  <h3 className={`text-2xl font-bold mb-2 ${
                    plan.color === 'purple' ? 'text-purple-600' :
                    plan.color === 'blue' ? 'text-blue-600' :
                    plan.color === 'green' ? 'text-green-600' :
                    plan.color === 'orange' ? 'text-orange-600' : 'text-gray-600'
                  }`}>
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 ml-1">
                      /{plan.period}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
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
                        className="w-4 h-4 mr-3 text-green-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors hover:scale-105 transform ${
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
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Upgrade Your Membership?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Take your {getUserTypeDisplayName(userType).toLowerCase()} experience to the next level with the Pickleball Federation.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 hover:scale-105 transform">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;