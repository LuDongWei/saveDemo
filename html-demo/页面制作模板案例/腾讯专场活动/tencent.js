define(function(require, exports, modules) {
  var $ = require('jquery');
  var Countdown = require("gallery/countdown/2.0.3/countdown");
  require("simplemodal")($);
  var G = require("global");
  var Region = require("mbb/region/2.0.0/region");
  var P = require("mbb/paBase/2.0.0/paBase");
  var SNAPUP_URL = 'http://www.mbaobao.com/activities/GetTimeLimitedSalesActivity';
  var seckill_main2 = [
    ['tencent_28.jpg', '50', '1', 'http://cca.mbaobao.com/mkts/201312/11/ten/tencent_41.jpg'],
    ['tencent_29.jpg', '200', '19', 'http://cca.mbaobao.com/mkts/201312/11/ten/tencent_42.jpg'],
    ['tencent_30.jpg', '300', '99', 'http://cca.mbaobao.com/mkts/201312/11/ten/tencent_43.jpg']
  ];
  var seckill_price = ['1', '19', '99'];
  var defaultsMessage = {
    email: "",
    realname: "",
    provinceId: 0,
    cityId: 0,
    districtId: 0,
    province: "",
    city: "",
    district: "",
    address: "",
    postcode: "",
    phone: "",
    mobile: ""
  }

  


  exports.tencent = function() {
    initialhtml(); //初始话
    fetchServerTime(); //倒计时
    snapup(); //秒杀商品显示
  }


  //初始页面
  var initialhtml = function() {
    var from = window.location.hash;
    isfromqq(from);

  }

  var popupaddress = false;
  //判断是否直接弹出地址(#fromqq)
  var isfromqq = function(name) {
    if (name == "#fromqq") {
      popupaddress = true;
      window.location.hash = '';
      userislogin();
    } else {
      popupaddress = false;
      if (!G.User.isLogin()) {
        return;
      } else {
        seedCoupon()
      }
    }
  }

  //判断是否登录
  var userislogin = function() {
    if (!G.User.isLogin()) {
      if (popupaddress) {
        xplogin();
      } else {
        xplogin_02();
      }
    } else {
      if (popupaddress) {
        seedCoupon();
        //登录！还要判读用户是否已经领过
        userisxpaddress(G.User.get().user_id);
      }
    }
  }


  //领地址判断
  var userisxpaddress = function(userid) {
    $.ajax({
      "type": "GET",
      "url": 'http://www.mbaobao.com/ajax/tenpayUserIsExist',
      "dataType": "jsonp",
      "jsonp": "jsoncallback",
      "data": {
        "userId": userid
      },
      "success": function(json) {
        if (json.errorcode == '1') {
          xpaddress();
        } else {
          alert("亲,你已经领取过。");
          return false;
        }
      },
      "error": function() {
        return false;
      }
    });
  }


  //送优惠劵
  var seedCoupon = function() {
    $.ajax({
      "type": "GET",
      "url": 'http://www.mbaobao.com/coupon/apply',
      "dataType": "jsonp",
      "jsonp": "jsoncallback",
      "data": {
        "activity_id": 3766
      },
      "success": function(json) {

      },
      "error": function() {
        return;
      }
    });
    $.ajax({
      "type": "GET",
      "url": 'http://www.mbaobao.com/coupon/apply',
      "dataType": "jsonp",
      "jsonp": "jsoncallback",
      "data": {
        "activity_id": 3765
      },
      "success": function(json) {

      },
      "error": function() {
        return;
      }
    });

    $('.check_coupon').text($('.check_coupon').data('name'));
  }

  //正常登录
  var xplogin_02 = function() {
    $("#personal_register_02").modal({
      closeClass: 'xp_right'
    });
  }

  //弹出登录框(下一步是地址)
  var xplogin = function() {
    $("#personal_register").modal({
      closeClass: 'xp_right'
    });
  }


  //地址的填写
  var xpaddress = function() {
    personal_box(); //地址填写
    $("#personal_address").modal({
      closeClass: 'xp_right',
      onClose: function() {
        $.modal.close();
        $('#span_region_linkage').html('');
      }
    });
  }

  //同时领取优惠劵
  var leadCoupon = function() {
    G.User.passport(
      function() {
        P.loginGetCoupen.get(3766);
      }
    );
    G.User.passport(
      function() {
        P.loginGetCoupen.get(3765);
      }
    );
  }

  //领ipad
  $('#click_ipad').click(function() {
    isfromqq('#fromqq');
    return false;
  })

  //领优惠劵
  $('#click_coupon_now').click(function() {
    if (!G.User.isLogin()) {
      //没登录
      xplogin_02();
    } else {
      leadCoupon();
    }
    return false
  })

  //查看优惠劵
  $('.check_coupon').click(function() {
    if (!G.User.isLogin()) {
      //没登录
      xplogin_02();
      return false
    } else {

    }
  })

  //注册详情
  $('#click_details_01').click(function() {
    $("#xp_details_01").modal({
      closeClass: 'xp_right'
    });
    return false
  })

  //订单详情
  $('#click_details_02').click(function() {
    $("#xp_details_02").modal({
      closeClass: 'xp_right'
    });
    return false
  })



  //秒杀商品显示
  //获取接口数据
  var snapup = function() {
    $.ajax({
      "type": "GET",
      "url": SNAPUP_URL,
      "dataType": "jsonp",
      "jsonp": "jsoncallback",
      "data": {
        "activityId": 3900
      },
      "success": function(json) {
        // console.log(json);
        // console.log(json.data.length);                 
        if (json.data.length == '0') {
          errorhtml();
        } else {
          ifgrab(json.data);
        }
      },
      "error": function() {
        errorhtml();
      }
    });
  }

  //遍历接口数据 
  var ifgrab = function(data) {
    var html = '';
    for (var i = 0; i < seckill_price.length; i++) {
      for (var n = 0; n < data.length; n++) {
        if (seckill_price[i] == data[n].promotion_price) {
          if (data[n].saleable_qty > 0) {
            html = html + html_have(seckill_main2[i], data[n]);
          } else {
            html = html + html_none(seckill_main2[i]);
          }
          break;
        }
        if (n == data.length - 1) {
          html = html + html_none(seckill_main2[i]);
          break;

        }
      }
    }
    $('.M_postal_goods').html(html);
  }

  //当接口错误或毫无数据时
  var errorhtml = function() {
    var html = html_none(seckill_main2[0]) + html_none(seckill_main2[1]) + html_none(seckill_main2[2]);
    $('.M_postal_goods').html(html);
  }

  //无货(抢光了)
  var html_none = function(data) {
    var html = '<li class="M_postal_good">' +
      '<div class="M_postal_good_none">' +
      '&nbsp;抢光了!' +
      '</div>' +
      '<div class="p_head">' +
      '<img src="http://cca.mbaobao.com/mkts/201312/11/ten/' + data[0] + '"></div>' +
      '<div class="p_img">' +
      '<a href="http://www.mbaobao.com/item/#" target="_blank"><img src=' + data[3] + '>' +
      '</a>' +
      '</div>' +
      '<div class="p_buy">' +
      '<ul>' +
      '<li class="p_buy_number">' +
      '<p class="num">限量' + data[1] + '个</p>' +
      '<p class="tag">抢购价</p>' +
      '</li>' +
      '<li class="p_buy_price">' +
      '<p>' +
      '<span class="un">￥</span>' +
      '<span class="num">' + data[2] + '</span>' +
      '</p>' +
      '</li>' +
      '<li class="p_buy_button">' +
      '<a href="http://cart.mbaobao.com/do/items/add/#/1.html" target="_blank"><img src="http://cca.mbaobao.com/mkts/201312/11/ten/tencent_32.jpg">' +
      '</a></li>' +
      '</ul>' +
      '</div>' +
      '</li>';
    return html;
  }

  //有货
  var html_have = function(data, data2) {
    var html = '<li class="M_postal_good">' +
      '<div class="p_head">' +
      '<img src="http://cca.mbaobao.com/mkts/201312/11/ten/' + data[0] + '"></div>' +
      '<div class="p_img">' +
      '<a href="http://www.mbaobao.com/item/' + data2.sku + '" target="_blank"><img src=' + data2.imgs.img_420 + '>' +
      '</a>' +
      '</div>' +
      '<div class="p_buy">' +
      '<ul>' +
      '<li class="p_buy_number">' +
      '<p class="num">限量' + data[1] + '个</p>' +
      '<p class="tag">抢购价</p>' +
      '</li>' +
      '<li class="p_buy_price">' +
      '<p>' +
      '<span class="un">￥</span>' +
      '<span class="num">' + data[2] + '</span>' +
      '</p>' +
      '</li>' +
      '<li class="p_buy_button">' +
      '<a href="http://cart.mbaobao.com/do/items/add/' + data2.sku + '/1.html" target="_blank"><img src="http://cca.mbaobao.com/mkts/201312/11/ten/tencent_32.jpg">' +
      '</a></li>' +
      '</ul>' +
      '</div>' +
      '</li>';
    return html;
  }

  //地址检测(提取数据-遍历数组-验证正确-错误错误显示-正确提交)
  //提取数据
  $('#personal_box_submit').click(function() {
    getMessage();
    return false;
  })

  //获取数据
  var getMessage = function() {
    defaultsMessage.email = $('#input_email').val();
    defaultsMessage.realname = $('#input_name').val();
    defaultsMessage.provinceId = $('#input_provinceId').val();
    defaultsMessage.cityId = $('#input_cityId').val();
    defaultsMessage.districtId = $('#input_districtId').val();
    defaultsMessage.province = $('#input_province').val();
    defaultsMessage.city = $('#input_city').val();
    defaultsMessage.district = $('#input_district').val();
    defaultsMessage.address = $('#input_comments').val();
    defaultsMessage.postcode = $('#input_postcode').val();
    defaultsMessage.phone = $('#input_phone_01').val() + '-' + $('#input_phone_02').val() + '-' + $('#input_phone_03').val();
    defaultsMessage.mobile = $('#input_telephone').val();

    var error = judgeMessage(defaultsMessage);

    if (error == undefined) {
      Submitdata(defaultsMessage);
      $('.xp_right').click(); //关闭弹窗
    } else {
      $('.xp_popup_error').text(error.error);
    }
  }

  $('.personal_box').click(function() {
    $('.xp_popup_error').text('');
  })

  var Submitdata = function(data) {


    $.ajax({
      "type": "GET",
      "url": 'http://www.mbaobao.com/ajax/tenpay',
      "dataType": "jsonp",
      "jsonp": "jsoncallback",
      "data": {
        "realname": data.realname,
        "provinceId": data.provinceId,
        "cityId": data.cityId,
        "districtId": data.districtId,
        "province": data.province,
        "city": data.city,
        "district": data.district,
        "address": data.address,
        "postcode": data.postcode,
        "phone": data.phone,
        "mobile": data.mobile,
        "email": data.email
      },
      "success": function(json) {
        isSubmitdata(json.errorcode);
      },
      "error": function() {
        alert(3)
      }
    });
  }

  var abc_ = null;
  //判断返回值
  var isSubmitdata = function(data) {
    if (data == '0') {
      abc_ = $("#personal_address_right").modal({
        closeClass: 'xp_right'
      });

    } else {
      return;
    }
  }

  $('#personal_address_right_down').click(function() {
    abc_.close();
  })


  //判断是否符合规则
  var judgeMessage = function(attrs) {
    if (attrs.realname === "") {
      return {
        error_code: 400,
        error: "请填写收货人姓名"
      };
    }
    if (attrs.provinceId === "" || attrs.cityId === "" || attrs.districtId === "") {
      return {
        error_code: 400,
        error: "请选择省市区"
      };
    }
    if (attrs.address === "") {
      return {
        error_code: 400,
        error: "请正确填写详细地址"
      };
    }
    if (attrs.address && attrs.address.indexOf("*") >= 0) {
      return {
        error_code: 400,
        error: "详细地址中不能使用\"*\"号"
      };
    }
    if (attrs.postcode === "") {
      return {
        error_code: 400,
        error: "请填写邮政编码"
      };
    }


    if (attrs.email !== "" && !isEmail(attrs.email)) {
      return {
        error_code: 400,
        error: "请正确填写收件邮箱"
      };
    }

    if (attrs.realname && attrs.realname.indexOf("*") >= 0) {
      return {
        error_code: 400,
        error: "收货人中不能使用\"*\"号"
      };
    }
    if (attrs.address && attrs.address.indexOf("*") >= 0) {
      return {
        error_code: 400,
        error: "详细地址中不能使用\"*\"号"
      };
    }

    if (attrs.phone === "--" && attrs.mobile === "") {
      return {
        error_code: 400,
        error: "手机和固定电话必须填写一项，固定电话格式：区号-电话号码-分机号"
      };
    }

    if (attrs.mobile !== "" && !/^[1][3458]\d{9}$/.test(attrs.mobile)) {
      return {
        error_code: 400,
        error: "请输入有效的手机号码"
      };
    }
  }

  var isEmail = function(input) {
    return (/^[\w\.\-]{1,}[@][\w\-]{1,}([.]([\w\-]{2,})){1,3}$/).test(input);
  }


  //地址信息的填写
  var personal_box = function() {
    var myRegion = new Region({
      source: G.Config.domains("WWW_URL") + "ajax/region",
      target: "#span_region_linkage",
      inputId: ["input_provinceId", "input_cityId", "input_districtId"]
    });

    myRegion.init();

    myRegion.on("selected", function(data) {
      if (!data) {
        return;
      }
      if (data.type === "province") {
        $("#input_postcode", self.el).val("");
      }
      if (data.type === "city") {
        $("#input_postcode", self.el).val(data.postCode !== "" ? data.postCode : "");
      }
      $("#input_" + data.type, self.el).val(data.name);

    });
  }


  //悬浮
  $(window).scroll(function() {
    var win_top = $(document).scrollTop();
    if (win_top >= 400) {
      $('#xp_ball_bb').find('img').slideDown();
    } else {
      $('#xp_ball_bb').find('img').slideUp();
    }
  })

  //每天3场10:00/15:00/20:00,计算还剩下的时间.
  //获取服务器时间
  var fetchServerTime = function() {
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

        var time = new Date(H_02, H_03 - 1, H_04, H_05, H_06, H_07);
        Countdowntime(time.getTime());
      },
      error: function() {
        //失败        
      }
    });
  }

  //使用时间戳判断9点15点的距离
  var Countdowntime = function(time) {
    var nowtime = time / 1000 % 86400 + 8 * 3600; //今天已经过的时间
    var yesttime = time - nowtime * 1000; //上一天
    var counttime; //到计时时间
    if (nowtime < 10 * 3600) {
      counttime = yesttime + 10 * 3600 * 1000;
    } else if (10 * 3600 <= nowtime && nowtime < 15 * 3600) {
      counttime = yesttime + 15 * 3600 * 1000;
    } else if (15 * 3600 <= nowtime && nowtime < 20 * 3600) {
      counttime = yesttime + 20 * 3600 * 1000;
    } else {
      counttime = yesttime + 38 * 3600 * 1000;
    }
    Countdownhtml(counttime);
  }


  //倒计时显示ie不兼容的问题
  var Countdownhtml = function(counttime) {
    var date = new Date(counttime);
    var data2 = formatDate(date);


    new Countdown(data2, function(abc) {
      //进行倒计时
      $('#M_seckill_time').html(abc.hh + ':' + abc.mm + ':' + abc.ss)
    }, function() {
      //倒计时完成
      snapup();
    });
  }

  //解析时间
  var formatDate = function(now) {
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    month < 10 ? month = '0' + month : month = month;
    date < 10 ? date = '0' + date : date = date;
    hour < 10 ? hour = '0' + hour : hour = hour;
    minute < 10 ? minute = '0' + minute : minute = minute;
    second < 10 ? second = '0' + second : second = second;
    return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;
  }


})