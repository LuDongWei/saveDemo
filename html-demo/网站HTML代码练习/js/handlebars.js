define(function(require,exports,module){
	var $=require('jquery');
	var handlebars=require('handlebars');
	
	exports.handlebars=function(){	
		var template=handlebars.compile($('#people-temolate').html());
		$('#moban').html(template(data));	
	
	}
	
	})
	
	