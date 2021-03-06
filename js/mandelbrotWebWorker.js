---
categories: post composition
---

/* 
  Recall that a Web Worker JavaScript file has no access to the DOM and, in general, cannot receive DOM related objects.  
*/

self.onmessage = function(evt) {
  var MAX_ITERATIONS = evt.data.MAX_ITERATIONS;
  var ReMax = evt.data.ReMax;
  var ReMin = evt.data.ReMin;
  var ImMax = evt.data.ImMax;
  var ImMin = evt.data.ImMin;
  var grayscaleFactor = evt.data.grayscaleFactor;
  var canvasWidth = evt.data.canvasWidth;
  var canvasHeight = evt.data.canvasHeight;
  var imageDataObject = evt.data.imageDataObject; // This is a copy of, not a reference to, globals.canvas.context.imageDataObject.
  
  var imageDataObjectData = imageDataObject.data; // As a performance optimization, we cache this data array.
  var maxPixelGrayscaleValue = 0; // This will contain the lightest shade of gray in the drawn Mandelbrot image.
  
  var x_coefficient = (ReMax - ReMin) / canvasWidth; // Keep the below loops as computation-free as possible.
  var y_coefficient = (ImMin - ImMax) / canvasHeight; // Keep the below loops as computation-free as possible.
  
  var iterationSum = 0;
  var currentPixel = 0;  
  for (var y = 0; y < canvasHeight; y++) {
    var c_Im = (y * y_coefficient) + ImMax; // Note that c = c_Re + c_Im*i
    
    for (var x = 0; x < canvasWidth; x++) {
      var c_Re = (x * x_coefficient) + ReMin // Convert the canvas x-coordinate to a complex plane Re-coordinate. c_Re represents the real part of a c value.
      
      var z_Re = 0; // The first z value (Zo) must be 0.
      var z_Im = 0; // The first z value (Zo) must be 0. Note that z = z_Re + z_Im*i
      
      var c_belongsToMandelbrotSet = true; // Assume that the c associated with Zn belongs to the Mandelbrot set (i.e., Zn remains bounded under iteration of Zn+1 = (Zn)^2 + c).
      var exponentialSmoothingSum = 0; // Used to color the c-value pixels that are not part of the Mandelbrot set (i.e., tend toward infinity under iteration of Zn+1 = (Zn)^2 + c).
      for (var iterationCount = 1; iterationCount <= MAX_ITERATIONS; iterationCount++) {
        iterationSum++; // Keep track of how many iterations were performed in total so we can report this to the user.
      
        var z_Re_squared = z_Re * z_Re; // A small speed optimization.
        var z_Im_squared = z_Im * z_Im; // A small speed optimization.
                      
        exponentialSmoothingSum += Math.exp( -(z_Re_squared + z_Im_squared) ); // Technically, this should be e^(-|z|). However, avoiding the expensive square root operation does not significantly effect the resulting image.              
        if (exponentialSmoothingSum >= 255) { // Don't cycle through the (gray) colors.
         // exponentialSmoothingSum = 255;
        } // if

        if (z_Re_squared + z_Im_squared > 4) { // Checks if |z^2| is greater than 2. This approach avoids the expensive square root operation.
          c_belongsToMandelbrotSet = false; // This complex c value is not part of the Mandelbrot set (because it will always tend towards infinity under iteration).
          break; // Immediately check the next c value to see if it belongs to the Mandelbrot set or not.
        } // if
        
        // The next two lines perform Zn+1 = (Zn)^2 + c (recall that (x + yi)^2 = x^2 - y^2 + 2xyi, thus the real part is x^2 - y^2 and the imaginary part is 2xyi).
        z_Im = (2 * z_Re * z_Im) + c_Im; // We must calculate the next value of z_Im first because it depends on the current value of z_Re (not the next value of z_Re).
        z_Re = z_Re_squared - z_Im_squared + c_Re; // Calculate the next value of z_Re.
      } // for   
      
      if (c_belongsToMandelbrotSet) { // This complex c value is probably part of the Mandelbrot set because Zn did not tend toward infinity within MAX_ITERATIONS iterations.
        imageDataObjectData[currentPixel++] = 0; // Red. Note that there are 255 possible shades of red, green, blue, and alpha (i.e., opacity).
        imageDataObjectData[currentPixel++] = 255; // Green.
        imageDataObjectData[currentPixel++] = 0; // Blue.
        imageDataObjectData[currentPixel++] = 255; // Alpha (i.e., 0% transparency).
      } 
      else { // This complex c value is definitely not part of the Mandelbrot set because Zn tends toward infinity under iteration (i.e., |Zn| > 2).
        var pixelGrayscaleValue = 255 - exponentialSmoothingSum % 256; // Force the value of exponentialSmoothingSum to be between 0 and 255 inclusively. Note that all values for red, green, and blue are identical when using a grayscale.
        var adjustedPixelGrayscaleValue = pixelGrayscaleValue * grayscaleFactor;

        if (adjustedPixelGrayscaleValue>200) {
        imageDataObjectData[currentPixel++] = 127;
        imageDataObjectData[currentPixel++] = 0;
        imageDataObjectData[currentPixel++] = 127;
        } else
        if (adjustedPixelGrayscaleValue>150) {
        imageDataObjectData[currentPixel++] = 0;
        imageDataObjectData[currentPixel++] = 255;
        imageDataObjectData[currentPixel++] = 0;
        } else
        if (adjustedPixelGrayscaleValue>128) {
        imageDataObjectData[currentPixel++] = 0;
        imageDataObjectData[currentPixel++] = 0;
        imageDataObjectData[currentPixel++] = 255;
        } else
        if (adjustedPixelGrayscaleValue>80) {
        imageDataObjectData[currentPixel++] = 255;
        imageDataObjectData[currentPixel++] = 255;
        imageDataObjectData[currentPixel++] = 0;
        } else
        if (adjustedPixelGrayscaleValue>50) {
        imageDataObjectData[currentPixel++] = 0;
        imageDataObjectData[currentPixel++] = 255;
        imageDataObjectData[currentPixel++] = 255;
        } else
        if (adjustedPixelGrayscaleValue>20) {
        imageDataObjectData[currentPixel++] = 255;
        imageDataObjectData[currentPixel++] = 0;
        imageDataObjectData[currentPixel++] = 255;
        } else
        {
        imageDataObjectData[currentPixel++] = adjustedPixelGrayscaleValue; // Because we mod by 256, the value of exponentialSmoothingSum will always be between 0 and 255.
        imageDataObjectData[currentPixel++] = adjustedPixelGrayscaleValue; // If exponentialSmoothingSum is 255 (its maximum possible value), then 255 % 256 = 255.
        imageDataObjectData[currentPixel++] = adjustedPixelGrayscaleValue; // When exponentialSmoothingSum is 255, we have 255 - 255 = 0, so the shade values for RGB are all set to 0 (that is, the c-value pixel is rendered black - indicating that this particular c-value very slowly tends towards infinity).
        };
/*
        imageDataObjectData[currentPixel++] = adjustedPixelGrayscaleValue; // Because we mod by 256, the value of exponentialSmoothingSum will always be between 0 and 255.
        imageDataObjectData[currentPixel++] = adjustedPixelGrayscaleValue; // If exponentialSmoothingSum is 255 (its maximum possible value), then 255 % 256 = 255.
        imageDataObjectData[currentPixel++] = adjustedPixelGrayscaleValue; // When exponentialSmoothingSum is 255, we have 255 - 255 = 0, so the shade values for RGB are all set to 0 (that is, the c-value pixel is rendered black - indicating that this particular c-value very slowly tends towards infinity).

*/
        imageDataObjectData[currentPixel++] = 255; // Always draw the c-value pixels with no transparency.
        
        if (pixelGrayscaleValue > maxPixelGrayscaleValue) {
          maxPixelGrayscaleValue = pixelGrayscaleValue; // Determine the lightest shade of gray in case the user clicks the Lighten button.
        } // if
      } // if-else
    } // for
  } // for  
  
  self.postMessage({
    imageDataObject: imageDataObject,  
    maxPixelGrayscaleValue: maxPixelGrayscaleValue,
    workerID: evt.data.workerID,
    iterationSum: iterationSum
  });
} // self.onmessage