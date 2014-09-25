---
title: 投稿記事
layout: post
postTitle: Mathjax, D3 SVG 
categories: post composition
---

<div class="row">
	<div class="col-sm-6">
		<div id="svg01"></div>
	</div>
	<div class="col-sm-6">
		$$固定円の半径：r_{c}=200$$
		$$移動円の半径；r_{m} \quad (r_{c}>r_{m}>0)$$
		内サイクロイド曲線が描く軌跡は
		$$x=(r_{c}-r_{m})\centerdot cos\theta 
			+ r_{m} \centerdot cos(\frac{r_{c}-r_{m}}{r_{m}}\theta)$$ 
		$$y=(r_{c}-r_{m})\centerdot sin\theta 
			- r_{m} \centerdot sin(\frac{r_{c}-r_{m}}{r_{m}}\theta)$$ 

	</div>
</div>

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_SVG"></script>
<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>

<script>

	var pi = Math.PI;
  	var aDegree = pi/180;
  	var rc = 200,
  		rm = 67;

	var height = 500,
		width  = 500;

	/** Scale */	
	var xScale = d3.scale.linear()
                    .domain([-200,200])
                    .range([50,450]);
  
  	var yScale = d3.scale.linear()
                    .domain([200,-200])
                    .range([50,450]);                       

    /** Line generator */                
    var cycloid = d3.svg.line()
        .x(function(d) {
       		var theta = aDegree * d;
       		var x = (rc-rm)*Math.cos(theta) + rm*Math.cos((rc-rm)/rm*theta);
       		return xScale(x); 
   		})
        .y(function(d) {
       		var theta = aDegree * d;
       		var y = (rc-rm)*Math.sin(theta) - rm*Math.sin((rc-rm)/rm*theta);
        	return yScale(y); })
        .interpolate("linear");

    /** SVG container */    
	var svg01 = d3.select("#svg01")
					.append("svg")
					.attr("height",height)
					.attr("width",width);

	/** Constant circle */
	var circleC = svg01.append("circle")
					.attr("cx",xScale(0))
					.attr("cy",yScale(0))
					.attr("r",rc)
					.attr("stroke","gold")
					.attr("stroke-width",2)
					.style("fill","none");

	var steps = [];
	for (var i = 0; i <= 360*25; i++) {
		steps.push(i);					
	};

    svg01.append("path")
          .attr("d", cycloid(steps))
          .attr("stroke", function(){return "lime"})
          .attr("class","cycloid")
          .attr("stroke-width", 2)
          .attr("fill", "none");   
				

</script>