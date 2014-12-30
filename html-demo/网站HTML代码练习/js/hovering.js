define(function(require,exprots,module){
	var $=require("jquery");
	
//悬浮框接口，当使用这个接口可以控制的div的悬浮
//可以设置选择的top，right，bottom，left的悬浮位置的值，不需要的设置设置为none，
//设置悬浮框的滚动是否需要在top或者bottom之间停留，正常悬浮位置为mid
    var _div,_space,i=0;
	//程序入口
    exprots.hovering=function(div,space,site){
	_div=div; _space=space;
	//设置为中间浮动的时候
	if(site=="mid"){hov("fixed");}
	//设置为浮动停留上边
	if(site=="top"){hov("absolute"); top();} 
	//当鼠标向下滚动一段距离的时候可以在底部出现悬浮框
	if(site=="bottom"){hov("absolute"); bottom();}	
	}
	//悬浮的设置
	function hov(position){
	$(_div).css({"position":position,
	             "top":_space[0]+"px",
				 "right":_space[1]+"px",
				 "bottom":_space[2]+"px",
				 "left":_space[3]+"px"
    })	
    }
	//设置滚动可以贴着上边或者下边
	function top(){
	//浮动窗口距离窗口的上边距的距离
    var hover_top=$(_div).offset().top;	
    $(window).scroll(function(){
	//鼠标滚动的距离
	var win_top=$(document).scrollTop();
	//是鼠标滚动的时候能停留在顶部
	if(win_top>=hover_top){
	$(_div).css({"position":"fixed",
	             "top":"0px"
    })			
	}else{
	hov("absolute");
	}
	});
	}
    //鼠标向下滚动，下方出现悬浮框
	function bottom(){
	var mouse_bottom=300;//鼠标向下滚动的距离	
	$(window).scroll(function(){
	var win_top=$(document).scrollTop();
	if(win_top>=mouse_bottom){
	$(_div).css({"position":"fixed",
	             "top":"auto",
	             "bottom":"0px"
    })	
	}else{
     hov("absolute");
	}
	})	
	} 
	
	  
})