define(function(require,exports,module){
	var $=require('jquery');
	/*鼠标滚动事件-当悬浮框移动是进行判断*/
	var MouseScroll=function(){
	   var win_top= $(document).scrollTop();
	   var floatBox_top=$('.floatBox').offset().top;
		  $(document).ready(function(){		  
	      $(window).scroll(function(){	
		  var win_top= $(document).scrollTop();    
			  	if(win_top>=floatBox_top){
			  $('.floatBox').css({'position':'fixed','top':'0px'});		
				 }
			    if(win_top<floatBox_top){
			  $('.floatBox').css({'position':'absolute','top':'200px'});		
				 } 
		  });
		 });
		}; 
	/*点击事件,进入入口*/
	exports.floatBox=function(){
		   MouseScroll();
	  $('.float_foot').click(function(){
	       $('.float_main').hide();
		   $('.float_foot').hide();
		   $('.float_top').hide(); 
		   $('.float_top_2').show(); 
		   $('.floatBox').css('width','149px'); 
		   });
	  $('.float_top_2').click(function(){
		   $('.float_foot').show(); 
		   $('.float_top').show(); 
	       $('.float_top_2').hide();
		   $('.float_main').show(); 
		   $('.floatBox').css('width','119px'); 
		  });	   	   		  
		}
	});