import type { SlideProps } from '@/types';
import { Folder } from 'lucide-react';

export function Slide10_DemoSummary({ isActive }: SlideProps) {
  const comparisons = [
    {
      name: 'Streamlit',
      files: ['app.py'],
      lines: 20,
      color: '#ff4b4b',
    },
    {
      name: 'React',
      files: ['components/', 'page.tsx', 'hooks/', 'utils/'],
      lines: 120,
      color: '#0071E3',
    },
    {
      name: 'Django',
      files: ['models.py', 'views.py', 'urls.py', 'forms.py', 'templates/'],
      lines: 180,
      color: '#34C759',
    },
  ];

  const maxLines = Math.max(...comparisons.map(c => c.lines));

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white px-12">
      <h2 
        className={`heading-large text-[#1D1D1F] mb-12 text-center transition-all duration-600 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        代码量一目了然
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 max-w-5xl w-full">
        {/* File Structure */}
        <div 
          className={`flex-1 space-y-6 transition-all duration-600 delay-100 ${
            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          {comparisons.map((comp, index) => (
            <div 
              key={index}
              className="card-apple p-5"
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <Folder className="w-6 h-6 mt-1" style={{ color: comp.color }} />
                <div className="flex-1">
                  <p className="font-semibold text-[#1D1D1F] mb-2">{comp.name}</p>
                  <div className="text-sm text-[#86868B] space-y-1">
                    <p>📁 Project</p>
                    {comp.files.map((file, i) => (
                      <p key={i} className="ml-4">{i === comp.files.length - 1 ? '└── ' : '├── '}{file}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div 
          className={`flex-1 card-apple p-8 transition-all duration-600 delay-300 ${
            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        >
          <p className="text-lg font-semibold text-[#1D1D1F] mb-8">代码行数对比</p>
          
          <div className="space-y-6">
            {comparisons.map((comp, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-[#1D1D1F]">{comp.name}</span>
                  <span className="text-sm text-[#86868B]">{comp.lines} 行</span>
                </div>
                <div className="h-8 bg-[#F5F5F7] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: isActive ? `${(comp.lines / maxLines) * 100}%` : '0%',
                      backgroundColor: comp.color,
                      transitionDelay: `${500 + index * 200}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#E5E5EA]">
            <p className="text-sm text-[#86868B] text-center">
              单文件框架代码量减少 <span className="text-[#0071E3] font-semibold">80%+</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
