---
title: 投稿記事
layout: post
postTitle: Electron　を使ってみた
categories: post electron
---

-----

Windows, OSX, Linux デスクトップ・アプリケーションが作成できる

Electron のバージョン　1.0　がリリースされました

ちょいと試してみました

１．　ローカル環境に Electron API Demos をインストール
<pre>
$ git clone https://github.com/atom/electron-api-demos
$ cd electron-api-demos
$ npm install
$ npm start
</pre>
APIデモ アプリが起動します、基本となるコードの書き方がわかります

この時に electron-quick-start ホルダーが作成され、
アプリを起動すると下図のようなアプリが表示されます
（quick-startのバージョンは少し古いです）

2.　ソースコードの作成（今回は quick-startのソースをコピペ）

  + テスト用ホルダを作成
  
  + package.json

  + index.html (少しだけ変更)
  
  + main.js

3.　electron-prebuiltのインストール
<pre>
npm install -g electron-prebuilt
</pre>
4. アプリの起動

  テスト用ホルダで
<pre>
electron .
</pre>

![最初のエレクトロン]({{domain}}/img/firstElectron.png)

バージョン番号が最新になっていますね

  + 簡単にテスト起動できました

  + chromium上で動作しているので、ブラウザの互換性を気にしなくていい

  + OSによる API、 メソッドの　使用可、　不可はあります

次は、　簡単なアプリを作って配布パッケージの作成をしてみたいと思う

[ELECTRON](http://electron.atom.io/) ----　エレクトロンのサイト

<script src="//code.jquery.com/jquery-1.11.3.js"></script>
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?skin=sons-of-obsidian"></script>

<script type="text/javascript">
  var $window = $(window)
  // make code pretty
  $('pre').addClass('prettyprint');
  $('pre').css({"background":"#111",
	  	           "font-size":"1.05em",
		                "border":"0px"}
		            );
  $('code').css({"font-size":"1.05em","color":"#f00"});


</script>