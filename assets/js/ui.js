/* ================================
   UI HELPERS
   ================================
   Modal dialogs and UI feedback functions.
*/
// ui.js
function showAlert(title, body, isError = true) {
    els.modalTitle.textContent = title;
    els.modalBody.innerHTML = body; // Support HTML for bold text etc.

    // Set header style
    els.modalHeader.className = isError
        ? "bg-red-600 p-5 text-white font-black flex justify-between items-center uppercase text-sm"
        : "bg-emerald-600 p-5 text-white font-black flex justify-between items-center uppercase text-sm";

    // Clear buttons and add Close button
    els.modalButtons.innerHTML = '';
    const btnClose = document.createElement('button');
    btnClose.className = "w-full bg-slate-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase hover:bg-black transition-all";
    btnClose.textContent = "Close";
    btnClose.onclick = closeModal;
    els.modalButtons.appendChild(btnClose);

    els.msgModal.classList.remove('hidden');
}

function showConfirm(title, body, onConfirm) {
    els.modalTitle.textContent = title;
    els.modalBody.innerHTML = body;

    // Set header style (Blue/Slate for question)
    els.modalHeader.className = "bg-slate-800 p-5 text-white font-black flex justify-between items-center uppercase text-sm";

    // Clear buttons
    els.modalButtons.innerHTML = '';

    // Cancel Button
    const btnCancel = document.createElement('button');
    btnCancel.className = "flex-1 bg-slate-100 text-slate-500 hover:bg-slate-200 px-6 py-3 rounded-xl font-black text-[10px] uppercase transition-all";
    btnCancel.textContent = "Cancel";
    btnCancel.onclick = closeModal;

    // Confirm Button
    const btnConfirm = document.createElement('button');
    btnConfirm.className = "flex-1 bg-red-600 text-white hover:bg-red-700 px-6 py-3 rounded-xl font-black text-[10px] uppercase transition-all shadow-lg";
    btnConfirm.textContent = "Confirm";
    btnConfirm.onclick = () => {
        closeModal();
        if (onConfirm) onConfirm();
    };

    els.modalButtons.appendChild(btnCancel);
    els.modalButtons.appendChild(btnConfirm);

    els.msgModal.classList.remove('hidden');
}

function showMessage(title, body, isError = true) {
    // Backward compatibility wrapper
    showAlert(title, body, isError);
}

function closeModal() {
    els.msgModal.classList.add('hidden');
}