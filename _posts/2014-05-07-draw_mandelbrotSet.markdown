---
title: 投稿記事
layout: post
postTitle: マンデルブロ集合
categories: post composition
---

<div class="row">
  <div class="col-sm-6">
    <table>
      <tr>
        <td id="messageBox"></td>
        <td id="elapsedTime"></td>
      </tr>
    </table>

    <canvas width="600" height="400">Canvas not supported - upgrade your browser</canvas><br>
    <button type="button" id="resetButton">Reset</button>  
    <button type="button" id="lightenButton">Lighten</button>    
    <button type="button" id="saveButton">Save</button>
    <form id="filenameForm"> 
      Extensionless filename: <input id="filename" type="text"> <input type="submit" value="Submit">
    </form>  
  </div>
  <div class="col-sm-6">
  	<p><span class="label label-info">Run</span>ボタンを押してください</p>
  	<p>どのように見えますか？</p>
  </div>	
</div>

- - -

{% highlight JavaScript %}


{% endhighlight %}

<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>

<script>

    var RE_MAX = 1.1; // This value will be adjusted as necessary to ensure that the rendered Mandelbrot set is never skewed (that is, true to it's actual shape).
    var RE_MIN = -2.5;
    var IM_MAX = 1.2;
    var IM_MIN = -1.2;
    var MAX_ITERATIONS = 2000; // Increase this value to improve detection of complex c values that belong to the Mandelbrot set.
    var STATIC_ZOOM_BOX_FACTOR = 0.25; // Increase to make the double-click and hold gesture zoom box bigger.
    var DEFAULT_MESSAGE = "Click or click-and-drag to zoom."  
    
    var globals = {}; // See the handleLoad function.
         
    window.addEventListener('load', handleLoad, false);
                    
    /************************************************************************************************************************************************************/
    
    Number.prototype.format = function() {
    /* 
      Formats this integer so that it has commas in the expected places.
    */
      var numberString = Math.round(this).toString(); // An integer value is assumed, so we ensure that it is indeed an integer.
      var precompiledRegularExpression = /(\d+)(\d{3})/;
      
      while ( precompiledRegularExpression.test(numberString) ) {
        numberString = numberString.replace(precompiledRegularExpression, '$1' + ',' + '$2'); // For this integer, inject ","'s at the appropriate locations.
      } // while
      
      return numberString;
    } // Number.prototype.format

    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/    

    function handleLoad() {      
      var canvas = document.getElementsByTagName('canvas')[0];
      var canvasWidth = canvas.width;
      var canvasHeight = canvas.height;      
      var ctx = canvas.getContext('2d');
      
      document.getElementsByTagName('table')[0].width = canvasWidth; // Make the table's width the same as the canvas's width.  
      document.getElementById('messageBox').innerHTML = DEFAULT_MESSAGE;
      
      globals.canvas = canvas;
      globals.canvas.context = ctx;
      globals.canvas.context.imageDataObject = ctx.createImageData(canvasWidth, canvasHeight); // Create an appropriately sized but empty canvas image data object.
            
      globals.staticZoomBoxWidth = STATIC_ZOOM_BOX_FACTOR * canvasWidth; // Maintains the original canvas width/height ratio.
      globals.staticZoomBoxHeight = STATIC_ZOOM_BOX_FACTOR * canvasHeight; // Maintains the original canvas width/height ratio.      
      
      globals.pointer = {};
      globals.pointer.down = false;        
             
      canvas.addEventListener('mousedown', handlePointer, false);
      canvas.addEventListener('mousemove', handlePointer, false);
      canvas.addEventListener('mouseup', handlePointer, false);    
          
      document.getElementById('resetButton').addEventListener('click', handleResetButton, false);
      document.getElementById('lightenButton').addEventListener('click', handleLightenButton, false);    
      document.getElementById('saveButton').addEventListener('click', handleSaveButton, false);        
      document.getElementById('filenameForm').addEventListener('submit', handleFormSubmit, false);    
    
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)"; // The color and opacity of the zoom box. This is what gets saved when calling ctx.save().      

      handleResetButton();
    } // handleLoad
    
    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/    
    
    function adjusted_RE_MAX() {    
      var ReMax = globals.canvas.width * ( (IM_MAX - IM_MIN) / globals.canvas.height ) + RE_MIN;
      
      if (RE_MAX != ReMax) {
        alert("RE_MAX has been adjusted to: " + ReMax); // The user should never see this if RE_MAX is set correctly above.
      } // if

      return ReMax;
    } // adjusted_RE_MAX    
    
    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/    
    
    function drawMandelbrot() {     
      var startTime = new Date(); // Report how long it takes to render this particular region of the Mandelbrot set.             
      var canvas = globals.canvas;
      var canvasWidth = canvas.width;
      var canvasHeight = canvas.height;
      var ctx = canvas.context;
      var imageDataObjectData = ctx.imageDataObject.data; // imageDataObjectData is a reference to, not a copy of, ctx.imageDataObject.data
      
      var ReMax = globals.ReMax; // These 4 lines general require that setExtrema be called prior to calling drawMandelbrot.
      var ReMin = globals.ReMin;
      var ImMax = globals.ImMax;
      var ImMin = globals.ImMin;
      
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
          var exponentialSmoothingSum = 0;
          for (var iterationCount = 1; iterationCount <= MAX_ITERATIONS; iterationCount++) {
            iterationSum++; // Keep track of how many iterations were performed in total so we can report this to the user.
          
            var z_Re_squared = z_Re * z_Re; // A small speed optimization.
            var z_Im_squared = z_Im * z_Im; // A small speed optimization.
    
            exponentialSmoothingSum += Math.exp( -(z_Re_squared + z_Im_squared) ); // Technically, this should be e^(-|z|). However, avoiding the expensive square root operation doesn't really effect the resulting image.              
            if (exponentialSmoothingSum >= 255) { // Don't cycle through the gray colors.
              exponentialSmoothingSum = 255;
            }

 
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
            imageDataObjectData[currentPixel++] = 0; // Green.
            imageDataObjectData[currentPixel++] = 0; // Blue.
            imageDataObjectData[currentPixel++] = 255; // Alpha (i.e., 0% transparency).
          } 
          else { // This complex c valus is definitely not part of the Mandelbrot set because Zn would tend toward infinity under iteration (i.e., |Zn| > 2).
            var pixelGrayscaleValue = 255 - exponentialSmoothingSum % 256; // Force the value of exponentialSmoothingSum to be between 0 and 255 inclusively. Note that all values for red, green, and blue are identical when using a grayscale.
            imageDataObjectData[currentPixel++] = pixelGrayscaleValue; 
            imageDataObjectData[currentPixel++] = pixelGrayscaleValue; 
            imageDataObjectData[currentPixel++] = pixelGrayscaleValue; 
            imageDataObjectData[currentPixel++] = 255;
          } // if-else
        } // for
      } // for        
      
      ctx.putImageData(ctx.imageDataObject, 0, 0); // Render our carefully constructed canvas image data array to the canvas.
          
      var elapsedMilliseconds = (new Date()) - startTime;
      document.getElementById('elapsedTime').innerHTML = iterationSum.format() + " iterations in " + (elapsedMilliseconds / 1000).toFixed(2) + " seconds"; // Note that the UI element is not updated until after this block terminates (which is the desired behavior).            
      document.getElementById('messageBox').innerHTML = DEFAULT_MESSAGE; // Erase the "Calculating..." message and replace it with the default message.
    } // drawMandelbrot
    
    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    
    function xToRe(x) {
      var x_coefficient = (globals.ReMax - globals.ReMin) / globals.canvas.width; 
      
      return (x * x_coefficient) + globals.ReMin; // Converts a canvas x-coordinate value to the associated complex plane Re-coordinate.
    } // xToRe
    
    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/    

    function yToIm(y) {
      var y_coefficient = (globals.ImMin - globals.ImMax) / globals.canvas.height; 
      
      return (y * y_coefficient) + globals.ImMax; // Converts a canvas y-coordinate value to the associated complex plane Im-coordinate.
    } // yToIm
    
    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

    function handlePointer(evt) {
      var canvasWidthHeightRatio = globals.canvas.width / globals.canvas.height;
      var ctx = globals.canvas.context;
      
      var canvasX;
      var canvasY;      
      
      if (evt.offsetX && evt.offsetY) {
        canvasX = evt.offsetX; // Not supported in Firefox.
        canvasY = evt.offsetY; // Does not assume that the canvas element is a direct descendent of the body element.
      } else {
        canvasX = evt.clientX - evt.target.offsetLeft; // Supported in Firefox.
        canvasY = evt.clientY - evt.target.offsetTop; // Assumes that the canvas element is a direct descendent of the body element.
      } // if-else
      
      var zoomBoxWidth;
      var zoomBoxHeight;
      
      var ReMax;
      var ReMin;
      var ImMax;
      var ImMin;
            
      switch (evt.type) {
        case 'mousedown':
          globals.pointer.x1 = canvasX;
          globals.pointer.y1 = canvasY;
          globals.pointer.down = true;
          break;
        case 'mousemove':
          if (globals.pointer.down) {
            zoomBoxHeight = Math.abs(canvasY - globals.pointer.y1);  
            zoomBoxWidth = zoomBoxHeight * canvasWidthHeightRatio; // We must keep the zoom box dimensions proportional to the canvas dimensions in order to ensure that the resulting zoomed Mandelbrot image does not become skewed.
            ctx.putImageData(globals.canvas.context.imageDataObject, 0, 0); // Assumes that an initial image of the Mandelbrot set is drawn before we get to this point in the code. The purpose of this line is to erase the prior zoom box rectangle before drawing the next zoom box rectangle.
            ctx.fillRect(globals.pointer.x1, globals.pointer.y1, zoomBoxWidth, zoomBoxHeight); // With a freshly painted image of the current Mandelbrot set in place (see prior line), draw a new zoom box rectangle.
          } // if
          break;
        case 'mouseup':
          globals.pointer.down = false;          
          
          zoomBoxHeight = Math.abs(canvasY - globals.pointer.y1); // Only allow the zoom box to be drawn from an upper-left corner position down to a lower-right corner position.
          zoomBoxWidth = zoomBoxHeight * canvasWidthHeightRatio; // Again, ensure that the width/height ratio of the zoom box is proportional to the canvas's (this simplifies the algorithm).          

          if (zoomBoxHeight == 0) { // No zoom box has been drawn, so honor the fixed sized zoom box.
            var staticZoomBoxWidth = globals.staticZoomBoxWidth;
            var staticZoomBoxHeight = globals.staticZoomBoxHeight;
            var halfStaticZoomBoxWidth = staticZoomBoxWidth / 2;
            var halfStaticZoomBoxHeight = staticZoomBoxHeight / 2;
          
            ctx.fillRect(canvasX - halfStaticZoomBoxWidth, canvasY - halfStaticZoomBoxHeight, staticZoomBoxWidth, staticZoomBoxHeight); // Just leave this on the screen.
                         
            ReMin = xToRe(canvasX - halfStaticZoomBoxWidth); // Center the static zoom box about the point (evt.offsetX, evt.offsetY).
            ImMax = yToIm(canvasY - halfStaticZoomBoxHeight); 
            
            ReMax = xToRe(canvasX + halfStaticZoomBoxWidth);
            ImMin = yToIm(canvasY + halfStaticZoomBoxHeight);
          } 
          else { // A (possibly tiny) zoom box has been drawn, so honor it.
            ReMin = xToRe(globals.pointer.x1); // Convert the mouse's x-coordinate value (on the canvas) to the associated Re-coordinate value in the complex plane.
            ImMax = yToIm(globals.pointer.y1); // Convert the mouse's y-coordinate value (on the canvas) to the associated Im-coordinate value in the complex plane.
                                      
            ReMax = xToRe(zoomBoxWidth + globals.pointer.x1); // Convert the zoom box's final x-coordinate value to the associated Re-coordinate value in the complex plane.  
            ImMin = yToIm(zoomBoxHeight + globals.pointer.y1);  // Convert the zoom box's final y-coordinate value to the associated Re-coordinate value in the complex plane.            
          } // if-else
          
          document.getElementById('messageBox').innerHTML = "Calculating..."; // This isn't displayed until its containing code block exits, hence the need for setImmediate/setTimeout calls next. 
          document.getElementById('elapsedTime').innerHTML = ""; // Erase the prior run's statistics.     

          setExtrema(ReMax, ReMin, ImMax, ImMin); // Must set these globals prior to calling drawMandelbort because drawMandelbort accesses them.
          if (window.setImmediate) {
            window.setImmediate(drawMandelbrot); // Allow "Calculating..." to be immediately displayed on the screen.
          }
          else {
            window.setTimeout(drawMandelbrot, 0); // Allow "Calculating..." to be immediately displayed on the screen.
          }     
          break; 
        default:
          alert("Error in switch statement."); // Although unnecessary, defensive programming techniques such as this are highly recommended.
      } // switch              
    } // handlePointer    
        
    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    
    function setExtrema(ReMax, ReMin, ImMax, ImMin) {
    /* 
      This generally must be called prior to calling drawMandelbrot in that drawMandelbrot accesses the following 4 global variables.
    */
      globals.ReMax = ReMax;
      globals.ReMin = ReMin;
      globals.ImMax = ImMax;
      globals.ImMin = ImMin;          
    } // setExtrema
    
    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    
    function handleResetButton() {
      var reMax = adjusted_RE_MAX(); // If the constant RE_MAX is set correctly, the user will never see the alert that the adjusted_RE_MAX function can throw.
      
      setExtrema(reMax, RE_MIN, IM_MAX, IM_MIN);
      drawMandelbrot();          
    } // handleResetButton
    
    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    
    function handleLightenButton() {
      alert("handleLightenButton fired.");
    } // handleResetButton
    
    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

    function handleSaveButton() {
      document.getElementById('filenameForm').style.visibility = "visible";
      document.getElementById('filename').focus(); // Place the cursor in the filename text input box.
    } // handleResetButton 
 
    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

    function handleFormSubmit(evt) {
      alert("handleFormSubmit fired.");    
      evt.preventDefault(); // Do not refresh the page when the submit button is clicked.
      document.getElementById('filenameForm').style.visibility = "hidden";
    } // handleFormSubmit

</script>