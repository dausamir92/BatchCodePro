/* ================================
   EXPORT LOGIC
   ================================
   Handles ZIP and Excel export functionality.
*/

// --- ZIP EXPORT ---
// --- ZIP EXPORT ---
els.btnDownload.onclick = async () => {
    els.modal.classList.remove('hidden'); // Show loading modal
    const zip = new JSZip(), total = state.dataList.length, off = document.createElement('canvas'), octx = off.getContext('2d'); // Init zip and offscreen canvas
    for (let i = 0; i < total; i++) {
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
        els.progress.style.width = ((i + 1) / total * 100) + "%"; els.progLabel.textContent = `${i + 1}/${total}`; // Update progress
        await new Promise(r => setTimeout(r, 0)); // Yield to UI
    }
    saveAs(await zip.generateAsync({ type: "blob" }), `Batch_Images.zip`); // Save zip
    els.modal.classList.add('hidden'); // Hide modal
};

// --- EXCEL EXPORT ---
// --- EXCEL EXPORT ---
els.btnDownloadExcel.onclick = () => {
    if (state.dataList.length === 0 || state.dataList[0] === "YOURCODESHOWHERE") { showMessage("No Data", "Generate codes first."); return; } // Validation
    const data = state.dataList.map((code, idx) => ({ "No": idx + 1, "Batch Code": code, "Type": state.codeType, "Date": new Date().toLocaleString() })); // Format data
    const ws = XLSX.utils.json_to_sheet(data); // Create sheet
    const wb = XLSX.utils.book_new(); // Create workbook
    XLSX.utils.book_append_sheet(wb, ws, "Codes"); // Append sheet
    XLSX.writeFile(wb, `Batch_List.xlsx`); // Download file
};