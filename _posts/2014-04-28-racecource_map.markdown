---
title: 投稿記事
layout: post
postTitle: 競馬場マップ
categories: post composition
---
<div id="svg"></div>
Natural Earth　の地図データを使い、D3.jsで地図を描いてみました。

[参考サイト　http://bost.ocks.org/mike/map/](http://bost.ocks.org/mike/map/)

1. map データのダウンロード from natural earth
  * ne_10m_admin_1_states_provinces.zip
  * ne_10m_populated_places.zip

2. toolのインストール
  * GDAL
  * topojson

3. データ変換
  * geojsonを作成
   
        ogr2ogr    
            -f GeoJSON    
            -where "geonunit IN ('Japan')"    
            subunits.json    
            ne_10m_admin_1_states_provinces.shp

        ogr2ogr    
            -f GeoJSON    
            -where "iso_a2 = 'JP' AND SCALERANK < 8"    
            places.json    
            ne_10m_populated_places.shp
  * places.json を競馬場データに修正
  * GeoJson を TopoJson　に変換
        
        topojson    
            --id-property su_a3    
            -p NAME    
            -p name    
            -o japan.json    
            -- subunits.json    
            places.json

<script src="http://d3js.org/d3.v3.min.js"></script>
<script src="http://d3js.org/topojson.v0.min.js"></script>
<script src="http://koyamatch.com/js/underscore.js"></script>
<script type="text/javascript">
  var width = 700,
    height = 700;

    var svg = d3.select("#svg").append("svg")
                               .attr("width", width)
                               .attr("height", height);

  d3.json("{{site.url}}/japan.json", function(error, japan) {
    var subunits = topojson.object(japan, japan.objects.subunits).geometries;
    
    var projection = d3.geo.mercator()
   .center([135, 35.4])
   .scale(1500)
   .translate([width / 2, height / 2]);

    var path = d3.geo.path()
                   .projection(projection);
  
    svg.selectAll(".subunit")
      .data(subunits)
      .enter().append("path")
      .attr("class", function(d) { return "subunit " + _.values(d.properties); })
      .attr("d", path)
      .style("fill","gold");

    svg.append("path")
        .datum(topojson.mesh(japan, japan.objects.subunits, function(a, b) { return a !== b; }))
        .attr("d", path)
        .attr("class", "subunit-boundary")
        .style("fill", "none")
        .attr("stroke", "#777")
        .attr("stroke-dasharray", "2,2")
        .attr("stroke-linejoin", "round");  

      svg.append("path")
         .datum(topojson.object(japan, japan.objects.places))
        .attr("d", path)
        .attr("class", "place")
        .style("fill","red");

      svg.selectAll(".place-label")
        .data(topojson.object(japan, japan.objects.places).geometries)
        .enter().append("text")
        .attr("class", "place-label")
        .attr("transform", function(d) { return "translate(" + projection(d.coordinates) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) { return d.properties.NAME; })
        .attr("font-size","0.4em")
        .style("fill","white");

      d3.select(".subunit.Hokkaido").style( "fill", "green");
      d3.select(".subunit.Fukushima").style( "fill", "green");
      d3.select(".subunit.Niigata").style( "fill", "lightgreen");
      d3.select(".subunit.Tokyo").style( "fill", "green");
      d3.select(".subunit.Kyoto").style( "fill", "lightgreen");
      d3.select(".subunit.Aichi").style( "fill", "green");
      d3.select(".subunit.Chiba").style( "fill", "lightgreen");
      d3.select(".subunit.Hyōgo").style( "fill", "green");
      d3.select(".subunit.Fukuoka").style( "fill", "green");


  });

</script>
