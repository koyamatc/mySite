---
title: 投稿記事
layout: post
postTitle: 周期表　-- React Redux
categories: post react
---

-----

![周期表]({{domain}}/img/periodicTable.png)

<div class="container">
  <h3><a href="http://koyamatch.com/Redux/periodicTable/">DEMO</a></h3>
</div>

React, Redux, jQuery を使って周期表を作成してみた。

最初は、React と jQuery だけで作っていたが、

この際 Redux も勉強してみようと思い立った。

Redux の特徴である

  + component

  + action

  + container

  + reducer

を理解（まだまだ不十分）していくのに時間がかかった。

元素カード部分は、トランプ（[deck_of_card]({{domain}}/component_test/es6/deck_of_card/)）で学んだことを応用した。

見られたものではないが、ソースは　
[gitHub](https://github.com/koyamatc/periodicTable)
に載せてあります。

## はまった!!

単純なことではまった！

１つのボタンだけが反応しなくなる現象が発生。

PCでは動作するが、モバイルだと反応しない。

分かってみれば、くだらないミス。

非表示にしていた得点ボードが、ボタンに被っていただけ。

半日、悩んでしまった。

<script src="//code.jquery.com/jquery-1.11.3.js"></script>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="http://koyamatch.com/js/d3draws.js"></script>
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sons-of-obsidian"></script>

<script type="text/javascript">
  var $window = $(window)
  // make code pretty
  $('pre').addClass('prettyprint');
  $('pre').css({"background":"#111",
	  	           "font-size":"1.05em",
		                "border":"0px"}
		            );
  $('code').css({"font-size":"1.05em","color":"#f00"});
  $('#svg01').css({"text-decoration":"none"});


  drawText(svg01,texts);
  drawLine(svg01,lines);
 

</script>