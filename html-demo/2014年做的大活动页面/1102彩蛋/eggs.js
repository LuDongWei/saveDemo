//彩蛋页面
/*
  1.官网首页弹窗
  2.抽奖
*/

define(function (require,exports,module){
       var $=require("jquery"),
           sb=require("mbb/subscibe/1.0.0/subscibe"),
           TP=require("mbb/tempData/1.0.0/tempData"),
           Global = require("global"),
           Cookie = require("cookie"),
           loginGetCoupen= require("mbb/loginGetCoupen/1.0.0/loginGetCoupen");

           require("simplemodal")($);
           require("http://cca.mbaobao.com/mkts/201408/04/roll/textRoll.js");

       var LUCKYTOP="http://www.mbaobao.com/LuckyDraw/LuckyDrawTop",       //抽奖排行 0：全部，1：个人
           GETDATA="http://www.mbaobao.com/LuckyDraw/GetCollectingData",   //彩蛋数量和是否可以抽奖
           LUCKYDRAW="http://www.mbaobao.com/LuckyDraw/LuckyDrawCaidan";   //抽奖

       var award={
          "0":"谢谢参与",
          "1":"二十个麦豆",
          "2":"七周年礼券之500元现金券",
          "3":"七周年礼券之5元现金券",
          "4":"七周年礼券之10元现金券",
          "5":"七周年礼券之20元现金券",
          "6":"七周年礼券之30元现金券",
          "7":"七周年礼券之50元现金券",
          "8":"七周年礼券之水晶挂饰",
          "9":"七周年礼券之浪美手包",
          "10":"七周年礼券之浪美化妆包",
          "11":"七周年礼券之牛皮零钱包",
          "12":"七周年礼券之dudu牛皮零钱包",
          "13":"七周年礼券之帆布小包"
       }    

       var Ajax = function(url, data, callback) {
          $.ajax({
               type: "get",
               url: url,
               dataType: "jsonp",
               jsonp: "jsoncallback",
               data: data,
               success: function(json) {
                    callback && callback(json);
               }
          })
       }
       
       //起始 
       // $(function(){
       //     centerDialog({
       //          url:"http://mkt.mbaobao.com/a-sevensale0825",
       //          image_url: 'http://cca.mbaobao.com/mkts/201407/29/gai/qwll.jpg'
       //     })

       //     if(Global.User.isLogin()){
       //         getEggs();
       //     }else{
       //         $("#eNolog").show();
       //         playEgg();
       //     }
           
       //     Ajax(LUCKYTOP,{
       //         activityid:'30c1ae6928b56139a0a67fa2c3a2f875'
       //     },function(json){
       //         var dad=json.data,
       //             html="";
       //         for (var i = 0; i < dad.length; i++) {
       //             html=html+dad[i].user_name.slice(0,5)+"已通关，获得<span>"+award[dad[i]['type']]+"</span>&nbsp;&nbsp;&nbsp;&nbsp;";
       //         };
       //            $("#awardList").find("#content").html(html+html+html+html);

       //            $("#container").roll({
       //                   speed:3
       //            }); 
       //     })          
       // })

       $("body").on("click","#logIn",function(){       
            Global.User.passport(function() {
                   getEggs()
            }) 
            return false
       })


       //登陆以后获取彩蛋的数量
       function getEggs(){
           Ajax(GETDATA,{
               activityid:"30c1ae6928b56139a0a67fa2c3a2f875"
           },function(json){
              var count=json.data.count,
                  total=json.data.total;

                  if(count==0){
                      $(".e-state").hide();
                      $("#eNoplay").show();                       
                  }else if(count==7){
                      showEgg(count) 
                      
                      $(".e-state").hide(); 


                      if(total==0){
                         //已经抽过
                         lookPrize(); 
                              
                         $("#eFinish").show();
                         $("#eFinish").find(".state-2").show();

                      }else if(total>0){
                         //可以抽奖

                         $("#eFinish").show();
                         $("#eFinish").find(".state-1").show();

                         lottery();
                      }                                                              
                  }else{
                      showEgg(count) 
                      $(".e-state").hide();

                      $("#eHaveplay").find(".surplus").html(7-count);
                      $("#eHaveplay").show();  
                  }
                  
                  playEgg();
           }) 
       } 

       //彩蛋数量显示
       function showEgg(num){

          var eggs=$("#eggList").find("li");

          for (var i = 0; i < num; i++) {
              eggs.eq(i).addClass("po"); 
          };
                      
       }
       
       //增加彩蛋动画效果 
       function playEgg(){
           var notPo=$("#eggList").find("li").not('.po'),
               aa=notPo.length;

             setInterval(function(){
                var bb=Math.round(Math.random()*aa);

                    notPo.eq(bb).addClass('swing');

                var tim2=setTimeout(function(){
                    notPo.eq(bb).removeClass('swing');
                    
                    clearTimeout(tim2);  
                    },1500)
            },3000) 
       }
       
       //查看自己的奖品(个人) 
       function lookPrize(){
            Ajax(LUCKYTOP,{
                activityid:'30c1ae6928b56139a0a67fa2c3a2f875',
                Type:1
            },function(json){
                var now=json.data[0];
                    
                $("#eFinish").find(".state-2").find(".award").html( award[now.type]);
            })          
       }

       //抽奖
       function lottery(){
           $("#mLottery").on("click",function(){
               Ajax(LUCKYDRAW,{
                  activityid:'30c1ae6928b56139a0a67fa2c3a2f875'
               },function(json){
                  if(json.data){
                    $("#getAward").find(".ard").html(award[json.data.type]) 
                   
                    $(".get-award").modal({
                         closeClass:'xp-close'
                    })     

                    //console.log(json)
                    $("#eFinish").find(".state-1").hide();
                    getEggs(); 
                
                  }else{ 
                     
                    if(json.error===401){
                       alert("亲，非常抱歉，参与人数太多把彩蛋吓怕了，暂时抽不了奖请耐心等待。我们正努力解决...")
                    } 

                  }  
               }) 
           })
       }

       //短信订阅
      $("body").on("click", ".noteRds", function() {
        var id = $(this).data("id").toString();

        if (id.indexOf("|") > 0) {
          //sku订阅 
          var dd = id.split("|");
          sb.install({
            id: dd[0],
            sku: dd[1],
            title: "周年庆订阅早知道~",
            button: "确定订阅", //按钮
            succeed_: function(aa, bb) {
              bb.close();
              alert("订阅成功！")
            },
            false_: function(aa, bb) {

            }
          });
        } else {
          //品牌订阅              
          sb.install({
            id: id,
            title: "周年庆订阅早知道~",
            button: "确定订阅", //按钮
            succeed_: function(aa, bb) {
              bb.close();
              alert("订阅成功！")
            },
            false_: function(aa, bb) {

            }
          });

        };
      })
      
      var phone=""; 
      //领券 保存临时数据,（手机号码和活动id）
      $("body").on("click",".getTicket",function(){
         var this_=$(this);
         Global.User.passport(function() {
            var id_ = this_.data("id").toString();
            var dd = [];
            //获取手机号码
            sb.install({
              id: "0000",
              title: "领券备战周年庆",
              button: "马上领券",
              output_: function(aa, pop) {
                phone=aa;
                
                //保存临时数据
                TP.save({
                  activityId: 4411,
                  data: {
                    phone: aa,
                    id: id_
                  },
                  'callback': function(aa) {
                    //console.log(aa)
                  }
                })

                pop.close();

                //领券
                if (id_.indexOf(",") > 0) {
                  dd = id_.split(",");
                } else {
                  dd = [id_];
                }

                loginGetCoupen.get({
                  activityIds: dd
                });

                return false
              }
            })

            if(phone){
               setTimeout(function(){

                   $("body").find("#sb-noto").html("");
                   $("body").find("#sb-phone").val(phone);

               },300)
            } 
          })           
      }) 
   
  $(function(){
       $(".getTicket").click();
  })

  //彩蛋页面弹窗
  function centerDialog(opts) {


    var _this = this;
    var defautls = {
      url: '',
      image_url: '',
      identity: ''
    };
    var options = {};
    options = $.extend(defautls, opts);

    if (options.image_url == '') {
      return;
    }
    var popup = Cookie.get("popup123");

    if (options.identity == "0" || popup == options.identity) {
      return;
    }

    var linkHtml = options.url == '' ? '<img src="' + options.image_url + '" width="760" height="500" />' : '<a class="js-home-popwin" href="' + options.url + '" target="_blank" style="font-size:0;line-height:0;"><img src="' + options.image_url + '" width="760" height="500" /></a>';

    var html = '<div style="width:760px;height:500px; position:relative;background-color:#ffffff; -moz-box-shadow: 0px 0px 15px #888888;  box-shadow: 0px 0px 15px #888888">' + linkHtml + '<a href="javascript:void(0)" class="xp_close" style="width:100px; height:100px; position:absolute; top:0px; right:0px; background:url(http://cca.mbaobao.com/static/css/3.0.0/img/blank.png)"></a>' +
      '</div>';

    loadImg(new Array(options.image_url), function() {
      var time = setTimeout(function() {
        mod.close();
        Cookie.set("popup123", "have", {
          "domain": ".mbaobao.com",
          "expires": 30,
          "path": "/"
        });
      },200000);
      var mod = $.modal(html, {
        closeClass: "xp_close",
        onClose: function(dialog) {

          window.clearTimeout(time);
          Cookie.set("popup123", options.identity, {
            "domain": ".mbaobao.com",
            "expires": 30,
            "path": "/"
          });

          dialog.container.fadeOut().remove();
          dialog.overlay.hide();
          dialog.iframe && dialog.iframe.hide().remove();
          dialog.overlay.remove();

          return false
        }
      });


      $('body').on('click', '.js-home-popwin', function() {
        setTimeout(function() {
          $('#simplemodal-container .xp_close').click();
        }, 50);
      });

      $(".simplemodal-overlay").css("background", "#000000");
    });
  }

  function loadImg(files, callback){
    var load_st = 0;
    for(i=0;i<files.length;i++){
      var img=new Image()  
      img.src=files[i];  
      img.onload = function (){
        load_st++;
        if (files.length==load_st){
          callback(this);
        }
      }
    }
  };
      
  
})