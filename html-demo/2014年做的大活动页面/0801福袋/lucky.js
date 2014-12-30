//mbb 七周年庆 抢福袋页面 
define(function (require,exports,module){
     var $=require("jquery"),
        Global = require("global"),
        loginGetCoupen=require("mbb/loginGetCoupen/1.0.0/loginGetCoupen"),
        SK = require("mbb/seckill/1.0.0/seckilling"),
        skTemplate = require("http://cca.mbaobao.com/mkts/201408/15/yh/seckill2.handlebars.js?2014082001");
        
        popTemplate=require("http://cca.mbaobao.com/mkts/201408/23/bk/pop2.handlebars.js?2014082306");

        require("simplemodal")($); 

     var nowSale=[];      
   
     

     $(".h-bay").on("click",function(){
     	  Global.User.passport(function(){
     	  	 vipL(); 
     	  })   
     })
     
     var oneTime=true; 
     //会员领取福袋判断   
     function vipL(){
     	if(oneTime){
     	  oneTime=false;
     	  if(Global.User.getVip()>0){
         	 //vip 
             $("#ordinaryL").attr("class","n-bay");
             $("#vipL").on("click",function(){
                  var id=$(this).data("id").split(",");
                  loginGetCoupen.get({
			       activityIds: id
			      }); 
             })
          }else{
         	 //普通
             $("#vipL").attr("class","n-bay");
             $("#ordinaryL").on("click",function(){
             	  var id=$(this).data("id").split(",");
                  loginGetCoupen.get({
			       activityIds: id
			      }); 
             })
          }  	
     	}
     }

    //限时抢购当天数据选择
    function nowSeckill(){
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
        
        nowSale=dateSale[dd];


				var time = new Date(H_02, H_03 - 1, H_04, H_05, H_06, H_07);
				countTime(time.getTime());
			}
		});
     }

     //当前时间段
     function countTime(time){
     	 /*  一天4个时间段
     	  *  0:00-14:00   14:00-16:00   16:00-20:00  20:00-00:00  
     	  */
         var nowtime = time / 1000 % 86400 + 8 * 3600; //今天已经过的时间

         if(nowtime<(14*3600)){
         	  chuangLi(0);
         	  seckill(nowSale[0]);
         }else if(nowtime>=(14*3600)&&nowtime<(16*3600)){
              chuangLi(1);
              seckill(nowSale[1]);
         }else if(nowtime>=(16*3600)&&nowtime<(20*3600)){
              chuangLi(2);
              seckill(nowSale[2]);
         }else{
         	  chuangLi(3);
         	  seckill(nowSale[3]);
         }
     }

     //chuang变换
     function chuangLi(now){
         var text=["正在抢购","尚未抢购","抢购结束"];
         
         $("#changTime").find("li").each(function(){
               var nn=$("#changTime").find("li").index($(this));

               if(nn<now){
                  $(this).find(".state").html(text[2]);
               }else if(nn===now){
                  $("#changTime").find("li").removeClass("on");
                  $(this).addClass("on");                  
                  $(this).find(".state").html(text[0]);
               }else{
                  $(this).find(".state").html(text[1]);
               }
         }) 
     }

     //时间段选取
     $("#changTime").on("click","li",function(){
          var id=$(this).data("id");
          
          $("#changTime").find("li").removeClass("on");
          $("#changTime").find("li").eq(id).addClass("on");      

          seckill(nowSale[id]);        
     })
   
     //限时抢购秒杀(页面显示)
     function seckill(sales){
      var bb=sales.split(",");         

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
     
     //页面礼品券限定
     function limited(){
        if (window.gRemove){
          var list=$("#giftList").find(".gift-block");

          for (var i = 0; i < gRemove.length; i++) {
              
              list.eq(gRemove[i]).find(".no-block").show();
              list.eq(gRemove[i]).find("a").removeClass("getfree");
             
          };
        };

            //0元免费领取福袋
         $(".getfree").on("click",function(){
            var id_=$(this).data("id").split("|");

            var title=$(this).parent().data("title");
                
          //0元免费领      
          //    Global.User.passport(function() {
          //        $.ajax({
          //            type: "get",
          //            url: "http://www.mbaobao.com/Activities/maimaifensapi",
          //            dataType: "jsonp",
          //            jsonp: "jsoncallback",
          //            data:{
          //               apid:id_[0]
          //            },
          //            success: function(json) {

          //                 if(json.data){
         //                        Global.Cart.fetch(function(data){
         //                            if (data.total.item_quantity>0) {
         //                               $("#getBags").find("#p-zhu").html("（如购物车不显示，F5刷新哦！）");
         //                            }else{
         //                               $("#getBags").find("#p-zhu").html("（购物车加入任意一款商品，赠品2分钟左右会显示！）");
         //                            }
         //                       })

         //                       $("#getBags").find(".getGood").html(id_[1]);
         //                       $("#getBags").find("#p-title").html(title);
                               
         //                       $("#getBags").modal({
         //                           closeClass:'xp-close'
         //                       })
          //                 }else{
         //                       if(json.error==405){
         //                          alert("亲，您已经领取过该礼品了哟~去购物车查看礼品!")
         //                       }else{
         //                          alert(json.message)
         //                       }
          //                 }
          //            }
         //           })  

            // vipL();
         //    })
            
            //领礼品券
            Global.User.passport(function() { 
               
               loginGetCoupen.get({
                  activityIds: [id_[2]],
                  template:popTemplate
               }); 

               vipL();
            }) 
         })
     }


     $(function(){
         if(Global.User.isLogin()){
         	vipL(); 
         }


 
         limited();
         
         nowSeckill();
     })

})