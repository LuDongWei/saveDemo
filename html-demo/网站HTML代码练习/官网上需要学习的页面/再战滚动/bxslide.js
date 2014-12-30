define(function(require,exports,module){
   var $=require('jquery');
   require('bxslider')($);
   
   $('#a_banner').bxSlider({
	   auto:true,    //幻灯片自动滚动
	   speed:1500,   //滚动的时间
	   pause:3000,    //每个滚动间隔等待的时间
	   easing:'easeOutExpo', //设置滚动的效果根据bxslider插件里的easing插件提供
	   displaySlideQty:1,   //显示的个数 
	   moveSlideQty:1,   //移动的个数
	   controls:false,   //是否显示下一页和上一页
	   pager:true,
	   pagerSelector: ".a_goods_pager"    
	})
	
	  $('#b_banner').bxSlider({
	   auto:true,    //幻灯片自动滚动
	   speed:1500,   //滚动的时间
	   pause:3000,    //每个滚动间隔等待的时间
	   easing:'easeOutExpo', //设置滚动的效果根据bxslider插件里的easing插件提供
	   displaySlideQty:1,   //显示的个数 
	   moveSlideQty:1,   //移动的个数
	   controls:false,   //是否显示下一页和上一页
	   pager:true,
	   pagerSelector: ".b_goods_pager"	  	    
	})
	
	
});