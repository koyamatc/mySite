---
title: 投稿記事
layout: post
postTitle: Deck of cards
categories: post d3
---

-----

トランプの描画

[Integrating D3.js visualizations in a React app](http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/)

[Demo]({{site.url}}/component_test/es6/select/)

<div class="row">
  <div class="col-sm-6">
    <div id="svg01"></div>
  </div>
  <div class="col-sm-6"></div>
</div>

<script src="http://d3js.org/d3.v3.min.js"></script>

<script type="text/javascript">

  // Card Object
  function Card(index, value, suit, x, y, faceUp){
    this.index = index;
    this.value = value;
    this.suit = suit; 
    this.x = x;
    this.y = y;
    this.faceUp = faceUp;
    return this;
  };

  var order = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"],
    suits = ["♠","♥","♣","♦"],
    cards = [],
    svg01,
    height = 600,
     width = 900;


  init();

  /* 初期処理 */
  function init(){

    var 
      i = 0,
      length = 52,
      value,
      suit,
      x,y;
      
    for (i;i<length;i++){
      suit = suits[Math.floor(i / 13)];
      value = order[i % 13]
      console.log(suit+value);
     
      cards.push(
          new Card(i, value, suit, 0, 0, true)
        )
        
    } 
     
    console.log(cards); 

  // svg 追加 
  svg01 = d3.select("#svg01")
                .append("svg")
                .attr("height",height)
                .attr("width",width)
                .style("background","#111");

  } 

  svg01.selectAll(".cards")
    .data(cards)
    .enter()
    .append("rect")
    .attr("x", function(d,i){ return d.x+(i%13)*51})
    .attr("y", function(d,i){ return d.y+85*Math.floor(i/13)})
    .attr("width", 50)
    .attr("height", 80)
    .attr("stroke","#666")
    .attr("class","cards")
    .style("fill","#fff"); 

  svg01.selectAll(".cardsText")
    .data(cards)
    .enter()
    .append("text")
    .attr("x", function(d,i){ return d.x+(i%13)*51})
    .attr("y", function(d,i){ return d.y+85*Math.floor(i/13)+20})
    .text(function(d){return d.suit + d.value})
    .attr("stroke", function(d){
      return d.suit==="♠"?"#000":d.suit==="♣"?"#000":"#f00";
    })
    .attr("class","cardsText")
    .attr("font-size","18px"); 


      // ドラッグ時の挙動
  var drag = d3.behavior.drag()
        //ドラッグ開始時の処理
       .on("dragstart", function(){
            d3.select(this).attr("opacity",0.4)
          }) 
       　//ドラッグ中の処理
       .on("drag", dragmove)
        //ドラッグ終了時の処理
       .on("dragend", function(){ 
            d3.select(this).attr("opacity",1)
  });
  function dragmove(d){
    var 
      cardDragging = d3.select(this);
    cardDragging
      .attr("x", 
        d.x = Math.max(50, Math.min(width - radiusOfControlPoints, d3.event.x)))
      .attr("y", 
        d.y = Math.max(80, Math.min(height - radiusOfControlPoints, d3.event.y)));
 

  };              

</script>