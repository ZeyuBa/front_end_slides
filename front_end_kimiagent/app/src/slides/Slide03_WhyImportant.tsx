import type { SlideProps } from '@/types';
import { FolderOpen, Brain, FileCheck } from 'lucide-react';

export function Slide03_WhyImportant({ isActive }: SlideProps) {
  const cards = [
    {
      icon: FolderOpen,
      title: '信息局部性',
      desc: 'AI 能否一次性掌握全局？',
      delay: 100,
    },
    {
      icon: Brain,
      title: 'LLM 训练频次',
      desc: 'AI 见过多少这个框架的代码？',
      delay: 200,
    },
    {
      icon: FileCheck,
      title: '协议驱动',
      desc: '框架是否有清晰的类型契约？',
      delay: 300,
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white px-12">
      <h2 
        className={`heading-large text-[#1D1D1F] mb-4 text-center transition-all duration-600 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        意图传递效率决定成败
      </h2>

      <p 
        className={`body-large text-[#86868B] mb-16 text-center transition-all duration-600 delay-100 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        为什么框架选型变得更重要？
      </p>

      <div className="flex flex-col md:flex-row gap-6 max-w-5xl w-full">
        {cards.map((card, index) => (
          <div 
            key={index}
            className={`flex-1 card-apple p-8 flex flex-col items-center text-center transition-all duration-600 ${
              isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: `${card.delay}ms` }}
          >
            <div className="w-14 h-14 rounded-full bg-[#F5F5F7] flex items-center justify-center mb-5">
              <card.icon className="w-7 h-7 text-[#0071E3]" />
            </div>
            <h3 className="text-xl font-semibold text-[#1D1D1F] mb-3">
              {card.title}
            </h3>
            <p className="body-small text-[#86868B]">
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      <div 
        className={`mt-16 transition-all duration-600 delay-500 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="text-xl font-semibold text-[#0071E3]">
          框架选错，AI 也救不了你
        </p>
      </div>
    </div>
  );
}
