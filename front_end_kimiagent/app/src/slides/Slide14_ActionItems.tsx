import type { SlideProps } from '@/types';
import { Search, Bot, Rocket } from 'lucide-react';

export function Slide14_ActionItems({ isActive }: SlideProps) {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: '评估需求',
      desc: '原型还是产品？熟悉 Python 还是 JS？',
      color: '#0071E3',
    },
    {
      number: '02',
      icon: Bot,
      title: '选择 AI 伙伴',
      desc: '单文件框架 → 任何 LLM\nReact 生态 → Claude Code 最佳',
      color: '#5856D6',
    },
    {
      number: '03',
      icon: Rocket,
      title: '30 分钟小 Demo',
      desc: '用选定框架做一个快速原型',
      color: '#34C759',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white px-12">
      <h2 
        className={`heading-large text-[#1D1D1F] mb-16 text-center transition-all duration-600 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        你的下一步
      </h2>

      <div className="flex flex-col gap-8 max-w-4xl w-full">
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`flex items-center gap-8 transition-all duration-600 ${
              isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
            style={{ transitionDelay: `${(index + 1) * 150}ms` }}
          >
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${step.color}15` }}
            >
              <step.icon className="w-10 h-10" style={{ color: step.color }} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-baseline gap-4 mb-2">
                <span 
                  className="text-4xl font-bold"
                  style={{ color: `${step.color}40` }}
                >
                  {step.number}
                </span>
                <h3 className="text-2xl font-semibold text-[#1D1D1F]">{step.title}</h3>
              </div>
              <p className="body-small text-[#86868B] whitespace-pre-line">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div 
        className={`mt-16 transition-all duration-600 delay-500 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <button className="px-10 py-4 bg-[#0071E3] text-white text-lg font-semibold rounded-full hover:bg-[#005bb5] transition-colors shadow-lg shadow-[#0071E3]/30">
          现在就开始
        </button>
      </div>
    </div>
  );
}
