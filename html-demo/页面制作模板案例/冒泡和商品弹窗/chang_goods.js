define(function(require,exports,modules){
   var $=require("jquery");
    require('bxslider')($);
    require("simplemodal")($);
	
 // 商品价格选择
   var goods_chass,price_chass,number_chang,box;
   exports.chang_goods=function(goods,price,number){
   goods_chass=goods; //商品选择
   price_chass=price; //价格选择
   number_chang=number-1;//默认选择
   goodschoose();
   }      
   
   //点击商品
   function goodschoose(){
   $(goods_chass).find("li").mousedown(function(){    //当对应的商品被按下时
      box=$(this).parent().parent().parent();//查找父类元素   
      var goodssize=$(box).find(goods_chass+" li").size();  //查看一条选择中有的商品数
      index=$(goods_chass).find("li").index(this)%goodssize;
      goodschang(index);
      pricechoose(index);
   }) 
   }  
    //按下商品
  function goodschang(index){
    $(box).find(goods_chass+" li").find("img").css("border","1px solid #af926d");  
    $(box).find(goods_chass+" li").eq(index).find("img").css("border","1px solid #000000"); 
    }
  
  //对应的价格
  function pricechoose(index){
    $(box).find(price_chass+" li").hide();
    $(box).find(price_chass+" li").eq(index).show();
  }
	  
		   //轮播1
	 $(".banner1_fix").bxSlider({   
          'displaySlideQty': 1, //定义显示个数
          'moveSlideQty': 1, //移动个数
          'speed': 10,
          'auto': true,
          'controls':false,
          'easing': 'easeOutQuint',
          'pager':true,
          'pagerSelector': '.banner1_chang'

      })
		
	   //轮播2
	 $(".banner2_fix").bxSlider({   
          'displaySlideQty': 1, //定义显示个数
          'moveSlideQty': 1, //移动个数
          'speed': 10,
          'auto': true,
          'controls':true,
          'nextImage':'http://cca.mbaobao.com/mkts/201308/15/dudu/banner_right.jpg',
          'prevImage':'http://cca.mbaobao.com/mkts/201308/15/dudu/banner_left.jpg',
          'easing': 'easeOutQuint',
          'pager':true,
          'pagerSelector': '.banner2_color'
      })
	  
	  $('.dian_B').mousedown(function(){
	  var dian_B=$(this).attr('data_id');	
	 
	  $(".dian_"+dian_B).modal({
                    escClose: true,
                    close: true,
                    overlayClose: true,
                    closeClass: 'xp_close'
              }); 
	  })
	
	
	  
	   //点击 
  $(".dian_B,.dian_P").on("mouseleave", function(){
		 event.stopPropagation();
	});
		
  $(".dian_picture").on("mouseleave",function(){
		  $('.dian_picture').find("i").hide();
    }).on("mouseenter", ".dian_P", function(){
      $('.dian_picture').find("i").hide();
			data_id=$(this).attr('data_id');
			$('.dian_picture').find(".dian"+data_id).show();  
   })
  
    
})