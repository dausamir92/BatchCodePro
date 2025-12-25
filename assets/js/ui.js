/* ================================
   UI HELPERS
   ================================
   Modal dialogs and UI feedback functions.
*/

// ui.js
function showMessage(title, body, isError = true) {
    els.modalBody.textContent = body; // Set message body
    els.modalHeader.className = isError // Set header color based on error state
        ? "bg-red-600 p-5 text-white font-black flex justify-between items-center uppercase text-sm"
        : "bg-emerald-600 p-5 text-white font-black flex justify-between items-center uppercase text-sm";

    els.msgModal.classList.remove('hidden'); // Show modal
}

function closeModal() {
    els.msgModal.classList.add('hidden'); // Hide modal
}