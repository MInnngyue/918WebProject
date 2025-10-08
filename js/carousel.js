/**
 * 轮播图功能模块 - 高内聚低耦合设计
 * 统一管理所有轮播图相关的JavaScript代码
 */

class CarouselManager {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initCarouselButtons();
        });
    }

    /**
     * 初始化轮播图按钮优化
     */
    initCarouselButtons() {
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');
        
        this.optimizeButton(prevBtn);
        this.optimizeButton(nextBtn);
    }

    /**
     * 优化单个按钮的点击行为
     * @param {HTMLElement} button 
     */
    optimizeButton(button) {
        if (!button) return;
        
        button.addEventListener('click', function() {
            // 点击后立即失去焦点，防止保持激活状态
            this.blur();
        });
        
        // 添加鼠标离开事件，确保恢复原始状态
        button.addEventListener('mouseleave', function() {
            this.blur();
        });
    }
}

// 初始化轮播图管理器
new CarouselManager();
