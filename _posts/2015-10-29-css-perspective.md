---
title: 投稿記事
layout: post
postTitle: perspective
categories: post css
---

-----
<div id="box-container">
	<div id="boxes">
	  <figure id="box1" class="box">1</figure>
	  <figure id="box2" class="box">2</figure>
	</div>
</div>

<div class="tz-container">
	<em>translateZ  </em>
	<div id="tz" class="sl"></div>
	<div id="tz-value" class="sl"></div>
</div>	
<div class="tz-container">
	<em>perspective  </em>
	<div id="ps" class="sl"></div>
	<div id="ps-value" class="sl"></div>
</div>	
<br><br><br><br><br><br><br><br>
<div>
	
</div>


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

$("#box-container").css({
	  "height": "200px",
	  "width": "400px",
	  "postion":"relative",
	  "perspective":"1000px",
})	

$('#boxes').css({
								"height":"100%",
								"width":"100%",
								"position":"absolute",
								"transform-style": "preserve-3d",
	               "transform-origin":"50% 50%"
							});

$("figure").css({
	               "display": "block",
                 "position": "absolute",
                 "width": "396px",
                 "height": "196px",
                 "border": "4px solid #000",
                 "transition":"transform 2s" ,
});
  $("#box1").css({
	     "background": "lime",
	     "top": "0px",
  });	
  $("#box2").css({
	     "background": "gold",
       "opacity": "0.6",
	     "top": "0px",
  });	

  $(".sl").css({"display":"inline-block"});

  $("#tz").slider({min:-1000, max: 1000, value: 0, step: 50, animate: "fast"})
          .css({"width":"200px"});
  $("#ps").slider({min:0, max: 8000, value: 1000, step: 100, animate: "fast"})
          .css({"width":"200px"});

  $( "#tz-value" ).html( $( "#tz" ).slider("option", "value") );
  $( "#ps-value" ).html( $( "#ps" ).slider("option", "value") );
  // sliderのchangeイベントの処理
  $( "#tz" ).on( "slidechange", function( event, ui ) {
    $( "#tz-value" ).html(ui.value);
    $( "#box1" ).css({"transform": "translateZ("+ ui.value +"px)"});
  } );
  $( "#ps" ).on( "slidechange", function( event, ui ) {
    $( "#ps-value" ).html(ui.value);
    $( "#box-container" ).css({"perspective": ui.value +"px"});
  } );
</script>