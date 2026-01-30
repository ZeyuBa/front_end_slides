import { useState } from 'react';
import type { SlideProps, FrameworkType } from '@/types';
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

export function Slide09_InteractiveDemo({ isActive }: SlideProps) {
  const [activeTab, setActiveTab] = useState<FrameworkType>('gradio');
  const [gpuCount, setGpuCount] = useState(4);
  const [duration, setDuration] = useState(8);
  const [model, setModel] = useState('gpt4');
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const tabs: { id: FrameworkType; label: string; color: string }[] = [
    { id: 'gradio', label: 'Gradio', color: '#ff6b35' },
    { id: 'streamlit', label: 'Streamlit', color: '#ff4b4b' },
    { id: 'react', label: 'React', color: '#0071E3' },
    { id: 'nicegui', label: 'NiceGUI', color: '#1976d2' },
    { id: 'django', label: 'Django', color: '#34C759' },
  ];

  const handleCalculate = () => {
    setIsCalculating(true);
    setShowResult(false);
    setTimeout(() => {
      setIsCalculating(false);
      setShowResult(true);
    }, 1200);
  };

  const getPricePerHour = () => {
    const prices: Record<string, number> = { gpt4: 2.5, claude: 2.0, gemini: 1.5 };
    return prices[model] || 2.5;
  };

  const totalPrice = gpuCount * duration * getPricePerHour();
  const avgPrice = totalPrice / duration;
  const riskLevel = totalPrice > 50 ? '高' : totalPrice > 20 ? '中' : '低';
  const riskColor = riskLevel === '高' ? '#FF3B30' : riskLevel === '中' ? '#FF9500' : '#34C759';

  const chartData = Array.from({ length: 24 }, (_, i) => ({
    hour: i + 1,
    cost: gpuCount * (i + 1) * getPricePerHour() * 0.3,
  }));
  const maxCost = Math.max(...chartData.map(d => d.cost));

  const renderGradioDemo = () => (
    <div className="bg-[#fff8f5] rounded-xl p-6 border border-[#ff6b35]/20">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#1D1D1F] mb-2">GPU 数量</label>
          <input
            type="range"
            min="1"
            max="8"
            value={gpuCount}
            onChange={(e) => setGpuCount(Number(e.target.value))}
            className="w-full accent-[#ff6b35]"
          />
          <span className="text-sm text-[#86868B] mt-1">{gpuCount}</span>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1D1D1F] mb-2">使用时长（小时）</label>
          <input
            type="range"
            min="1"
            max="24"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-[#ff6b35]"
          />
          <span className="text-sm text-[#86868B] mt-1">{duration}</span>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1D1D1F] mb-2">模型选择</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full p-3 rounded-lg border border-[#E5E5EA] bg-white text-sm"
          >
            <option value="gpt4">GPT-4</option>
            <option value="claude">Claude 3.5</option>
            <option value="gemini">Gemini 1.5</option>
          </select>
        </div>
        <button
          onClick={handleCalculate}
          disabled={isCalculating}
          className="w-full py-3 px-4 bg-[#ff6b35] text-white rounded-lg font-medium hover:bg-[#e55a2b] transition-colors disabled:opacity-70"
        >
          {isCalculating ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : '计算'}
        </button>
        {showResult && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-white p-3 rounded-lg text-center border border-[#E5E5EA]">
              <p className="text-xs text-[#86868B]">总价</p>
              <p className="text-lg font-bold text-[#1D1D1F]">${totalPrice.toFixed(2)}</p>
            </div>
            <div className="bg-white p-3 rounded-lg text-center border border-[#E5E5EA]">
              <p className="text-xs text-[#86868B]">平均单价</p>
              <p className="text-lg font-bold text-[#1D1D1F]">${avgPrice.toFixed(2)}/h</p>
            </div>
            <div className="bg-white p-3 rounded-lg text-center border border-[#E5E5EA]">
              <p className="text-xs text-[#86868B]">风险等级</p>
              <p className="text-lg font-bold" style={{ color: riskColor }}>{riskLevel}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStreamlitDemo = () => (
    <div className="bg-white rounded-xl p-6 border border-[#E5E5EA]">
      <div className="space-y-5">
        <div className="bg-[#f0f2f6] p-4 rounded-lg">
          <label className="block text-sm font-medium text-[#1D1D1F] mb-2">GPU 数量</label>
          <input type="range" min="1" max="8" value={gpuCount} onChange={(e) => setGpuCount(Number(e.target.value))} className="w-full accent-[#ff4b4b]" />
          <div className="flex justify-between text-xs text-[#86868B] mt-1"><span>1</span><span className="font-medium text-[#ff4b4b]">{gpuCount}</span><span>8</span></div>
        </div>
        <div className="bg-[#f0f2f6] p-4 rounded-lg">
          <label className="block text-sm font-medium text-[#1D1D1F] mb-2">使用时长（小时）</label>
          <input type="range" min="1" max="24" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full accent-[#ff4b4b]" />
          <div className="flex justify-between text-xs text-[#86868B] mt-1"><span>1</span><span className="font-medium text-[#ff4b4b]">{duration}</span><span>24</span></div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1D1D1F] mb-2">模型选择</label>
          <select value={model} onChange={(e) => setModel(e.target.value)} className="w-full p-3 rounded-lg border border-[#E5E5EA] bg-white text-sm">
            <option value="gpt4">GPT-4</option>
            <option value="claude">Claude 3.5</option>
            <option value="gemini">Gemini 1.5</option>
          </select>
        </div>
        <button onClick={handleCalculate} disabled={isCalculating} className="w-full py-3 px-4 bg-[#ff4b4b] text-white rounded-lg font-medium hover:bg-[#e04343] transition-colors disabled:opacity-70">
          {isCalculating ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : '计算成本'}
        </button>
        {showResult && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#f0f2f6] p-3 rounded-lg text-center"><p className="text-xs text-[#86868B]">总价</p><p className="text-lg font-bold text-[#1D1D1F]">${totalPrice.toFixed(2)}</p></div>
            <div className="bg-[#f0f2f6] p-3 rounded-lg text-center"><p className="text-xs text-[#86868B]">平均单价</p><p className="text-lg font-bold text-[#1D1D1F]">${avgPrice.toFixed(2)}/h</p></div>
            <div className="bg-[#f0f2f6] p-3 rounded-lg text-center"><p className="text-xs text-[#86868B]">风险等级</p><p className="text-lg font-bold" style={{ color: riskColor }}>{riskLevel}</p></div>
          </div>
        )}
      </div>
    </div>
  );

  const renderReactDemo = () => (
    <div className="bg-[#0a0a0a] rounded-xl p-6">
      <div className="space-y-5">
        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
          <label className="block text-sm font-medium text-white/80 mb-3">GPU 数量</label>
          <input type="range" min="1" max="8" value={gpuCount} onChange={(e) => setGpuCount(Number(e.target.value))} className="w-full accent-[#0071E3]" />
          <div className="flex justify-between items-center mt-2"><span className="text-xs text-white/50">1</span><span className="px-3 py-1 bg-[#0071E3]/20 text-[#0071E3] rounded-full text-sm font-medium">{gpuCount}</span><span className="text-xs text-white/50">8</span></div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10">
          <label className="block text-sm font-medium text-white/80 mb-3">使用时长（小时）</label>
          <input type="range" min="1" max="24" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full accent-[#0071E3]" />
          <div className="flex justify-between items-center mt-2"><span className="text-xs text-white/50">1</span><span className="px-3 py-1 bg-[#0071E3]/20 text-[#0071E3] rounded-full text-sm font-medium">{duration}h</span><span className="text-xs text-white/50">24</span></div>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">模型选择</label>
          <select value={model} onChange={(e) => setModel(e.target.value)} className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:border-[#0071E3] focus:outline-none">
            <option value="gpt4" className="bg-[#1a1a1a]">GPT-4</option>
            <option value="claude" className="bg-[#1a1a1a]">Claude 3.5</option>
            <option value="gemini" className="bg-[#1a1a1a]">Gemini 1.5</option>
          </select>
        </div>
        <button onClick={handleCalculate} disabled={isCalculating} className="w-full py-3 px-4 bg-gradient-to-r from-[#0071E3] to-[#5856D6] text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
          {isCalculating ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : '开始计算'}
        </button>
        {showResult && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/5 p-4 rounded-lg text-center border border-white/10"><p className="text-xs text-white/50 mb-1">总价</p><p className="text-xl font-bold text-white">${totalPrice.toFixed(2)}</p></div>
            <div className="bg-white/5 p-4 rounded-lg text-center border border-white/10"><p className="text-xs text-white/50 mb-1">平均单价</p><p className="text-xl font-bold text-white">${avgPrice.toFixed(2)}/h</p></div>
            <div className="bg-white/5 p-4 rounded-lg text-center border border-white/10"><p className="text-xs text-white/50 mb-1">风险等级</p><p className="text-xl font-bold" style={{ color: riskColor }}>{riskLevel}</p></div>
          </div>
        )}
      </div>
    </div>
  );

  const renderNiceGUIDemo = () => (
    <div className="bg-white rounded-xl p-6 border border-[#E5E5EA] shadow-md">
      <div className="space-y-5">
        <div className="bg-[#e3f2fd] p-4 rounded-lg">
          <label className="block text-sm font-medium text-[#1D1D1F] mb-2">GPU 数量: {gpuCount}</label>
          <input type="range" min="1" max="8" value={gpuCount} onChange={(e) => setGpuCount(Number(e.target.value))} className="w-full accent-[#1976d2]" />
        </div>
        <div className="bg-[#e3f2fd] p-4 rounded-lg">
          <label className="block text-sm font-medium text-[#1D1D1F] mb-2">使用时长: {duration} 小时</label>
          <input type="range" min="1" max="24" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full accent-[#1976d2]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1D1D1F] mb-2">模型选择</label>
          <select value={model} onChange={(e) => setModel(e.target.value)} className="w-full p-3 rounded-lg border border-[#E5E5EA] bg-white text-sm focus:border-[#1976d2] focus:ring-2 focus:ring-[#1976d2]/20 outline-none">
            <option value="gpt4">GPT-4</option>
            <option value="claude">Claude 3.5</option>
            <option value="gemini">Gemini 1.5</option>
          </select>
        </div>
        <button onClick={handleCalculate} disabled={isCalculating} className="w-full py-3 px-4 bg-[#1976d2] text-white rounded-lg font-medium hover:bg-[#1565c0] transition-colors disabled:opacity-70 shadow-md">
          {isCalculating ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : '计算'}
        </button>
        {showResult && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#e3f2fd] p-3 rounded-lg text-center"><p className="text-xs text-[#86868B]">总价</p><p className="text-lg font-bold text-[#1976d2]">${totalPrice.toFixed(2)}</p></div>
            <div className="bg-[#e3f2fd] p-3 rounded-lg text-center"><p className="text-xs text-[#86868B]">平均单价</p><p className="text-lg font-bold text-[#1976d2]">${avgPrice.toFixed(2)}/h</p></div>
            <div className="bg-[#e3f2fd] p-3 rounded-lg text-center"><p className="text-xs text-[#86868B]">风险等级</p><p className="text-lg font-bold" style={{ color: riskColor }}>{riskLevel}</p></div>
          </div>
        )}
      </div>
    </div>
  );

  const renderDjangoDemo = () => (
    <div className="bg-[#f8f9fa] rounded-xl p-6 border border-[#dee2e6]">
      <div className="space-y-5">
        <div className="bg-white p-4 rounded border border-[#dee2e6]">
          <label className="block text-sm font-medium text-[#495057] mb-2">GPU 数量</label>
          <input type="range" min="1" max="8" value={gpuCount} onChange={(e) => setGpuCount(Number(e.target.value))} className="w-full accent-[#34C759]" />
          <span className="text-sm text-[#6c757d] mt-1 block">当前: {gpuCount}</span>
        </div>
        <div className="bg-white p-4 rounded border border-[#dee2e6]">
          <label className="block text-sm font-medium text-[#495057] mb-2">使用时长（小时）</label>
          <input type="range" min="1" max="24" value={duration} onChange={(e) => setDuration(Number(e.target.value))} className="w-full accent-[#34C759]" />
          <span className="text-sm text-[#6c757d] mt-1 block">当前: {duration} 小时</span>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#495057] mb-2">模型选择</label>
          <select value={model} onChange={(e) => setModel(e.target.value)} className="w-full p-3 rounded border border-[#dee2e6] bg-white text-sm text-[#495057]">
            <option value="gpt4">GPT-4</option>
            <option value="claude">Claude 3.5</option>
            <option value="gemini">Gemini 1.5</option>
          </select>
        </div>
        <button onClick={handleCalculate} disabled={isCalculating} className="w-full py-3 px-4 bg-[#34C759] text-white rounded font-medium hover:bg-[#2db14a] transition-colors disabled:opacity-70">
          {isCalculating ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : '提交计算'}
        </button>
        {showResult && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded border border-[#dee2e6] text-center"><p className="text-xs text-[#6c757d]">总价</p><p className="text-lg font-bold text-[#212529]">${totalPrice.toFixed(2)}</p></div>
            <div className="bg-white p-3 rounded border border-[#dee2e6] text-center"><p className="text-xs text-[#6c757d]">平均单价</p><p className="text-lg font-bold text-[#212529]">${avgPrice.toFixed(2)}/h</p></div>
            <div className="bg-white p-3 rounded border border-[#dee2e6] text-center"><p className="text-xs text-[#6c757d]">风险等级</p><p className="text-lg font-bold" style={{ color: riskColor }}>{riskLevel}</p></div>
          </div>
        )}
      </div>
    </div>
  );

  const gradioCode = `import gradio as gr

def calculate(gpu, hours, model):
    price = {"gpt4": 2.5, "claude": 2.0, "gemini": 1.5}
    total = gpu * hours * price[model]
    return "$" + str(round(total, 2))

iface = gr.Interface(
    fn=calculate,
    inputs=[
        gr.Slider(1, 8, label="GPU"),
        gr.Slider(1, 24, label="Hours"),
        gr.Dropdown(["gpt4", "claude", "gemini"])
    ],
    outputs="text"
)
iface.launch()`;

  const streamlitCode = `import streamlit as st

gpu = st.slider("GPU", 1, 8, 4)
hours = st.slider("Hours", 1, 24, 8)
model = st.selectbox("Model", ["gpt4", "claude", "gemini"])

price = {"gpt4": 2.5, "claude": 2.0, "gemini": 1.5}
total = gpu * hours * price[model]

st.metric("Total", "$" + str(round(total, 2)))`;

  const reactCode = `export default function Calculator() {
  const [gpu, setGpu] = useState(4);
  const [hours, setHours] = useState(8);
  const [model, setModel] = useState('gpt4');
  
  const price = { gpt4: 2.5, claude: 2.0, gemini: 1.5 };
  const total = gpu * hours * price[model];
  
  return (
    <div>
      <input type="range" value={gpu} 
        onChange={e => setGpu(Number(e.target.value))} />
      <select value={model} 
        onChange={e => setModel(e.target.value)}>
        <option value="gpt4">GPT-4</option>
      </select>
      <div>Total: {"$" + total.toFixed(2)}</div>
    </div>
  );
}`;

  const niceguiCode = `from nicegui import ui

gpu = ui.slider(min=1, max=8, value=4)
hours = ui.slider(min=1, max=24, value=8)
model = ui.select(['gpt4', 'claude', 'gemini'])
result = ui.label('$0.00')

def calculate():
    price = {'gpt4': 2.5, 'claude': 2.0, 'gemini': 1.5}
    total = gpu.value * hours.value * price[model.value]
    result.set_text('$' + str(round(total, 2)))

ui.button('Calculate', on_click=calculate)
ui.run()`;

  const djangoCode = `# views.py
from django.shortcuts import render

def calculator(request):
    gpu = int(request.POST.get('gpu', 4))
    hours = int(request.POST.get('hours', 8))
    model = request.POST.get('model', 'gpt4')
    
    price = {'gpt4': 2.5, 'claude': 2.0, 'gemini': 1.5}
    total = gpu * hours * price[model]
    
    return render(request, 'calc.html', {
        'total': total,
        'gpu': gpu,
        'hours': hours
    })`;

  const getCodeSnippet = () => {
    const snippets: Record<FrameworkType, string> = {
      gradio: gradioCode,
      streamlit: streamlitCode,
      react: reactCode,
      nicegui: niceguiCode,
      django: djangoCode,
    };
    return snippets[activeTab];
  };

  const getLineCount = () => {
    const counts: Record<FrameworkType, { lines: number; files: number }> = {
      gradio: { lines: 15, files: 1 },
      streamlit: { lines: 10, files: 1 },
      react: { lines: 25, files: 3 },
      nicegui: { lines: 12, files: 1 },
      django: { lines: 45, files: 5 },
    };
    return counts[activeTab];
  };

  return (
    <div className="w-full h-full flex flex-col bg-white px-8 py-6">
      {/* Tab Bar */}
      <div className={`flex gap-2 mb-6 overflow-x-auto pb-2 transition-all duration-600 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'text-white' : 'bg-[#F5F5F7] text-[#86868B] hover:text-[#1D1D1F]'}`}
            style={{ backgroundColor: activeTab === tab.id ? tab.color : undefined }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Demo Area */}
      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Left: Interactive Demo */}
        <div className={`flex-1 overflow-y-auto transition-all duration-600 delay-100 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <h3 className="text-lg font-semibold text-[#1D1D1F] mb-4">
            {tabs.find(t => t.id === activeTab)?.label} Style Demo
          </h3>
          
          {activeTab === 'gradio' && renderGradioDemo()}
          {activeTab === 'streamlit' && renderStreamlitDemo()}
          {activeTab === 'react' && renderReactDemo()}
          {activeTab === 'nicegui' && renderNiceGUIDemo()}
          {activeTab === 'django' && renderDjangoDemo()}

          {/* Chart */}
          {showResult && (
            <div className="mt-6 p-4 bg-white rounded-xl border border-[#E5E5EA]">
              <p className="text-sm font-medium text-[#1D1D1F] mb-3">24 Hour Cost Forecast</p>
              <div className="h-32 flex items-end gap-1">
                {chartData.map((d, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t transition-all duration-300"
                    style={{
                      height: `${(d.cost / maxCost) * 100}%`,
                      backgroundColor: tabs.find(t => t.id === activeTab)?.color || '#0071E3',
                      opacity: 0.3 + (i / 24) * 0.7,
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-[#86868B] mt-2">
                <span>1h</span>
                <span>12h</span>
                <span>24h</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Code */}
        <div className={`w-96 flex flex-col transition-all duration-600 delay-200 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <button onClick={() => setShowCode(!showCode)} className="flex items-center justify-between mb-4 text-[#1D1D1F] hover:text-[#0071E3] transition-colors">
            <span className="text-lg font-semibold">Code Snippet</span>
            {showCode ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          
          {showCode && (
            <div className="flex-1 overflow-auto">
              <pre className="code-block-dark text-xs">
                <code>{getCodeSnippet()}</code>
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Info */}
      <div className={`mt-4 pt-4 border-t border-[#E5E5EA] flex items-center justify-between transition-all duration-600 delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center gap-6">
          <span className="text-sm text-[#86868B]">Lines: <span className="font-medium text-[#1D1D1F]">{getLineCount().lines}</span></span>
          <span className="text-sm text-[#86868B]">Files: <span className="font-medium text-[#1D1D1F]">{getLineCount().files}</span></span>
        </div>
        <span className="text-sm text-[#86868B]">Press → for summary</span>
      </div>
    </div>
  );
}
