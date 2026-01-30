import type { SlideProps } from '@/types';
import { FileCode, FolderTree } from 'lucide-react';

export function Slide07_PythonPaths({ isActive }: SlideProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white px-12">
      <h2 
        className={`heading-large text-[#1D1D1F] mb-16 text-center transition-all duration-600 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        单文件 vs 全栈
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 max-w-5xl w-full">
        {/* Single File */}
        <div 
          className={`flex-1 card-apple p-10 transition-all duration-600 delay-100 ${
            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-[#0071E3]/10 flex items-center justify-center">
              <FileCode className="w-7 h-7 text-[#0071E3]" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#1D1D1F]">单文件主义</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-sm text-[#86868B]">框架</span>
              <p className="text-lg font-medium text-[#1D1D1F]">Streamlit / Gradio</p>
            </div>
            <div>
              <span className="text-sm text-[#86868B]">特点</span>
              <p className="text-lg font-medium text-[#1D1D1F]">100 行完成一切</p>
            </div>
            <div>
              <span className="text-sm text-[#86868B]">适合</span>
              <p className="text-lg font-medium text-[#1D1D1F]">原型 / Demo</p>
            </div>
          </div>
        </div>

        {/* Full Stack */}
        <div 
          className={`flex-1 card-apple p-10 transition-all duration-600 delay-300 ${
            isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-[#5856D6]/10 flex items-center justify-center">
              <FolderTree className="w-7 h-7 text-[#5856D6]" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-[#1D1D1F]">全栈 Python</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-sm text-[#86868B]">框架</span>
              <p className="text-lg font-medium text-[#1D1D1F]">Reflex / Django</p>
            </div>
            <div>
              <span className="text-sm text-[#86868B]">特点</span>
              <p className="text-lg font-medium text-[#1D1D1F]">多文件模块化</p>
            </div>
            <div>
              <span className="text-sm text-[#86868B]">适合</span>
              <p className="text-lg font-medium text-[#1D1D1F]">产品 / 生产</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
