---
title: 投稿記事
layout: post
postTitle: ProcessingJS 勉強 - Vectors
categories: post processingJS
---

-----
## Khan Academy での学習

## Vectors


学習元 [Intro to vectors](https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-vectors/a/intro-to-vectors)

<div class="row">
   <div class="col-xs-4">
       <canvas id="canvas1"></canvas>
   </div>
   <div class="col-xs-8">
      <h3>ベクトルを使わない</h3>         
      <p>このプログラムでは、ボールの属性として</p>
      <table>
        <tr><td>位置</td><td>x, y</td></tr>
        <tr><td>速度</td><td>xspeed, yspeed</td></tr>
      </table>
      <pre>
var x = 100;
var y = 100;
var xspeed = 1;
var yspeed = 3.3;
var ballRadius = 32;

processing.draw = function() {
    processing.background(66, 66, 66);
 
    // Move the ball according to its speed.
    x = x + xspeed;
    y = y + yspeed;
    
    // Check for bouncing.
    if ((x > width-ballRadius/2) || (x < 0+ballRadius/2)) {
        xspeed = xspeed * -1;
    }
    if ((y > height-ballRadius/2) || (y < 0+ballRadius/2)) {
        yspeed = yspeed * -1;
    }
    
    processing.noStroke();
    processing.fill(181, 181, 181);
    // Display the ball at the location (x,y).
    processing.ellipse(x, y, ballRadius, ballRadius);
}; 
      </pre> 
   </div>
</div>

<br>

<div class="row">
        <div class="col-xs-4">
            <canvas id="canvas2"></canvas>
        </div>    

        <div class="col-xs-8">
            <h3>PVector() を使う</h3>
            <pre>
    var ballRadius = 16;
    var position = new processing.PVector(100, 100);
    var velocity = new processing.PVector(2, 5);

    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };    

    processing.draw = function() {
        processing.background(99, 99, 99);
    
        position.add(velocity);
    
        // We still sometimes need to refer to the individual components of a PVector and can do so using the dot syntax: location.x, velocity.y, etc.
        if ((position.x > width-ballRadius/2) || (position.x < 0+ballRadius/2)) {
            velocity.x = velocity.x * -1;
        }
        if ((position.y > height-ballRadius/2) || (position.y < 0+ballRadius/2)) {
            velocity.y = velocity.y * -1;
        }
    
        processing.noStroke();
        processing.fill(255, 255, 255);
        processing.ellipse(position.x, position.y, ballRadius, ballRadius);
    };
</pre> 
        </div>
</div>

<div class="row">
        <div class="col-xs-6">
            <canvas id="canvas3"></canvas>
        </div>    

        <div class="col-xs-6">
            <p>noise()を使った場合</p>
            <pre>
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

var height = 300,
    width = 300;

function sketchProc1(processing) {
 
    var x = 100;
    var y = 100;
    var xspeed = 1;
    var yspeed = 3.3;
    var ballRadius = 32;

    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);

    };    

    processing.draw = function() {
        processing.background(66, 66, 66);
 
        // Move the ball according to its speed.
        x = x + xspeed;
        y = y + yspeed;
    
        // Check for bouncing.
        if ((x > width-ballRadius/2) || (x < 0+ballRadius/2)) {
            xspeed = xspeed * -1;
        }
        if ((y > height-ballRadius/2) || (y < 0+ballRadius/2)) {
            yspeed = yspeed * -1;
        }
    
        processing.noStroke();
        processing.fill(181, 181, 181);
        // Display the ball at the location (x,y).
        processing.ellipse(x, y, ballRadius, ballRadius);
    }; 
};  

function sketchProc2(processing) {

    var ballRadius = 16;
    var position = new processing.PVector(100, 100);
    var velocity = new processing.PVector(2, 5);

    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };    

    processing.draw = function() {
        processing.background(99, 99, 99);
    
        position.add(velocity);
    
        // We still sometimes need to refer to the individual components of a PVector and can do so using the dot syntax: location.x, velocity.y, etc.
        if ((position.x > width-ballRadius/2) || (position.x < 0+ballRadius/2)) {
            velocity.x = velocity.x * -1;
        }
        if ((position.y > height-ballRadius/2) || (position.y < 0+ballRadius/2)) {
            velocity.y = velocity.y * -1;
        }
    
        processing.noStroke();
        processing.fill(255, 255, 255);
        processing.ellipse(position.x, position.y, ballRadius, ballRadius);
    };
};  

function sketchProc3(processing) {
 
  
};  


var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
var canvas3 = document.getElementById("canvas3");

// attaching the sketchProc function to the canvas
var p1 = new Processing(canvas1, sketchProc1);
var p2 = new Processing(canvas2, sketchProc2);
var p3 = new Processing(canvas3, sketchProc3);
// p.exit(); to detach it

</script>
