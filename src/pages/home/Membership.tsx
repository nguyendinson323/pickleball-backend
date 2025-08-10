import React from "react";

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
  const plans = [
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
      color: "gray"
    },
    {
      name: "Basic",
      price: "$9.99",
      period: "month",
      description: "Enhanced features for casual players",
      features: [
        "All Free features",
        "Tournament registration",
        "Player profile",
        "Basic statistics",
        "Email support"
      ],
      popular: false,
      color: "blue"
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "month",
      description: "Advanced features for serious players",
      features: [
        "All Basic features",
        "Advanced analytics",
        "Priority tournament access",
        "Coaching resources",
        "Phone support",
        "Exclusive events"
      ],
      popular: true,
      color: "purple"
    },
    {
      name: "Elite",
      price: "$39.99",
      period: "month",
      description: "Ultimate experience for professionals",
      features: [
        "All Premium features",
        "Personal account manager",
        "VIP tournament access",
        "Custom training plans",
        "24/7 priority support",
        "Sponsorship opportunities"
      ],
      popular: false,
      color: "green"
    }
  ];

  // Feature comparison data - much more maintainable
  const featureComparison = [
    {
      category: "Core Features",
      features: [
        {
          name: "Tournament Registration",
          free: false,
          basic: true,
          premium: true,
          elite: true
        },
        {
          name: "Priority Tournament Access",
          free: false,
          basic: false,
          premium: true,
          elite: true
        },
        {
          name: "VIP Tournament Access",
          free: false,
          basic: false,
          premium: false,
          elite: true
        }
      ]
    },
    {
      category: "Player Experience",
      features: [
        {
          name: "Player Profile & Statistics",
          free: false,
          basic: "Basic",
          premium: "Advanced",
          elite: "Premium"
        },
        {
          name: "Advanced Analytics",
          free: false,
          basic: false,
          premium: true,
          elite: true
        },
        {
          name: "Court Finder",
          free: "Basic",
          basic: "Enhanced",
          premium: "Advanced",
          elite: "Premium"
        }
      ]
    },
    {
      category: "Training & Support",
      features: [
        {
          name: "Coaching Resources",
          free: false,
          basic: false,
          premium: true,
          elite: true
        },
        {
          name: "Custom Training Plans",
          free: false,
          basic: false,
          premium: false,
          elite: true
        },
        {
          name: "Customer Support",
          free: "Community",
          basic: "Email",
          premium: "Phone",
          elite: "24/7 Priority"
        },
        {
          name: "Training Videos",
          free: false,
          basic: "Limited",
          premium: "Full Library",
          elite: "Exclusive Content"
        }
      ]
    },
    {
      category: "Exclusive Benefits",
      features: [
        {
          name: "Exclusive Events",
          free: false,
          basic: false,
          premium: true,
          elite: true
        },
        {
          name: "Personal Account Manager",
          free: false,
          basic: false,
          premium: false,
          elite: true
        },
        {
          name: "Sponsorship Opportunities",
          free: false,
          basic: false,
          premium: false,
          elite: true
        },
        {
          name: "Early Access to Features",
          free: false,
          basic: false,
          premium: true,
          elite: true
        }
      ]
    }
  ];

  // Helper function to render feature value
  const renderFeatureValue = (value: boolean | string, planColor: string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckIcon />
      ) : (
        <XMarkIcon />
      );
    }
    
    if (typeof value === 'string') {
      return (
        <span className="text-xs text-gray-500">{value}</span>
      );
    }
    
    return null;
  };

  // Helper function to get plan color classes
  const getPlanColorClasses = (planName: string) => {
    const colorMap: Record<string, string> = {
      'Free': 'text-gray-900',
      'Basic': 'text-blue-600',
      'Premium': 'text-purple-600',
      'Elite': 'text-green-600'
    };
    return colorMap[planName] || 'text-gray-900';
  };

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

        {/* Membership Plans Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`animate-on-scroll card relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                plan.popular ? 'ring-2 ring-purple-500' : ''
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
                    plan.color === 'green' ? 'text-green-600' : 'text-gray-600'
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

        {/* Membership Comparison Table */}
        <div className="mb-16">
          <h3 className="animate-on-scroll text-3xl font-bold text-gray-900 mb-8 text-center">
            Membership Comparison Table
          </h3>
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <div className="min-w-[800px]">
              <table className="w-full bg-white overflow-hidden">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200">
                      Features & Benefits
                    </th>
                    {plans.map((plan) => (
                      <th 
                        key={plan.name}
                        className={`px-6 py-4 text-center text-sm font-semibold border-b border-gray-200 relative ${getPlanColorClasses(plan.name)}`}
                      >
                        {plan.name}
                        {plan.popular && (
                          <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                            Popular
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Core Features Row */}
                  <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      Core Features
                    </td>
                    {plans.map((plan) => (
                      <td key={plan.name} className="px-6 py-4 text-center">
                        <div className={`w-4 h-4 bg-${plan.color}-500 rounded-full mx-auto shadow-sm`}></div>
                      </td>
                    ))}
                  </tr>

                  {/* Feature Rows */}
                  {featureComparison.map((category, categoryIndex) => (
                    <React.Fragment key={category.category}>
                      {category.features.map((feature, featureIndex) => (
                        <tr 
                          key={`${category.category}-${feature.name}`}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                            {feature.name}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {renderFeatureValue(feature.free, 'gray')}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {renderFeatureValue(feature.basic, 'blue')}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {renderFeatureValue(feature.premium, 'purple')}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {renderFeatureValue(feature.elite, 'green')}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Additional Benefits Section */}
        <div className="mb-16">
          <h3 className="animate-on-scroll text-3xl font-bold text-gray-900 mb-8 text-center">
            Membership Benefits
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-on-scroll feature text-center p-6 hover:bg-gray-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="animate-on-scroll w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="animate-on-scroll text-xl font-semibold text-gray-900 mb-3">
                Community Access
              </h4>
              <p className="animate-on-scroll text-gray-600">
                Connect with players, join clubs, and participate in community events.
              </p>
            </div>

            <div className="animate-on-scroll feature text-center p-6 hover:bg-gray-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="animate-on-scroll w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="animate-on-scroll text-xl font-semibold text-gray-900 mb-3">
                Advanced Analytics
              </h4>
              <p className="animate-on-scroll text-gray-600">
                Track your progress with detailed statistics and performance insights.
              </p>
            </div>

            <div className="animate-on-scroll feature text-center p-6 hover:bg-gray-50 transition-colors duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="animate-on-scroll w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="animate-on-scroll text-xl font-semibold text-gray-900 mb-3">
                Priority Access
              </h4>
              <p className="animate-on-scroll text-gray-600">
                Get early access to tournaments and exclusive member-only events.
              </p>
            </div>
          </div>
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