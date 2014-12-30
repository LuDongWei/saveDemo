define(function(require,exports,modules){
	var $=require('jquery');
	
      require('lazyload')($, window, document, undefined);
	  
	  $('img.lazy').lazyload();
	
	})