---
title: 投稿記事
layout: post
postTitle: Ellipse(楕円)-Eccentricity
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

var height = 900,
    width = 900;
var scale = 2;    

function sketchProc1(processing) {
    processing.angleMode = "degrees";
    var Orbit = function(name,x,y,e,a,rot) {
        this.name = name;
        this.eccentricity = e;
        this.x = x;
        this.y = y;
        this.semiAxis = a;
        this.rot = rot;
    };

    Orbit.prototype.display = function() {
        processing.stroke(255,255,255);
        processing.strokeWeight(1);
        processing.fill(255, 255, 255);
        processing.pushMatrix();
        processing.scale(scale);
        var c = this.eccentricty * this.semiAxis;
        processing.translate(width/2*scale,height/2*scale);
        processing.rotate(this.rot-90);
        for (var i=0;i<360;i=i+0.05){
            var r = this.semiAxis*(1-Math.pow(this.eccentricity,2))/(1+this.eccentricity*processing.cos(i));
            if(i==0){console.log(r);};
            var x = r*processing.cos(i);
            var y = r*processing.sin(i);
            x = processing.map(x,0,14000,0,width); 
            y = processing.map(y,0,14000,0,height);
            processing.point(x,y);
        }
        processing.ellipse(c,0,3,3);
        processing.popMatrix();
    };

    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
        processing.background(66, 66, 66);
        for (var i = 0; i < orbits.length; i++) {
          orbits[i].display();
        };

    };

    var orbits = [];
    orbits.push(new Orbit("Mercury",0,0,0.205,57.9,77.45)); 
    orbits.push(new Orbit("Venus",0,0,0.007,108.2,131.6)); 
    orbits.push(new Orbit("Earth",0,0,0.017,149.6,0)); 
    orbits.push(new Orbit("Mars",0,0,0.094,227.9,-23.94)); 
    orbits.push(new Orbit("Jupiter",0,0,0.049,778.6,14.73)); 
    orbits.push(new Orbit("Saturn",0,0,0.057,1433.5,92.6)); 
    orbits.push(new Orbit("Uranus",0,0,0.046,2872.5,170.95)); 
    orbits.push(new Orbit("Nepture",0,0,0.011,4495.1,44.96)); 
    orbits.push(new Orbit("Pluto",0,0,0.244,5906.4,224.07)); 

    processing.draw = function() {

        for (var i = 0; i < orbits.length; i++) {
     //     orbits[i].display();
        };
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
