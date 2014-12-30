define(function(require,exports,module){
   var $=require('jquery');
    exports.pictureChange=function(){
	    $(".picture_chang").hover(
            function () {			
			var  index=$('.picture_chang').index($(this));
			var  now=index+1;
		     $(this).find('img').attr("src","http://cca.mbaobao.com/mkts/201307/10/AFL/ALF_S_0"+now+".jpg");
              },
            function () {
			var  index=$('.picture_chang').index($(this));
			var  now=index+1;	
		    $(this).find('img').attr("src","http://cca.mbaobao.com/mkts/201307/10/AFL/ALF_M_0"+now+".jpg");
           }
      );
	};
});