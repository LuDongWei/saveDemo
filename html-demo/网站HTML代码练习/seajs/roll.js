define(function(require,exports,module){
	var $=require('jquery');
	require('flickslide')($);
	
	exports.rollList=function(){
		 $('#rollListBox ul li').flickSlide({
                target: '#rollListBox',
                duration: 5000,
                height: 100,  
				colum: 1,
                parentArea: '.rollgoods'
     	
     	});

		};
	
	});