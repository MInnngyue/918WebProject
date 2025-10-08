/**
 * 主JavaScript文件 - 统一管理所有功能
 * 九一八事变纪念网站
 * 
 * 设计原则：高内聚、低耦合、模块化
 */

// ========== 应用程序主类 ==========
class MemorialSiteApp {
    constructor() {
        this.init();
    }

    init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onReady());
        } else {
            this.onReady();
        }
    }

    onReady() {
        // 初始化所有模块
        this.initNavigation();
        this.initCarousel();
        this.initInteraction();
        this.initScrollEffects();
        this.initSearch();
    }

    // ---------- 导航模块 ----------
    initNavigation() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

        if (mobileMenuBtn && mobileMenu) {
            // 移动端菜单切换
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });

            // 点击链接后关闭菜单
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('active');
                });
            });

            // 点击菜单外部关闭
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && 
                    !mobileMenuBtn.contains(e.target) && 
                    mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            });
        }
    }

    // ---------- 轮播图模块 ----------
    initCarousel() {
        const carousel = document.querySelector('.carousel');
        if (!carousel) return;

        const items = carousel.querySelectorAll('.carousel-item');
        const indicators = carousel.querySelectorAll('.indicator');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');

        let currentIndex = 0;
        let autoPlayInterval = null;

        // 显示指定索引的轮播项
        const showSlide = (index) => {
            items.forEach(item => item.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            items[index].classList.add('active');
            indicators[index].classList.add('active');
            currentIndex = index;
        };

        // 下一张
        const nextSlide = () => {
            const next = (currentIndex + 1) % items.length;
            showSlide(next);
        };

        // 上一张
        const prevSlide = () => {
            const prev = (currentIndex - 1 + items.length) % items.length;
            showSlide(prev);
        };

        // 自动播放
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(nextSlide, 5000);
        };

        const stopAutoPlay = () => {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        };

        // 事件监听
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoPlay();
                prevSlide();
                startAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoPlay();
                nextSlide();
                startAutoPlay();
            });
        }

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoPlay();
                showSlide(index);
                startAutoPlay();
            });
        });

        // 鼠标悬停时暂停
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // 初始化
        showSlide(0);
        startAutoPlay();
    }

    // ---------- 互动模块 ----------
    initInteraction() {
        this.initMessageBoard();
        this.initFlowerTribute();
        this.initShareForm();
    }

    // 留言板
    initMessageBoard() {
        const form = document.getElementById('message-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const message = document.getElementById('message')?.value;

            if (!name || !email || !message) {
                this.showAlert('请填写完整的留言信息', 'warning');
                return;
            }

            // 创建留言元素
            const messagesList = document.querySelector('.messages-list');
            if (messagesList) {
                const messageItem = this.createMessageElement(name, message);
                messagesList.insertBefore(messageItem, messagesList.firstChild);
            }

            form.reset();
            this.showAlert('留言提交成功！', 'success');
        });
    }

    // 创建留言元素
    createMessageElement(name, content) {
        const item = document.createElement('div');
        item.className = 'message-item fade-in';
        
        const date = new Date().toLocaleDateString('zh-CN');
        
        item.innerHTML = `
            <div class="message-header">
                <span class="message-name">${this.escapeHtml(name)}</span>
                <span class="message-date">${date}</span>
            </div>
            <div class="message-content">
                ${this.escapeHtml(content)}
            </div>
        `;
        
        return item;
    }

    // 献花功能
    initFlowerTribute() {
        const flowerBtn = document.getElementById('flower-btn');
        const flowerCount = document.getElementById('flower-count');
        const flowerEffects = document.getElementById('flower-effects');

        if (!flowerBtn || !flowerCount) return;

        // 从本地存储加载献花数量
        const savedCount = localStorage.getItem('flowerCount') || 1258;
        flowerCount.textContent = savedCount;

        flowerBtn.addEventListener('click', () => {
            let count = parseInt(flowerCount.textContent);
            count += 1;
            flowerCount.textContent = count;

            // 保存到本地存储
            localStorage.setItem('flowerCount', count);

            // 添加动画
            flowerBtn.classList.add('active');
            setTimeout(() => flowerBtn.classList.remove('active'), 500);

            // 创建花朵特效
            if (flowerEffects) {
                this.createFlowerEffect(flowerEffects);
            }
        });
    }

    // 创建花朵特效
    createFlowerEffect(container) {
        const flowers = ['🌸', '🌺', '🌻', '🌷', '🌹', '💐'];
        const particleCount = 5;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'flower-particle';
            particle.textContent = flowers[Math.floor(Math.random() * flowers.length)];

            const angle = (Math.PI * 2 * i) / particleCount;
            const radius = 60;
            const x = Math.cos(angle) * radius + 120;
            const y = Math.sin(angle) * radius + 120;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';

            container.appendChild(particle);

            setTimeout(() => particle.remove(), 2000);
        }
    }

    // 分享表单
    initShareForm() {
        const form = document.getElementById('share-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('share-name')?.value;
            const title = document.getElementById('share-title')?.value;
            const content = document.getElementById('share-content')?.value;

            if (!name || !title || !content) {
                this.showAlert('请填写完整的感悟信息', 'warning');
                return;
            }

            // 创建分享元素
            const sharesList = document.querySelector('.shares-list');
            if (sharesList) {
                const shareItem = this.createShareElement(name, title, content);
                sharesList.insertBefore(shareItem, sharesList.firstChild);
            }

            form.reset();
            this.showAlert('感悟提交成功！', 'success');
        });
    }

    // 创建分享元素
    createShareElement(name, title, content) {
        const item = document.createElement('div');
        item.className = 'share-item fade-in';
        
        const date = new Date().toLocaleDateString('zh-CN');
        
        item.innerHTML = `
            <div class="share-header">
                <h4 class="share-title">${this.escapeHtml(title)}</h4>
                <div class="share-meta">
                    <span class="share-name">${this.escapeHtml(name)}</span>
                    <span class="share-date">${date}</span>
                </div>
            </div>
            <div class="share-content">
                ${this.escapeHtml(content)}
            </div>
            <div class="share-actions">
                <button class="like-btn"><i class="far fa-heart"></i> <span>0</span></button>
                <button class="comment-btn"><i class="far fa-comment"></i> <span>0</span></button>
            </div>
        `;
        
        return item;
    }

    // ---------- 滚动效果模块 ----------
    initScrollEffects() {
        // 返回顶部按钮
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('active');
                } else {
                    backToTopBtn.classList.remove('active');
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // 滚动淡入效果
        this.observeElements();
    }

    // 观察元素进入视口
    observeElements() {
        const elements = document.querySelectorAll('.fade-in-on-scroll');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            elements.forEach(el => observer.observe(el));
        } else {
            // 不支持IntersectionObserver时直接显示
            elements.forEach(el => el.classList.add('fade-in'));
        }
    }

    // ---------- 搜索模块 ----------
    initSearch() {
        const desktopForm = document.getElementById('search-form');
        const mobileForm = document.getElementById('mobile-search-form');

        if (desktopForm) {
            desktopForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.getElementById('search-input');
                this.performSearch(input.value);
            });
        }

        if (mobileForm) {
            mobileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.getElementById('mobile-search-input');
                this.performSearch(input.value);
            });
        }
    }

    // 执行搜索
    performSearch(keyword) {
        if (!keyword.trim()) {
            this.showAlert('请输入搜索关键词', 'warning');
            return;
        }

        // TODO: 实际搜索逻辑
        console.log('搜索关键词:', keyword);
        this.showAlert(`正在搜索: ${keyword}`, 'info');
    }

    // ---------- 工具方法 ----------
    
    // HTML转义
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 显示提示信息
    showAlert(message, type = 'info') {
        // 简单的alert实现，可以后续优化为更美观的提示框
        alert(message);
    }
}

// ========== 花朵动画样式（如果不在CSS中） ==========
const flowerParticleStyle = document.createElement('style');
flowerParticleStyle.textContent = `
    .flower-particle {
        position: absolute;
        font-size: 1.5rem;
        opacity: 0;
        animation: flowerFloat 2s ease-out forwards;
        pointer-events: none;
    }

    @keyframes flowerFloat {
        0% {
            opacity: 1;
            transform: translateY(0) scale(0.5);
        }
        50% {
            opacity: 0.8;
            transform: translateY(-30px) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-60px) scale(0.5);
        }
    }

    .flower-btn.active {
        animation: flowerBtnPulse 0.5s ease;
    }

    @keyframes flowerBtnPulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(flowerParticleStyle);

// ========== 初始化应用 ==========
const app = new MemorialSiteApp();

