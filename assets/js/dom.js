const $ = id => document.getElementById(id);

const els = {
    typeRadios: document.querySelectorAll('input[name="codeType"]'),

    btnUploadTab: $('btn-upload-tab'),
    btnGenTab: $('btn-gen-tab'),
    panelUpload: $('panel-upload'),
    panelGen: $('panel-gen'),

    excelFile: $('excelFile'),

    genMethod: $('genMethod'),
    setSeq: $('setSeq'),
    setRand: $('setRand'),

    genStart: $('genStart'),
    genPadding: $('genPadding'),
    genRandLen: $('genRandLen'),
    genCharset: $('genCharset'),
    genQty: $('genQty'),

    customChars: $('customChars'),
    genPrefix: $('genPrefix'),
    genPostfix: $('genPostfix'),

    bcWidth: $('bcWidth'),
    bcWidthVal: $('bcWidthVal'),
    bcHeight: $('bcHeight'),
    bcHeightVal: $('bcHeightVal'),

    qrRatio: $('qrRatio'),
    qrSizeVal: $('qrSizeVal'),

    textScale: $('textScale'),

    container: $('canvasContainer'),
    canvas: $('mainCanvas'),
    zoomDisplay: $('zoomLevelDisplay'),

    batchList: $('batchList'),
    batchCount: $('batchCount'),

    modal: $('loadingModal'),
    progress: $('progressBar'),
    progLabel: $('progressLabel'),

    bgFile: $('bgFile'),
    btnRemoveBg: $('btnRemoveBg'),

    btnDownload: $('btnDownload'),
    btnDownloadExcel: $('btnDownloadExcel'),

    settingBarcodeSpec: $('settingBarcodeSpec'),
    settingQrSpec: $('settingQrSpec'),

    btnZoomIn: $('btnZoomIn'),
    btnZoomOut: $('btnZoomOut'),
    btnZoomFit: $('btnZoomFit'),

    btnDownloadTemplate: $('btnDownloadTemplate'),
    btnDoGen: $('btnDoGen'),

    msgModal: $('messageModal'),
    modalBody: $('modalBody'),
    modalHeader: $('modalHeader'),

    btnResetAll: $('btnResetAll'),
    codeFont: $('codeFont'),
    codeColor: $('codeColor'),
    codePadding: $('codePadding'),

    focusHint: $('focusHint')
};

const ctx = els.canvas.getContext('2d');
