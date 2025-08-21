/**
 * Database Models Index
 * 
 * This file imports all models and establishes their relationships.
 * It serves as the central point for model associations and exports.
 * 
 * @author Pickleball Federation Team
 * @version 1.0.0
 */

const { sequelize } = require('../../config/database');

// Import all models
const User = require('./User');
const Club = require('./Club');
const Tournament = require('./Tournament');
const Court = require('./Court');
const TournamentRegistration = require('./TournamentRegistration');
const TournamentTeam = require('./TournamentTeam');
const Match = require('./Match');
const Ranking = require('./Ranking');
const Payment = require('./Payment');
const Notification = require('./Notification');
const FileUpload = require('./FileUpload');
const Banner = require('./Banner');
const PlayerFinder = require('./PlayerFinder');
const CourtReservation = require('./CourtReservation');
const DigitalCredential = require('./DigitalCredential');
const CoachFinder = require('./CoachFinder');

// Define associations

// User associations
User.hasMany(TournamentRegistration, {
  foreignKey: 'user_id',
  as: 'tournamentRegistrations'
});

User.hasMany(TournamentTeam, {
  foreignKey: 'captain_id',
  as: 'captainedTeams'
});

User.hasMany(Match, {
  foreignKey: 'player1_id',
  as: 'matchesAsPlayer1'
});

User.hasMany(Match, {
  foreignKey: 'player2_id',
  as: 'matchesAsPlayer2'
});

User.hasMany(Ranking, {
  foreignKey: 'user_id',
  as: 'rankings'
});

User.hasMany(Payment, {
  foreignKey: 'user_id',
  as: 'payments'
});

User.hasMany(Notification, {
  foreignKey: 'user_id',
  as: 'notifications'
});

User.hasMany(FileUpload, {
  foreignKey: 'user_id',
  as: 'fileUploads'
});

// Club associations
Club.hasMany(User, {
  foreignKey: 'club_id',
  as: 'members'
});

Club.hasMany(Tournament, {
  foreignKey: 'organizer_id',
  as: 'organizedTournaments',
  scope: { organizer_type: 'club' }
});

Club.hasMany(Court, {
  foreignKey: 'club_id',
  as: 'courts'
});

Club.hasMany(Payment, {
  foreignKey: 'club_id',
  as: 'payments'
});

// Tournament associations
Tournament.hasMany(TournamentRegistration, {
  foreignKey: 'tournament_id',
  as: 'registrations'
});

Tournament.hasMany(TournamentTeam, {
  foreignKey: 'tournament_id',
  as: 'teams'
});

Tournament.hasMany(Match, {
  foreignKey: 'tournament_id',
  as: 'matches'
});

Tournament.hasMany(Payment, {
  foreignKey: 'tournament_id',
  as: 'payments'
});

Tournament.hasMany(FileUpload, {
  foreignKey: 'tournament_id',
  as: 'fileUploads'
});

// Tournament referee associations
Tournament.belongsTo(User, {
  foreignKey: 'head_referee_id',
  as: 'headReferee'
});

// User referee associations
User.hasMany(Tournament, {
  foreignKey: 'head_referee_id',
  as: 'refereeTournaments'
});

User.hasMany(Match, {
  foreignKey: 'referee_id',
  as: 'refereeMatches'
});

// TournamentRegistration associations
TournamentRegistration.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

TournamentRegistration.belongsTo(Tournament, {
  foreignKey: 'tournament_id',
  as: 'tournament'
});

// TournamentTeam associations
TournamentTeam.belongsTo(User, {
  foreignKey: 'captain_id',
  as: 'captain'
});

TournamentTeam.belongsTo(Tournament, {
  foreignKey: 'tournament_id',
  as: 'tournament'
});

TournamentTeam.belongsToMany(User, {
  through: 'tournament_team_members',
  foreignKey: 'team_id',
  otherKey: 'user_id',
  as: 'members'
});

// Match associations
Match.belongsTo(User, {
  foreignKey: 'player1_id',
  as: 'player1'
});

Match.belongsTo(User, {
  foreignKey: 'player2_id',
  as: 'player2'
});

Match.belongsTo(Tournament, {
  foreignKey: 'tournament_id',
  as: 'tournament'
});

Match.belongsTo(Court, {
  foreignKey: 'court_id',
  as: 'court'
});

Match.belongsTo(User, {
  foreignKey: 'referee_id',
  as: 'referee'
});

// Ranking associations
Ranking.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

// Payment associations
Payment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Payment.belongsTo(Club, {
  foreignKey: 'club_id',
  as: 'club'
});

Payment.belongsTo(Tournament, {
  foreignKey: 'tournament_id',
  as: 'tournament'
});

// Notification associations
Notification.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

// FileUpload associations
FileUpload.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

FileUpload.belongsTo(Tournament, {
  foreignKey: 'tournament_id',
  as: 'tournament'
});

// Banner associations
Banner.belongsTo(User, {
  foreignKey: 'related_user_id',
  as: 'relatedUser'
});

Banner.belongsTo(Tournament, {
  foreignKey: 'related_tournament_id',
  as: 'relatedTournament'
});

Banner.belongsTo(Club, {
  foreignKey: 'related_club_id',
  as: 'relatedClub'
});

// PlayerFinder associations
PlayerFinder.belongsTo(User, {
  foreignKey: 'searcher_id',
  as: 'searcher'
});

// CoachFinder associations
CoachFinder.belongsTo(User, {
  foreignKey: 'searcher_id',
  as: 'searcher'
});

User.hasMany(CoachFinder, {
  foreignKey: 'searcher_id',
  as: 'coachSearches'
});

// CourtReservation associations
CourtReservation.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

CourtReservation.belongsTo(Court, {
  foreignKey: 'court_id',
  as: 'court'
});

CourtReservation.belongsTo(Club, {
  foreignKey: 'club_id',
  as: 'club'
});

CourtReservation.belongsTo(Payment, {
  foreignKey: 'payment_id',
  as: 'payment'
});

// Court has many reservations
Court.hasMany(CourtReservation, {
  foreignKey: 'court_id',
  as: 'reservations'
});

// User has many reservations
User.hasMany(CourtReservation, {
  foreignKey: 'user_id',
  as: 'reservations'
});

// User has one digital credential
User.hasOne(DigitalCredential, {
  foreignKey: 'user_id',
  as: 'digitalCredential'
});

// Club has many reservations
Club.hasMany(CourtReservation, {
  foreignKey: 'club_id',
  as: 'reservations'
});

// Court associations
Court.belongsTo(Club, {
  foreignKey: 'club_id',
  as: 'club'
});

Court.hasMany(Match, {
  foreignKey: 'court_id',
  as: 'matches'
});

// Reverse associations for User
User.belongsTo(Club, {
  foreignKey: 'club_id',
  as: 'club'
});

User.belongsToMany(TournamentTeam, {
  through: 'tournament_team_members',
  foreignKey: 'user_id',
  otherKey: 'team_id',
  as: 'teams'
});

// Reverse associations for Tournament
Tournament.belongsTo(User, {
  foreignKey: 'organizer_id',
  as: 'organizer',
  scope: { organizer_type: 'federation' }
});

Tournament.belongsTo(Club, {
  foreignKey: 'organizer_id',
  as: 'organizingClub',
  scope: { organizer_type: 'club' }
});

// DigitalCredential belongs to User
DigitalCredential.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

// Export all models
module.exports = {
  sequelize,
  User,
  Club,
  Tournament,
  Court,
  TournamentRegistration,
  TournamentTeam,
  Match,
  Ranking,
  Payment,
  Notification,
  FileUpload,
  Banner,
  PlayerFinder,
  CourtReservation,
  DigitalCredential,
  CoachFinder
}; 