import type { SlideProps } from '@/types';
import { Home, Palette, Shield } from 'lucide-react';

export function Slide13_GoldenPaths({ isActive }: SlideProps) {
  const paths = [
    {
      icon: Home,
      title: '内部工具 / 算法展示',
      stack: 'Python (Streamlit/NiceGUI) + Gemini',
      reason: '长上下文优势',
      color: '#5856D6',
    },
    {
      icon: Palette,
      title: '外部产品 / 极致 UI',
      stack: 'React + Claude Code',
      reason: '审美优势',
      color: '#0071E3',
    },
    {
      icon: Shield,
      title: '复杂系统 / 安全第一',
      stack: 'Django + 人工审查',
      reason: '稳健性第一',
      color: '#34C759',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white px-12">
      <h2 
        className={`heading-large text-[#1D1D1F] mb-4 text-center transition-all duration-600 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        三条黄金路径
      </h2>

      <p 
        className={`body-large text-[#86868B] mb-12 text-center transition-all duration-600 delay-100 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        2026 选择公式
      </p>

      <div className="flex flex-col gap-6 max-w-4xl w-full">
        {paths.map((path, index) => (
          <div 
            key={index}
            className={`card-apple p-8 flex items-center gap-8 transition-all duration-600 ${
              isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: `${(index + 1) * 150}ms` }}
          >
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${path.color}15` }}
            >
              <path.icon className="w-8 h-8" style={{ color: path.color }} />
            </div>
            
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-[#1D1D1F] mb-2">{path.title}</h3>
              <p className="text-lg" style={{ color: path.color }}>{path.stack}</p>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-[#86868B]">理由</p>
              <p className="text-lg font-medium text-[#1D1D1F]">{path.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
