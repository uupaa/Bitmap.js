// Bitmap test

onmessage = function(event) {
    self.TEST_DATA = event.data;
    self.TEST_ERROR_MESSAGE = "";

    if (!self.console) {
        self.console = function() {};
        self.console.log = function() {};
        self.console.warn = function() {};
        self.console.error = function() {};
    }

    importScripts(".././test/wmtools.js");
    importScripts("../lib/Bitmap.js");
    importScripts("../release/Bitmap.w.min.js");
    importScripts("./testcase.js");

    self.postMessage({ TEST_ERROR_MESSAGE: self.TEST_ERROR_MESSAGE || "" });
};

