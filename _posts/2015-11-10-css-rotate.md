---
title: 投稿記事
layout: post
postTitle: Carousel of cards
categories: post css
---

-----

<iframe width="560" height="315" src="https://www.youtube.com/embed/elw_T9x1E44" frameborder="0" allowfullscreen></iframe>

[<h3>Demo</h3>]({{site.url}}/component_test/es6/carousel/)

React, CSS3 transform、　perspective-origin を使い作成してみました　

カードの裏面は作っていませんので、見栄えがちょっと悪いかな


回転を継続させるのに　<code>setInterval</code>、

回転を止めるのに<code>clearInterval</code>

を使用。


<script src="//code.jquery.com/jquery-1.11.3.js"></script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
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

</script>