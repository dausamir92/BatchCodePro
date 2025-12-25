/* ================================
   APPLICATION STATE
   ================================
   Centralized state management for the application.
*/
const state = {
    codeType: 'code128', // Default barcode type
    dataList: ["YOURCODESHOWHERE"], // Initial data list
    previewIndex: 0, // Current preview index

    bgImage: null, // Background image element
    font: 'monospace', // Font setting
    color: '#000000', // Foreground color
    padding: 10, // Padding around code
    textScale: 100, // Text scaling percentage

    bcWidth: 600, // Barcode width
    bcHeight: 170, // Barcode height
    qrRatio: 400, // QR code size

    canvasWidth: 600, // Canvas width
    canvasHeight: 300, // Canvas height

    zoomLevel: 0.5, // Zoom level (50% default)
    zoomMode: 'manual', // Zoom mode (fit/manual)

    isDragging: false, // Dragging state
    isResizing: false, // Resizing state
    isPanning: false, // Panning state
    isCanvasActive: false, // Canvas focus state

    lastX: 0, // Last mouse X position
    lastY: 0, // Last mouse Y position

    panStartX: 0, // Pan start X
    panStartY: 0, // Pan start Y
    panScrollL: 0, // Initial scroll Left
    panScrollT: 0, // Initial scroll Top

    box: { x: 0, y: 0, w: 600, h: 150 }, // Bounding box for code
    _rawExcel: [] // Storage for raw Excel data
};