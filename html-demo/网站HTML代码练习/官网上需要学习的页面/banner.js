define(function(require,exports,modles){
	var $ = require("jquery");
    var blockHighlight = require("#mbb-blockHighlight/0.1/blockHighlight");
	
	exports.banner=function(){
	 controller();	
	 blockHighlight.init(".L_slider_nav", "a", ["140,110", "140,110", "140,110", "140,110"]);	
     }
	  
	 var  controller=function(){
		 var initialize=0;
		 var IndexLi =$('.L_slider_wrap').find('.L_slider_nav li').size();
		 $('.L_slider_nav li').mouseover(function(){   
		 var index = $('.L_slider_nav li').index($(this));
		     go(index);
			 
		 });
		 
		 if(true){
         var _self =$('.L_slider_wrap').find('.L_slider_nav li');
         var _selfelse = $('.L_slider_wrap').find('.L_slider_banner li');
            loop();
		 }
		 
	    _self.mouseenter(function() {
            stop();
        });

        _self.mouseleave(function() {
            stop();
            loop();
        })
        _selfelse.mouseenter(function() {
            stop();
        });

        _selfelse.mouseleave(function() {
            stop();
            loop();
        })
		 
		 
		 
		 function loop(){
		 startRun=setInterval(function(){
			   var currIndex = initialize + 1;
                if (currIndex>=IndexLi) {
                    initialize= 0;
					currIndex=0;
                } else {
                    initialize = currIndex;
                }                
                go(currIndex);
			 },2000);
		 } 
	   
	    function stop() {
            clearInterval(startRun);
        }
	 
	    function go(page){
		$('.L_slider_banner li').hide();
		$('.L_slider_banner li').eq(page).show();
		}	
		 
		 
		  
	 }	
	});