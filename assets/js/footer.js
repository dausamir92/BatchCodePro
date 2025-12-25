/* ================================
   FOOTER INJECTION SCRIPT
   ================================
   This script executes immediately to inject the standard footer
   into the bottom of the document body.
   
   Usage: <script src="./assets/js/footer.js"></script>
*/

(function () {
    const footerHTML = `
    <footer class="bg-slate-50 border-t border-slate-200 pt-20 pb-12">
        <div class="max-w-7xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
                <div>
                    <h2
                        class="text-xl font-black text-slate-900 mb-6 uppercase tracking-widest border-b-2 border-blue-600 pb-1 text-center">
                        Developed By</h2>
                    <div class="flex items-center gap-4 group">
                        <div
                            class="w-14 h-14 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </div>
                        <div>
                            <p class="font-black text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
                                Firdaus Amir</p>
                            <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">Solo Developer</p>
                        </div>
                    </div>
                    <p class="mt-6 text-sm text-slate-500 leading-relaxed font-medium">I simply prompt the AI — no
                        coding knowledge involved. I just love creating useful tools.</p>
                </div>

                <div class="relative">
                    <h2
                        class="text-xl font-black text-slate-900 mb-6 uppercase tracking-widest border-b-2 border-indigo-600 pb-1 text-center">
                        Roadmap</h2>
                    <style>
                        .roadmap-scroll {
                            max-height: 200px;
                            overflow-y: auto;
                            padding-right: 8px;
                        }
                        .roadmap-scroll::-webkit-scrollbar {
                            width: 4px;
                        }
                        .roadmap-scroll::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .roadmap-scroll::-webkit-scrollbar-thumb {
                            background: #e2e8f0;
                            border-radius: 3px;
                        }
                        .roadmap-scroll::-webkit-scrollbar-thumb:hover {
                            background: #cbd5e1;
                        }
                    </style>
                    <div class="roadmap-scroll">
                        <div class="roadmap-line"></div>
                        <ul class="space-y-8 relative z-10">
                            <li class="flex items-start gap-4">
                                <div
                                    class="w-7 h-7 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0 border-2 border-white z-10">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clip-rule="evenodd"></path>
                                    </svg></div>
                                <div>
                                    <p
                                        class="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase mb-1">
                                        Released</p>
                                    <p class="text-sm font-black text-slate-800">Batch Engine Pro</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-4">
                                <div
                                    class="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0 border-2 border-white z-10 animate-pulse">
                                    <span class="text-xs font-bold">2</span></div>
                                <div>
                                    <p
                                        class="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase mb-1">
                                        Active Coding</p>
                                    <p class="text-sm font-black text-slate-800">Pro Designer Suite</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-4">
                                <div
                                    class="w-7 h-7 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center shrink-0 border-2 border-white z-10">
                                    <span class="text-xs font-bold">3</span></div>
                                <div class="opacity-70">
                                    <p
                                        class="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase mb-1">
                                        Planned</p>
                                    <p class="text-sm font-black text-slate-800">Workspace Sync</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-4">
                                <div
                                    class="w-7 h-7 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center shrink-0 border-2 border-white z-10">
                                    <span class="text-xs font-bold">4</span></div>
                                <div class="opacity-70">
                                    <p
                                        class="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase mb-1">
                                        Planned</p>
                                    <p class="text-sm font-black text-slate-800">Advanced Analytics</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-4">
                                <div
                                    class="w-7 h-7 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center shrink-0 border-2 border-white z-10">
                                    <span class="text-xs font-bold">5</span></div>
                                <div class="opacity-70">
                                    <p
                                        class="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase mb-1">
                                        Planned</p>
                                    <p class="text-sm font-black text-slate-800">Team Collaboration</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-4">
                                <div
                                    class="w-7 h-7 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center shrink-0 border-2 border-white z-10">
                                    <span class="text-xs font-bold">6</span></div>
                                <div class="opacity-70">
                                    <p
                                        class="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase mb-1">
                                        Planned</p>
                                    <p class="text-sm font-black text-slate-800">API Integration</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-4">
                                <div
                                    class="w-7 h-7 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center shrink-0 border-2 border-white z-10">
                                    <span class="text-xs font-bold">7</span></div>
                                <div class="opacity-70">
                                    <p
                                        class="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase mb-1">
                                        Planned</p>
                                    <p class="text-sm font-black text-slate-800">Mobile App</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-4">
                                <div
                                    class="w-7 h-7 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center shrink-0 border-2 border-white z-10">
                                    <span class="text-xs font-bold">8</span></div>
                                <div class="opacity-70">
                                    <p
                                        class="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase mb-1">
                                        Planned</p>
                                    <p class="text-sm font-black text-slate-800">Custom Templates</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-4">
                                <div
                                    class="w-7 h-7 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center shrink-0 border-2 border-white z-10">
                                    <span class="text-xs font-bold">9</span></div>
                                <div class="opacity-70">
                                    <p
                                        class="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase mb-1">
                                        Planned</p>
                                    <p class="text-sm font-black text-slate-800">Bulk Export Tools</p>
                                </div>
                            </li>
                            <li class="flex items-start gap-4">
                                <div
                                    class="w-7 h-7 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center shrink-0 border-2 border-white z-10">
                                    <span class="text-xs font-bold">10</span></div>
                                <div class="opacity-70">
                                    <p
                                        class="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase mb-1">
                                        Planned</p>
                                    <p class="text-sm font-black text-slate-800">Premium Support</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div>
                    <h2
                        class="text-xl font-black text-slate-900 mb-6 uppercase tracking-widest border-b-2 border-emerald-600 pb-1 text-center">
                        Feedback</h2>
                    <p class="text-sm text-slate-500 mb-6 font-medium">Please send your feedback directly to my email to
                        help improve this utility.</p>
                    <a href="mailto:dausamirwork@gmail.com"
                        class="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-all group font-bold">
                        <div
                            class="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                </path>
                            </svg>
                        </div>
                        <span class="text-xs font-black uppercase text-slate-700">Feedback Email</span>
                    </a>
                </div>

                <div>
                    <h2
                        class="text-xl font-black text-slate-900 mb-6 uppercase tracking-widest border-b-2 border-slate-400 pb-1 text-center">
                        System Status</h2>
                    <div class="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-3">
                        <div class="flex justify-between items-center"><span
                                class="text-xs font-black uppercase text-slate-400">Version</span><span
                                id="git-version"
                                class="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-black rounded-md">Loading...</span></div>
                        <div class="flex justify-between text-xs font-bold"><span class="text-slate-400 uppercase">Last
                                Build</span><span id="git-date" class="text-slate-800">Loading...</span></div>
                        <div class="flex justify-between text-xs font-bold"><span
                                class="text-slate-400 uppercase">Status</span><span
                                class="text-emerald-500">Online</span></div>
                        <div class="pt-3 border-t border-slate-100">
                            <a href="changelog.html" class="flex items-center justify-between text-xs font-bold hover:text-blue-600 transition-colors group">
                                <span class="text-slate-400 uppercase">Changelog</span>
                                <span class="flex items-center gap-1 text-blue-600" style="white-space: nowrap;">
                                    <span class="text-blue-600 group-hover:underline">View All</span>
                                    <svg class="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <p class="mt-20 text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] text-center">Batch Code Pro
                © 2025 | solo project by firdaus amir</p>
        </div>
    </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML); // Inject footer at bottom

    // Function to update DOM elements
    function updateVersionDisplay(data) {
        const versionEl = document.getElementById('git-version');
        const dateEl = document.getElementById('git-date');

        if (versionEl && data.version) {
            versionEl.textContent = `v${data.version}`;
        }

        if (dateEl && data.date) {
            const date = new Date(data.date);
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            dateEl.textContent = dateStr;
        }
    }

    // Attempt 1: Try loading version.js (Works for file:// protocol)
    const script = document.createElement('script');
    script.src = './assets/js/version.js';
    script.onload = function () {
        if (window.generatedVersion) {
            updateVersionDisplay(window.generatedVersion);
        }
    };
    script.onerror = function () {
        // Attempt 2: Fallback to fetch (Works for http:// server)
        fetch('version.json')
            .then(response => response.json())
            .then(data => updateVersionDisplay(data))
            .catch(() => {
                // Fallback defaults
                const versionEl = document.getElementById('git-version');
                const dateEl = document.getElementById('git-date');
                if (versionEl) versionEl.textContent = 'v1.06.251225';
                if (dateEl) dateEl.textContent = 'Dec 25, 2024';
            });
    };
    document.body.appendChild(script);

})();
