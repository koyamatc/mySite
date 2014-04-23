---
title: 投稿記事
layout: post
postTitle: 錯視
categories: post composition
---

<div class="row">
  <div class="col-sm-6">
    <div id="svg"></div>
    <div>
    	<div class="row">
    		<div class="col-sm-4">
    	    <button id="run" class="btn btn-info">Run</button>
    		</div>
    		<div class="col-sm-4">
    	    <button id="stop" class="btn btn-info">Reset</button>
    		</div>
    		<div class="col-sm-4">
    	    <button id="bg" class="btn btn-info">背景消去</button>
    		</div>
    	</div>
    </div>
  </div>
  <div class="col-sm-6">
  	<p><span class="label label-info">Run</span>ボタンを押してください</p>
  	<p>どのように見えますか？</p>
  	<p>黄色と青の長方形は、どちらも同じ動作を同じタイミングで行っています。</p>
  	<p><span class="label label-info">背景消去</span>ボタンを押してみてください</p>
  	<p>いかがですか</p>
  	<p>先日見た情報サイト（どこだか忘れました）にあったものをd3.jsで再現してみました。</p>
  </div>	
</div>

<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script type="text/javascript">

var bgStatus = true;	// 背景の状態
var bgColor = "#fff"; // 背景色

/** svg空間作成 */
var svgContainer =  d3.select("#svg")
                      .append("svg")
                      .attr("width", 400)
                      .attr("height", 400)
                      .style("background",bgColor);

/** background **/
var bgData = [];
for (var i = 0; i < 5; i++) {
  bgData.push(i);
};

svgContainer
   .selectAll(".bg")
   .data(bgData)
   .enter()
   .append("rect")
   .attr("x",function(d){return 0;})
   .attr("y",function(d){return d*80;})
   .attr("width",function(d){return 400;})
   .attr("height",function(d){return 45;})
   .style("fill",function(d){return "#000";})
   .attr("class","bg");

/* rects */
var rectData = ["yellow","blue"];
svgContainer
   .selectAll(".actor")
   .data(rectData)
   .enter()
   .append("rect")
   .attr("x",function(d,i){return 80 + (i*160);})
   .attr("y",function(d){return 340;})
   .attr("width",function(d){return 100;})
   .attr("height",function(d){return 80;})
   .style("fill",function(d){return d;})
   .attr("class","actor");

/* buttons */
d3.select("#bg").on("click",function(){
  if (bgStatus) {
  	d3.selectAll(".bg").transition()
            .duration(500)
            .style("fill",bgColor);
    d3.select("#bg").html("背景描画");

  } else {
  	d3.selectAll(".bg").transition()
            .duration(500)
            .style("fill","#000");
    d3.select("#bg").html("背景消去");
  };
  bgStatus = !bgStatus;
});

d3.select("#run").on("click",function(){

	d3.selectAll(".actor")
			.attr("height",80)
			.transition()
      .duration(1000)
      .ease("linear")
      .attr("y",300)
      .transition()
      .duration(1500)
      .ease("linear")
      .attr("width",70)
      .attr("height",60)
      .attr("y",280)
      .transition()
      .duration(2000)
      .ease("linear")
      .attr("width",100)
      .attr("height",80)
      .attr("y",240)
      .transition()
      .duration(2000)
      .ease("linear")
      .attr("width",100)
      .attr("height",120)
      .attr("y",170)
			.transition()
      .duration(2000)
      .ease("linear")
      .attr("y",110)
      .attr("height",80)
			.transition()
      .duration(1500)
      .ease("linear")
      .attr("y",50)
			.transition()
      .duration(1500)
      .ease("linear")
      .attr("y",0)
      .attr("height",90)

			.transition()
      .duration(3000)
      .ease("linear")
      .attr("y",60)
      .attr("width",20)
      .transition()
      .duration(2000)
      .ease("linear")
      .attr("y",70)
      .attr("width",100)
			.transition()
      .duration(7000)
      .ease("linear")
      .attr("y",340);

});   
d3.select("#stop").on("click",function(){
  d3.selectAll(".actor")
			.transition()
      .duration(2000)  
			.attr("height",80)
			.attr("width",100)
			.attr("y",340);
});

</script>
