import { useSlideTransition } from '@/hooks/useSlideTransition';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import {
  Slide01_Cover,
  Slide02_ParadigmShift,
  Slide03_WhyImportant,
  Slide04_FrameworkMap,
  Slide05_DeveloperData,
  Slide06_ReactNative,
  Slide07_PythonPaths,
  Slide08_DemoIntro,
  Slide09_InteractiveDemo,
  Slide10_DemoSummary,
  Slide11_ProsCons,
  Slide12_HowToChoose,
  Slide13_GoldenPaths,
  Slide14_ActionItems,
  Slide15_Summary,
} from '@/slides';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  Slide01_Cover,
  Slide02_ParadigmShift,
  Slide03_WhyImportant,
  Slide04_FrameworkMap,
  Slide05_DeveloperData,
  Slide06_ReactNative,
  Slide07_PythonPaths,
  Slide08_DemoIntro,
  Slide09_InteractiveDemo,
  Slide10_DemoSummary,
  Slide11_ProsCons,
  Slide12_HowToChoose,
  Slide13_GoldenPaths,
  Slide14_ActionItems,
  Slide15_Summary,
];

function App() {
  const { currentSlide, direction, goToNext, goToPrev, goToSlide, progress } = useSlideTransition(slides.length);

  useKeyboardNavigation({
    currentSlide,
    totalSlides: slides.length,
    onNext: goToNext,
    onPrev: goToPrev,
    onGoTo: goToSlide,
  });

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <div className="w-screen h-screen bg-white overflow-hidden flex flex-col">
      {/* Slide Container */}
      <div className="flex-1 relative">
        <div 
          key={currentSlide}
          className={`absolute inset-0 transition-all duration-400 ${
            direction === 'next' 
              ? 'animate-slide-enter' 
              : 'animate-slide-enter-reverse'
          }`}
        >
          <CurrentSlideComponent isActive={true} direction={direction} />
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="h-14 bg-white border-t border-[#E5E5EA] flex items-center justify-between px-6">
        {/* Left: Page Number */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#1D1D1F]">
            {currentSlide + 1}
          </span>
          <span className="text-sm text-[#86868B]">/ {slides.length}</span>
        </div>

        {/* Center: Progress Bar */}
        <div className="flex-1 mx-8 max-w-md">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Right: Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrev}
            disabled={currentSlide === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F5F5F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#1D1D1F]" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentSlide === slides.length - 1}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F5F5F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-[#1D1D1F]" />
          </button>
        </div>
      </div>

      {/* Keyboard Hint */}
      <div className="absolute bottom-16 right-6 text-xs text-[#86868B] opacity-50">
        ← → 切换幻灯片 | 1-9 跳转
      </div>
    </div>
  );
}

export default App;
