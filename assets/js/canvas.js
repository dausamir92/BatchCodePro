/* ================================
   CANVAS RENDERING LOGIC
   ================================
   Handles the drawing, zooming, and layout of the canvas.
*/

// Recalculates the box dimensions based on settings
function updateLayout() {
    const pad = parseInt(state.padding), gap = 5; // Parse padding
    const text = state.dataList[state.previewIndex] || "EXAMPLE123"; // Get current text or default
    const contentW = state.codeType === 'code128' ? state.bcWidth : state.qrRatio; // Determine content width based on type
    const textRatio = (state.codeType === 'code128' ? 0.06 : 0.20) * (state.textScale / 100); // Calculate text sizing ratio
    const fontSize = Math.floor(contentW * textRatio); // Calculate font size
    ctx.font = `bold ${Math.max(8, fontSize)}px ${state.font}`; // Set canvas font
    const textW = ctx.measureText(text).width; // Measure text width
    let boxW = Math.max(contentW + (pad * 2), textW + (pad * 2)); // Calculate box width
    state.box.w = boxW; // Update box width in state
    // Calculate box height based on type
    state.box.h = (state.codeType === 'code128') ? (pad + state.bcHeight + gap + (fontSize * 1.2) + 2) : (pad + state.qrRatio + gap + (fontSize * 1.2) + pad);
    // If no background image, set canvas size to fit box
    if (!state.bgImage) { state.canvasWidth = state.box.w + 20; state.canvasHeight = state.box.h + 20; state.box.x = 10; state.box.y = 10; }
    updateZoom(); // Update zoom settings
}

// Updates the visual zoom level of the canvas
function updateZoom() {
    if (state.zoomMode === 'fit') { // If fit mode
        // Calculate zoom to fit container
        state.zoomLevel = Math.min(els.container.clientWidth / state.canvasWidth, els.container.clientHeight / state.canvasHeight, 1.0);
        els.zoomDisplay.textContent = "Fit"; // Update display
    } else { els.zoomDisplay.textContent = Math.round(state.zoomLevel * 100) + "%"; } // Show percentage
    els.canvas.style.width = (state.canvasWidth * state.zoomLevel) + "px"; // Apply width
    els.canvas.style.height = (state.canvasHeight * state.zoomLevel) + "px"; // Apply height
}

// Main rendering loop: draws background, box, barcode/QR, and text
// Main rendering loop: draws background, box, barcode/QR, and text
function render() {
    els.canvas.width = state.canvasWidth; els.canvas.height = state.canvasHeight; // Set canvas size
    ctx.clearRect(0, 0, els.canvas.width, els.canvas.height); // Clear canvas
    if (state.bgImage) ctx.drawImage(state.bgImage, 0, 0); // Draw background if set
    const text = state.dataList[state.previewIndex] || "EXAMPLE123"; // Get text to render
    const { x, y, w, h } = state.box; // Get box coordinates and size
    ctx.fillStyle = "#FFFFFF"; ctx.fillRect(x, y, w, h); // Draw white box background
    const contentW = state.codeType === 'code128' ? state.bcWidth : state.qrRatio; // Get content width
    try {
        const temp = document.createElement('canvas'); // Temp canvas for code generation
        // Generate code on temp canvas
        bwipjs.toCanvas(temp, { bcid: (state.codeType === 'code128' ? 'code128' : 'qrcode'), text: text, scale: 3, height: 10, includetext: false, barcolor: state.color.substring(1) });
        // Draw code on main canvas
        ctx.drawImage(temp, x + (w - contentW) / 2, y + state.padding, contentW, (state.codeType === 'code128' ? state.bcHeight : state.qrRatio));
    } catch (e) { } // Ignore generation errors
    ctx.fillStyle = state.color; ctx.textAlign = 'center'; ctx.textBaseline = 'top'; // Set text styles
    const fs = Math.floor(contentW * (state.codeType === 'code128' ? 0.06 : 0.20) * (state.textScale / 100)); // Calculate font size
    ctx.font = `bold ${Math.max(8, fs)}px ${state.font}`; // Set font
    // Draw text
    ctx.fillText(text, x + w / 2, y + state.padding + (state.codeType === 'code128' ? state.bcHeight : state.qrRatio) + 5);
    ctx.strokeStyle = "#2563eb"; ctx.lineWidth = 2 / state.zoomLevel; ctx.strokeRect(x, y, w, h); // Draw selection rectangle
    ctx.fillStyle = "#2563eb"; ctx.beginPath(); ctx.arc(x + w, y + h, 6 / state.zoomLevel, 0, Math.PI * 2); ctx.fill(); // Draw resize handle
}

// Renders the list of generated codes in the sidebar
// Renders the list of generated codes in the sidebar
function renderBatchList() {
    els.batchList.innerHTML = ''; els.batchCount.textContent = state.dataList.length + " items"; // Update count
    state.dataList.forEach((item, i) => {
        const d = document.createElement('div'); // Create element
        // Set classes
        d.className = `p-3 text-xs border-b border-slate-50 preview-item font-bold text-slate-600 flex items-center gap-3 ${i === state.previewIndex ? 'selected' : ''}`;
        d.innerHTML = `<span class="opacity-30 text-[10px] w-6">${i + 1}</span> ${item}`; // Set inner HTML
        // Click handler
        d.onclick = () => { state.previewIndex = i; renderBatchList(); updateLayout(); render(); };
        els.batchList.appendChild(d); // Append to list
    });
}
