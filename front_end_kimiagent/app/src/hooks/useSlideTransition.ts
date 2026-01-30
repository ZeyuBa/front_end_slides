import { useState, useCallback } from 'react';

export function useSlideTransition(totalSlides: number) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const goToNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setDirection('next');
      setCurrentSlide(prev => prev + 1);
    }
  }, [currentSlide, totalSlides]);

  const goToPrev = useCallback(() => {
    if (currentSlide > 0) {
      setDirection('prev');
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setDirection(index > currentSlide ? 'next' : 'prev');
      setCurrentSlide(index);
    }
  }, [currentSlide, totalSlides]);

  return {
    currentSlide,
    direction,
    goToNext,
    goToPrev,
    goToSlide,
    progress: ((currentSlide + 1) / totalSlides) * 100,
  };
}
