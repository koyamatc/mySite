---
title: 投稿記事
layout: post
postTitle: transform rotate
categories: post jquery
---

-----
<section class="box-container">
<div id="card">
	<figure id="card1" class="front">FRONT</figure>
	<figure id="card2" class="back">BACK</figure>
</div>
</section>

<div>
	<div>ボックスをクリックしてください</div>
</div>

<em>-- HTML --</em>
<pre>
&lt;section class="box-container">
&lt;div id="card">
	&lt;figure id="card1" class="front">FRONT&lt;/figure>
	&lt;figure id="card2" class="back">BACK&lt;/figure>
&lt;/div>
&lt;/section>
</pre>
<em>-- Javascript --</em>
<pre>
$(".box-container").css({
                         "height": "200px",
                         "width": "400px",
                         "postion":"relative",
                         "perspective":"800px"
                       });
$('#card').css({
                "height":"100%",
                "width":"100%",
                "position":"absolute",
                "transform-style": "preserve-3d",
              });
$("figure").css({
                 "display": "block",
                 "position": "absolute",
                 "width": "100%",
                 "height": "100%",
                 "backface-visibility": "hidden",
                });
$('.front').css({
                 "background":"gold",
               });
$('.back').css({
                "background":"lime",
                "transform":"rotateY(180deg)",
               });
$("#card1").on("click",function(){
		$("figure").css({
                     "transition": "transform 1s"
                   });
		$("#card1").css({
                     "transform":"rotateY(-180deg)",
                   });
		$("#card2").css({
                     "transform":"rotateY(0deg)",
                    });
});
$("#card2").on("click",function(){
		$("#card1").css({
                     "transform":"rotateY(0deg)",
                   });
		$("#card2").css({
                     "transform":"rotateY(180deg)",
                   });
	});
</pre>

<script src="{{site.url}}/js/jquery.js"></script>
<script src="{{site.url}}/assets/googlecodeprettify/prettify.js"></script>

<script type="text/javascript">
var $window = $(window)
// make code pretty
window.prettyPrint && prettyPrint()
$('pre').addClass('prettyprint');
  prettyPrint();
	$('pre').css({"background":"#000",
		             "font-size":"1.1em",
		                "border":"0px"}
		          );

$(".box-container").css({
	  "height": "200px",
	  "width": "400px",
	  "postion":"relative",
	  "perspective":"800px"
})	

$('#card').css({
								"height":"100%",
								"width":"100%",
								"position":"absolute",
								"transform-style": "preserve-3d",
							});

$("figure").css({
	               "display": "block",
                 "position": "absolute",
                 "width": "100%",
                 "height": "100%",
                 "backface-visibility": "hidden",
});

$('.front').css({
								"background":"gold",
							});
$('.back').css({
								"background":"lime",
								"transform":"rotateY(180deg)",
							});

$("#card1").on("click",function(){
		$("figure").css({
  									 "transition": "transform 1s"
							     })

		$("#card1").css({
										"transform":"rotateY(-180deg)",
										});
		$("#card2").css({
										"transform":"rotateY(0deg)",
									});
	});
$("#card2").on("click",function(){
		$("#card1").css({
										"transform":"rotateY(0deg)",
									});
		$("#card2").css({
										"transform":"rotateY(180deg)",
									});
	});

</script>