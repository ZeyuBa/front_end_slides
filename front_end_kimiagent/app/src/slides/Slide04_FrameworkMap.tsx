import type { SlideProps } from '@/types';

export function Slide04_FrameworkMap({ isActive }: SlideProps) {
  const frameworks = {
    pythonSingle: ['Gradio', 'Streamlit', 'NiceGUI'],
    pythonFull: ['Reflex', 'Django'],
    javascript: ['React + Next.js'],
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#1D1D1F] px-12">
      <h2 
        className={`heading-large text-white mb-20 text-center transition-all duration-600 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        框架全景
      </h2>

      <div className="max-w-4xl w-full space-y-10">
        {/* Python Single File */}
        <div 
          className={`flex items-center gap-8 transition-all duration-600 delay-100 ${
            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <div className="w-40 text-right">
            <span className="text-white/70 text-lg">Python 单文件</span>
          </div>
          <div className="h-px flex-1 bg-white/20" />
          <div className="flex gap-4">
            {frameworks.pythonSingle.map((fw, i) => (
              <span 
                key={i} 
                className="text-white text-xl font-medium flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
                {fw}
              </span>
            ))}
          </div>
        </div>

        {/* Python Full Stack */}
        <div 
          className={`flex items-center gap-8 transition-all duration-600 delay-200 ${
            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <div className="w-40 text-right">
            <span className="text-white/70 text-lg">Python 全栈</span>
          </div>
          <div className="h-px flex-1 bg-white/20" />
          <div className="flex gap-4">
            {frameworks.pythonFull.map((fw, i) => (
              <span 
                key={i} 
                className="text-white text-xl font-medium flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
                {fw}
              </span>
            ))}
          </div>
        </div>

        {/* JavaScript */}
        <div 
          className={`flex items-center gap-8 transition-all duration-600 delay-300 ${
            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <div className="w-40 text-right">
            <span className="text-white/70 text-lg">JavaScript</span>
          </div>
          <div className="h-px flex-1 bg-white/20" />
          <div className="flex gap-4">
            {frameworks.javascript.map((fw, i) => (
              <span 
                key={i} 
                className="text-white text-xl font-medium flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
                {fw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
