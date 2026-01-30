import type { SlideProps } from '@/types';
import { Star } from 'lucide-react';

export function Slide05_DeveloperData({ isActive }: SlideProps) {
  const frameworks = [
    { name: 'React (+Next.js)', stars: '230k+', usage: '45%', vibe: 5 },
    { name: 'Streamlit', stars: '42k+', usage: '24%', vibe: 5, note: 'AI 项目' },
    { name: 'Gradio', stars: '35k+', usage: '70%', vibe: 5, note: '研究界' },
    { name: 'FastAPI', stars: '88k+', usage: '16%', vibe: 4 },
    { name: 'Django', stars: '85k+', usage: '30%', vibe: 2, note: 'Python' },
    { name: 'Reflex', stars: '25k+', usage: '快速上升', vibe: 3 },
    { name: 'NiceGUI', stars: '20k+', usage: '利基市场', vibe: 4 },
  ];

  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < count ? 'text-[#0071E3] fill-[#0071E3]' : 'text-[#D1D1D6]'}`} 
      />
    ));
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white px-12">
      <h2 
        className={`heading-large text-[#1D1D1F] mb-4 text-center transition-all duration-600 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        数据不说谎
      </h2>

      <p 
        className={`body-large text-[#86868B] mb-12 text-center transition-all duration-600 delay-100 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        开发者使用数据
      </p>

      <div 
        className={`w-full max-w-5xl overflow-hidden rounded-2xl border border-[#E5E5EA] transition-all duration-600 delay-200 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <table className="w-full">
          <thead>
            <tr className="bg-[#F5F5F7]">
              <th className="text-left py-4 px-6 text-sm font-semibold text-[#86868B]">框架</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-[#86868B]">GitHub Stars</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-[#86868B]">开发者使用率</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-[#86868B]">Vibe 契合度</th>
            </tr>
          </thead>
          <tbody>
            {frameworks.map((fw, index) => (
              <tr 
                key={index} 
                className="border-t border-[#E5E5EA] hover:bg-[#F5F5F7]/50 transition-colors"
              >
                <td className="py-4 px-6 font-medium text-[#1D1D1F]">{fw.name}</td>
                <td className="py-4 px-6 text-[#1D1D1F]">{fw.stars}</td>
                <td className="py-4 px-6 text-[#1D1D1F]">
                  {fw.usage}
                  {fw.note && (
                    <span className="text-[#86868B] text-sm ml-1">({fw.note})</span>
                  )}
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-1">
                    {renderStars(fw.vibe)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
