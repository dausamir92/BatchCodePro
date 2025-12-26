/* ================================
   DOM ELEMENTS
   ================================
   Cache all DOM elements for easy access.
*/
const $ = id => document.getElementById(id); // Helper to get element by ID

const els = {
    typeRadios: document.querySelectorAll('input[name="codeType"]'), // Radio buttons for type

    btnUploadTab: $('btn-upload-tab'), // Upload tab button
    btnGenTab: $('btn-gen-tab'), // Generate tab button
    panelUpload: $('panel-upload'), // Upload panel
    panelGen: $('panel-gen'), // Generate panel

    excelFile: $('excelFile'), // File input

    genMethod: $('genMethod'), // Generation method select
    setSeq: $('setSeq'), // Sequential options div
    setRand: $('setRand'), // Random options div

    genStart: $('genStart'), // Start number input
    genPadding: $('genPadding'), // Padding input
    genRandLen: $('genRandLen'), // Random length input
    genCharset: $('genCharset'), // Charset select
    genQty: $('genQty'), // Quantity input

    customChars: $('customChars'), // Custom characters input
    genPrefix: $('genPrefix'), // Prefix input
    genPostfix: $('genPostfix'), // Postfix input

    bcWidth: $('bcWidth'), // Barcode width slider
    bcWidthVal: $('bcWidthVal'), // Barcode width display
    bcHeight: $('bcHeight'), // Barcode height slider
    bcHeightVal: $('bcHeightVal'), // Barcode height display

    qrRatio: $('qrRatio'), // QR size slider
    qrSizeVal: $('qrSizeVal'), // QR size display

    textScale: $('textScale'), // Text scale slider

    container: $('canvasContainer'), // Canvas container
    canvas: $('mainCanvas'), // Main canvas element
    zoomDisplay: $('zoomLevelDisplay'), // Zoom level text

    batchList: $('batchList'), // Batch list container
    batchCount: $('batchCount'), // Batch count display

    modal: $('loadingModal'), // Loading modal
    progress: $('progressBar'), // Progress bar
    progLabel: $('progressLabel'), // Progress label

    bgFile: $('bgFile'), // Background file input
    btnRemoveBg: $('btnRemoveBg'), // Remove background button

    btnDownload: $('btnDownload'), // ZIP download button
    btnDownloadExcel: $('btnDownloadExcel'), // Excel download button

    settingBarcodeSpec: $('settingBarcodeSpec'), // Barcode settings div
    settingQrSpec: $('settingQrSpec'), // QR settings div

    btnZoomIn: $('btnZoomIn'), // Zoom in button
    btnZoomOut: $('btnZoomOut'), // Zoom out button
    btnZoomFit: $('btnZoomFit'), // Zoom fit button

    btnDownloadTemplate: $('btnDownloadTemplate'), // Template download button
    btnDoGen: $('btnDoGen'), // Generate trigger button

    msgModal: $('messageModal'), // Message modal
    modalBody: $('modalBody'), // Message body
    modalHeader: $('modalHeader'), // Message header
    modalTitle: $('modalTitle'), // Message title
    modalButtons: $('modalButtons'), // Message buttons container

    btnResetAll: $('btnResetAll'), // Reset button
    codeFont: $('codeFont'), // Font select
    codeColor: $('codeColor'), // Color input
    codePadding: $('codePadding'), // Padding input

    focusHint: $('focusHint') // Focus hint text
};

const ctx = els.canvas.getContext('2d'); // Get 2D context
