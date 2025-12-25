/* ================================
   HEADER INJECTION SCRIPT (HOVER ANIMATION)
   ================================
   Implementation:
   - Uses CSS :hover for instant "sudden" appearance.
   - Restores smooth opacity/scale transitions.
   - Includes invisible bridge to prevent closing when moving mouse from button to menu.
*/

(function () {
    function injectHeader() {
        // 1. INJECT HOVER STYLES
        // We use :hover on the wrapper to trigger the content. 
        // We also add a pseudo-element ::after to bridge the gap between button and menu so hover isn't lost.
        if (!document.getElementById('header-styles')) {
            const css = `
            /* Wrapper needs relative to position the dropdown */
            .nav-dropdown-wrapper {
                position: relative;
                display: flex;
                align-items: center;
                height: 100%; /* Full height to help hover area */
            }

            /* The content box */
            .nav-dropdown-content {
                opacity: 0;
                visibility: hidden;
                transform: scale(0.95);
                transform-origin: top right;
                transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
                /* Positioned absolute relative to wrapper */
                position: absolute;
                right: 0;
                top: 100%; 
                margin-top: 5px; /* Small gap */
            }

            /* HOVER STATE: When wrapper is hovered, show content */
            .nav-dropdown-wrapper:hover .nav-dropdown-content {
                opacity: 1 !important;
                visibility: visible !important;
                transform: scale(1) !important;
            }

            /* Rotate chevron on hover */
            .nav-dropdown-wrapper:hover .nav-chevron {
                transform: rotate(180deg);
            }

            /* Invisible bridge to prevent flickering when moving mouse across the gap */
            .nav-dropdown-wrapper::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                height: 15px; /* Covers the margin gap */
                background: transparent;
            }
            `;
            const style = document.createElement('style');
            style.id = 'header-styles';
            style.textContent = css;
            document.head.appendChild(style);
        }

        // 2. HEADER HTML
        const headerHTML = `
        <header style="background: white; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 50; width: 100%; font-family: sans-serif;">
            <div style="max-width: 1280px; margin: 0 auto; padding: 0 16px;">
                <div style="display: flex; justify-content: space-between; height: 64px; align-items: center;">
                    
                    <!-- LOGO -->
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <a href="index.html" style="display: flex; align-items: center; gap: 12px; text-decoration: none; color: inherit;">
                            <div style="padding: 8px; background-color: #2563eb; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                <svg style="width: 24px; height: 24px; color: white;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                            </div>
                            <span style="font-weight: 900; font-size: 20px; color: #1e293b; letter-spacing: -0.025em;">Batch Code <span style="color: #2563eb;">Pro</span></span>
                        </a>
                    </div>

                    <!-- RIGHT NAV ACTIONS -->
                    <div style="display: flex; align-items: center; gap: 16px;">
                        
                        <!-- HOME BUTTON -->
                        <a href="index.html" class="group" style="display: flex; align-items: center; gap: 8px; text-decoration: none; padding: 8px 12px; border-radius: 8px; transition: background 0.2s;">
                            <svg style="width: 20px; height: 20px; color: #64748b;" fill="none" class="group-hover:text-blue-600" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                            <span style="font-size: 14px; font-weight: 700; color: #64748b;" class="hidden sm:inline">Home</span>
                        </a>

                        <!-- MENU DROPDOWN WRAPPER (Hover Trigger) -->
                        <div class="nav-dropdown-wrapper">
                            
                            <!-- MENU BUTTON -->
                            <button id="nav-dropdown-btn" style="
                                display: flex; 
                                align-items: center; 
                                gap: 8px; 
                                background-color: #f1f5f9; 
                                color: #334155; 
                                font-size: 14px; 
                                font-weight: 700; 
                                padding: 8px 16px; 
                                border-radius: 9999px; 
                                border: 1px solid #e2e8f0; 
                                cursor: pointer;
                                transition: background 0.2s;
                            " onmouseover="this.style.backgroundColor='#e2e8f0'" onmouseout="this.style.backgroundColor='#f1f5f9'">
                                Menu
                                <svg class="nav-chevron" style="width: 16px; height: 16px; transition: transform 0.2s;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>

                            <!-- Dropdown Panel -->
                            <div class="nav-dropdown-content" style="
                                width: 280px; 
                                background: white; 
                                border-radius: 12px; 
                                border: 1px solid #e2e8f0;
                                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                                z-index: 9999;
                                overflow: hidden;
                            ">
                                <div style="padding: 8px 0;">
                                    
                                    <!-- ITEM 1 -->
                                    <a href="generator.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; text-decoration: none; border-bottom: 1px solid #f8fafc; transition: background 0.2s;" onmouseover="this.style.backgroundColor='#f1f5f9'" onmouseout="this.style.backgroundColor='transparent'">
                                        <div style="width: 40px; height: 40px; background-color: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #2563eb;">
                                            <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path></svg>
                                        </div>
                                        <div style="flex: 1;">
                                            <div style="font-size: 14px; font-weight: 700; color: #1e293b;">Barcode Tools</div>
                                            <div style="font-size: 11px; color: #94a3b8;">Create & Manage Batches</div>
                                        </div>
                                    </a>

                                    <!-- ITEM 2 -->
                                    <a href="history.html" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; text-decoration: none; border-bottom: 1px solid #f8fafc; transition: background 0.2s;" onmouseover="this.style.backgroundColor='#f1f5f9'" onmouseout="this.style.backgroundColor='transparent'">
                                        <div style="width: 40px; height: 40px; background-color: #d1fae5; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #059669;">
                                            <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        </div>
                                        <div style="flex: 1;">
                                            <div style="font-size: 14px; font-weight: 700; color: #1e293b;">History</div>
                                            <div style="font-size: 11px; color: #94a3b8;">Past Projects</div>
                                        </div>
                                    </a>

                                    <!-- ITEM 3 -->
                                    <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; text-decoration: none; transition: background 0.2s;" onmouseover="this.style.backgroundColor='#f1f5f9'" onmouseout="this.style.backgroundColor='transparent'">
                                        <div style="width: 40px; height: 40px; background-color: #f1f5f9; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #64748b;">
                                            <svg style="width: 20px; height: 20px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        </div>
                                        <div style="flex: 1;">
                                            <div style="font-size: 14px; font-weight: 700; color: #1e293b;">Settings</div>
                                            <div style="font-size: 11px; color: #94a3b8;">Account Preferences</div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        `;

        // 3. REMOVE & INJECT
        const existingHeaders = document.querySelectorAll('header');
        existingHeaders.forEach(h => h.remove());

        const container = document.createElement('div');
        container.innerHTML = headerHTML;

        if (document.body) {
            document.body.prepend(container);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectHeader);
    } else {
        injectHeader();
    }
})();
