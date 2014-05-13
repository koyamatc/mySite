---
title: 投稿記事
layout: post
postTitle: フラクタル図形
categories: post composition
---

<div class="row">
  <div class="col-sm-6">
    <div id="svg"></div>
    <div class="col-sm-3">
      <button class="btn btn-info" data-bind="click:koch">コッホ曲線</button>
    </div>
    <div class="col-sm-3">
      <button class="btn btn-info" data-bind="click:tree">樹木曲線</button>
    </div>
    <div class="col-sm-3">
      <button class="btn btn-info" data-bind="click:dragon">ドラゴン曲線</button>
    </div>
    <div class="col-sm-3"><button class="btn btn-info" id="reset">リセット</button></div>

    <hr>

    <div class="row">
      <div class="col-sm-4">
        <span class="label">コッホ曲線ループ回数</span>
        <select data-bind="options: kochLoops,
                       value: selectedKochLoops,
                       valueAllowUnset: true"></select>
      </div>
      <div class="col-sm-4">
        <span class="label">樹木曲線ループ回数</span>
        <select data-bind="options: treeLoops,
                       value: selectedTreeLoops,
                       valueAllowUnset: true"></select>
      </div>
      <div class="col-sm-4">
        <span class="label">ドラゴン曲線ループ回数</span>
        <select data-bind="options: dragonLoops,
                       value: selectedDragonLoops,
                       valueAllowUnset: true"></select>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-offset-4">
        <span class="label">枝の広がり</span><br>
        <select data-bind="options: branchRatio,
                       value: selectedBranchRatio,
                       valueAllowUnset: true"></select>
      </div>
    </div>


  </div>
  <div class="col-sm-6">
    <p>d3.js + svg で、　フラクタル図形を描いてみました。</p>

    <p>ループ回数の設定には、　knockout.js を利用しています。</p>

    <p>参考にさせてもらったのは
      <a href="http://codezine.jp/article/detail/73">
        CodeZineの「再帰プログラムによるフラクタル図形の描画」</a>です。
    </p>

    <p>javaで書かれていたので、d3.js + knockout.jsで使えるように JavaScript に書き換えています。</p>

    <p>試してみてください。</p>

    <p>フラクタル図形を描くのに"タートル・グラフィックス"といのがあるそうで（..昔聞いたような...）</p>
    <p>logoという言語（若い時に見た雑誌に特集があった...）を使って描けるという。
      そのころはlogoの勉強はしませんでしたが。少しかじってみようかと思います。</p>

  </div>	
</div>

<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="{{site.url}}/js/knockout-3.1.0.js" charset="utf-8"></script>
<script>

function Point(x, y){
  this.x = x;
  this.y = y;
  return this;
};


var bgColor = "black"; // 背景色
var lineColor = "gold";

/** svg空間作成 */
var svg =  d3.select("#svg")
                      .append("svg")
                      .attr("width", 500)
                      .attr("height", 500)
                      .style("background",bgColor);


d3.select("#reset").on("click",function(){
  svg.selectAll("line").remove();
});                      

/**
  ApplicationViewModel
**/
function AppViewModel() {
  
  // Non-editable catalog data - would come from the server
  kochLoops = ['0', '1', '2', '3', '4'];
  selectedKochLoops = ko.observable('3');
  treeLoops = ['3', '4', '5', '6', '7'];
  selectedTreeLoops = ko.observable('3');
  branchRatio = ['0.7', '0.8', '0.9'];
  selectedBranchRatio = ko.observable('0.7');

  dragonLoops = ['0', '1', '2', '3', '4','5', '6', '7', '8', '9', '10','12','15'];
  selectedDragonLoops = ko.observable('8');


  /*************************************
    click event 
  **************************************/
  // コッホ曲線
  self.koch = function() {
    var P = new Point(100, 160);
    var Q = new Point(400, 160);
    var R = new Point(250, 420);
    drawKoch(P,Q,selectedKochLoops());
    drawKoch(Q,R,selectedKochLoops());
    drawKoch(R,P,selectedKochLoops());

    function drawKoch(a,b,n){
      //メソッド内部で使用する３点を生成します
      var c=new Point(Math.floor((2*a.x+b.x)/3), Math.floor((2*a.y+b.y)/3));
      var d=new Point(Math.floor((a.x+2*b.x)/3), Math.floor((a.y+2*b.y)/3));

      var e=new Point(0,0);

      var xx,yy;
      var angle1,angle2,distance;

      xx=Math.round(b.x-a.x);
      yy=Math.round(-(b.y-a.y));

      distance=Math.sqrt(xx*xx+yy*yy)/Math.sqrt(3);

      if(xx>=0){  //元になる直線が右上がりの場合
         angle1=Math.atan(yy/xx)+Math.PI/6; 
         e.x=a.x+Math.floor((distance*Math.cos(angle1)));
         e.y=a.y-Math.floor((distance*Math.sin(angle1)));
      }
      else{       //元になる直線が右下がりの場合
         angle2=Math.atan(yy/xx)-Math.PI/6;
         e.x=b.x+Math.floor((distance*Math.cos(angle2)));
         e.y=b.y-Math.floor((distance*Math.sin(angle2)));
      };

      //最後なので、実際に線を引きます
      if(n<=0){
         svg.append("line")
            .attr("x1",a.x)
            .attr("y1",a.y)
            .attr("x2",c.x)
            .attr("y2",c.y)
            .style("stroke",lineColor); //点Aから点Cへ
         svg.append("line")
            .attr("x1",c.x)
            .attr("y1",c.y)
            .attr("x2",e.x)
            .attr("y2",e.y)
            .style("stroke",lineColor); //点Cから点Eへ
         svg.append("line")
            .attr("x1",e.x)
            .attr("y1",e.y)
            .attr("x2",d.x)
            .attr("y2",d.y)
            .style("stroke",lineColor); //点Eから点Dへ
         svg.append("line")
            .attr("x1",d.x)
            .attr("y1",d.y)
            .attr("x2",b.x)
            .attr("y2",b.y)
            .style("stroke",lineColor); //点Dから点Bへ
      }
      //最後ではないので、更にメソッドを呼び出します（再帰処理）
      else{
         drawKoch(a,c,n-1);    //点Aから点Cへ
         drawKoch(c,e,n-1);    //点Cから点Eへ
         drawKoch(e,d,n-1);    //点Eから点Dへ
         drawKoch(d,b,n-1);    //点Dから点Bへ
      };
   };     


  };

  // 樹木曲線
  self.tree = function() {
    //３対の点を指定します
    var P=new Point(250,400);
    var Q=new Point(250,100);

    //それぞれの対をなす２点間に樹木曲線を描きます
    drawTree(P,Q,selectedTreeLoops());

    //樹木曲線を描くメソッド
    function drawTree(a,b,n){

      var STEM_RATIO=0.25;
      var BRANCH_RATIO=selectedBranchRatio();
      
      var c=new Point(0,0);
      var d=new Point(0,0);
      var e=new Point(0,0);

      var sign;
      var xx,yy;
      var angle1,angle2,center_length,branch_length;
 
      xx=b.x-a.x;
      yy=-(b.y-a.y);

      angle1=Math.atan(yy/xx)+Math.PI/6;
      angle2=Math.atan(yy/xx)-Math.PI/6;

      center_length=Math.sqrt(xx*xx+yy*yy)*(1-STEM_RATIO);
      branch_length=BRANCH_RATIO*center_length;

      //元の直線が右下がりなら符号をマイナスにします
      sign=(xx>=0)? 1:-1;
      
      c.x=Math.floor((a.x+STEM_RATIO*xx));
      c.y=Math.floor((a.y-STEM_RATIO*yy));
      d.x=c.x+sign*Math.floor((branch_length*Math.cos(angle1)));
      d.y=c.y-sign*Math.floor((branch_length*Math.sin(angle1)));
      e.x=c.x+sign*Math.floor((branch_length*Math.cos(angle2)));
      e.y=c.y-sign*Math.floor((branch_length*Math.sin(angle2)));

     //幹の部分は再帰を行わないので、点Aから点Cへ実際に線を引きます
     svg.append("line")
        .attr("x1",a.x)
        .attr("y1",a.y)
        .attr("x2",c.x)
        .attr("y2",c.y)
        .style("stroke",lineColor);

     //最後なので、実際に線を引きます
     if(n<=0){
     svg.append("line")
        .attr("x1",c.x)
        .attr("y1",c.y)
        .attr("x2",b.x)
        .attr("y2",b.y)
        .style("stroke",lineColor); //中央部（点Cから点Bへ）

     svg.append("line")
        .attr("x1",c.x)
        .attr("y1",c.y)
        .attr("x2",d.x)
        .attr("y2",d.y)
        .style("stroke",lineColor); //中央部（点Cから点Dへ）

     svg.append("line")
        .attr("x1",c.x)
        .attr("y1",c.y)
        .attr("x2",e.x)
        .attr("y2",e.y)
        .style("stroke",lineColor); //中央部（点Cから点Eへ）
      }
      //最後ではないので、更にメソッドを呼び出します（再帰処理）
      else{
         drawTree(c,b,n-1);   //中央部（点Cから点Bへ）
         drawTree(c,d,n-1);   //左の枝（点Cから点Dへ）
         drawTree(c,e,n-1);   //右の枝（点Cから点Eへ）        
      }
   };

  };

  // ドラゴン曲線
  self.dragon = function() {
    //出発点となる一対の点を指定します
    var P=new Point(170,140);
    var Q=new Point(400,350);

    //対となる二点の間にドラゴン曲線を描きます
    drawDragon(P,Q,selectedDragonLoops());
 
    //ドラゴン曲線を描くメソッド
    function drawDragon(a,b,n){

      var c=new Point(0,0);

      var xx,yy;
      xx=b.x-a.x;
      yy=-(b.y-a.y);

      c.x=a.x+(xx+yy)/2;
      c.y=b.y+(xx+yy)/2;

      //最後なので、実際に線を引きます
      if(n<=0){
       svg.append("line")
        .attr("x1",a.x)
        .attr("y1",a.y)
        .attr("x2",c.x)
        .attr("y2",c.y)
        .style("stroke",lineColor); //点Aから点Cへ

       svg.append("line")
        .attr("x1",b.x)
        .attr("y1",b.y)
        .attr("x2",c.x)
        .attr("y2",c.y)
        .style("stroke",lineColor); //点Bから点Cへ

      }
      //最後ではないので、さらにメソッドを呼び出します（再帰処理）
      else{
         drawDragon(a,c,n-1);    //点Aから点Cへ
         drawDragon(b,c,n-1);    //点Bから点Cへ
      }
   }   

  };

};

// Activates knockout.js
ko.applyBindings(new AppViewModel());

</script>