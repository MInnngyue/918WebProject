// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏功能
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // 移动端菜单切换
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
    
    // 移动端菜单项点击后关闭菜单
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
        });
    });
    
    // 轮播图功能
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;
    let interval;
    
    // 初始化轮播图
    function initCarousel() {
        showSlide(0);
        startAutoSlide();
    }
    
    // 显示指定索引的轮播图
    function showSlide(index) {
        // 隐藏所有轮播项
        carouselItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // 重置所有指示器
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // 显示当前轮播项和指示器
        carouselItems[index].classList.add('active');
        indicators[index].classList.add('active');
        
        // 更新当前索引
        currentIndex = index;
    }
    
    // 开始自动轮播
    function startAutoSlide() {
        interval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % carouselItems.length;
            showSlide(nextIndex);
        }, 5000);
    }
    
    // 停止自动轮播
    function stopAutoSlide() {
        clearInterval(interval);
    }
    
    // 上一张按钮点击事件
    prevBtn.addEventListener('click', function() {
        stopAutoSlide();
        let prevIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(prevIndex);
        startAutoSlide();
    });
    
    // 下一张按钮点击事件
    nextBtn.addEventListener('click', function() {
        stopAutoSlide();
        let nextIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(nextIndex);
        startAutoSlide();
    });
    
    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });
    
    // 鼠标悬停时停止自动轮播
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // 活动筛选功能
    const filterBtns = document.querySelectorAll('.filter-btn');
    const activityCards = document.querySelectorAll('.activity-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // 添加当前按钮的active类
            this.classList.add('active');
            
            // 获取筛选类别
            const filter = this.getAttribute('data-filter');
            
            // 筛选活动卡片
            activityCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // 留言板功能
    const messageForm = document.getElementById('message-form');
    const messagesList = document.querySelector('.messages-list');
    
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // 简单验证
        if (!name || !email || !message) {
            alert('请填写完整的留言信息');
            return;
        }
        
        // 创建新留言元素
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        
        // 获取当前日期
        const now = new Date();
        const dateString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        
        // 设置留言内容
        messageItem.innerHTML = `
            <div class="message-header">
                <span class="message-name">${name}</span>
                <span class="message-date">${dateString}</span>
            </div>
            <div class="message-content">
                ${message}
            </div>
        `;
        
        // 添加到留言列表的顶部
        messagesList.insertBefore(messageItem, messagesList.firstChild);
        
        // 重置表单
        messageForm.reset();
        
        // 显示成功提示
        alert('留言提交成功！');
    });
    
    // 献花功能
    const flowerBtn = document.getElementById('flower-btn');
    const flowerCount = document.getElementById('flower-count');
    const flowerEffects = document.getElementById('flower-effects');
    
    flowerBtn.addEventListener('click', function() {
        // 获取当前献花数量
        let count = parseInt(flowerCount.textContent);
        
        // 增加献花数量
        count += 1;
        
        // 更新显示
        flowerCount.textContent = count;
        
        // 添加按钮动画效果
        flowerBtn.classList.add('active');
        setTimeout(() => {
            flowerBtn.classList.remove('active');
        }, 500);
        
        // 创建花朵特效
        createFlowerEffect();
        
        // 保存到本地存储
        localStorage.setItem('flowerCount', count);
    });
    
    // 创建花朵特效函数
    function createFlowerEffect() {
        const flowers = ['🌸', '🌺', '🌻', '🌷', '🌹', '💐'];
        const particleCount = 5;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'flower-particle';
            particle.textContent = flowers[Math.floor(Math.random() * flowers.length)];
            
            // 随机位置
            const angle = (Math.PI * 2 * i) / particleCount;
            const radius = 60;
            const x = Math.cos(angle) * radius + 120;
            const y = Math.sin(angle) * radius + 120;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            flowerEffects.appendChild(particle);
            
            // 动画结束后移除粒子
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }
    }
    
    // 从本地存储加载献花数量
    function loadFlowerCount() {
        const savedCount = localStorage.getItem('flowerCount');
        if (savedCount) {
            flowerCount.textContent = savedCount;
        }
    }
    
    // 返回顶部按钮
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 搜索功能
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const mobileSearchForm = document.getElementById('mobile-search-form');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    
    // 桌面端搜索
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performSearch(searchInput.value);
    });
    
    // 移动端搜索
    mobileSearchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performSearch(mobileSearchInput.value);
    });
    
    // 执行搜索
    function performSearch(keyword) {
        if (!keyword.trim()) {
            alert('请输入搜索关键词');
            return;
        }
        
        // 模拟搜索结果
        alert(`正在搜索: ${keyword}\n\n搜索功能将在后续版本中完善。`);
        
        // 重置搜索框
        searchInput.value = '';
        mobileSearchInput.value = '';
    }
    
    // 初始化
    initCarousel();
    loadFlowerCount();
});
