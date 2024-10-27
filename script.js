document.addEventListener('DOMContentLoaded', function() {
    const slider = {
        slideIndex: 0,
        slides: document.querySelectorAll('.slide'),
        prevButton: document.querySelector('.slider-prev'),
        nextButton: document.querySelector('.slider-next'),
        dotsContainer: document.querySelector('.slider-dots'),
        autoPlayInterval: null,

        init() {
            if (this.slides.length === 0) return; // 如果没有轮播图就返回
            
            // 创建导航圆点
            this.createDots();
            
            // 添加事件监听
            if (this.prevButton && this.nextButton) {
                this.prevButton.addEventListener('click', () => this.changeSlide(-1));
                this.nextButton.addEventListener('click', () => this.changeSlide(1));
            }
            
            // 自动播放
            this.startAutoPlay();
            
            // 鼠标悬停时暂停自动播放
            const sliderElement = document.querySelector('.slider');
            if (sliderElement) {
                sliderElement.addEventListener('mouseenter', () => this.stopAutoPlay());
                sliderElement.addEventListener('mouseleave', () => this.startAutoPlay());
            }
        },

        createDots() {
            if (!this.dotsContainer) return;
            
            for (let i = 0; i < this.slides.length; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => this.goToSlide(i));
                this.dotsContainer.appendChild(dot);
            }
        },

        changeSlide(direction) {
            this.slideIndex = (this.slideIndex + direction + this.slides.length) % this.slides.length;
            this.updateSlides();
        },

        goToSlide(index) {
            this.slideIndex = index;
            this.updateSlides();
        },

        updateSlides() {
            // 更新幻灯片显示
            this.slides.forEach(slide => slide.classList.remove('active'));
            this.slides[this.slideIndex].classList.add('active');
            
            // 更新导航圆点
            if (this.dotsContainer) {
                const dots = this.dotsContainer.querySelectorAll('.dot');
                dots.forEach(dot => dot.classList.remove('active'));
                dots[this.slideIndex].classList.add('active');
            }
        },

        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => this.changeSlide(1), 5000);
        },

        stopAutoPlay() {
            clearInterval(this.autoPlayInterval);
        }
    };

    // 初始化轮播图
    slider.init();
});

// 添加返回顶部功能
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    // 点击返回顶部
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// 添加登录验证功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取登录表单
    const loginForm = document.querySelector('.auth-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // 简单的登录验证
            if (username === '123' && password === '123') {
                // 保存登录状态和VIP信息到 localStorage
                const userInfo = {
                    isLoggedIn: true,
                    isVip: true,
                    vipExpireDate: '2024-12-31',
                    username: username
                };
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                alert('登录成功！');
                // 登录成功后跳转到首页
                window.location.href = 'index.html';
            } else {
                alert('用户名或密码错误！\n提示：用户名和密码都是123');
            }
        });
    }

    // 检查登录状态并更新界面
    updateUserInterface();
});

// 更新用户界面
function updateUserInterface() {
    const userActionsDiv = document.querySelector('.user-actions');
    if (!userActionsDiv) return; // 如果找不到元素就返回

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo && userInfo.isLoggedIn) {
        // 用户已登录，显示用户信息
        userActionsDiv.innerHTML = `
            <div class="user-profile">
                <div class="user-avatar">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="用户头像">
                    ${userInfo.isVip ? '<span class="vip-badge">VIP</span>' : ''}
                </div>
                <div class="user-info">
                    <span class="username">${userInfo.username}</span>
                    ${userInfo.isVip ? `<span class="vip-expire">VIP到期：${userInfo.vipExpireDate}</span>` : ''}
                </div>
                <button onclick="logout()" class="logout-btn">退出</button>
            </div>
        `;

        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .user-profile {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 0.5rem 1rem;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 25px;
                margin-left: 1rem;
            }

            .user-avatar {
                position: relative;
                width: 35px;
                height: 35px;
            }

            .user-avatar img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                border: 2px solid var(--primary-color);
            }

            .vip-badge {
                position: absolute;
                bottom: -5px;
                right: -5px;
                background: var(--gradient-1);
                color: white;
                font-size: 0.7rem;
                padding: 2px 6px;
                border-radius: 10px;
                border: 2px solid var(--dark-bg);
            }

            .user-info {
                display: flex;
                flex-direction: column;
                gap: 0.2rem;
            }

            .username {
                color: var(--text-primary);
                font-weight: 500;
                font-size: 0.9rem;
            }

            .vip-expire {
                color: var(--text-secondary);
                font-size: 0.75rem;
            }

            .logout-btn {
                padding: 0.3rem 0.8rem;
                border: 1px solid rgba(255, 255, 255, 0.2);
                background: transparent;
                color: var(--text-primary);
                border-radius: 15px;
                cursor: pointer;
                font-size: 0.85rem;
                transition: all 0.3s ease;
            }

            .logout-btn:hover {
                background: rgba(255, 255, 255, 0.1);
                border-color: var(--primary-color);
            }
        `;
        document.head.appendChild(style);
    } else {
        // 用户未登录，显示登录注册按钮
        userActionsDiv.innerHTML = `
            <a href="login.html" class="login-btn">登录</a>
            <a href="register.html" class="register-btn">注册</a>
        `;
    }
}

// 退出登录
function logout() {
    localStorage.removeItem('userInfo');
    alert('已退出登录');
    window.location.reload();
}
