---
title: 投稿記事
layout: post
postTitle: ProcessingJS 勉強 - 3D
categories: post processingJS
---

-----

Khan Academy での勉強です。

<canvas id="canvas1"></canvas>
画面の中をドラッグしてください

<pre>

  
</pre> 

<canvas id="canvas2"></canvas>
画面の中をドラッグしてください
<pre>
  
</pre>

<canvas id="canvas3"></canvas>
画面の中をドラッグしてください
<pre>
  
</pre>
  
<script src="//code.jquery.com/jquery-1.11.3.js"></script>
<script src="{{site.url}}/js/processing.min.js" charset="utf-8"></script>
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

  //$("#logo").lettering();

function sketchProc1(processing) {
  
  var height = 400,
      width = 400;
  var backgroundColor = processing.color(255, 255, 255);
  var nodeColor = processing.color(40, 168, 107);
  var edgeColor = processing.color(34, 68, 204);
  var nodeSize = 8;
  var node0 = [-100, -100, -100];
  var node1 = [-100, -100,  100]; 
  var node2 = [-100,  100, -100];
  var node3 = [-100,  100,  100];
  var node4 = [ 100, -100, -100];
  var node5 = [ 100, -100,  100];
  var node6 = [ 100,  100, -100];
  var node7 = [ 100,  100,  100];
  var nodes = [node0, node1, node2, node3, node4, node5, node6, node7];

  var edge0  = [0, 1];
  var edge1  = [1, 3];
  var edge2  = [3, 2];
  var edge3  = [2, 0];
  var edge4  = [4, 5];
  var edge5  = [5, 7];
  var edge6  = [7, 6];
  var edge7  = [6, 4];
  var edge8  = [0, 4];
  var edge9  = [1, 5];
  var edge10 = [2, 6];
  var edge11 = [3, 7];
  var edges = [edge0, edge1, edge2, edge3, edge4, edge5, edge6, edge7, edge8, edge9, edge10, edge11];
  
  var rotateZ3D = function(theta) {
   var sinTheta = Math.sin(theta);
   var cosTheta = Math.cos(theta);
   for (var n = 0; n < nodes.length; n++) {
      var node = nodes[n];
      var x = node[0];
      var y = node[1];
      node[0] = x * cosTheta - y * sinTheta;
      node[1] = y * cosTheta + x * sinTheta;
   }
  };
  var rotateY3D = function(theta) {
   var sinTheta = Math.sin(theta);
   var cosTheta = Math.cos(theta);
   for (var n = 0; n < nodes.length; n++) {
      var node = nodes[n];
      var x = node[0];
      var z = node[2];
      node[0] = x * cosTheta - z * sinTheta;
      node[2] = z * cosTheta + x * sinTheta;
   }
  };
  var rotateX3D = function(theta) {
   var sinTheta = Math.sin(theta);
   var cosTheta = Math.cos(theta);
   for (var n = 0; n < nodes.length; n++) {
      var node = nodes[n];
      var y = node[1];
      var z = node[2];
      node[1] = y * cosTheta - z * sinTheta;
      node[2] = z * cosTheta + y * sinTheta;
   }
  };
 
  processing.setup = function(){
    // canvas size 
    processing.size(width,height);
  }
  
  rotateZ3D(30);
  rotateX3D(45);
  rotateY3D(30);
  
  processing.draw = function(){
    processing.background(backgroundColor);
  
    // move origin to 
    processing.translate(200, 200);
   
    // drawing nodes
    processing.fill(nodeColor);
    processing.noStroke();
    for (var n = 0; n < nodes.length; n++) {
      var node = nodes[n];
      processing.ellipse(node[0], node[1], nodeSize, nodeSize);
    }
    
    // drawing edges
    processing.stroke(edgeColor);
    for (var e = 0; e < edges.length; e++) {
      var n0 = edges[e][0];
      var n1 = edges[e][1];
      var node0 = nodes[n0];
      var node1 = nodes[n1];
      processing.line(node0[0], node0[1], node1[0], node1[1]);
    }
        
  }    

  processing.mouseDragged = function() {
    rotateY3D(processing.mouseX - processing.pmouseX);
    rotateX3D(processing.mouseY - processing.pmouseY);
  };

};  

function sketchProc2(processing) {
  
  var height = 400,
      width = 400;
  var backgroundColor = processing.color(255, 255, 255);
  var nodeColor = processing.color(40, 168, 107);
  var edgeColor = processing.color(34, 68, 204);
  var nodeSize = 8;

  // Create a cuboid with a vertex at (x, y, z)
  // with width, w, height, h, and depth, d.
  var createCuboid = function(x, y, z, w, h, d) {
    var nodes = [[x, y, z ], [x, y, z+d], [x, y+h, z ], [x, y+h, z+d], [x+w, y, z ], [x+w, y, z+d], [x+w, y+h, z ], [x+w, y+h, z+d]];

    var edges = [[0, 1], [1, 3], [3, 2], [2, 0], [4, 5], [5, 7], [7, 6], [6, 4], [0, 4], [1, 5], [2, 6], [3, 7]];

    return { 'nodes': nodes, 'edges': edges};
  };
  
  var shape = createCuboid(0, 0, 0, 100, 160, 50);
  var nodes = shape.nodes; 
  var edges = shape.edges;
  
  var rotateZ3D = function(theta) {
   var sinTheta = Math.sin(theta);
   var cosTheta = Math.cos(theta);
   for (var n = 0; n < nodes.length; n++) {
      var node = nodes[n];
      var x = node[0];
      var y = node[1];
      node[0] = x * cosTheta - y * sinTheta;
      node[1] = y * cosTheta + x * sinTheta;
   }
  };
  var rotateY3D = function(theta) {
   var sinTheta = Math.sin(theta);
   var cosTheta = Math.cos(theta);
   for (var n = 0; n < nodes.length; n++) {
      var node = nodes[n];
      var x = node[0];
      var z = node[2];
      node[0] = x * cosTheta - z * sinTheta;
      node[2] = z * cosTheta + x * sinTheta;
   }
  };
  var rotateX3D = function(theta) {
   var sinTheta = Math.sin(theta);
   var cosTheta = Math.cos(theta);
   for (var n = 0; n < nodes.length; n++) {
      var node = nodes[n];
      var y = node[1];
      var z = node[2];
      node[1] = y * cosTheta - z * sinTheta;
      node[2] = z * cosTheta + y * sinTheta;
   }
  };
 
  processing.setup = function(){
    // canvas size 
    processing.size(width,height);
  
  }
  
  rotateZ3D(30);
  rotateX3D(45);
  rotateY3D(30);
  
  processing.draw = function(){
    processing.background(backgroundColor);
  
    // move origin to 
    processing.translate(200, 200);
   
    // drawing nodes
    processing.fill(nodeColor);
    processing.noStroke();
    for (var n = 0; n < nodes.length; n++) {
      var node = nodes[n];
      processing.ellipse(node[0], node[1], nodeSize, nodeSize);
    }
    
    // drawing edges
    processing.stroke(edgeColor);
    for (var e = 0; e < edges.length; e++) {
      var n0 = edges[e][0];
      var n1 = edges[e][1];
      var node0 = nodes[n0];
      var node1 = nodes[n1];
      processing.line(node0[0], node0[1], node1[0], node1[1]);
    }
        
  }    

  processing.mouseDragged = function() {
    rotateY3D(processing.mouseX - processing.pmouseX);
    rotateX3D(processing.mouseY - processing.pmouseY);
  };

}; 

function sketchProc3(processing) {
  
  var height = 400,
      width = 400;
  var backgroundColor = processing.color(255, 255, 255);
  var nodeColor = processing.color(40, 168, 107);
  var edgeColor = processing.color(34, 68, 204);
  var nodeSize = 8;

  // Create a cuboid with a vertex at (x, y, z)
  // with width, w, height, h, and depth, d.
  var createCuboid = function(x, y, z, w, h, d) {
    var nodes = [[x, y, z ], [x, y, z+d], [x, y+h, z ], [x, y+h, z+d], [x+w, y, z ], [x+w, y, z+d], [x+w, y+h, z ], [x+w, y+h, z+d]];

    var edges = [[0, 1], [1, 3], [3, 2], [2, 0], [4, 5], [5, 7], [7, 6], [6, 4], [0, 4], [1, 5], [2, 6], [3, 7]];

    return { 'nodes': nodes, 'edges': edges};
  };
  
  var shape1 = createCuboid(-120, -20, -20, 240, 40, 40);
  var shape2 = createCuboid(-120, -50, -30, -20, 100, 60);
  var shape3 = createCuboid( 120, -50, -30, 20, 100, 60);
  var shapes = [shape1, shape2, shape3];
  var nodes = shapes.nodes; 
  var edges = shapes.edges;
  
  // Rotate shape around the z-axis
  var rotateZ3D = function(theta, nodes) {
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    
    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var y = node[1];
        node[0] = x * cosTheta - y * sinTheta;
        node[1] = y * cosTheta + x * sinTheta;
    }
  };

  var rotateY3D = function(theta, nodes) {
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    
    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var x = node[0];
        var z = node[2];
        node[0] = x * cosTheta - z * sinTheta;
        node[2] = z * cosTheta + x * sinTheta;
    }
  };

  var rotateX3D = function(theta, nodes) {
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);
    
    for (var n = 0; n < nodes.length; n++) {
        var node = nodes[n];
        var y = node[1];
        var z = node[2];
        node[1] = y * cosTheta - z * sinTheta;
        node[2] = z * cosTheta + y * sinTheta;
    }
  };
 
  processing.setup = function(){
    // canvas size 
    processing.size(width,height);
  
  }
  
  processing.draw = function(){
    processing.background(backgroundColor);
  
    // move origin to 
    processing.translate(200, 200);
   
    // drawing nodes
    processing.fill(nodeColor);
    processing.noStroke();
    for (var shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
      var nodes = shapes[shapeNum].nodes;
      for (var n = 0; n < nodes.length; n++) {
          var node = nodes[n]; processing.ellipse(node[0], node[1], nodeSize, nodeSize);
      }
    }
    
    // drawing edges
    processing.stroke(edgeColor);
    for (var shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
      var nodes = shapes[shapeNum].nodes;
      var edges = shapes[shapeNum].edges;
      for (var e = 0; e < edges.length; e++) {
          var n0 = edges[e][0];
          var n1 = edges[e][1];
          var node0 = nodes[n0];
          var node1 = nodes[n1];
          processing.line(node0[0], node0[1], node1[0], node1[1]);
      }        
    }    

  }; 

  processing.mouseDragged = function() {
    var dx = processing.mouseX - processing.pmouseX;
    var dy = processing.mouseY - processing.pmouseY;
    for (var shapeNum = 0; shapeNum < shapes.length; shapeNum++) {
      var nodes = shapes[shapeNum].nodes;
      rotateY3D(dx, nodes);
      rotateX3D(dy, nodes);
    }
  };
};  

var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
var canvas3 = document.getElementById("canvas3");

// attaching the sketchProc function to the canvas
var p1 = new Processing(canvas1, sketchProc1);
var p2 = new Processing(canvas2, sketchProc2);
var p3 = new Processing(canvas3, sketchProc3);
// p.exit(); to detach it

</script>
