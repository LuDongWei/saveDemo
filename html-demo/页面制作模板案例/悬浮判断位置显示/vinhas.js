//mbbHot
define(function(require, exports, module) {
	var $ = require('jquery');
	var top_id=["#top_01","#top_02","#top_03","#top_04","#top_05","#top_06","#top_07","#top_08"];
    var DIST=[];    //每块的位置
    var widHeight=1000;
    var bagHeight=500; 
    require('jquery-plugin/idtabs/3.0.0/idtabs')($);
    
 

    //滑动跳转
    $(".Suspended").find("a").each(function(){
       $(this).on("click",function(){
          var id=$(this).data("id");
          var index=parseInt(id,10)+1;   
          var top=DIST[index];
          //根据屏幕高度计算
          if(widHeight<=1000){
          	var d_top=1200-widHeight;
          	if(d_top<=250){
          	   var top_=top+d_top;	 
          	}else{
          	   var top_=top+200;	
          	}
          }else{
          	var top_=top;
          }          
          $('html, body').animate({scrollTop: top_}, 300);
       })
    })

    //鼠标滚动 
    $(window).scroll(function(){
       var win_top=$(document).scrollTop();
       var n=whereMI(win_top);
       Suspended(n)
    })

    //显示悬浮位置
    function Suspended(n_){
       $(".Suspended").find("li").removeClass("selected");
       if(n_<=0){return}else{
       	 var n=n_-1;
         $(".Suspended").find("li").eq(n).addClass("selected");
       }  
    }

    //判断鼠标位置
    function whereMI(win_top_){
       var thistop=win_top_;
       
        for (var i = 0; i < DIST.length; i++) {
        	if(thistop>=DIST[i]&&thistop<=DIST[i+1]){
               return i
        	}
        };
    }

    //检测屏幕在第几块   
    $(function(){
    	 //初始化各块高度

         for (var i = 0; i < top_id.length; i++) {
         	 DIST.push($(top_id[i]).offset().top)
         };
         if(DIST[0]!=0){
         	DIST.unshift(0);  
         }       
         widHeight=$(window).height();

       //定时
      $(".B_chuang").find("ul").each(function() {
        $(this).idTabs();
        var a = $(this).find("a");
        var len = a.length;
        var i = 0;
        var timer = setInterval(function() {
            a[i].click();
            i++;
            if (i > len - 1) {
                i = 0;
            }
        }, 1500)
        $(this).find("a").find("img").on("click", function() {
            clearInterval(timer);
        })

       })  

      console.log(DIST)
    })

    

});