# Pickleball Federation Frontend

A modern React-based frontend for the Mexican Pickleball Federation platform, built with TypeScript, Redux Toolkit, and Tailwind CSS.

## 🚀 Features

- **Complete User Management**: Registration, login, and profile management for all user types (Players, Coaches, Clubs, Partners, States, Federation)
- **Tournament Management**: Browse, register, and manage tournaments
- **Club Management**: Find and join clubs, manage club information
- **Ranking System**: View player rankings and statistics
- **Payment Integration**: Stripe payment processing for tournaments and memberships
- **Admin Dashboard**: Comprehensive admin panel for federation management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **HTTP Client**: Fetch API with custom service layer
- **Authentication**: JWT with automatic token refresh
- **UI Components**: Radix UI primitives with shadcn/ui

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── Footer.tsx      # Footer component
│   └── ProtectedRoute.tsx # Authentication wrapper
├── hooks/              # Custom React hooks
│   └── useApi.ts       # API call hook
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── LoginPage.tsx   # Authentication
│   ├── RegisterPage.tsx # User registration
│   ├── DashboardPage.tsx # User dashboard
│   ├── ClubsPage.tsx   # Club management
│   ├── TournamentsPage.tsx # Tournament management
│   ├── RankingsPage.tsx # Player rankings
│   ├── ProfilePage.tsx # User profile
│   ├── AdminPage.tsx   # Admin dashboard
│   └── NotFoundPage.tsx # 404 page
├── services/           # API services
│   └── api.ts          # API client
├── store/              # Redux store
│   ├── index.ts        # Store configuration
│   └── slices/         # Redux slices
│       ├── authSlice.ts # Authentication state
│       ├── usersSlice.ts # User management
│       ├── clubsSlice.ts # Club management
│       ├── tournamentsSlice.ts # Tournament management
│       ├── courtsSlice.ts # Court management
│       ├── paymentsSlice.ts # Payment processing
│       ├── rankingsSlice.ts # Ranking system
│       ├── notificationsSlice.ts # Notifications
│       ├── adminSlice.ts # Admin functionality
│       └── statsSlice.ts # Statistics
├── types/              # TypeScript type definitions
│   └── api.ts          # API types and interfaces
└── main.tsx            # Application entry point
```

## 🔧 Configuration

### API Configuration

The frontend is configured to proxy API requests to the backend server. Update the proxy configuration in `vite.config.ts`:

```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

### Redux Store

The Redux store is configured with the following slices:
- **auth**: Authentication and user session management
- **users**: User data and management
- **clubs**: Club information and operations
- **tournaments**: Tournament management
- **courts**: Court booking and management
- **payments**: Payment processing
- **rankings**: Player ranking system
- **notifications**: User notifications
- **admin**: Admin panel functionality
- **stats**: Platform statistics

## 🎨 UI Components

The application uses shadcn/ui components for consistent design:

- **Button**: Various button styles and states
- **Input**: Form input fields with validation
- **Card**: Content containers
- **Dialog**: Modal dialogs
- **Dropdown**: Dropdown menus
- **Avatar**: User profile images
- **Badge**: Status indicators
- **Table**: Data tables
- **Form**: Form components with validation

## 🔐 Authentication

The authentication system supports:

- **JWT Tokens**: Secure token-based authentication
- **Role-based Access**: Different access levels for users, admins, and super admins
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Token Refresh**: Automatic token refresh on expiration
- **Persistent Sessions**: Session persistence across browser sessions

## 📱 Responsive Design

The application is fully responsive with:

- **Mobile-first approach**: Optimized for mobile devices
- **Breakpoint system**: Tailwind CSS breakpoints
- **Flexible layouts**: Adaptive grid and flexbox layouts
- **Touch-friendly**: Optimized for touch interactions

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables for Production

Set the following environment variables for production:

```env
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.
