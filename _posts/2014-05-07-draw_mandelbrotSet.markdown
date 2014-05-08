---
title: 投稿記事
layout: post
postTitle: マンデルブロ集合
categories: post composition
---

<div class="row">
  <div class="col-sm-7">
    <table>
      <tr>
        <td id="messageBox"></td>
        <td id="elapsedTime"></td>
      </tr>
    </table>

    <canvas width="600" height="400">Canvas 要素をサポートしていません - ブラウザをアップグレードしてください。</canvas><br>
    <div class="col-sm-6">
      <button type="button" id="resetButton">リセット</button>  
    </div>
    <div class="col-sm-6">
      <button type="button" id="lightenButton">明るく</button>    
    </div>
  </div>
  <div class="col-sm-5">
    <p>
    マンデルブロ集合の図形を描いてみたくて、探していたら、MSDN（MicroSoft Developer Network）のライブラリに掲載されているのを見つけました。
    </p>

    <a href="http://msdn.microsoft.com/ja-jp/library/jj635756(v=vs.85).aspx">HTML5 を使ってマンデルブロ集合を調べる方法</a>
    
    <p>
    早速試してみました・・
    </p>
  </div>	
</div>

- - -

<script>

    if (!window.Worker) { // Worker（） constructorが利用可能かチェック
      document.getElementsByTagName('body')[0].innerHTML = "<h2>Web Workers not supported - upgrade your browser<br>(after checking that your browser is in the correct mode)</h2>";      
    }
    else {
      var RE_MAX = 1.1; // 描画されるマンデルブロ集合が変形しないように、この値を調整する必要がある
      var RE_MIN = -2.5;
      var IM_MAX = 1.2;
      var IM_MIN = -1.2;
      var MAX_ITERATIONS = 1200; // この値を増やすと、複素数ｃがマンデルブロ集合に属しているか探知する精度を向上させます。
      var STATIC_ZOOM_BOX_FACTOR = 0.25; // この値を増やすと、ズーム率を大きくします
      var DEFAULT_MESSAGE = "クリック または クリック&ドラッグ で ズーム"      
      
      var globals = {}; // See the handleLoad function.
      
      window.addEventListener('load', handleLoad, false);
    } // if-else
                
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
                 
      window.addEventListener('hashchange', handleHashChange, false); // This event handler executes whenever the URL hash string changes.
      
      if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) { // Future proofing.
        // It's either-or with MS pointer events - they cannot be registered concurrently.
        window.gesture = window.gesture || window.MSGesture; // Future proofing.
        globals.gesture = new gesture();
        globals.gesture.target = canvas; 
        canvas.addEventListener('MSPointerDown', function(evt) { globals.gesture.addPointer(evt.pointerId); }, false); 
          
        canvas.addEventListener('MSGestureStart', handlePointer, false); 
        canvas.addEventListener('mousedown', handlePointer, false); // Required for the case when the mouse is clicked but not moved.
        
        canvas.addEventListener('MSGestureChange', handlePointer, false);
        
        canvas.addEventListener('MSGestureEnd', handlePointer, false);
        canvas.addEventListener('mouseup', handlePointer, false); // Required for the case when the mouse is clicked but not moved.

        canvas.addEventListener('MSGestureHold', handlePointer, false);
      }    
      else {
        canvas.addEventListener('mousedown', handlePointer, false);
        canvas.addEventListener('mousemove', handlePointer, false);
        canvas.addEventListener('mouseup', handlePointer, false);    
      } // if-else
            
      document.getElementById('resetButton').addEventListener('click', handleResetButton, false);
      document.getElementById('lightenButton').addEventListener('click', handleLightenButton, false);    
      
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)"; // The color and opacity of the zoom box. This is what gets saved when calling ctx.save().          
 
      handleHashChange(); // On page load, simulate a page URL change to draw the initial Mandelbrot set.
    } // handleLoad
    
    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/    
    
    function handleHashChange() {
      var hashValues = getHashValues(); // This function examines window.location.hash but doesn't change it.
      
      if (hashValues) {
        globals.ReMax = hashValues.ReMax;
        globals.ReMin = hashValues.ReMin;
        globals.ImMax = hashValues.ImMax;
        globals.ImMin = hashValues.ImMin;
        globals.grayscaleFactor = hashValues.grayscaleFactor;
      }
      else {
        globals.ReMax = adjusted_RE_MAX();
        globals.ReMin = RE_MIN;
        globals.ImMax = IM_MAX;
        globals.ImMin = IM_MIN;     
        globals.grayscaleFactor = 1; // Multiplying any value by 1 has no effect.
      } // if-else
      
      initializeWebWorkers('{{site.url}}/js/mandelbrotWebWorker.js'); // Halt any in-process Web Workers so that the back/forward buttons behave as expected (i.e., deal with the asynchronous nature of the Web Workers).
      drawMandelbrot(globals.ReMax, globals.ReMin, globals.ImMax, globals.ImMin, globals.grayscaleFactor);
    } // handelHashChange    

    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/        

    function getHashValues() {
      var dirtyComplexPlaneExtremaString = (window.location.hash).replace('#', ''); // Remove the leading "#" character from the string.
      var complexPlaneExtremaString = dirtyComplexPlaneExtremaString.split(','); // Returns an array. Assumes the following string form: "ReMax,ReMin,ImMax,ImMin,grayscaleFactor" (note that if grayscaleFactor is 1, the image's grayscale is not affected).
      
      var ReMax = parseFloat( complexPlaneExtremaString[0] ); 
      var ReMin = parseFloat( complexPlaneExtremaString[1] ); 
      var ImMax = parseFloat( complexPlaneExtremaString[2] ); 
      var ImMin = parseFloat( complexPlaneExtremaString[3] );
      var grayscaleFactor = parseFloat( complexPlaneExtremaString[4] );
      
      if ( isNaN(ReMax) || isNaN(ReMin) || isNaN(ImMax) || isNaN(ImMin) || isNaN(grayscaleFactor) ) { 
        return null;
      } // if 
      
      return {ReMax: ReMax, ReMin: ReMin, ImMax: ImMax, ImMin: ImMin, grayscaleFactor: grayscaleFactor};
    } // getHashValues
        
    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/        

    function adjusted_RE_MAX() {    
      var ReMax = globals.canvas.width * ( (IM_MAX - IM_MIN) / globals.canvas.height ) + RE_MIN;
      
      if (RE_MAX != ReMax) {
        alert("RE_MAX has been adjusted to: " + ReMax); // The user should never see this if RE_MAX is set correctly above.
      } // if

      return ReMax;
    } // adjusted_RE_MAX    
    
    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/    
    
    function drawMandelbrot(ReMax, ReMin, ImMax, ImMin, grayscaleFactor) {      
      var startTime = new Date(); // Report how long it takes to render this particular region of the Mandelbrot set.             
      var messageBox = document.getElementById('messageBox');     
      var elapsedTime =  document.getElementById('elapsedTime');     
      var canvas = globals.canvas; // A small speed optimization - accessing local variables tends to be faster than accessing global variables.
      var canvasWidth = canvas.width;
      var canvasHeight = canvas.height;
      var ctx = canvas.context;  
      var imageDataObject = ctx.imageDataObject; // imageDataObject ends up receiving an altered copy of ctx.imageDataObject, so imageDataObject is not a pointer to (reference to) ctx.imageDataObject.
      var maxPixelGrayscaleValue = 0; // This will contain the lightest shade of gray in the drawn Mandelbrot image.
      var fineDetailMandelbrotReceived = false; // Just in case the fine detail Web Worker callback finishes before the coarse detail Web Worker callback.

      messageBox.innerHTML = "計算中..."; // This isn't displayed until the drawMandelbrot function block exits.
      elapsedTime.innerHTML = ""; // Erase the prior run's statistics.
              
      var workerMessage = {
        workerID: "",
        MAX_ITERATIONS: MAX_ITERATIONS,
        ReMax: ReMax,
        ReMin: ReMin,
        ImMax: ImMax,
        ImMin: ImMin,
        grayscaleFactor: grayscaleFactor,
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
        imageDataObject: imageDataObject
      };
      
      function workerCallback(evt) { // Receive the required data from the Web Worker to draw the Mandelbrot set to the canvas (plus a few other items).          
        if (fineDetailMandelbrotReceived) {
          return; // For some reason, the fine detail callback finished before the coarse detail callback - do not display the coarse Mandelbrot image.
        }
        
        ctx.putImageData(evt.data.imageDataObject, 0, 0); // Render our carefully constructed canvas image data array to the canvas.
        globals.canvas.context.imageDataObject = evt.data.imageDataObject; 
        globals.maxPixelGrayscaleValue = evt.data.maxPixelGrayscaleValue; // Store this information in case the user clicks the Lighten button.          
      
        var elapsedMilliseconds = (new Date()) - startTime;
        elapsedTime.innerHTML = evt.data.workerID + ": " + evt.data.iterationSum.format() + " iterations in " + (elapsedMilliseconds / 1000).toFixed(2) + " seconds"; // Note that the UI element is not updated until after this block terminates (which is the desired behavior).            
        
        if (evt.data.workerID == "Fine detail") {
          fineDetailMandelbrotReceived = true;
          messageBox.innerHTML = DEFAULT_MESSAGE; // Erase the "計算中..." message and replace it with the default message.
        } // if
      } // workerCallback
      
      globals.coarseDetailWorker.onmessage = workerCallback; // I unnecessarily set this callback each time drawMandelbrot is called - this is fine in that there's no significant performance hit.
      globals.fineDetailWorker.onmessage = workerCallback;

      workerMessage.MAX_ITERATIONS = Math.round(MAX_ITERATIONS / 2); // MAX_ITERATIONS must always been a (positive) integer.
      workerMessage.workerID = "Coarse detail";
      globals.coarseDetailWorker.postMessage(workerMessage); // postMessage to the coarse detail Web Worker. 

      workerMessage.MAX_ITERATIONS = MAX_ITERATIONS;
      workerMessage.workerID = "Fine detail";                
      globals.fineDetailWorker.postMessage(workerMessage); // postMessage to the fine detail Web Worker.
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
      
      var staticZoomBoxWidth = globals.staticZoomBoxWidth;
      var staticZoomBoxHeight = globals.staticZoomBoxHeight;
      var halfStaticZoomBoxWidth = staticZoomBoxWidth / 2;
      var halfStaticZoomBoxHeight = staticZoomBoxHeight / 2;
      
      switch (evt.type) {
        case 'MSGestureStart':              
        case 'mousedown':
          globals.pointer.down = true;      
          globals.pointer.x1 = canvasX;
          globals.pointer.y1 = canvasY;
          break;
        case 'MSGestureChange':                  
        case 'mousemove':
          if (globals.pointer.down) {
            zoomBoxHeight = Math.abs(canvasY - globals.pointer.y1);  
            zoomBoxWidth = zoomBoxHeight * canvasWidthHeightRatio; // We must keep the zoom box dimensions proportional to the canvas dimensions in order to ensure that the resulting zoomed Mandelbrot image does not become skewed.
            ctx.putImageData(ctx.imageDataObject, 0, 0); // Assumes that an initial image of the Mandelbrot set is drawn before we get to this point in the code. The purpose of this line is to erase the prior zoom box rectangle before drawing the next zoom box rectangle.
            ctx.fillRect(globals.pointer.x1, globals.pointer.y1, zoomBoxWidth, zoomBoxHeight); // With a freshly painted image of the current Mandelbrot set in place (see prior line), draw a new zoom box rectangle.
          }
          break;
        case 'MSGestureEnd':
        case 'mouseup':
          globals.pointer.down = false;          
          
          zoomBoxHeight = Math.abs(canvasY - globals.pointer.y1); // Only allow the zoom box to be drawn from an upper-left corner position down to a lower-right corner position.
          zoomBoxWidth = zoomBoxHeight * canvasWidthHeightRatio; // Again, ensure that the width/height ratio of the zoom box is proportional to the canvas's (this simplifies the algorithm).          
          
          if (zoomBoxHeight == 0) { // No zoom box has been drawn, so honor the fixed sized zoom box.  
            ctx.putImageData(ctx.imageDataObject, 0, 0); // For the MSGestureHold case, erase the previously drawn zoom box so we don't draw two or more on top of each other.
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
        
          window.location.hash = ReMax + "," + ReMin + "," + ImMax + "," + ImMin + "," + globals.grayscaleFactor; // This triggers the handleHashChange event handler which, among other things, is responsible for drawing the Mandelbrot set.
          break; 
        case 'MSGestureHold':
          if (evt.detail & evt.MSGESTURE_FLAG_BEGIN) {
            ctx.fillRect(canvasX - halfStaticZoomBoxWidth, canvasY - halfStaticZoomBoxHeight, staticZoomBoxWidth, staticZoomBoxHeight); // At the first sign of a hold gesture, get the zoom box up on the screen immediately.                 
          }  
          
          // The evt.MSGESTURE_FLAG_END component of the hold gesture is handled by the "if (zoomBoxHeight == 0)" clause of the MSGestureEnd clause above.
          
          break;
        default:
          alert("Error in switch statement."); // Although unnecessary, defensive programming techniques such as this are highly recommended.
      } // switch              
    } // handlePointer    
    
    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    
    function handleResetButton() {
      window.location.hash = adjusted_RE_MAX() + "," + RE_MIN + "," + IM_MAX + "," + IM_MIN + "," + 1; // // This triggers the handleHashChange event handler which, among other things, is responsible for drawing the Mandelbrot set.
    } // handleResetButton
    
    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    
    function handleLightenButton() {
    /* 
      This creates a value (factor) such that black (0) stays black and the lightest gray value in the image becomes white (255). Thus, clicking the 
      Lighten button can remove mathematical meaning of the (proper) grayscale but can make dark images more visible.
    */
      var grayscaleFactor = 255 / globals.maxPixelGrayscaleValue; // For the canvas element, 255 is white, 0 is black.

      window.location.hash = globals.ReMax + "," + globals.ReMin + "," + globals.ImMax + "," + globals.ImMin + "," + grayscaleFactor; // This invokes handleHashChange which, among other things, is responsibile for drawing the Mandelbrot set.
    } // handleResetButton
    
    /*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

    function initializeWebWorkers(webWorkerJsPath) {
      if (globals.coarseDetailWorker) {
        globals.coarseDetailWorker.terminate();      
      }
      
      if (globals.fineDetailWorker) {
        globals.fineDetailWorker.terminate();      
      }
      
      globals.coarseDetailWorker = new Worker(webWorkerJsPath);
      globals.fineDetailWorker = new Worker(webWorkerJsPath);
    } // initializeWebWorkers
</script>