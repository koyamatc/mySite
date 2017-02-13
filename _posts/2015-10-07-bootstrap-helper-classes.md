---
title: 投稿記事
layout: post
postTitle: Bootstrap helper classes
categories: post bootstrap
---

-----

<h3>Contextual colors</h3>

<p class="text-muted">text-muted</p>
<p class="text-primary">text primary</p>
<p class="text-success">text-success</p>
<p class="text-info">text-info</p>
<p class="text-warning">text-warning</p>
<p class="text-danger">text-danger</p>

<pre>
&lt;p class="text-muted"&gt;...&lt;/p&gt;
&lt;p class="text-primary"&gt;...&lt;/p&gt;
&lt;p class="text-success"&gt;...&lt;/p&gt;
&lt;p class="text-info"&gt;...&lt;/p&gt;
&lt;p class="text-warning"&gt;...&lt;/p&gt;
&lt;p class="text-danger"&gt;...&lt;/p&gt;
</pre>

<h3>Quick floats</h3>
<div class="pull-left">左側に表示</div>
<div class="pull-right">右側に表示</div>
<br>

<pre>
&lt;div class="pull-left">左側に表示&lt;/div>
&lt;div class="pull-right">右側に表示&lt;/div>
</pre>

<h3>Showing and hiding content</h3>
<div class="show">見える</div>
<div class="hidden">見えない</div>

<pre>
&lt;div class="show">見える&lt;/div>
&lt;div class="hidden">見えない&lt;/div>
</pre>

<h3>Image replacement</h3>
<p>要素のテキスト・コンテントをバックグラウンド・イメージで置き換える</p>
<h1 class="text-hide">Custom heading</h1>
<pre>
&lt;h1 class="text-hide">Custom heading&lt;/h1>
</pre>

<script src="{{site.url}}/js/jquery.js"></script>
<script src="{{site.url}}/assets/googlecodeprettify/prettify.js"></script>

<script type="text/javascript">
var $window = $(window)
// make code pretty
window.prettyPrint && prettyPrint()
$('pre').addClass('prettyprint');
  prettyPrint();
$('pre').css("background","#000");
$('pre').css("font-size","1.1em");
$('pre').css("border","0px");

$('kbd').css("background","#000");
$('code').css("background","#333");

</script>