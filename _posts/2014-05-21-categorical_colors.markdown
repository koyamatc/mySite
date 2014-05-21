---
title: 投稿記事
layout: post
postTitle: Categorical Colors
categories: post composition
---

<div id="svg"></div>

###d3.jsの組み込み配色

1. category10
2. category20
3. category20b
4. category20c

####<使い方>

{% highlight javascript %}

// category10の配色を指定
var color10 = d3.scale.category10();
// 色の指定
color10(2)　// #2ca02c

// カスタム配色設定 
var custom = d3.scale.ordinal()
               .domain([0,1,2,3,4])
               .range(["#E6FF36","#6CA1FF","#25E885","#E89C25","#FF2929"]);
custom(1); // 色の指定                    

{% endhighlight %}

<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script>

var width = height = 640;

var bgColor = "black"; // 背景色

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
var custom = d3.scale.ordinal()
               .domain([0,1,2,3,4])
               .range(["#E6FF36",
                       "#6CA1FF",
                       "#25E885",
                       "#E89C25",
                       "#FF2929"
                     ]);
 
var c10 = [];
var c20 = [];
var head = ["category10","category20","category20b","category20c","custom"]

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
   .attr("x", function(d,i){ return 10;})
   .attr("y", function(d,i){ return i * 30 + 30; })
   .attr("width",100)
   .attr("height", 28)
   .attr("class","c10")
   .style("fill", function(d,i){return color10(i)});

svg.selectAll(".c20")
   .data(c20)
   .enter()
   .append("rect")
   .attr("x", function(d,i){ return 130;})
   .attr("y", function(d,i){ return i * 30 + 30; })
   .attr("width",100)
   .attr("height", 28)
   .attr("class","c20")
   .style("fill", function(d,i){return color20(i)});

svg.selectAll(".c20b")
   .data(c20)
   .enter()
   .append("rect")
   .attr("x", function(d,i){ return 250;})
   .attr("y", function(d,i){ return i * 30 + 30; })
   .attr("width",100)
   .attr("height", 28)
   .attr("class","c20b")
   .style("fill", function(d,i){return color20b(i)});

svg.selectAll(".c20c")
   .data(c20)
   .enter()
   .append("rect")
   .attr("x", function(d,i){ return 370;})
   .attr("y", function(d,i){ return i * 30 + 30; })
   .attr("width",100)
   .attr("height", 28)
   .attr("class","c20c")
   .style("fill", function(d,i){return color20c(i)});

svg.selectAll(".cust")
   .data(custom.range())
   .enter()
   .append("rect")
   .attr("x", function(d,i){ return 490;})
   .attr("y", function(d,i){ return i * 30 + 30; })
   .attr("width",100)
   .attr("height", 28)
   .attr("class","cust")
   .style("fill", function(d,i){return custom(i)});

svg.selectAll(".head")
   .data(head)
   .enter()
   .append("text")
   .attr("x",function(d,i){ return i*120 + 10; })
   .attr("y", 20)
   .text(function(d){ return d;})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("font-weight","bold")
   .attr("class","head")
   .style("fill", "red");


svg.selectAll(".c10t")
   .data(color10.domain())
   .enter()
   .append("text")
   .attr("x", function(){ return 20; })
   .attr("y", function(d,i){ return i * 30 + 50; })
   .text(function(d,i){ return color10(i);})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("class","c10t")
   .style("fill", "#ccc");
  
svg.selectAll(".c20t")
   .data(color20.domain())
   .enter()
   .append("text")
   .attr("x", function(){ return 140; })
   .attr("y", function(d,i){ return i * 30 + 50; })
   .text(function(d,i){ return color20(i);})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("class","c20t")
   .style("fill", "#ccc");

svg.selectAll(".c20bt")
   .data(color20b.domain())
   .enter()
   .append("text")
   .attr("x", function(){ return 260; })
   .attr("y", function(d,i){ return i * 30 + 50; })
   .text(function(d,i){ return color20b(i);})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("class","c20bt")
   .style("fill", "#ccc");

svg.selectAll(".c20ct")
   .data(color20c.domain())
   .enter()
   .append("text")
   .attr("x", function(){ return 380; })
   .attr("y", function(d,i){ return i * 30 + 50; })
   .text(function(d,i){ return color20c(i);})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("class","c20ct")
   .style("fill", "#ccc");

svg.selectAll(".custt")
   .data(custom.domain())
   .enter()
   .append("text")
   .attr("x", function(){ return 500; })
   .attr("y", function(d,i){ return i * 30 + 50; })
   .text(function(d,i){ return custom(i);})
   .attr("font-family", "sans-serif")
   .attr("font-size", "16px")
   .attr("class","custt")
   .style("fill", "#ccc");


</script>