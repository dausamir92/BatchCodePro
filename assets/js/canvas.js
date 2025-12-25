        function updateLayout() {
            const pad = parseInt(state.padding), gap = 5;
            const text = state.dataList[state.previewIndex] || "EXAMPLE123";
            const contentW = state.codeType === 'code128' ? state.bcWidth : state.qrRatio;
            const textRatio = (state.codeType === 'code128' ? 0.06 : 0.20) * (state.textScale / 100);
            const fontSize = Math.floor(contentW * textRatio);
            ctx.font = `bold ${Math.max(8, fontSize)}px ${state.font}`;
            const textW = ctx.measureText(text).width;
            let boxW = Math.max(contentW + (pad * 2), textW + (pad * 2));
            state.box.w = boxW;
            state.box.h = (state.codeType === 'code128') ? (pad + state.bcHeight + gap + (fontSize * 1.2) + 2) : (pad + state.qrRatio + gap + (fontSize * 1.2) + pad);
            if (!state.bgImage) { state.canvasWidth = state.box.w + 20; state.canvasHeight = state.box.h + 20; state.box.x = 10; state.box.y = 10; }
            updateZoom();
        }

        function updateZoom() {
            if (state.zoomMode === 'fit') {
                state.zoomLevel = Math.min(els.container.clientWidth / state.canvasWidth, els.container.clientHeight / state.canvasHeight, 1.0);
                els.zoomDisplay.textContent = "Fit";
            } else { els.zoomDisplay.textContent = Math.round(state.zoomLevel * 100) + "%"; }
            els.canvas.style.width = (state.canvasWidth * state.zoomLevel) + "px";
            els.canvas.style.height = (state.canvasHeight * state.zoomLevel) + "px";
        }

        function render() {
            els.canvas.width = state.canvasWidth; els.canvas.height = state.canvasHeight;
            ctx.clearRect(0,0,els.canvas.width, els.canvas.height);
            if(state.bgImage) ctx.drawImage(state.bgImage, 0, 0);
            const text = state.dataList[state.previewIndex] || "EXAMPLE123";
            const {x, y, w, h} = state.box;
            ctx.fillStyle = "#FFFFFF"; ctx.fillRect(x, y, w, h);
            const contentW = state.codeType === 'code128' ? state.bcWidth : state.qrRatio;
            try {
                const temp = document.createElement('canvas');
                bwipjs.toCanvas(temp, { bcid: (state.codeType === 'code128' ? 'code128' : 'qrcode'), text: text, scale: 3, height: 10, includetext: false, barcolor: state.color.substring(1) });
                ctx.drawImage(temp, x + (w - contentW)/2, y + state.padding, contentW, (state.codeType==='code128'?state.bcHeight:state.qrRatio));
            } catch(e){}
            ctx.fillStyle = state.color; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
            const fs = Math.floor(contentW * (state.codeType === 'code128' ? 0.06 : 0.20) * (state.textScale / 100));
            ctx.font = `bold ${Math.max(8, fs)}px ${state.font}`;
            ctx.fillText(text, x + w/2, y + state.padding + (state.codeType==='code128'?state.bcHeight:state.qrRatio) + 5);
            ctx.strokeStyle = "#2563eb"; ctx.lineWidth = 2 / state.zoomLevel; ctx.strokeRect(x, y, w, h);
            ctx.fillStyle = "#2563eb"; ctx.beginPath(); ctx.arc(x+w, y+h, 6/state.zoomLevel, 0, Math.PI*2); ctx.fill();
        }
        
        function renderBatchList() {
            els.batchList.innerHTML = ''; els.batchCount.textContent = state.dataList.length + " items";
            state.dataList.forEach((item, i) => {
                const d = document.createElement('div');
                d.className = `p-3 text-xs border-b border-slate-50 preview-item font-bold text-slate-600 flex items-center gap-3 ${i===state.previewIndex?'selected':''}`;
                d.innerHTML = `<span class="opacity-30 text-[10px] w-6">${i+1}</span> ${item}`;
                d.onclick = () => { state.previewIndex = i; renderBatchList(); updateLayout(); render(); };
                els.batchList.appendChild(d);
            });
        }
