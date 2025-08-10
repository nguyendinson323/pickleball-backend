import { useEffect, useRef, useCallback } from 'react';
import { AnimationController, addAnimationClass } from '../lib/animations';

/**
 * 🎭 React Hook for Easy Animation Integration
 * Provides animation functionality to React components
 */
export function useAnimation() {
  const elementRef = useRef<HTMLDivElement>(null);
  const animationControllerRef = useRef<AnimationController | null>(null);

  // Initialize animation controller
  useEffect(() => {
    if (!animationControllerRef.current) {
      // Import dynamically to avoid SSR issues
      import('../lib/animations').then(({ initAnimations }) => {
        animationControllerRef.current = initAnimations();
      });
    }

    return () => {
      if (animationControllerRef.current) {
        animationControllerRef.current.destroy();
        animationControllerRef.current = null;
      }
    };
  }, []);

  // Function to add animation class to an element
  const animateElement = useCallback((element: HTMLElement | HTMLDivElement, additionalClass?: string) => {
    addAnimationClass(element, additionalClass);
  }, []);

  // Function to manually trigger animation
  const triggerAnimation = useCallback(() => {
    if (elementRef.current && animationControllerRef.current) {
      animationControllerRef.current.animateElementNow(elementRef.current);
    }
  }, []);

  // Function to reset animations
  const resetAnimations = useCallback(() => {
    if (animationControllerRef.current) {
      animationControllerRef.current.reset();
    }
  }, []);

  // Function to add animation class to ref element
  const addAnimationToRef = useCallback((additionalClass?: string) => {
    if (elementRef.current) {
      animateElement(elementRef.current, additionalClass);
    }
  }, [animateElement]);

  return {
    elementRef,
    animateElement,
    triggerAnimation,
    resetAnimations,
    addAnimationToRef,
    animationController: animationControllerRef.current
  };
}

/**
 * 🎯 Higher-Order Component for Easy Animation Wrapping
 */
export function withAnimation<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  additionalClass?: string
) {
  return function AnimatedComponent(props: P) {
    const { elementRef, addAnimationToRef } = useAnimation();

    useEffect(() => {
      addAnimationToRef(additionalClass);
    }, [addAnimationToRef]);

    return (
      <div ref={elementRef} className="animate-on-scroll">
        <WrappedComponent {...props} />
      </div>
    );
  };
}

/**
 * 🚀 Quick animation class adder
 */
export function useAnimationClass(additionalClass?: string) {
  const { elementRef, addAnimationToRef } = useAnimation();

  useEffect(() => {
    addAnimationToRef(additionalClass);
  }, [addAnimationToRef]);

  return elementRef;
} 