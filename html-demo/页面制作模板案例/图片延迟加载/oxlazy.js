//测试背景延迟加载 使用seajs插件写法
define(function(require,exports,module){
       var $=require('jquery');
       var lazyLoad = exports;

       lazyLoad.oxlazy = function(option) {
           var defaults = {
			bk_div:'.wrapper_mian_bk',         //存放background
			bk_height:100,                     //单background高度
			win_last:0,                        //上一次高度
			win_top:$(document).scrollTop(),   //页面拖动距离
			win_height:$(window).height(),     //页面高度
			win_src:[],                        //存放src
			number:0,                          //加载个数
			win_hh_top:0,                      //上一次
			win_lazy:3                         //加载加载增加数
           };
           defaults = $.extend(defaults, option || {});

           var bk_div=defaults.bk_div;  
           var bk_height=defaults.bk_height;                           
           var win_last=defaults.win_last;
           var win_top=defaults.win_top;
           var win_height=defaults.win_height;
           var win_src=defaults.win_src;
           var number=defaults.number;
           var win_hh_top=defaults.win_hh_top;
           var win_lazy=defaults.win_lazy;
           var bk_number=$(bk_div).find('div').length; //background数量
           var win_offsettop=$(bk_div).offset().top;   //元素对象顶部距离


           //提取sku
           $(bk_div).find('div').each(function(){
            var src=$(this).data("oxlazy");
            win_src.push(src);
           })
       
           //下游览
           $(window).scroll(function() {
			win_top = $(document).scrollTop();
			win_height = $(window).height();
			oxlazyline();
	       })
        
		   //下拉
		   $(window).resize(function() {
			win_top = $(document).scrollTop();
			win_height = $(window).height();
			oxlazyline();
		   });
		
           
		   var  oxlazyline=function(){
		   	    var win_hh=win_top+win_height-win_offsettop;
		   	    if(win_hh>win_hh_top){
		           win_hh_top=win_hh;
		   	    }else{
		   	    	return false;
		   	    }
		   	    
		   	    var win_mun=parseInt(win_hh/bk_height)+win_lazy;
		  

		   	    var win_over=win_mun-win_last;
		   	        win_last=win_mun;

		   	    if(number>=bk_number){
		   	    	return;
		   	    }   
                
		        if(0<win_over){
		        	for (var i = 0; i < win_over; i++) {
		        	    $(bk_div).find('div').eq(number).css("background-image", "url(" + win_src[number] + ")");                   
		        	    number++;		        	       	 	
		        	}
		        }	   	                        
		   }
		   oxlazyline();
       }


       lazyLoad.init = function(option) {
        var settings = {
            defObj: null,
            defHeight: -200
        };

        settings = $.extend(settings, option || {});
        var defHeight = settings.defHeight;
        var defObj = typeof settings.defObj === "object" ? settings.defObj.find("img") : $(settings.defObj).find("img");
        var pageTop = function() {
            return document.documentElement.clientHeight + Math.max(document.documentElement.scrollTop, document.body.scrollTop) - settings.defHeight
        };
        var imgLoad = function() {
            defObj.each(function() {
                if ($(this).offset().top <= pageTop()) {
                    var src2 = $(this).attr("src2");
                    if (src2) {
                        $(this).attr("src", src2).removeAttr("src2")
                    }
                }
            })
        };
        imgLoad();
        $(window).bind("scroll", function() {
            imgLoad()
        })

    }     
})