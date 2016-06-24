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
var Mover = function() {
    // 簡単にするため質量は　１　とする
    this.mass = 1;
    this.position = new processing.PVector(30, 30);
    this.velocity = new processing.PVector(0, 0);
    this.acceleration = new processing.PVector(0, 0);
};

// ニュートンの第２法則をシミュレートする
// force　を受取り, 質量で割り, 加速度に加える
Mover.prototype.applyForce = function(force) {
    var f = processing.PVector.div(force, this.mass);
    this.acceleration.add(f);
};
  
Mover.prototype.update = function() {
    // Vectorsの最初の例でシミュレートする
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    // 毎回加速度をクリア
    this.acceleration.mult(0);
};

Mover.prototype.display = function() {
    processing.stroke(0);
    processing.strokeWeight(2);
    processing.fill(255, 255, 255, 127);
    // 質量により、サイズを変更する
    processing.ellipse(this.position.x, this.position.y, this.mass*30, this.mass*30);
};

// mover をエッジでバウンドさせるため、速度を変えています
Mover.prototype.checkEdges = function() {
    if (this.position.x > width) {
        this.position.x = width;
        this.velocity.x *= -1;
    } else if (this.position.x &lt; 0) {
        this.velocity.x *= -1;
        this.position.x = 0;
    }
    if (this.position.y > height) {
        this.velocity.y *= -1;
        this.position.y = height;
    }
};
// setup
processing.setup = function(){
    // canvas size 
    processing.size(width,height);
};
// mover生成
var m = new Mover(); 

processing.draw = function() {
    processing.background(66, 66, 66);
    //風と重力
    var wind = new processing.PVector(0.01, 0);
    var gravity = new processing.PVector(0, 0.1);
    m.applyForce(wind);
    m.applyForce(gravity);
    
    m.update();
    m.display();
    m.checkEdges();
}; 
</pre> 
   </div>
</div>

<br>

<div class="row">
        <div class="col-xs-4">
            <canvas id="canvas2"></canvas>
            <div><button id="reset2" class="btn btn-info">Reset</button></div>
        </div>    
        <div class="col-xs-8">
        </div>
</div>

<div class="row">
    <div class="col-xs-4">
        <h3>Many objects</h3>
        <canvas id="canvas3"></canvas>
        <div><button id="reset3" class="btn btn-info">Reset</button></div>
    </div>    

    <div class="col-xs-8">
        <pre>

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

var height = 300,
    width = 300;

function sketchProc1(processing) {
 
    var Mover = function() {
        // Set mass equal to 1 for simplicity
        this.mass = 1;
        this.position = new processing.PVector(30, 30);
        this.velocity = new processing.PVector(0, 0);
        this.acceleration = new processing.PVector(0, 0);
    };

    // Simulates Newton's second law
    // Receive a force, divide by mass, add to acceleration
    Mover.prototype.applyForce = function(force) {
        var f = processing.PVector.div(force, this.mass);
        this.acceleration.add(f);
    };
  
    Mover.prototype.update = function() {
        // Simulates Motion 101 from the vectors tutorial
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        // Now we make sure to clear acceleration each time
        this.acceleration.mult(0);
    };

    Mover.prototype.display = function() {
        processing.stroke(0);
        processing.strokeWeight(2);
        processing.fill(255, 255, 255, 127);
        // Scale the size according to the mass, as a simple visualization of mass
        processing.ellipse(this.position.x, this.position.y, this.mass*30, this.mass*30);
    };

    // Even though we've said we shouldn't check velocity directly, 
    // there are some exceptions. Here we change it as a quick and easy
    // way to bounce our mover off the edges.
    Mover.prototype.checkEdges = function() {
        if (this.position.x > width) {
            this.position.x = width;
            this.velocity.x *= -1;
        } else if (this.position.x < 0) {
            this.velocity.x *= -1;
            this.position.x = 0;
        }
        if (this.position.y > height) {
            this.velocity.y *= -1;
            this.position.y = height;
        }
    };


    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };

    var m = new Mover(); 

    processing.draw = function() {
        processing.background(66, 66, 66);
    
        var wind = new processing.PVector(0.01, 0);
        var gravity = new processing.PVector(0, 0.1);
        m.applyForce(wind);
        m.applyForce(gravity);
    
        m.update();
        m.display();
        m.checkEdges();
    }; 
};  

function sketchProc2(processing) {

    var Balloon = function() {
        this.mass = 1;
        this.height = 100;
        this.width = 70;
        this.position = new processing.PVector(width/2, height-this.height/2-10);
        this.velocity = new processing.PVector(0, 0);
        this.acceleration = new processing.PVector(0, 0);
    };
  
    Balloon.prototype.applyForce = function(force) {
        var f = processing.PVector.div(force, this.mass);
        this.acceleration.add(f);
    };
  
    Balloon.prototype.update = function() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    };

    Balloon.prototype.display = function() {
        processing.stroke(0);
        processing.strokeWeight(2);
        processing.fill(255, 0, 0);
        processing.line(this.position.x, this.position.y, this.position.x, this.position.y + this.height*2);
        processing.ellipse(this.position.x, this.position.y, this.width, this.height);
    };

    Balloon.prototype.checkEdges = function() {
        if (this.position.y < this.height/2){
        this.velocity.y *= -1;    
        }    
    };

    var m = new Balloon(); 

    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };    

    processing.draw = function() {
        processing.background(224, 224, 224);
        var wind = new processing.PVector(0.0, -0.01);
        m.applyForce(wind);
    
        m.update();
        m.display();
        m.checkEdges();
   };
};  

function sketchProc3(processing) {
 
    var Mover = function(m, x, y) {
        // Set mass equal to 1 for simplicity
        this.mass = m;
        this.position = new processing.PVector(x, y);
        this.velocity = new processing.PVector(0, 0);
        this.acceleration = new processing.PVector(0, 0);
    };

    // Simulates Newton's second law
    // Receive a force, divide by mass, add to acceleration
    Mover.prototype.applyForce = function(force) {
        var f = processing.PVector.div(force, this.mass);
        this.acceleration.add(f);
    };
  
    Mover.prototype.update = function() {
        // Simulates Motion 101 from the vectors tutorial
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        // Now we make sure to clear acceleration each time
        this.acceleration.mult(0);
    };

    Mover.prototype.display = function() {
        processing.stroke(0);
        processing.strokeWeight(2);
        processing.fill(255, 255, 255, 127);
        // Scale the size according to the mass, as a simple visualization of mass
        processing.ellipse(this.position.x, this.position.y, this.mass*30, this.mass*30);
    };

    // Even though we've said we shouldn't check velocity directly, 
    // there are some exceptions. Here we change it as a quick and easy
    // way to bounce our mover off the edges.
    Mover.prototype.checkEdges = function() {
        if (this.position.x > width) {
            this.position.x = width;
            this.velocity.x *= -1;
        } else if (this.position.x < 0) {
            this.velocity.x *= -1;
            this.position.x = 0;
        }
        if (this.position.y > height) {
            this.velocity.y *= -1;
            this.position.y = height;
        }
    };

    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };

    var m = [];
    for (var i = 0; i < 20; i++) {
        m[i] = new Mover(processing.random(0.1, 5), 0, 0); 
    };

    processing.draw = function() {
        processing.background(66, 66, 66);
    
        for (var i = 0; i < m.length; i++) {
            var wind = new processing.PVector(0.01, 0);
            var gravity = new processing.PVector(0, 0.1);
 
            m[i].applyForce(wind);
            m[i].applyForce(gravity);
    
            m[i].update();
            m[i].display();
            m[i].checkEdges();
        };
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
$("#reset2").on("click",function(){
  p2.exit(); //to detach it
  p2 = new Processing(canvas2, sketchProc2);  
});
$("#reset3").on("click",function(){
  p3.exit(); //to detach it
  p3 = new Processing(canvas3, sketchProc3);  
});
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
