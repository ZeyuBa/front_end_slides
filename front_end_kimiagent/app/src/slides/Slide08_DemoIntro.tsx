import type { SlideProps } from '@/types';
import { SlidersHorizontal, Calculator, TrendingUp, History } from 'lucide-react';

export function Slide08_DemoIntro({ isActive }: SlideProps) {
  const features = [
    { icon: SlidersHorizontal, text: '滑动条输入（GPU 数量、时长）' },
    { icon: Calculator, text: '实时计算成本和风险' },
    { icon: TrendingUp, text: '24 小时预测折线图' },
    { icon: History, text: '历史记录表格' },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white px-12">
      <h2 
        className={`heading-large text-[#1D1D1F] mb-6 text-center transition-all duration-600 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        同一个任务，不同的体验
      </h2>

      <div 
        className={`card-apple p-10 max-w-2xl w-full transition-all duration-600 delay-200 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#0071E3]/10 flex items-center justify-center">
            <Calculator className="w-6 h-6 text-[#0071E3]" />
          </div>
          <h3 className="text-2xl font-semibold text-[#1D1D1F]">
            AI 算力成本模拟器
          </h3>
        </div>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`flex items-center gap-4 transition-all duration-500 ${
                isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <feature.icon className="w-5 h-5 text-[#0071E3]" />
              <span className="body-small text-[#1D1D1F]">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div 
        className={`mt-12 transition-all duration-600 delay-700 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="body-large text-[#86868B] flex items-center gap-2">
          接下来，看看各框架如何实现
          <span className="text-[#0071E3]">→</span>
        </p>
      </div>
    </div>
  );
}
