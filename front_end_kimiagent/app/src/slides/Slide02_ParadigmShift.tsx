import type { SlideProps } from '@/types';
import { Keyboard, MessageCircle } from 'lucide-react';

export function Slide02_ParadigmShift({ isActive }: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white px-12">
      <h2 
        className={`heading-large text-[#1D1D1F] mb-16 text-center transition-all duration-600 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        从"写代码"到"描述意图"
      </h2>

      <div className="flex flex-col md:flex-row gap-8 md:gap-16 max-w-5xl w-full">
        {/* Past */}
        <div 
          className={`flex-1 card-apple p-10 flex flex-col items-center transition-all duration-600 delay-100 ${
            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center mb-6">
            <Keyboard className="w-8 h-8 text-[#86868B]" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">❌</span>
            <span className="text-lg font-semibold text-[#86868B]">过去</span>
          </div>
          <p className="body-small text-[#1D1D1F] text-center">
            开发者逐行手写代码
          </p>
        </div>

        {/* Arrow */}
        <div 
          className={`hidden md:flex items-center justify-center transition-all duration-600 delay-200 ${
            isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path 
              d="M10 24H38M38 24L30 16M38 24L30 32" 
              stroke="#0071E3" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Present */}
        <div 
          className={`flex-1 card-apple p-10 flex flex-col items-center border-2 border-[#0071E3] transition-all duration-600 delay-300 ${
            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-[#0071E3]/10 flex items-center justify-center mb-6">
            <MessageCircle className="w-8 h-8 text-[#0071E3]" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">✅</span>
            <span className="text-lg font-semibold text-[#0071E3]">现在</span>
          </div>
          <p className="body-small text-[#1D1D1F] text-center">
            开发者描述意图，AI 生成代码
          </p>
        </div>
      </div>

      <div 
        className={`mt-16 transition-all duration-600 delay-500 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="text-xl font-medium text-[#0071E3]">
          "2026 年，这叫 Vibe Coding"
        </p>
      </div>
    </div>
  );
}
