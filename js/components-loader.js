/**
 * 组件加载器 - 实现高内聚低耦合
 * 统一管理页头和页脚的动态加载和状态管理
 */

class ComponentLoader {
    constructor() {
        this.componentsPath = 'components/';
        this.init();
    }

    /**
     * 初始化组件加载器
     */
    async init() {
        await this.loadComponents();
        this.setActiveNavigation();
    }

    /**
     * 加载所有公共组件
     */
    async loadComponents() {
        await Promise.all([
            this.loadComponent('header', 'header-placeholder'),
            this.loadComponent('footer', 'footer-placeholder')
        ]);
    }

    /**
     * 加载单个组件
     * @param {string} componentName - 组件名称
     * @param {string} placeholderId - 占位符ID
     */
    async loadComponent(componentName, placeholderId) {
        try {
            const response = await fetch(`${this.componentsPath}${componentName}.html`);
            if (!response.ok) {
                throw new Error(`无法加载组件: ${componentName}`);
            }
            const html = await response.text();
            const placeholder = document.getElementById(placeholderId);
            if (placeholder) {
                placeholder.outerHTML = html;
            }
        } catch (error) {
            console.error(`组件加载失败: ${componentName}`, error);
        }
    }

    /**
     * 根据当前页面设置激活的导航项
     */
    setActiveNavigation() {
        // 延迟执行，确保组件已加载
        setTimeout(() => {
            const currentPage = this.getCurrentPage();
            
            // 设置桌面端导航
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                if (item.dataset.page === currentPage) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            // 设置移动端导航
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
            mobileNavLinks.forEach(link => {
                if (link.dataset.page === currentPage) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }, 100);
    }

    /**
     * 获取当前页面名称
     * @returns {string} 页面名称
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '');
        return page || 'index';
    }
}

// 自动初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ComponentLoader());
} else {
    new ComponentLoader();
}

