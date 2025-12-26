const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const versionFile = path.join(__dirname, 'version.json');
const changelogFile = path.join(__dirname, 'changelog.html');

// Read version info
let versionData;
try {
    versionData = JSON.parse(fs.readFileSync(versionFile, 'utf8'));
} catch (e) {
    console.error("Error reading version.json:", e);
    process.exit(1);
}

const { version, date } = versionData;

// Get full commit message body from git
let commitBody = "";
try {
    commitBody = execSync('git log -1 --pretty=format:%b').toString().trim();
} catch (e) {
    console.warn("Could not fetch git log body:", e);
}

let changeItemsHtml = "";

// Helper to generate HTML line
const createLine = (type, text, colorClass = "bg-blue-100 text-blue-700") => `
                                <div class="flex items-start gap-3">
                                    <span style="display: inline-block; width: 70px;" class="px-2 py-0.5 ${colorClass} text-[10px] font-black rounded uppercase mt-0.5 text-center flex-shrink-0">${type}</span>
                                    <p class="text-sm text-slate-600 flex-1">${text}</p>
                                </div>`;

// STRATEGY 1: Parse Commit Body (if present)
const manualChanges = commitBody.split('\n').filter(line => line.trim().length > 0);

if (manualChanges.length > 0) {
    changeItemsHtml = manualChanges.map(line => {
        let type = "Changed";
        let colorClass = "bg-blue-100 text-blue-700";
        let text = line.replace(/^-\s*|\*\s*/, '').trim();

        if (text.toLowerCase().startsWith('add')) { type = "Added"; colorClass = "bg-emerald-100 text-emerald-700"; }
        else if (text.toLowerCase().startsWith('fix')) { type = "Fixed"; colorClass = "bg-amber-100 text-amber-800"; }
        else if (text.toLowerCase().startsWith('remove')) { type = "Removed"; colorClass = "bg-red-100 text-red-700"; }

        return createLine(type, text, colorClass);
    }).join('\n');

} else {
    // STRATEGY 2: Smart File Analysis (Fallback)
    console.log("No commit details found. Analyzing changed files...");

    let fileChanges = "";
    try {
        fileChanges = execSync('git show --name-status --format="" HEAD').toString().trim();
    } catch (e) {
        console.warn("Could not analyze file changes:", e);
    }

    const files = fileChanges.split('\n').filter(line => line.trim().length > 0);

    if (files.length === 0) {
        changeItemsHtml = createLine("Updated", "System maintenance update.");
    } else {
        // --- SMART DICTIONARY ---
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

        // Group by Module
        const modules = {};

        files.forEach(line => {
            const [status, ...pathParts] = line.split(/\s+/);
            const filePath = pathParts.join(' ');

            // Find match in dictionary
            let match = dictionary.find(d => d.pattern.test(filePath));

            // Default if no match
            let moduleName = "System Module";
            let description = `Modified ${path.basename(filePath)}`;

            if (match) {
                moduleName = match.module;
                description = match.desc;
            }

            // Determine Label
            let type = "Changed";
            let color = "bg-blue-100 text-blue-700";
            if (status.startsWith('A')) { type = "Added"; color = "bg-emerald-100 text-emerald-700"; }
            else if (status.startsWith('D')) { type = "Removed"; color = "bg-red-100 text-red-700"; }

            if (!modules[moduleName]) modules[moduleName] = [];

            // Avoid duplicates in the same module
            if (!modules[moduleName].some(m => m.text === description)) {
                modules[moduleName].push({ type, text: description, color });
            }
        });

        // Generate HTML per module
        changeItemsHtml = Object.keys(modules).map(moduleName => {
            const items = modules[moduleName].map(item => createLine(item.type, item.text, item.color)).join('\n');

            // Module Header + Items
            return `
                        <div>
                            <h3 style="display: inline-flex;" class="text-sm font-black text-slate-700 uppercase tracking-wide mb-4 inline-flex items-center gap-2">
                                <span class="w-2 h-2 bg-slate-500 rounded-full"></span>
                                <span style="border-color: #000000 !important;" class="pb-1 border-b-2 border-black">${moduleName}</span>
                            </h3>
                            <div class="space-y-2">
                                ${items}
                            </div>
                        </div>`;
        }).join('\n<br>\n'); // Add spacing between modules
    }
}

// Format date
const dateObj = new Date(date);
const options = { month: 'long', day: 'numeric', year: 'numeric' };
const formattedDate = dateObj.toLocaleDateString('en-US', options);

// Read changelog HTML
let html = fs.readFileSync(changelogFile, 'utf8');

// Check if version already exists to avoid duplicates
if (html.includes(`Version ${version}`)) {
    console.log(`Changelog entry for version ${version} already exists.`);
    process.exit(0);
}

// Template for new entry
const newEntry = `
                <!-- Version ${version} -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group hover:border-blue-400 transition-colors">
                    <div class="bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between group-hover:bg-blue-50/50 transition-colors">
                        <div>
                            <h2 class="text-lg font-black text-slate-900">Version ${version}</h2>
                            <p class="text-xs font-bold text-slate-500 uppercase tracking-wide mt-1">${formattedDate}</p>
                        </div>
                    </div>

                    <div class="p-6 space-y-8">
                        <div>
                            <h3 style="display: inline-flex;" class="text-sm font-black text-slate-700 uppercase tracking-wide mb-4 inline-flex items-center gap-2">
                                <span class="w-2 h-2 bg-slate-500 rounded-full"></span>
                                <span style="border-color: #000000 !important;" class="pb-1 border-b-2 border-black">System Update</span>
                            </h3>
                            <div class="space-y-2">
                                ${changeItemsHtml}
                            </div>
                        </div>
                    </div>
                </div>`;

// Insertion point: After the scrolling container start tag
const insertionMarker = '<div style="height: 65vh;" class="overflow-y-auto p-6 space-y-8 custom-scrollbar bg-slate-50/30">';
const insertIndex = html.indexOf(insertionMarker);

if (insertIndex === -1) {
    console.error("Could not find insertion point in changelog.html");
    process.exit(1);
}

// Insert new entry
const newHtml = html.slice(0, insertIndex + insertionMarker.length) + newEntry + html.slice(insertIndex + insertionMarker.length);

fs.writeFileSync(changelogFile, newHtml, 'utf8');
console.log(`Added detailed changelog entry for ${version}`);
