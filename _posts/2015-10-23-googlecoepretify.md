---
title: 投稿記事
layout: post
postTitle: google code prettify
categories: post utility
---

-----

久しぶりに　google code prettify のページを見てみた

指定方法が変わっていた

今まで、ローカルに　js と css を置いていたが

cdnから呼び出せるようになっていた

<pre>
&lt;script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sons-of-obsidian"&gt;&lt;/script&gt;
</pre>

<code class="prettyprint">&lt;pre&gt;</code>要素に class属性 <code>prettyprint</code>を与えます。

<h3>例</h3>
<em>-- CSS --</em>
<pre>
.face {
	height: 150px;
	width: 150px;
	background: "white";
	border:2px solid blue;
	border-radius:20px 20px 20px 20px/20px 20px 20px 20px;
	position: absolute;
	opacity:0.7;
	/*
	backface-visibility:hidden;
	*/
}
</pre>
<em>-- HTML --</em>
<pre>
&lt;div class="boxes"&gt;
	&lt;div id="box1" class="box"&gt;FRONT&lt;/div&gt;
	&lt;div id="box2" class="box"&gt;BACK&lt;/div&gt;
&lt;/div&gt;
</pre>
<em>-- Javascript --</em>
<pre>
  // 多角形の頂点取得関数
  function makePolygon(sides){
    var pi = Math.PI;
    var radius = 90;
    var sides = sides;
    var start = 0;
    var step = 2*pi / sides;
    var x,y;
    pointsData = [];
    for (var i = 0; i &lt; sides; i++) {
      x = radius * Math.cos(step*i + start)+100;
      y = radius * Math.sin(step*i + start)+100;
      pointsData.push(new Point(x,y));
    };
    pointsData.push(new Point(pointsData[0].x,pointsData[0].y));
  };
</pre>

<script src="//code.jquery.com/jquery-1.11.3.js"></script>
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sons-of-obsidian"></script>

<script type="text/javascript">
var $window = $(window)
// make code pretty
$('pre').addClass('prettyprint');
$('pre').css({"background":"#111",
		           "font-size":"1.05em",
		              "border":"0px"}
		          );
$('code').css({"background":"#333","border":"0px"});

</script>