---
title: 投稿記事
layout: post
postTitle: Processing.js
categories: post processing
---

-----

<div>

<canvas id="canvas1" width="500" height="500"></canvas>

</div>

<script src="//code.jquery.com/jquery-1.11.3.js"></script>
<script src="{{site.url}}/js/processing.min.js" charset="utf-8"></script>
<script type="text/javascript">
function sketchProc(processing) {
  
  processing.setup = function(){
    // canvas size 
    processing.size(500,500);
  }

  processing.draw = function() {
    
    processing.background(255, 255, 255);
    
    processing.fill(255,0,0);
    processing.ellipse(200, 200, 30, 30);
    
  };
};  

var canvas = document.getElementById("canvas1");

// attaching the sketchProc function to the canvas
var p = new Processing(canvas, sketchProc);
// p.exit(); to detach it

</script>
