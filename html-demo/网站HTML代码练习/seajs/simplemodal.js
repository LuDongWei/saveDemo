define(function(require,exports,module){
	var $=require('jquery');
	  require('simplemodal')($);
	
       exports.greyBox=function(){
		   console.log($('#greyBox').modal() );
		 $('#greyBox').modal("<div><h1>SimpleModal</h1></div>");  
			
		   };
	});