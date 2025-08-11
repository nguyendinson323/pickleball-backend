const FindCourt = () => {
  const courtTypes = [
    {
      name: "Indoor Courts",
      count: "2,847",
      description: "Climate-controlled facilities",
      icon: "🏠",
      image: "/img/8.jpg"
    },
    {
      name: "Outdoor Courts",
      count: "5,234",
      description: "Fresh air and natural lighting",
      icon: "🌳",
      image: "/img/9.jpg"
    },
    {
      name: "Temporary Courts",
      count: "1,156",
      description: "Portable and flexible setups",
      icon: "🎯",
      image: "/img/2.jpg"
    },
    {
      name: "Tournament Courts",
      count: "892",
      description: "Professional-grade facilities",
      icon: "🏆",
      image: "/img/3.jpg"
    }
  ];

  const courtFeatures = [
    {
      name: "Lighting",
      available: "85%",
      icon: "💡",
      image: "/img/4.jpg"
    },
    {
      name: "Parking",
      available: "92%",
      icon: "🚗",
      image: "/img/5.jpg"
    },
    {
      name: "Restrooms",
      available: "78%",
      icon: "🚻",
      image: "/img/6.jpg"
    },
    {
      name: "Water Fountains",
      available: "65%",
      icon: "🚰",
      image: "/img/1 (2).jpeg"
    },
    {
      name: "Equipment Rental",
      available: "45%",
      icon: "🏓",
      image: "/img/1 (3).jpeg"
    },
    {
      name: "Pro Shop",
      available: "32%",
      icon: "🛍️",
      image: "/img/1 (4).jpeg"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Hero/Header Section */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="w-full h-64 mb-8 rounded-lg overflow-hidden shadow-lg animate-on-scroll">
            <img 
              src="/img/7.jpg" 
              alt="Find Court Hero - Beautiful pickleball courts"
              className="w-full h-full object-cover animate-on-scroll"
            />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-on-scroll">
            Find a Court
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-on-scroll">
            Discover pickleball courts near you with our comprehensive court finder.
          </p>
        </div>

        {/* Court Search Section */}
        <div className="mb-16 animate-on-scroll">
          <div className="bg-white rounded-lg shadow-md p-8 overflow-hidden relative animate-on-scroll">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-5">
              <img 
                src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Court search background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center animate-on-scroll">
                Court Search
              </h3>
              <div className="max-w-2xl mx-auto animate-on-scroll">
                <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-on-scroll">
                  <input
                    type="text"
                    placeholder="Enter your city or zip code"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:scale-105 focus:scale-105 animate-on-scroll"
                  />
                  <button 
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold hover:-translate-y-1 hover:scale-105 active:scale-95 animate-on-scroll"
                  >
                    Search
                  </button>
                </div>
                <div className="text-center text-gray-500 text-sm animate-on-scroll">
                  <span className="animate-on-scroll">
                    🔍 <span className="font-medium">Pro tip:</span> Log in to access advanced search filters and court booking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Court Types Section */}
        <div className="mb-16 animate-on-scroll">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center animate-on-scroll">
            Court Types
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courtTypes.map((type, index) => (
              <div
                key={type.name}
                className="bg-white p-6 rounded-lg shadow-md text-center overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-on-scroll"
              >
                <div className="w-full h-32 mb-4 rounded-lg overflow-hidden animate-on-scroll">
                  <img 
                    src={type.image}
                    alt={`${type.name} - Pickleball court type`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 animate-on-scroll"
                  />
                </div>
                <div className="text-4xl mb-3 animate-on-scroll">
                  {type.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2 animate-on-scroll">
                  {type.name}
                </h4>
                <p className="text-2xl font-bold text-blue-600 mb-2 animate-on-scroll">
                  {type.count}
                </p>
                <p className="text-gray-600 text-sm animate-on-scroll">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Court Features Section */}
        <div className="mb-16 animate-on-scroll">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center animate-on-scroll">
            Court Features
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courtFeatures.map((feature, index) => (
              <div
                key={feature.name}
                className="bg-white p-6 rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-on-scroll"
              >
                <div className="w-full h-24 mb-4 rounded-lg overflow-hidden animate-on-scroll">
                  <img 
                    src={feature.image}
                    alt={`${feature.name} - Court feature representation`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 animate-on-scroll"
                  />
                </div>
                <div className="flex items-center justify-between mb-4 animate-on-scroll">
                  <div className="flex items-center animate-on-scroll">
                    <span className="text-2xl mr-3 animate-on-scroll">
                      {feature.icon}
                    </span>
                    <span className="font-medium text-gray-900 animate-on-scroll">
                      {feature.name}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-blue-600 animate-on-scroll">
                    {feature.available}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 animate-on-scroll">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out animate-on-scroll"
                    style={{ 
                      width: feature.available
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center animate-on-scroll">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white overflow-hidden relative animate-on-scroll">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-20">
              <img 
                src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Pickleball court background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 animate-on-scroll">
                Ready to Play?
              </h3>
              <p className="text-lg mb-6 opacity-90 animate-on-scroll">
                Find the perfect court and start your pickleball journey today.
              </p>
              <button 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 hover:scale-105 active:scale-95 animate-on-scroll"
              >
                Find Courts Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindCourt; 