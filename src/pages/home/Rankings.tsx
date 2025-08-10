const Rankings = () => {
  const rankingCategories = [
    { 
      name: "Men's Singles", 
      count: "Top 100", 
      icon: "👨",
      image: "/img/hero-action-BZS0vPh5.jpg"
    },
    { 
      name: "Women's Singles", 
      count: "Top 100", 
      icon: "👩",
      image: "/img/1 (3).jpeg"
    },
    { 
      name: "Men's Doubles", 
      count: "Top 50", 
      icon: "👨👨",
      image: "/img/doubles-action-fQ4JeH88.jpg"
    },
    { 
      name: "Women's Doubles", 
      count: "Top 50", 
      icon: "👩👩",
      image: "/img/1 (7).jpeg"
    },
    { 
      name: "Mixed Doubles", 
      count: "Top 50", 
      icon: "👨👩",
      image: "/img/1 (4).jpeg"
    },
    { 
      name: "Senior Division", 
      count: "Top 75", 
      icon: "👴",
      image: "/img/1 (6).jpeg"
    }
  ];

  const topPlayers = [
    { 
      rank: 1, 
      name: "Alex Johnson", 
      points: 2847, 
      division: "Men's Singles", 
      trend: "↗️",
      image: "/img/1 (2).jpeg"
    },
    { 
      rank: 2, 
      name: "Sarah Chen", 
      points: 2812, 
      division: "Women's Singles", 
      trend: "↗️",
      image: "/img/1 (3).jpeg"
    },
    { 
      rank: 3, 
      name: "Mike Rodriguez", 
      points: 2789, 
      division: "Men's Singles", 
      trend: "→",
      image: "/img/1 (4).jpeg"
    },
    { 
      rank: 4, 
      name: "Emily Davis", 
      points: 2756, 
      division: "Women's Singles", 
      trend: "↗️",
      image: "/img/1 (7).jpeg"
    },
    { 
      rank: 5, 
      name: "David Kim", 
      points: 2723, 
      division: "Men's Singles", 
      trend: "↘️",
      image: "/img/1 (8).jpeg"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Hero/Header Section */}
        <div className="text-center mb-16 animate-on-scroll">
          <div className="w-full h-64 mb-8 rounded-lg overflow-hidden shadow-lg animate-on-scroll">
            <img 
              src="/img/tournament-scene-BJUfmDBV.jpg" 
              alt="Pickleball rankings hero - Players competing in tournament"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 
            className="text-4xl font-bold text-gray-900 mb-6 animate-on-scroll"
          >
            Player Rankings
          </h2>
          <p 
            className="text-xl text-gray-600 max-w-3xl mx-auto animate-on-scroll"
          >
            See where you stand among the nation's top pickleball players.
          </p>
        </div>

        {/* Ranking Categories Section */}
        <div className="mb-16 animate-on-scroll">
          <h3 
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
          >
            Ranking Categories
          </h3>
          <div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {rankingCategories.map((category, index) => (
              <div
                key={category.name}
                className="bg-white p-6 rounded-lg shadow-md overflow-hidden"
              >
                <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={category.image}
                    alt={`${category.name} - Pickleball category representation`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div 
                  className="text-center"
                >
                  <div 
                    className="text-3xl mb-3"
                  >
                    {category.icon}
                  </div>
                  <h4 
                    className="text-lg font-semibold text-gray-900 mb-2"
                  >
                    {category.name}
                  </h4>
                  <p 
                    className="text-blue-600 font-bold"
                  >
                    {category.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Players Section */}
        <div className="mb-16 animate-on-scroll">
          <h3 
            className="text-2xl font-bold text-gray-900 mb-8 text-center"
          >
            Top Players
          </h3>
          <div 
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div 
              className="overflow-x-auto"
            >
              <table 
                className="w-full"
              >
                <thead 
                  className="bg-gray-50"
                >
                  <tr>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Rank
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Player
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Division
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Points
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody 
                  className="bg-white divide-y divide-gray-200"
                >
                  {topPlayers.map((player, index) => (
                    <tr
                      key={player.rank}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td 
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        #{player.rank}
                      </td>
                      <td 
                        className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                      >
                        <div className="flex items-center">
                          <img 
                            src={player.image}
                            alt={`${player.name} - Top pickleball player`}
                            className="w-10 h-10 rounded-full mr-3 object-cover"
                          />
                          {player.name}
                        </div>
                      </td>
                      <td 
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {player.division}
                      </td>
                      <td 
                        className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600"
                      >
                        {player.points}
                      </td>
                      <td 
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {player.trend}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center animate-on-scroll">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white overflow-hidden relative">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-20">
              <img 
                src="/img/victory-celebration-QeHxJAY5.jpg" 
                alt="Pickleball victory celebration background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <h3 
                className="text-2xl font-bold mb-4"
              >
                Want to See Your Ranking?
              </h3>
              <p 
                className="text-lg mb-6 opacity-90"
              >
                Join tournaments and start climbing the leaderboard today.
              </p>
              <button 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View Full Rankings
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rankings; 