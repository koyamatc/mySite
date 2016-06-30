---
title: 投稿記事
layout: post
postTitle: ProcessingJS 勉強 - Forces
categories: post processingJS
---

-----
## Khan Academy での学習

## Forces


学習元 [Forces](https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-forces/a/newtons-laws-of-motion)

<div class="row">
   <div class="col-xs-4">
       <canvas id="canvas1"></canvas>
   </div>
   <div class="col-xs-8">
      <pre>
</pre> 
   </div>
</div>

<br>



<script src="//code.jquery.com/jquery-1.11.3.js"></script>
<script src="{{site.url}}/js/processing.min.js" charset="utf-8"></script>
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sons-of-obsidian"></script>
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_SVG"></script>
<script type="text/javascript">
var $window = $(window)
  // make code pretty
  $('pre').addClass('prettyprint');
  $('pre').css({"background":"#111",
	  	           "font-size":"1.05em",
		                "border":"0px"}
		            );
  $('code').css({"font-size":"1.05em","color":"#f00"});

var height = 800,
    width = 800;

function sketchProc1(processing) {
 
    var Mover = function(x,y,e,a) {
        // Set mass equal to 1 for simplicity
        this.eccentricity = e;
        this.x = x;
        this.y = y;
        this.semiAxis = a;
    };

    Mover.prototype.display = function() {
        processing.stroke(255,255,255);
        processing.strokeWeight(2);
        processing.fill(255, 255, 255);
        processing.pushMatrix();
        var c = this.eccentricty * this.semiAxis;
        processing.translate(c,height/2)
        for (var i=0;i<360;i++){
            var r = this.semiAxis*(1-this.eccentricity^2)/(1+this.eccentricity*processing.cos(i));
            var x = r*processing.cos(i);
            var y = r*processing.sin(i); 
            processing.point(x,y);
        }
        processing.popMatrix();
    };

    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
        processing.background(66, 66, 66);
    };

    var m = new Mover(0,0,40/60,100); 

    processing.draw = function() {
    
        m.display();
    }; 
};  

var canvas1 = document.getElementById("canvas1");

// attaching the sketchProc function to the canvas
var p1 = new Processing(canvas1, sketchProc1);

// p.exit(); to detach it
$("#reset2").on("click",function(){
  p2.exit(); //to detach it
  p2 = new Processing(canvas2, sketchProc2);  
});

</script>
