
/**
 * Apply convolution filter `matrix` to the given
 * `input`, populating `result`.
 *
 * @param {ImageData} input
 * @param {ImageData} result
 * @param {Number} width
 * @param {Number} height
 * @param {Array} matrix
 * @api public
 */

exports = module.exports = function(input, result, width, height, matrix){
  var data = input.data;
  var out = result.data;
  var w = matrix[0].length;
  var h = matrix.length;
  var half = Math.floor(h / 2);
  var div = w * h;

  for (var y = 0; y < height - 1; y++) {
    for (var x = 0; x < width - 1; x++) {
      var px = (y * width + x) * 4;
      var r = 0, g = 0, b = 0;

      for (var cy = 0; cy < w; ++cy) {
        for (var cx = 0; cx < h; ++cx) {
          var cpx = ((y + (cy - half)) * width + (x + (cx - half))) * 4;
          r += data[cpx + 0] * matrix[cy][cx];
          g += data[cpx + 1] * matrix[cy][cx];
          b += data[cpx + 2] * matrix[cy][cx];
        }
      }

      out[px + 0] = r / div;
      out[px + 1] = g / div;
      out[px + 2] = b / div;
      out[px + 3] = data[px + 3];
    }
  }
};

/**
 * Apply the given convolution `matrix` to `canvas`.
 *
 * @param {Canvas} canvas
 * @param {Array} matrix
 * @api public
 */

exports.canvas = function(canvas, matrix){
  var w = canvas.width;
  var h = canvas.height;
  var ctx = canvas.getContext('2d');
  var data = ctx.getImageData(0, 0, w, h);
  var result = ctx.createImageData(w, h);
  convolve(data, result, w, h, matrix);
  ctx.putImageData(result, 0, 0);
}