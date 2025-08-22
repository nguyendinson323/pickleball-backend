import { toast } from 'sonner';

export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
  details?: unknown;
}

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  details?: unknown;

  constructor(message: string, statusCode = 500, isOperational = true, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Handle API errors and display appropriate messages to users
 */
export const handleApiError = (error: unknown): ApiError => {
  console.error('API Error:', error);

  // Axios error
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as any;
    const response = axiosError.response;
    
    if (response?.data) {
      const { message, error: errorMsg, statusCode } = response.data;
      
      // Handle specific status codes
      switch (response.status) {
        case 400:
          return {
            message: message || 'Invalid request. Please check your input.',
            statusCode: 400,
            error: errorMsg
          };
        
        case 401:
          return {
            message: 'Your session has expired. Please login again.',
            statusCode: 401,
            error: errorMsg
          };
        
        case 403:
          return {
            message: 'You do not have permission to perform this action.',
            statusCode: 403,
            error: errorMsg
          };
        
        case 404:
          return {
            message: message || 'The requested resource was not found.',
            statusCode: 404,
            error: errorMsg
          };
        
        case 422:
          return {
            message: message || 'Validation error. Please check your input.',
            statusCode: 422,
            error: errorMsg,
            details: response.data.details
          };
        
        case 429:
          return {
            message: 'Too many requests. Please try again later.',
            statusCode: 429,
            error: errorMsg
          };
        
        case 500:
          return {
            message: 'Server error. Please try again later.',
            statusCode: 500,
            error: process.env.NODE_ENV === 'development' ? errorMsg : undefined
          };
        
        default:
          return {
            message: message || 'An unexpected error occurred.',
            statusCode: response.status,
            error: errorMsg
          };
      }
    }
    
    // Network error
    if (axiosError.code === 'ERR_NETWORK') {
      return {
        message: 'Network error. Please check your internet connection.',
        statusCode: 0
      };
    }
    
    // Request timeout
    if (axiosError.code === 'ECONNABORTED') {
      return {
        message: 'Request timeout. Please try again.',
        statusCode: 408
      };
    }
  }
  
  // Generic error
  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500
    };
  }
  
  return {
    message: 'An unexpected error occurred.',
    statusCode: 500
  };
};

/**
 * Display error toast notification
 */
export const showErrorToast = (error: unknown, customMessage?: string) => {
  const apiError = handleApiError(error);
  
  toast.error(customMessage || apiError.message, {
    description: apiError.error,
    duration: 5000
  });
  
  return apiError;
};

/**
 * Log error for monitoring (can be extended to send to monitoring service)
 */
export const logError = (error: unknown, context?: string) => {
  const apiError = handleApiError(error);
  
  // In production, send to monitoring service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to Sentry, LogRocket, etc.
    console.error('Production Error:', {
      context,
      ...apiError,
      timestamp: new Date().toISOString()
    });
  } else {
    console.error(`Error in ${context || 'Unknown'}:`, apiError);
  }
  
  return apiError;
};

/**
 * Retry failed API call with exponential backoff
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 1000
): Promise<T> => {
  let lastError: unknown;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on client errors (4xx)
      const apiError = handleApiError(error);
      if (apiError.statusCode && apiError.statusCode >= 400 && apiError.statusCode < 500) {
        throw error;
      }
      
      // Wait before retrying
      if (i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
};

/**
 * Check if error is network related
 */
export const isNetworkError = (error: unknown): boolean => {
  if (error && typeof error === 'object' && 'code' in error) {
    const axiosError = error as any;
    return axiosError.code === 'ERR_NETWORK' || axiosError.code === 'ECONNABORTED';
  }
  return false;
};

/**
 * Check if error is authentication related
 */
export const isAuthError = (error: unknown): boolean => {
  const apiError = handleApiError(error);
  return apiError.statusCode === 401 || apiError.statusCode === 403;
};