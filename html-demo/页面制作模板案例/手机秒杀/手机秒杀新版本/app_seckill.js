/*  Deferred 累赘可以简化
 *  登陆后缺少判断是否已经领取（接口缺少）
 */
define(function(require, exports, module) {
  var $ = require('jquery');
  var sDate = require('http://cca.mbaobao.com/mbaobao/201404/10/fd/seckill.js');

  require("simplemodal")($);

  var app_seckill = exports;

  var defaults = {
    seckill_id: ''
  }
  var SECKillURL;


  app_seckill.begin = function(options) {
    var opts = $.extend(defaults, options || {});
    SECKillURL = 'http://m.mbaobao.com/activity/seckill/' + defaults.seckill_id + '.html';

    var kill = new Seckill();
    kill.enter();
  }


  /*---json---*/
  function sJson(parameter_, vcode_) {
    var parameter = parameter_ || "";
    var vcode = vcode_ || "";

    var dfd = new $.Deferred();
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      jsonp: "jsoncallback",
      url: SECKillURL,
      data: {
        "vcodeKey": parameter,
        "vcode": vcode
      },
      success: function(data) {
        console.log(data)
        dfd.resolve(data);
      }
    });
    return dfd.promise();
  }

  /*---弹窗---*/
  var xpCode;
  function xpSucceed() {
    $("#s-succeed").modal({
      closeClass: 'xp-close'
    })
  }

  function xpFalse() {
    $("#s-false").modal({
      closeClass: 'xp-close'
    })
  }

  function parameter(){
    var parameter_ = new Date().getTime() + Math.floor(Math.random() * 99999);
    $("#s-code").find(".mCode-img").find("img").attr("src", "http://gbmapi.mbaobao.com/picCode.jpg?unique_id=" + parameter_);
    
    return parameter_; 
  }
   

  function xpCode_() {
    var dfd = new $.Deferred();
        xpCode = $("#s-code").modal({closeClass: 'xp-close'})
    
    var parameter_=parameter();

    $(".m-submit").on("click", function() {
      var vcode_ = $("#s-code").find("#mCode-text").val();
      if (vcode_ != "") {
        dfd.notify({
          parameter: parameter_,
          vcode: vcode_
        });
        
        parameter_=parameter();
        $("#s-code").find("#mCode-text").val(""); 
      } else {
        alert("请填写验证码");
      }
    })

    return dfd.promise();
  }

  /*---秒杀---*/
  function Seckill() {
    this.button = $('.seckill_'),
    this.show = {
      longin: '<a href="/login.html?sendURL=/a-watsons2014.html" id="seckill_button" >提前注册/登陆</a>',
      countdown: '<a href="javascript:void(0)" id="seckill_button" >距下一轮开始还有<span data-id="hh" >00</span>时<span data-id="mm" >00</span>分<span data-id="ss" >00</span>秒</a>',
      seckill: '<a href="javascript:void(0)" id="seckill_button" >立即秒杀</a>',
      noseckill: '<a href="javascript:void(0)" class="bookUp" >今日已抢完</a>'
    }
  }

  Seckill.prototype = {
    /*---进入页面---*/
    enter: function() {
      if (!window.USER_ID || USER_ID === "") {
        this.button.html(this.show.longin);
      } else {
        this.isgrab();
      }
    },
    /*---是否开启---*/
    isgrab: function() {
      var _this = this;
      $.when(sJson()).then(
        function(status) {
          status.result ? _this.seckill() : _this.whatState(status.message);
        }
      );
    },
    /*---倒计时---*/
    countdown: function() {
      var time = this.button.html(this.show.countdown);
      var this_ = this;
      sDate.init({
        'seckill_id': defaults.seckill_id
      }, function(date) {
        time.find("span").each(function() {

            var type_ = $(this).data("id");
            $(this).html(date[type_]);
        })
      },function(){
         this_.isgrab();
      })      
    },
    /*---开抢---*/
    seckill: function() {
      var this_ = this;
      var seckill = this_.button.html(this_.show.seckill);

      seckill.find("#seckill_button").on('click', function(){
        $.when(xpCode_()).then(
          function(status) {},
          function(status) {},
          function(status) {
            //提交验证码
            this_.issnag(status.parameter, status.vcode);
          }
        );
      })
    },
    /*---是否抢到---*/
    issnag: function(parameter_, vcode_) {
      var this_=this;
          $(".mCode-next").find(".m-submit").html("秒杀中。。");
      $.when(sJson(parameter_, vcode_)).then(
        function(status) {                    
           status.result ?  this_.isSucceed() : this_.whatState(status.message);
          $(".mCode-next").find(".m-submit").html("下一步");
        }
      );
    },
    /*---判断是什么状态---*/
    whatState:function(message_){
        var this_=this;      
        /*
         未开始:noBegin
         已经抢完:noHave
         验证码不正确:errorCode
        */       
        //console.log(message_)
        if(message_=="noBegin"){
           this.countdown(); 
        }else if(message_=="noHave"){
          xpCode.close(); 
          xpFalse()
          this_.button.html(this_.show.noseckill);
        }else if(message_=="errorCode"){
           alert(验证码错误)
        }else{
           alert(message_)
        } 
    },
    isSucceed:function(){
        xpCode.close(); 
        xpSucceed();
        this_.button.html(this_.show.noseckill);
    }
  }
})