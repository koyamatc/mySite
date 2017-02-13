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
// setup
processing.setup = function(){
    // canvas size 
    processing.size(width,height);
    };    
//draw
processing.draw = function() {
    processing.background(66, 66, 66);
    // Move the ball according to its speed.
    x = x + xspeed;
    y = y + yspeed;
    // Check for bouncing.
    if ((x > width-ballRadius/2) || (x &lt; 0+ballRadius/2)) {
        xspeed = xspeed * -1;
    }
    if ((y > height-ballRadius/2) || (y &lt; 0+ballRadius/2)) {
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
 // draw
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

## Vector Motion
<div class="row">
    <div class="col-xs-4">
        <h3>Velocity</h3>
        <canvas id="canvas3"></canvas>
    </div>    

    <div class="col-xs-8">
        <pre>
// Mover Object
var Mover = function() {
    this.position = new processing.PVector(processing.random(width), processing.random(height));
    this.velocity = new processing.PVector(processing.random(-2, 2), processing.random(-2, 2));
};
Mover.prototype.update = function() {
    this.position.add(this.velocity);
};
Mover.prototype.display = function() {
    processing.stroke(0);
    processing.strokeWeight(2);
    processing.fill(127);
    processing.ellipse(this.position.x, this.position.y, 48, 48);
};
Mover.prototype.checkEdges = function() {
    if (this.position.x &gt; width) {
        this.position.x = 0;
    } 
    else if (this.position.x &lt; 0) {
        this.position.x = width;
    }
    if (this.position.y &gt; height) {
        this.position.y = 0;
    } 
    else if (this.position.y &lt; 0) {
        this.position.y = height;
    }
};
// create mover object
var mover = new Mover();
// setup
processing.setup = function(){
    // canvas size 
    processing.size(width,height);
};    
// draw 
processing.draw = function() {
    processing.background(255, 255, 255);
    mover.update();
    mover.checkEdges();
    mover.display(); 
};
</pre> 
    </div>
</div>

<h3>Acceleration</h3>
<div class="row">
    <div class="col-xs-4">
        <h3>A constant acceleration</h3>
        <canvas id="canvas4"></canvas>
        <div><button id="reset4" class="btn btn-info">Reset</button></div>
    </div>    

    <div class="col-xs-8">
        <br>
        <pre>
// Mover Object
var Mover = function() {
    this.position = new processing.PVector(width/2, height/2);
    this.velocity = new processing.PVector(0, 0);
    this.acceleration = new PVector(-0.001,0.01); //&lt;===
};
Mover.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(10); // 最大値を10に制限する
    this.position.add(this.velocity);
};
</pre> 
    </div>
</div>

<div class="row">
    <div class="col-xs-4">
        <h3>A totally random acceleration</h3>
        <canvas id="canvas5"></canvas>
        <div><button id="reset5" class="btn btn-info">Reset</button></div>
    </div>    

    <div class="col-xs-8">
        <br>
        <pre>
Mover.prototype.update = function() {
    //&lt;-----
    this.acceleration = processing.PVector.random2D();
    this.acceleration.mult(processing.random(2));
    //----&gt;
    this.velocity.add(this.acceleration);
    this.velocity.limit(10); // 最大値を10に制限する
    this.position.add(this.velocity);
};
</pre> 
    </div>
</div>

<div class="row">
    <div class="col-xs-4">
        <h3>Braking car</h3>
        <canvas id="canvas6"></canvas>
        <div>
            <button id="reset6" class="btn btn-info">Reset</button>
        </div>
        <div>
            <span>LEFT Arrow &lt;=> RIGHT Arrow</span>
        </div>
    </div>    

    <div class="col-xs-8">
        <br>
        <pre>
</pre> 
    </div>
</div>

<div class="row">
    <div class="col-xs-4">
        <h3>Acceleration towards mouse</h3>
        <canvas id="canvas7"></canvas>
        <div>
            <button id="reset7" class="btn btn-info">Reset</button>
        </div>
        <div>
            <span>キャンバスの上でマウスを動かして</span>
        </div>
    </div>    

    <div class="col-xs-8">
        <br>
<pre>
Mover.prototype.update = function() {
    var mouse = new PVector(processing.mouseX, processing.mouseY);
    // マウスの位置 - Mover の位置　でベクトルの方向を計算
    var dir = processing.PVector.sub(mouse, this.position);
    // 単位ベクトルにする
    dir.normalize();
    // 1/2ベクトルにする
    dir.mult(0.5);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.position.add(this.velocity);
};
</pre> 
    </div>
</div>

<div class="row">
    <div class="col-xs-4">
        <h3>Acceleration towards mouse</h3>
        <canvas id="canvas8"></canvas>
        <div>
            <button id="reset8" class="btn btn-info">Reset</button>
        </div>
        <div>
            <span>キャンバスの上でマウスを動かして</span>
        </div>
    </div>    

    <div class="col-xs-8">
        <br>
<pre>
    // Mover Object
    var Mover = function() {
        this.position = new processing.PVector(processing.random(width), 
                                               processing.random(height));
        this.velocity = new processing.PVector(0, 0);
        this.acceleration = new PVector(-0.001,0.01);
    };

    Mover.prototype.update = function() {
        var mouse = new PVector(processing.mouseX, processing.mouseY);
        var dir = processing.PVector.sub(mouse, this.position);
        dir.normalize();
        dir.mult(0.2);
        this.acceleration = dir;
        this.velocity.add(this.acceleration);
        this.velocity.limit(5);
        this.position.add(this.velocity);
    };

    Mover.prototype.display = function() {
        processing.stroke(255);
        processing.strokeWeight(2);
        processing.fill(255,255,0);
        processing.ellipse(this.position.x, this.position.y, 10, 10);
    };

    var mover = [];

    for (var i = 0; i &lt; 20; i++) {
        mover[i] = new Mover();
    };
    
    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };    
    // draw 
    processing.draw = function() {
        processing.background(66, 66, 66);
        
        for (var i = 0; i &lt; 20; i++) {
            mover[i].update();
            mover[i].display(); 
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
    // Mover Object
    var Mover = function() {
        this.position = new processing.PVector(processing.random(width), processing.random(height));
        this.velocity = new processing.PVector(processing.random(-2, 2), processing.random(-2, 2));
    };

    Mover.prototype.update = function() {
        this.position.add(this.velocity);
    };

    Mover.prototype.display = function() {
        processing.stroke(0);
        processing.strokeWeight(2);
        processing.fill(127);
        processing.ellipse(this.position.x, this.position.y, 48, 48);
    };
    Mover.prototype.checkEdges = function() {

        if (this.position.x > width) {
            this.position.x = 0;
        } 
        else if (this.position.x < 0) {
            this.position.x = width;
        }

        if (this.position.y > height) {
            this.position.y = 0;
        } 
        else if (this.position.y < 0) {
            this.position.y = height;
        }
    };

    var mover = new Mover();
    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };    
    // draw 
    processing.draw = function() {
        processing.background(255, 255, 255);
  
        mover.update();
        mover.checkEdges();
        mover.display(); 
    };
};  

function sketchProc4(processing) {
    // Mover Object
    var Mover = function() {
        this.position = new processing.PVector(width/2, height/2);
        this.velocity = new processing.PVector(0, 0);
        this.acceleration = new PVector(-0.001,0.01);
    };

    Mover.prototype.update = function() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(10); // 最大値を10に制限する
        this.position.add(this.velocity);
    };

    Mover.prototype.display = function() {
        processing.stroke(0);
        processing.strokeWeight(2);
        processing.fill(127);
        processing.ellipse(this.position.x, this.position.y, 48, 48);
    };
    Mover.prototype.checkEdges = function() {

        if (this.position.x > width) {
            this.position.x = 0;
        } 
        else if (this.position.x < 0) {
            this.position.x = width;
        }

        if (this.position.y > height) {
            this.position.y = 0;
        } 
        else if (this.position.y < 0) {
            this.position.y = height;
        }
    };

    var mover = new Mover();
    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };    
    // draw 
    processing.draw = function() {
        processing.background(255, 255, 255);
  
        mover.update();
        mover.checkEdges();
        mover.display(); 
    };
};  

function sketchProc5(processing) {
    // Mover Object
    var Mover = function() {
        this.position = new processing.PVector(width/2, height/2);
        this.velocity = new processing.PVector(0, 0);
        this.acceleration = new PVector(-0.001,0.01);
    };

    Mover.prototype.update = function() {
        this.acceleration = processing.PVector.random2D();
        this.acceleration.mult(processing.random(2));
        this.velocity.add(this.acceleration);
        this.velocity.limit(10); // 最大値を10に制限する
        this.position.add(this.velocity);
    };

    Mover.prototype.display = function() {
        processing.stroke(0);
        processing.strokeWeight(2);
        processing.fill(127);
        processing.ellipse(this.position.x, this.position.y, 48, 48);
    };
    Mover.prototype.checkEdges = function() {

        if (this.position.x > width) {
            this.position.x = 0;
        } 
        else if (this.position.x < 0) {
            this.position.x = width;
        }

        if (this.position.y > height) {
            this.position.y = 0;
        } 
        else if (this.position.y < 0) {
            this.position.y = height;
        }
    };

    var mover = new Mover();
    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };    
    // draw 
    processing.draw = function() {
        processing.background(255, 255, 255);
  
        mover.update();
        mover.checkEdges();
        mover.display(); 
    };
};  

function sketchProc6(processing) {
    var Car = function() {
        this.position = new processing.PVector(width/2, height/2);
        this.velocity = new processing.PVector(0, 0);
        this.acceleration = new processing.PVector(0, 0);
    };

    Car.prototype.update = function() {
    
        this.velocity.add(this.acceleration);
        this.velocity.limit(10);
        if (this.velocity.x < 0){
            this.velocity.set(0,0);   
        }    
        this.position.add(this.velocity);
    };

    Car.prototype.display = function() {
        processing.stroke(0);
        processing.strokeWeight(2);
        processing.fill(255, 0, 0);
        processing.rect(this.position.x-52, this.position.y-59, 60, 60);
        processing.rect(this.position.x-74, this.position.y-30, 100, 31);
        processing.fill(92, 92, 92);
        processing.ellipse(this.position.x, this.position.y, 30, 26);
        processing.ellipse(this.position.x-50, this.position.y, 30, 30);
    };

    Car.prototype.checkEdges = function() {
        if (this.position.x > width) {
            this.position.x = 0;
        } 
        else if (this.position.x < 0) {
            this.position.x = width;
        }
    };

    var car = new Car();
    
    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };    
    // draw 
    processing.draw = function() {
        processing.background(255, 255, 255);
        
        if (processing.keyPressed){
            if(processing.keyCode === processing.RIGHT){
                car.acceleration.set(0.1,0);   
            } else if(processing.keyCode === processing.LEFT){
                car.acceleration.set(-0.1,0);   
            };    
        }

        car.update();
        car.checkEdges();
        car.display(); 
    };
};  

function sketchProc7(processing) {
    // Mover Object
    var Mover = function() {
        this.position = new processing.PVector(width/2, height/2);
        this.velocity = new processing.PVector(0, 0);
        this.acceleration = new PVector(-0.001,0.01);
    };

    Mover.prototype.update = function() {
        var mouse = new PVector(processing.mouseX, processing.mouseY);
        var dir = processing.PVector.sub(mouse, this.position);
        dir.normalize();
        dir.mult(0.5);
        this.acceleration = dir;
        this.velocity.add(this.acceleration);
        this.velocity.limit(5);
        this.position.add(this.velocity);
    };

    Mover.prototype.display = function() {
        processing.stroke(0);
        processing.strokeWeight(2);
        processing.fill(127);
        processing.ellipse(this.position.x, this.position.y, 48, 48);
    };
    Mover.prototype.checkEdges = function() {

        if (this.position.x > width) {
            this.position.x = 0;
        } 
        else if (this.position.x < 0) {
            this.position.x = width;
        }

        if (this.position.y > height) {
            this.position.y = 0;
        } 
        else if (this.position.y < 0) {
            this.position.y = height;
        }
    };

    var mover = new Mover();
    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };    
    // draw 
    processing.draw = function() {
        processing.background(255, 255, 255);
  
        mover.update();
        mover.checkEdges();
        mover.display(); 
    };
};  

function sketchProc8(processing) {

    var maxDir = new PVector(width, height);
    var maxMag = maxDir.mag();
    // Mover Object
    var Mover = function() {
        this.position = new processing.PVector(processing.random(width), 
                                               processing.random(height));
        this.velocity = new processing.PVector(0, 0);
        this.acceleration = new PVector(-0.001,0.01);
    };

    Mover.prototype.update = function() {
        var mouse = new PVector(processing.mouseX, processing.mouseY);
        var dir = processing.PVector.sub(mouse, this.position);
//        var closeness = ((maxMag-dir.mag())/maxMag);
        dir.normalize();
        dir.mult(0.2);
        this.acceleration = dir;
        this.velocity.add(this.acceleration);
        this.velocity.limit(5);
        this.position.add(this.velocity);
    };

    Mover.prototype.display = function() {
        processing.stroke(255);
        processing.strokeWeight(2);
        processing.fill(255,255,0);
        processing.ellipse(this.position.x, this.position.y, 10, 10);
    };

    var mover = [];

    for (var i = 0; i < 20; i++) {
        mover[i] = new Mover();
    };
    
    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };    
    // draw 
    processing.draw = function() {
        processing.background(66, 66, 66);
        
        for (var i = 0; i < 20; i++) {
            mover[i].update();
            mover[i].display(); 
        };
    };
};  

var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
var canvas3 = document.getElementById("canvas3");
var canvas4 = document.getElementById("canvas4");
var canvas5 = document.getElementById("canvas5");
var canvas6 = document.getElementById("canvas6");
var canvas7 = document.getElementById("canvas7");
var canvas8 = document.getElementById("canvas8");

// attaching the sketchProc function to the canvas
var p1 = new Processing(canvas1, sketchProc1);
var p2 = new Processing(canvas2, sketchProc2);
var p3 = new Processing(canvas3, sketchProc3);
var p4 = new Processing(canvas4, sketchProc4);
var p5 = new Processing(canvas5, sketchProc5);
var p6 = new Processing(canvas6, sketchProc6);
var p7 = new Processing(canvas7, sketchProc7);
var p8 = new Processing(canvas8, sketchProc8);

// p.exit(); to detach it
$("#reset4").on("click",function(){
  p4.exit(); //to detach it
  p4 = new Processing(canvas4, sketchProc4);  
});
$("#reset5").on("click",function(){
  p5.exit(); //to detach it
  p5 = new Processing(canvas5, sketchProc5);  
});
$("#reset7").on("click",function(){
  p6.exit(); //to detach it
  p6 = new Processing(canvas6, sketchProc6);  
});
$("#reset8").on("click",function(){
  p8.exit(); //to detach it
  p8 = new Processing(canvas8, sketchProc8);  
});

</script>
