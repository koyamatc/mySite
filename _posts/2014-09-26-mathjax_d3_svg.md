---
title: 投稿記事
layout: post
postTitle: Mathjax, D3 SVG 
categories: post composition
---

Mathjax の数式を d3.js　の　SVG　へ出力しています。

いろいろ調べましたが

forreignObjectタグを使う方法が簡単なようなので書いてみました。 

<div class="row">
	<div class="col-sm-6">
		<div id="svg01"></div>
	</div>
	<div class="col-sm-6">
		$$固定円の半径：r_{c}=200$$
		$$移動円の半径；r_{m} \quad (r_{c}>r_{m}>0)$$

    <div class="btn-group-vertical">
      <span class="label">移動円の半径</span>
      <input type="number" class="form-control text-right" data-bind="value:radiusM">

      <span class="label">角度倍数(360° x)</span>
      <input type="number" class="form-control text-right" data-bind="value:factor">

      <br>
      <button data-bind="click:run" class="btn btn-success">Draw</button>
      <br>
      <button data-bind="click:reset" class="btn btn-warning">Reset</button>
    </div>      

	</div>
</div>
<br>
<div class="label label-info">CSS</div>
{% highlight css %}
.MathJax_SVG_Display {
  text-align: left !important;
}
.MathJax_SVG g{
  stroke:#fff;
  stroke-width:2;
  fill:#fff;
}
{% endhighlight %}

<div class="label label-info">html</div>

{% highlight html %}
<!-- Mathjax SVG出力指定 -->
<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_SVG"></script>
{% endhighlight %}

<div class="label label-info">JavaScript</div>
{% highlight javascript %}
//出力データ設定
var foData = [
		{"x":150,"y":0,
			"text":"$$内サイクロイド$$"},
		{"x":0,"y":500,
			"text":"$$x=(r_{c}-r_{m})\\centerdot cos\\theta + r_{m} \\centerdot cos(\\frac{r_{c}-r_{m}}{r_{m}}\\theta)$$"},
		{"x":0,"y":550,
			"text":"$$y=(r_{c}-r_{m})\\centerdot sin\\theta - r_{m} \\centerdot sin(\\frac{r_{c}-r_{m}}{r_{m}}\\theta)$$"}
	];				

//　foreignObject追加  
svg01.selectAll(".fo")
  	.data(foData)
  	.enter()
  	.append("foreignObject")
  	.attr("class","fo")
  	.attr("x",function(d){ return d.x })
  	.attr("y",function(d){ return d.y })
  	.text(function(d){return d.text;});   
{% endhighlight %}

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_SVG"></script>
<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="{{site.url}}/js/knockout-3.1.0.js" charset="utf-8"></script>

<script>
/**
  ApplicationViewModel
**/
function AppViewModel() {

  // ko variables
  this.radiusM = ko.observable(47);
  this.factor = ko.observable(25);


	var pi = Math.PI;
  var aDegree = pi/180;
  var rc = 200,
  		rm;

	var height = 600,
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
					.attr("width",width)
					.style("position","relative");

	/** Constant circle */
	var circleC = svg01.append("circle")
					.attr("cx",xScale(0))
					.attr("cy",yScale(0))
					.attr("r",rc)
					.attr("stroke","gold")
					.attr("stroke-width",2)
					.style("fill","none");

	var foData = [
		{"x":150,"y":0,
			"text":"$$内サイクロイド$$"},
		{"x":0,"y":500,
			"text":"$$x=(r_{c}-r_{m})\\centerdot cos\\theta + r_{m} \\centerdot cos(\\frac{r_{c}-r_{m}}{r_{m}}\\theta)$$"},
		{"x":0,"y":550,
			"text":"$$y=(r_{c}-r_{m})\\centerdot sin\\theta - r_{m} \\centerdot sin(\\frac{r_{c}-r_{m}}{r_{m}}\\theta)$$"}
	];				
  
  svg01.selectAll(".fo")
  	.data(foData)
  	.enter()
  	.append("foreignObject")
  	.attr("class","fo")
  	.attr("x",function(d){ return d.x })
  	.attr("y",function(d){ return d.y })
  	.attr("height",30)
  	.attr("width",300)
  	.text(function(d){return d.text;})
  	.style("position","absolute")
  ;   
 
 this.run = function(){
 		rm = parseInt(this.radiusM());
		var steps = [];
		for (var i = 0; i <= 360*parseInt(this.factor()); i++) {
			steps.push(i);					
		};

    svg01.append("path")
          .attr("d", cycloid(steps))
          .attr("stroke", function(){return "lime"})
          .attr("class","cycloid")
          .attr("stroke-width", 2)
          .attr("fill", "none");   
	};

  this.reset = function(){

    svg01.selectAll(".cycloid")
        .remove();
    svg01.selectAll(".text")
        .remove();

  };

};

// Activates knockout.js
ko.applyBindings(new AppViewModel());

</script>