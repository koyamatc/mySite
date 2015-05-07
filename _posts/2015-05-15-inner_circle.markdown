---
title: 投稿記事
layout: post
postTitle: 内接円1
categories: post composition
---
d3.jsで

<div id="svg01"></div>

<button id="btn01" class="btn btn-lg btn-primary">実行</button>
<button id="btn02" class="btn btn-lg btn-primary">リセット</button>
<button id="btn03" class="btn btn-lg btn-primary">螺旋を消す</button>
<button id="btn04" class="btn btn-lg btn-primary">螺旋を表示</button>
<h3>
$$
$$
</h3>

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_SVG"></script>
<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="{{site.url}}/js/d3draws.js" charset="utf-8"></script>

<script>

  color = d3.scale.category20();

  var svg01 = d3.select("#svg01")
                .append("svg")
                .attr("height",500)
                .attr("width",500)
                .style("background","#000");

  var xScale01 = d3.scale.linear()
                       .domain([-250,250])
                       .range([0,500]);
  var yScale01 = d3.scale.linear()
                       .domain([250,-250])
                       .range([0,500]); 

  var centers = [];
  var ends = [];

  for (var i = 0; i <=360; i++) {
    centers.push(new Point(150*Math.cos(i*aDegree),
                           150*Math.sin(i*aDegree)));
    ends.push(new Point(50*Math.cos(-3*i*aDegree),
                        50*Math.sin(-3*i*aDegree)));
  };


  draw();
 
　d3.select("#btn01").on("click",function(){
  
  var el = svg01.select("#innerC");

  for (var i = 0; i < centers.length; i=i+1) {
  
      el.transition()
        .delay(i*50)
        .duration(50)
        .attr("cx",function(){ return xScale01(centers[i].x); } )
        .attr("cy",function(){ return yScale01(centers[i].y); } )

      svg01.select("#rLine").transition()
        .delay(i*50)
        .duration(50)
        .attr("x1",function(){
          return xScale01(centers[i].x);
        })
        .attr("y1",function(){
          return xScale01(centers[i].y);
        })
        .attr("x2",function(){ 
            return xScale01(centers[i].x+ends[i].x); 
          } )
        .attr("y2",function(){ 
            return yScale01(centers[i].y+ends[i].y); 
          } )
  };
 

 })


 d3.select("#btn02").on("click",function(){
  draw();
 })

 d3.select("#btn03").on("click",function(){
  svg01.selectAll(".spiral").attr("opacity",0);
 })
 d3.select("#btn04").on("click",function(){
  svg01.selectAll(".spiral").attr("opacity",1);
 })

function draw(){

    svg01.append("circle")
      .attr("cx",function(){ return xScale01(0); } )
      .attr("cy",function(){ return yScale01(0); } )
      .attr("r",200)
      .attr("id",function(){ return "outerC"; })
      .attr("stroke","lime")
      .attr("stroke-width","3px")
      .style("fill", function(){ return "none"});

    svg01.append("circle")
      .attr("cx",function(){ return xScale01(150*Math.cos(0)); } )
      .attr("cy",function(){ return yScale01(150*Math.sin(0)); } )
      .attr("r",50)
      .attr("id",function(){ return "innerC"; })
      .attr("stroke","gold")
      .attr("stroke-width","4px")
      .style("fill", function(){ return "none"});

    drawLine(0);  

}

function drawLine(i){
  svg01.select("#rLine").remove();
  svg01.append("line")
      .attr("x1",function(){
        return xScale01(centers[i].x);
      })
      .attr("y1",function(){
        return xScale01(centers[i].y);
      })
      .attr("x2",function(){
        return xScale01(centers[i].x+ends[i].x);
      })
      .attr("y2",function(){
        return xScale01(centers[i].y+ends[i].y);
      })
      .attr("stroke",function(){
        return "#f00";
      })
      .attr("stroke-width","4px")
      .attr("id","rLine");

}
</script>
