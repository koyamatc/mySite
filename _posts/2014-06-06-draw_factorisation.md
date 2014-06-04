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


var ticks = [];
for (var i=1;i<=60; i++){
  ticks.push(i);
};

var points =[];
var radius = 20;

var height = 500,
    width  = 500;

var xScale = d3.scale.linear()
       .domain([-250,250])
       .range([00,500]);
var yScale = d3.scale.linear()
       .domain([250,-250])
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


  for (var i = 0; i < 1; i++) {

    factorisation(i);
  
    draw();

  };
  
});                      

function draw(){

    for (l=0;l<points.length;l++){
      var el = d3.select("#c"+l);

      el.transition()
        .duration(1000)
        .ease("linear")
        .attr("opacity",1)
        .attr("cx",function(d){return xScale(points[l].x);})
        .attr("cy",function(d){return yScale(points[l].y);})
        .attr("r",function(){return radius;})
        .transition()
        .duration(1000)
        .delay(function(){return 1000*l;});
    }

};

function factorisation(n){
  points=[];
  if (n == 0){
    points.push(new Point(0,0));
    radius = 150;
    return;
  };
  
  if (n == 1){
    radius = 150 /2 ;
    points.push(new Point(Math.cos(0)*radius,Math.sin(0)*radius));
    points.push(new Point(Math.cos(Math.PI)*radius,Math.sin(Math.PI)*radius));
    radius = radius * 0.8;
  };

  for (var i=1;i<=n;i++ ){
  }
  console.log(points);
};

</script>