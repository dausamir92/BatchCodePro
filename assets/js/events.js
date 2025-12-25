/* ================================
   CANVAS FOCUS & ZOOM
================================ */
els.container.addEventListener('click', (e) => {
    state.isCanvasActive = true;
    els.container.classList.add('is-focused');
    els.focusHint.innerHTML =
        'Zoom <span class="text-blue-600 font-bold">LOCKED TO CANVAS</span>';
    e.stopPropagation();
});

document.addEventListener('click', () => {
    state.isCanvasActive = false;
    els.container.classList.remove('is-focused');
    els.focusHint.innerHTML =
        'Click canvas to <span class="text-blue-600 font-bold">ACTIVATE ZOOM</span>';
});

els.container.onwheel = (e) => {
    if (!state.isCanvasActive) return;
    e.preventDefault();
    state.zoomMode = 'manual';
    state.zoomLevel *= (e.deltaY < 0 ? 1.1 : 0.9);
    updateZoom();
};

/* ================================
   RESET & GENERATE
================================ */
els.btnResetAll.onclick = () => {
    state.dataList = ["YOURCODESHOWHERE"];
    state.previewIndex = 0;
    state.bgImage = null;

    renderBatchList();
    updateLayout();
    render();

    showMessage("Reset", "Cleared.", false);
};

els.btnDoGen.onclick = () => {
    document.body.classList.add('updating');

    setTimeout(() => {
        const arr = [];
        const qty = parseInt(els.genQty.value) || 1;
        const pre = els.genPrefix.value || "";
        const post = els.genPostfix.value || "";

        if (els.genMethod.value === 'seq') {
            const start = parseInt(els.genStart.value) || 1;
            const pad = parseInt(els.genPadding.value) || 0;
            for (let i = 0; i < qty; i++) {
                arr.push(pre + (start + i).toString().padStart(pad, '0') + post);
            }
        } else {
            const len = parseInt(els.genRandLen.value) || 8;
            let cs =
                els.genCharset.value === 'num'
                    ? "0123456789"
                    : els.genCharset.value === 'custom'
                    ? els.customChars.value
                    : "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

            for (let i = 0; i < qty; i++) {
                let r = "";
                for (let j = 0; j < len; j++) {
                    r += cs.charAt(Math.floor(Math.random() * cs.length));
                }
                arr.push(pre + r + post);
            }
        }

        state.dataList = arr;
        state.previewIndex = 0;

        renderBatchList();
        updateLayout();
        render();

        document.body.classList.remove('updating');
    }, 300);
};

/* ================================
   CANVAS DRAG / RESIZE / PAN
================================ */
els.container.onmousedown = (e) => {
    if (e.target !== els.canvas) {
        state.isPanning = true;
        state.panStartX = e.clientX;
        state.panStartY = e.clientY;
        state.panScrollL = els.container.scrollLeft;
        state.panScrollT = els.container.scrollTop;
        return;
    }

    const rect = els.canvas.getBoundingClientRect();
    const sx = els.canvas.width / rect.width;
    const sy = els.canvas.height / rect.height;

    const px = (e.clientX - rect.left) * sx;
    const py = (e.clientY - rect.top) * sy;

    const { x, y, w, h } = state.box;
    const tol = 20 / state.zoomLevel;

    if (px > x + w - tol && py > y + h - tol) {
        state.isResizing = true;
    } else if (
        px > x && px < x + w &&
        py > y && py < y + h &&
        state.bgImage
    ) {
        state.isDragging = true;
    }

    state.lastX = px;
    state.lastY = py;
};

window.onmousemove = (e) => {
    if (state.isPanning) {
        els.container.scrollLeft =
            state.panScrollL - (e.clientX - state.panStartX);
        els.container.scrollTop =
            state.panScrollT - (e.clientY - state.panStartY);
        return;
    }

    if (!state.isDragging && !state.isResizing) return;

    const rect = els.canvas.getBoundingClientRect();
    const sx = els.canvas.width / rect.width;
    const sy = els.canvas.height / rect.height;

    const px = (e.clientX - rect.left) * sx;
    const py = (e.clientY - rect.top) * sy;

    const dx = px - state.lastX;
    const dy = py - state.lastY;

    if (state.isDragging) {
        state.box.x += dx;
        state.box.y += dy;
    } else if (state.isResizing) {
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

    state.lastX = px;
    state.lastY = py;
    render();
};

window.onmouseup = () => {
    state.isDragging = false;
    state.isResizing = false;
    state.isPanning = false;
};

/* ================================
   FORM / TAB / SLIDER
================================ */
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
    saveAs(
        new Blob(
            ["FILLYOURCODEBELOW\nCODE001\nCODE002"],
            { type: 'text/csv;charset=utf-8;' }
        ),
        "Template.csv"
    );
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
