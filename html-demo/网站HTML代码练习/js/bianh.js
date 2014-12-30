define(function(require,exports,module){
	var $=require('jquery');
	var xuan=true;
	var who;
	 
	$('#woman').mouseover(function(){	
	   if(xuan){
		  woman(); 
		   }
 	})
	
	 $('#man').mouseover(function(){
	     if(xuan){
		  man(); 
		   }
	})
	
	$('.wrapper_top').mouseleave(function(){
	   if(who=='woman'){    $(".wrapper_top").find('.woman').animate({width:0},"slow");}
	   if(who=='man'){	 $(".wrapper_top").find('.woman_01').animate({width:478},"slow");}
	   xuan=true;
	})
		
	
	var woman=function(){
    $(".wrapper_top").find('.woman').animate({width:483},"slow");
	xuan=false;
	who='woman';
	}
	
	var man=function(){
	 $(".wrapper_top").find('.woman_01').animate({width:0},"slow");
	 xuan=false;
	 who='man';
	}
	
	
	
	
	
	
	})