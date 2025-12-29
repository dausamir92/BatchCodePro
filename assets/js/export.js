/* ================================
   EXPORT LOGIC
   ================================
   Handles ZIP and Excel export functionality.
*/

// --- ZIP EXPORT ---
els.btnDownload.onclick = async () => {
    els.modal.classList.remove('hidden'); // Show loading modal
    els.progress.style.width = "0%";
    els.progLabel.textContent = "Packing...";

    const zip = new JSZip(), total = state.dataList.length, off = document.createElement('canvas'), octx = off.getContext('2d');

    // Fixed 3000ms duration
    const targetDuration = 3000;
    const updateEvery = Math.max(1, Math.floor(total / 60)); // ~60 frames
    const stepDelay = targetDuration / (total / updateEvery);

    for (let i = 0; i < total; i++) {
        // Pacing logic: Yield to UI
        if (i % updateEvery === 0 || i === total - 1) {
            if (stepDelay > 0) await new Promise(r => setTimeout(r, stepDelay));
            els.progress.style.width = ((i + 1) / total * 100) + "%";
            els.progLabel.textContent = `${i + 1}/${total}`;
        }

        state.previewIndex = i; updateLayout(); // Update state for current item
        const text = state.dataList[i]; // Get text
        off.width = state.canvasWidth; off.height = state.canvasHeight; // Set offscreen size
        if (state.bgImage) octx.drawImage(state.bgImage, 0, 0); // Draw background
        octx.fillStyle = "#FFFFFF"; octx.fillRect(state.box.x, state.box.y, state.box.w, state.box.h); // Draw white box
        const cw = state.codeType === 'code128' ? state.bcWidth : state.qrRatio; // Get content width
        try {
            const tmp = document.createElement('canvas'); // Temp canvas
            bwipjs.toCanvas(tmp, { bcid: state.codeType, text: text, scale: 3, height: 10, barcolor: state.color.substring(1) }); // Generate code
            octx.drawImage(tmp, state.box.x + (state.box.w - cw) / 2, state.box.y + state.padding, cw, (state.codeType === 'code128' ? state.bcHeight : state.qrRatio)); // Draw code
        } catch (e) { }
        octx.fillStyle = state.color; octx.textAlign = 'center'; octx.textBaseline = 'top'; // Text styles
        const fs = Math.floor(cw * (state.codeType === 'code128' ? 0.06 : 0.20) * (state.textScale / 100)); // Font size
        octx.font = `bold ${Math.max(8, fs)}px ${state.font}`; // Font set
        octx.fillText(text, state.box.x + state.box.w / 2, state.box.y + state.padding + (state.codeType === 'code128' ? state.bcHeight : state.qrRatio) + 5); // Draw text
        zip.file(`${text}.png`, await new Promise(res => off.toBlob(res))); // Add file to zip
    }

    const content = await zip.generateAsync({ type: "blob" });
    await saveFile(content, "Batch_Images.zip", "application/zip");
    els.modal.classList.add('hidden'); // Hide modal
};

/**
 * Helper to save file using File System Access API if available, else fallback.
 * @param {Blob} blob 
 * @param {string} filename 
 * @param {string} mimeType 
 */
async function saveFile(blob, filename, mimeType) {
    // Try File System Access API (Chrome/Edge desktop)
    if (window.showSaveFilePicker) {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: filename,
                types: [{
                    description: 'Files',
                    accept: { [mimeType]: ['.' + filename.split('.').pop()] },
                }],
            });
            const writable = await handle.createWritable();
            await writable.write(blob);
            await writable.close();
            return;
        } catch (err) {
            // User cancelled or not supported in context, fallback
            if (err.name !== 'AbortError') console.error("FSA API Error:", err);
            // Fallthrough to downloadBlob
        }
    }
    // Fallback
    window.downloadBlob(blob, filename);
}

// --- EXCEL EXPORT ---
els.btnDownloadExcel.onclick = async () => {
    if (state.dataList.length === 0 || state.dataList[0] === "YOURCODESHOWHERE") { showMessage("No Data", "Generate codes first."); return; }

    // Prepare Data - Append space to FORCE Left Alignment (The "Space Hack")
    const data = state.dataList.map((code, idx) => ({
        "No": (idx + 1).toString() + " ",
        "Batch Code": code.toString() + " ",
        "Type": state.codeType + " ",
        "Date": new Date().toLocaleString() + " "
    }));

    const ws = XLSX.utils.json_to_sheet(data);

    // 1. Dynamic Auto-Fit Columns
    // Calculate max width for each column based on content
    const colWidths = [];
    const keys = Object.keys(data[0]);

    keys.forEach((key, i) => {
        let maxLen = key.length; // Start with header length
        data.forEach(row => {
            const cellVal = row[key] ? row[key].toString() : "";
            if (cellVal.length > maxLen) maxLen = cellVal.length;
        });
        colWidths.push({ wch: maxLen + 2 }); // Add buffer padding
    });

    ws['!cols'] = colWidths;

    // 2. Force Left Alignment & Text Format
    // Even if styles are stripped, the trailing space forces Excel to treat as Text -> Left Align default
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cell_address = { c: C, r: R };
            const cell_ref = XLSX.utils.encode_cell(cell_address);

            if (!ws[cell_ref]) continue;

            // Ensure Style Object Exists
            if (!ws[cell_ref].s) ws[cell_ref].s = {};

            // Force Type to String
            ws[cell_ref].t = 's';
            ws[cell_ref].z = '@';

            // Explicit Left Alignment
            ws[cell_ref].s.alignment = {
                horizontal: "left",
                vertical: "center"
            };
        }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Codes");

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    await saveFile(blob, "Batch_List.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
};

// --- CSV EXPORT ---
els.btnDownloadCSV.onclick = async () => {
    if (state.dataList.length === 0 || state.dataList[0] === "YOURCODESHOWHERE") {
        showMessage("No Data", "Generate codes first.");
        return;
    }

    // Format:
    // Row 1: @@##Write Time:DDMMYYYY HHmmss
    // Row 2: Voucher / Coupon No
    // Row 3+: [Code]

    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');
    const timeStr = `${pad(now.getDate())}${pad(now.getMonth() + 1)}${now.getFullYear()} ${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

    let csvContent = `@@##Write Time:${timeStr}\n`;
    csvContent += `Voucher / Coupon No\n`;

    state.dataList.forEach(code => {
        csvContent += `${code}\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    await saveFile(blob, "Batch_List.csv", "text/csv");
};