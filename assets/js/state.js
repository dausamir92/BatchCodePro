const state = {
    codeType: 'code128',
    dataList: ["YOURCODESHOWHERE"],
    previewIndex: 0,

    bgImage: null,
    font: 'monospace',
    color: '#000000',
    padding: 10,
    textScale: 100,

    bcWidth: 600,
    bcHeight: 170,
    qrRatio: 400,

    canvasWidth: 600,
    canvasHeight: 300,

    zoomLevel: 1.0,
    zoomMode: 'fit',

    isDragging: false,
    isResizing: false,
    isPanning: false,
    isCanvasActive: false,

    lastX: 0,
    lastY: 0,

    panStartX: 0,
    panStartY: 0,
    panScrollL: 0,
    panScrollT: 0,

    box: { x: 0, y: 0, w: 600, h: 150 },
    _rawExcel: []
};