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
  // Point Object
  function Point(x, y){
    this.x = x;
    this.y = y;
    return this;
  };

  var pi = Math.PI;
  var points =[];
  var radius = 20;
  var dot_radius =100;

  var ticks = [];
    for (var i=1;i<=127; i++){
      ticks.push(i);
  };

  color = d3.scale.category20();

  var height = 500,
      width  = 500;

  // create scales
  var xScale = d3.scale.linear()
         .domain([-250,250])
         .range([00,500]);
  var yScale = d3.scale.linear()
         .domain([-250,250])
         .range([0,500]);

  // svg空間作成 
  var svg =  d3.select("#svg")
                        .append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .style("background","#000");
  // initial draw 
  svg.selectAll("circle")
      .data(ticks)
     .enter().append("circle")
      .attr("cx",function(){return xScale(0);})
      .attr("cy",function(){return yScale(0);})
      .attr("r",function(){return 0;})
      .attr("id",function(d,i){return "c"+i;})
      .attr("opacity",0.0)
      .style("fill","gold");   

  // Reset button clicked   
  d3.select("#reset").on("click",function(){
    svg.selectAll("circle")
      .transition()
      .duration(1000)
      .attr("opacity",0)
      .attr("cx",function(){return xScale(0);})
      .attr("cy",function(){return yScale(0);})
      .attr("r",0)
      .style("fill","gold");
    dot_radius = 100;  
  });                      

  // Run button clicked
  d3.select("#run").on("click",function(){
 

    for (var i = 1; i <= 127; i++) {

      make(i,250); // create points for circles
      var delay = 1000 * i; // create delay time
      draw0(delay,i); // transition

    };
    
  });                      

  /** transition circles */
  function draw0(delay,circles){

      for (l=0;l<points.length;l++){
        var el = d3.select("#c"+l);

        el.transition()
          .delay(delay)
          .duration(750)
          .ease("linear")
          .attr("opacity",1)
          .attr("cx",function(d){return xScale(points[l].x);})
          .attr("cy",function(d){return yScale(points[l].y);})
          .attr("r",function(){return dot_radius;})
          .style("fill",function(){return color(Math.floor(Math.random()*20));});
      }

  };

  var SIZE = 500;

  function make(number, SIZE) {
      points = [];
      var list = primeFactorList(number);

      // save vertex
      function dot(x, y, size) {
        points.push(new Point(x,y));
      }

      // get polygon vertex    
      function polygon(n, depth, size, x, y, f) {
          var step = 2 * pi / n;
          var init = n === 2 ? pi
                   : n === 4 ? pi / 4
                             : 3 * pi / 2;
          dot_radius = (2 * size) / (n*9);
          if(dot_radius<2){dot_radius=4;}
          if(number > 10 && dot_radius > 7){dot_radius=7};
          if(number > 60 && dot_radius > 4){dot_radius=4};
          var radius = (n * size) / (n + 2);
          var delta_y = n % 2 === 0 ? 0 
                      : (radius / 2) * (1 - Math.cos(pi / n));
          
          for (var i = 0; i < n; ++i) {
              f(
                  x + Math.cos(init + step * i) * radius,
                  y + Math.sin(init + step * i) * radius + delta_y,
                  radius
              );
    
          }
      }
      
      // Recursive draw 
      function draw(x, y, size, depth) {
          if (depth < 0) {
              dot(x, y, size);
          } else {
              polygon(list[depth], depth, size, x, y, function (x, y, size) {
                  draw(x, y, size, depth - 1);            
              });
          }
      }
      draw(0, 0, SIZE / 2 , list.length - 1);

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