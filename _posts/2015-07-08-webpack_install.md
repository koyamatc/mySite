---
title: 投稿記事
layout: post
postTitle: webpack install
categories: post webpack
---

-----

React.js を導入する際に　webpack を導入しました


## webpack の導入手順

1. webpack の　インストール
  
  $ npm install -g webpack

2. ローカルホルダーで　React と　ローダーの　インストール
  
  $ npm install react url-loader jsx-loader style-loader css-loader 

3. jquery と　uniqueid をインストール　（適宜）

  $ npm install jquery

  $ npm install uniqueid   

4. webpack.config.js の設定

{% highlight javascript %}
module.exports = {
  // Application entry point
  entry: './app.js',
  output:{
    // ﾌｧｲﾙの出力先
    path: '.public/build',

    // url-loader でバンドルされたファイルの出力先
    publicpath: './build/',

    // output file name
    filename :'bundle.js'
  },
  module: {
    loaders: [
      {
        // 正規表現でファイルタイプを指定
        test: /\.(js)$/,

        // ローダーの種類を指定
        // ローダーへのパラメーターはクエリー文字列で指定
        loader: 'jsx-loader?harmony'
      },
      {
        test: /\.(css)$/,
        // 複数のローダーを"!"で接続できる
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?size=8192'
      }
    ]
  }
};
{% endhighlight %}

## ビルド

  + 開発ビルド

    - $ webpack

    - $ webpack -d (ソースマップ付)

  + プロダクションビルド
  
    - $ webpack -p

  + インクリメンタルビルド
  
    - $ webpack --watch


[参考文献]　

「入門　React」 オライリー・ジャパン