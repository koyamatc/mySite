---
title: 投稿記事
layout: post
postTitle: Bootstrap Grid System Test
categories: post bootstrap
---

-----

ブラウザの横幅を変更してください 

ブレイクポイントに達すると　１行ごとになります

<h4>col-lg-*  (&ge; 1200px)</h4>
<div class="row">
	<div class="col col-lg-1">col-lg-1</div>
	<div class="col col-lg-2">col-lg-2</div>
	<div class="col col-lg-3">col-lg-3</div>
	<div class="col col-lg-6">col-lg-6</div>
</div>

<pre>
	&lt;div class="col col-lg-1">col-lg-1&lt;/div>
	&lt;div class="col col-lg-2">col-lg-2&lt;/div>
	&lt;div class="col col-lg-3">col-lg-3&lt;/div>
	&lt;div class="col col-lg-6">col-lg-6&lt;/div>
</pre>

<br>
<h4>col-md-*  (&ge; 992px)</h4>
<div class="row">
	<div class="col col-md-1">col-md-1</div>
	<div class="col col-md-2">col-md-2</div>
	<div class="col col-md-3">col-md-3</div>
	<div class="col col-md-6">col-md-6</div>
</div>

<pre>
	&lt;div class="col col-md-1">col-md-1&lt;/div>
	&lt;div class="col col-md-2">col-md-2&lt;/div>
	&lt;div class="col col-md-3">col-md-3&lt;/div>
	&lt;div class="col col-md-6">col-md-6&lt;/div>
</pre>

<br>
<h4>col-sm-*  (&ge; 768px)</h4>
<div class="row">
	<div class="col col-sm-1">col-sm-1</div>
	<div class="col col-sm-2">col-sm-2</div>
	<div class="col col-sm-3">col-sm-3</div>
	<div class="col col-sm-6">col-sm-6</div>
</div>
<pre>
	&lt;div class="col col-sm-1">col-sm-1&lt;/div>
	&lt;div class="col col-sm-2">col-sm-2&lt;/div>
	&lt;div class="col col-sm-3">col-sm-3&lt;/div>
	&lt;div class="col col-sm-6">col-sm-6&lt;/div>
</pre>

<br>
<h4>col-xs-*  (&lt; 768px)</h4>
<div class="row">
	<div class="col col-xs-1">col-xs-1</div>
	<div class="col col-xs-2">col-xs-2</div>
	<div class="col col-xs-3">col-xs-3</div>
	<div class="col col-xs-6">col-xs-6</div>
</div>
<pre>
	&lt;div class="col col-xs-1">col-xs-1&lt;/div>
	&lt;div class="col col-xs-2">col-xs-2&lt;/div>
	&lt;div class="col col-xs-3">col-xs-3&lt;/div>
	&lt;div class="col col-xs-6">col-xs-6&lt;/div>
</pre>

<br>
<h4>col-xs-1 col-sm-1　幅が768pxより小さくなると xsの指定が有効になる</h4>
<div class="row">
	<div class="col col-xs-1 col-sm-1">1</div>
	<div class="col col-xs-2 col-sm-2">2</div>
	<div class="col col-xs-3 col-sm-3">3</div>
	<div class="col col-xs-6 col-sm-6">6</div>
</div>
<pre>
	&lt;div class="col col-xs-1 col-sm-1">1&lt;/div>
	&lt;div class="col col-xs-2 col-sm-2">2&lt;/div>
	&lt;div class="col col-xs-3 col-sm-3">3&lt;/div>
	&lt;div class="col col-xs-6 col-sm-6">6&lt;/div>
</pre>

<br>
<h4>col-sm-3 col-sm-offset-3　</h4>
<div class="row">
	<div class="col col-sm-3 col-sm-offset-3">col-sm-3 col-sm-offset-3</div>
	<div class="col col-sm-3 col-sm-offset-6">col-sm-3 col-sm-offset-6</div>
	<div class="col col-sm-3 col-sm-offset-9">col-sm-3 col-sm-offset-9</div>
</div>
<pre>
	&lt;div class="col col-sm-3 col-sm-offset-3">col-sm-3 col-sm-offset-3&lt;/div>
	&lt;div class="col col-sm-3 col-sm-offset-6">col-sm-3 col-sm-offset-6&lt;/div>
	&lt;div class="col col-sm-3 col-sm-offset-9">col-sm-3 col-sm-offset-9&lt;/div>
</pre>

<br>
<h4>push & pull　</h4>
<div class="row">
 	<div class="col col-md-9 col-md-push-3">.col-md-9 .col-md-push-3</div>
  <div class="col col-md-3 col-md-pull-9">.col-md-3 .col-md-pull-9</div>
</div>
<pre>
	<em>md-3分右へ押しやる</em>
	&lt;div class="col col-md-9 col-md-push-3">.col-md-9 .col-md-push-3&lt;/div>
	<em>md-9分左へ引き寄せる</em>
	&lt;div class="col col-md-3 col-md-pull-9">.col-md-3 .col-md-pull-9&lt;/div>
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

$(".col").css({"border":"1px solid #ff0"})
					.addClass("text-center");

</script>