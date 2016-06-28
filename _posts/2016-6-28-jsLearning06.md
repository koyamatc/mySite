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
var Mover = function(m, x, y) {
    this.mass = m;
    this.position = new processing.PVector(x, y);
    this.velocity = new processing.PVector(0, 0);
    this.acceleration = new processing.PVector(0, 0);
};

.....

Mover.prototype.display = function() {
    processing.stroke(0);
    processing.strokeWeight(2);
    processing.fill(255, 255, 255, 127);
    processing.ellipse(this.position.x, this.position.y, this.mass*30, tmass*30);
};
....
var m = [];
for (var i = 0; i &lt; 20; i++) {
     m[i] = new Mover(processing.random(0.1, 5), 0, 0); 
};

.....
</pre> 
    </div>
</div>

<h3>Acceleration</h3>
<div class="row">
    <div class="col-xs-4">
        <h3>Many objects 2</h3>
        <canvas id="canvas4"></canvas>
        <div><button id="reset4" class="btn btn-info">Reset</button></div>
    </div>    

    <div class="col-xs-8">
        <br>
        <pre>
Mover.prototype.calculateWallForce = function() {
    var fx = 0;
    var fy = 0;
    if (this.position.x > width) {
        fx = -1;
    } else if (this.position.x &lt; 0) {
        fx =1; 
    }
    if (this.position.y > height) {
        fy = -1;
    } else if (this.position.y &lt; 0) {
        fy = 1;
    }
    return new processing.PVector(fx,fy);
};
....
processing.draw = function() {
    processing.background(66, 66, 66);
    for (var i = 0; i &lt; m.length; i++) {
        var wind = new processing.PVector(0.01, 0);
        var gravity = new processing.PVector(0, 0.1);
 
        m[i].applyForce(wind);
        m[i].applyForce(gravity);
        m[i].applyForce(m[i].calculateWallForce());
        m[i].update();
        m[i].display();
    };
};
</pre> 
    </div>
</div>

<div class="row">
    <div class="col-xs-4">
        <h2>Modeling gravity and friction</h2>
        <h3>gravity</h3>
        <canvas id="canvas5"></canvas>
        <div><button id="reset5" class="btn btn-info">Reset</button></div>
    </div>    

    <div class="col-xs-8">
        <br>
        <pre>
processing.draw = function() {
    processing.background(66, 66, 66);
    
    for (var i = 0; i &lt; m.length; i++) {
        var wind = new processing.PVector(0.01, 0);
        <em>
        var gravity = new processing.PVector(0, 0.1 * m[i].mass);
        </em>
        m[i].applyForce(wind);
        m[i].applyForce(gravity);
        m[i].update();
        m[i].display();
        m[i].checkEdges();
    };
}; 
</pre> 
    </div>
</div>

<div class="row">
    <div class="col-xs-4">
        <h3>friction</h3>
        <canvas id="canvas6"></canvas>
        <div>
            <button id="reset6" class="btn btn-info">Reset</button>
        </div>
    </div>    

    <div class="col-xs-8">
        <br>
        <pre>
for (var i = 0; i &lt; movers.length; i++) {
    var wind = new processing.PVector(0.01, 0);
    var gravity = new processing.PVector(0, 0.1*movers[i].mass);
    
    var c = 0.01; // 摩擦係数
    var normal = 1; // 垂直抗力
    var frictionMag = c * normal;　// 抗力
    var friction = movers[i].velocity.get(); // 速度の取得
    friction.mult(-1); // 速度の向きを反転
    friction.normalize(); //　単位ベクトル化
    friction.mult(frictionMag); // 摩擦力の大きさ

    movers[i].applyForce(friction); // 摩擦力を適用
    movers[i].applyForce(wind); // 風力を適用
    movers[i].applyForce(gravity); // 重力を適用
    movers[i].update(); 
    movers[i].display();
    movers[i].checkEdges();
}
 </pre> 
    </div>
</div>

<div class="row">
    <div class="col-xs-4">
        <h3>Air and fluid resistance</h3>
        <canvas id="canvas7"></canvas>
        <div>
            <button id="reset7" class="btn btn-info">Reset</button>
        </div>
    </div>    

    <div class="col-xs-8">
        <br>
        $$F_{d} = -\frac{1}{2}\rho v^{2}AC_{d}\hat{v}$$
        $$F_{d} : Drag \quad force(抗力)$$
        $$-\frac{1}{2} : 定数$$
        $$\rho : 流体の密度$$
        $$v^2 : v は物体のスピードで、速度ベクトルの大きさ -- velocity.mag()$$
        $$A : 流体を押す物体の正面の面積$$
        $$C_{d} : 抗力係数$$
        $$_hat{v} : 速度の単位ベクトル -- velocity.normalize()$$
<pre>
// Calculate drag force
Liquid.prototype.calculateDrag = function(m) {
    // Magnitude is coefficient * speed squared
    var speed = m.velocity.mag();
    var dragMagnitude = this.c * speed * speed;
    
    // Direction is inverse of velocity
    var dragForce = m.velocity.get();
    dragForce.mult(-1);
    
    // Scale according to magnitude
    // dragForce.setMag(dragMagnitude);
    dragForce.normalize();
    dragForce.mult(dragMagnitude);
    return dragForce;
};
....
    for (var i = 0; i &lt; movers.length; i++) {
    
        // Is the Mover in the liquid?
        if (liquid.contains(movers[i])) {
            // Calculate drag force
            var dragForce = liquid.calculateDrag(movers[i]);
            // Apply drag force to Mover
            movers[i].applyForce(dragForce);
        }
        ....
</pre> 
    </div>
</div>

<div class="row">
    <div class="col-xs-4">
        <h3>Gravitational attraction</h3>
        <canvas id="canvas8"></canvas>
        <div>
            <button id="reset8" class="btn btn-info">Reset</button>
        </div>
    </div>    

    <div class="col-xs-8">
        <br>
        $$F=G\frac{m_{1} \dot m_{2}}{r^2}\hat{r}$$
        $$F:引力$$
        $$G:万有引力定数=6.67408x10^{-11}m^{3}kg^{-1}s^{-2}$$
        $$m_{1},m_{2}:物体の質量$$
        $$r:物体間の距離$$
        $$\hat{r}:距離の単位ベクトル$$
<pre>
Attractor.prototype.calculateAttraction = function(mover) {
    // Calculate direction of force
    var force = processing.PVector.sub(this.position, mover.position);
    // Distance between objects       
    var distance = force.mag();
    // Limiting the distance to eliminate "extreme" results
    // for very close or very far objects                            
    distance = processing.constrain(distance, 5, 25);
    // Normalize vector                    
    force.normalize();
    // Calculate gravitional force magnitude  
    var strength = (this.G * this.mass * mover.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.mult(strength);
    return force;
};
</pre> 
    </div>
</div>

<div class="row">
    <div class="col-xs-4">
        <h3>Gravitational attraction</h3>
        <canvas id="canvas9"></canvas>
        <div>
            <button id="reset9" class="btn btn-info">Reset</button>
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
        <h3>Mutual attraction</h3>
        <canvas id="canvas10"></canvas>
        <div>
            <button id="reset10" class="btn btn-info">Reset</button>
        </div>
    </div>    

    <div class="col-xs-8">
        <br>
<pre>
Mover.prototype.calculateAttraction = function(m, i) {
    // Calculate direction of force
    var force = processing.PVector.sub(this.position, m.position);
    // Distance between objects
    var distance = force.mag();
    // Limiting the distance to eliminate "extreme" results for very closevery far objects
    distance = processing.constrain(distance, 5.0, 25.0);
    // Normalize vector (distance doesn't matter here, we just want tvector for direction                            
    force.normalize();
    // Calculate gravitional force magnitude
    var strength = (G * this.mass * m.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.mult(strength);
    return force;
};

...
 
processing.draw = function() {
    processing.background(50, 50, 50);

    for (var i = 0; i &lt; movers.length; i++) {
        for (var j = 0; j &lt; movers.length; j++) {
            if (i !== j) {
                var force = movers[j].calculateAttraction(movers[i]);
                movers[i].applyForce(force);
            }
        }

        movers[i].update();
        movers[i].display();
    }
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

var height = 400,
    width = 350;

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

// Many Objects
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
 
    var Mover = function(m, x, y) {
        this.mass = m;
        this.position = new processing.PVector(x, y);
        this.velocity = new processing.PVector(0, 0);
        this.acceleration = new processing.PVector(0, 0);
        this.color = processing.color(processing.random(255), processing.random(255), processing.random(255));
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
        processing.fill(this.color);
        processing.ellipse(this.position.x, this.position.y, this.mass*16, this.mass*16);
    };

    Mover.prototype.calculateWallForce = function() {
        var fx = 0;
        var fy = 0;
        if (this.position.x > width) {
            fx = -1;
        } else if (this.position.x < 0) {
            fx =1; 
        }

        if (this.position.y > height) {
            fy = -1;
        } else if (this.position.y < 0) {
            fy = 1;
        }
    
        return new processing.PVector(fx,fy);
    
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
            m[i].applyForce(m[i].calculateWallForce());
            m[i].update();
            m[i].display();
        };
    }; 
};  

// Modeling gravity and friction
function sketchProc5(processing) {
 
    var Mover = function(m, x, y) {
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
        processing.fill(255,255,255,127);
        processing.ellipse(this.position.x, this.position.y, this.mass*16, this.mass*16);
    };

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
            var gravity = new processing.PVector(0, 0.1 * m[i].mass);
 
            m[i].applyForce(wind);
            m[i].applyForce(gravity);
            
            m[i].update();
            m[i].display();
            m[i].checkEdges();
        };
    }; 
};  
function sketchProc6(processing) {
    var Mover = function(m, x, y) {
        this.mass = m;
        this.position = new processing.PVector(x, y);
        this.velocity = new processing.PVector(0, 0);
        this.acceleration = new processing.PVector(0, 0);
    };
  
    Mover.prototype.applyForce = function(force) {
        var f = processing.PVector.div(force, this.mass);
        this.acceleration.add(f);
    };
  
    Mover.prototype.update = function() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    };

    Mover.prototype.display = function() {
        processing.stroke(0);
        processing.strokeWeight(2);
        processing.fill(255, 255, 255, 127);
        processing.ellipse(this.position.x, this.position.y, this.mass*16, this.mass*16);
    };

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

    var movers = [];

    for (var i = 0; i < 20; i++) {
        movers[i] = new Mover(processing.random(0.1, 5), 0, 0);
    }
    // setup
    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };
    processing.draw = function() {
        processing.background(50, 50, 50);
  
        for (var i = 0; i < movers.length; i++) {
            var wind = new processing.PVector(0.01, 0);
            var gravity = new processing.PVector(0, 0.1*movers[i].mass);
    
            var c = 0.01; // 摩擦係数
            var normal = 1; // 垂直抗力
            var frictionMag = c * normal;　// 抗力
            var friction = movers[i].velocity.get(); // 速度の取得
            friction.mult(-1); // 速度の向きを反転
            friction.normalize(); //　単位ベクトル化
            friction.mult(frictionMag); // 摩擦力の大きさ

            movers[i].applyForce(friction); // 摩擦力を適用
            movers[i].applyForce(wind); // 風力を適用
            movers[i].applyForce(gravity); // 重力を適用
            movers[i].update(); 
            movers[i].display();
            movers[i].checkEdges();
        }
    };
};  

/**  Air and fluid resistance **/ 
function sketchProc7(processing) {
 // Adapted from Dan Shiffman, natureofcode.com

/* Forces (Gravity and Fluid Resistance) with Vectors 
 * Demonstration of multiple force acting on bodies (Mover object)
 * Bodies experience gravity continuously
 * Bodies experience fluid resistance when in "water"
 */
 
    var Liquid = function(x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
    };
  
    // Is the Mover in the Liquid?
    Liquid.prototype.contains = function(m) {
        var p = m.position;
        return p.x > this.x && p.x < this.x + this.w &&
            p.y > this.y && p.y < this.y + this.h;
    };
  
    // Calculate drag force
    Liquid.prototype.calculateDrag = function(m) {
        // Magnitude is coefficient * speed squared
        var speed = m.velocity.mag();
        var dragMagnitude = this.c * speed * speed;
    
        // Direction is inverse of velocity
        var dragForce = m.velocity.get();
        dragForce.mult(-1);
    
        // Scale according to magnitude
        // dragForce.setMag(dragMagnitude);
        dragForce.normalize();
        dragForce.mult(dragMagnitude);
        return dragForce;
    };
  
    Liquid.prototype.display = function() {
        processing.noStroke();
        processing.fill(28, 120, 186);
        processing.rect(this.x, this.y, this.w, this.h);
    };

    var Mover = function(m, x, y) {
        this.mass = m;
        this.position = new processing.PVector(x, y);
        this.velocity = new processing.PVector(0, 0);
        this.acceleration = new processing.PVector(0, 0);
    };
  
    Mover.prototype.applyForce = function(force) {
        var f = processing.PVector.div(force, this.mass);
        this.acceleration.add(f);
    };
  
    Mover.prototype.update = function() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    };

    Mover.prototype.display = function() {
        processing.stroke(0, 0, 0);
        processing.strokeWeight(2);
        processing.fill(123, 217, 176);
        processing.ellipse(this.position.x, this.position.y, this.mass*16, this.mass*16);
    };

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

    // Moving bodies
    var movers = [];
    // Create liquid object
    var liquid = new Liquid(0, height/2, width, height/2, 0.1);

    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };

    processing.draw = function() {
        processing.background(219, 253, 255);
  
        // Draw water
        liquid.display();

        for (var i = 0; i < movers.length; i++) {
    
            // Is the Mover in the liquid?
            if (liquid.contains(movers[i])) {
                // Calculate drag force
                var dragForce = liquid.calculateDrag(movers[i]);
                // Apply drag force to Mover
                movers[i].applyForce(dragForce);
            }
        
            // Gravity is scaled by mass here!
            var gravity = new PVector(0, 0.1*movers[i].mass);
            // Apply gravity
            movers[i].applyForce(gravity);
        
            // Update and display
            movers[i].update();
            movers[i].display();
            movers[i].checkEdges();
        }
  
        processing.fill(0, 0, 0);
        processing.text("click mouse to reset",10,30);
    };


    // Restart all the Mover objects randomly
    var resetMovers = function() {
        for (var i = 0; i < 9; i++) {
            movers[i] = new Mover(processing.random(0.5, 3), 20+i*width/9, 0);
        }
    };

    // Not working???
    processing.mousePressed = function() {
        resetMovers();
    };

    resetMovers();
};  

/* Gravitational attraction */
function sketchProc8(processing) {

    // Adapted from Dan Shiffman, natureofcode.com

    // Attractor: An object type for a draggable attractive body in our world
    var Attractor = function() {
        this.position = new processing.PVector(width/2, height/2);
        this.mass = 20;
        this.G = 1;
        this.dragOffset = new processing.PVector(0, 0);
        this.dragging = false;
        this.rollover = false;
    };

    Attractor.prototype.calculateAttraction = function(mover) {
        // Calculate direction of force
        var force = processing.PVector.sub(this.position, mover.position);
        // Distance between objects       
        var distance = force.mag();
        // Limiting the distance to eliminate "extreme" results
        // for very close or very far objects                            
        distance = processing.constrain(distance, 5, 25);
        // Normalize vector                    
        force.normalize();
        // Calculate gravitional force magnitude  
        var strength = (this.G * this.mass * mover.mass) / (distance * distance);
        // Get force vector --> magnitude * direction
        force.mult(strength);
        return force;
    };

    // Method to display
    Attractor.prototype.display = function() {
        processing.ellipseMode(processing.CENTER);
        processing.strokeWeight(4);
        processing.stroke(0);
        if (this.dragging) {
            processing.fill(50, 50, 50);
        } else if (this.rollover) {
            processing.fill(100, 100, 100);
        } else {
            processing.fill(175, 175, 175, 200);
        }
        processing.ellipse(this.position.x, this.position.y, this.mass*2, this.mass*2);
    };

    // The methods below are for mouse interaction
  
    Attractor.prototype.handleHover = function(mx, my) {
        var d = processing.dist(mx, my, this.position.x, this.position.y);
        if (d < this.mass) {
            this.rollover = true;
        } else {
            this.rollover = false;
        }
    };

    Attractor.prototype.handlePress = function(mx, my) {
        var d = processing.dist(mx, my, this.position.x, this.position.y);
        if (d < this.mass) {
            console.log("setting dragging to true");
            this.dragging = true;
            this.dragOffset.x = this.position.x - mx;
            this.dragOffset.y = this.position.y - my;
        }
    };

    Attractor.prototype.handleDrag = function(mx, my) {
        console.log("should we be dragging?" + this.dragging);
        if (this.dragging) {
            this.position.x = mx + this.dragOffset.x;
            this.position.y = my + this.dragOffset.y;
        }
    };

    Attractor.prototype.stopDragging = function() {
        console.log("setting dragging to false");
        this.dragging = false;
    };


    var Mover = function() {
        this.position = new processing.PVector(400, 50);
        this.velocity = new processing.PVector(1, 0);
        this.acceleration = new processing.PVector(0, 0);
        this.mass = 1;
    };
  
    Mover.prototype.applyForce = function(force) {
        var f = processing.PVector.div(force,this.mass);
        this.acceleration.add(f);
    };
  
    Mover.prototype.update = function() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    };

    Mover.prototype.display = function() {
        processing.stroke(0);
        processing.strokeWeight(2);
        processing.fill(255, 255, 255, 127);
        processing.ellipse(this.position.x, this.position.y, this.mass*16, this.mass*16);
    };

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

    var mover = new Mover();
    var attractor = new Attractor();

    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };

    processing.draw = function() {
        processing.background(50, 50, 50);

        var force = attractor.calculateAttraction(mover);
        mover.applyForce(force);
        mover.update();
 
        attractor.display();
        mover.display();
    };


    processing.mouseMoved = function() {
        attractor.handleHover(processing.mouseX, processing.mouseY);  
    };

    processing.mousePressed = function() {
        attractor.handlePress(processing.mouseX, processing.mouseY);
    };

    processing.mouseDragged = function() {
        attractor.handleHover(processing.mouseX, processing.mouseY);
        attractor.handleDrag(processing.mouseX,processing.mouseY);
    };

    processing.mouseReleased = function() {
        attractor.stopDragging();
    };

};  

function sketchProc9(processing) {
    var Attractor = function() {
        this.position = new processing.PVector(width/2, height/2);
        this.mass = 20;
        this.G = 1;
    };

    Attractor.prototype.calculateAttraction = function(m) {
        var force = processing.PVector.sub(this.position, m.position);
        var distance = force.mag();
        distance = processing.constrain(distance, 5, 25);  
        force.normalize();
        var strength = (this.G * this.mass * m.mass) / (distance * distance);
        force.mult(strength);
        return force;
    };

    Attractor.prototype.display = function() {
        processing.ellipseMode(CENTER);
        processing.strokeWeight(4);
        processing.stroke(0);
        processing.ellipse(this.position.x, this.position.y, this.mass*2, this.mass*2);
    };


    var Mover = function(mass, x, y, color) {
        this.position = new processing.PVector(x, y);
        this.velocity = new processing.PVector(1, 0);
        this.acceleration = new processing.PVector(0, 0);
        this.mass = mass;
        this.color = color;
    };
  
    Mover.prototype.applyForce = function(force) {
        var f = PVector.div(force,this.mass);
        this.acceleration.add(f);
    };
  
    Mover.prototype.update = function() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    };

    Mover.prototype.display = function() {
        processing.noStroke();
        processing.fill(this.color);
        processing.ellipse(this.position.x, this.position.y, this.mass*16, this.mass*16);
    };

    var movers = [];
    var attractor = new Attractor();

    for (var i = 0; i < 10; i++) {
        var c = processing.color(processing.random(255), 
                                 processing.random(255), 
                                 processing.random(255));
        movers[i] = new Mover(processing.random(0.1, 2), 
                              processing.random(width), 
                              processing.random(height),c);
    }

    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };

    processing.draw = function() {
    
        for (var i = 0; i < movers.length; i++) {
            var force = attractor.calculateAttraction(movers[i]);
            movers[i].applyForce(force);

            movers[i].update();
            movers[i].display();
        }
    };
};  

/* Mutual attraction */
function sketchProc10(processing) {

    var G = 1;

    var Mover = function(m, x, y) {
        this.mass = m;
        this.position = new processing.PVector(x, y);
        this.velocity = new processing.PVector(0, 0);
        this.acceleration = new processing.PVector(0, 0);
    };
  
    Mover.prototype.applyForce = function(force) {
        var f = processing.PVector.div(force, this.mass);
        this.acceleration.add(f);
    };
  
    Mover.prototype.update = function() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    };

    Mover.prototype.display = function() {
        processing.stroke(0);
        processing.strokeWeight(2);
        processing.fill(255, 255, 255, 127);
        processing.ellipse(this.position.x, this.position.y, this.mass*16, this.mass*16);
    };

    Mover.prototype.calculateAttraction = function(m, i) {
        // Calculate direction of force
        var force = processing.PVector.sub(this.position, m.position);
        // Distance between objects
        var distance = force.mag();
        // Limiting the distance to eliminate "extreme" results for very close or very far objects
        distance = processing.constrain(distance, 5.0, 25.0);
        // Normalize vector (distance doesn't matter here, we just want this vector for direction                            
        force.normalize();
        // Calculate gravitional force magnitude
        var strength = (G * this.mass * m.mass) / (distance * distance);
        // Get force vector --> magnitude * direction
        force.mult(strength);
        return force;
    };


    var movers = [];
    for (var i = 0; i < 5; i++) {
        movers[i] = new Mover(processing.random(0.1, 5), 
                              processing.random(width), 
                              processing.random(height));
    }

    processing.setup = function(){
        // canvas size 
        processing.size(width,height);
    };
    
    processing.draw = function() {
        processing.background(50, 50, 50);

        for (var i = 0; i < movers.length; i++) {
            for (var j = 0; j < movers.length; j++) {
                if (i !== j) {
                    var force = movers[j].calculateAttraction(movers[i]);
                    movers[i].applyForce(force);
                }
            }

            movers[i].update();
            movers[i].display();
        }
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
var canvas9 = document.getElementById("canvas9");
var canvas10 = document.getElementById("canvas10");

// attaching the sketchProc function to the canvas
var p1 = new Processing(canvas1, sketchProc1);
var p2 = new Processing(canvas2, sketchProc2);
var p3 = new Processing(canvas3, sketchProc3);
var p4 = new Processing(canvas4, sketchProc4);
var p5 = new Processing(canvas5, sketchProc5);
var p6 = new Processing(canvas6, sketchProc6);
var p7 = new Processing(canvas7, sketchProc7);
var p8 = new Processing(canvas8, sketchProc8);
var p9 = new Processing(canvas9, sketchProc9);
var p10 = new Processing(canvas10, sketchProc10);

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
$("#reset6").on("click",function(){
  p6.exit(); //to detach it
  p6 = new Processing(canvas6, sketchProc6);  
});
$("#reset7").on("click",function(){
  p7.exit(); //to detach it
  p7 = new Processing(canvas7, sketchProc7);  
});
$("#reset8").on("click",function(){
  p8.exit(); //to detach it
  p8 = new Processing(canvas8, sketchProc8);  
});
$("#reset9").on("click",function(){
  p9.exit(); //to detach it
  p9 = new Processing(canvas9, sketchProc9);  
});
$("#reset10").on("click",function(){
  p10.exit(); //to detach it
  p10 = new Processing(canvas10, sketchProc10);  
});

</script>
