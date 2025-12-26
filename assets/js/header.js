(function () {
    function injectHeader() {
        // 1. Remove preload class to enable transitions
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.remove('preload');
            }, 100);
        });


        const headerHTML = `
        <header style="
            position: relative; 
            width: 100%;
            height: 80px; /* Increased height for modern feel */
            background: transparent; 
            transition: background 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 10000;
        ">
            <div style="
                max-width: 1280px; 
                margin: 0 auto; 
                padding: 0 24px; 
                height: 100%; 
                display: flex; 
                align-items: center; 
                justify-content: space-between;
            ">
                <a href="index.html" style="display: flex; align-items: center; gap: 12px; text-decoration: none;">
                    <div style="padding: 10px; background-color: #2563eb; border-radius: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);">
                        <svg style="width: 24px; height: 24px; color: white;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                    </div>
                    <span style="font-weight: 800; font-size: 22px; color: var(--text-primary); letter-spacing: -0.025em;">Batch <span style="color: #2563eb;">Code</span></span>
                </a>

                <!-- Grouped Control Card -->
                <div class="header-control-card">
                    <!-- 1. Home Button -->
                    <a href="index.html" class="magnetic-btn" style="
                        display: flex; 
                        align-items: center; 
                        gap: 10px; 
                        text-decoration: none; 
                        padding: 8px 16px; 
                        border-radius: 12px; 
                        font-size: 15px; 
                        font-weight: 600; 
                        color: var(--text-secondary);
                        transition: color 0.2s, background 0.2s;
                        position: relative;
                        overflow: hidden;
                    ">
                        Home
                    </a>

                    <!-- 2. Menu Button -->
                    <div class="nav-dropdown-wrapper">
                        <button class="magnetic-btn" style="
                            display: flex; 
                            align-items: center; 
                            gap: 10px; 
                            background: transparent;
                            color: var(--text-primary); 
                            font-size: 15px; 
                            font-weight: 600; 
                            padding: 8px 16px; 
                            border-radius: 12px; 
                            border: none;
                            cursor: pointer;
                            transition: var(--text-primary) 0.2s;
                            position: relative;
                            overflow: hidden;
                        ">
                            Menu
                            <svg style="width: 14px; height: 14px; margin-top: 1px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>
                        </button>

                        <div class="nav-dropdown-content" style="
                            width: 280px; 
                            border-radius: 16px; 
                            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                            z-index: 9999;
                            overflow: hidden;
                            top: 130%;
                        ">
                            <div style="padding: 8px 0;">
                                <a href="generator.html" style="display: flex; align-items: center; gap: 14px; padding: 14px 18px; text-decoration: none; border-bottom: 1px solid var(--border-color); transition: background 0.2s;">
                                    <div style="width: 44px; height: 44px; background-color: rgba(37, 99, 235, 0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #2563eb;">
                                        <svg style="width: 22px; height: 22px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                                    </div>
                                    <div style="flex: 1;">
                                        <div style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Barcode Tools</div>
                                        <div style="font-size: 12px; color: var(--text-secondary);">Create & Manage Batches</div>
                                    </div>
                                </a>
                                <a href="history.html" style="display: flex; align-items: center; gap: 14px; padding: 14px 18px; text-decoration: none; border-bottom: 1px solid var(--border-color); transition: background 0.2s;">
                                    <div style="width: 44px; height: 44px; background-color: rgba(5, 150, 105, 0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #059669;">
                                        <svg style="width: 22px; height: 22px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <div style="flex: 1;">
                                        <div style="font-size: 14px; font-weight: 700; color: var(--text-primary);">History</div>
                                        <div style="font-size: 12px; color: var(--text-secondary);">Past Projects</div>
                                    </div>
                                </a>
                                <a href="changelog.html" style="display: flex; align-items: center; gap: 14px; padding: 14px 18px; text-decoration: none; border-bottom: 1px solid var(--border-color); transition: background 0.2s;">
                                    <div style="width: 44px; height: 44px; background-color: rgba(99, 102, 241, 0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #6366f1;">
                                        <svg style="width: 22px; height: 22px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    </div>
                                    <div style="flex: 1;">
                                        <div style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Changelog</div>
                                        <div style="font-size: 12px; color: var(--text-secondary);">Version History</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- 3. Theme Toggle -->
                    <div id="theme-toggle" class="theme-toggle-container magnetic-btn">
                        <svg class="theme-toggle-icon icon-sun" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.364 17.636l-.707.707M6.364 6.364l-.707.707m12.728 12.728l-.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path>
                        </svg>
                        <svg class="theme-toggle-icon icon-moon" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </header>
        `;

        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.alignSelf = 'stretch';
        container.style.position = 'relative';
        container.style.zIndex = '10000';
        container.innerHTML = headerHTML;
        document.body.prepend(container);

        // --- ANTI-GRAVITY PHYSICS & LOGIC ---
        // Select all magnetic buttons
        const buttons = document.querySelectorAll('.magnetic-btn');

        buttons.forEach(btn => {
            let targetX = 0, targetY = 0;
            let currentX = 0, currentY = 0;
            let requestId = null;

            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const distX = e.clientX - centerX;
                const distY = e.clientY - centerY;

                // Sensitivity
                targetX = distX * 0.2;
                targetY = distY * 0.2;

                if (!requestId) {
                    requestId = requestAnimationFrame(animate);
                }
            });

            btn.addEventListener('mouseleave', () => {
                targetX = 0;
                targetY = 0;
            });

            function animate() {
                // Inertia ease
                currentX += (targetX - currentX) * 0.1;
                currentY += (targetY - currentY) * 0.1;

                btn.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

                const dist = Math.sqrt((targetX - currentX) ** 2 + (targetY - currentY) ** 2);
                if (dist > 0.1 || Math.abs(targetX) > 0.1) {
                    requestId = requestAnimationFrame(animate);
                } else {
                    requestId = null;
                    btn.style.transform = `translate3d(0, 0, 0)`;
                }
            }
        });

        // Theme Toggle Logic
        function setTheme(isDark) {
            if (isDark) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        }

        // Initialize state
        const savedTheme = localStorage.getItem('theme');
        // Default to LIGHT if no preference (removed system preference check for dark default)
        if (savedTheme === 'dark') {
            setTheme(true);
        } else {
            setTheme(false); // Ensure light mode is active by default
        }

        // Re-attach event listener to the correct ID in the new HTML
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                const isDark = !document.documentElement.classList.contains('dark');
                setTheme(isDark);

                // Add radiation effect
                toggle.classList.remove('radiating');
                void toggle.offsetWidth; // trigger reflow
                toggle.classList.add('radiating');
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectHeader);
    } else {
        injectHeader();
    }
})();
