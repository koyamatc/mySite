---
title: 投稿記事
layout: post
postTitle: Categorical Colors
categories: post composition
---

<div id="svg"></div>

<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script>

var width = height = 640;

var bgColor = "black"; // 背景色
var lineColor = "gold";

/** svg空間作成 */
var svg =  d3.select("#svg")
                      .append("svg")
                      .attr("width", width)
                      .attr("height", height)
                      .style("background",bgColor);


var color10 = d3.scale.category10();
var color20 = d3.scale.category20();
var color20b = d3.scale.category20b();
var color20c = d3.scale.category20c();

var c10 = [];
var c20 = [];

for (var i = 0; i < 10; i++) {
  c10.push(i);
};
for (var i = 0; i < 20; i++) {
  c20.push(i);
};

svg.selectAll(".c10")
   .data(c10)
   .enter()
   .append("rect")
   .attr("x", function(d,i){ return 0;})
   .attr("y", function(d,i){ return i * 30 + 30; })
   .attr("width",100)
   .attr("height", 28)
   .attr("class","c10")
   .style("fill", function(d,i){return color10(i)});

svg.selectAll(".c20")
   .data(c20)
   .enter()
   .append("rect")
   .attr("x", function(d,i){ return 120;})
   .attr("y", function(d,i){ return i * 30 + 30; })
   .attr("width",100)
   .attr("height", 28)
   .attr("class","c20")
   .style("fill", function(d,i){return color20(i)});

svg.selectAll(".c20b")
   .data(c20)
   .enter()
   .append("rect")
   .attr("x", function(d,i){ return 240;})
   .attr("y", function(d,i){ return i * 30 + 30; })
   .attr("width",100)
   .attr("height", 28)
   .attr("class","c20b")
   .style("fill", function(d,i){return color20b(i)});

svg.selectAll(".c20c")
   .data(c20)
   .enter()
   .append("rect")
   .attr("x", function(d,i){ return 360;})
   .attr("y", function(d,i){ return i * 30 + 30; })
   .attr("width",100)
   .attr("height", 28)
   .attr("class","c20c")
   .style("fill", function(d,i){return color20c(i)});

</script>