/**
 * Vibe Coding Framework Selection Slides - Interactive JavaScript
 */

// ===== State Management =====
const state = {
    currentSlide: 1,
    totalSlides: 15,
    demoValues: {
        gpu: 4,
        hours: 8,
        model: 'gpt4'
    },
    activeDemo: 'gradio'
};

// ===== DOM Elements =====
const elements = {
    slides: null,
    progressBar: null,
    currentSlideEl: null,
    totalSlidesEl: null,
    prevBtn: null,
    nextBtn: null
};

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    initializeEventListeners();
    initializeDemoTabs();
    initializeDemoControls();
    updateSlide();
});

function initializeElements() {
    elements.slides = document.querySelectorAll('.slide');
    elements.progressBar = document.getElementById('progressBar');
    elements.currentSlideEl = document.getElementById('currentSlide');
    elements.totalSlidesEl = document.getElementById('totalSlides');
    elements.prevBtn = document.getElementById('prevBtn');
    elements.nextBtn = document.getElementById('nextBtn');

    if (elements.totalSlidesEl) {
        elements.totalSlidesEl.textContent = state.totalSlides;
    }
}

function initializeEventListeners() {
    // Keyboard navigation
    document.addEventListener('keydown', handleKeydown);

    // Button navigation
    if (elements.prevBtn) {
        elements.prevBtn.addEventListener('click', () => navigateSlide(-1));
    }
    if (elements.nextBtn) {
        elements.nextBtn.addEventListener('click', () => navigateSlide(1));
    }

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                navigateSlide(1);
            } else {
                navigateSlide(-1);
            }
        }
    }
}

function handleKeydown(e) {
    switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
            e.preventDefault();
            navigateSlide(1);
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            e.preventDefault();
            navigateSlide(-1);
            break;
        case 'Home':
            e.preventDefault();
            goToSlide(1);
            break;
        case 'End':
            e.preventDefault();
            goToSlide(state.totalSlides);
            break;
    }
}

function navigateSlide(direction) {
    const newSlide = state.currentSlide + direction;
    if (newSlide >= 1 && newSlide <= state.totalSlides) {
        goToSlide(newSlide);
    }
}

function goToSlide(slideNumber) {
    state.currentSlide = slideNumber;
    updateSlide();
}

function updateSlide() {
    // Update slide visibility
    elements.slides.forEach((slide, index) => {
        const slideNum = index + 1;
        if (slideNum === state.currentSlide) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    // Update progress bar
    const progress = (state.currentSlide / state.totalSlides) * 100;
    if (elements.progressBar) {
        elements.progressBar.style.width = `${progress}%`;
    }

    // Update page indicator
    if (elements.currentSlideEl) {
        elements.currentSlideEl.textContent = state.currentSlide;
    }

    // Update button states
    if (elements.prevBtn) {
        elements.prevBtn.disabled = state.currentSlide === 1;
        elements.prevBtn.style.opacity = state.currentSlide === 1 ? '0.3' : '1';
    }
    if (elements.nextBtn) {
        elements.nextBtn.disabled = state.currentSlide === state.totalSlides;
        elements.nextBtn.style.opacity = state.currentSlide === state.totalSlides ? '0.3' : '1';
    }
}

// ===== Demo Interactions =====
function initializeDemoTabs() {
    const tabs = document.querySelectorAll('.demo-tab');
    const demos = document.querySelectorAll('.framework-demo');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const framework = tab.dataset.framework;

            // Update tab states
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update demo visibility
            demos.forEach(demo => {
                demo.classList.remove('active');
                if (demo.id === `${framework}-demo`) {
                    demo.classList.add('active');
                }
            });

            // Update info bar
            state.activeDemo = framework;
            updateDemoInfo(framework);
        });
    });
}

function updateDemoInfo(framework) {
    const info = {
        gradio: { name: 'Gradio', lines: '~20 行', files: '1 个' },
        streamlit: { name: 'Streamlit', lines: '~35 行', files: '1 个' },
        react: { name: 'React', lines: '~120 行', files: '5+ 个' },
        nicegui: { name: 'NiceGUI', lines: '~45 行', files: '1 个' }
    };

    const data = info[framework];
    if (data) {
        const nameEl = document.getElementById('current-framework');
        const linesEl = document.getElementById('code-lines');
        const filesEl = document.getElementById('file-count');

        if (nameEl) nameEl.textContent = data.name;
        if (linesEl) linesEl.textContent = data.lines;
        if (filesEl) filesEl.textContent = data.files;
    }
}

function initializeDemoControls() {
    // Initialize all sliders
    const sliders = document.querySelectorAll('[data-demo-slider]');
    sliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const type = e.target.dataset.demoSlider;
            const value = e.target.value;
            state.demoValues[type] = parseInt(value);
            updateSliderDisplay(type, value);
        });
    });

    // Initialize calculate buttons
    const calcButtons = [
        { id: 'gradio-calc', output: 'gradio-output' },
        { id: 'streamlit-calc', output: 'streamlit-metrics', chart: 'streamlit-chart' },
        { id: 'react-calc', output: 'react-results' },
        { id: 'nicegui-calc', output: 'nicegui-output' }
    ];

    calcButtons.forEach(btn => {
        const button = document.getElementById(btn.id);
        if (button) {
            button.addEventListener('click', () => {
                // Show loading state
                button.disabled = true;
                button.textContent = '计算中...';

                setTimeout(() => {
                    calculateResults();
                    showOutput(btn.output);
                    if (btn.chart) showOutput(btn.chart);

                    // Reset button
                    button.disabled = false;
                    button.textContent = button.id.includes('streamlit') ? '🚀 开始计算' :
                                        button.id.includes('react') ? 'Calculate' :
                                        button.id.includes('nicegui') ? '▶ 开始计算' : '计算';
                }, 800);
            });
        }
    });

    // Initialize React model chips
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            state.demoValues.model = chip.dataset.model;
        });
    });
}

function updateSliderDisplay(type, value) {
    const displayIds = {
        gpu: ['gradio-gpu-value', 'streamlit-gpu-value', 'react-gpu-value', 'nicegui-gpu-value'],
        hours: ['gradio-hours-value', 'streamlit-hours-value', 'react-hours-value', 'nicegui-hours-value']
    };

    const suffixes = {
        gpu: '',
        hours: type === 'hours' ? '小时' : ''
    };

    const ids = displayIds[type];
    if (ids) {
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                const suffix = type === 'hours' ? (id.includes('react') ? 'h' : '小时') : '';
                el.textContent = value + suffix;
            }
        });
    }

    // Update React slider fill
    if (type === 'gpu' || type === 'hours') {
        const max = type === 'gpu' ? 8 : 24;
        const percentage = (value / max) * 100;
        const fills = document.querySelectorAll('.slider-fill');
        fills.forEach(fill => {
            fill.style.width = `${percentage}%`;
        });
    }
}

function calculateResults() {
    const { gpu, hours, model } = state.demoValues;

    // Pricing model
    const modelPrices = {
        gpt4: 5,
        claude: 4,
        gemini: 3
    };

    const pricePerHour = modelPrices[model] || 5;
    const total = gpu * hours * pricePerHour;
    const avgPerHour = gpu * pricePerHour;

    // Determine risk level
    let risk = '低';
    let riskClass = 'low';
    if (total > 500) {
        risk = '高';
        riskClass = 'high';
    } else if (total > 200) {
        risk = '中';
        riskClass = 'medium';
    }

    // Update all outputs
    updateOutput('gradio', total, avgPerHour, risk, riskClass);
    updateOutput('streamlit', total, avgPerHour, risk, riskClass);
    updateOutput('react', total, avgPerHour, risk, riskClass);
    updateOutput('nicegui', total, avgPerHour, risk, riskClass);

    // Draw chart for Streamlit
    drawChart(total);
}

function updateOutput(framework, total, avg, risk, riskClass) {
    const totalEl = document.getElementById(`${framework}-total`);
    const avgEl = document.getElementById(`${framework}-avg`);
    const riskEl = document.getElementById(`${framework}-risk`);

    if (totalEl) totalEl.textContent = framework === 'react' ? `$${total}` : (framework === 'streamlit' ? `$${total}` : `$${total}`);
    if (avgEl) avgEl.textContent = framework === 'react' ? `$${avg}` : (framework === 'streamlit' ? `$${avg}/hr` : `$${avg}/hr`);
    if (riskEl) {
        riskEl.textContent = risk;
        riskEl.className = framework === 'react' ? `result-value risk ${riskClass}` :
                          (framework === 'streamlit' ? `value risk-${riskClass}` :
                          (framework === 'nicegui' ? 'value risk' : 'risk-badge'));
    }
}

function showOutput(outputId) {
    const output = document.getElementById(outputId);
    if (output) {
        output.style.display = 'block';
    }
}

function drawChart(totalCost) {
    const canvas = document.getElementById('streamlitCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Generate data points (hourly cost projection)
    const dataPoints = [];
    const hours = 24;
    const baseCost = totalCost / state.demoValues.hours;

    for (let i = 0; i <= hours; i++) {
        // Add some random variation for realism
        const variation = 1 + (Math.random() * 0.2 - 0.1);
        dataPoints.push(baseCost * i * variation);
    }

    // Find max for scaling
    const maxValue = Math.max(...dataPoints);

    // Draw axes
    ctx.strokeStyle = '#D2D2D7';
    ctx.lineWidth = 1;

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(40, 10);
    ctx.lineTo(40, height - 30);
    ctx.stroke();

    // X-axis
    ctx.beginPath();
    ctx.moveTo(40, height - 30);
    ctx.lineTo(width - 10, height - 30);
    ctx.stroke();

    // Draw line
    ctx.strokeStyle = '#FF4B4B';
    ctx.lineWidth = 3;
    ctx.beginPath();

    const chartWidth = width - 50;
    const chartHeight = height - 40;

    dataPoints.forEach((value, index) => {
        const x = 40 + (index / hours) * chartWidth;
        const y = height - 30 - (value / maxValue) * chartHeight;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#FF4B4B';
    dataPoints.forEach((value, index) => {
        if (index % 4 === 0) { // Show every 4th point
            const x = 40 + (index / hours) * chartWidth;
            const y = height - 30 - (value / maxValue) * chartHeight;

            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    // Draw labels
    ctx.fillStyle = '#86868B';
    ctx.font = '10px -apple-system, sans-serif';
    ctx.textAlign = 'center';

    for (let i = 0; i <= 24; i += 6) {
        const x = 40 + (i / hours) * chartWidth;
        ctx.fillText(`${i}h`, x, height - 15);
    }

    // Y-axis label
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('Cost ($)', 0, 0);
    ctx.restore();
}

// ===== Demo Tab Switching =====
function initializeDemoTabs() {
    const tabs = document.querySelectorAll('.demo-tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const framework = tab.dataset.framework;
            switchDemo(framework);
        });
    });
}

function switchDemo(framework) {
    state.activeDemo = framework;

    // Update tabs
    document.querySelectorAll('.demo-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.framework === framework);
    });

    // Update demos
    document.querySelectorAll('.framework-demo').forEach(demo => {
        demo.classList.toggle('active', demo.id === `${framework}-demo`);
    });

    updateDemoInfo(framework);
}

// ===== Demo Control Initialization =====
function initializeDemoControls() {
    // Sync all sliders
    const allSliders = document.querySelectorAll('[data-demo-slider]');

    allSliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const type = e.target.dataset.demoSlider;
            const value = parseInt(e.target.value);

            // Update state
            state.demoValues[type] = value;

            // Sync all sliders of same type
            document.querySelectorAll(`[data-demo-slider="${type}"]`).forEach(s => {
                s.value = value;
            });

            // Update displays
            updateSliderDisplay(type, value);
        });
    });

    // Initialize calculate buttons
    const calculateButtons = [
        { id: 'gradio-calc', outputId: 'gradio-output' },
        { id: 'streamlit-calc', outputId: 'streamlit-metrics', chartId: 'streamlit-chart' },
        { id: 'react-calc', outputId: 'react-results' },
        { id: 'nicegui-calc', outputId: 'nicegui-output' }
    ];

    calculateButtons.forEach(btn => {
        const button = document.getElementById(btn.id);
        if (button) {
            button.addEventListener('click', () => {
                // Show loading
                const originalText = button.textContent;
                button.textContent = '计算中...';
                button.disabled = true;

                setTimeout(() => {
                    calculateAndShowResults();

                    // Show output
                    const output = document.getElementById(btn.outputId);
                    if (output) {
                        output.style.display = 'block';
                    }

                    // Show chart if exists
                    if (btn.chartId) {
                        const chart = document.getElementById(btn.chartId);
                        if (chart) {
                            chart.style.display = 'block';
                            drawChart(calculateTotalCost());
                        }
                    }

                    // Reset button
                    button.textContent = originalText;
                    button.disabled = false;
                }, 600);
            });
        }
    });

    // Model chips (React demo)
    const chips = document.querySelectorAll('.chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            state.demoValues.model = chip.dataset.model;
        });
    });
}

function updateSliderDisplay(type, value) {
    const displayMap = {
        gpu: {
            elements: ['gradio-gpu-value', 'streamlit-gpu-value', 'nicegui-gpu-value'],
            suffix: ''
        },
        hours: {
            elements: ['gradio-hours-value', 'streamlit-hours-value', 'nicegui-hours-value'],
            suffix: '小时'
        }
    };

    const config = displayMap[type];
    if (config) {
        config.elements.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.textContent = value + config.suffix;
            }
        });
    }

    // Update React specific displays
    const reactGpuEl = document.getElementById('react-gpu-value');
    const reactHoursEl = document.getElementById('react-hours-value');

    if (reactGpuEl && type === 'gpu') {
        reactGpuEl.textContent = value;
    }
    if (reactHoursEl && type === 'hours') {
        reactHoursEl.textContent = value + 'h';
    }

    // Update slider fill bars
    const sliders = document.querySelectorAll('.react-slider');
    sliders.forEach(slider => {
        const sliderType = slider.dataset.demoSlider;
        if (sliderType === type) {
            const max = sliderType === 'gpu' ? 8 : 24;
            const percentage = (value / max) * 100;

            const fill = slider.parentElement.querySelector('.slider-fill');
            if (fill) {
                fill.style.width = `${percentage}%`;
            }
        }
    });
}

function calculateTotalCost() {
    const { gpu, hours, model } = state.demoValues;

    const modelPrices = {
        gpt4: 5,
        claude: 4,
        gemini: 3
    };

    const pricePerHour = modelPrices[model] || 5;
    return gpu * hours * pricePerHour;
}

function calculateAndShowResults() {
    const total = calculateTotalCost();
    const { gpu } = state.demoValues;

    const modelPrices = {
        gpt4: 5,
        claude: 4,
        gemini: 3
    };

    const pricePerHour = modelPrices[state.demoValues.model] || 5;
    const avg = gpu * pricePerHour;

    let risk = '低';
    let riskClass = 'low';
    if (total > 500) {
        risk = '高';
        riskClass = 'high';
    } else if (total > 200) {
        risk = '中';
        riskClass = 'medium';
    }

    // Update all framework outputs
    updateFrameworkOutput('gradio', total, avg, risk, riskClass);
    updateFrameworkOutput('streamlit', total, avg, risk, riskClass);
    updateFrameworkOutput('react', total, avg, risk, riskClass);
    updateFrameworkOutput('nicegui', total, avg, risk, riskClass);
}

function updateFrameworkOutput(framework, total, avg, risk, riskClass) {
    const totalEl = document.getElementById(`${framework}-total`);
    const avgEl = document.getElementById(`${framework}-avg`);
    const riskEl = document.getElementById(`${framework}-risk`);

    if (totalEl) {
        totalEl.textContent = framework === 'react' ? `$${total}` : `$${total}`;
    }

    if (avgEl) {
        avgEl.textContent = framework === 'react' ? `$${avg}` :
                           (framework === 'streamlit' ? `$${avg}/hr` : `$${avg}/hr`);
    }

    if (riskEl) {
        riskEl.textContent = risk;
        if (framework === 'react') {
            riskEl.className = `result-value risk ${riskClass}`;
        } else if (framework === 'streamlit') {
            riskEl.className = `value risk-${riskClass}`;
        } else if (framework === 'nicegui') {
            riskEl.className = 'value risk';
        } else {
            riskEl.className = 'risk-badge';
        }
    }
}

function showOutput(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'block';
    }
}

// ===== Chart Drawing for Streamlit =====
function drawChart(totalCost) {
    const canvas = document.getElementById('streamlitCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Generate data points
    const dataPoints = [];
    const hours = 24;
    const baseCost = totalCost / state.demoValues.hours;

    for (let i = 0; i <= hours; i++) {
        const variation = 1 + (Math.random() * 0.2 - 0.1);
        dataPoints.push(baseCost * i * variation);
    }

    const maxValue = Math.max(...dataPoints);

    // Draw axes
    ctx.strokeStyle = '#D2D2D7';
    ctx.lineWidth = 1;

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(40, 10);
    ctx.lineTo(40, height - 30);
    ctx.stroke();

    // X-axis
    ctx.beginPath();
    ctx.moveTo(40, height - 30);
    ctx.lineTo(width - 10, height - 30);
    ctx.stroke();

    // Draw line
    ctx.strokeStyle = '#FF4B4B';
    ctx.lineWidth = 3;
    ctx.beginPath();

    const chartWidth = width - 50;
    const chartHeight = height - 40;

    dataPoints.forEach((value, index) => {
        const x = 40 + (index / hours) * chartWidth;
        const y = height - 30 - (value / maxValue) * chartHeight;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw points
    ctx.fillStyle = '#FF4B4B';
    dataPoints.forEach((value, index) => {
        if (index % 4 === 0) {
            const x = 40 + (index / hours) * chartWidth;
            const y = height - 30 - (value / maxValue) * chartHeight;

            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    // Draw labels
    ctx.fillStyle = '#86868B';
    ctx.font = '10px -apple-system, sans-serif';
    ctx.textAlign = 'center';

    for (let i = 0; i <= 24; i += 6) {
        const x = 40 + (i / hours) * chartWidth;
        ctx.fillText(`${i}h`, x, height - 15);
    }

    // Y-axis label
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('Cost ($)', 0, 0);
    ctx.restore();
}
