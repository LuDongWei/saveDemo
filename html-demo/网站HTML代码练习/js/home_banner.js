define(function(require,exports,modules){
	var $=require("jquery");
	require('bxslider')($);
	//滚动
	var topSlider=$('#home_slider').bxSlider({
	   auto:true,    //幻灯片自动滚动
	   speed:1500,   //滚动的时间
	   pause:3000,    //每个滚动间隔等待的时间
	   easing:'easeOutExpo', //设置滚动的效果根据bxslider插件里的easing插件提供
	   displaySlideQty:1,   //显示的个数 
	   moveSlideQty:1,   //移动的个数
	   controls:true,   //是否显示下一页和上一页
	   nextImage:'img/controls_08.gif',
	   prevImage:'img/controls_07.gif',
	   pager:true,	 
	   pagerSelector: ".home_slider_pager"
	    
	})
	//改变窗口大小的时候，重载内容
	 $(window).on("resize",function(){
		resizeTime=setTimeout(function(){
		topSlider.reloadShow(); //刷新滚动部分
		topSlider.goToSlide(0); //去指定的幻灯片
			},300)
	 })
	 //鼠标移动上面改变图片
	 $('.home_slider_pager').find('a').mouseover(function(){
		 var index=$('.home_slider_pager').find('a').index(this);
		 topSlider.goToSlide(index); 
		 })
		 
})