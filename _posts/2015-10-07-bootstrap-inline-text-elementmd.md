---
title: 投稿記事
layout: post
postTitle: Bootstrap Inline text element
categories: post bootstrap
---

-----

<h3>Marked text</h3>
テキストを<mark>ハイライト</mark>するために&lt;mark> タグを使えます。
<pre>
テキストを&lt;mark>ハイライト&lt;/mark>するために&lt;mark> タグを使えます。
</pre>

<h3>Deleted text</h3>
<del>この行のテクストは削除されたことを意味します。</del>
<pre>
&lt;del>この行のテクストは削除されたことを意味します。&lt;/del>
</pre>

<h3>Strikethrough text</h3>
テキストブロックの妥当性がすでに無い場合に&lt;s>タグを使います
<br>
<s>この行はもう正しくありません。</s>
<pre>
&lt;s>この行はもう正しくありません。&lt;/s>
</pre>

<h3>Inserted text</h3>
文章に追加されたことを示すのに&lt;ins>タグを使います
<br>
<ins>この行は文章に追加されたことを意味しています。</ins>
<pre>
&lt;ins>この行は文章に追加されたことを意味しています。&lt;/ins>
</pre>

<h3>Underlined text</h3>
下線を引くには　&lt;u> タグを使います
<br>
<u>この行は下線が引かれます</u>
<pre>
&lt;u>この行は下線が引かれます&lt;/u>
</pre>

<h3>Small text</h3>
親のフォントサイズの８５％で表示します
<h2>見出し <small>副見出し</small></h2>
<pre>
&lt;h2>見出し &lt;small>副見出し&lt;/small>&lt;/h2>
</pre>

<h3>Bold</h3>

この行の<strong>この部分は強調されます</strong>
<pre>
この行の&lt;strong>この部分は強調されます&lt;/strong>
</pre>

<h3>Italic</h3>
この行の<em>この部分はイタリック体で表示されます</em>
<pre>
この行の&lt;em>この部分はイタリック体で表示されます&lt;/em>
</pre>

<blockquote>
<h4>代替要素</h4>
HTML5では、　&lt;b>と&lt;i>を使用できます
</blockquote>

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

</script>