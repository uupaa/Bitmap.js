# Bitmap.js [![Build Status](https://travis-ci.org/uupaa/Bitmap.js.png)](http://travis-ci.org/uupaa/Bitmap.js)

[![npm](https://nodei.co/npm/uupaa.bitmap.js.png?downloads=true&stars=true)](https://nodei.co/npm/uupaa.bitmap.js/)

Bitmap implementation.

## Document

- [Bitmap.js wiki](https://github.com/uupaa/Bitmap.js/wiki/Bitmap)
- [WebModule](https://github.com/uupaa/WebModule)
    - [Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html)
    - [Development](https://github.com/uupaa/WebModule/wiki/Development)

## Run on

### Browser and node-webkit

```js
<script src="lib/Bitmap.js"></script>
<script>
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
var blob = Bitmap.createBlob(imageData.data, canvas.width, canvas.height);

var img = new Image();
img.onload = function() {
    document.body.innerHTML += img;
};
img.src = URL.createObjectURL(blob);

</script>
```

### WebWorkers

```js
importScripts("lib/Bitmap.js");

```

### Node.js

```js
require("lib/Bitmap.js");

```

