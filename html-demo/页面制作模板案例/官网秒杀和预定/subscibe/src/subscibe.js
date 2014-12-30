/* 官网短信订阅插件 by douban 
 * @example
 * SB.install({
 *     id:"1",
 *     sku:"22",
 *     succeed_:function(aa,bb){
 *       bb.close();
 *     }
 * })
 * @support
 * jquery  simplemodal
 */
define(function(require, exports, module) {
  var $ = require("jquery");
  require("simplemodal")($);
  require("./subscibe.css");

  var subscibe = exports;

  var sbObject = {
    id: "", //id编号(必) 
    sku: "", //商品sku(必)
    bkClose: "#fdd131", //背景颜色
    maClose: "#40316a", //主题颜色
    title: "秒杀开始提醒", //标题
    input: "请输入手机号码", //提示
    inputWarn: "手机号码不正确", //错误提示
    button: "开始提醒我", //按钮
    regular: /^[1][3-8]\d{9}/, //检测正则
    succeed_: function(tit, modal) {},  //成功返回  modal.close(); 关闭弹窗
    false_: function(tit, modal) {}     //失败返回                  
  }

  var SUBURL = "http://www.mshop.cn/ajax/SendSmsSubscribe";

  var sbObject2 = null;
  subscibe.install = function(options) {
    var opts = $.extend(sbObject, options || {});

    var this_ = null;
    var click_ = true;

    var pop = $.modal(createHtml(), {
      closeClass: "cl-i",
      onShow: function(aa) {
        this_ = aa.container;

        aa.container.find(".m-text").on("click", function() {
          $(this).find("#sb-phone").focus();

          return false;
        })

        aa.container.find("#sb-phone").on("keyup", function() {
          var va = $(this).val();
          if (va === "") {
            this_.find("#sb-noto").html(sbObject.input).removeClass("warn").css({
              "z-index": "999"
            });
          } else {
            this_.find("#sb-noto").css({
              "z-index": "997"
            });
          }
        })
      }


    })

    this_.find("#sb-submit").on("click", function() {
      if (click_) {
        click_ = false;
        var phone = this_.find("#sb-phone").val();

        if (sbObject.regular.test(phone)) {
          sendAjax(sbObject.id, phone, sbObject.sku).done(function(data) {
            if (data.success === "1") {
              sbObject.succeed_("成功", pop);
            } else {
              sbObject.false_(data.msg, pop);
            }
            click_ = true;
          })
        } else {

          this_.find("#sb-phone").val("");
          shakeForm(this_.find("#sb-phone"));
          $("#sb-noto").html(sbObject.inputWarn).addClass("warn").css({
            "z-index": "999"
          });

          setTimeout(function() {
            $("#sb-noto").css({
              "z-index": "997"
            });
            this_.find("#sb-phone").val(phone);
            click_ = true;
          }, 500)
        }
      }
    })

  }


  function createHtml() {
    var html = '<div class="sb-content" id="subscibe" style="background-color:' + sbObject.bkClose + ';" >' +
      '<div class="sb-head">' +
      '<div class="sb-name" style="color:' + sbObject.maClose + ';">' + sbObject.title + '</div>' +
      '<div class="sb-close">' +
      '<i class="cl-i" style="background-color:' + sbObject.maClose + ';">X' +
      '</i>' +
      '</div>' +
      '</div>' +
      '<div class="sb-content">' +
      '<div class="sb-main">' +
      '<div class="m-text">' +
      '<label for="sb-phone" class="sb-hint default" id="sb-noto" >' + sbObject.input + '</label>' +
      '<input type="text" class="in-1" id="sb-phone" autofocus >' +
      '</div>' +
      '<div class="m-submit" >' +
      '<input type="submit" class="in-2" id="sb-submit" value="' + sbObject.button + '" style="background-color:' + sbObject.maClose + '; color:' + sbObject.bkClose + ';">' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
    return html;
  }

  function sendAjax(id_, mo_, tag_) {
    return $.ajax({
      url: SUBURL,
      type: 'get',
      dataType: 'jsonp',
      jsonp: 'jsoncallback',
      data: {
        id: id_,
        mobile: mo_,
        tag: tag_
      }
    })
  }

  // 原地抖动函数
  function shakeForm(dom) {
    var p = "5 10 5 0 -5 -10 -5 0".split(" ");
    var set = function(n) {
      var delay = 20;
      setTimeout(function() {
        dom.css("left", p[n] + "px");
      }, delay * n);
    }
    for (var i = 0; i < p.length; i++) {
      set(i);
    }
  }

})
