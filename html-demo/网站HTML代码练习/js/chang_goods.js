define(function(require,exports,modules){
   var $=require("jquery");
    require('bxslider')($);
	   //轮播
	 $(".J_Hot1").bxSlider({
            'mode':'fade',
            'displaySlideQty': 1, //定义显示个数
            'moveSlideQty': 1, //移动个数
            'speed': 10,
            'auto': true,
		    'controls':false,
            'easing': 'easeOutQuint'
      })
   //商品价格选择修改问题和修改方式	  
   //问题：应为商品的价格选择会在页面出现多次。所以，当需要修改价格的时候出现混乱
   //解决：使用jquery的parent()：获得当前元素集合中每个元素的父类元素。
   	  
	    	 	  
   // 商品价格选择
   var goods_chass,price_chass,number_chang,box;
   exports.chang_goods=function(goods,price,number){
   goods_chass=goods; //商品选择
   price_chass=price; //价格选择
   number_chang=number-1;//默认选择
   //box=$(goods_chass).parent();    有待研究，不会把页面上全部的商品都改变
   //goodschang(number_chang);//默认
   //pricechoose(number_chang);//默认
   goodschoose();
   }      
   //点击商品
   function goodschoose(){
   $(goods_chass).find("li").mousedown(function(){	  //当对应的商品被按下时
      box=$(this).parent().parent().parent();//查找父类元素   
	  var goodssize=$(box).find(goods_chass+" li").size();  //查看一条选择中有的商品数
      index=$(goods_chass).find("li").index(this)%goodssize;
	     goodschang(index);
	     pricechoose(index);
	}) 
    }	
		//按下商品
	function goodschang(index){

	$(box).find(goods_chass+" li").find("img").css("border","1px solid #999");  
    $(box).find(goods_chass+" li").eq(index).find("img").css("border","1px solid #000000");	
    }
	
	//对应的价格
    function pricechoose(index){
    $(box).find(price_chass+" li").hide();
    $(box).find(price_chass+" li").eq(index).show();
	}
   
   
   
    
})