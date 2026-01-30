import type { SlideProps } from '@/types';

export function Slide06_ReactNative({ isActive }: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white px-12">
      <h2 
        className={`heading-large text-[#1D1D1F] mb-16 text-center transition-all duration-600 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        训练频次决定能力
      </h2>

      <div className="flex flex-col lg:flex-row gap-12 max-w-5xl w-full items-center">
        {/* Quote Block */}
        <div 
          className={`flex-1 transition-all duration-600 delay-100 ${
            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <div className="relative">
            <span className="absolute -top-8 -left-4 text-[120px] text-[#0071E3]/10 font-serif leading-none">
              "
            </span>
            <blockquote className="text-2xl md:text-3xl font-medium text-[#1D1D1F] leading-relaxed pl-8">
              给我加个苹果风格的<br />
              磨砂玻璃效果
            </blockquote>
          </div>
        </div>

        {/* Code Comparison */}
        <div 
          className={`flex-1 space-y-4 transition-all duration-600 delay-300 ${
            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        >
          {/* React */}
          <div className="code-block-dark">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#0071E3] font-semibold">React</span>
              <span className="text-[#34C759]">✓</span>
            </div>
            <code className="text-[#9CDCFE]">
              className="<span className="text-[#CE9178]">backdrop-blur-md bg-white/30</span>"
            </code>
          </div>

          {/* Django */}
          <div className="code-block">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#1D1D1F] font-semibold">Django</span>
              <span className="text-[#FF3B30]">✗</span>
            </div>
            <code className="text-[#86868B]">
              CSS 引用折腾半天...
            </code>
          </div>
        </div>
      </div>

      <div 
        className={`mt-16 text-center transition-all duration-600 delay-500 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="body-large text-[#86868B]">
          React + Tailwind 在训练语料中密度最高
        </p>
      </div>
    </div>
  );
}
