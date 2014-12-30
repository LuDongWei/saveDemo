define(function(require, exports, module) {
  var $ = require("jquery");
  var SK = require("mbb/seckill/1.0.0/seckilling");
  require("seckillCss")
  var skTemplate = require("http://cca.mbaobao.com/mkts/201406/05/brand.handlebars.js?20140611");

  $(function() {
    seckill();

  })

  function seckill() {
    var activity_ = $("#brSeckill").data("id");

    var sk1 = SK.create({
      activity: activity_,
      divID: $("#brSeckill"),
      imgSize: 320,
      template: skTemplate,
      countDown: function(abc, b, c) {
        $(".countdown").html('<span class="h">' + abc.hh + '</span>' +
          '<span class="m">' + abc.mm + '</span>' +
          '<span class="s">' + abc.ss + '</span>');
      },
      returnData: function(aa) {
        isTomorrow(aa.beginTime);
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

  //判断是否是明天
  function isTomorrow(aa) {
    var day = aa.slice(7, 9);

    $.ajax({
      type: "GET",
      dataType: "jsonp",
      jsonp: "jsoncallback",
      url: "http://www.mbaobao.com/ajax/getTime?d=" + Math.floor((Math.random() * 100) + 1),
      success: function(data) {
        var H_01 = data.data.split('.')[0];
        var H_04 = H_01.slice(8, 10);
        
        if(day!==H_04){
          $("#brSeckill").find(".head").find("img").attr("src","http://cca.mbaobao.com/mkts/201406/05/mm/ms_05.png");          
        }
      }
    });
  }

})
define("seckillCss", [], function() {
  seajs.importStyle(".page_all{} .wrapper{ width:100%;}.main{width:960px;margin:0 auto;}/*--秒杀--*/.brand-seckill{width:316px;height:400px;overflow:hidden;position:relative;}.brand-seckill .head{width:316px;height:51px;}.brand-seckill .br-seckill{width:310px;height:349px;margin:0 auto;background-color:#ffffff;   }.br-seckill .br-time{font-size: 12px;text-align:center;width:168px;margin:0 auto;height:26px;padding:5px;line-height:25px;}.br-time .clock{float:left;}.br-time .clock img{vertical-align:middle;}.br-time .over{float:left;}.br-time .countdown{display:block;width:92px;height:24px;line-height:24px;background:url(http://cca.mbaobao.com/mkts/201406/05/ms_02.jpg) no-repeat top center;color:#ffffff;font-size:16px;font-weight:bolder;float:left;overflow:hidden;}.countdown span{display:block;text-align:center;float:left;}.countdown .h{width:25px;}.countdown .m{width:42px;}.countdown .s{width:25px;}.br-seckill .br-pic img{width:254px;margin:0 auto; margin-left:28px;   }.br-seckill .br-inf{overflow:hidden;height:59px;}.br-inf div{float:left;} .br-inf .in-price-1{width:123px;text-align:left;}.in-price-1 .mbbP{font-size:12px;color:#707070;margin-top:5px;padding-left:30px;}.in-price-1 .sellP{color:#e4295e;font-size:18px;font-weight:bolder;padding-left:34px;}.br-inf .in-price-2{width:92px;color:#e4295e;}.in-price-2 .sellP-2{font-weight:bolder;font-size:30px;line-height:67px;}.in-price-2 .sellP-2 span{font-size:18px;}.br-inf .in-a{width:95px;height:59px;}.brand-seckill .stoleOut .masking{position:absolute;width:310px;height:353px;top:48px;left:3px;filter:alpha(opacity=50);opacity:0.5;background-color:#666666;  }.brand-seckill .stoleOut .text{position:absolute;color:#ffffff;font-size:50px;top: 143px;left: 76px;font-weight:bolder;}")
});