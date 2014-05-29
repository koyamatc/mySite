---
title: 投稿記事
layout: post
postTitle: レイアウト - Cluster & Tree
categories: post composition
---

レイアウトの　cluster と tree は、よく似ています。

下図の『行徳』ノードの位置を見てください。

treeの場合は、同じ深さのノードの位置にあります。

clusterの場合は、一番深いノードの位置にあります。

## Cluster Layout
<div id="ins01"></div>

## Tree Layout
<div id="ins02"></div>

####fill属性
<select data-bind="options: fillAttr,
                   value: selectedFillAttr,
                   valueAllowUnset: true"></select>
<button class="btn btn-info" data-bind="click:draw">描　画</button>                   

## Collapsible Tree Layout

ノードをクリックしてください。

<div id="ins03"></div>

{% highlight javascript %}
/**
  ApplicationViewModel (knockout.js)
**/
function AppViewModel() {
var width = 960,
    height = 700;

// Create a cluster & a tree layout 
var cluster = d3.layout.cluster()
    .size([height, width - 180]);
var tree    = d3.layout.tree()
    .size([height, width - 180]);

// Create a new diagonal generator
var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

// Create SVG container
var svg01 = d3.select("#ins01").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(50,0)");
var svg02 = d3.select("#ins02").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(50,0)");

// selecter options (ko)
fillAttr = ['green', 'orange', 'none'];
selectedFillAttr = ko.observable('green');

// draw layouts
drawCluster();
drawTree();
  
  /*************************************
    click event (ko) 
  **************************************/
  // 
  self.draw = function() {
    svg01.selectAll(".link").remove();
    svg01.selectAll(".node").remove();
    svg01.selectAll("g").remove();
    svg02.selectAll(".link").remove();
    svg02.selectAll(".node").remove();
    svg02.selectAll("g").remove();
    
    drawCluster();
    drawTree();
  };

  /* Draw cluster layout */
  function drawCluster(){
    d3.json("{{site.url}}/assets/json/mise.json", function(error, root) {
      var nodes = cluster.nodes(root),
          links = cluster.links(nodes);
      
      // 連結線の描画
      var link = svg01.selectAll(".link")
          .data(links)
        .enter().append("path")
          .attr("stroke","white")
          .attr("stroke-width", 3)
         .style("fill",function(){return selectedFillAttr();})
          .attr("class", "link")
          .attr("d", diagonal);
      
      //ノードの描画
      var node = svg01.selectAll(".node")
          .data(nodes)
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })
      // ノードに円を追加    
      node.append("circle")
          .attr("r", function(d){return (10 - d.depth * 2) < 4 ? 4 : (10 - d.depth * 2);})
          .attr("stroke","red")
          .attr("stroke-width", function(d){ return (3 - d.depth)===0 ? 1 : (3 - d.depth) })
          .style("fill","lime");
      // ノードにテキストを追加    
      node.append("text")
          .attr("dx", function(d) { return d.children ? -8 : 8; })
          .attr("dy", 3)
          .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
          .text(function(d) { return d.name; })
          .style("fill","yellow");
    });
  
  };
  /* Draw tree layout */
  function drawTree(){
    d3.json("{{site.url}}/assets/json/mise.json", function(error, root) {
      var nodes = tree.nodes(root),
          links = tree.links(nodes);

      var link = svg02.selectAll(".link")
          .data(links)
        .enter().append("path")
          .attr("stroke","white")
          .attr("stroke-width", 3)
         .style("fill",function(){return selectedFillAttr();})
          .attr("class", "link")
          .attr("d", diagonal);

      var node = svg02.selectAll(".node")
          .data(nodes)
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

      node.append("circle")
          .attr("r", function(d){return (10 - d.depth * 2) < 4 ? 4 : (10 - d.depth * 2);})
          .attr("stroke","red")
          .attr("stroke-width", function(d){ return (3 - d.depth)===0 ? 1 : (3 - d.depth) })
          .style("fill","lime");

      node.append("text")
          .attr("dx", function(d) { return d.children ? -8 : 8; })
          .attr("dy", 3)
          .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
          .text(function(d) { return d.name; })
          .style("fill","yellow");
    });
 
  };
};

// Activates knockout.js
ko.applyBindings(new AppViewModel());

{% endhighlight %}

<script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
<script src="{{site.url}}/js/knockout-3.1.0.js" charset="utf-8"></script>
<script>
/**
  ApplicationViewModel
**/
function AppViewModel() {
var width = 960,
    height = 700;

var cluster = d3.layout.cluster()
    .size([height, width - 180]);
var tree    = d3.layout.tree()
    .size([height, width - 180]);


var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg01 = d3.select("#ins01").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(50,0)");
var svg02 = d3.select("#ins02").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(50,0)");

  fillAttr = ['green', 'orange', 'none'];
  selectedFillAttr = ko.observable('green');

  drawCluster();
  drawTree();
  
  /*************************************
    click event 
  **************************************/
  // 
  self.draw = function() {
    svg01.selectAll(".link").remove();
    svg01.selectAll(".node").remove();
    svg01.selectAll("g").remove();
    svg02.selectAll(".link").remove();
    svg02.selectAll(".node").remove();
    svg02.selectAll("g").remove();
    
    drawCluster();
    drawTree();
  };
  function drawCluster(){
    d3.json("{{site.url}}/assets/json/mise.json", function(error, root) {
      var nodes = cluster.nodes(root),
          links = cluster.links(nodes);

      var link = svg01.selectAll(".link")
          .data(links)
        .enter().append("path")
          .attr("stroke","white")
          .attr("stroke-width", 3)
         .style("fill",function(){return selectedFillAttr();})
          .attr("class", "link")
          .attr("d", diagonal);

      var node = svg01.selectAll(".node")
          .data(nodes)
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

      node.append("circle")
          .attr("r", function(d){return (10 - d.depth * 2) < 4 ? 4 : (10 - d.depth * 2);})
          .attr("stroke","red")
          .attr("stroke-width", function(d){ return (3 - d.depth)===0 ? 1 : (3 - d.depth) })
          .style("fill","lime");

      node.append("text")
          .attr("dx", function(d) { return d.children ? -8 : 8; })
          .attr("dy", 3)
          .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
          .text(function(d) { return d.name; })
          .style("fill","yellow");
    });
  
  };
  function drawTree(){
    d3.json("{{site.url}}/assets/json/mise.json", function(error, root) {
      var nodes = tree.nodes(root),
          links = tree.links(nodes);

      var link = svg02.selectAll(".link")
          .data(links)
        .enter().append("path")
          .attr("stroke","white")
          .attr("stroke-width", 3)
         .style("fill",function(){return selectedFillAttr();})
          .attr("class", "link")
          .attr("d", diagonal);

      var node = svg02.selectAll(".node")
          .data(nodes)
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

      node.append("circle")
          .attr("r", function(d){return (10 - d.depth * 2) < 4 ? 4 : (10 - d.depth * 2);})
          .attr("stroke","red")
          .attr("stroke-width", function(d){ return (3 - d.depth)===0 ? 1 : (3 - d.depth) })
          .style("fill","lime");

      node.append("text")
          .attr("dx", function(d) { return d.children ? -8 : 8; })
          .attr("dy", 3)
          .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
          .text(function(d) { return d.name; })
          .style("fill","yellow");
    });
 
  };
};

// Activates knockout.js
ko.applyBindings(new AppViewModel());

/** 
    collapsible tree
                       **/
var width = 960,
    height = 700;
var i = 0,
    duration = 750,
    root;

var tree = d3.layout.tree()
    .size([height, width]);

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("#ins03").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(50,0)");

d3.json("{{site.url}}/assets/json/mise.json", function(error, mise) {
    root    = mise;
    root.x0 = height / 2;
    root.y0 = 0;

    function collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        }
    }

    root.children.forEach(collapse);
    update(root);
});

d3.select(self.frameElement).style("height", "700px");

function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
    links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 250; });

    // Update the nodes…
    var node = svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter any new nodes at the parent's previous position.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on("click", click);

    nodeEnter.append("circle")
        .attr("r", function(d){return (10 - d.depth * 2) < 4 ? 4 : (10 - d.depth * 2);})
        .attr("stroke","red")
        .attr("stroke-width", function(d){ return (3 - d.depth)===0 ? 1 : (3 - d.depth) })
        .attr("class", "node-dot")
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeEnter.append("text")
        .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.name; })
        .style("fill","yellow")
        .style("fill-opacity", 1e-6)
        .style("font-weight",function(d){if(d.depth<=1){return "bold"};})
        .style("font-style",function(d){return d.children || d._children ? "none" : "italic";});

    // Transition nodes to their new position.
    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle")
        .attr("r", function(d){return (10 - d.depth * 2) < 4 ? 4 : (10 - d.depth * 2);})
        .style("fill", function(d) { return d._children ? "orange" : "lime"; });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    // Update the links…
    var link = svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });

    // Enter any new links at the parent's previous position.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("stroke","white")
        .attr("fill","none")
        .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
        });

    // Transition links to their new position.
    link.transition()
       .duration(duration)
       .attr("d", diagonal);

    // Transition exiting nodes to the parent's new position.
    link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
        })
        .remove();

    // Stash the old positions for transition.
    nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
    }

    // Toggle children on click.
    function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    } else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
    }

</script>