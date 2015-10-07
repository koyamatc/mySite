---
title: 投稿記事
layout: post
postTitle: transform rotate
categories: post jquery
---

-----
<div class="boxes">
	<div id="box1" class="box">FRONT</div>
	<div id="box2" class="box clearfix">BACK</div>
</div>
<br><br><br><br><br><br><br><br>
<div>
	<div>ボックスをクリックしてください</div>
</div>

<em>-- HTML --</em>
<pre>
&lt;div class="boxes"&gt;
	&lt;div id="box1" class="box"&gt;FRONT&lt;/div&gt;
	&lt;div id="box2" class="box"&gt;BACK&lt;/div&gt;
&lt;/div&gt;
</pre>
<em>-- Javascript --</em>
<pre>
$('.boxes').css({
                 "postion":"relative",
               });
$('.box').css({
               "height":"200px",
               "width":"400px",
               "display":"inline-block",
               "position":"absolute"
              });
$('#box1').css({
                "background":"gold",
                "z-Index":"2"
              });
$('#box2').css({
                "background":"lime",
                "transform":"rotateY(180deg)",
                "z-Index":"1",
                "clear":"none"
               });

$("#box1").on("click",function(){
		$("#box1").css({
                    "transform":"rotateY(180deg)",
                    "z-Index":"1"	,
                    "transition-duration":"1s"
                   });
		$("#box2").css({
                    "transform":"rotateY(0deg)",
                    "z-Index":"2"	,
                    "transition-duration":"1s"
                    });
	});
$("#box2").on("click",function(){
		$("#box1").css({
                    "transform":"rotateY(0deg)",
                    "z-Index":"2",
                    "transition-duration":"1s"
                   });
		$("#box2").css({
                    "transform":"rotateY(180deg)",
                    "z-Index":"1"	,
                    "transition-duration":"1s"
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
$('.boxes').css({
								"postion":"relative",
							});

$('.box').css({
								"height":"200px",
								"width":"400px",
								"display":"inline-block",
								"position":"absolute"
							});
$('#box1').css({
								"background":"gold",
								"z-Index":"2"
							});
$('#box2').css({
								"background":"lime",
								"transform":"rotateY(180deg)",
								"z-Index":"1",
								"clear":"none"
							});

$("#box1").on("click",function(){
		$("#box1").css({
										"transform":"rotateY(180deg)",
										"z-Index":"1"	,
										"transition-duration":"1s"	
									});
		$("#box2").css({
										"transform":"rotateY(0deg)",
										"z-Index":"2"	,
										"transition-duration":"1s"	
									});
	});
$("#box2").on("click",function(){
		$("#box1").css({
										"transform":"rotateY(0deg)",
										"z-Index":"2",
										"transition-duration":"1s"	
									});
		$("#box2").css({
										"transform":"rotateY(180deg)",
										"z-Index":"1"	,
										"transition-duration":"1s"	
									});
	});

</script>