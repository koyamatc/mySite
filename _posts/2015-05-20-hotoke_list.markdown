---
title: 投稿記事
layout: post
postTitle: 代表的な仏さま
categories: post art
---

<div class="row">
  <div class="col-sm-5">
    <h2 class="text-gold text-right">如来(仏陀)</h2>
    <h4  class="text-right">
      仏教の最高位の存在、悟りを開いた者
    </h4>
  </div>
  <div class="col-sm-3">
    <div id="nyorai" class="hotoke">
      <ul>
        <li>釈迦如来</li>
        <br>
        <li>阿弥陀如来</li>
        <br>
        <li>薬師如来</li>
        <br>
        <li>大日如来</li>
      </ul>
    </div>
  </div>
  <div class="col-sm-4">
  </div>
</div>

<div class="row">
  <div class="col-sm-3">
    <h2 class="text-gold text-right">菩薩</h2>
    <h4 class="text-right">
      悟りを開こうと修行している者
    </h4>
  </div>
  <div class="col-sm-5">
    <div id="bosatu" class="hotoke">
      <ul>
         <li>観音菩薩
             <br>　聖観音
             <br>　千手観音
             <br>　十一面観音
             <br>　如意輪観音
             <br>　馬頭観音
             <br>　准胝観音
        </li>
        <br>
        <li>薬王菩薩</li>
        <li>薬上菩薩</li>
        <br>　
        <li>月光菩薩</li>
        <li>日光菩薩</li>
        <br>
        <li>弥勒菩薩</li>
        <br>
        <li>地蔵菩薩</li>
        <br><br><br><br>
      </ul>
    </div>
  </div>
  <div class="col-sm-3">
  </div>
</div>

<div class="row">
  <div class="col-sm-2">
    <h2 class="text-gold text-right">明王</h2>
    <h4 >
      如来の変化身
    </h4>
  </div>
  <div class="col-sm-10">
    <div class="hotoke">
      <ul>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <li>不動明王</li>
        <br><br><br><br><br><br><br><br><br><br><br><br>
      </ul>
    </div>
  </div>
  <div class="col-sm-1">
  </div>
</div>

<div class="row">
  <div class="col-sm-1">
    <h2 class="text-gold text-right">天部</h2>
    <h4>
      天界に住む者。守護神、福徳神
    </h4>
  </div>
  <div class="col-sm-6">
    <div id="tenbu" class="hotoke">
      <ul>
        <br><br><br>
        <li>四天王
          <br>　持国天
          <br>　増長天
          <br>　広目天
          <br>　多聞天 - 毘沙門天
        </li>
        <br>
        <li>梵天</li>
        <br>
        <li>帝釈天</li>
        <br>
        <li>大黒天</li>
        <br>
        <li>弁才天</li>
        <br>
        <li>韋駄天</li>
        <br>
        <li>金剛力士</li>
        <br>
        <li>鬼子母神</li>
        <br>
        <li>閻魔天</li>
        <br>
        <li>寿老人</li>
        <br>
        <li>福禄寿</li>
        <br>
        <li>恵比寿</li>
        <br>
        <li>布袋</li>
        <br><br><br><br><br><br>
      </ul>
    </div>
  </div>
  <div class="col-sm-3">
  </div>
</div>
<br><br>
<hr>
<h3>
{% highlight css %}
  /* 縦書きの指定
  writing-mode:tb-lr
  -webkit-writing-mode:vertical-lr
  -moz-writing-mode:vertical-lr
{% endhighlight %}
</h3>

<script src="{{site.url}}/js/jquery.js" charset="utf-8"></script>

<script type="text/javascript">
  $(".hotoke").css("-webkit-writing-mode","vertical-lr");
  $(".hotoke").css("-moz-writing-mode","vertical-lr");
  $(".hotoke").css("writing-mode","tb-lr");
  $(".hotoke").css("background-color","#111");
  $(".hotoke").css("font-family","#@メイリオ,sans-serif");
  $(".hotoke").css("height","20%");

  $(".hotoke").css("-webkit-box-shadow","0.5em -0.5em 0.4em gold,-0.5em 0.5em 0.4em gold");
  $(".hotoke").css("box-shadow","0.5em -0.5em 0.4em gold,-0.5em 0.5em 0.4em gold");

  $("#bosatu").css("height","210px");
  $("#tenbu").css("height","210px");
</script>