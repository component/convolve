
# convolve

  Canvas [convolution](http://en.wikipedia.org/wiki/Convolution) filter.

  ![](http://f.cl.ly/items/3m1B1n241u0O2U3S0N01/Screen%20Shot%202012-09-25%20at%209.39.59%20AM.png)

## API

### convolve(input, result, width, height, matrix)

  Apply convolution filter `matrix` to the given `input`, populating `result`.

## Example

```js
var convolve = require('convolve');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var img = new Image;
img.onload = draw;
img.src = 'maru.jpg';

var sharpen = [
  [0, -3, 0],
  [-3, 21, -3],
  [0, -3, 0]
];

var blur = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1]
];

var emboss = [
  [-18, -9, 0],
  [-9, 9, 9],
  [0, 9, 18]
];

var edges = [
  [0, 9, 0],
  [9, -36, 9],
  [0, 9, 0]
];

function draw() {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  var data = ctx.getImageData(0, 0, img.width, img.height);
  var result = ctx.createImageData(img.width, img.height);
  convolve(data, result, img.width, img.height, edges);
  ctx.putImageData(result, 0, 0);
}
```

# License

  MIT

