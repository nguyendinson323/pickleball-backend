# Database Seeders Summary

## Overview
This document provides a comprehensive summary of all database seeders created for the Pickleball Federation Platform backend. The seeders populate the database with realistic sample data for development, testing, and demonstration purposes.

## Seeder Files Created

### 1. `001_demo_users.js` - User Data
- **Records**: 15+ sample users
- **User Types**: Super Admin, Admin, Moderator, Club Owner, Coach, Player, Partner, State, Federation
- **Data Includes**:
  - Complete user profiles with realistic names, emails, and contact information
  - Various skill levels (beginner, intermediate, advanced)
  - Different user types and roles
  - Location data for Mexican states
  - Membership statuses and subscription types
  - Email verification and account status

### 2. `002_demo_clubs.js` - Club Data
- **Records**: 12+ sample clubs
- **Club Types**: Indoor, Outdoor, Mixed, Premium, Community
- **Data Includes**:
  - Club names, descriptions, and contact information
  - Location data with addresses and coordinates
  - Operating hours and amenities
  - Membership fees and club types
  - Owner information and status

### 3. `003_demo_courts.js` - Court Data
- **Records**: 15+ sample courts
- **Court Types**: Indoor, Outdoor, Premium, Standard
- **Data Includes**:
  - Court names and descriptions
  - Surface types and lighting information
  - Pricing for different time slots
  - Availability schedules
  - Associated club information

### 4. `004_demo_tournaments.js` - Tournament Data
- **Records**: 13+ sample tournaments
- **Tournament Types**: Singles, Doubles, Mixed Doubles, Team
- **Data Includes**:
  - Tournament names, descriptions, and rules
  - Registration fees and prize pools
  - Tournament dates and locations
  - Skill level divisions and categories
  - Tournament statuses and participant limits

### 5. `005_demo_banners.js` - Banner/Carousel Data
- **Records**: 12+ sample banners
- **Banner Types**: Carousel, Promotional, Event, Announcement, Informational
- **Data Includes**:
  - Banner titles, subtitles, and descriptions
  - Image URLs and link destinations
  - Position and status information
  - Target audience and scheduling
  - Analytics tracking fields

### 6. `006_demo_payments.js` - Payment Data
- **Records**: 12+ sample payments
- **Payment Types**: Tournament Registration, Premium Subscription, Court Reservation, Club Registration, Coaching Certification
- **Data Includes**:
  - Payment amounts and currencies
  - Payment methods and statuses
  - Stripe payment intent IDs
  - Transaction metadata
  - Various payment statuses (completed, pending, failed, refunded)

### 7. `007_demo_notifications.js` - Notification Data
- **Records**: 12+ sample notifications
- **Notification Types**: Tournament Registration, Payment Success/Failed, Court Reservation, Match Request, Ranking Update, System Announcement
- **Data Includes**:
  - Notification titles and messages
  - User-specific data and metadata
  - Read/unread status
  - Timestamps and delivery information

### 8. `008_demo_rankings.js` - Ranking Data
- **Records**: 16+ sample rankings
- **Categories**: Singles, Doubles
- **Divisions**: Beginner, Intermediate, Advanced
- **Data Includes**:
  - Ranking points and positions
  - Win/loss records and percentages
  - Tournament participation statistics
  - Last updated timestamps

### 9. `009_demo_player_finder.js` - Player Finder Data
- **Records**: 10+ sample player finder records
- **Data Includes**:
  - Player preferences and skill levels
  - Location data and distance preferences
  - Availability schedules
  - Contact preferences and bios
  - Active/inactive status

### 10. `010_demo_court_reservations.js` - Court Reservation Data
- **Records**: 15+ sample court reservations
- **Data Includes**:
  - Reservation dates and time slots
  - Court assignments and pricing
  - Payment status and confirmation
  - User notes and special requests
  - Various reservation statuses

### 11. `011_demo_tournament_registrations.js` - Tournament Registration Data
- **Records**: 15+ sample tournament registrations
- **Data Includes**:
  - Registration dates and categories
  - Partner information for doubles
  - Payment and registration statuses
  - Division and skill level information
  - User notes and preferences

### 12. `012_demo_file_uploads.js` - File Upload Data
- **Records**: 15+ sample file uploads
- **File Types**: Profile Photos, Certificates, Logos, Videos, Documents, Forms
- **Data Includes**:
  - File names, paths, and URLs
  - File sizes and MIME types
  - Upload types and metadata
  - Public/private visibility settings
  - Associated user information

### 13. `013_demo_matches.js` - Match Data
- **Records**: 15+ sample matches
- **Match Types**: Singles, Doubles, Team
- **Data Includes**:
  - Match scheduling and timing
  - Player assignments and scores
  - Tournament and court information
  - Match results and winners
  - Match notes and statistics

## Data Relationships

### User Relationships
- Users are linked to clubs (as owners)
- Users participate in tournaments
- Users make court reservations
- Users have rankings and player finder profiles
- Users receive notifications and make payments

### Tournament Relationships
- Tournaments are hosted by clubs
- Tournaments have registrations and matches
- Tournaments use specific courts
- Tournaments generate payments and notifications

### Club Relationships
- Clubs own courts
- Clubs host tournaments
- Clubs have members and owners
- Clubs generate court reservations

### Court Relationships
- Courts belong to clubs
- Courts have reservations
- Courts are used for matches
- Courts have pricing and availability

## Data Consistency

### UUID Consistency
- All seeders use consistent UUIDs for related records
- User IDs are referenced across multiple tables
- Club IDs link clubs to courts and tournaments
- Tournament IDs connect registrations and matches

### Date Consistency
- All timestamps are realistic and consistent
- Tournament dates align with registration dates
- Match schedules fit within tournament timelines
- Payment dates correspond to registration dates

### Status Consistency
- Payment statuses align with registration statuses
- Tournament statuses match registration periods
- Court reservation statuses reflect payment statuses
- User account statuses are consistent across tables

## Usage Instructions

### Running Seeders
```bash
# Run all seeders
npx sequelize-cli db:seed:all

# Run specific seeder
npx sequelize-cli db:seed --seed 001_demo_users.js

# Undo all seeders
npx sequelize-cli db:seed:undo:all

# Undo specific seeder
npx sequelize-cli db:seed:undo --seed 001_demo_users.js
```

### Seeder Order
The seeders are designed to run in the following order to maintain referential integrity:
1. Users (001)
2. Clubs (002)
3. Courts (003)
4. Tournaments (004)
5. Banners (005)
6. Payments (006)
7. Notifications (007)
8. Rankings (008)
9. Player Finder (009)
10. Court Reservations (010)
11. Tournament Registrations (011)
12. File Uploads (012)
13. Matches (013)

## Data Volume Summary

| Table | Records | Description |
|-------|---------|-------------|
| Users | 15+ | Complete user profiles with various types |
| Clubs | 12+ | Diverse club types and locations |
| Courts | 15+ | Various court types and pricing |
| Tournaments | 13+ | Different tournament formats and levels |
| Banners | 12+ | Carousel and promotional content |
| Payments | 12+ | Various transaction types and statuses |
| Notifications | 12+ | Different notification types |
| Rankings | 16+ | Multiple categories and divisions |
| Player Finder | 10+ | Player matching profiles |
| Court Reservations | 15+ | Booking records with pricing |
| Tournament Registrations | 15+ | Registration records with partners |
| File Uploads | 15+ | Various file types and metadata |
| Matches | 15+ | Tournament match results |

## Testing Scenarios

The seeders provide data for testing:
- **Authentication**: Multiple user types and roles
- **Authorization**: Different permission levels
- **Tournament Management**: Complete tournament lifecycle
- **Court Booking**: Reservation system with pricing
- **Player Matching**: Location-based player finder
- **Payment Processing**: Various payment scenarios
- **Notification System**: Different notification types
- **File Management**: Multiple file types and uploads
- **Ranking System**: Points and statistics tracking

## Maintenance

### Updating Seeders
- Modify seeder files to add new records
- Update UUIDs for new relationships
- Maintain data consistency across tables
- Test seeder execution after changes

### Data Refresh
- Use `db:seed:undo:all` to clear all data
- Run `db:seed:all` to repopulate with fresh data
- Verify relationships and constraints after refresh

## Conclusion

The comprehensive seeder suite provides a complete dataset for the Pickleball Federation Platform, enabling full testing and demonstration of all platform features. The data is realistic, consistent, and covers all major use cases and scenarios. 