---
title: 投稿記事
layout: post
postTitle: マンデルブロ集合2
categories: post composition
---

<div class="row">
  <div class="col-sm-6">
    <div id="svg"></div>
  </div>
  <div class="col-sm-6">
    <p>
    マンデルブロ集合の図形を描いてみたくて、探していたら、MSDN（MicroSoft Developer Network）のライブラリに掲載されているのを見つけました。
    </p>

    <a href="http://msdn.microsoft.com/ja-jp/library/jj635756(v=vs.85).aspx">HTML5 を使ってマンデルブロ集合を調べる方法</a>
    <br>
    <p>
    元はグレースケールだったので、色付けをして試してみました・・
    </p>
    <p>集合のふちをズームしていくと、いろいろなパターンの図形が見えてきます。</p>
  </div>	
</div>

- - -

<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script>
  var CPS = 2; // CPS stands for "complex plane square". That is, we are examining a 2*CPS by 2*CPS square region of the complex plane such that this square (or box) is centered at the complex plane's origin.
  var MAX_ITERATIONS = 600; // Increase to improve detection of complex c values that belong to the Mandelbrot set.
  var DELTA = 0.008; // Decreasing this value increases the number of "pixels" on the canvas, thereby increasing the size of the rendering but without losing image resolution.

  function Complex(x, y) {
    // Constructs the complex number x + yi.
    this.x = x || 0; // Default to 0 if this parameter is undefined.
    this.y = y || 0;
  } // Complex
    
  Complex.prototype.toString = function() {
  // Returns a string representing this complex number in the form "x + yi".
    return this.y >= 0 ? this.x + " + " + this.y + "i" : this.x + " - " + (-this.y) + "i";
  } // toString
    
  Complex.prototype.modulus = function() {
  // Returns a real number equal to the absolute value of this complex number.
    return Math.sqrt(this.x*this.x + this.y*this.y);
  } // modulus
        
  Complex.prototype.add = function(z) {
  // Returns a complex number equal to the sum of the given complex number and this complex number.
    return new Complex(this.x + z.x, this.y + z.y);
  } // sum

  Complex.prototype.square = function() {
  // Returns a complex number equal to the square of this complex number.
    var x = this.x*this.x - this.y*this.y;
    var y = 2*this.x*this.y;
      
    return new Complex(x, y);
  } // square
  
  // svg area 
   var width = 500;
    var height = 500;
    var vbox_x = 500;
    var vbox_y = 500;
    var vbox_default_width = vbox_width = 1000;
    var vbox_default_height = vbox_height = 1000;
    var bgColor = "#000";

  var linearScaleX = d3.scale.linear()
                          .domain([-2,2])
                          .range([0,width]);              
  var linearScaleY = d3.scale.linear()
                          .domain([2,-2])
                          .range([0,height]);              

  var lineFunction = d3.svg.line()
                          .x(function(d,i) { return boxX[i]; })
                          .y(function(d,i) { return boxY[i]; })
                          .interpolate("linear");  
                                                  
  var zoom = d3.behavior.zoom()
    .scaleExtent([1, 100])
    .on("zoom", zoomed);              

  var svg01 = d3.select("#svg")
              .append("svg")
              .attr("height",height)
              .attr("width",width)
  //            .attr("viewBox", "" + vbox_x + " " + vbox_y + " " + vbox_width + " " + vbox_height) //viewBox属性を付加
 
              .style("background",bgColor); 

  var container = svg01.append("g")
                  .call(zoom);

  var boxX = [];            
  var boxY = [];            

    drawMandelbrotSet();          

    function drawMandelbrotSet() {
                    
      for (var Re = -CPS; Re <= CPS; Re = Re + DELTA) { // Represents the Re-axis. Re represents the real part of a complex c value.
        next_c_value: // "continue next_c_value;" is equivalent to an old school GOTO statement (which can be very handy in deeply nested loops).
        for (var Im = -CPS; Im <= CPS; Im = Im + DELTA) { // Represents the Im-axis. Im represents the imaginary part of a complex c value.
          var z = new Complex(0, 0); // Represents Zo (where "o" indicates subscript 0).
          var c = new Complex(Re, Im); // Represents a complex c value, which either does or does not belong to the Mandelbrot set, as determined in the next FOR loop.
          
          for (var iterationCount = 1; iterationCount <= MAX_ITERATIONS; iterationCount++) {
            z = c.add( z.square() ); // Performs Zn+1 = (Zn)^2 + c          
            if (z.modulus() > 2) {
              continue next_c_value; // The complex c value is not part of the Mandelbrot set, so immediately check the next one.
            }; // if
          }; // for
          
          // Assert: z.modulus() <= 2, therefore the complex c value is probably a member of the Mandelbrot set - increase MAX_ITERATIONS to improve this determination.
          boxX.push(linearScaleX(Re));
          boxY.push(linearScaleY(Im));

           // This c value is probably part of the Mandelbrot set, so color this pixel black. A "pixel" for the canvas is a DELTA x DELTA black square.
        }; // for
      }; // for

      container.selectAll("rect")
          .data(boxX)
          .enter()
          .append("rect")
          .attr("x",function(d,i){return boxX[i]})
          .attr("y",function(d,i){return boxY[i]})
          .attr("width",1)
          .attr("height",1)
          .style("fill","gold");

      alert(Re);
    }; // drawMandelbrotSet
 
 function zoomed() {
  container.attr("transform", 
    "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}             
</script>