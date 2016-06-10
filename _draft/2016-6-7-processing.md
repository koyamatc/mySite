---
title: 投稿記事
layout: post
postTitle: Processing.js
categories: post processing
---

-----

<div>

<canvas id="canvas1"></canvas>

</div>

<script src="//code.jquery.com/jquery-1.11.3.js"></script>
<script src="{{site.url}}/js/processing.min.js" charset="utf-8"></script>
<script type="text/javascript">
function sketchProc(processing) {
  
  var x = 20;
  var speed = 3;
  var ballRadius = 50;

  processing.setup = function(){
    // canvas size 
    processing.size(500,500);
  }

  processing.draw = function() {
    
    processing.background(255, 255, 255);
    
    processing.fill(255,0,0);
    processing.ellipse(x, 250, ballRadius, ballRadius);

    if(x > 500-ballRadius/2){speed = -3};
    if(x < ballRadius/2){speed = 3};

    x += speed;
    
  };
};  

var canvas = document.getElementById("canvas1");

// attaching the sketchProc function to the canvas
var p = new Processing(canvas, sketchProc);
// p.exit(); to detach it

</script>
