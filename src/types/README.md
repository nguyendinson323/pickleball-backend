# Pickleball Platform - Complete Interface Documentation

## Overview

This directory contains comprehensive TypeScript interfaces for the entire Pickleball Platform application. The interfaces are organized into logical modules and provide type safety across all components, pages, hooks, and utilities.

## File Structure

```
src/types/
├── api.ts              # API data models and request/response types
├── pages.ts            # Page-specific interfaces and state management
├── components.ts       # UI component interfaces and props
├── hooks.ts            # Custom hook interfaces and return types
├── utilities.ts        # Utility function and service interfaces
├── index.ts            # Main export file with common type aliases
└── README.md           # This documentation file
```

## Quick Start

```typescript
// Import all types
import { User, Club, Tournament, useAuth, ButtonProps } from '../types';

// Or import specific modules
import { User, Club } from '../types/api';
import { PlayerDashboardProps } from '../types/pages';
import { ButtonProps } from '../types/components';
```

## Core API Types

### User Management
- `User` - Complete user model with all properties
- `LoginRequest` / `LoginResponse` - Authentication types
- `RegisterRequest` / `RegisterResponse` - Registration types
- `UsersQueryParams` - User search and filtering

### Club Management
- `Club` - Club entity with all properties
- `CreateClubRequest` - Club creation payload
- `ClubsQueryParams` - Club search and filtering
- `ClubCourtsResponse` - Club courts data

### Tournament Management
- `Tournament` - Tournament entity with all properties
- `CreateTournamentRequest` - Tournament creation payload
- `TournamentRegistrationRequest` - Player registration
- `TournamentsQueryParams` - Tournament search and filtering

### Court Management
- `Court` - Court entity with all properties
- `CreateCourtRequest` - Court creation payload
- `BookCourtRequest` - Court booking payload
- `CourtsQueryParams` - Court search and filtering

### Payment System
- `Payment` - Payment entity with all properties
- `CreatePaymentRequest` - Payment creation payload
- `ProcessPaymentRequest` - Payment processing
- `PaymentsQueryParams` - Payment search and filtering

### Rankings System
- `Ranking` - Player ranking entity
- `RankingsQueryParams` - Ranking search and filtering
- `TopPlayersResponse` - Top players data

### Notifications
- `Notification` - Notification entity
- `NotificationsQueryParams` - Notification filtering
- `MarkReadResponse` - Mark as read response

### Banners
- `Banner` - Banner entity for marketing
- `CreateBannerRequest` - Banner creation payload
- `BannerAnalyticsResponse` - Banner performance data

### Player Finder
- `PlayerFinder` - Player matching preferences
- `SearchPlayersQueryParams` - Player search parameters
- `SendMatchRequestRequest` - Match request payload

### Court Reservations
- `CourtReservation` - Court booking entity
- `CourtAvailabilityQueryParams` - Availability search
- `CourtBookingsQueryParams` - Booking search

## Page Interfaces

### Authentication Pages
- `LoginPageProps` / `LoginPageState` - Login page interface
- `SelectUserTypePageProps` / `SelectUserTypePageState` - User type selection
- `RequiredFieldsPageProps` / `RequiredFieldsPageState` - Required registration fields
- `OptionalFieldsPageProps` / `OptionalFieldsPageState` - Optional registration fields
- `ProfilePageProps` / `ProfilePageState` - User profile management

### Public Pages
- `HomePageProps` / `HomePageState` - Landing page
- `AboutPageProps` / `AboutPageState` - About page
- `EventsPageProps` / `EventsPageState` - Events listing
- `NewsPageProps` / `NewsPageState` - News and articles
- `ContactPageProps` / `ContactPageState` - Contact information

### Common Functionality
- `ClubsPageProps` / `ClubsPageState` - Club browsing
- `TournamentsPageProps` / `TournamentsPageState` - Tournament browsing
- `RankingsPageProps` / `RankingsPageState` - Player rankings
- `PlayerFinderPageProps` / `PlayerFinderPageState` - Player matching
- `CourtReservationsPageProps` / `CourtReservationsPageState` - Court booking
- `FindCourtPageProps` / `FindCourtPageState` - Court search
- `MembershipPageProps` / `MembershipPageState` - Membership information
- `MessagePageProps` / `MessagePageState` - Messaging system

### Role-Based Pages

#### Player Pages
- `PlayerDashboardProps` / `PlayerDashboardState` - Player dashboard
- `PlayerProfileProps` / `PlayerProfileState` - Player profile

#### Coach Pages
- `CoachDashboardProps` / `CoachDashboardState` - Coach dashboard
- `CoachProfileProps` / `CoachProfileState` - Coach profile
- `CoachCredentialsProps` / `CoachCredentialsState` - Credentials management
- `CoachStudentsProps` / `CoachStudentsState` - Student management
- `CoachSessionsProps` / `CoachSessionsState` - Session management
- `CoachCertificationsProps` / `CoachCertificationsState` - Certification management

#### Club Pages
- `ClubDashboardProps` / `ClubDashboardState` - Club dashboard
- `ClubProfileProps` / `ClubProfileState` - Club profile
- `ClubCourtManagementProps` / `ClubCourtManagementState` - Court management
- `ClubMemberManagementProps` / `ClubMemberManagementState` - Member management
- `ClubMicrositeProps` / `ClubMicrositeState` - Club microsite

#### Partner Pages
- `PartnerDashboardProps` / `PartnerDashboardState` - Partner dashboard
- `BusinessProfileProps` / `BusinessProfileState` - Business profile
- `PartnerCourtManagementProps` / `PartnerCourtManagementState` - Court management
- `BusinessMicrositeProps` / `BusinessMicrositeState` - Business microsite
- `PartnerAnalyticsProps` / `PartnerAnalyticsState` - Business analytics

#### State Pages
- `StateDashboardProps` / `StateDashboardState` - State dashboard
- `StateProfileProps` / `StateProfileState` - State profile
- `StateMemberManagementProps` / `StateMemberManagementState` - Member management
- `StateCourtManagementProps` / `StateCourtManagementState` - Court management
- `StateMicrositeProps` / `StateMicrositeState` - State microsite
- `StateAnnouncementsProps` / `StateAnnouncementsState` - Announcements
- `StateStatisticsProps` / `StateStatisticsState` - Statistics

#### Super Admin Pages
- `SuperAdminDashboardProps` / `SuperAdminDashboardState` - Super admin dashboard
- `AdminProfileProps` / `AdminProfileState` - Admin profile
- `UserManagementProps` / `UserManagementState` - User management
- `SystemManagementProps` / `SystemManagementState` - System management
- `AnalyticsProps` / `AnalyticsState` - System analytics
- `BannersPageProps` / `BannersPageState` - Banner management

## Component Interfaces

### Layout Components
- `LayoutProps` - Base layout wrapper
- `ContainerProps` - Container with max width
- `GridProps` - CSS Grid layout
- `FlexProps` - Flexbox layout

### Navigation Components
- `NavigationProps` - Navigation menu
- `BreadcrumbProps` - Breadcrumb navigation
- `PaginationProps` - Page navigation
- `TabProps` - Tab navigation

### Form Components
- `FormProps` - Form wrapper
- `FormFieldProps` - Input field
- `TextAreaProps` - Text area
- `SelectProps` - Dropdown select
- `CheckboxProps` - Checkbox
- `RadioGroupProps` - Radio button group
- `SwitchProps` - Toggle switch
- `FileUploadProps` - File upload
- `DatePickerProps` - Date picker
- `TimePickerProps` - Time picker

### Button Components
- `ButtonProps` - Button component
- `IconButtonProps` - Icon-only button
- `ButtonGroupProps` - Button group

### Display Components
- `CardProps` - Card container
- `BadgeProps` - Status badge
- `AvatarProps` - User avatar
- `DividerProps` - Visual separator
- `SkeletonProps` - Loading skeleton
- `ProgressProps` - Progress bar
- `SpinnerProps` - Loading spinner

### Feedback Components
- `AlertProps` - Alert message
- `ToastProps` - Toast notification
- `TooltipProps` - Tooltip
- `PopoverProps` - Popover
- `ModalProps` - Modal dialog
- `DrawerProps` - Side drawer
- `DialogProps` - Dialog

### Data Display Components
- `TableProps<T>` - Data table
- `DataGridProps<T>` - Advanced data grid
- `ListProps<T>` - List component
- `TreeProps<T>` - Tree structure
- `TimelineProps` - Timeline

### Chart Components
- `ChartProps` - Chart wrapper
- `MetricCardProps` - Metric display
- `StatCardProps` - Statistics card

### Entity-Specific Components
- `UserCardProps` - User display card
- `TournamentCardProps` - Tournament card
- `ClubCardProps` - Club card
- `CourtCardProps` - Court card
- `PaymentCardProps` - Payment card
- `RankingCardProps` - Ranking card
- `NotificationItemProps` - Notification item
- `BannerCardProps` - Banner card

## Hook Interfaces

### Authentication Hooks
- `UseAuthReturn` - Authentication state and methods
- `LoginCredentials` - Login form data
- `RegisterData` - Registration form data

### API Hooks
- `UseApiReturn<T>` - API call state and methods
- `UseApiOptions<T>` - API hook configuration
- `UseApiState<T>` - API state structure

### Pagination Hooks
- `UsePaginationReturn` - Pagination state and methods
- `UsePaginationOptions` - Pagination configuration
- `PaginationState` - Pagination state structure

### Search and Filter Hooks
- `UseSearchReturn` - Search state and methods
- `UseSearchOptions` - Search configuration
- `SearchState` - Search state structure

### Form Hooks
- `UseFormReturn<T>` - Form state and methods
- `UseFormOptions<T>` - Form configuration
- `FormState<T>` - Form state structure

### Table Hooks
- `UseTableReturn<T>` - Table state and methods
- `UseTableOptions<T>` - Table configuration
- `TableParams` - Table parameters
- `TableState<T>` - Table state structure

### Modal Hooks
- `UseModalReturn` - Modal state and methods
- `UseModalOptions` - Modal configuration
- `ModalState` - Modal state structure

### Toast Hooks
- `UseToastReturn` - Toast methods
- `ToastOptions` - Toast configuration
- `ToastState` - Toast state structure

### Storage Hooks
- `UseLocalStorageReturn<T>` - Local storage hook
- `UseSessionStorageReturn<T>` - Session storage hook

### Window Hooks
- `UseWindowSizeReturn` - Window size hook
- `UseWindowScrollReturn` - Window scroll hook
- `UseWindowFocusReturn` - Window focus hook

### Media Query Hooks
- `UseMediaQueryReturn` - Media query hook
- `UseMediaQueryOptions` - Media query configuration

### Animation Hooks
- `UseAnimationReturn` - Animation control
- `UseAnimationOptions` - Animation configuration

### Timer Hooks
- `UseTimerReturn` - Timer control
- `UseCountdownReturn` - Countdown control

### Utility Hooks
- `UseDebounceReturn<T>` - Debounced value
- `UseThrottleReturn<T>` - Throttled value

### Observer Hooks
- `UseIntersectionObserverReturn` - Intersection observer
- `UseResizeObserverReturn` - Resize observer
- `UseMutationObserverReturn` - Mutation observer

### Device Hooks
- `UseGeolocationReturn` - Geolocation
- `UseNetworkReturn` - Network status
- `UseDeviceReturn` - Device information

### Theme and Language Hooks
- `UseThemeReturn` - Theme management
- `UseLanguageReturn` - Language management

## Utility Interfaces

### Validation
- `ValidationRule` - Field validation rule
- `ValidationSchema` - Form validation schema
- `ValidationResult` - Validation result
- `FieldValidation` - Field validation state

### Formatting
- `DateFormatOptions` - Date formatting options
- `NumberFormatOptions` - Number formatting options
- `PhoneFormatOptions` - Phone formatting options
- `AddressFormatOptions` - Address formatting options

### Storage
- `StorageOptions` - Storage configuration
- `StorageItem<T>` - Storage item structure
- `StorageManager` - Storage management interface

### Cache
- `CacheOptions` - Cache configuration
- `CacheItem<T>` - Cache item structure
- `CacheManager<T>` - Cache management interface
- `CacheStats` - Cache statistics

### Encryption
- `EncryptionOptions` - Encryption configuration
- `EncryptionResult` - Encryption result
- `CryptoService` - Cryptographic service interface

### HTTP
- `HttpRequestConfig` - HTTP request configuration
- `HttpResponse<T>` - HTTP response structure
- `HttpError` - HTTP error structure
- `HttpClient` - HTTP client interface
- `HttpInterceptor` - HTTP interceptor interface

### WebSocket
- `WebSocketConfig` - WebSocket configuration
- `WebSocketMessage<T>` - WebSocket message
- `WebSocketEvent` - WebSocket event
- `WebSocketService` - WebSocket service interface

### Event Management
- `EventEmitter` - Event emitter interface
- `EventSubscription` - Event subscription

### Routing
- `Route` - Route definition
- `RouteMeta` - Route metadata
- `RouterContext` - Router context
- `NavigateOptions` - Navigation options
- `Location` - Location information

### State Management
- `Store<T>` - Store interface
- `Action` - Action structure
- `Reducer<T>` - Reducer function
- `Middleware` - Middleware function
- `Selector<T, R>` - Selector function
- `Dispatch` - Dispatch function

### Animation
- `AnimationConfig` - Animation configuration
- `AnimationKeyframe` - Animation keyframe
- `AnimationOptions` - Animation options
- `AnimationController` - Animation controller

### Drag and Drop
- `DragItem` - Draggable item
- `DropZone` - Drop zone
- `DragState` - Drag state
- `DragAndDropOptions` - Drag and drop options

### File Handling
- `FileInfo` - File information
- `FileUploadOptions` - File upload options
- `FileUploadResult` - File upload result
- `FileService` - File service interface
- `FileValidationOptions` - File validation options
- `FileValidationResult` - File validation result

### Notifications
- `NotificationOptions` - Notification options
- `NotificationService` - Notification service interface

### Permissions
- `Permission` - Permission definition
- `Role` - Role definition
- `PermissionService` - Permission service interface

### Audit
- `AuditLog` - Audit log entry
- `AuditService` - Audit service interface
- `AuditLogFilters` - Audit log filters

## Common Type Aliases

### Redux Types
- `RootState` - Complete Redux state
- `AppDispatch` - Redux dispatch function

### Utility Types
- `Nullable<T>` - T | null
- `Optional<T>` - T | undefined
- `RequiredFields<T, K>` - Required fields from T
- `OptionalFields<T, K>` - Optional fields from T
- `DeepPartial<T>` - Deep partial object
- `Mutable<T>` - Mutable version of T

### Event Handler Types
- `EventHandler<T>` - Generic event handler
- `ChangeEventHandler<T>` - Change event handler
- `ClickEventHandler<T>` - Click event handler
- `SubmitEventHandler<T>` - Submit event handler
- `KeyboardEventHandler<T>` - Keyboard event handler
- `FocusEventHandler<T>` - Focus event handler
- `BlurEventHandler<T>` - Blur event handler

### Async Types
- `AsyncFunction<T>` - Async function type
- `AsyncState<T>` - Async operation state

### Form Types
- `FormField<T>` - Form field state
- `FormData<T>` - Form data structure

### Table Types
- `SortDirection` - Sort direction
- `TableSort<T>` - Table sorting
- `TableFilter<T>` - Table filtering
- `TableState<T>` - Table state

### Modal Types
- `ModalType` - Modal type
- `ModalState<T>` - Modal state

### Toast Types
- `ToastType` - Toast type
- `ToastPosition` - Toast position
- `ToastState` - Toast state

### Permission Types
- `PermissionAction` - Permission actions
- `PermissionResource` - Permission resources
- `Permission` - Permission definition
- `UserRole` - User role types
- `Role` - Role definition

### Status Types
- `Status` - Entity status
- `Priority` - Priority levels

### Date and Time Types
- `DateRange` - Date range
- `TimeRange` - Time range
- `DayOfWeek` - Day of week

### Location Types
- `Coordinates` - Geographic coordinates
- `Address` - Address structure

### File Types
- `FileType` - File type categories
- `FileStatus` - File status
- `FileInfo` - File information

### Search Types
- `SearchOperator` - Search operators
- `SearchFilter` - Search filter
- `SearchQuery` - Search query

### API Response Types
- `ApiResponse<T>` - API response structure
- `PaginatedResponse<T>` - Paginated response

### Error Types
- `AppError` - Application error
- `ValidationError` - Validation error
- `ApiError` - API error

### Loading States
- `LoadingState` - Loading state
- `AsyncLoadingState<T>` - Async loading state

### Component Prop Types
- `BaseComponentProps` - Base component props
- `ClickableProps` - Clickable component props
- `FormComponentProps<T>` - Form component props

### Theme Types
- `Theme` - Theme options
- `ColorScheme` - Color schemes
- `Size` - Size options
- `Variant` - Component variants

### Animation Types
- `AnimationType` - Animation types
- `AnimationDirection` - Animation directions
- `AnimationEasing` - Animation easing

### Responsive Types
- `Breakpoint` - Breakpoint sizes
- `ResponsiveValue<T>` - Responsive values

### Grid Types
- `GridCols` - Grid columns
- `GridGap` - Grid gaps

## Usage Examples

### Basic Component with Props
```typescript
import { ButtonProps } from '../types';

const MyButton: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'default',
  size = 'md',
  disabled = false 
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} btn-${size}`}
    >
      {children}
    </button>
  );
};
```

### Page with State Management
```typescript
import { PlayerDashboardProps, PlayerDashboardState } from '../types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';

const PlayerDashboard: React.FC<PlayerDashboardProps> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [state, setState] = useState<PlayerDashboardState>({
    playerStats: {
      tournamentsPlayed: 0,
      tournamentsWon: 0,
      currentRanking: 0,
      rankingChange: '',
      totalPoints: 0,
      matchesPlayed: 0,
      winRate: 0,
      nextTournament: '',
      nextTournamentDate: '',
      upcomingMatches: 0,
      recentAchievements: []
    },
    recentActivity: [],
    upcomingEvents: [],
    quickActions: []
  });

  // Component logic...
};
```

### Custom Hook with Types
```typescript
import { UseApiReturn, UseApiOptions } from '../types';

const useApi = <T>(options: UseApiOptions<T>): UseApiReturn<T> => {
  const [state, setState] = useState({
    data: null as T | null,
    loading: false,
    error: null as string | null
  });

  const execute = useCallback(async (...args: any[]) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // API call logic
      const result = await apiCall(...args);
      setState(prev => ({ ...prev, data: result, loading: false }));
      options.onSuccess?.(result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
      options.onError?.(errorMessage);
    } finally {
      options.onFinally?.();
    }
  }, [options]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset
  };
};
```

### Form with Validation
```typescript
import { FormField, ValidationSchema } from '../types';

const validationSchema: ValidationSchema = {
  email: {
    required: true,
    email: true
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
  }
};

const LoginForm = () => {
  const [formData, setFormData] = useState<FormField<string>>({
    email: { value: '', error: '', touched: false, required: true },
    password: { value: '', error: '', touched: false, required: true }
  });

  const validateField = (field: string, value: string) => {
    const rules = validationSchema[field];
    if (!rules) return '';

    if (rules.required && !value) return 'This field is required';
    if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
    if (rules.minLength && value.length < rules.minLength) return `Minimum length is ${rules.minLength}`;
    if (rules.pattern && !rules.pattern.test(value)) return 'Invalid format';

    return '';
  };

  // Form logic...
};
```

### Table with Sorting and Filtering
```typescript
import { TableState, TableSort, TableFilter } from '../types';

const UserTable = () => {
  const [tableState, setTableState] = useState<TableState<User>>({
    data: [],
    loading: false,
    error: null,
    pagination: { page: 1, limit: 10, total: 0, pages: 0 },
    filters: [],
    sort: null,
    selectedIds: []
  });

  const handleSort = (key: keyof User, direction: 'asc' | 'desc') => {
    setTableState(prev => ({
      ...prev,
      sort: { key, direction }
    }));
  };

  const handleFilter = (filter: TableFilter<User>) => {
    setTableState(prev => ({
      ...prev,
      filters: [...prev.filters.filter(f => f.key !== filter.key), filter]
    }));
  };

  // Table logic...
};
```

## Best Practices

### 1. Type Safety
- Always use the provided interfaces instead of `any`
- Leverage TypeScript's type checking for better development experience
- Use generic types when creating reusable components

### 2. Interface Composition
- Compose complex interfaces from simpler ones
- Use utility types like `Partial<T>`, `Pick<T, K>`, `Omit<T, K>`
- Extend base interfaces for specific use cases

### 3. State Management
- Use the provided Redux state types
- Leverage TypeScript for action creators and reducers
- Use selector functions with proper typing

### 4. Component Props
- Always define prop interfaces
- Use default values for optional props
- Leverage union types for variant props

### 5. API Integration
- Use the provided request/response types
- Handle loading and error states properly
- Use proper error handling with typed errors

### 6. Form Handling
- Use the provided form interfaces
- Implement proper validation with typed schemas
- Handle form state changes with proper typing

## Migration Guide

### From JavaScript
1. Rename `.js` files to `.tsx` for React components
2. Add type annotations using the provided interfaces
3. Replace `any` types with specific interfaces
4. Add proper error handling with typed errors

### From Basic TypeScript
1. Replace basic types with the provided interfaces
2. Use the Redux state types for store integration
3. Implement proper form validation with typed schemas
4. Use the provided hook interfaces for custom hooks

### From Other Type Systems
1. Map existing types to the provided interfaces
2. Use the utility types for common patterns
3. Implement proper error handling with the error types
4. Use the component interfaces for UI consistency

## Contributing

When adding new interfaces:

1. **Follow the existing naming conventions**
2. **Add proper JSDoc comments**
3. **Use generic types when appropriate**
4. **Extend existing interfaces when possible**
5. **Add examples in the documentation**
6. **Update the index file exports**
7. **Add tests for complex interfaces**

## Support

For questions about the interfaces:

1. Check this documentation first
2. Look at existing usage examples in the codebase
3. Review the TypeScript compiler errors for guidance
4. Consult the team for complex type scenarios

## Version History

- **v1.0.0** - Initial interface definitions
- **v1.1.0** - Added comprehensive page interfaces
- **v1.2.0** - Added component and hook interfaces
- **v1.3.0** - Added utility and service interfaces
- **v1.4.0** - Added common type aliases and examples 