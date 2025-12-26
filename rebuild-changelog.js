const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const changelogFile = path.join(__dirname, 'changelog.html');

console.log("Fetching git history...");
// Get all commits: hash|date|subject
const logOutput = execSync('git log --format="%h|%ad|%s" --date=short').toString().trim();
const commits = logOutput.split('\n');

// Smart Dictionary
const dictionary = [
    { pattern: /generator\.html/, module: 'Generator Module', desc: 'Refined Generator Interface structure and layout' },
    { pattern: /index\.html/, module: 'Dashboard Module', desc: 'Dashboard layout and navigation updates' },
    { pattern: /history\.html/, module: 'Core Module', desc: 'History view and record management updates' },
    { pattern: /changelog\.html/, module: 'System Module', desc: 'Updated version history documentation' },
    { pattern: /assets\/js\/events\.js/, module: 'Core Module', desc: 'Enhanced user interaction logic and event handling' },
    { pattern: /assets\/js\/ui\.js/, module: 'UI/UX Module', desc: 'Improved UI feedback mechanisms and animations' },
    { pattern: /assets\/js\/dom\.js/, module: 'System Module', desc: 'Optimized DOM element caching and performance' },
    { pattern: /assets\/js\/main\.js/, module: 'System Module', desc: 'Application initialization and state management' },
    { pattern: /assets\/css\/.*\.css/, module: 'UI/UX Module', desc: 'Visual styling, theme adjustments, and responsiveness' },
    { pattern: /version\.json/, module: 'System Module', desc: 'Version control configuration update' },
    { pattern: /package\.json/, module: 'System Module', desc: 'Refined project dependencies and build scripts' },
    { pattern: /.*\.bat|.*\.sh/, module: 'System Module', desc: 'Updated build and automation scripts' }
];

const createLine = (type, text, colorClass = "bg-blue-100 text-blue-700") => `
                                <div class="flex items-start gap-3">
                                    <span style="display: inline-block; width: 70px;" class="px-2 py-0.5 ${colorClass} text-[10px] font-black rounded uppercase mt-0.5 text-center flex-shrink-0">${type}</span>
                                    <p class="text-sm text-slate-600 flex-1">${text}</p>
                                </div>`;

let changelogEntriesHtml = "";

// Iterate commits in normal order (latest first)
for (const commitLine of commits) {
    const [hash, date, subject] = commitLine.split('|');

    // Filter out intermediate commits if they don't look like versions, 
    // BUT user asked for "All from start up to date based on git".
    // We will treat every commit as a release if it has a version-like name,
    // OR just process all of them. 
    // Given the user history, they name versions "1.11...", "ver 1.03", etc.
    // Let's try to extract a clean version number.

    let version = subject;
    // Simple cleanup: strictly take the subject as the title

    // Skip 'initial commit' if it has no changes (unlikely) or just handle it.

    console.log(`Processing ${hash}: ${subject}`);

    // Get file changes for this commit
    let fileChanges = "";
    try {
        fileChanges = execSync(`git show --name-status --format="" ${hash}`).toString().trim();
    } catch (e) {
        console.warn(`Could not get changes for ${hash}`);
        continue;
    }

    const files = fileChanges.split('\n').filter(line => line.trim().length > 0);
    let itemsHtml = "";

    if (files.length === 0) {
        itemsHtml = createLine("Updated", "Maintenance update");
    } else {
        // Analysis
        const modules = {};

        files.forEach(line => {
            const [status, ...pathParts] = line.split(/\s+/);
            const filePath = pathParts.join(' ');

            let match = dictionary.find(d => d.pattern.test(filePath));
            let moduleName = "System Module";
            let description = `Modified ${path.basename(filePath)}`;

            if (match) {
                moduleName = match.module;
                description = match.desc;
            }

            let type = "Changed";
            let color = "bg-blue-100 text-blue-700";
            if (status.startsWith('A')) { type = "Added"; color = "bg-emerald-100 text-emerald-700"; }
            else if (status.startsWith('D')) { type = "Removed"; color = "bg-red-100 text-red-700"; }
            else if (status.startsWith('M')) { type = "Changed"; color = "bg-blue-100 text-blue-700"; }

            if (!modules[moduleName]) modules[moduleName] = [];
            if (!modules[moduleName].some(m => m.text === description)) {
                modules[moduleName].push({ type, text: description, color });
            }
        });

        itemsHtml = Object.keys(modules).map(moduleName => {
            const lines = modules[moduleName].map(item => createLine(item.type, item.text, item.color)).join('\n');
            return `
                        <div>
                            <h3 style="display: inline-flex;" class="text-sm font-black text-slate-700 uppercase tracking-wide mb-4 inline-flex items-center gap-2">
                                <span class="w-2 h-2 bg-slate-500 rounded-full"></span>
                                <span style="border-color: #000000 !important;" class="pb-1 border-b-2 border-black">${moduleName}</span>
                            </h3>
                            <div class="space-y-2">
                                ${lines}
                            </div>
                        </div>`;
        }).join('\n<br>\n');
    }

    // Format Date
    const dateObj = new Date(date);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);

    // Build Entry
    const entryHtml = `
                <!-- Commit ${hash} -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:border-blue-400 transition-colors">
                    <div class="bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between group-hover:bg-blue-50/50 transition-colors">
                        <div>
                            <h2 class="text-lg font-black text-slate-900">${subject}</h2>
                            <p class="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">${formattedDate}</p>
                        </div>
                    </div>

                    <div class="p-6 space-y-8">
                        ${itemsHtml}
                    </div>
                </div>`;

    changelogEntriesHtml += entryHtml + "\n";
}

// Reconstruct the file
// We need the header and footer from the original file (or a template)
// For safety, let's read the current file and just replace the container content.
const currentContent = fs.readFileSync(changelogFile, 'utf8');

// Find container to replace
// We use the same marker as the update script
const containerStartMarker = '<div style="height: 65vh;" class="overflow-y-auto p-6 space-y-8 custom-scrollbar bg-slate-50/30">';
const containerEndMarker = '</div>\n        </div>';
// Note: End marker is tricky because of nested divs. 
// Safer strategy: Use Last Index of </div> </div> and hope for the best? 
// Or just hardcode the known footer structure.

// Let's rely on splitting by the start marker.
const parts = currentContent.split(containerStartMarker);
if (parts.length < 2) {
    console.error("Structure mismatch");
    process.exit(1);
}

const headerPart = parts[0] + containerStartMarker;
// accurate footer part is tricky. 
// Let's assume the Footer Script starts at <script src="./assets/js/footer.js"></script>
// and work backwards to find the closing divs.
const footerMarker = '        </div>\n    </main>';
const footerParts = currentContent.split(footerMarker);
const footerPart = footerMarker + (footerParts[1] || "");

const newContent = headerPart + "\n" + changelogEntriesHtml + "\n            </div>" + footerPart;
// Adjusting: footerPart usually closes the main. 
// The structure is: 
// <container>
//    <entries...>
// </container>
// </div> (this closes valid outer div)
// </main>

// Actually, let's just use the `footerPart` as starting from `    </main>`
// And manually close the divs we opened.

const safeFooter = `
            </div>
        </div>
    </main>
    <script src="./assets/js/footer.js"></script>
    <script>
        function updateChangelogHeader(data) {
             const titleEl = document.getElementById('latest-version-title');
             const dateEl = document.getElementById('latest-version-date');
             if (titleEl && data.version) titleEl.textContent = 'Version ' + data.version;
             if (dateEl && data.date) {
                 const d = new Date(data.date);
                 dateEl.textContent = d.toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'});
             }
        }
        // ... (rest of simple script not strictly needed if we hardcode everything, but good to keep)
    </script>
    <script src="./assets/js/version.js"></script>
</body>
</html>`;

// Actually, easier to just read the file up to the container start, and append the new entries + a standard footer.
// Because parsing HTML with regex/split is fragile.

const finalHtml = parts[0] + containerStartMarker + "\n" + changelogEntriesHtml + "\n" + safeFooter;
fs.writeFileSync(changelogFile, finalHtml, 'utf8');
console.log("Changelog fully rebuilt!");
