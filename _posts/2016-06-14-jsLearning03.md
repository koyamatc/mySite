---
title: 投稿記事
layout: post
postTitle: ProcessingJS 勉強 - Random walker
categories: post processingJS
---

-----
## Khan Academy での学習

[Randomness](https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-randomness/a/random-walks)

<div class="row">
        <div class="col-xs-6">
            <canvas id="canvas1"></canvas>
        </div>    

        <div class="col-xs-6">
<pre>
function sketchProc(processing) {
 
    var height = 500,
        width = 500;
    var ellipseRadius = 5;
    var stepSize = 3;    

    /*-------
        Walker Object
                        */
    var Walker = function() {
        this.x = width/2;
        this.y = height/2;
        processing.noStroke();
    };
    // display method                 
    Walker.prototype.display = function() {
      //  processing.stroke(0, 0, 0);
        processing.fill(Math.floor(processing.random(256)),
             Math.floor(processing.random(256)),
             Math.floor(processing.random(256)));
        processing.ellipse(this.x, this.y, ellipseRadius, ellipseRadius);
    };
    // walk method 
    Walker.prototype.walk = function() {
        var choice = Math.floor(processing.random(8));
        if (choice === 0) {
            this.x += stepSize;
        } else if (choice === 1) {
            this.x -= stepSize;
        } else if (choice === 2) {
            this.y += stepSize;
        } else if (choice === 3){
            this.y -= stepSize;
        } else if (choice === 4){
            this.x += stepSize;
            this.y += stepSize;
        } else if (choice === 5){
            this.x += stepSize;
            this.y -= stepSize;
        } else if (choice === 6){
            this.x -= stepSize;
            this.y += stepSize;
        } else {
            this.x -= stepSize;
            this.y -= stepSize;
        } 
    };

    // Walker instance
    var w = new Walker();
    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };    
    // draw
    processing.draw = function() {
        w.walk();
        w.display();
    };
  
};  

</pre> 
        </div>
</div>
<br>

[モンテカルロ法](https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-randomness/a/custom-distribution-of-random-numbers)

<div class="row">
        <div class="col-xs-6">
            <canvas id="canvas2"></canvas>
        </div>    

        <div class="col-xs-6">
<pre>
function sketchProc2(processing) {
 
    var height = 500,
        width = 500;
    var ellipseRadius = 5;
    var stepSize = 3;   
    
    // Generates random numbers using the Monte Carlo Method
    var monteCarlo = function() {
        while (true) {
            var r1 = processing.random(1);
            var probability = r1;
            var r2 = processing.random(1);
            if (r2 < probability) {
                return r1;
            }
        }
    };

    /*-------
        Walker Object
                        */
    var Walker = function() {
        this.x = width/2;
        this.y = height/2;
        processing.noStroke();
    };
    // display method                 
    Walker.prototype.display = function() {
      //  processing.stroke(0, 0, 0);
        processing.fill(Math.floor(processing.random(256)),
             Math.floor(processing.random(256)),
             Math.floor(processing.random(256)));
        processing.ellipse(this.x, this.y, ellipseRadius, ellipseRadius);
    };
    // walk method 
    Walker.prototype.walk = function() {
        var stepSize = monteCarlo() * 10;
 
        var xStepSize = processing.random(-stepSize, stepSize);
        var yStepSize = processing.random(-stepSize, stepSize);
  
        this.x += xStepSize;
        this.y += yStepSize;
    };

    // Walker instance
    var w = new Walker();
    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };    
    // draw
    processing.draw = function() {
        w.walk();
        w.display();
    };
  
};
</pre> 
        </div>
</div>

<script src="//code.jquery.com/jquery-1.11.3.js"></script>
<script src="{{site.url}}/js/processing.min.js" charset="utf-8"></script>
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sons-of-obsidian"></script>
<script type="text/javascript">
var $window = $(window)
  // make code pretty
  $('pre').addClass('prettyprint');
  $('pre').css({"background":"#111",
	  	           "font-size":"1.05em",
		                "border":"0px"}
		            );
  $('code').css({"font-size":"1.05em","color":"#f00"});

function sketchProc(processing) {
 
    var height = 500,
        width = 500;
    var ellipseRadius = 5;
    var stepSize = 3;    

    /*-------
        Walker Object
                        */
    var Walker = function() {
        this.x = width/2;
        this.y = height/2;
        processing.noStroke();
    };
    // display method                 
    Walker.prototype.display = function() {
      //  processing.stroke(0, 0, 0);
        processing.fill(Math.floor(processing.random(256)),
             Math.floor(processing.random(256)),
             Math.floor(processing.random(256)));
        processing.ellipse(this.x, this.y, ellipseRadius, ellipseRadius);
    };
    // walk method 
    Walker.prototype.walk = function() {
        var choice = Math.floor(processing.random(8));
        if (choice === 0) {
            this.x += stepSize;
        } else if (choice === 1) {
            this.x -= stepSize;
        } else if (choice === 2) {
            this.y += stepSize;
        } else if (choice === 3){
            this.y -= stepSize;
        } else if (choice === 4){
            this.x += stepSize;
            this.y += stepSize;
        } else if (choice === 5){
            this.x += stepSize;
            this.y -= stepSize;
        } else if (choice === 6){
            this.x -= stepSize;
            this.y += stepSize;
        } else {
            this.x -= stepSize;
            this.y -= stepSize;
        } 
    };

    // Walker instance
    var w = new Walker();
    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };    
    // draw
    processing.draw = function() {
        w.walk();
        w.display();
    };
  
};  
function sketchProc2(processing) {
 
    var height = 500,
        width = 500;
    var ellipseRadius = 5;
    var stepSize = 3;   
    
    // Generates random numbers using the Monte Carlo Method
    var monteCarlo = function() {
        while (true) {
            var r1 = processing.random(1);
            var probability = r1;
            var r2 = processing.random(1);
            if (r2 < probability) {
                return r1;
            }
        }
    };

    /*-------
        Walker Object
                        */
    var Walker = function() {
        this.x = width/2;
        this.y = height/2;
        processing.noStroke();
    };
    // display method                 
    Walker.prototype.display = function() {
      //  processing.stroke(0, 0, 0);
        processing.fill(Math.floor(processing.random(256)),
             Math.floor(processing.random(256)),
             Math.floor(processing.random(256)));
        processing.ellipse(this.x, this.y, ellipseRadius, ellipseRadius);
    };
    // walk method 
    Walker.prototype.walk = function() {
        var stepSize = monteCarlo() * 10;
 
        var xStepSize = processing.random(-stepSize, stepSize);
        var yStepSize = processing.random(-stepSize, stepSize);
  
        this.x += xStepSize;
        this.y += yStepSize;
    };

    // Walker instance
    var w = new Walker();
    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };    
    // draw
    processing.draw = function() {
        w.walk();
        w.display();
    };
  
};  

var canvas = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");

// attaching the sketchProc function to the canvas
var p = new Processing(canvas, sketchProc);
var p2 = new Processing(canvas2, sketchProc2);
// p.exit(); to detach it

</script>
