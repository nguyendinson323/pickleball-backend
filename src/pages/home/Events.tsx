import { useAnimation } from "@/hooks/useAnimation";

const Events = () => {
  const { elementRef } = useAnimation();

  const featuredEvents = [
    {
      id: 1,
      title: "National Championship 2024",
      date: "June 15-20, 2024",
      location: "Orlando, FL",
      type: "Championship",
      image: "/img/tournament-scene-BJUfmDBV.jpg",
      description: "The premier event of the year featuring top players from across the nation."
    },
    {
      id: 2,
      title: "Spring League Finals",
      date: "May 10-12, 2024",
      location: "Phoenix, AZ",
      type: "League",
      image: "/img/hero-action-BZS0vPh5.jpg",
      description: "Season finale for the spring league with exciting playoff matches."
    },
    {
      id: 3,
      title: "Regional Doubles Tournament",
      date: "April 20-21, 2024",
      location: "Austin, TX",
      type: "Tournament",
      image: "/img/doubles-action-fQ4JeH88.jpg",
      description: "Competitive doubles tournament open to all skill levels."
    }
  ];

  const eventCategories = [
    { name: "Tournaments", count: 24, icon: "🏆" },
    { name: "Leagues", count: 12, icon: "⚽" },
    { name: "Clinics", count: 18, icon: "🎯" },
    { name: "Social Events", count: 31, icon: "🎉" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Hero/Header Section */}
        <div 
          ref={elementRef}
          className="text-center mb-16"
        >
          <h2 className="animate-on-scroll text-4xl font-bold text-gray-900 mb-6">
            Upcoming Events
          </h2>
          <p className="animate-on-scroll text-xl text-gray-600 max-w-3xl mx-auto">
            Join exciting tournaments, leagues, and social events across the country.
          </p>
        </div>

        {/* Featured Events Section */}
        <div className="mb-16">
          <h3 className="animate-on-scroll text-2xl font-bold text-gray-900 mb-8 text-center">
            Featured Events
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <div
                key={event.id}
                className="animate-on-scroll card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="animate-on-scroll w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="animate-on-scroll px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {event.type}
                    </span>
                    <span className="animate-on-scroll text-sm text-gray-500">
                      {event.date}
                    </span>
                  </div>
                  <h4 className="animate-on-scroll text-xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h4>
                  <p className="animate-on-scroll text-gray-600 mb-3">
                    {event.description}
                  </p>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg 
                      className="animate-on-scroll w-4 h-4 mr-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="animate-on-scroll">
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Categories Section */}
        <div className="mb-16">
          <h3 className="animate-on-scroll text-2xl font-bold text-gray-900 mb-8 text-center">
            Event Categories
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventCategories.map((category, index) => (
              <div
                key={category.name}
                className="animate-on-scroll feature text-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="animate-on-scroll text-4xl mb-3">
                  {category.icon}
                </div>
                <h4 className="animate-on-scroll text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h4>
                <p className="animate-on-scroll text-2xl font-bold text-blue-600">
                  {category.count}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center">
          <div className="animate-on-scroll bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <h3 className="animate-on-scroll text-2xl font-bold mb-4">
              Ready to Compete?
            </h3>
            <p className="animate-on-scroll text-lg mb-6 opacity-90">
              Join our events and connect with players from around the country.
            </p>
            <button className="animate-on-scroll bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 hover:scale-105 transform">
              View All Events
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events; 