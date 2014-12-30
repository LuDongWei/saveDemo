define(function (require, exports, module) {
	var $=require('jquery1_3_2');
	require("flickslide")($);	
	
	exports.init=function(){	
		var banner='#imgBlockBox';
		var banner2='#imgBlockBox1';
		var banner3='#imgBlockBox2';
		banner_control(banner);
		banner_control(banner2);
		banner_control(banner3);			
	}
	var banner_control=function(banner){
		 if ($(banner+' ul li').length > 1) {
			$(banner+' ul li').flickSlide({
				target: banner+'>ul',
				duration: 5000,
				height: 124,
				parentArea: banner
			});
			$(banner+' ul li').show();
		}else{
			$(banner+' ul li').show();
		}			
	   }		
});