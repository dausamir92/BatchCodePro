        // --- ZIP EXPORT ---
        els.btnDownload.onclick = async () => {
            els.modal.classList.remove('hidden');
            const zip = new JSZip(), total = state.dataList.length, off = document.createElement('canvas'), octx = off.getContext('2d');
            for(let i=0; i<total; i++) {
                state.previewIndex = i; updateLayout();
                const text = state.dataList[i];
                off.width = state.canvasWidth; off.height = state.canvasHeight;
                if(state.bgImage) octx.drawImage(state.bgImage, 0, 0);
                octx.fillStyle = "#FFFFFF"; octx.fillRect(state.box.x, state.box.y, state.box.w, state.box.h);
                const cw = state.codeType === 'code128' ? state.bcWidth : state.qrRatio;
                try {
                    const tmp = document.createElement('canvas');
                    bwipjs.toCanvas(tmp, { bcid: state.codeType, text: text, scale: 3, height: 10, barcolor: state.color.substring(1) });
                    octx.drawImage(tmp, state.box.x + (state.box.w - cw)/2, state.box.y + state.padding, cw, (state.codeType==='code128'?state.bcHeight:state.qrRatio));
                } catch(e){}
                octx.fillStyle = state.color; octx.textAlign = 'center'; octx.textBaseline = 'top';
                const fs = Math.floor(cw * (state.codeType === 'code128' ? 0.06 : 0.20) * (state.textScale / 100));
                octx.font = `bold ${Math.max(8, fs)}px ${state.font}`;
                octx.fillText(text, state.box.x + state.box.w/2, state.box.y + state.padding + (state.codeType==='code128'?state.bcHeight:state.qrRatio) + 5);
                zip.file(`${text}.png`, await new Promise(res => off.toBlob(res)));
                els.progress.style.width = ((i+1)/total * 100) + "%"; els.progLabel.textContent = `${i+1}/${total}`;
                await new Promise(r => setTimeout(r, 0));
            }
            saveAs(await zip.generateAsync({type:"blob"}), `Batch_Images.zip`);
            els.modal.classList.add('hidden');
        };

        // --- EXCEL EXPORT ---
        els.btnDownloadExcel.onclick = () => {
            if (state.dataList.length === 0 || state.dataList[0] === "YOURCODESHOWHERE") { showMessage("No Data", "Generate codes first."); return; }
            const data = state.dataList.map((code, idx) => ({ "No": idx + 1, "Batch Code": code, "Type": state.codeType, "Date": new Date().toLocaleString() }));
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Codes");
            XLSX.writeFile(wb, `Batch_List.xlsx`);
        };