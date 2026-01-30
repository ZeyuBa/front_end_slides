import type { SlideProps } from '@/types';

export function Slide01_Cover({ isActive }: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white px-8">
      <div 
        className={`text-center transition-all duration-700 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h1 className="heading-hero text-[#1D1D1F] mb-6">
          Vibe Coding 下的<br />
          Web 框架选型指南
        </h1>
        <p className="body-large text-[#86868B] mt-8">
          当 AI 成为你的 Pair Programmer
        </p>
      </div>
      
      <div 
        className={`absolute bottom-12 left-0 right-0 text-center transition-all duration-700 delay-300 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="caption text-[#86868B]">
          2026 · 前端开发新范式
        </p>
      </div>
    </div>
  );
}
