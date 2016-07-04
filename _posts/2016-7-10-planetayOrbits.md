---
title: 投稿記事
layout: post
postTitle: 太陽系惑星軌道
categories: post processingJS
---

-----
## 太陽系の惑星＋冥王星の軌道

<div class="row">
   <div class="col-xs-6">
       <canvas id="canvas1"></canvas>
       <div class="tz-container">
          <em>スケール  </em>
          <div id="scale" class="sl"></div>
          <div id="scale-value" class="sl"></div>
       </div>  
   </div>
   <div class="col-xs-6">
      <pre>
</pre> 
   </div>
</div>

<br>
<div class="row">
   <div class="col-xs-6">
       <canvas id="canvas2"></canvas>
   </div>
   <div class="col-xs-6">
      <pre>
</pre> 
   </div>
</div>



<script src="//code.jquery.com/jquery-1.11.3.js"></script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
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


function sketchProc1(processing) {

var height = 900,
    width = 900;
var scale = 0.1;    
$(".sl").css({"display":"inline-block"});

$("#scale").slider({min:0.005, max: 2, value: 0.005, step: 0.002, animate: "fast"})
          .css({"width":"400px"});

$( "#scale-value" ).html( $( "#scale" ).slider("option", "value") );
// sliderのchangeイベントの処理
$( "#scale" ).on( "slidechange", function( event, ui ) {
    $( "#scale-value" ).html(ui.value);
    scale = ui.value;
    processing.background(66, 66, 66);
    for (var i = 0; i < orbits.length; i++) {
          orbits[i].display();
    };

} );
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
        processing.translate(width/(2*scale),height/(2*scale));
        processing.rotate(this.rot-90);
        for (var i=0;i<360;i=i+0.05){
            var r = this.semiAxis*(1-Math.pow(this.eccentricity,2))/(1+this.eccentricity*processing.cos(i));
            var x = r*processing.cos(i);
            var y = r*processing.sin(i);
            processing.point(x,y);
        }
        processing.fill(255,255,0);
        processing.ellipse(c,0,15,15);
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

    }; 
};  

function sketchProc2(processing) {

    var height = 400,
        width = 500;
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
        var c = this.eccentricty * this.semiAxis;
        console.log(this.eccentricty);
        processing.translate(width/2-c,height/2);
        for (var i=0;i<360;i=i+0.05){
            var r = this.semiAxis*(1-Math.pow(this.eccentricity,2))/(1+this.eccentricity*processing.cos(i));
            var x = r*processing.cos(i);
            var y = r*processing.sin(i);
            processing.point(x,y);
        }
        processing.fill(255,255,0);
        processing.ellipse(c,0,15,15);
        processing.ellipse(-1*c,0,30,15);
        processing.popMatrix();
    };

    var orbits = new Orbit("Ellipse",0,0,0.5,150,0);
    //orbits.push(new Orbit("Ellipse",0,0,0.5,150,0)); 

    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
        
        processing.background(66, 66, 66);
     //   for (var i = 0; i < orbits.length; i++) {
          orbits.display();
       // };
    };


    processing.draw = function() {

    }; 
};  

var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");

// attaching the sketchProc function to the canvas
var p1 = new Processing(canvas1, sketchProc1);
var p2 = new Processing(canvas2, sketchProc2);

// p.exit(); to detach it
$("#reset2").on("click",function(){
  p2.exit(); //to detach it
  p2 = new Processing(canvas2, sketchProc2);  
});

</script>
