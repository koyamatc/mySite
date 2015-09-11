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
  <div class="col-sm-10">
    <div id="svg01"></div>
  </div>
  <div class="col-sm-2">
    <div class="btn-group-vertical">
      <button 
        id="stackBtn" 
        class="btn btn-info"
      >
        積む （ stack ）
      </button>
      <br>
      <button 
        id="suitBtn" 
        class="btn btn-info"
      >
        スートごと （ suit ）
      </button>
      <br>
      <button 
        id="cutBtn" 
        class="btn btn-info"
      >
        カット （ cut ）
      </button>
    </div>    
  </div>
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
    cardOrder =[],
    workOrder =[],
    cardHeight = 80,
    cardWidth = 60,
    svg01,
    height = 600,
     width = 900;


　 /* 初期処理 */
  var 
    i = 0,
    length = 52,
    value,
    suit,
    x,y;
    
    // card 作成  
    for (i;i<length;i++){
      suit = suits[Math.floor(i / 13)];
      value = order[i % 13];
     
      cards.push(
          new Card(i, value, suit, 0, 0, true)
        );
    };

    cardOrder = cards;

     
  // svg 追加 
  svg01 = d3.select("#svg01")
                .append("svg")
                .attr("height",height)
                .attr("width",width)
                .style("background","#10914F");

  svg01.selectAll(".cardGroup")
    .data(cardOrder)
    .enter()
    .append("g")
    .attr("class","cardGroup")
    .attr("id",function(d,i){return "group"+i;})

    .append("rect")
    .attr("x", function(d,i){ return d.x+(i%13)*(cardWidth+1)+50;})
    .attr("y", function(d,i){ return d.y+(cardHeight+5)*Math.floor(i/13)+150})
    .attr("width", function(){return cardWidth;})
    .attr("height", function(){return cardHeight;})
    .attr("stroke","#333")
    .attr("class","cards")
    .attr("id",function(d,i){
      appendText(d,i);
      return "card"+i;})
    .style("fill","#fff");

    function appendText(d,i){
      var el ="#group" + i;
      var j = i;
      svg01.select(el).append("text")
        .attr("x", function(d){ return d.x+(j%13)*(cardWidth+1)+50;})
        .attr("y", function(d){ return d.y+(cardHeight+5)*Math.floor(j/13)+20+150})
        .text(function(d){return d.suit + d.value})
        .attr("stroke", function(d){
          return d.suit==="♠"?"#000":d.suit==="♣"?"#000":"#f00";
        })
        .attr("class","cardsText")
        .attr("id",function(){return "text"+j;})
        .attr("font-size","18px"); 

    };

  

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

  /*----------*/
  /* Stacking */
  /*----------*/
  d3.select("#stackBtn").on("click",function(){

    var
     element,
     i = 0,
     xPos,
     yPos;
    
    for (i;i<length;i++){
      xPos = 10-i*(10/length)+width/2-cardWidth/2;
      yPos = 15-i*(15/length)+20;
      el = "#card" + i;
      svg01.select(el)
        .transition()
        .duration(20)
        .delay(i*20)
        .attr("x",function(){return xPos;})
        .attr("y",function(){return yPos;});
  
      el = "#text" + i;
      svg01.select(el)
        .transition()
        .duration(20)
        .delay(i*20)
        .attr("x",function(){return xPos;})
        .attr("y",function(){return yPos + 20;});
    
    } 

  });

  /*---------
    Cutting 
    ---------*/
  d3.select("#cutBtn").on("click",function(){

    var 
      cutPos,
      el;

    cutPos = Math.floor(Math.random()*length)+1;
    cutPos = 26;

   
    for (i=length;i>=cutPos;i--){
      xPos = 10-i*(10/length)+width/2-cardWidth/2+cardWidth+10;
      yPos = 15-i*(15/length)+20;
      el = "#card" + i;
      svg01.select(el)
        .transition()
        .duration(500)
        .delay(0)
        .attr("x",function(){return xPos;})
        .attr("y",function(){return yPos;});
  
      el = "#text" + i;
      svg01.select(el)
        .transition()
        .duration(500)
        .delay(0)
        .attr("x",function(){return xPos;})
        .attr("y",function(){return yPos + 20;});
    
    }; 

    workOrder = [];

    for  (var i=cutPos;i<length;i++){
      workOrder.push(cardOrder[i]);
    };
    for  (var i=0;i<cutPos;i++){
      workOrder.push(cardOrder[i]);
    };

    cardOrder = workOrder;

     for (i=0;i<length;i++){

      xPos = 10-i*(10/length)+width/2-cardWidth/2;
      yPos = 15-i*(15/length)+20;
      el = "#card" + cardOrder[i].index;
      svg01.select(el)
        .transition()
        .duration(500)
        .delay(500)
        .attr("x",function(){return xPos;})
        .attr("y",function(){return yPos;})
        .attr("position","relative")
        .attr("z-index",function(){return i;});
  
      el = "#text" + cardOrder[i].index;
      svg01.select(el)
        .transition()
        .duration(500)
        .delay(500)
        .attr("x",function(){return xPos;})
        .attr("y",function(){return yPos + 20;})
        .attr("z-index",function(){return i;});

        console.log(cardOrder[i].suit+cardOrder[i].value);    
    }; 
   

    
  });
  /*---------
    By suit
    ---------*/
    d3.select("#suitBtn").on("click",function(){
    
    });

</script>