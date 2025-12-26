/* ================================
   EVENT LISTENERS
   ================================
   Handles all user interactions: clicks, changes, drags, etc.
*/

/* ================================
   HELPER: FORCE DOWNLOAD
   ================================ */
window.downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

/* ================================
   INPUT SANITATION
   ================================ */
// Strict enforcement: Block invalid keys (e, +, -, .) and paste non-digits
['genQty', 'genStart', 'genPadding', 'genRandLen', 'codePadding'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
        // Prevent typing non-digits
        el.addEventListener('keydown', (e) => {
            // Allow: backspace, delete, tab, escape, enter, ctrl+a, home, end, left, right
            if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });

        // Sanitize on blur (min value check)
        el.addEventListener('blur', () => {
            const min = parseInt(el.getAttribute('min')) || 0;
            if (!el.value || parseInt(el.value) < min) el.value = min;
        });
    }
});

/* ================================
   CANVAS FOCUS & ZOOM
================================ */
// Click event for container to activate canvas focus
els.container.addEventListener('click', (e) => {
    state.isCanvasActive = true; // Set active state
    els.container.classList.add('is-focused'); // Add visual focus class
    els.focusHint.innerHTML =
        'Zoom <span class="text-blue-600 font-bold">LOCKED TO CANVAS</span>'; // Update hint
    e.stopPropagation(); // Prevent bubbling
});

// Click event for document to deactivate canvas focus
document.addEventListener('click', () => {
    state.isCanvasActive = false; // Unset active state
    els.container.classList.remove('is-focused'); // Remove visual focus class
    els.focusHint.innerHTML =
        'Click canvas to <span class="text-blue-600 font-bold">ACTIVATE ZOOM</span>'; // Reset hint
});

// Wheel event for zooming
els.container.onwheel = (e) => {
    if (!state.isCanvasActive) return; // Only zoom if active
    e.preventDefault(); // Prevent page scroll
    state.zoomMode = 'manual'; // Switch to manual zoom
    state.zoomLevel *= (e.deltaY < 0 ? 1.1 : 0.9); // Adjust zoom level
    updateZoom(); // Reflect changes
};

/* ================================
   RESET & GENERATE
================================ */
// Reset button handler
els.btnResetAll.onclick = () => {
    showConfirm("Reset All", "Are you sure you want to <b>clear all data</b> and start over?<br>This action cannot be undone.", () => {
        state.dataList = ["YOURCODESHOWHERE"]; // Reset data
        state.previewIndex = 0; // Reset index
        state.bgImage = null; // Clear background

        renderBatchList(); // Re-render list
        updateLayout(); // Re-calc layout
        render(); // Re-draw canvas

        showAlert("Reset", "All data has been cleared.", false); // Show success message
    });
};

// Generate button handler
els.btnDoGen.onclick = async () => {
    els.modal.classList.remove('hidden'); // Show loading modal
    els.progress.style.width = "0%";
    els.progLabel.textContent = "Starting...";

    const arr = []; // Temp array
    const qty = parseInt(els.genQty.value) || 1; // Get quantity

    if (qty > 9999) {
        els.modal.classList.add('hidden'); // Hide loading modal
        showAlert("Limit Exceeded", "Maximum generation quantity is <b>9999</b>.<br>Please reduce the quantity.");
        return;
    }
    const pre = els.genPrefix.value || ""; // Get prefix
    const post = els.genPostfix.value || ""; // Get postfix
    const isSeq = els.genMethod.value === 'seq';

    // Prep variables for loop
    const start = parseInt(els.genStart.value) || 1;
    const pad = parseInt(els.genPadding.value) || 0;
    const len = parseInt(els.genRandLen.value) || 8;

    let cs = "";
    if (!isSeq) {
        cs = els.genCharset.value === 'num'
            ? "0123456789"
            : els.genCharset.value === 'custom'
                ? els.customChars.value
                : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    }

    // Fixed 3000ms duration per user request
    const targetDuration = 3000;
    // Aim for ~60 frames of animation for smoothness over 3s
    const updateEvery = Math.max(1, Math.floor(qty / 60));
    // Calculate delay per update step
    const stepDelay = targetDuration / (qty / updateEvery);

    for (let i = 0; i < qty; i++) {
        // Yield to UI based on calculated batch steps
        if (i % updateEvery === 0 || i === qty - 1) {
            if (stepDelay > 0) await new Promise(r => setTimeout(r, stepDelay));
            els.progress.style.width = ((i + 1) / qty * 100) + "%";
            els.progLabel.textContent = `Generating ${i + 1}/${qty}`;
        }

        if (isSeq) { // Sequential generation
            arr.push(pre + (start + i).toString().padStart(pad, '0') + post);
        } else { // Random generation
            let r = "";
            for (let j = 0; j < len; j++) {
                r += cs.charAt(Math.floor(Math.random() * cs.length));
            }
            arr.push(pre + r + post);
        }
    }

    // Small pause at 100% for satisfaction
    await new Promise(r => setTimeout(r, 200));

    state.dataList = arr; // Update state
    state.previewIndex = 0; // Reset index

    renderBatchList(); // Render list
    updateLayout(); // Update layout
    render(); // Render canvas

    els.modal.classList.add('hidden'); // Remove loading modal
};

/* ================================
   CANVAS DRAG / RESIZE / PAN
================================ */
// Mouse down handler for drag/resize/pan
els.container.onmousedown = (e) => {
    if (e.target !== els.canvas) { // If clicking outside canvas
        state.isPanning = true; // Enable panning
        state.panStartX = e.clientX; // Record start X
        state.panStartY = e.clientY; // Record start Y
        state.panScrollL = els.container.scrollLeft; // Record scroll Left
        state.panScrollT = els.container.scrollTop; // Record scroll Top
        return;
    }

    const rect = els.canvas.getBoundingClientRect(); // Get canvas rect
    const sx = els.canvas.width / rect.width; // Scale X
    const sy = els.canvas.height / rect.height; // Scale Y

    const px = (e.clientX - rect.left) * sx; // Pointer X relative to canvas
    const py = (e.clientY - rect.top) * sy; // Pointer Y relative to canvas

    const { x, y, w, h } = state.box; // Get box coords
    const tol = 20 / state.zoomLevel; // Tolerance for resize handle

    if (px > x + w - tol && py > y + h - tol) { // Check resize logic
        state.isResizing = true;
    } else if (
        px > x && px < x + w &&
        py > y && py < y + h &&
        state.bgImage
    ) { // Check drag logic
        state.isDragging = true;
    }

    state.lastX = px; // Store last X
    state.lastY = py; // Store last Y
};

// Mouse move handler for drag/resize/pan
window.onmousemove = (e) => {
    if (state.isPanning) { // Panning logic
        els.container.scrollLeft =
            state.panScrollL - (e.clientX - state.panStartX);
        els.container.scrollTop =
            state.panScrollT - (e.clientY - state.panStartY);
        return;
    }

    if (!state.isDragging && !state.isResizing) return; // Exit if no action

    const rect = els.canvas.getBoundingClientRect(); // Get canvas rect
    const sx = els.canvas.width / rect.width; // Scale X
    const sy = els.canvas.height / rect.height; // Scale Y

    const px = (e.clientX - rect.left) * sx; // Pointer X
    const py = (e.clientY - rect.top) * sy; // Pointer Y

    const dx = px - state.lastX; // Delta X
    const dy = py - state.lastY; // Delta Y

    if (state.isDragging) { // Dragging logic
        state.box.x += dx;
        state.box.y += dy;
    } else if (state.isResizing) { // Resizing logic
        const newW = Math.max(50, state.box.w + dx) - state.padding * 2;
        if (state.codeType === 'code128') {
            state.bcWidth = newW;
            els.bcWidth.value = newW;
        } else {
            state.qrRatio = newW;
            els.qrRatio.value = newW;
        }
        updateLayout();
    }

    state.lastX = px; // Update last X
    state.lastY = py; // Update last Y
    render(); // Redraw
};

// Mouse up handler to stop actions
window.onmouseup = () => {
    state.isDragging = false;
    state.isResizing = false;
    state.isPanning = false;
};

/* ================================
   FORM / TAB / SLIDER
================================ */
els.genMethod.onchange = () => {
    if (els.genMethod.value === 'seq') {
        els.setSeq.classList.remove('hidden');
        els.setRand.classList.add('hidden');
    } else {
        els.setSeq.classList.add('hidden');
        els.setRand.classList.remove('hidden');
    }
};

// Charset OnChange: Update custom chars input based on selection
els.genCharset.onchange = () => {
    const v = els.genCharset.value;
    if (v === 'num') {
        els.customChars.value = "0123456789";
    } else if (v === 'alphanum') {
        els.customChars.value = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    } else {
        els.customChars.value = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    }
};

els.btnUploadTab.onclick = () => {
    els.btnUploadTab.className =
        "flex-1 py-3 text-blue-600 border-b-2 border-blue-600";
    els.btnGenTab.className = "flex-1 py-3 text-slate-400";
    els.panelUpload.classList.remove('hidden');
    els.panelGen.classList.add('hidden');
};

els.btnGenTab.onclick = () => {
    els.btnGenTab.className =
        "flex-1 py-3 text-blue-600 border-b-2 border-blue-600";
    els.btnUploadTab.className = "flex-1 py-3 text-slate-400";
    els.panelGen.classList.remove('hidden');
    els.panelUpload.classList.add('hidden');
};

els.bcWidth.oninput = (e) => {
    state.bcWidth = parseInt(e.target.value);
    els.bcWidthVal.textContent = state.bcWidth + "px";
    updateLayout();
    render();
};

els.bcHeight.oninput = (e) => {
    state.bcHeight = parseInt(e.target.value);
    els.bcHeightVal.textContent = state.bcHeight + "px";
    updateLayout();
    render();
};

els.qrRatio.oninput = (e) => {
    state.qrRatio = parseInt(e.target.value);
    els.qrSizeVal.textContent = state.qrRatio + "px";
    updateLayout();
    render();
};

els.textScale.oninput = (e) => {
    state.textScale = parseInt(e.target.value);
    updateLayout();
    render();
};

// Settings Listeners
els.codeFont.onchange = (e) => {
    state.font = e.target.value;
    render();
};

els.codeColor.oninput = (e) => {
    state.color = e.target.value;
    render();
};

els.codePadding.oninput = (e) => {
    state.padding = parseInt(e.target.value);
    updateLayout();
    render();
};

els.typeRadios.forEach(r => {
    r.onchange = (e) => {
        state.codeType = e.target.value;

        if (state.codeType === 'code128') {
            els.settingBarcodeSpec.classList.remove('hidden');
            els.settingQrSpec.classList.add('hidden');
        } else {
            els.settingBarcodeSpec.classList.add('hidden');
            els.settingQrSpec.classList.remove('hidden');
        }

        updateLayout();
        render();
    };
});

/* ================================
   IMAGE UPLOAD
================================ */
els.bgFile.onchange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    const r = new FileReader();
    r.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
            state.bgImage = img;
            state.canvasWidth = img.width;
            state.canvasHeight = img.height;

            state.box.x = (img.width - state.box.w) / 2;
            state.box.y = (img.height - state.box.h) / 2;

            els.btnRemoveBg.classList.remove('hidden');
            updateLayout();
            render();
        };
        img.src = ev.target.result;
    };
    r.readAsDataURL(f);
};

els.btnRemoveBg.onclick = () => {
    state.bgImage = null;
    els.btnRemoveBg.classList.add('hidden');
    updateLayout();
    render();
};

/* ================================
   CSV / EXCEL INPUT
================================ */
els.btnDownloadTemplate.onclick = () => {
    const blob = new Blob(
        ["FILLYOURCODEBELOW\nCODE001\nCODE002"],
        { type: 'text/csv;charset=utf-8;' }
    );
    window.downloadBlob(blob, "Template.csv");
};

els.excelFile.onchange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    const r = new FileReader();
    r.onload = (ev) => {
        const rows = ev.target.result
            .split(/\r?\n/)
            .map(row => row.split(','));

        const colIdx = rows[0]
            .map(h => h.trim().toUpperCase())
            .indexOf("FILLYOURCODEBELOW");

        if (colIdx === -1) {
            showMessage("Error", "Column missing.");
            return;
        }

        state.dataList = rows
            .slice(1)
            .map(row => row[colIdx]?.trim())
            .filter(Boolean);

        state.previewIndex = 0;
        renderBatchList();
        updateLayout();
        render();
    };
    r.readAsText(f);
};

/* ================================
   ZOOM BUTTONS
================================ */
els.btnZoomFit.onclick = () => {
    state.zoomMode = 'fit';
    updateLayout();
    render();
};

els.btnZoomIn.onclick = () => {
    state.zoomMode = 'manual';
    state.zoomLevel *= 1.2;
    updateZoom();
};

els.btnZoomOut.onclick = () => {
    state.zoomMode = 'manual';
    state.zoomLevel /= 1.2;
    updateZoom();
};
