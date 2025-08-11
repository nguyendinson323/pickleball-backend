
const News = () => {
  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="animate-on-scroll text-4xl font-bold text-gray-900 mb-6">
            Latest News
          </h1>
          <p className="animate-on-scroll text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest pickleball news, tournament results, 
            federation updates, and community highlights.
          </p>
        </div>

        {/* Featured News */}
        <div className="mb-16">
          <h2 className="animate-on-scroll text-2xl font-bold text-gray-900 mb-8 text-center">
            Featured Stories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Article 1 */}
            <div className="animate-on-scroll card bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 relative overflow-hidden">
                <img
                  src="/img/tournament-system.jpg"
                  alt="Tournament Championship"
                  className="animate-on-scroll w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <span className="animate-on-scroll text-white text-lg font-bold">
                    JAN 15, 2024
                  </span>
                </div>
              </div>
              <div className="p-6">
                <span className="animate-on-scroll inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mb-3">
                  Tournament
                </span>
                <h3 className="animate-on-scroll text-xl font-bold text-gray-900 mb-2">
                  Winter Championship Results
                </h3>
                <p className="animate-on-scroll text-gray-600 mb-4">
                  Sarah Johnson and Michael Chen crowned champions at the 2024 Winter National Championship.
                </p>
                <div className="flex items-center justify-between">
                  <span className="animate-on-scroll text-sm text-gray-500">
                    5 min read
                  </span>
                  <button className="animate-on-scroll text-blue-600 hover:text-blue-700 font-medium hover:scale-105 transition-transform duration-300">
                    Read More →
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Article 2 */}
            <div className="animate-on-scroll card bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 relative overflow-hidden">
                <img
                  src="/img/player-community.jpg"
                  alt="Youth Program Launch"
                  className="animate-on-scroll w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <span className="animate-on-scroll text-white text-lg font-bold">
                    JAN 12, 2024
                  </span>
                </div>
              </div>
              <div className="p-6">
                <span className="animate-on-scroll inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded mb-3">
                  Community
                </span>
                <h3 className="animate-on-scroll text-xl font-bold text-gray-900 mb-2">
                  New Youth Program Launches
                </h3>
                <p className="animate-on-scroll text-gray-600 mb-4">
                  Introducing our comprehensive youth development program for players aged 8-18.
                </p>
                <div className="flex items-center justify-between">
                  <span className="animate-on-scroll text-sm text-gray-500">
                    3 min read
                  </span>
                  <button className="animate-on-scroll text-blue-600 hover:text-blue-700 font-medium hover:scale-105 transition-transform duration-300">
                    Read More →
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Article 3 */}
            <div className="animate-on-scroll card bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 relative overflow-hidden">
                <img
                  src="/img/partners-business.jpg"
                  alt="Olympic Partnership"
                  className="animate-on-scroll w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <span className="animate-on-scroll text-white text-lg font-bold">
                    JAN 10, 2024
                  </span>
                </div>
              </div>
              <div className="p-6">
                <span className="animate-on-scroll inline-block bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded mb-3">
                  Federation
                </span>
                <h3 className="animate-on-scroll text-xl font-bold text-gray-900 mb-2">
                  Partnership with Olympic Committee
                </h3>
                <p className="animate-on-scroll text-gray-600 mb-4">
                  Historic partnership announced to promote pickleball's Olympic aspirations.
                </p>
                <div className="flex items-center justify-between">
                  <span className="animate-on-scroll text-sm text-gray-500">
                    7 min read
                  </span>
                  <button className="animate-on-scroll text-blue-600 hover:text-blue-700 font-medium hover:scale-105 transition-transform duration-300">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* News Categories */}
        <div className="mb-16">
          <h2 className="animate-on-scroll text-2xl font-bold text-gray-900 mb-8 text-center">
            News Categories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="animate-on-scroll feature bg-white p-6 rounded-lg shadow-sm text-center hover:bg-gray-50 transition-colors duration-300">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="/img/tournament-management.jpg"
                  alt="Tournaments"
                  className="animate-on-scroll w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="animate-on-scroll text-lg font-semibold text-gray-900 mb-2">
                Tournaments
              </h3>
              <p className="animate-on-scroll text-gray-600 text-sm">
                Results, highlights, and upcoming events
              </p>
            </div>

            <div className="animate-on-scroll feature bg-white p-6 rounded-lg shadow-sm text-center hover:bg-gray-50 transition-colors duration-300">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="/img/players-community.jpg"
                  alt="Community"
                  className="animate-on-scroll w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="animate-on-scroll text-lg font-semibold text-gray-900 mb-2">
                Community
              </h3>
              <p className="animate-on-scroll text-gray-600 text-sm">
                Player spotlights and local stories
              </p>
            </div>

            <div className="animate-on-scroll feature bg-white p-6 rounded-lg shadow-sm text-center hover:bg-gray-50 transition-colors duration-300">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="/img/ranking-system.jpg"
                  alt="Federation"
                  className="animate-on-scroll w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="animate-on-scroll text-lg font-semibold text-gray-900 mb-2">
                Federation
              </h3>
              <p className="animate-on-scroll text-gray-600 text-sm">
                Updates and announcements from leadership
              </p>
            </div>

            <div className="animate-on-scroll feature bg-white p-6 rounded-lg shadow-sm text-center hover:bg-gray-50 transition-colors duration-300">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="/img/credentialing.jpg"
                  alt="Press Releases"
                  className="animate-on-scroll w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="animate-on-scroll text-lg font-semibold text-gray-900 mb-2">
                Press Releases
              </h3>
              <p className="animate-on-scroll text-gray-600 text-sm">
                Official announcements and media coverage
              </p>
            </div>
          </div>
        </div>

        {/* Recent News List */}
        <div className="animate-on-scroll bg-white rounded-lg shadow-sm overflow-hidden mb-16">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="animate-on-scroll text-xl font-bold text-gray-900">
              Recent News
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {[
              { date: "Jan 8, 2024", title: "New Ranking System Implementation", category: "Federation", readTime: "4 min" },
              { date: "Jan 6, 2024", title: "Community Court Grant Program", category: "Community", readTime: "3 min" },
              { date: "Jan 4, 2024", title: "Player of the Month: Lisa Rodriguez", category: "Community", readTime: "2 min" },
              { date: "Jan 2, 2024", title: "Upcoming Spring Tournament Series", category: "Tournament", readTime: "5 min" },
              { date: "Dec 30, 2023", title: "Year in Review: 2023 Highlights", category: "Federation", readTime: "8 min" }
            ].map((article, index) => (
              <div 
                key={index} 
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="animate-on-scroll text-sm text-gray-500">
                        {article.date}
                      </span>
                      <span className={`animate-on-scroll inline-block px-2.5 py-0.5 rounded text-xs font-medium ${
                        article.category === 'Tournament' ? 'bg-blue-100 text-blue-800' :
                        article.category === 'Community' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {article.category}
                      </span>
                    </div>
                    <h3 className="animate-on-scroll text-lg font-semibold text-gray-900 mb-1">
                      {article.title}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="animate-on-scroll text-sm text-gray-500">
                      {article.readTime}
                    </span>
                    <button className="animate-on-scroll text-blue-600 hover:text-blue-700 font-medium hover:scale-105 transition-transform duration-300">
                      Read →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="animate-on-scroll bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="animate-on-scroll text-2xl font-bold text-gray-900 mb-4 text-center">
            Stay Updated
          </h2>
          <p className="animate-on-scroll text-gray-600 mb-6 text-center">
            Subscribe to our newsletter to receive the latest news, tournament updates, and community highlights directly in your inbox.
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="animate-on-scroll flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="animate-on-scroll px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors hover:scale-105 transform">
                Subscribe
              </button>
            </div>
            <p className="animate-on-scroll text-gray-500 text-center text-sm">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="animate-on-scroll bg-white p-8 rounded-lg shadow-sm text-center">
          <h2 className="animate-on-scroll text-2xl font-bold text-gray-900 mb-4">
            Want More News?
          </h2>
          <p className="animate-on-scroll text-gray-600 mb-6">
            Join our federation to access exclusive content, early announcements, and member-only news.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="animate-on-scroll px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors hover:scale-105 transform">
              Join Federation
            </button>
            <button className="animate-on-scroll px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors hover:scale-105 transform">
              View All News
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News; 