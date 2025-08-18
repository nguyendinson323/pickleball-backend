import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchTournaments, registerForTournament } from '../../store/slices/tournamentsSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Calendar, MapPin, Users, Trophy, Clock, DollarSign, Star, CalendarDays, Eye, Heart, Share2, Award, Target, Users2, MapPinOff, Phone, Mail, Globe } from 'lucide-react';
import { Tournament } from '../../types/api';
import { toast } from 'sonner';


// Comprehensive mock data for realistic tournament display
const mockTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Jalisco State Championship 2024',
    tournament_type: 'state',
    category: 'mixed_doubles',
    description: 'The premier state-level tournament featuring the best players from across Jalisco. Multiple skill divisions, professional referees, and championship trophies.',
    organizer_id: 'state-1',
    organizer_type: 'state',
    organizer_name: 'Jalisco Pickleball Federation',
    venue_name: 'State Sports Complex',
    venue_address: 'Av. Juárez 1234, Guadalajara, Jalisco',
    state: 'Jalisco',
    city: 'Guadalajara',
    latitude: 20.6597,
    longitude: -103.3496,
    start_date: '2024-06-15',
    end_date: '2024-06-16',
    registration_deadline: '2024-06-10',
    entry_fee: 85,
    max_participants: 256,
    current_participants: 189,
    max_teams: 128,
    current_teams: 94,
    skill_levels: ['3.0', '3.5', '4.0', '4.5', '5.0'],
    age_categories: ['18-34', '35-49', '50-64', '65+'],
    gender_categories: ['Men', 'Women', 'Mixed'],
    tournament_format: 'Double Elimination',
    points_to_win: 11,
    win_by: 2,
    status: 'registration_open',
    rules: 'Official USAPA rules apply. All matches are best 2 out of 3 games.',
    schedule: { day1: 'Pool Play', day2: 'Elimination Rounds' },
    court_assignments: { courts: 8, indoor: 4, outdoor: 4 },
    banner_image: '/img/tournament-scene-BJUfmDBV.jpg',
    logo: '/logo.jpeg',
    photos: { gallery: ['photo1.jpg', 'photo2.jpg'] },
    contact_email: 'championship@jalisco-pickleball.mx',
    contact_phone: '+52-33-1234-5678',
    registration_requirements: { skill_assessment: true, age_verification: true },
    registration_notes: 'Early bird discount available until May 15th. Hotel packages available.',
    total_matches: 156,
    completed_matches: 0,
    settings: { max_players_per_team: 2, consolation_rounds: true },
    notes: 'This tournament qualifies players for the National Championship.',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-03-25T00:00:00Z'
  },
  {
    id: '2',
    name: 'Spring League Finals',
    tournament_type: 'league',
    category: 'doubles',
    description: 'Championship round of the Spring League season. Top teams from each division compete for league titles and prizes.',
    organizer_id: 'club-1',
    organizer_type: 'club',
    organizer_name: 'Elite Pickleball Club',
    venue_name: 'Metro Courts',
    venue_address: 'Calle Morelos 567, Zapopan, Jalisco',
    state: 'Jalisco',
    city: 'Zapopan',
    latitude: 20.7239,
    longitude: -103.3849,
    start_date: '2024-05-20',
    end_date: '2024-05-20',
    registration_deadline: '2024-05-15',
    entry_fee: 65,
    max_participants: 64,
    current_participants: 64,
    max_teams: 32,
    current_teams: 32,
    skill_levels: ['3.5', '4.0', '4.5'],
    age_categories: ['18-49', '50+'],
    gender_categories: ['Men', 'Women'],
    tournament_format: 'Single Elimination',
    points_to_win: 15,
    win_by: 2,
    status: 'registration_closed',
    rules: 'League rules apply. Seeding based on regular season performance.',
    schedule: { start_time: '9:00 AM', format: 'Single Day' },
    court_assignments: { courts: 4, indoor: 2, outdoor: 2 },
    banner_image: '/img/tournament-system.jpg',
    logo: '/logo.jpeg',
    photos: { gallery: ['league1.jpg'] },
    contact_email: 'league@elitepickleball.mx',
    contact_phone: '+52-33-9876-5432',
    registration_requirements: { league_membership: true },
    registration_notes: 'Open only to Spring League participants.',
    total_matches: 31,
    completed_matches: 0,
    settings: { consolation_rounds: true, third_place_match: true },
    notes: 'Winners receive automatic entry to next season\'s league.',
    created_at: '2024-02-01T00:00:00Z',
    updated_at: '2024-03-20T00:00:00Z'
  },
  {
    id: '3',
    name: 'Youth Development Cup',
    tournament_type: 'local',
    category: 'singles',
    description: 'Special tournament designed for young players (ages 12-17) to develop competitive skills in a supportive environment.',
    organizer_id: 'club-2',
    organizer_type: 'club',
    organizer_name: 'Community Courts',
    venue_name: 'Community Center',
    venue_address: 'Plaza Principal 89, Tlaquepaque, Jalisco',
    state: 'Jalisco',
    city: 'Tlaquepaque',
    latitude: 20.6409,
    longitude: -103.3119,
    start_date: '2024-07-10',
    end_date: '2024-07-10',
    registration_deadline: '2024-07-05',
    entry_fee: 45,
    max_participants: 48,
    current_participants: 32,
    max_teams: 48,
    current_teams: 32,
    skill_levels: ['2.5', '3.0', '3.5'],
    age_categories: ['12-14', '15-17'],
    gender_categories: ['Boys', 'Girls'],
    tournament_format: 'Round Robin',
    points_to_win: 11,
    win_by: 2,
    status: 'registration_open',
    rules: 'Modified rules for youth players. Coaches and parents welcome.',
    schedule: { start_time: '10:00 AM', format: 'Single Day' },
    court_assignments: { courts: 3, indoor: 1, outdoor: 2 },
    banner_image: '/img/coaches-training.jpg',
    logo: '/logo.jpeg',
    photos: { gallery: ['youth1.jpg'] },
    contact_email: 'youth@communitycourts.mx',
    contact_phone: '+52-33-5555-1234',
    registration_requirements: { age_verification: true, parent_consent: true },
    registration_notes: 'Equipment provided for beginners. Snacks and drinks included.',
    total_matches: 72,
    completed_matches: 0,
    settings: { max_players_per_team: 1, consolation_rounds: false },
    notes: 'Great opportunity for young players to experience tournament play.',
    created_at: '2024-03-01T00:00:00Z',
    updated_at: '2024-03-25T00:00:00Z'
  },
  {
    id: '4',
    name: 'International Exhibition Match',
    tournament_type: 'exhibition',
    category: 'doubles',
    description: 'Special exhibition featuring international players and local champions. Pro-level demonstration matches and clinics.',
    organizer_id: 'federation-1',
    organizer_type: 'federation',
    organizer_name: 'Mexican Pickleball Federation',
    venue_name: 'Arena Guadalajara',
    venue_address: 'Av. de las Rosas 1234, Guadalajara, Jalisco',
    state: 'Jalisco',
    city: 'Guadalajara',
    latitude: 20.6597,
    longitude: -103.3496,
    start_date: '2024-08-15',
    end_date: '2024-08-16',
    registration_deadline: '2024-08-01',
    entry_fee: 120,
    max_participants: 200,
    current_participants: 156,
    max_teams: 100,
    current_teams: 78,
    skill_levels: ['4.0', '4.5', '5.0', '5.5'],
    age_categories: ['18-34', '35-49', '50+'],
    gender_categories: ['Men', 'Women', 'Mixed'],
    tournament_format: 'Exhibition + Competition',
    points_to_win: 11,
    win_by: 2,
    status: 'registration_open',
    rules: 'Professional rules with exhibition format. Spectator tickets available.',
    schedule: { day1: 'Exhibition Matches', day2: 'Competition' },
    court_assignments: { courts: 6, indoor: 6, outdoor: 0 },
    banner_image: '/img/tournament-scene-BJUfmDBV.jpg',
    logo: '/logo.jpeg',
    photos: { gallery: ['exhibition1.jpg'] },
    contact_email: 'exhibition@pickleballfederation.mx',
    contact_phone: '+52-55-1234-5678',
    registration_requirements: { skill_assessment: true, international_players: true },
    registration_notes: 'Limited spots available. VIP packages include meet & greet.',
    total_matches: 89,
    completed_matches: 0,
    settings: { max_players_per_team: 2, exhibition_format: true },
    notes: 'Featured on national sports networks. Great exposure opportunity.',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-03-25T00:00:00Z'
  },
  {
    id: '5',
    name: 'Senior Masters Championship',
    tournament_type: 'national',
    category: 'mixed_doubles',
    description: 'National championship for senior players (ages 50+). Multiple age divisions with age-appropriate rules and formats.',
    organizer_id: 'federation-1',
    organizer_type: 'federation',
    organizer_name: 'Mexican Pickleball Federation',
    venue_name: 'Senior Sports Complex',
    venue_address: 'Av. de la Juventud 789, Guadalajara, Jalisco',
    state: 'Jalisco',
    city: 'Guadalajara',
    latitude: 20.6597,
    longitude: -103.3496,
    start_date: '2024-09-20',
    end_date: '2024-09-22',
    registration_deadline: '2024-09-10',
    entry_fee: 95,
    max_participants: 300,
    current_participants: 234,
    max_teams: 150,
    current_teams: 117,
    skill_levels: ['3.0', '3.5', '4.0', '4.5'],
    age_categories: ['50-59', '60-69', '70-79', '80+'],
    gender_categories: ['Men', 'Women', 'Mixed'],
    tournament_format: 'Modified Double Elimination',
    points_to_win: 11,
    win_by: 2,
    status: 'registration_open',
    rules: 'Senior-friendly rules with longer breaks and modified scoring.',
    schedule: { day1: '50-69 divisions', day2: '70+ divisions', day3: 'Finals' },
    court_assignments: { courts: 10, indoor: 6, outdoor: 4 },
    banner_image: '/img/ranking-credentials.jpg',
    logo: '/logo.jpeg',
    photos: { gallery: ['senior1.jpg'] },
    contact_email: 'seniors@pickleballfederation.mx',
    contact_phone: '+52-55-9876-5432',
    registration_requirements: { age_verification: true, medical_clearance: true },
    registration_notes: 'Medical staff on site. Accommodations for mobility needs.',
    total_matches: 267,
    completed_matches: 0,
    settings: { max_players_per_team: 2, senior_rules: true },
    notes: 'Qualifies winners for international senior championships.',
    created_at: '2024-02-15T00:00:00Z',
    updated_at: '2024-03-25T00:00:00Z'
  },
  {
    id: '6',
    name: 'Corporate Team Challenge',
    tournament_type: 'exhibition',
    category: 'team',
    description: 'Fun team tournament for corporate groups and companies. Great for team building and networking.',
    organizer_id: 'partner-1',
    organizer_type: 'partner',
    organizer_name: 'Business Sports Network',
    venue_name: 'Corporate Sports Center',
    venue_address: 'Av. Empresarial 456, Zapopan, Jalisco',
    state: 'Jalisco',
    city: 'Zapopan',
    latitude: 20.7239,
    longitude: -103.3849,
    start_date: '2024-10-05',
    end_date: '2024-10-05',
    registration_deadline: '2024-09-25',
    entry_fee: 75,
    max_participants: 120,
    current_participants: 89,
    max_teams: 20,
    current_teams: 15,
    skill_levels: ['2.5', '3.0', '3.5', '4.0'],
    age_categories: ['18+'],
    gender_categories: ['Mixed Teams'],
    tournament_format: 'Team Round Robin',
    points_to_win: 11,
    win_by: 2,
    status: 'registration_open',
    rules: 'Fun format with team scoring. No skill level restrictions.',
    schedule: { start_time: '9:00 AM', format: 'Single Day' },
    court_assignments: { courts: 5, indoor: 3, outdoor: 2 },
    banner_image: '/img/partners-business.jpg',
    logo: '/logo.jpeg',
    photos: { gallery: ['corporate1.jpg'] },
    contact_email: 'corporate@businesssports.mx',
    contact_phone: '+52-33-7777-8888',
    registration_requirements: { team_registration: true, company_verification: true },
    registration_notes: 'Team packages available. Corporate sponsorship opportunities.',
    total_matches: 95,
    completed_matches: 0,
    settings: { max_players_per_team: 6, team_format: true },
    notes: 'Great networking opportunity. Prizes for top teams.',
    created_at: '2024-03-10T00:00:00Z',
    updated_at: '2024-03-25T00:00:00Z'
  }
];

const TournamentsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tournaments: reduxTournaments, loading, error, pagination } = useSelector((state: RootState) => state.tournaments);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  
  // Use mock data for now, but keep Redux integration for future
  const [filteredTournaments, setFilteredTournaments] = useState(mockTournaments);
  const tournaments = filteredTournaments;
  const mockPagination = {
    page: 1,
    limit: 12,
    total: filteredTournaments.length,
    pages: Math.ceil(filteredTournaments.length / 12)
  };
  
  const [filters, setFilters] = useState<{
    page: number;
    limit: number;
    tournament_type: 'all' | 'local' | 'state' | 'national' | 'international' | 'exhibition' | 'league';
    category: 'all' | 'singles' | 'doubles' | 'mixed_doubles' | 'team';
    status: 'all' | 'draft' | 'published' | 'registration_open' | 'registration_closed' | 'in_progress' | 'completed' | 'cancelled';
    state: string;
    city: string;
    search: string;
  }>({
    page: 1,
    limit: 12,
    tournament_type: 'all',
    category: 'all',
    status: 'all',
    state: '',
    city: '',
    search: ''
  });

  useEffect(() => {
    const apiFilters = {
      ...filters,
      tournament_type: filters.tournament_type === 'all' ? undefined : filters.tournament_type,
      category: filters.category === 'all' ? undefined : filters.category,
      status: filters.status === 'all' ? undefined : filters.status
    } as any;
    dispatch(fetchTournaments(apiFilters));
  }, [dispatch, filters]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
    
    // Apply filters immediately
    const newFilters = { ...filters, [key]: value, page: 1 };
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters: typeof filters) => {
    let filtered = [...mockTournaments];

    // Apply search filter
    if (currentFilters.search) {
      const searchTerm = currentFilters.search.toLowerCase();
      filtered = filtered.filter(tournament => 
        tournament.name.toLowerCase().includes(searchTerm) ||
        tournament.description.toLowerCase().includes(searchTerm) ||
        tournament.organizer_name.toLowerCase().includes(searchTerm) ||
        tournament.city.toLowerCase().includes(searchTerm) ||
        tournament.state.toLowerCase().includes(searchTerm)
      );
    }

    // Apply tournament type filter
    if (currentFilters.tournament_type !== 'all') {
      filtered = filtered.filter(tournament => 
        tournament.tournament_type === currentFilters.tournament_type
      );
    }

    // Apply category filter
    if (currentFilters.category !== 'all') {
      filtered = filtered.filter(tournament => 
        tournament.category === currentFilters.category
      );
    }

    // Apply status filter
    if (currentFilters.status !== 'all') {
      filtered = filtered.filter(tournament => 
        tournament.status === currentFilters.status
      );
    }

    // Apply city filter
    if (currentFilters.city) {
      filtered = filtered.filter(tournament => 
        tournament.city.toLowerCase().includes(currentFilters.city.toLowerCase())
      );
    }

    // Apply state filter
    if (currentFilters.state) {
      filtered = filtered.filter(tournament => 
        tournament.state.toLowerCase().includes(currentFilters.state.toLowerCase())
      );
    }

    setFilteredTournaments(filtered);
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleRegister = async (tournamentId: string) => {
    if (!isAuthenticated) {
      toast.error('Please log in to register for tournaments');
      return;
    }

    const tournament = tournaments.find(t => t.id === tournamentId);
    if (!tournament) return;

    // Check if tournament is full
    if (tournament.current_participants >= tournament.max_participants) {
      toast.error('This tournament is full. Please try another one.');
      return;
    }

    // Check if registration deadline has passed
    if (new Date(tournament.registration_deadline) < new Date()) {
      toast.error('Registration deadline has passed for this tournament.');
      return;
    }

    try {
      // Simulate registration process
      toast.loading('Processing registration...');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update local state to show registration
      const updatedTournaments = tournaments.map(t => 
        t.id === tournamentId 
          ? { ...t, current_participants: t.current_participants + 1 }
          : t
      );
      
      // In a real app, this would be handled by Redux
      // For now, we'll just show success
      toast.dismiss();
      toast.success(`Successfully registered for ${tournament.name}!`);
      
      // Show additional information
      toast.info(`Entry fee: $${tournament.entry_fee}. Check your email for confirmation.`, {
        duration: 5000
      });
      
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to register for tournament. Please try again.');
    }
  };

  // New handler functions for button actions
  const handleViewTournament = (tournamentId: string) => {
    const tournament = tournaments.find(t => t.id === tournamentId);
    if (tournament) {
      toast.info(`Viewing details for ${tournament.name}`, {
        description: `Tournament: ${tournament.tournament_type} - ${tournament.category}`,
        duration: 3000
      });
      // In a real app, this would navigate to tournament details page
      console.log('Viewing tournament:', tournament);
    }
  };

  const handleFavoriteTournament = (tournamentId: string) => {
    const tournament = tournaments.find(t => t.id === tournamentId);
    if (tournament) {
      toast.success(`Added ${tournament.name} to favorites!`, {
        description: 'You can view your favorite tournaments in your profile',
        duration: 3000
      });
      // In a real app, this would update user's favorites
      console.log('Favorited tournament:', tournament);
    }
  };

  const handleShareTournament = (tournamentId: string) => {
    const tournament = tournaments.find(t => t.id === tournamentId);
    if (tournament) {
      // Create shareable link
      const shareUrl = `${window.location.origin}/tournaments/${tournamentId}`;
      const shareText = `Check out this tournament: ${tournament.name}`;
      
      if (navigator.share) {
        navigator.share({
          title: tournament.name,
          text: shareText,
          url: shareUrl
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`).then(() => {
          toast.success('Tournament link copied to clipboard!', {
            description: 'Share this link with your friends',
            duration: 3000
          });
        });
      }
      console.log('Sharing tournament:', tournament);
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'my-tournaments':
        toast.info('My Tournaments', {
          description: 'Redirecting to your tournament dashboard...',
          duration: 2000
        });
        // In a real app, this would navigate to user's tournaments
        console.log('Navigating to My Tournaments');
        break;
      case 'my-results':
        toast.info('My Results', {
          description: 'Redirecting to your tournament results...',
          duration: 2000
        });
        // In a real app, this would navigate to user's results
        console.log('Navigating to My Results');
        break;
      case 'find-partners':
        toast.info('Find Partners', {
          description: 'Redirecting to partner finder...',
          duration: 2000
        });
        // In a real app, this would navigate to partner finder
        console.log('Navigating to Find Partners');
        break;
      case 'nearby-events':
        toast.info('Nearby Events', {
          description: 'Finding tournaments in your area...',
          duration: 2000
        });
        // Filter by location (for demo, show tournaments in Guadalajara)
        const nearbyTournaments = mockTournaments.filter(t => 
          t.city.toLowerCase().includes('guadalajara') ||
          t.city.toLowerCase().includes('zapopan') ||
          t.city.toLowerCase().includes('tlaquepaque')
        );
        setFilteredTournaments(nearbyTournaments);
        setFilters(prev => ({
          ...prev,
          city: 'Guadalajara',
          page: 1
        }));
        console.log('Finding nearby events');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleViewAllFeatured = () => {
    toast.info('View All Featured', {
      description: 'Showing only featured tournaments...',
      duration: 2000
    });
    // Filter to show only featured tournaments
    const featuredTournaments = mockTournaments.filter(t => 
      t.tournament_type === 'state' || 
      t.tournament_type === 'national' || 
      t.tournament_type === 'international'
    );
    setFilteredTournaments(featuredTournaments);
    setFilters(prev => ({
      ...prev,
      tournament_type: 'all', // Reset type filter to show all featured types
      page: 1
    }));
    console.log('Viewing all featured tournaments');
  };

  const handleBrowseAllTournaments = () => {
    toast.info('Browse All Tournaments', {
      description: 'Showing complete tournament listing...',
      duration: 2000
    });
    // Clear all filters and show all tournaments
    setFilters({
      page: 1,
      limit: 12,
      tournament_type: 'all',
      category: 'all',
      status: 'all',
      state: '',
      city: '',
      search: ''
    });
    setFilteredTournaments(mockTournaments);
    console.log('Browsing all tournaments');
  };

  const handleFindPartnersCTA = () => {
    toast.info('Find Partners', {
      description: 'Redirecting to partner finder...',
      duration: 2000
    });
    // In a real app, this would navigate to partner finder
    // For now, show a demo of partner finding
    toast.success('Partner Finder Demo', {
      description: 'This would open the partner finder page with tournament-specific partner matching',
      duration: 4000
    });
    console.log('Finding partners from CTA');
  };

  const handleTournamentCalendar = () => {
    toast.info('Tournament Calendar', {
      description: 'Redirecting to calendar view...',
      duration: 2000
    });
    // In a real app, this would show calendar view
    console.log('Viewing tournament calendar');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registration_open': return 'bg-green-100 text-green-800';
      case 'registration_closed': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getTournamentTypeColor = (type: string) => {
    switch (type) {
      case 'national': return 'bg-purple-100 text-purple-800';
      case 'international': return 'bg-indigo-100 text-indigo-800';
      case 'state': return 'bg-blue-100 text-blue-800';
      case 'local': return 'bg-green-100 text-green-800';
      case 'exhibition': return 'bg-orange-100 text-orange-800';
      case 'league': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'TBD';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const isRegistrationOpen = (tournament: Tournament) => {
    if (!tournament.registration_deadline) return false;
    try {
      return tournament.status === 'registration_open' && 
             new Date(tournament.registration_deadline) > new Date();
    } catch (error) {
      return false;
    }
  };

  const getDaysUntilDeadline = (deadline: string) => {
    try {
      const deadlineDate = new Date(deadline);
      const today = new Date();
      const diffTime = deadlineDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    } catch (error) {
      return 0;
    }
  };

  const getUrgencyColor = (deadline: string) => {
    const days = getDaysUntilDeadline(deadline);
    if (days <= 3) return 'text-red-600';
    if (days <= 7) return 'text-orange-600';
    if (days <= 14) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getUrgencyText = (deadline: string) => {
    const days = getDaysUntilDeadline(deadline);
    if (days <= 0) return 'Deadline passed';
    if (days === 1) return '1 day left';
    if (days <= 3) return `${days} days left - Hurry!`;
    if (days <= 7) return `${days} days left`;
    return `${days} days left`;
  };

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Tournaments
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover and register for pickleball tournaments near you. From local competitions 
            to national championships, find your next challenge.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex gap-2">
              <Input
                placeholder="Search tournaments..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="flex-1"
              />
              <Button 
                onClick={() => applyFilters(filters)}
                className="px-4"
              >
                Search
              </Button>
            </div>
            <Select value={filters.tournament_type} onValueChange={(value) => handleFilterChange('tournament_type', value)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Tournament Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="local">Local</SelectItem>
                <SelectItem value="state">State</SelectItem>
                <SelectItem value="national">National</SelectItem>
                <SelectItem value="international">International</SelectItem>
                <SelectItem value="exhibition">Exhibition</SelectItem>
                <SelectItem value="league">League</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="singles">Singles</SelectItem>
                <SelectItem value="doubles">Doubles</SelectItem>
                <SelectItem value="mixed_doubles">Mixed Doubles</SelectItem>
                <SelectItem value="team">Team</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="registration_open">Registration Open</SelectItem>
                <SelectItem value="registration_closed">Registration Closed</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="City"
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className=""
            />
            <Input
              placeholder="State"
              value={filters.state}
              onChange={(e) => handleFilterChange('state', e.target.value)}
              className=""
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setFilters({
                  page: 1,
                  limit: 12,
                  tournament_type: 'all',
                  category: 'all',
                  status: 'all',
                  state: '',
                  city: '',
                  search: ''
                });
                setFilteredTournaments(mockTournaments);
                toast.success('Filters cleared!');
              }}
              className="flex items-center gap-2"
            >
              <span>Clear Filters</span>
            </Button>
          </div>
        </div>

        {/* Tournament Statistics */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Tournaments</p>
                    <p className="text-3xl font-bold drop-shadow-sm">{tournaments.length}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Registration Open</p>
                    <p className="text-3xl font-bold drop-shadow-sm">
                      {tournaments.filter(t => t.status === 'registration_open').length}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Total Participants</p>
                    <p className="text-3xl font-bold drop-shadow-sm">
                      {tournaments.reduce((sum, t) => sum + t.current_participants, 0)}
                    </p>
                  </div>
                  <Users2 className="w-8 h-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm font-medium">Total Matches</p>
                    <p className="text-3xl font-bold drop-shadow-sm">
                      {tournaments.reduce((sum, t) => sum + t.total_matches, 0)}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
                  <p className="text-gray-600">Get started with tournament activities</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => handleQuickAction('my-tournaments')}
                  >
                    <Calendar className="w-4 h-4" />
                    My Tournaments
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => handleQuickAction('my-results')}
                  >
                    <Award className="w-4 h-4" />
                    My Results
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => handleQuickAction('find-partners')}
                  >
                    <Users className="w-4 h-4" />
                    Find Partners
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => handleQuickAction('nearby-events')}
                  >
                    <MapPin className="w-4 h-4" />
                    Nearby Events
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Tournaments */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Tournaments</h2>
            <Button variant="outline" size="sm" onClick={handleViewAllFeatured}>
              View All Featured
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tournaments
              .filter(t => t.tournament_type === 'state' || t.tournament_type === 'national' || t.tournament_type === 'international')
              .slice(0, 2)
              .map((tournament) => (
                <Card key={tournament.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border border-gray-200 shadow-md" style={{ opacity: 1, visibility: 'visible', zIndex: 1 }}>
                  <div className="relative h-64 bg-gradient-to-br from-purple-600 to-blue-600">
                    <div className="absolute inset-0 bg-black bg-opacity-25"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-yellow-500 text-white border-0 font-semibold">
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">{tournament.name}</h3>
                      <p className="text-white text-sm opacity-95 overflow-hidden text-ellipsis display-webkit-box -webkit-line-clamp-2 -webkit-box-orient-vertical">{tournament.description}</p>
                    </div>
                  </div>
                  <CardContent className="p-6 bg-white" style={{ opacity: 1, visibility: 'visible' }}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-900">{formatDate(tournament.start_date)}</p>
                        <p className="text-sm text-blue-600 font-medium">Start Date</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-700">${tournament.entry_fee}</p>
                        <p className="text-sm text-green-600 font-medium">Entry Fee</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-blue-800 font-medium">{tournament.city}, {tournament.state}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-800 font-medium">{tournament.current_participants}/{tournament.max_participants}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {isRegistrationOpen(tournament) ? (
                        <Button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold" onClick={() => handleRegister(tournament.id)}>
                          Register Now
                        </Button>
                      ) : (
                        <Button variant="outline" className="flex-1 bg-gray-100 text-gray-400 border-gray-300" disabled>
                          Registration Closed
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                        onClick={() => handleViewTournament(tournament.id)}
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All Tournaments */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Tournaments</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Showing {tournaments.length} tournaments</span>
            <span>•</span>
            <span>Sorted by date</span>
          </div>
        </div>

        {/* Tournaments Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading tournaments...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-600">Error loading tournaments: {error}</p>
          </div>
        ) : tournaments.length === 0 ? (
          <div className="text-center py-16">
            <CalendarDays className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No tournaments found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later for new tournaments.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {tournaments.map((tournament, index) => (
              <div key={tournament.id}>
                <Card className="h-full hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden bg-white border border-gray-200 shadow-md" style={{ opacity: 1, visibility: 'visible', zIndex: 1 }}>
                  {/* Tournament Banner Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden">
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={getTournamentTypeColor(tournament.tournament_type)}>
                        {tournament.tournament_type}
                      </Badge>
                      <Badge className={getStatusColor(tournament.status)}>
                        {tournament.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                        {tournament.name}
                      </h3>
                      <p className="text-white text-sm opacity-95 overflow-hidden text-ellipsis display-webkit-box -webkit-line-clamp-2 -webkit-box-orient-vertical">
                        {tournament.description}
                      </p>
                    </div>
                  </div>

                  <CardHeader className="pb-3 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Trophy className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{tournament.organizer_name}</p>
                          <p className="text-xs text-gray-600">{tournament.venue_name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">${tournament.entry_fee}</p>
                        <p className="text-xs text-gray-600 font-medium">Entry Fee</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 bg-white" style={{ opacity: 1, visibility: 'visible' }}>
                    {/* Key Information */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="font-semibold text-gray-900">{formatDate(tournament.start_date)}</p>
                          <p className="text-xs text-blue-600 font-medium">Start Date</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="font-semibold text-gray-900">{tournament.city}</p>
                          <p className="text-xs text-green-600 font-medium">{tournament.state}</p>
                        </div>
                      </div>
                    </div>

                    {/* Tournament Details */}
                    <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 font-medium">Category:</span>
                        <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 border-blue-300">
                          {tournament.category.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 font-medium">Format:</span>
                        <span className="font-semibold text-gray-900">{tournament.tournament_format}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 font-medium">Skill Levels:</span>
                        <div className="flex gap-1">
                          {tournament.skill_levels?.slice(0, 3).map((level, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                              {level}
                            </Badge>
                          ))}
                          {tournament.skill_levels && tournament.skill_levels.length > 3 && (
                            <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                              +{tournament.skill_levels.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Registration Status */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-blue-900">Registration Status</span>
                        <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                          {tournament.current_participants}/{tournament.max_participants}
                        </span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-3 mb-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-300 shadow-sm"
                          style={{ width: `${(tournament.current_participants / tournament.max_participants) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs font-medium text-blue-800">
                        {tournament.max_participants - tournament.current_participants} spots remaining
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {isRegistrationOpen(tournament) ? (
                        <Button 
                          onClick={() => handleRegister(tournament.id)}
                          className="flex-1 hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold"
                        >
                          Register Now
                        </Button>
                      ) : (
                        <Button 
                          variant="outline" 
                          disabled 
                          className="flex-1 bg-gray-100 text-gray-400 border-gray-300"
                        >
                          Registration Closed
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="px-3 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                        onClick={() => handleViewTournament(tournament.id)}
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="px-3 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                        onClick={() => handleFavoriteTournament(tournament.id)}
                      >
                        <Heart className="w-4 h-4 text-gray-600" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="px-3 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                        onClick={() => handleShareTournament(tournament.id)}
                      >
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </Button>
                    </div>

                    {/* Quick Info */}
                    <div className="pt-4 border-t border-gray-200 bg-gray-50 -mx-6 -mb-6 px-6 pb-6 rounded-b-lg">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 text-gray-500" />
                          <span className={`font-medium ${getUrgencyColor(tournament.registration_deadline)}`}>
                            {getUrgencyText(tournament.registration_deadline)}
                          </span>
                        </div>
                        <span className="text-gray-600 font-medium">{tournament.total_matches} matches</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {mockPagination && mockPagination.pages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => handlePageChange(filters.page - 1)}
              disabled={filters.page === 1}
              className="hover:scale-105 transition-transform duration-300"
            >
              Previous
            </Button>
            <span className="px-4 py-2 text-gray-600">
              Page {filters.page} of {mockPagination.pages}
            </span>
            <Button
              variant="outline"
              onClick={() => handlePageChange(filters.page + 1)}
              disabled={filters.page === mockPagination.pages}
              className="hover:scale-105 transition-transform duration-300"
            >
              Next
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">Ready to Compete?</h3>
              <p className="text-xl text-blue-100 mb-6">
                Join thousands of players in exciting tournaments across Jalisco and beyond. 
                Find your next challenge and showcase your skills!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={handleBrowseAllTournaments}
                >
                  <Trophy className="w-5 h-5 mr-2" />
                  Browse All Tournaments
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  onClick={handleFindPartnersCTA}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Find Partners
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  onClick={handleTournamentCalendar}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Tournament Calendar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TournamentsPage; 