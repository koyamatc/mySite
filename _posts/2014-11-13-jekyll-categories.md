---
title: 投稿記事
layout: post
postTitle: Jekyll ﾍﾟｰｼﾞ･ｶﾃｺﾞﾘ取得
categories: post jekyll
---

 __ページのカテゴリを取得するには__

+ 表示中のカテゴリ
  
  page.categories

+ 次の投稿のカテゴリ

  page.next.categories

+ １つ前の投稿のカテゴリ

  page.previous.categories

使用例

投稿された次のページが存在していて(page.next), 

次のページのカテゴリ(page.next.categories)と
表示中のページのカテゴリ(page.categories)が同じなら

次のページのリンク先(page.next.url)とタイトル(page.next.postTitle)を表示する

<div class="highlight" >
<pre style="color:#fff;font-size:1.1em">
&#123% if page.next and page.next.categories == page.categories %}  
  &lta href="&#123&#123page.next.url}}">
    &lth4>
      &ltspan class="glyphicon glyphicon-arrow-right text-white"> &#123&#123page.next.postTitle}}&lt/span>
    &lt/h4>
  &lt/a>
&#123% endif %}
</pre>
</div>

__サイト内のカテゴリを取得する__

+ サイト内のカテゴリを取得
    site.categories.category名
    
カテゴリpost(site.categories.post)を取り出して一覧表示する

<div class="highlight" >
<pre style="color:#fff;font-size:1.1em">
&#123% for post in site.categories.post %}
  &ltli>
    &ltspan>&#123&#123 post.date | date_to_string }}&lt/span> &raquo; 
      &lta href="&#123&#123 post.url }}">&#123&#123 post.postTitle }}&lt/a>
  &lt/li>
&#123% endfor %}  
</pre>
</div>