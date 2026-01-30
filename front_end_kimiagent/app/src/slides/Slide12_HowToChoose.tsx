import type { SlideProps } from '@/types';
import { FlaskConical, BarChart3, Zap, Globe, Palette, Building2 } from 'lucide-react';

export function Slide12_HowToChoose({ isActive }: SlideProps) {
  const scenarios = [
    { icon: FlaskConical, text: '三分钟测 Prompt', framework: 'Gradio', color: '#ff6b35' },
    { icon: BarChart3, text: '展示算法结果', framework: 'Streamlit', color: '#ff4b4b' },
    { icon: Zap, text: '实时刷新监控', framework: 'NiceGUI', color: '#1976d2' },
    { icon: Globe, text: 'Python 写网站', framework: 'Reflex', color: '#5856D6' },
    { icon: Palette, text: '极致美观产品', framework: 'React', color: '#0071E3' },
    { icon: Building2, text: '百万级用户', framework: 'Django', color: '#34C759' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white px-12">
      <h2 
        className={`heading-large text-[#1D1D1F] mb-4 text-center transition-all duration-600 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        场景决定选择
      </h2>

      <p 
        className={`body-large text-[#86868B] mb-12 text-center transition-all duration-600 delay-100 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        如何选择？
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {scenarios.map((scenario, index) => (
          <div 
            key={index}
            className={`card-apple p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-500 cursor-pointer group ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${(index + 1) * 80}ms` }}
          >
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${scenario.color}15` }}
            >
              <scenario.icon className="w-7 h-7" style={{ color: scenario.color }} />
            </div>
            <p className="text-sm text-[#86868B] mb-2">"{scenario.text}"</p>
            <p 
              className="text-lg font-semibold"
              style={{ color: scenario.color }}
            >
              → {scenario.framework}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
