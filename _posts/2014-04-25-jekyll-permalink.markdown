---
title: 投稿記事
layout: post
postTitle: Jekyll permalink
categories: post jekyll
---

####_posts ホルダーに保存した投稿の出力先（リンク先）を指定できます。

1. _config.yml に
	* permalink : none
     カテゴリの指定がなければ、ルートに作成されます。
  * permalink : /dir1/dir2/

2. Front-matter に
　　　
	 * 同上   

---------
__post.変数__が利用できるので、タイトル、日付の取得、一覧表示ができるます。

初期値は permalink: date
