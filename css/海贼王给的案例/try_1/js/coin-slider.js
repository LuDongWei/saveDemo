/**
 * Coin Slider - Unique jQuery Image Slider
 * @version: 1.0 - (2010/04/04)
 * @requires jQuery v1.2.2 or later 
 * @author Ivan Lazarevic
 * Examples and documentation at: http://workshop.rs/projects/coin-slider/
 * Download by http://www.codefans.net
 * Licensed under MIT licence:
 *   http://www.opensource.org/licenses/mit-license.php
**/

(function($) {

	var params 		= new Array;
	var order		= new Array;
	var images		= new Array;
	var links		= new Array;
	var linksTarget = new Array;
	var titles		= new Array;
	var interval	= new Array;
	var imagePos	= new Array;
	var appInterval = new Array;	
	var squarePos	= new Array;	
	var reverse		= new Array;
	
	$.fn.coinslider= $.fn.CoinSlider = function(options){
		
		init = function(el){
				
			order[el.id] 		= new Array();	// order of square appereance
			images[el.id]		= new Array();
			links[el.id]		= new Array();
			linksTarget[el.id]	= new Array();
			titles[el.id]		= new Array();
			imagePos[el.id]		= 0;
			squarePos[el.id]	= 0;
			reverse[el.id]		= 1;						
				
			params[el.id] = $.extend({}, $.fn.coinslider.defaults, options);
						
			// create images, links and titles arrays
			$.each($('#'+el.id+' img'), function(i,item){
				images[el.id][i] 		= $(item).attr('src');
				links[el.id][i] 		= $(item).parent().is('a') ? $(item).parent().attr('href') : '';
				linksTarget[el.id][i] 	= $(item).parent().is('a') ? $(item).parent().attr('target') : '';
				titles[el.id][i] 		= $(item).next().is('span') ? $(item).next().html() : '';
				$(item).hide();
				$(item).next().hide();
			});			
			

			// set panel
			$(el).css({
				'background-image':'url('+images[el.id][0]+')',
				'width': params[el.id].width,
				'height': params[el.id].height,
				'position': 'relative',
				'background-position': 'top left'
			}).wrap("<div class='coin-slider' id='coin-slider-"+el.id+"' />");	
			
				
			// create title bar
			$('#'+el.id).append("<div class='cs-title' id='cs-title-"+el.id+"' style='position: absolute; bottom:0; left: 0; z-index: 1000;'></div>");
						
			$.setFields(el);
			
			if(params[el.id].navigation)
				$.setNavigation(el);
			
			$.transition(el,0);
			$.transitionCall(el);
				
		}
		
		// squares positions
		$.setFields = function(el){
			
			tWidth = sWidth = parseInt(params[el.id].width/params[el.id].spw);
			tHeight = sHeight = parseInt(params[el.id].height/params[el.id].sph);
			
			counter = sLeft = sTop = 0;
			tgapx = gapx = params[el.id].width - params[el.id].spw*sWidth;
			tgapy = gapy = params[el.id].height - params[el.id].sph*sHeight;
			
			for(i=1;i <= params[el.id].sph;i++){
				gapx = tgapx;
				
					if(gapy > 0){
						gapy--;
						sHeight = tHeight+1;
					} else {
						sHeight = tHeight;
					}
				
				for(j=1; j <= params[el.id].spw; j++){	

					if(gapx > 0){
						gapx--;
						sWidth = tWidth+1;
					} else {
						sWidth = tWidth;
					}

					order[el.id][counter] = i+''+j;
					counter++;
					
					if(params[el.id].links)
						$('#'+el.id).append("<a href='"+links[el.id][0]+"' class='cs-"+el.id+"' id='cs-"+el.id+i+j+"' style='width:"+sWidth+"px; height:"+sHeight+"px; float: left; position: absolute;'></a>");
					else
						$('#'+el.id).append("<div class='cs-"+el.id+"' id='cs-"+el.id+i+j+"' style='width:"+sWidth+"px; height:"+sHeight+"px; float: left; position: absolute;'></div>");
								
					// positioning squares
					$("#cs-"+el.id+i+j).css({ 
						'background-position': -sLeft +'px '+(-sTop+'px'),
						'left' : sLeft ,
						'top': sTop
					});
				
					sLeft += sWidth;
				}

				sTop += sHeight;
				sLeft = 0;					
					
			}
			
			
			$('.cs-'+el.id).mouseover(function(){
				$('#cs-navigation-'+el.id).show();
			});
		
			$('.cs-'+el.id).mouseout(function(){
				$('#cs-navigation-'+el.id).hide();
			});	
			
			$('#cs-title-'+el.id).mouseover(function(){
				$('#cs-navigation-'+el.id).show();
			});
		
			$('#cs-title-'+el.id).mouseout(function(){
				$('#cs-navigation-'+el.id).hide();
			});	
			
			if(params[el.id].hoverPause){	
				$('.cs-'+el.id).mouseover(function(){
					params[el.id].pause = true;
				});
			
				$('.cs-'+el.id).mouseout(function(){
					params[el.id].pause = false;
				});	
				
				$('#cs-title-'+el.id).mouseover(function(){
					params[el.id].pause = true;
				});
			
				$('#cs-title-'+el.id).mouseout(function(){
					params[el.id].pause = false;
				});	
			}
					
			
		};
				
		
		$.transitionCall = function(el){
		
			clearInterval(interval[el.id]);	
			delay = params[el.id].delay + params[el.id].spw*params[el.id].sph*params[el.id].sDelay;
			interval[el.id] = setInterval(function() { $.transition(el)  }, delay);
			
		}
		
		// transitions
		$.transition = function(el,direction){
			
			if(params[el.id].pause == true) return;
			
			$.effect(el);
			
			squarePos[el.id] = 0;
			appInterval[el.id] = setInterval(function() { $.appereance(el,order[el.id][squarePos[el.id]])  },params[el.id].sDelay);
					
			$(el).css({ 'background-image': 'url('+images[el.id][imagePos[el.id]]+')' });
			
			if(typeof(direction) == "undefined")
				imagePos[el.id]++;
			else
				if(direction == 'prev')
					imagePos[el.id]--;
				else
					imagePos[el.id] = direction;
		
			if  (imagePos[el.id] == images[el.id].length) {
				imagePos[el.id] = 0;
			}
			
			if (imagePos[el.id] == -1){
				imagePos[el.id] = images[el.id].length-1;
			}
	
			$('.cs-button-'+el.id).removeClass('cs-active');
			$('#cs-button-'+el.id+"-"+(imagePos[el.id]+1)).addClass('cs-active');
			
			if(titles[el.id][imagePos[el.id]]){
				$('#cs-title-'+el.id).css({ 'opacity' : 0 }).animate({ 'opacity' : params[el.id].opacity }, params[el.id].titleSpeed);
				$('#cs-title-'+el.id).html(titles[el.id][imagePos[el.id]]);
			} else {
				$('#cs-title-'+el.id).css('opacity',0);
			}				
				
		};
		
		$.appereance = function(el,sid){

			$('.cs-'+el.id).attr('href',links[el.id][imagePos[el.id]]).attr('target',linksTarget[el.id][imagePos[el.id]]);

			if (squarePos[el.id] == params[el.id].spw*params[el.id].sph) {
				clearInterval(appInterval[el.id]);
				return;
			}

			$('#cs-'+el.id+sid).css({ opacity: 0, 'background-image': 'url('+images[el.id][imagePos[el.id]]+')' });
			$('#cs-'+el.id+sid).animate({ opacity: 1 }, 300);
			squarePos[el.id]++;
			
		};
		
		// navigation
		$.setNavigation = function(el){
			// create prev and next 
			$(el).append("<div id='cs-navigation-"+el.id+"'></div>");
			$('#cs-navigation-'+el.id).hide();
			
			$('#cs-navigation-'+el.id).append("<a href='#' id='cs-prev-"+el.id+"' class='cs-prev'>prev</a>");
			$('#cs-navigation-'+el.id).append("<a href='#' id='cs-next-"+el.id+"' class='cs-next'>next</a>");
			$('#cs-prev-'+el.id).css({
				'position' 	: 'absolute',
				'top'		: params[el.id].height/2 - 15,
				'left'		: 0,
				'z-index' 	: 1001,
				'line-height': '30px',
				'opacity'	: params[el.id].opacity
			}).click( function(e){
				e.preventDefault();
				$.transition(el,'prev');
				$.transitionCall(el);		
			}).mouseover( function(){ $('#cs-navigation-'+el.id).show() });
	
			$('#cs-next-'+el.id).css({
				'position' 	: 'absolute',
				'top'		: params[el.id].height/2 - 15,
				'right'		: 0,
				'z-index' 	: 1001,
				'line-height': '30px',
				'opacity'	: params[el.id].opacity
			}).click( function(e){
				e.preventDefault();
				$.transition(el);
				$.transitionCall(el);
			}).mouseover( function(){ $('#cs-navigation-'+el.id).show() });
		
			// image buttons
			$("<div id='cs-buttons-"+el.id+"' class='cs-buttons'></div>").appendTo($('#coin-slider-'+el.id));

			
			for(k=1;k<images[el.id].length+1;k++){
				$('#cs-buttons-'+el.id).append("<a href='#' class='cs-button-"+el.id+"' id='cs-button-"+el.id+"-"+k+"'>"+k+"</a>");
			}
			
			$.each($('.cs-button-'+el.id), function(i,item){
				$(item).click( function(e){
					$('.cs-button-'+el.id).removeClass('cs-active');
					$(this).addClass('cs-active');
					e.preventDefault();
					$.transition(el,i);
					$.transitionCall(el);				
				})
			});	
			
			$('#cs-navigation-'+el.id+' a').mouseout(function(){
				$('#cs-navigation-'+el.id).hide();
				params[el.id].pause = false;
			});						

			$("#cs-buttons-"+el.id).css({
				'position' 	    : 'absolute',
				'right'			: '5px',
				'bottom'		: '0px',//改变底部按钮位置
				'z-index' 	    : 1002
				
			});
			
				
		}




		// effects
		$.effect = function(el){
			
			effA = ['random','swirl','rain','straight'];
			if(params[el.id].effect == '')
				eff = effA[Math.floor(Math.random()*(effA.length))];
			else
				eff = params[el.id].effect;

			order[el.id] = new Array();

			if(eff == 'random'){
				counter = 0;
				  for(i=1;i <= params[el.id].sph;i++){
				  	for(j=1; j <= params[el.id].spw; j++){	
				  		order[el.id][counter] = i+''+j;
						counter++;
				  	}
				  }	
				$.random(order[el.id]);
			}
			
			if(eff == 'rain')	{
				$.rain(el);
			}
			
			if(eff == 'swirl')
				$.swirl(el);
				
			if(eff == 'straight')
				$.straight(el);
				
			reverse[el.id] *= -1;
			if(reverse[el.id] > 0){
				order[el.id].reverse();
			}

		}

			
		// shuffle array function
		$.random = function(arr) {
						
		  var i = arr.length;
		  if ( i == 0 ) return false;
		  while ( --i ) {
		     var j = Math.floor( Math.random() * ( i + 1 ) );
		     var tempi = arr[i];
		     var tempj = arr[j];
		     arr[i] = tempj;
		     arr[j] = tempi;
		   }
		}	
		
		//swirl effect by milos popovic
		$.swirl = function(el){

			var n = params[el.id].sph;
			var m = params[el.id].spw;

			var x = 1;
			var y = 1;
			var going = 0;
			var num = 0;
			var c = 0;
			
			var dowhile = true;
						
			while(dowhile) {
				
				num = (going==0 || going==2) ? m : n;
				
				for (i=1;i<=num;i++){
					
					order[el.id][c] = x+''+y;
					c++;

					if(i!=num){
						switch(going){
							case 0 : y++; break;
							case 1 : x++; break;
							case 2 : y--; break;
							case 3 : x--; break;
						
						}
					}
				}
				
				going = (going+1)%4;

				switch(going){
					case 0 : m--; y++; break;
					case 1 : n--; x++; break;
					case 2 : m--; y--; break;
					case 3 : n--; x--; break;		
				}
				
				check = $.max(n,m) - $.min(n,m);			
				if(m<=check && n<=check)
					dowhile = false;
									
			}
		}

		// rain effect
		$.rain = function(el){
			var n = params[el.id].sph;
			var m = params[el.id].spw;

			var c = 0;
			var to = to2 = from = 1;
			var dowhile = true;


			while(dowhile){
				
				for(i=from;i<=to;i++){
					order[el.id][c] = i+''+parseInt(to2-i+1);
					c++;
				}
				
				to2++;
				
				if(to < n && to2 < m && n<m){
					to++;	
				}
				
				if(to < n && n>=m){
					to++;	
				}
				
				if(to2 > m){
					from++;
				}
				
				if(from > to) dowhile= false;
				
			}			

		}

		// straight effect
		$.straight = function(el){
			counter = 0;
			for(i=1;i <= params[el.id].sph;i++){
				for(j=1; j <= params[el.id].spw; j++){	
					order[el.id][counter] = i+''+j;
					counter++;
				}
				
			}
		}

		$.min = function(n,m){
			if (n>m) return m;
			else return n;
		}
		
		$.max = function(n,m){
			if (n<m) return m;
			else return n;
		}		
	
	this.each (
		function(){ init(this); }
	);
	

	};
	
	
	// default values
	$.fn.coinslider.defaults = {	
		width: 1004, // width of slider panel//修改图片大小
		height: 231, // height of slider panel
		spw: 7, // squares per width
		sph: 5, // squares per height
		delay: 1000, // delay between images in ms                            图片播放速度
		sDelay: 30, // delay beetwen squares in ms
		opacity: 0.7, // opacity of title and navigation
		titleSpeed: 5000, // speed of title appereance in ms
		effect: '', // random, swirl, rain, straight
		navigation: true, // prev next and buttons
		links : true, // show images as links 
		hoverPause: true // pause on hover		
	};	
	
})(jQuery);

//产品轮播展示
$(function() {
	var sWidth = $("#focus").width(); //获取焦点图的宽度（显示面积）
	var len = $("#focus ul li").length; //获取焦点图个数
	var index = 0;
	var picTimer;
	
	//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span></span>";
	}
	btn += "</div><div class='preNext pre'></div><div class='preNext next'></div>";
	$("#focus").append(btn);
	$("#focus .btnBg").css("opacity",0.5);

	//为小按钮添加鼠标滑入事件，以显示相应的内容
	$("#focus .btn span").css("opacity",0.4).mouseenter(function() {
		index = $("#focus .btn span").index(this);
		showPics(index);
		
	}).eq(0).trigger("mouseenter");

	
	////上一页、下一页按钮透明度处理
	//$("#focus .preNext").css("opacity",0.2).hover(function() {
		//$(this).attr({"opacity":"0.5"},300);

		//},function() {
			//$(this).attr{"opacity":"0.2"},300);
	//});


	//上一页按钮
	$("#focus .pre").click(function() {
		index -= 1;
		if(index == -1) {index = len - 1;}
		showPics(index);
	});

	//下一页按钮
	$("#focus .next").click(function() {
		index += 1;
		if(index == len) {index = 0;}
		showPics(index);
	});

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$("#focus ul").css("width",sWidth * (len));
	
	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$("#focus").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {index = 0;}
		},4000); //此4000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");
	
	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
		var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
		$("#focus ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
		//$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
		$("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
	}
});
 