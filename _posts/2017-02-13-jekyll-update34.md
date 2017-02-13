---
title: 投稿記事
layout: post
postTitle: Jekyll update to 3.4
categories: post jekyll
---

このサイトも飽きてきたので

そろそろ模様替えを考えています

現在は __jekyll__ を使用していますが

ほかに何かないかと調べていると [Gatsby](https://github.com/gatsbyjs/gatsby) を見つけました

ReactJsを利用しているので興味はありますが

今回はまず jekyll のアップグレードをしてみました。

__ver 1.x から ver 3.4__

ドキュメントも読まず、
いつものごとくいきなりアップデート開始

gem update jekyll

エラーが！！

Ruby　2.0　以上が必要だと

ruby 1.9.x を削除、 2.3.3をインストール

jekyll serve を実行してみる

エラーがいっぱい！！

+ syntax highliter
    
    + _config.yml
      
        pygments: true -> highlighter: pygments

    + install pygments

        gem install pygments.rb


+ time zone

    gem 'tzinfo-data', platforms: [:mingw, :mswin]


+ redcarpet 削除

    + _config.yml

        markdown: redcarpet　-> deleted

どうにか動きました          

皆さんはちゃんと

[Upgrading from 0.x to 2.x](https://jekyllrb.com/docs/upgrading/0-to-2/)

[Upgrading from 2.x to 3.x](https://jekyllrb.com/docs/upgrading/2-to-3/) 

を見てから実行しましょう！！