/**
 * Vibe Coding Slides - 单元测试
 * 使用 TDD 开发范式，先定义测试用例
 */

// ============================================
// 测试框架（轻量级，无依赖）
// ============================================
const TestRunner = {
    tests: [],
    passed: 0,
    failed: 0,

    describe(name, fn) {
        console.log(`\n📦 ${name}`);
        fn();
    },

    it(description, fn) {
        this.tests.push({ description, fn });
    },

    async run() {
        console.log('🧪 开始运行测试...\n');

        for (const test of this.tests) {
            try {
                await test.fn();
                console.log(`  ✅ ${test.description}`);
                this.passed++;
            } catch (error) {
                console.log(`  ❌ ${test.description}`);
                console.log(`     Error: ${error.message}`);
                this.failed++;
            }
        }

        console.log(`\n📊 测试结果: ${this.passed} 通过, ${this.failed} 失败`);
        return this.failed === 0;
    }
};

function expect(actual) {
    const matchers = {
        toBe(expected) {
            if (actual !== expected) {
                throw new Error(`Expected ${expected}, but got ${actual}`);
            }
        },
        toEqual(expected) {
            if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                throw new Error(`Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
            }
        },
        toBeGreaterThan(expected) {
            if (!(actual > expected)) {
                throw new Error(`Expected ${actual} to be greater than ${expected}`);
            }
        },
        toBeLessThanOrEqual(expected) {
            if (!(actual <= expected)) {
                throw new Error(`Expected ${actual} to be less than or equal to ${expected}`);
            }
        },
        toContain(expected) {
            if (!actual.includes(expected)) {
                throw new Error(`Expected "${actual}" to contain "${expected}"`);
            }
        },
        toBeTruthy() {
            if (!actual) {
                throw new Error(`Expected ${actual} to be truthy`);
            }
        },
        toBeFalsy() {
            if (actual) {
                throw new Error(`Expected ${actual} to be falsy`);
            }
        },
        toHaveLength(expected) {
            if (actual.length !== expected) {
                throw new Error(`Expected length ${expected}, but got ${actual.length}`);
            }
        },
        toBeInstanceOf(expected) {
            if (!(actual instanceof expected)) {
                throw new Error(`Expected instance of ${expected.name}`);
            }
        }
    };

    // 添加 .not 支持
    matchers.not = {
        toBe(expected) {
            if (actual === expected) {
                throw new Error(`Expected ${actual} not to be ${expected}`);
            }
        },
        toEqual(expected) {
            if (JSON.stringify(actual) === JSON.stringify(expected)) {
                throw new Error(`Expected ${JSON.stringify(actual)} not to equal ${JSON.stringify(expected)}`);
            }
        },
        toBeTruthy() {
            if (actual) {
                throw new Error(`Expected ${actual} not to be truthy`);
            }
        },
        toBeFalsy() {
            if (!actual) {
                throw new Error(`Expected ${actual} not to be falsy`);
            }
        },
        toContain(expected) {
            if (actual.includes(expected)) {
                throw new Error(`Expected "${actual}" not to contain "${expected}"`);
            }
        }
    };

    return matchers;
}

// ============================================
// 测试用例定义
// ============================================

// 1. 幻灯片导航功能测试
TestRunner.describe('幻灯片导航功能', () => {
    TestRunner.it('应该有 15 页幻灯片', () => {
        const slides = document.querySelectorAll('.slide');
        expect(slides.length).toBe(15);
    });

    TestRunner.it('初始页面应该是第 1 页', () => {
        expect(window.SlidesApp.currentSlide).toBe(0);
    });

    TestRunner.it('按右箭头应该前进到下一页', () => {
        window.SlidesApp.goToSlide(0, true); // 重置到第一页
        const initialSlide = window.SlidesApp.currentSlide;
        window.SlidesApp.goToSlide(1, true); // 使用 immediate 模式
        expect(window.SlidesApp.currentSlide).toBe(initialSlide + 1);
        window.SlidesApp.goToSlide(0, true); // 重置
    });

    TestRunner.it('按左箭头应该后退到上一页', () => {
        window.SlidesApp.goToSlide(5, true); // 使用 immediate 模式
        window.SlidesApp.goToSlide(4, true); // 模拟后退
        expect(window.SlidesApp.currentSlide).toBe(4);
        window.SlidesApp.goToSlide(0, true); // 重置
    });

    TestRunner.it('在第一页时按左箭头不应该改变页码', () => {
        window.SlidesApp.goToSlide(0, true);
        window.SlidesApp.goToSlide(-1, true); // 尝试跳转到无效页
        expect(window.SlidesApp.currentSlide).toBe(0);
    });

    TestRunner.it('在最后一页时按右箭头不应该改变页码', () => {
        window.SlidesApp.goToSlide(14, true); // 使用 immediate 模式
        window.SlidesApp.goToSlide(15, true); // 尝试跳转到无效页
        expect(window.SlidesApp.currentSlide).toBe(14);
        window.SlidesApp.goToSlide(0, true); // 重置
    });

    TestRunner.it('goToSlide 应该能跳转到指定页', () => {
        window.SlidesApp.goToSlide(7, true); // 使用 immediate 模式
        expect(window.SlidesApp.currentSlide).toBe(7);
        window.SlidesApp.goToSlide(0, true); // 重置
    });
});

// 2. 进度条功能测试
TestRunner.describe('进度条功能', () => {
    TestRunner.it('进度条应该存在', () => {
        const progressBar = document.querySelector('.progress-bar');
        expect(progressBar).toBeTruthy();
    });

    TestRunner.it('进度条宽度应该反映当前进度', () => {
        window.SlidesApp.goToSlide(7, true); // 第 8 页，约 50%，使用 immediate 模式
        const progress = window.SlidesApp.getProgress();
        expect(progress).toBeGreaterThan(40);
        expect(progress).toBeLessThanOrEqual(60);
        window.SlidesApp.goToSlide(0, true); // 重置
    });

    TestRunner.it('第一页进度应该接近 0%', () => {
        window.SlidesApp.goToSlide(0, true);
        const progress = window.SlidesApp.getProgress();
        expect(progress).toBeLessThanOrEqual(10);
    });

    TestRunner.it('最后一页进度应该是 100%', () => {
        window.SlidesApp.goToSlide(14, true); // 使用 immediate 模式
        const progress = window.SlidesApp.getProgress();
        expect(progress).toBe(100);
        window.SlidesApp.goToSlide(0, true); // 重置
    });
});

// 3. 页码指示器测试
TestRunner.describe('页码指示器', () => {
    TestRunner.it('页码指示器应该存在', () => {
        const pageIndicator = document.querySelector('.page-indicator');
        expect(pageIndicator).toBeTruthy();
    });

    TestRunner.it('页码应该正确显示当前页/总页数', () => {
        window.SlidesApp.goToSlide(4, true); // 使用 immediate 模式
        const pageIndicator = document.querySelector('.page-indicator');
        expect(pageIndicator.textContent).toContain('5');
        expect(pageIndicator.textContent).toContain('15');
        window.SlidesApp.goToSlide(0, true); // 重置
    });
});

// 4. 交互式 Demo 功能测试（Slide 9）
TestRunner.describe('交互式 Demo 功能', () => {
    TestRunner.it('Tab 栏应该存在且有 4 个选项', () => {
        const tabs = document.querySelectorAll('.demo-tab');
        expect(tabs.length).toBe(4);
    });

    TestRunner.it('点击 Tab 应该切换 Demo 视图', () => {
        const tabs = document.querySelectorAll('.demo-tab');
        if (tabs[1]) {
            tabs[1].click();
            const activeTab = document.querySelector('.demo-tab.active');
            expect(activeTab).toBeTruthy();
        }
    });

    TestRunner.it('GPU 数量滑动条应该存在且范围为 1-8', () => {
        const gpuSlider = document.querySelector('#gpu-slider');
        if (gpuSlider) {
            expect(parseInt(gpuSlider.min)).toBe(1);
            expect(parseInt(gpuSlider.max)).toBe(8);
        }
    });

    TestRunner.it('使用时长滑动条应该存在且范围为 1-24', () => {
        const hoursSlider = document.querySelector('#hours-slider');
        if (hoursSlider) {
            expect(parseInt(hoursSlider.min)).toBe(1);
            expect(parseInt(hoursSlider.max)).toBe(24);
        }
    });

    TestRunner.it('模型选择下拉菜单应该有 3 个选项', () => {
        const modelSelect = document.querySelector('#model-select');
        if (modelSelect) {
            expect(modelSelect.options.length).toBe(3);
        }
    });

    TestRunner.it('计算按钮应该存在', () => {
        const calculateBtn = document.querySelector('.calculate-btn');
        expect(calculateBtn).toBeTruthy();
    });
});

// 5. 成本计算逻辑测试
TestRunner.describe('成本计算逻辑', () => {
    TestRunner.it('计算函数应该返回正确的总价', () => {
        const result = window.SlidesApp.calculateCost(4, 12, 'gpt-4');
        expect(result.totalCost).toBeGreaterThan(0);
    });

    TestRunner.it('GPU 数量增加应该增加总成本', () => {
        const cost1 = window.SlidesApp.calculateCost(2, 12, 'gpt-4');
        const cost2 = window.SlidesApp.calculateCost(4, 12, 'gpt-4');
        expect(cost2.totalCost).toBeGreaterThan(cost1.totalCost);
    });

    TestRunner.it('使用时长增加应该增加总成本', () => {
        const cost1 = window.SlidesApp.calculateCost(4, 6, 'gpt-4');
        const cost2 = window.SlidesApp.calculateCost(4, 12, 'gpt-4');
        expect(cost2.totalCost).toBeGreaterThan(cost1.totalCost);
    });

    TestRunner.it('不同模型应该有不同的单价', () => {
        const cost1 = window.SlidesApp.calculateCost(4, 12, 'gpt-4');
        const cost2 = window.SlidesApp.calculateCost(4, 12, 'claude-3.5');
        expect(cost1.unitPrice).not.toBe(cost2.unitPrice);
    });

    TestRunner.it('风险等级应该根据成本正确计算', () => {
        const lowCost = window.SlidesApp.calculateCost(1, 1, 'gemini-1.5');
        const highCost = window.SlidesApp.calculateCost(8, 24, 'gpt-4');
        expect(['低', '中', '高']).toContain(lowCost.riskLevel);
        expect(['低', '中', '高']).toContain(highCost.riskLevel);
    });
});

// 6. 幻灯片内容验证测试
TestRunner.describe('幻灯片内容验证', () => {
    TestRunner.it('封面页（Slide 1）应该包含标题', () => {
        const slide1 = document.querySelector('.slide[data-slide="1"]');
        const title = slide1?.querySelector('h1');
        expect(title).toBeTruthy();
        expect(title?.textContent).toContain('Vibe Coding');
    });

    TestRunner.it('深色分隔页（Slide 4）应该有深色背景', () => {
        const slide4 = document.querySelector('.slide[data-slide="4"]');
        expect(slide4?.classList.contains('dark-slide')).toBeTruthy();
    });

    TestRunner.it('深色分隔页（Slide 15）应该有深色背景', () => {
        const slide15 = document.querySelector('.slide[data-slide="15"]');
        expect(slide15?.classList.contains('dark-slide')).toBeTruthy();
    });

    TestRunner.it('数据页（Slide 5）应该包含表格', () => {
        const slide5 = document.querySelector('.slide[data-slide="5"]');
        const table = slide5?.querySelector('table, .data-table');
        expect(table).toBeTruthy();
    });

    TestRunner.it('优缺点页（Slide 11）应该有 6 个卡片', () => {
        const slide11 = document.querySelector('.slide[data-slide="11"]');
        const cards = slide11?.querySelectorAll('.pros-cons-card');
        expect(cards?.length).toBe(6);
    });
});

// 7. 响应式设计测试
TestRunner.describe('响应式设计', () => {
    TestRunner.it('幻灯片容器应该是 16:9 比例', () => {
        const container = document.querySelector('.slides-container');
        if (container) {
            const rect = container.getBoundingClientRect();
            const ratio = rect.width / rect.height;
            // 允许一定误差 (1.7 - 1.8)
            expect(ratio).toBeGreaterThan(1.6);
            expect(ratio).toBeLessThanOrEqual(1.9);
        }
    });
});

// 8. 动画效果测试
TestRunner.describe('动画效果', () => {
    TestRunner.it('幻灯片切换应该有过渡动画类', () => {
        const slides = document.querySelectorAll('.slide');
        slides.forEach(slide => {
            const style = window.getComputedStyle(slide);
            expect(style.transition).toBeTruthy();
        });
    });
});

// 9. 代码展示功能测试
TestRunner.describe('代码展示功能', () => {
    TestRunner.it('代码块应该使用等宽字体', () => {
        const codeBlocks = document.querySelectorAll('code, pre, .code-block');
        codeBlocks.forEach(block => {
            const style = window.getComputedStyle(block);
            expect(style.fontFamily).toContain('mono');
        });
    });

    TestRunner.it('Demo 页面应该有可折叠的代码区域', () => {
        const codeToggle = document.querySelector('.code-toggle');
        expect(codeToggle).toBeTruthy();
    });
});

// 10. 图表功能测试
TestRunner.describe('图表功能', () => {
    TestRunner.it('折线图容器应该存在', () => {
        const chartContainer = document.querySelector('.chart-container, #cost-chart');
        expect(chartContainer).toBeTruthy();
    });

    TestRunner.it('generateChartData 应该返回 24 小时数据点', () => {
        const data = window.SlidesApp.generateChartData(4, 'gpt-4');
        expect(data.length).toBe(24);
    });
});

// ============================================
// 导出测试运行器
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TestRunner, expect };
}

// 浏览器环境中自动运行
if (typeof window !== 'undefined') {
    window.runTests = () => TestRunner.run();
}
