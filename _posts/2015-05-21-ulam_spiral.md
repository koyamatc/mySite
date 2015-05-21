---
title: 投稿記事
layout: post
postTitle: ウラムの螺旋
categories: post math
---

-----
<div class="row">
  <div class="col-sm-6 col-xs-6">
    <div id="svg01"></div>
    <button id="run01" class="btn btn-info">Run</button>
    <button id="reset01" class="btn btn-info">Reset</button>
  </div>
  <div class="col-sm-6 col-xs-6">
        <table class="text-gold">
          <tr>
            <td class="text-red"  >37</td><td>←</td><td>36</td><td>←</td>
            <td>35</td><td>←</td><td>34</td><td>←</td>
            <td>33</td><td>←</td><td>32</td><td>←</td><td class="text-red">31</td>
          </tr>
          <tr>
            <td>↓</td><td></td><td></td><td></td><td></td><td></td>
            <td></td><td></td><td></td><td></td><td></td><td></td>
            <td>↑</td>
          </tr>
          <tr>
            <td>38</td><td></td><td class="text-red">17</td><td>←</td>
            <td>16</td><td>←</td><td>15</td><td>←</td>
            <td>14</td><td>←</td><td class="text-red">13</td><td></td><td>30</td>
          </tr>
          <tr>
            <td>↓</td><td></td><td>↓</td><td></td>
            <td></td><td></td><td></td><td></td>
            <td></td><td></td><td>↑</td><td></td>
            <td>↑</td>
          </tr>
          <tr>
            <td>39</td><td></td><td>18</td><td></td>
            <td class="text-red">5</td><td>←</td><td>4</td><td>←</td>
            <td class="text-red">3</td><td></td><td>12</td><td></td>
            <td class="text-red">29</td>
          </tr>
          <tr>
            <td>↓</td><td></td><td>↓</td><td></td>
            <td>↓</td><td></td><td></td><td></td>
            <td>↑</td><td></td><td>↑</td><td></td>
            <td>↑</td>
          </tr>
          <tr>
            <td>40</td><td></td><td class="text-red">19</td><td></td>
            <td>6</td><td></td><td>1</td><td>→</td>
            <td class="text-red">2</td><td></td><td class="text-red">11</td><td></td><td>28</td>
          </tr>
          <tr>
            <td>↓</td><td></td><td>↓</td><td></td>
            <td>↓</td><td></td><td></td><td></td>
            <td></td><td></td><td>↑</td><td></td>
            <td>↑</td>
          </tr>
          <tr>
            <td class="text-red">41</td><td></td><td>20</td><td></td>
            <td class="text-red">7</td><td>→</td><td>8</td><td>→</td>
            <td>9</td><td>→</td><td>10</td><td></td>
            <td>27</td>
          </tr>
          <tr>
            <td>↓</td><td></td><td>↓</td><td></td>
            <td></td><td></td><td></td><td></td>
            <td></td><td></td><td></td><td></td>
            <td>↑</td>
          </tr>
          <tr>
            <td>42</td><td></td><td>21</td><td>→</td>
            <td>22</td><td>→</td><td class="text-red">23</td><td>→</td>
            <td>24</td><td>→</td><td>25</td><td>→</td>
            <td>26</td>
          </tr>
          <tr>
            <td>↓</td><td></td><td></td><td></td><td></td><td></td>
            <td></td><td></td><td></td><td></td><td></td><td></td>
            <td></td>
          </tr>
          <tr>
            <td class="text-red">43</td><td>→</td><td>44</td><td>→</td>
            <td>45</td><td>→</td><td>46</td><td>→</td>
            <td class="text-red">47</td><td>→</td><td></td><td></td>
            <td></td>
          </tr>
        </table>
        <p class="text-white">
          中央の１から反時計回りに数字を置いてゆき、素数が現れたところに印をつけていくという作業をして、描いたのが「ウラムの螺旋」です。1963年、数学者のスタニスワフ・ウラムによって発見され、彼によれば学会の「長くて非常に退屈な論文」の発表の際に落書きをしていてこれを発見した。
        </p>
        <p class="text-white">
          run ボタンをクリックしてください。　自然数50,000以下で出現する素数を表示しています。

        </p>

  </div>
</div>

------

<pre>
var startNumber = 1;
var maxNumber   = 50000;
var m = 0; // move のカウンター
var step = 1;
var p = 1;

// 移動方向の定義
var move = [
  {"x":2,"y":0},{"x":0,"y":2},{"x":-2,"y":0},{"x":0,"y":-2}
];

var x0,y0;　//初期座標x,y

/** 
    エラストテネスの篩    */

// 配列作成
var searchList = [];　//探索リスト
var workList = [];　　　//作業用リスト
var primeList = [];　//素数リスト
//最初の探索リストを作成（２から）
for (var i = 2; i &lt;= maxNumber;i++){
  searchList.push(i);
};


// 篩にかけます
while(searchList[0]&lt;= Math.sqrt(maxNumber)){
  for (var i = 0; i &lt; searchList.length; i++) {
    if (i==0) {primeList.push(searchList[i])};
    if ((searchList[i] % searchList[0]) != 0) {
      workList.push(searchList[i])
    };
  };

  searchList = workList;
  workList = [];

};

//探索リストに残った数を、素数リストに追加する。
for (var i = 0; i &lt; searchList.length; i++) {
  primeList.push(searchList[i]);
};

searchList = [];

var svg01 = d3.select("#svg01")
              .append("svg")
              .attr("height",500)
              .attr("width",500)
              .style("background","#222");
var xScale01 = d3.scale.linear()
                     .domain([-250,250])
                     .range([0,500]);
var yScale01 = d3.scale.linear()
                     .domain([250,-250])
                     .range([0,500]); 


$("#run01").on("click", function(){

  svg01.selectAll("circle").remove();
  x0 = 0;　//初期座標x
  y0 = 0; //初期座標y
  m = 0; // move のカウンター
  step = 1;
  p = 1;

  var i = 0;
  for (var n=startNumber+1;n&lt;= maxNumber; n++) {

    x0 = x0 + move[m].x;
    y0 = y0 + move[m].y;

    if ((n==primeList[i]) && (n &lt;= primeList[primeList.length-1])) {
      svg01.append("circle")
       .attr("cx",　function(){ return xScale01(x0);})
       .attr("cy",　function(){ return yScale01(y0);})
       .attr("r",1)
       .style("fill", function(){
        return "lime";
       });
 
       i++;
    };
   
    //移動する方向の変更     
    if (n==(p + step)) { //次の曲がり角に来たら
      m++;
      if (m>3) {
         m = 0;
      };
    };
    if (n==(p + 2*step)) { //２つ先の曲がり角に来たら
      m++;
      if (m>3) {
         m = 0;
      };
      p = p + 2*step; //新しい曲がり角を保持
      step++;         //繰り返し数を増やす
    }
  };

});
</pre>

<script src="{{site.url}}/js/jquery.js"></script>
<script src="{{site.url}}/assets/googlecodeprettify/prettify.js"></script>
<script src="{{site.url}}/js/bootstrap.js"></script>
<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>

<script type="text/javascript">
var $window = $(window)
// make code pretty
window.prettyPrint && prettyPrint()
$('pre').addClass('prettyprint');
  prettyPrint();
$('pre').css("background","#000");
$('pre').css("font-size","1.2em");


var startNumber = 1;
var maxNumber   = 50000;
var m = 0; // move のカウンター
var step = 1;
var p = 1;

var move = [
  {"x":2,"y":0},{"x":0,"y":2},{"x":-2,"y":0},{"x":0,"y":-2}
];

var x0,y0;　//初期座標x,y

/** 
    エラストテネスの篩    */

// 配列作成
var searchList = [];　//探索リスト
var workList = [];　　　//作業用リスト
var primeList = [];　//素数リスト
//最初の探索リストを作成（２から）
for (var i = 2; i <= maxNumber;i++){
  searchList.push(i);
};


// 篩にかけます
while(searchList[0]<= Math.sqrt(maxNumber)){
  for (var i = 0; i < searchList.length; i++) {
    if (i==0) {primeList.push(searchList[i])};
    if ((searchList[i] % searchList[0]) != 0) {
      workList.push(searchList[i])
    };
  };

  searchList = workList;
  workList = [];

};

//探索リストに残った数を、素数リストに追加する。
for (var i = 0; i < searchList.length; i++) {
  primeList.push(searchList[i]);
};

searchList = [];

var svg01 = d3.select("#svg01")
              .append("svg")
              .attr("height",500)
              .attr("width",500)
              .style("background","#222");
var xScale01 = d3.scale.linear()
                     .domain([-250,250])
                     .range([0,500]);
var yScale01 = d3.scale.linear()
                     .domain([250,-250])
                     .range([0,500]); 


$("#run01").on("click", function(){

  svg01.selectAll("circle").remove();
  x0 = 0;　//初期座標x
  y0 = 0; //初期座標y
  m = 0; // move のカウンター
  step = 1;
  p = 1;

  var i = 0;
  for (var n=startNumber+1;n<= maxNumber; n++) {

    x0 = x0 + move[m].x;
    y0 = y0 + move[m].y;

    if ((n==primeList[i]) && (n <= primeList[primeList.length-1])) {
      svg01.append("circle")
       .attr("cx",　function(){ return xScale01(x0);})
       .attr("cy",　function(){ return yScale01(y0);})
       .attr("r",1)
       .style("fill", function(){
        return "lime";
       });
 
       i++;
    };
   
    //移動する方向の変更     
    if (n==(p + step)) { //次の曲がり角に来たら
      m++;
      if (m>3) {
         m = 0;
      };
    };
    if (n==(p + 2*step)) { //２つ先の曲がり角に来たら
      m++;
      if (m>3) {
         m = 0;
      };
      p = p + 2*step; //新しい曲がり角を保持
      step++;         //繰り返し数を増やす
    }
  };

});

$("#reset01").on("click", function(){
  svg01.selectAll("circle").remove();
  m = 0; // move のカウンター
  step = 1;
  p = 1;
});

</script>
