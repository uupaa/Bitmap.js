var ModuleTestBitmap = (function(global) {

var _isNodeOrNodeWebKit = !!global.global;
var _runOnNodeWebKit =  _isNodeOrNodeWebKit &&  /native/.test(setTimeout);
var _runOnNode       =  _isNodeOrNodeWebKit && !/native/.test(setTimeout);
var _runOnWorker     = !_isNodeOrNodeWebKit && "WorkerLocation" in global;
var _runOnBrowser    = !_isNodeOrNodeWebKit && "document" in global;

global["BENCHMARK"] = false;

if (console) {
    if (!console.table) {
        console.table = console.dir;
    }
}

var test = new Test("Bitmap", {
        disable:    false, // disable all tests.
        browser:    true,  // enable browser test.
        worker:     false, // enable worker test.
        node:       false, // enable node test.
        nw:         true,  // enable nw.js test.
        button:     true,  // show button.
        both:       false, // test the primary and secondary modules.
        ignoreError:false, // ignore error.
    });

if (_runOnBrowser || _runOnNodeWebKit) {
    test.add([
        testBitmap_createBlob,
    ]);
} else if (_runOnWorker) {
    //test.add([]);
} else if (_runOnNode) {
    //test.add([]);
}

var performance = global["performance"] || Date;

// --- test cases ------------------------------------------
function testBitmap_createBlob(test, pass, miss) {


    var canvas = document.createElement("canvas");
    var blockSize = 2048 / 1;
    canvas.width = blockSize;
    canvas.height = blockSize;

    var ctx = canvas.getContext("2d");
    _paintSampleImage(ctx);

    if (1) {
        // 2048px -> 80〜160ms
        // 1024px -> 20〜60ms
        //  512px ->  6〜34ms
        //  256px ->  2ms
        var a = performance.now();
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var blob = Bitmap.createBlob(imageData.data, canvas.width, canvas.height);
        var b = performance.now();

        console.log("createBlob: " + (b - a) + "ms");

        var img = new Image();
        img.onload = function() {
            document.body.appendChild(img);
    //        test.done(pass());
        };
        img.onerror = function() {
    //        test.done(miss());
        };
        img.src = URL.createObjectURL(blob);

    } else {
        // 2048px -> 127〜160ms
        // 1024px -> 60〜118ms
        //  512px -> 45〜92ms
        //  256px -> 42ms
        
        var a = performance.now();

        async(canvas, "image/png", function(blob) {
            var b = performance.now();
            console.log("async: " + (b - a) + "ms");

            var img = new Image();
            img.onload = function() {
                document.body.appendChild(img);
        //        test.done(pass());
            };
            img.onerror = function() {
        //        test.done(miss());
            };
            img.src = URL.createObjectURL(blob);


        });
    }
}

function async(canvas, mimeType, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", canvas.toDataURL(mimeType) );
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
        callback( new Blob( [xhr.response], { "type": mimeType } ) );
    };
    xhr.send();
}

function _paintSampleImage(ctx) {
    ctx.globalAlpha = 1;
    ctx.scale(2.0, 2.0);

    ctx.fillStyle = "gold";
    ctx.fillRect(0, 0, ctx.canvas.width / 2, ctx.canvas.height / 2);

    // circle 1
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(70, 45, 35, 0, Math.PI * 2, false);
    ctx.fill();

    // circle 2
    ctx.beginPath();
    ctx.fillStyle = "magenta";
    ctx.arc(45, 95, 35, 0, Math.PI * 2, false);
    ctx.fill();

    // circle 3
    ctx.beginPath();
    ctx.fillStyle = "cyan";
    ctx.arc(95, 95, 35, 0, Math.PI * 2, false);
    ctx.fill();
/*
    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.arc(70, 45, 35, 0, Math.PI * 2, false);
    ctx.fill();
 */
}

return test.run().clone();

})((this || 0).self || global);

