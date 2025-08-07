import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchCarouselBanners, trackBannerView, trackBannerClick } from '../store/slices/bannersSlice';
import { fetchUpcomingTournaments } from '../store/slices/tournamentsSlice';
import { fetchTopPlayers } from '../store/slices/rankingsSlice';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../components/ui/carousel';
import { Badge } from '../components/ui/badge';
import { Calendar, Users, Trophy, MapPin, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { animationConfigs, getAnimationVariants } from '../lib/animations';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { carouselBanners } = useSelector((state: RootState) => state.banners);
  const { upcomingTournaments } = useSelector((state: RootState) => state.tournaments);
  const { topPlayers } = useSelector((state: RootState) => state.rankings);

  useEffect(() => {
    dispatch(fetchCarouselBanners());
    dispatch(fetchUpcomingTournaments(5));
    dispatch(fetchTopPlayers({ limit: 10, category: 'singles' }));
  }, [dispatch]);

  const handleBannerClick = (bannerId: string, actionUrl?: string) => {
    dispatch(trackBannerClick(bannerId));
    if (actionUrl) {
      window.open(actionUrl, '_blank');
    }
  };

  const handleBannerView = (bannerId: string) => {
    dispatch(trackBannerView(bannerId));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Banner Carousel */}
      <section className="relative">
        {carouselBanners.length > 0 ? (
          <Carousel className="w-full">
            <CarouselContent>
              {carouselBanners.map((banner) => (
                <CarouselItem key={banner.id}>
                  <div 
                    className="relative h-96 md:h-[500px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${banner.image_url})` }}
                    onLoad={() => handleBannerView(banner.id)}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white max-w-4xl mx-auto px-4">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                          {banner.title}
                        </h1>
                        {banner.subtitle && (
                          <p className="text-xl md:text-2xl mb-8">
                            {banner.subtitle}
                          </p>
                        )}
                        {banner.action_text && (
                          <Button 
                            size="lg" 
                            onClick={() => handleBannerClick(banner.id, banner.action_url)}
                            className="text-lg px-8 py-4"
                          >
                            {banner.action_text}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        ) : (
          <div className="relative h-96 md:h-[500px] bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Welcome to Pickleball Federation
                </h1>
                <p className="text-xl md:text-2xl mb-8">
                  Join the fastest-growing sport community in the nation
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="text-lg px-8 py-4">
                    <Link to="/register">Join Now</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4">
                    <Link to="/tournaments">Find Tournaments</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Pickleball
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From finding players to booking courts, we've got you covered
            </p>
          </div>

                        <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2
                    }
                  }
                }}
              >
                {[
                  {
                    icon: Users,
                    title: "Player Finder",
                    description: "Find players near you based on skill level, location, and availability",
                    link: "/player-finder",
                    color: "blue"
                  },
                  {
                    icon: MapPin,
                    title: "Court Reservations",
                    description: "Book courts at your favorite clubs with real-time availability",
                    link: "/court-reservations",
                    color: "green"
                  },
                  {
                    icon: Trophy,
                    title: "Tournaments",
                    description: "Discover and register for tournaments across the country",
                    link: "/tournaments",
                    color: "purple"
                  },
                  {
                    icon: Star,
                    title: "Rankings",
                    description: "Track your progress and see where you rank among players",
                    link: "/rankings",
                    color: "orange"
                  }
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  const config = animationConfigs.features[index];
                  return (
                    <motion.div
                      key={index}
                      variants={getAnimationVariants(config.direction, config.duration, config.delay)}
                    >
                      <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className={`mx-auto w-12 h-12 bg-${feature.color}-100 rounded-full flex items-center justify-center mb-4`}>
                            <Icon className={`w-6 h-6 text-${feature.color}-600`} />
                          </div>
                          <CardTitle>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4">
                            {feature.description}
                          </p>
                          <Button asChild variant="outline">
                            <Link to={feature.link}>
                              {feature.title === "Player Finder" ? "Find Players" :
                               feature.title === "Court Reservations" ? "Book Courts" :
                               feature.title === "Tournaments" ? "View Tournaments" : "View Rankings"}
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
        </div>
      </section>

      {/* Upcoming Tournaments */}
      {upcomingTournaments.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Upcoming Tournaments</h2>
              <Button asChild variant="outline">
                <Link to="/tournaments">View All</Link>
              </Button>
            </div>

                            <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.2
                      }
                    }
                  }}
                >
                  {upcomingTournaments.map((tournament, index) => {
                    const config = animationConfigs.tournaments[index % animationConfigs.tournaments.length];
                    return (
                      <motion.div
                        key={tournament.id}
                        variants={getAnimationVariants(config.direction, config.duration, config.delay)}
                      >
                        <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary">{tournament.tournament_type}</Badge>
                      <Badge variant={tournament.status === 'registration_open' ? 'default' : 'secondary'}>
                        {tournament.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{tournament.name}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <MapPin className="w-4 h-4" />
                        <span>{tournament.venue_name}, {tournament.city}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{tournament.current_participants}/{tournament.max_participants || '∞'} participants</span>
                      </div>
                      {tournament.entry_fee && (
                        <div className="font-medium text-green-600">
                          Entry Fee: ${tournament.entry_fee}
                        </div>
                      )}
                    </div>
                    <Button asChild className="w-full mt-4">
                      <Link to={`/tournaments/${tournament.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
          </div>
        </section>
      )}

      {/* Top Players */}
      {topPlayers.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Top Players</h2>
              <Button asChild variant="outline">
                <Link to="/rankings">View All Rankings</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {topPlayers.slice(0, 10).map((player, index) => (
                <Card key={player.id} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold text-lg">#{index + 1}</span>
                      </div>
                      {index < 3 && (
                        <div className="absolute -top-1 -right-1">
                          <Trophy className={`w-6 h-6 ${
                            index === 0 ? 'text-yellow-500' : 
                            index === 1 ? 'text-gray-400' : 'text-orange-500'
                          }`} />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-sm">{player.user_name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Points:</span>
                        <span className="font-medium">{player.current_points}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Skill:</span>
                        <span className="font-medium">{player.skill_level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Win %:</span>
                        <span className="font-medium">{player.win_percentage}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join the Pickleball Community?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Connect with players, book courts, and compete in tournaments. Start your pickleball journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-4">
              <Link to="/register">Create Account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-4">
              <Link to="/clubs">Find Clubs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 