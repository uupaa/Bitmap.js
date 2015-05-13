(function(global) {
"use strict";

// --- dependency modules ----------------------------------
//var Hash = global["Hash"];
//var Task = global["Task"];
//var Thread = global["Thread"];
//var TypedArray = global["TypedArray"];

// --- define / local variables ----------------------------
//var _isNodeOrNodeWebKit = !!global.global;
//var _runOnNodeWebKit =  _isNodeOrNodeWebKit &&  /native/.test(setTimeout);
//var _runOnNode       =  _isNodeOrNodeWebKit && !/native/.test(setTimeout);
//var _runOnWorker     = !_isNodeOrNodeWebKit && "WorkerLocation" in global;
//var _runOnBrowser    = !_isNodeOrNodeWebKit && "document" in global;

// --- class / interfaces ----------------------------------
var Bitmap = {
    "createBlob":   Bitmap_createBlob,      // Bitmap.createBlob(source:Uint8Array|Uint8ClampedArray, width:UINT16, height:UINT16):Blob

//{@dev
    "repository":   "https://github.com/uupaa/Bitmap.js", // GitHub repository URL. http://git.io/Help
//}@dev
};

// --- implements ------------------------------------------
function Bitmap_createBlob(source,   // @arg Uint8Array|Uint8ClampedArray
                           width,    // @arg UINT16 - bitmap width (need align 4)
                           height) { // @arg UINT16 - bitmap width (need align 4)
                                     // @ret Blob
    function _toUINT32L(v) { // UINT32 little endian
        return [v & 0xff, (v >> 8) & 0xff, (v >> 16) & 0xff, (v >>> 24) & 0xff];
    }
    function _toINT32L(v) { // INT32 little endian
        return [v & 0xff, (v >> 8) & 0xff, (v >> 16) & 0xff, (v >> 24) & 0xff];
    }

    var BMP_HEADER_SIZE = 14;  // BITMAPFILEHEADER
    var DIB_HEADER_SIZE = 124; // BITMAPV5HEADER
    var DATA_OFFSET     = BMP_HEADER_SIZE + DIB_HEADER_SIZE;
    var DATA_SIZE       = source.length + 0; // including padding
    var FILE_SIZE       = BMP_HEADER_SIZE + DIB_HEADER_SIZE + DATA_SIZE;
    var NEGATIVE_HEIGHT = (~height) + 1;
    var SIGNATURE       = [0x42, 0x4d]; // "BM"

    var header = new Uint8Array(BMP_HEADER_SIZE + DIB_HEADER_SIZE);

    header.set(
        [].concat(
            // --- BITMAPFILEHEADER ---
            SIGNATURE,                  // bfType
            _toUINT32L(FILE_SIZE),      // bfSize
            [0x00, 0x00],               // bfReserved1
            [0x00, 0x00],               // bfReserved2
            _toUINT32L(DATA_OFFSET),    // bfOffBits
            // --- BITMAPV5HEADER ---
            _toUINT32L(DIB_HEADER_SIZE),// biSize
            _toUINT32L(width),          // biWidth
            _toINT32L(NEGATIVE_HEIGHT), // biHeight
            [0x01, 0x00],               // biPlanes
            [0x20, 0x00],               // biBitCount - 0x20 = 32bit
            [0x03, 0x00, 0x00, 0x00],   // biCompression - 0x03 = BI_BITFIELDS
            _toUINT32L(DATA_SIZE),      // biSizeImage
            [0x13, 0x0b, 0x00, 0x00],   // biXPixPerMeter - 0x0b13(2835) = 72DPI
            [0x13, 0x0b, 0x00, 0x00],   // biYPixPerMeter
            [0x00, 0x00, 0x00, 0x00],   // biClrUsed
            [0x00, 0x00, 0x00, 0x00],   // biCirImportant
            [0x00, 0x00, 0x00, 0xFF],   // red   bit mask(0xFF000000) RGBA
            [0x00, 0x00, 0xFF, 0x00],   // green bit mask(0x00FF0000) RGBA
            [0x00, 0xFF, 0x00, 0x00],   // blue  bit mask(0x0000FF00) RGBA
            [0xFF, 0x00, 0x00, 0x00],   // alpha bit mask(0x000000FF) RGBA
            [0x20, 0x6e, 0x69, 0x57]    // color name space - 0x57696e20 = "Win " (TODO: check)
            // remaining data all zero (TODO: check)
        ), 0);

    var blob = new Blob([ header, source ], { "type": "image/bmp" });

    return blob;
}

// --- validate / assertions -------------------------------
//{@dev
//function $valid(val, fn, hint) { if (global["Valid"]) { global["Valid"](val, fn, hint); } }
//function $type(obj, type) { return global["Valid"] ? global["Valid"].type(obj, type) : true; }
//function $keys(obj, str) { return global["Valid"] ? global["Valid"].keys(obj, str) : true; }
//function $some(val, str, ignore) { return global["Valid"] ? global["Valid"].some(val, str, ignore) : true; }
//function $args(fn, args) { if (global["Valid"]) { global["Valid"].args(fn, args); } }
//}@dev

// --- exports ---------------------------------------------
if (typeof module !== "undefined") {
    module["exports"] = Bitmap;
}
global["Bitmap" in global ? "Bitmap_" : "Bitmap"] = Bitmap; // switch module. http://git.io/Minify

})((this || 0).self || global); // WebModule idiom. http://git.io/WebModule

