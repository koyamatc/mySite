---
title: 投稿記事
layout: post
postTitle: jquery serialize Object　
categories: post utility
---

-----

フォームの入力要素を　json オブジェクトへ変換してくれる　javascript ライブラリです。

firebaseの　authenticationの例で使用されていたので、調べてみました。

[jQuery serialize Object](https://github.com/hongymagic/jQuery.serializeObject)

<form id="info">
  <div>
    <label for="inputFirstName">First Name</label>
    <input type="text" class="form-control" id="inputFirstName" name="firstname" placeholder="First Name">
  </div>
  <div>
    <label for="inputLastName">Last Name</label>
    <input type="text" class="form-control" id="inputLastName" name="lastname" placeholder="Last Name">
  </div>
  <div>
    <label for="inputEmail">Email address</label>
    <input type="email" class="form-control" id="inputEmail" placeholder="Email" name="email">
  </div>
  <label>Gender</label>
  <div class="radio">
    <label>
      <input type="radio" name="gender" value="Male" checked>
      Male
    </label>
  </div>    
  <div>
    <label>
      <input type="radio" name="gender" value="Female">  
      Female
    </label>
  </div>
  <p><input type="submit" /></p>
</form>
</div>

<h2>JSON</h2>
<pre id="result">
</pre>

##はまった

Uncaught TypeError: $(...).serializeObject is not a function

-----

<script src="//code.jquery.com/jquery-1.11.3.js"></script>
<script src="{{site.url}}/js/jquery.serializeObject.js"></script>
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sons-of-obsidian"></script>

<script type="text/javascript">
//  var $window = $(window)
  // make code pretty
  $('pre').addClass('prettyprint');
  $('pre').css({"background":"#111",
	  	           "font-size":"1.05em",
		                "border":"0px"}
		            );
  $('code').css({"font-size":"1.05em","color":"#f00"});

//  $("#logo").lettering();

   $('form').submit(function() {

        $('#result').text(JSON.stringify($('form').serializeObject()));
        return false;
    });

</script>