---
title: 投稿記事
layout: post
postTitle: lodash　の不明点
categories: post react
---

-----

React.js D3.js lodash を利用して　グラフ描画コンポーネントを作成してみた

React と　D3　を一緒に使うのに、非常に参考になったのがこの記事でした

[Integrating D3.js visualizations in a React app](http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/)

[Demo]({{site.url}}/component_test/es6/select/)


今回、配列の操作に lodash　を利用してみた

underscore に比べて　高機能らしい

ぱっと見て使ってみたので、正しい使い方なのかわからない

ただ動作はしました

### ちょっとした疑問

関数内で　_.filter でデータを抽出する際に変数を指定した場合に、　不可解な結果となった。

{% highlight javascript %}
var data = 
    [
      {
        'year':2013,
            'value':[
                      {x: 1, y: 11.3},
                      {x: 2, y: 10.2},
                      //..
                    ]
      },
      {
        'year':2014,
            'value':[
                      {x: 1, y: 14.3},
                      {x: 3, y: 11.7},
                      //..
                    ]
      },
      {
        'year':2015,
            'value':[
                      {x: 2, y: 12.3},
                      {x: 4, y: 10.7},
                      //..    
                    ]
      },

    ];
//...    

funcA = ($year) => {
  //..
  console.log($year);
  yearData = _.pluck(_.filter(this.props.data,{year:$year}),'value');
  concole.log(yearData);
  //..
}
{% endhighlight %}

1回目のfuncA(year)の呼び出しでは正しくデータを取得できる

2014

[Object,Object,..]

2回目以後のfuncA(year)の呼び出しでは取得できない

2014

[]　//　empty

関数内に2回指定してみた
{% highlight javascript %}
funcA = ($year) => {
  //..
  $year=2014;
  yearData = _.pluck(_.filter(this.props.data,{year:$year}),'value');
  concole.log(yearData);

  $year=2015;
  yearData = _.pluck(_.filter(this.props.data,{year:$year}),'value');
  concole.log(yearData);
  //..
}
{% endhighlight %}


1回目の呼び出しでは抽出できる

[Object,Object, ... ]

[Object,Object, ... ]

2回目以後は空となる

[]

[]


変数からリテラルにしてみる
{% highlight javascript %}
funcA = ($year) => {
  //..
  yearData = _.pluck(_.filter(this.props.data,{year:2014}),'value');
  concole.log(yearData);

  yearData = _.pluck(_.filter(this.props.data,{year:2015}),'value');
  concole.log(yearData);
  //..
}
{% endhighlight %}

何度関数を呼び出しても必ずデータは取得できる

なんでしょう？？

1度しか使えないのならば、　1回で配列に入れてしまうことにした

{% highlight javascript %}
funcA = () => {
   // 年ごにデータを抽出し配列に保存
    var size = _.size(this.props.years);
    for (var i=0; i&lt;size;i++){
      var $year = this.props.years[i];
      yearData[$year] =  _.pluck(_.filter(this.props.data,   {year:$year}),'value');

    };
 }
{% endhighlight %}

