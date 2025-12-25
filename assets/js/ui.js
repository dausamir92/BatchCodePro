// ui.js
function showMessage(title, body, isError = true) {
    els.modalBody.textContent = body;
    els.modalHeader.className = isError
        ? "bg-red-600 p-5 text-white font-black flex justify-between items-center uppercase text-sm"
        : "bg-emerald-600 p-5 text-white font-black flex justify-between items-center uppercase text-sm";

    els.msgModal.classList.remove('hidden');
}

function closeModal() {
    els.msgModal.classList.add('hidden');
}