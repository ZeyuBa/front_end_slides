import type { SlideProps } from '@/types';
import { Trophy, Palette, Building2 } from 'lucide-react';

export function Slide15_Summary({ isActive }: SlideProps) {
  const points = [
    { icon: Trophy, text: 'Gradio/Streamlit：AI 的最佳拍档', color: '#ff6b35' },
    { icon: Palette, text: 'React：AI 的母语', color: '#0071E3' },
    { icon: Building2, text: 'Django：稳健首选', color: '#34C759' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#1D1D1F] px-12">
      <h2 
        className={`heading-hero text-white mb-16 text-center transition-all duration-600 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        谢谢
      </h2>

      <div className="flex flex-col gap-6 max-w-2xl w-full mb-16">
        {points.map((point, index) => (
          <div 
            key={index}
            className={`flex items-center gap-5 transition-all duration-600 ${
              isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: `${(index + 1) * 150}ms` }}
          >
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${point.color}20` }}
            >
              <point.icon className="w-6 h-6" style={{ color: point.color }} />
            </div>
            <span className="text-xl text-white/90">{point.text}</span>
          </div>
        ))}
      </div>

      <div 
        className={`transition-all duration-600 delay-500 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="text-2xl text-white/50 font-light">Q&A</p>
      </div>
    </div>
  );
}
