import { useEffect, useCallback } from 'react';

interface UseKeyboardNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
}

export function useKeyboardNavigation({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onGoTo,
}: UseKeyboardNavigationProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement ||
          event.target instanceof HTMLSelectElement) {
        return;
      }

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          event.preventDefault();
          if (currentSlide < totalSlides - 1) {
            onNext();
          }
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault();
          if (currentSlide > 0) {
            onPrev();
          }
          break;
        case 'Home':
          event.preventDefault();
          onGoTo(0);
          break;
        case 'End':
          event.preventDefault();
          onGoTo(totalSlides - 1);
          break;
        default:
          // Number keys 1-9 for direct navigation
          const num = parseInt(event.key);
          if (!isNaN(num) && num >= 1 && num <= Math.min(9, totalSlides)) {
            event.preventDefault();
            onGoTo(num - 1);
          }
          break;
      }
    },
    [currentSlide, totalSlides, onNext, onPrev, onGoTo]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
