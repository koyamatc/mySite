---
title: 投稿記事
layout: post
postTitle: Factorisation
categories: post composition
---

<div id="svg"></div>

<button class="btn btn-info" id="run">Run</button>
<button class="btn btn-info" id="reset">Reset</button>

<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script>
function Point(x, y){
  this.x = x;
  this.y = y;
  return this;
};

var pi = Math.PI;

var ticks = [];
for (var i=1;i<=60; i++){
  ticks.push(i);
};
var primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59];

var radius0 = 150;

var points =[];
var radius = 20;
var dot_radius;

var height = 500,
    width  = 500;

var xScale = d3.scale.linear()
       .domain([-250,250])
       .range([00,500]);
var yScale = d3.scale.linear()
       .domain([-250,250])
       .range([0,500]);

/** svg空間作成 */
var svg =  d3.select("#svg")
                      .append("svg")
                      .attr("width", width)
                      .attr("height", height);

svg.selectAll("circle")
    .data(ticks)
   .enter().append("circle")
    .attr("cx",function(){return xScale(0);})
    .attr("cy",function(){return yScale(0);})
    .attr("r",function(){return radius;})
    .attr("id",function(d,i){return "c"+i;})
    .attr("opacity",0.0)
    .style("fill","gold");   

                 
d3.select("#reset").on("click",function(){
  svg.selectAll("circle")
    .attr("opacity",0)
    .attr("cx",function(){return xScale(0);})
    .attr("cy",function(){return yScale(0);})
    .attr("r",20);
});                      

d3.select("#run").on("click",function(){


  for (var i = 1; i < 7; i++) {

    //factorisation(i);
    make(i,250);
    var delay = 1000 * i;
    draw0(delay,i);

  };
  
});                      

function draw0(delay,circles){
    console.log(points);
    for (l=0;l<points.length;l++){
      var el = d3.select("#c"+l);

      el.transition()
        .delay(delay)
        .duration(1000)
        .ease("linear")
        .attr("opacity",1)
        .attr("cx",function(d){return xScale(points[l].x);})
        .attr("cy",function(d){return yScale(points[l].y);})
        .attr("r",function(){return dot_radius;})
        .transition()
        .duration(1000);
    }

};

function factorisation(n){
  points=[];
  if (n == 1){
    points.push(new Point(0,0));
    radius = radius0;
    return;
  };
  
  radius = radius0 / n;
  var inc = 2*pi / n;

  if (primes.indexOf(n)>=0){
    for (var i=0;i<n;i++ ){
      var start = inc * i;
      if (n>2){start = start + (pi / 2) ;} ;
      points.push(new Point(Math.cos(start)*radius0,Math.sin(start)*radius0));
    }
  } else {
    for (var i=0;i<n;i++ ){
      var start = inc * i;
      if (n==4){start = start + pi/n ;} ;
      points.push(new Point(Math.cos(start)*radius0,Math.sin(start)*radius0));
    }

    console.log(smallestPrime(n));

  };
  radius = radius * 0.8;

};

function smallestPrime(n){
  for (var i=0;i<primes.length-1;i++){
    if(n % primes[i] ===0){
      return primes[i];
    };
  };
};


var SIZE = 500;

function make(number, SIZE) {
    points = [];
    var list = primeFactorList(number);

    function dot(x, y, size) {
      points.push(new Point(x,y));
    }

        
    function polygon(n, depth, size, x, y, f) {
      console.log("n="+n);
        var step = 2 * Math.PI / n;
        var init = n === 2 ? Math.PI
                 : n === 4 ? Math.PI / 4
                           : 3 * Math.PI / 2;
        dot_radius = (2 * size) / (n + 2);
        var radius = (n * size) / (n + 2);
        var delta_y = n % 2 === 0 ? 0 
                    : (radius / 2) * (1 - Math.cos(Math.PI / n));
        
        for (var i = 0; i < n; ++i) {
            f(
                x + Math.cos(init + step * i) * radius,
                y + Math.sin(init + step * i) * radius + delta_y,
                dot_radius
            );
        }
    }
    
    function draw(x, y, size, depth) {
        if (depth < 0) {
            dot(x, y, size);
        } else {
            polygon(list[depth], depth, size, x, y, function (x, y, size) {
                draw(x, y, size, depth - 1);            
            });
        }
    }
    draw(0, 0, SIZE / 2, list.length - 1);

}


// http://nayuki.eigenstate.org/res/calculate-prime-factorization-javascript.js

function primeFactorList(n) {
    if (n < 1)
        throw "Argument error";
    
    var result = [];
    while (n != 1) {
        var factor = smallestFactor(n);
        result.push(factor);
        n /= factor;
    }
    return result;
}


function smallestFactor(n) {
    if (n < 2)
        throw "Argument error";
    if (n % 4 == 0)
        return 4; // vjeux hack
    if (n % 2 == 0)
        return 2;
    var end = Math.floor(Math.sqrt(n));
    for (var i = 3; i <= end; i += 2) {
        if (n % i == 0)
            return i;
    }
    return n;
}



</script>