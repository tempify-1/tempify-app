/**
 * View Transition Utility
 * 
 * Provides a safe wrapper for the View Transitions API with fallback
 * for browsers that don't support it.
 */

/**
 * Executes a callback within a view transition if supported, otherwise runs it directly
 * @param callback - The function to execute during the transition
 * @returns Promise that resolves when the transition completes
 */
export const withViewTransition = async (callback: () => void | Promise<void>): Promise<void> => {
  // Check if View Transitions API is supported
  if (typeof document !== 'undefined' && 'startViewTransition' in document) {
    const transition = (document as any).startViewTransition(async () => {
      await callback();
    });
    
    // Wait for the transition to complete
    try {
      await transition.finished;
    } catch (error) {
      // Transition was skipped or interrupted, which is fine
      console.debug('View transition interrupted:', error);
    }
  } else {
    // Fallback: just run the callback without transition
    await callback();
  }
};

