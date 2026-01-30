/**
 * Vibe Coding Slides - 交互逻辑
 * 实现幻灯片导航、进度条、Demo 交互等功能
 */

(function () {
    'use strict';

    // ============================================
    // 全局状态
    // ============================================
    const state = {
        currentSlide: 0,
        totalSlides: 15,
        isAnimating: false,
        demoState: {
            gpuCount: 4,
            hours: 12,
            model: 'gpt-4',
            isCalculating: false,
            results: null
        }
    };

    // ============================================
    // 模型定价数据
    // ============================================
    const MODEL_PRICING = {
        'gpt-4': { name: 'GPT-4', pricePerHour: 2.5, riskMultiplier: 1.2 },
        'claude-3.5': { name: 'Claude 3.5', pricePerHour: 2.0, riskMultiplier: 1.0 },
        'gemini-1.5': { name: 'Gemini 1.5', pricePerHour: 1.5, riskMultiplier: 0.8 }
    };

    // GPU 单价（每小时）
    const GPU_PRICE_PER_HOUR = 3.0;

    // ============================================
    // 幻灯片导航
    // ============================================
    function goToSlide(index, immediate = false) {
        // 如果是立即跳转模式（用于测试），跳过动画锁定
        if (!immediate && state.isAnimating) return;
        if (index < 0 || index >= state.totalSlides) return;
        if (index === state.currentSlide) return;

        const slides = document.querySelectorAll('.slide');
        const prevIndex = state.currentSlide;

        if (!immediate) {
            state.isAnimating = true;
        }

        // 移除所有状态类
        slides.forEach((slide, i) => {
            slide.classList.remove('active', 'prev');
        });

        // 设置前一页
        if (prevIndex !== index) {
            slides[prevIndex].classList.add('prev');
        }

        // 激活当前页
        slides[index].classList.add('active');

        state.currentSlide = index;
        updateProgress();
        updatePageIndicator();

        // 动画结束后重置状态
        if (!immediate) {
            setTimeout(() => {
                state.isAnimating = false;
                slides[prevIndex].classList.remove('prev');
            }, 500);
        } else {
            // 立即模式下直接重置
            state.isAnimating = false;
            slides[prevIndex].classList.remove('prev');
        }
    }

    function nextSlide() {
        goToSlide(state.currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(state.currentSlide - 1);
    }

    // ============================================
    // 进度条更新
    // ============================================
    function getProgress() {
        if (state.totalSlides <= 1) return 100;
        return Math.round((state.currentSlide / (state.totalSlides - 1)) * 100);
    }

    function updateProgress() {
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = getProgress() + '%';
        }
    }

    // ============================================
    // 页码指示器
    // ============================================
    function updatePageIndicator() {
        const indicator = document.querySelector('.page-indicator');
        if (indicator) {
            indicator.textContent = `${state.currentSlide + 1} / ${state.totalSlides}`;
        }
    }

    // ============================================
    // 键盘导航
    // ============================================
    function handleKeydown(e) {
        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
            case 'PageDown':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(state.totalSlides - 1);
                break;
        }
    }

    // ============================================
    // 成本计算逻辑
    // ============================================
    function calculateCost(gpuCount, hours, model) {
        const modelData = MODEL_PRICING[model] || MODEL_PRICING['gpt-4'];

        // 基础成本 = GPU 数量 × 小时数 × GPU 单价
        const gpuCost = gpuCount * hours * GPU_PRICE_PER_HOUR;

        // 模型成本 = 小时数 × 模型单价
        const modelCost = hours * modelData.pricePerHour;

        // 总成本
        const totalCost = gpuCost + modelCost;

        // 单价
        const unitPrice = totalCost / hours;

        // 风险等级
        let riskLevel;
        const riskScore = totalCost * modelData.riskMultiplier;
        if (riskScore < 50) {
            riskLevel = '低';
        } else if (riskScore < 150) {
            riskLevel = '中';
        } else {
            riskLevel = '高';
        }

        return {
            totalCost: Math.round(totalCost * 100) / 100,
            unitPrice: Math.round(unitPrice * 100) / 100,
            riskLevel,
            modelName: modelData.name
        };
    }

    // ============================================
    // 生成图表数据
    // ============================================
    function generateChartData(gpuCount, model) {
        const data = [];
        for (let hour = 1; hour <= 24; hour++) {
            const cost = calculateCost(gpuCount, hour, model);
            data.push({
                hour,
                cost: cost.totalCost
            });
        }
        return data;
    }

    // ============================================
    // 绘制折线图
    // ============================================
    function drawChart(data) {
        const canvas = document.getElementById('cost-chart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const rect = canvas.parentElement.getBoundingClientRect();

        // 设置 canvas 尺寸
        canvas.width = rect.width - 32;
        canvas.height = rect.height - 32;

        const width = canvas.width;
        const height = canvas.height;
        const padding = { top: 20, right: 20, bottom: 30, left: 50 };

        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;

        // 清空画布
        ctx.clearRect(0, 0, width, height);

        // 找出最大值
        const maxCost = Math.max(...data.map(d => d.cost));

        // 绘制网格线
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
        ctx.lineWidth = 1;

        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (chartHeight / 4) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
        }

        // 绘制 Y 轴标签
        ctx.fillStyle = '#86868B';
        ctx.font = '12px -apple-system, sans-serif';
        ctx.textAlign = 'right';

        for (let i = 0; i <= 4; i++) {
            const y = padding.top + (chartHeight / 4) * i;
            const value = Math.round(maxCost * (1 - i / 4));
            ctx.fillText('$' + value, padding.left - 10, y + 4);
        }

        // 绘制 X 轴标签
        ctx.textAlign = 'center';
        for (let i = 0; i < data.length; i += 4) {
            const x = padding.left + (chartWidth / (data.length - 1)) * i;
            ctx.fillText(data[i].hour + 'h', x, height - 10);
        }

        // 绘制折线
        ctx.beginPath();
        ctx.strokeStyle = '#0071E3';
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';

        data.forEach((d, i) => {
            const x = padding.left + (chartWidth / (data.length - 1)) * i;
            const y = padding.top + chartHeight * (1 - d.cost / maxCost);

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // 绘制渐变填充
        const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
        gradient.addColorStop(0, 'rgba(0, 113, 227, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 113, 227, 0)');

        ctx.beginPath();
        data.forEach((d, i) => {
            const x = padding.left + (chartWidth / (data.length - 1)) * i;
            const y = padding.top + chartHeight * (1 - d.cost / maxCost);

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.lineTo(padding.left + chartWidth, height - padding.bottom);
        ctx.lineTo(padding.left, height - padding.bottom);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // 绘制数据点
        data.forEach((d, i) => {
            const x = padding.left + (chartWidth / (data.length - 1)) * i;
            const y = padding.top + chartHeight * (1 - d.cost / maxCost);

            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#0071E3';
            ctx.fill();
        });
    }

    // ============================================
    // Demo Tab 切换
    // ============================================
    function switchDemoTab(framework) {
        const tabs = document.querySelectorAll('.demo-tab');
        const panels = document.querySelectorAll('.demo-panel');

        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.framework === framework);
        });

        panels.forEach(panel => {
            panel.classList.toggle('active', panel.dataset.framework === framework);
        });

        // 更新底部信息
        updateDemoInfo(framework);
    }

    // ============================================
    // 更新 Demo 信息栏
    // ============================================
    const FRAMEWORK_INFO = {
        gradio: { lines: 45, files: 1 },      // 单文件，gr.Blocks + 图表 + 历史
        streamlit: { lines: 75, files: 1 },   // 单文件，sidebar + session_state + 图表
        react: { lines: 280, files: 8 },      // 组件化 + 状态管理 + API + 配置
        nicegui: { lines: 85, files: 1 }      // 单文件，实时更新 + 图表
    };

    function updateDemoInfo(framework) {
        const info = FRAMEWORK_INFO[framework] || FRAMEWORK_INFO.gradio;
        const linesEl = document.querySelector('.demo-info .lines-value');
        const filesEl = document.querySelector('.demo-info .files-value');

        if (linesEl) linesEl.textContent = info.lines;
        if (filesEl) filesEl.textContent = info.files;
    }

    // ============================================
    // 处理计算按钮点击
    // ============================================
    async function handleCalculate(framework) {
        const panel = document.querySelector(`.demo-panel[data-framework="${framework}"]`);
        if (!panel) return;

        const gpuSlider = panel.querySelector('.gpu-slider');
        const hoursSlider = panel.querySelector('.hours-slider');
        const modelSelect = panel.querySelector('.model-select');
        const calculateBtn = panel.querySelector('.calculate-btn');
        const resultsContainer = panel.querySelector('.results-container');

        const gpuCount = parseInt(gpuSlider?.value || 4);
        const hours = parseInt(hoursSlider?.value || 12);
        const model = modelSelect?.value || 'gpt-4';

        // 显示 loading 状态
        if (calculateBtn) {
            calculateBtn.classList.add('loading');
            calculateBtn.innerHTML = '<span class="loading-spinner"></span>';
        }

        // 模拟 1.5 秒计算延迟
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 计算结果
        const result = calculateCost(gpuCount, hours, model);

        // 更新结果显示
        if (resultsContainer) {
            const totalEl = resultsContainer.querySelector('.total-cost .value');
            const unitEl = resultsContainer.querySelector('.unit-price .value');
            const riskEl = resultsContainer.querySelector('.risk-level .value');
            const riskCard = resultsContainer.querySelector('.risk-level');

            if (totalEl) totalEl.textContent = '$' + result.totalCost;
            if (unitEl) unitEl.textContent = '$' + result.unitPrice + '/h';
            if (riskEl) riskEl.textContent = result.riskLevel;

            if (riskCard) {
                riskCard.classList.remove('risk-low', 'risk-medium', 'risk-high');
                if (result.riskLevel === '低') riskCard.classList.add('risk-low');
                else if (result.riskLevel === '中') riskCard.classList.add('risk-medium');
                else riskCard.classList.add('risk-high');
            }

            resultsContainer.style.display = 'block';
        }

        // 绘制图表
        const chartData = generateChartData(gpuCount, model);
        drawChart(chartData);

        // 恢复按钮状态
        if (calculateBtn) {
            calculateBtn.classList.remove('loading');
            calculateBtn.textContent = '计算';
        }
    }

    // ============================================
    // 代码折叠切换
    // ============================================
    function toggleCode(framework) {
        const panel = document.querySelector(`.demo-panel[data-framework="${framework}"]`);
        if (!panel) return;

        const codePanel = panel.querySelector('.code-panel');
        const toggleBtn = panel.querySelector('.code-toggle');

        if (codePanel && toggleBtn) {
            const isOpen = codePanel.classList.toggle('open');
            toggleBtn.textContent = isOpen ? '▼ 收起代码' : '▶ 查看代码';
        }
    }

    // ============================================
    // 滑动条值更新
    // ============================================
    function updateSliderValue(slider, valueEl) {
        if (slider && valueEl) {
            valueEl.textContent = slider.value;
        }
    }

    // ============================================
    // 初始化
    // ============================================
    function init() {
        // 获取幻灯片总数
        const slides = document.querySelectorAll('.slide');
        state.totalSlides = slides.length;

        // 初始化第一页
        if (slides.length > 0) {
            slides[0].classList.add('active');
        }

        // 更新进度条和页码
        updateProgress();
        updatePageIndicator();

        // 绑定键盘事件
        document.addEventListener('keydown', handleKeydown);

        // 绑定 Demo Tab 事件
        document.querySelectorAll('.demo-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                switchDemoTab(tab.dataset.framework);
            });
        });

        // 绑定计算按钮事件
        document.querySelectorAll('.calculate-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const framework = btn.closest('.demo-panel')?.dataset.framework;
                handleCalculate(framework);
            });
        });

        // 绑定代码切换按钮事件
        document.querySelectorAll('.code-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                const framework = btn.closest('.demo-panel')?.dataset.framework;
                toggleCode(framework);
            });
        });

        // 绑定滑动条事件
        document.querySelectorAll('.demo-slider').forEach(slider => {
            const valueEl = slider.parentElement.querySelector('.slider-value');
            slider.addEventListener('input', () => {
                updateSliderValue(slider, valueEl);
            });
        });

        // 初始化默认 Demo Tab
        switchDemoTab('gradio');

        console.log('Vibe Coding Slides 已初始化');
    }

    // ============================================
    // 导出公共 API（用于测试）
    // ============================================
    window.SlidesApp = {
        get currentSlide() { return state.currentSlide; },
        get totalSlides() { return state.totalSlides; },
        goToSlide,
        nextSlide,
        prevSlide,
        getProgress,
        calculateCost,
        generateChartData,
        switchDemoTab
    };

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
