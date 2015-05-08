---
title: 投稿記事
layout: post
postTitle: 内接円01
categories: post composition
---

### d3.jsで内接円の軌跡を描いてみました

<div class="row">
  <div class="col-sm-6">
    <div id="svg01"></div>
  </div>
  <div class="col-sm-6">
    <h3>
    <div class="btn-group-vertical">
      <span class="label">内円半径&gt;0</span>
      <input type="number" class="form-control text-right" data-bind="value:iR">
      <span class="label">描画位置割合(0&lt;比率&le;1.5)</span>
      <input class="form-control text-right" data-bind="value:rate">

      <span class="label">速さ　&le;50</span>
      <input class="form-control text-right" data-bind="value:duration
      ">

      <span class="label">回転数 &gt;0</span>
      <input type="number" class="form-control text-right" data-bind="value:rotation">

      <br>
      <button data-bind="click:run" class="btn btn-info">Run</button>
      <br>
      <button data-bind="click:reset" class="btn btn-warning">Reset</button>
      <br>
      <button data-bind="click:hide" class="btn btn-info">
        Hide Inner Circle</button>
      <br>
      <button data-bind="click:show" class="btn btn-warning">Show Innder Circle</button>
    </h3>
    </div>      
  </div>
</div>

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_SVG"></script>
<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="{{site.url}}/js/knockout-3.3.0.js" charset="utf-8"></script>

<script type="text/javascript">
/**
  ApplicationViewModel
**/
function AppViewModel() {

  // ko variables
  this.iR = ko.observable(50);
  this.rate = ko.observable(1.0);
  this.duration = ko.observable(20);
  this.rotation = ko.observable(1);

  // Point Object
  function Point(x, y){
    this.x = x;
    this.y = y;
    return this;
  };

  var pi = Math.PI;
  var aDegree = pi/180; 

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
  // vriables
  var centers = [];
  var ends = [];

  var tR;
  var iR;
  var alpha;
  var line = d3.svg.line()
      .x(function(d) { return xScale01(d.x); })
      .y(function(d) { return yScale01(d.y); })
      .interpolate("linear");


  
  //** 初期描画 *//
  init(200-this.iR(),this.iR(),this.rotation());

  // 再描画
  ko.computed(function() {
    if (this.duration() > 50) {
      this.duration = ko.observable(50);
    };
      init(200-this.iR(),this.iR(),this.rotation(),this.rate());
  }, this);

  this.run = function() {
    var traces = [];
    for (var i = 0; i < ends.length; i++) {
      traces.push(svg01.select("#trace"+i));
    };

    var el = svg01.select("#innerC");

    var cx,cy,ex,ey;

    for (var i = 0; i < centers.length; i=i+1) {
  
      cx = centers[i].x;
      cy = centers[i].y;
      ex = ends[i].x;
      ey = ends[i].y;
      var dur = this.duration();

      el.transition()
        .delay(i*dur)
        .duration(dur)
        .attr("cx",function(){ return xScale01(cx); } )
        .attr("cy",function(){ return yScale01(cy); } );

      svg01.select("#rLine").transition()
        .delay(i*dur)
        .duration(dur)
        .attr("x1",function(){ return xScale01(cx); })
        .attr("y1",function(){ return yScale01(cy); })
        .attr("x2",function(){ return xScale01(ex); } )
        .attr("y2",function(){ return yScale01(ey); } );
     
      traces[i]
        .transition()
        .delay(i*dur)
        .duration(dur)
        .attr("opacity",1);

  
    };    

  }; 

  this.reset = function() {
    init(200-this.iR(),this.iR(),this.rotation(),this.rate());
  }; 
  this.hide = function() {
    svg01.selectAll("#innerC")
    .attr("opacity",0);
  }; 
  this.show = function() {
    svg01.selectAll("#innerC")
    .attr("opacity",1);
  }; 

  function init(tR,iR,rotation,rate){
    svg01.selectAll("#outerC").remove();
    svg01.selectAll("#innerC").remove();
    svg01.selectAll("circle").remove();
    centers = [];
    ends = [];
  
    alpha = tR / iR * -1;
  
    for (var i = 0; i <=360*rotation; i++) {
      centers.push(new Point(tR*Math.cos(i*aDegree),
                             tR*Math.sin(i*aDegree) ));
      ends.push( 
        new Point((tR*Math.cos(i*aDegree)
                         +rate*iR*Math.cos(alpha*i*aDegree)),
                  (tR*Math.sin(i*aDegree) 
                         +rate*iR*Math.sin(alpha*i*aDegree))
                         ));
    };

    // 外円
    svg01.append("circle")
      .attr("cx",function(){ return xScale01(0); } )
      .attr("cy",function(){ return yScale01(0); } )
      .attr("r",200)
      .attr("id",function(){ return "outerC"; })
      .attr("stroke","lime")
      .attr("stroke-width","3px")
      .style("fill", function(){ return "none"});

    svg01.append("circle")
      .attr("cx",function(){ return xScale01(tR*Math.cos(0)); } )
      .attr("cy",function(){ return yScale01(tR*Math.sin(0)); } )
      .attr("r",iR)
      .attr("id",function(){ return "innerC"; })
      .attr("stroke","gold")
      .attr("stroke-width","4px")
      .style("fill", function(){ return "none"});

    drawLine(0);

    for (var i = 0; i < ends.length; i=i+1) {
      svg01.append("circle")
       .attr("cx",function(){ return xScale01(ends[i].x); } )
       .attr("cy",function(){ return yScale01(ends[i].y); } )
       .attr("r",1)
       .attr("id",function(){ return "trace"+i; })
       .attr("stroke","gold")
       .attr("stroke-width","1px")
       .attr("opacity",0)
       .style("fill", function(){ return "gold"});
    };  
  };

  function drawLine(i){
    svg01.select("#rLine").remove();
    svg01.append("line")
      .attr("x1",function(){
        return xScale01(centers[i].x);
      })
      .attr("y1",function(){
        return yScale01(centers[i].y);
      })
      .attr("x2",function(){
        return xScale01(ends[i].x);
      })
      .attr("y2",function(){
        return yScale01(ends[i].y);
      })
      .attr("stroke",function(){
        return "#f00";
      })
      .attr("stroke-width","4px")
      .attr("id","rLine");

  }

};

// Activates knockout.js
ko.applyBindings(new AppViewModel());

</script>