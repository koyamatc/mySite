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
          <em>スケール -- </em>
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
      楕円
      $$中心座標(0, 0)$$
      $$長半径(a)=150$$
      $$離心率(e)=0.5$$
      $$黄色と緑の点は楕円の焦点(foci)$$
      $$fociの座標は(f, 0) と (-f, 0)$$
      $$離心率(e) = \frac{f}{a} \rightarrow f = a * e$$
      $$f = 150 * 0.5 = 75$$
      $$黄色の焦点から引かれた直線が描く楕円までの距離をr(赤線)とすると$$
      $$r=a*\frac{1-e^{2}}{1+e * \cos(\theta)}$$
      $$x座標\quad x=r * \cos(\theta)$$
      $$y座標\quad y=r * \sin(\theta)$$ 
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
var scale = 0.05;    
var font = new processing.PFont()
$(".sl").css({"display":"inline-block"});

$("#scale").slider({min:0.05, max: 1.8, value: 0.05, step: 0.002, animate: "fast"})
          .css({"width":"400px"});

$( "#scale-value" ).html( $( "#scale" ).slider("option", "value") );
// sliderのchangeイベントの処理
$( "#scale" ).on( "slidechange", function( event, ui ) {
    $( "#scale-value" ).html(ui.value);
    scale = ui.value;
    processing.background(0, 0, 0);
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
        processing.strokeWeight(2);
        processing.fill(255, 255, 255);
        processing.pushMatrix();
        processing.scale(scale);
        // foci の　ｘ座標を計算
        var c = this.eccentricty * this.semiAxis;
        // 座標の移動
        processing.translate(width/(2*scale),height/(2*scale));

        var x0,y0;
        for (var i=0;i<360;i=i+0.05){
            var r = this.semiAxis*(1-Math.pow(this.eccentricity,2))/(1+this.eccentricity*processing.cos(i));
            var x = r*processing.cos(i);
            var y = r*processing.sin(i);
            // 原点で回転し座標返還
            var x1 = x*processing.cos(this.rot) - y*processing.sin(this.rot);
            var y1 = (x*processing.sin(this.rot) + y*processing.cos(this.rot))*-1;
            // 軌道描画
            processing.stroke(255,0,0);
            processing.point(x1,y1);
            // 文字表示位置を退避
            if (i===0){
              x0 = x1;
              y0 = y1;
            }
        }
        // 惑星名描画
        processing.textSize(12/scale);
        processing.text(this.name,x1,y1);
        processing.textAlign(processing.LEFT);
        // 太陽描画
        processing.noStroke();
        processing.fill(255,255,0);
        processing.ellipse(c,0,15,15);
        processing.popMatrix();
    };

    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
        // 初期軌道描画
        processing.background(0, 0, 0);
        for (var i = 0; i < orbits.length; i++) {
          orbits[i].display();
        };
    };

    // 軌道データ作成
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

};  

function sketchProc2(processing) {

    var height = 400,
        width = 500;
    
    processing.angleMode = "degrees";
    
    var Orbit = function(x,y,e,a) {
        this.x = x;
        this.y = y;
        this.eccentricity = e;
        this.semiAxis = a;
    };

    Orbit.prototype.display = function() {
        processing.stroke(255,255,255);
        processing.strokeWeight(1);
        processing.fill(255, 255, 255);
        processing.pushMatrix();
        var c = this.eccentricity * this.semiAxis;
        processing.translate(width/2,height/2);
        for (var i=0;i<360;i=i+0.05){
            var r = this.semiAxis*(1-Math.pow(this.eccentricity,2))/(1+this.eccentricity*processing.cos(i));
            var x = r*processing.cos(i)+c;
            var y = r*processing.sin(i);
            processing.point(x,y);
        }
        processing.noStroke();
        processing.fill(255,255,0);
        processing.ellipse(c,0,15,15);
        processing.fill(0,255,0);
        processing.ellipse(-c,0,15,15);
        processing.popMatrix();
    };
    Orbit.prototype.drawLine = function(i) {
        processing.stroke(255,255,255);
        processing.strokeWeight(2);
        processing.fill(255, 255, 255);
        processing.pushMatrix();
        var c = this.eccentricity * this.semiAxis;
        processing.translate(width/2,height/2);
        var r = this.semiAxis*(1-Math.pow(this.eccentricity,2))/(1+this.eccentricity*processing.cos(i));
        var x = r*processing.cos(i)+c;
        var y = r*processing.sin(i);
        processing.stroke(255,0,0);
        processing.line(x,y,c,0);
        processing.stroke(255,255,255);
        processing.line(x,y,-c,0);

        processing.popMatrix();
    };

    var orbits = new Orbit(0,0,0.5,150);
    //orbits.push(new Orbit("Ellipse",0,0,0.5,150,0)); 

    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
        processing.frameRate(10);
    };


    var step = 0;
    processing.draw = function() {

        processing.background(66, 66, 66);
        orbits.drawLine(step);
        orbits.display();
        step -=0.02;
        if (step < -359.9) {step = 0};

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
