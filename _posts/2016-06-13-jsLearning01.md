---
title: 投稿記事
layout: post
postTitle: ProcessingJS 勉強 - Object
categories: post processingJS
---

-----
<div>

<canvas id="canvas1"></canvas>

</div>

<pre>
function sketchProc(processing) {
  
  var height = 500,
      width = 500;
  
  // Button Object
  var Button = function(config) {
      this.x = config.x || 0;
      this.y = config.y || 0;
      this.width = config.width || 150;
      this.height = config.height || 50;
      this.label = config.label || "Click";
      this.message = config.message || "Clicked";
  };
  Button.prototype.draw = function() {
      processing.fill(0, 234, 255);
      processing.rect(this.x, this.y, this.width, this.height, 5);
      processing.fill(0, 0, 0);
      processing.textSize(19);
      processing.textAlign(processing.LEFT, processing.TOP);
      processing.text(this.label, this.x+10, this.y+this.height/4);
  };
  Button.prototype.isMouseInside = function() {
    return processing.mouseX > this.x &&
           processing.mouseX < (this.x + this.width) &&
           processing.mouseY > this.y &&
           processing.mouseY < (this.y + this.height);
  };
  Button.prototype.handleMouseClick = function() {
    if (this.isMouseInside()) {
         console.log(this.message);
    } else { console.log("Out");}
  };
 
  processing.setup = function(){
    // canvas size 
    processing.size(width,height);
    
    var btn1 = new Button({
        x:250, 
        y:150, 
        label:"Please click!",
        message:"btn1 is clicked!"
    });

    btn1.draw();

    var btn2 = new Button({
        x:250, 
        y:250, 
        label:"No! Click Me!"
    });

    btn2.draw();

    processing.mouseClicked = function(){
      btn1.handleMouseClick();
    };  

  }
  
  
};  

var canvas = document.getElementById("canvas1");

// attaching the sketchProc function to the canvas
var p = new Processing(canvas, sketchProc);
// p.exit(); to detach it
  
</pre> 

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

  //$("#logo").lettering();

function sketchProc(processing) {
  
  var height = 500,
      width = 500;
  
  // Button Object
  var Button = function(config) {
      this.x = config.x || 0;
      this.y = config.y || 0;
      this.width = config.width || 150;
      this.height = config.height || 50;
      this.label = config.label || "Click";
      this.message = config.message || "Clicked";
  };
  Button.prototype.draw = function() {
      processing.fill(0, 234, 255);
      processing.rect(this.x, this.y, this.width, this.height, 5);
      processing.fill(0, 0, 0);
      processing.textSize(19);
      processing.textAlign(processing.LEFT, processing.TOP);
      processing.text(this.label, this.x+10, this.y+this.height/4);
  };
  Button.prototype.isMouseInside = function() {
    return processing.mouseX > this.x &&
           processing.mouseX < (this.x + this.width) &&
           processing.mouseY > this.y &&
           processing.mouseY < (this.y + this.height);
  };
  Button.prototype.handleMouseClick = function() {
    if (this.isMouseInside()) {
         console.log(this.message);
    } else { console.log("Out");}
  };
 
  processing.setup = function(){
    // canvas size 
    processing.size(width,height);
    
    var btn1 = new Button({
        x:250, 
        y:150, 
        label:"Please click!",
        message:"btn1 is clicked!"
    });

    btn1.draw();

    var btn2 = new Button({
        x:250, 
        y:250, 
        label:"No! Click Me!"
    });

    btn2.draw();

    processing.mouseClicked = function(){
      btn1.handleMouseClick();
    };  

  }
  
  
};  

var canvas = document.getElementById("canvas1");

// attaching the sketchProc function to the canvas
var p = new Processing(canvas, sketchProc);
// p.exit(); to detach it

</script>
