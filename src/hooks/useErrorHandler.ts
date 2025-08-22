import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { showErrorToast, handleApiError, isAuthError } from '../utils/errorHandler';

/**
 * Custom hook for handling errors consistently across components
 */
export const useErrorHandler = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleError = useCallback((error: unknown, context?: string, customMessage?: string) => {
    const apiError = handleApiError(error);
    
    // Handle authentication errors
    if (isAuthError(error)) {
      // Clear auth state and redirect to login
      dispatch(logout());
      navigate('/login', { 
        state: { 
          message: 'Your session has expired. Please login again.',
          from: window.location.pathname 
        }
      });
      return apiError;
    }
    
    // Show error toast
    showErrorToast(error, customMessage);
    
    // Log error for monitoring
    console.error(`Error in ${context || 'Component'}:`, apiError);
    
    return apiError;
  }, [navigate, dispatch]);

  return { handleError };
};

/**
 * Hook for handling async operations with error handling
 */
export const useAsyncError = () => {
  const { handleError } = useErrorHandler();

  const wrapAsync = useCallback(<T extends any[], R>(
    asyncFn: (...args: T) => Promise<R>,
    context?: string,
    customErrorMessage?: string
  ) => {
    return async (...args: T): Promise<R | null> => {
      try {
        return await asyncFn(...args);
      } catch (error) {
        handleError(error, context, customErrorMessage);
        return null;
      }
    };
  }, [handleError]);

  return { wrapAsync };
};

/**
 * Hook for handling form submission errors
 */
export const useFormErrorHandler = () => {
  const { handleError } = useErrorHandler();

  const handleFormError = useCallback((error: unknown, fieldErrors?: Record<string, string>) => {
    const apiError = handleApiError(error);
    
    // Handle validation errors with field-specific messages
    if (apiError.statusCode === 422 && apiError.details && fieldErrors) {
      // Show specific field errors if provided
      Object.entries(fieldErrors).forEach(([field, message]) => {
        showErrorToast(new Error(message), `${field}: ${message}`);
      });
    } else {
      // Show general error
      handleError(error, 'Form Submission');
    }
    
    return apiError;
  }, [handleError]);

  return { handleFormError };
};