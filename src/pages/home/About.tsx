const About = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-on-scroll">
            About Pickleball Federation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-on-scroll">
            Empowering players, building community, and advancing the sport of pickleball across the nation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-on-scroll">
            <div className="w-full h-32 mb-4 rounded-lg overflow-hidden animate-on-scroll">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Mission - Pickleball players in action"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 animate-on-scroll"
              />
            </div>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-on-scroll">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 animate-on-scroll">Our Mission</h3>
            <p className="text-gray-600 animate-on-scroll">To promote and develop pickleball as a sport for all ages and skill levels.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-on-scroll">
            <div className="w-full h-32 mb-4 rounded-lg overflow-hidden animate-on-scroll">
              <img 
                src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Vision - Diverse group of pickleball players"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 animate-on-scroll"
              />
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-on-scroll">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 animate-on-scroll">Our Vision</h3>
            <p className="text-gray-600 animate-on-scroll">To make pickleball the most accessible and inclusive racquet sport in America.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-on-scroll">
            <div className="w-full h-32 mb-4 rounded-lg overflow-hidden animate-on-scroll">
              <img 
                src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Community - Pickleball community gathering"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 animate-on-scroll"
              />
            </div>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-on-scroll">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 animate-on-scroll">Community</h3>
            <p className="text-gray-600 animate-on-scroll">Building a vibrant, supportive community of pickleball enthusiasts.</p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-on-scroll">
            <div className="w-full h-32 mb-4 rounded-lg overflow-hidden animate-on-scroll">
              <img 
                src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                alt="Innovation - Modern pickleball technology"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 animate-on-scroll"
              />
            </div>
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-on-scroll">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 animate-on-scroll">Innovation</h3>
            <p className="text-gray-600 animate-on-scroll">Advancing the sport through technology and modern solutions.</p>
          </div>
        </div>

        <div className="mt-16 text-center animate-on-scroll">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 animate-on-scroll">
            Federation Structure
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-on-scroll">
              <div className="w-full h-40 mb-4 rounded-lg overflow-hidden animate-on-scroll">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                  alt="Board of Directors - Professional meeting"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 animate-on-scroll"
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3 animate-on-scroll">Board of Directors</h4>
              <p className="text-gray-600 animate-on-scroll">Elected officials who guide the federation's strategic direction and policies.</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-on-scroll">
              <div className="w-full h-40 mb-4 rounded-lg overflow-hidden animate-on-scroll">
                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                  alt="Regional Chapters - Local pickleball scene"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 animate-on-scroll"
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3 animate-on-scroll">Regional Chapters</h4>
              <p className="text-gray-600 animate-on-scroll">Local organizations that bring pickleball to communities across the country.</p>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-on-scroll">
              <div className="w-full h-40 mb-4 rounded-lg overflow-hidden animate-on-scroll">
                <img 
                  src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                  alt="Member Services - Customer support"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 animate-on-scroll"
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3 animate-on-scroll">Member Services</h4>
              <p className="text-gray-600 animate-on-scroll">Dedicated staff providing support, resources, and opportunities for members.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center animate-on-scroll">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 animate-on-scroll">
            Our Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Inclusivity', 
                description: 'Welcoming players of all backgrounds and abilities',
                image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
              },
              { 
                title: 'Excellence', 
                description: 'Striving for the highest standards in everything we do',
                image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
              },
              { 
                title: 'Integrity', 
                description: 'Maintaining honesty and ethical behavior',
                image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
              },
              { 
                title: 'Innovation', 
                description: 'Embracing new ideas and approaches',
                image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80'
              }
            ].map((value, index) => (
              <div 
                key={value.title}
                className="p-4 bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-105 animate-on-scroll"
              >
                <div className="w-full h-24 mb-3 rounded-lg overflow-hidden animate-on-scroll">
                  <img 
                    src={value.image}
                    alt={`${value.title} - Pickleball value representation`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 animate-on-scroll"
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2 animate-on-scroll">{value.title}</h4>
                <p className="text-gray-600 text-sm animate-on-scroll">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 