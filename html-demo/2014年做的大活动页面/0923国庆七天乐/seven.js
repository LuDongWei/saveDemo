define(function(require, exports, module) {
	var $ = require("jquery"),
		SK = require("mbb/seckill/1.0.0/seckilling"),
		SB=require("mbb/subscibe/1.0.0/subscibe");
		skTemplate = require("http://cca.mbaobao.com/mkts/201408/15/yh/seckill2.handlebars.js?2014082001");
    
    var nowSale=[]; 

	//限时抢购当天数据选择
	function nowSeckill() {
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			jsonp: "jsoncallback",
			url: "http://www.mbaobao.com/ajax/getTime?d=" + Math.floor((Math.random() * 100) + 1),
			success: function(data) {

				var H_01 = data.data.split('.')[0];
				var H_02 = H_01.slice(0, 4);
				var H_03 = H_01.slice(5, 7);
				var H_04 = H_01.slice(8, 10);

				var H_05 = H_01.slice(11, 13);
				var H_06 = H_01.slice(14, 16);
				var H_07 = H_01.slice(17, 19);

				var dd = H_03 + H_04;

				nowSale = dateSale[dd];

				var time = new Date(H_02, H_03 - 1, H_04, H_05, H_06, H_07);

				countTime(time.getTime());

				onToday(H_04);
			}
		});
	}

	 //当前时间段(3个状态|未开始|正在抢|已结束)
     function countTime(time){
         /*  一天4场
     	  *  0:00-10:00   10:00-14:00   14:00-16:00  16:00-20:00  20:00-00:00
     	  *  都未开始     第一场        第二场       第三场       第四场
     	  */  

         var nowtime = time / 1000 % 86400 + 8 * 3600; //今天已经过的时间
         
         var cTime=0;

         if(nowtime<(10*3600)){
             cTime=-1;
         }else if(nowtime>=(10*3600)&&nowtime<(14*3600)){
             cTime=0;
         }else if(nowtime>=(14*3600)&&nowtime<(16*3600)){
             cTime=1;
         }else if(nowtime>=(16*3600)&&nowtime<(20*3600)){
             cTime=2;
         }else{
             cTime=3;
         }

        chuangLi(cTime);
        

     
		if (cTime < 0) {
			seckill(nowSale[0])
		} else {
			seckill(nowSale[cTime])
		};


     }


    //时间条变换
	function chuangLi(now) {
        $("#cTime").find("li").each(function(){
              var nn = $("#cTime").find("li").index($(this));
              
              if(now>=0){
                 if(nn<now){    //已结束
                    $(this).addClass("over");
                 }else if(nn==now){  //正在
                    $(this).addClass("begin");

                    $(this).addClass("selected");
                 }else{   //未开始

                 } 
              }

              $(this).css('visibility', 'visible');
        })
	}

	//限时抢购秒杀(页面显示)
	function seckill(sales) {
		var bb = sales.split(",");

		var sk1 = SK.create({
			sale: bb[0],
			divID: $("#skGood01"),
			imgSize: 320,
			template: skTemplate,
			countDown: function(abc, b, c) {
				$("#skGood01").find(".countdown").html('<span class="h">' + abc.hh + '</span>' +
					'<span class="m">' + abc.mm + '</span>' +
					'<span class="s">' + abc.ss + '</span>');
			},
			returnData: function(aa) {

			},
			begin: function() {
				SK.start();
			},
			end: function() {
				SK.start();
			}
		});

		var sk2 = SK.create({
			sale: bb[1],
			divID: $("#skGood02"),
			imgSize: 320,
			template: skTemplate,
			countDown: function(abc, b, c) {
				$("#skGood02").find(".countdown").html('<span class="h">' + abc.hh + '</span>' +
					'<span class="m">' + abc.mm + '</span>' +
					'<span class="s">' + abc.ss + '</span>');
			},
			returnData: function(aa) {

			},
			begin: function() {
				SK.start();
			},
			end: function() {
				SK.start();
			}
		});

		var sk3 = SK.create({
			sale: bb[2],
			divID: $("#skGood03"),
			imgSize: 320,
			template: skTemplate,
			countDown: function(abc, b, c) {
				$("#skGood03").find(".countdown").html('<span class="h">' + abc.hh + '</span>' +
					'<span class="m">' + abc.mm + '</span>' +
					'<span class="s">' + abc.ss + '</span>');
			},
			returnData: function(aa) {

			},
			begin: function() {
				SK.start();
			},
			end: function() {
				SK.start();
			}
		});

		var aa = SK.start();
	}

    $("#cTime").on("click","li",function(){
    	  var id=$(this).data("id");

          $("#cTime").find("li").removeClass("selected");
          $("#cTime").find("li").eq(id).addClass("selected");  

    	  seckill(nowSale[id]);        
    })

    //人气款选择
    function onToday(day){
        
        var imgH=dImg[day],
              dd=parseInt(day,10)-1;

        $("#hitsList").find("li").each(function(){
        	   var nn = $("#hitsList").find("li").index($(this));
                  
               if (nn<dd){
                  $(this).addClass("begin");

                  $(this).addClass("change");
               }else if(nn==dd){
                  $(this).removeClass("hDay");
                  
                  $(this).addClass("change");
                  $(this).html(imgH);
               }else{
                  $(this).addClass("noBegin");
               };

        })

        /*--开卖提醒--*/
        $("#hitsList").find(".noBegin").on("click",function(){
             var id_=$(this).data("id");
              
			 SB.install({
				id: id_, 
				title: "国庆7天，7天7品类1.2折起乐不停 ",    //标题
				input: "请输入手机号码",  //提示
				button: "开始提醒我",     //按钮
				succeed_: function(aa, bb) {
                   
					bb.close();

					alert("你已预定成功");
				}
			 })

        })

        /*--选取--*/
        $("#hitsList").find(".change").on("click",function(){
        	  var mm = $("#hitsList").find(".change").index($(this));
              
              $("#hitsList").find(".change").removeClass("Selected"); 
        	  $(this).addClass("Selected");
              
              goodHots(mm);
        })
       
        goodHots(dd); 
    }

    //商品列表显示
    function goodHots(dd){
       var this_=$("#goodsHot").find(".goods-show").eq(dd);
          

           if(this_.data("load")=="show"){

               $("#goodsHot").find(".goods-show").hide();
               
               this_.show(); 

           }else{
           	   var  html=this_.text();

               this_.html(html);
               this_.data("load","show");

               $("#goodsHot").find(".goods-show").hide();

               this_.show(); 
           }
    }




	$(function(){
          nowSeckill();
	})

})