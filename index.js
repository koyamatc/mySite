var menus = ["Programming",
						 "JavaScript Libs",
						 "Data Visualization",
						 "Tools",
						 "Boards",
						 "Me & etc"];
var me = [
			["Profile","profile.html",""],
			["Math","math/index.html","数学の復習です"],
			["Statistics","stats/index.html","統計の学習です"],
			["Physics","physics/index.html",""],
			["My blog","../wordpress/",""],
			["続酒とバラ肉","../sake_bara/","友人のブログ"]];
var maps = [
				["Google Map","gmap/",""],
				["D3.js","../d3/","Data-Driven Documens"],
				["","",""],
				["Visualizing Data","vd/",""],
				["Mapbox","",""],
				["","",""],
				["","",""],
				["","",""],
				["","",""],
				["Natural Earth","",""]
			];
var boards = [
				["Raspberry Pi","../RasPi/",""],
				["Arduino","####2",""]];
var jslibs = [
				["jQuery","../jqlesson/jqlesson.html",""],
				["jQuery UI","../jqui/",""],
				["jQuery mobile","../jqmobile/",""],
				["Bootstrap","../bootstrap/",""],
				["knockout.js","../ko/","Dynamic JavaScript UI"],
				["Processing.js","../processingJS/","ProcessingをJavaScriptで"],
				["snapSVG.js","../snapSVG/","GoogleのSVG操作ﾗｲﾌﾞﾗﾘ"],
				["lettering.js","../letteringjs/",""],
				["underscore.js","../underscoreJS/",""],
				["jsRender.js","../jsRender/","JavaScript template"],
				["React.js","../react/","Facebookが開発したﾌﾚｰﾑﾜｰｸ"]
		  	  ];

var tools = [
			["When can I use...","http://caniuse.com","ブラウザー間の互換性情報"],
			["Color Picker","http://www.colorpicker.com/",""],
	 		["","",""],
			["","",""],
			["","",""],
			["Khan Academy","https://www.khanacademy.org/",""],
			["MDN","https://developer.mozilla.org/ja/",""],
			["ドットインストール","http://dotinstall.com/","３分間学習サイト"]
		];
						
var pgms = [
			["JavaScript","javascript/",""],
			["php","php/php.html",""],
			["processing","",""],
			["scratch","",""],
			["CSS","style/",""]
		   ];

$(document).on("ready",function(){
	//** Set menu buttons*/
	for (var i = 0; i < menus.length; i++) {
		var menu = "#m" + (i + 1);
 		$(menu).append(menus[i]);
	};


	/** koyamatch.com logo */
	$("#logo").lettering();
 	
 	/** display message */
 	$("#tlt").textillate({
 		selecter: '#tlt .texts',
 		loop : true,
 		// in animation settings.
  		in: {
    		effect: 'rotateInDownLeft',
    		delayScale: 1.5,
    		delay: 50,
    		sync: false,
    		shuffle: false,
  		},
 			// out animation settings.
  		out: {
    		effect: 'rotateOutDownRight',
    		delayScale: 1.5,
    		delay: 50,
    		sync: false,
    		shuffle: false,
  		}
 	});

});

//** set menu items */
function setItem(arr){
	$("#btnAbout").hide();
	removeItem();
	for (var i = 0; i < arr.length; i++) {
		var item = "#item" + (i + 1);
		var btn = "btn" + (i % 6);
		$(item).css("opacity","0");
		$(item).empty();
		
		var itemxs = "#itemxs" + (i + 1); 
		$(itemxs).css("opacity","0");
		$(itemxs).empty();

		var html = '<a class="btn btn-lg btn-block ' + btn + '" href="' + arr[i][1] + '">' 
		+ arr[i][0] +'<h5 class="text-pink hidden-xs">' + arr[i][2] + '</h5></a>'
		
		if (arr[i][0].length > 0) {

			$(item).append(html)
					.animate({opacity:0.8},"slow");
			$(itemxs).append(html)
					.animate({opacity:0.8},"slow");	
		};
	};
};

//** Remove menu items */
function removeItem(){
	for (var i = 0; i < 13; i++) {
		var item = "#item" + (i + 1); 
		$(item).css("opacity","1");
		$(item).empty();

		var itemxs = "#itemxs" + (i + 1); 
		$(itemxs).css("opacity","1");
		$(itemxs).empty();
	};
};

//** メニューボタンにマウスオーバーした時の処理 */
$("#m1").on("click",function(){
	setItem(pgms);
});

$("#m2").on("click",function(){
	setItem(jslibs);
});

$("#m3").on("click",function(){
	setItem(maps);
});

$("#m4").on("click",function(){
	setItem(tools);
});

$("#m5").on("click",function(){
	setItem(boards);
});

$("#m6").on("click",function(){
	setItem(me);
})
