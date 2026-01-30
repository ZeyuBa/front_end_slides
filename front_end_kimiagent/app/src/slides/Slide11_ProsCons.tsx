import type { SlideProps } from '@/types';
import { Check, X } from 'lucide-react';

export function Slide11_ProsCons({ isActive }: SlideProps) {
  const frameworks = [
    { name: 'Gradio', pro: '极速响应', con: '样式死板', proColor: '#34C759', conColor: '#FF3B30' },
    { name: 'Streamlit', pro: '零心理负担', con: '整页刷新', proColor: '#34C759', conColor: '#FF9500' },
    { name: 'NiceGUI', pro: '实时性强', con: '需 CSS 功底', proColor: '#34C759', conColor: '#FF9500' },
    { name: 'Reflex', pro: 'Python 全栈', con: '编译慢', proColor: '#34C759', conColor: '#FF9500' },
    { name: 'React', pro: '审美上限', con: '依赖管理复杂', proColor: '#34C759', conColor: '#FF9500' },
    { name: 'Django', pro: '稳如老狗', con: '文件分散', proColor: '#34C759', conColor: '#FF3B30' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white px-12">
      <h2 
        className={`heading-large text-[#1D1D1F] mb-12 text-center transition-all duration-600 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        没有完美的框架
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-5xl w-full">
        {frameworks.map((fw, index) => (
          <div 
            key={index}
            className={`card-apple p-6 transition-all duration-500 ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${(index + 1) * 80}ms` }}
          >
            <h3 className="text-xl font-semibold text-[#1D1D1F] mb-5 text-center">{fw.name}</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${fw.proColor}20` }}
                >
                  <Check className="w-4 h-4" style={{ color: fw.proColor }} />
                </div>
                <span className="text-sm text-[#1D1D1F]">{fw.pro}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${fw.conColor}20` }}
                >
                  <X className="w-4 h-4" style={{ color: fw.conColor }} />
                </div>
                <span className="text-sm text-[#86868B]">{fw.con}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
