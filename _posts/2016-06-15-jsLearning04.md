---
title: 投稿記事
layout: post
postTitle: ProcessingJS 勉強 - Noise
categories: post processingJS
---

-----
## Khan Academy での学習

[Perlin noise](https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-noise/a/perlin-noise)

## Perlin Noise
<div class="row">
   <div class="col-xs-6">
       <canvas id="canvas1"></canvas>
   </div>
   <div class="col-xs-6">
      <p>Perlin noise(Ken Perlinが考案) を使用した描画</p>
      <p>山並み、雲、　ＵＦＯ　の描画に noise() を使用しています</p>
      <p>random() との違いは、隣り合った値は極端に離れた値にはならない</p> 
<pre>
var incAmount = 0.01;

// mountains 
for (var t = 0; t &lt; incAmount*width; t += incAmount) {
   var n = processing.noise(t);
   var n2 = processing.noise(t+15);
   var n3 = processing.noise(t+30);
   var y = processing.map(n, 0, 1, 0, height/2);
   var y2 = processing.map(n2, 0, 1, 0, height/2+70);
   var y3 = processing.map(n3, 0, 1, 0, height/2+150);
    
   processing.noStroke();
   processing.fill(209, 188, 188);
   processing.rect(t*100, height-y3, 1, y3);

   processing.fill(161, 137, 137);
   processing.rect(t*100, height-y2, 1, y2);

   processing.fill(0, 0, 0);
   processing.rect(t*100, height-y, 1, y);

}
  
</pre> 
   </div>
</div>

<br>

## ２次元ノイズ

[２Ｄ noise](https://www.khanacademy.org/computing/computer-programming/programming-natural-simulations/programming-noise/a/two-dimensional-noise)

<div class="row">
        <div class="col-xs-6">
            <canvas id="canvas2"></canvas>
        </div>    

        <div class="col-xs-6">
            <P>random()を使った場合</P>
<pre>
for (var x = 0; x &lt; 500; x++) {
    for (var y = 0; y &lt; 500; y++) {
        // A random brightness!
        var bright = processing.random(255);
        processing.stroke(bright, bright, bright);
        processing.point(x, y);
    }
}

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
var xoff = 0.0;
for (var x = 0; x &lt; 500; x++) {
    var yoff = 10.0;
    for (var y = 0; y &lt; 500; y++) {
       var bright = processing.map(processing.noise(xoff, yoff), 0, 1, 0, 255);
        processing.stroke(bright, bright, bright);
        processing.point(x, y);
        yoff += 0.01;
    }
    xoff += 0.01;
}
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
    var t1 = 0;
    var t2 = 12;

    // UFO Object
    var UFO = function(config){
        this.x = config.x || width/2;
        this.y = config.y || height/2; 
    };
    UFO.prototype.draw = function(t){
        var x = processing.map(processing.noise(t+5),0,1,0,width);
        var y = processing.map(processing.noise(t),0,1,100,height/2);
        
        processing.ellipse(x, y, 40,10);
        processing.ellipse(x, y-5, 15,10);

    };

    var u = new UFO({
        x:"",
        y:""
    });

    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);

        processing.noStroke();

    };

    var t = 0.0;

    var drawRange = function() {
        var incAmount = 0.01;
        processing.background(84, 194, 222);

        // mountains 
        for (var t = 0; t < incAmount*width; t += incAmount) {
            var n = processing.noise(t);
            var n2 = processing.noise(t+15);
            var n3 = processing.noise(t+30);
            var y = processing.map(n, 0, 1, 0, height/2);
            var y2 = processing.map(n2, 0, 1, 0, height/2+70);
            var y3 = processing.map(n3, 0, 1, 0, height/2+150);
    
            processing.noStroke();
            processing.fill(209, 188, 188);
            processing.rect(t*100, height-y3, 1, y3);

            processing.fill(161, 137, 137);
            processing.rect(t*100, height-y2, 1, y2);

            processing.fill(0, 0, 0);
            processing.rect(t*100, height-y, 1, y);

        }
        
        // Clouds
        for (var t = 0.5; t < (incAmount)*width/4; t += incAmount+0.05) {
            var n = processing.noise(t);
            var n2 = processing.noise(t+1);
            var n3 = processing.noise(t-3);
            var y = processing.map(n, 0, 1, 0, height/2);
            var y2 = processing.map(n2, 0, 1, 0, height/3);
            var y3 = processing.map(n3, 0, 1, 0, height/3+30);
    
            processing.noStroke();
            var bright = processing.map(processing.noise(t,t+5),0,1,168,255); 
            processing.fill(bright, bright, bright);
            processing.ellipse(t*100, y, y2, y3);

        }
        for (var t = (incAmount)*2*width/3; t < (incAmount)*width; t += incAmount+0.05) {
            var n = processing.noise(t);
            var n2 = processing.noise(t+1);
            var n3 = processing.noise(t-3);
            var y = processing.map(n, 0, 1, 0, height/2);
            var y2 = processing.map(n2, 0, 1, 0, height/3);
            var y3 = processing.map(n3, 0, 1, 0, height/3+30);
    
            processing.noStroke();
            var bright = processing.map(processing.noise(t,t+t),0,1,128,255); 
            processing.fill(bright, bright, bright);
            processing.ellipse(t*100, y-30, y2, y3);

        }
        // trees
        for (var t = 0.0; t < incAmount*width; t += incAmount*15) {
            var rate = processing.noise(t,t+1);
            var n = processing.noise(t+4);
            var y = processing.map(n, 0, 1, 0, height/4);
            if (rate < 0.47){
                processing.fill(200,128,0);
                processing.rect(t*100-3, height-y, 4, 15);
                processing.fill(0,255,0);
                processing.ellipse(t*100, height-y, 15, 10);
            }
        }    
    };
    
    processing.draw = function(){
        drawRange();

        processing.noStroke();
        processing.fill(255,255,0);
        u.draw(t);
            
        t+=0.01;

    }     
 
};  

function sketchProc2(processing) {
 
    var height = 500,
        width = 500;
    

    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);

        for (var x = 0; x < 500; x++) {
            for (var y = 0; y < 500; y++) {
                // A random brightness!
                var bright = processing.random(255);
                processing.stroke(bright, bright, bright);
                processing.point(x, y);
            }
        }

    };    
    // draw
    processing.draw = function() {

    };
  
};  

function sketchProc3(processing) {
 
    var height = 500,
        width = 500;
    

    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);

        var xoff = 0.0;
        for (var x = 0; x < 500; x++) {
            var yoff = 10.0;
            for (var y = 0; y < 500; y++) {
                var bright = processing.map(processing.noise(xoff, yoff), 0, 1, 0, 255);
                processing.stroke(bright, bright, bright);
                processing.point(x, y);
                yoff += 0.01;
            }
            xoff += 0.01;
        }
    };    
    // draw
    processing.draw = function() {

    };
  
};  


var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
var canvas3 = document.getElementById("canvas3");

// attaching the sketchProc function to the canvas
var p1 = new Processing(canvas1, sketchProc);
var p2 = new Processing(canvas2, sketchProc2);
var p3 = new Processing(canvas3, sketchProc3);
// p.exit(); to detach it

</script>
