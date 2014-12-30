/* 官网员工专享页面
 * 1.点赞  (需要活动号) 
 * 2.获取对应块评论信息
 * 3.当前块评论
 * 4.叫他回来认领
 */
define(function(require, exports, module) {
  var $ = require("jquery"),
    Global = require("global"),
    guestbook = require("mbb/guestbook/1.0.0/guestbook"),
    sb=require("mbb/subscibe/1.0.0/subscibe"),
    TP = require("mbb/tempData/1.0.0/tempData");

  require("simplemodal")($);

  var GETCONURL = "http://www.mbaobao.com/activities/GetConsultation";
  var PHONEURL="http://www.mbaobao.com/Activities/SendActivitiesSms";

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

  $(function() {
    // initialize();

    // getPraise();

    // signIn();

   alert(2)

     TP.save({
                activityId: 4587,
                data: {
                  acId: acId_
                },
                'callback': function(aa) {
                    alert(1)
                }
              })
  })


  //页面初始化显示
  function initialize() {
    var moreId = "";

    $("body").find("#mComment").each(function() {
      var id = $(this).data("id");
      moreId = moreId + id + ",";
    })

    Ajax(GETCONURL, {
      pageindex: 1,
      pagecount: 1,
      activityid: moreId
    }, function(json) {

      if (json) {
        $("body").find("#mComment").each(function() {
          var id = $(this).data("id"),
            data = [];
          if (json[id]) {
            data = json[id]['data'];
              if (data) {
                var html = '<dl>' +
                  '<dt class="account">' +
                  '<div class="acc-r">' +
                  '<div class="name">' + data[0]['username'] + '</div>' +
                  '<div class="time">' + data[0]['created'] + '</div>' +
                  '</div>' +
                  '</dt>' +
                  '<dd class="comment">' +
                  '<p>' + data[0]['ccontent'] + '</p>' +
                  '</dd>' +
                  '</dl>';

                $(this).find(".com-inf").html(html);
              }
          }

        })
      }

    })
  }

  //获取赞的数量
  function getPraise() {
    var data = [];

    TP.fetch({
      activityId: 4587,
      field1: {},
      field2: {},
      'callback': function(aa) {
        data = aa.list;

        $("body").find("#mComment").each(function() {
          var id = $(this).data("id"),
            n = amount(data, id);


          $(this).find("#linkCount").find("span").html(n)
        })
      }
    })
  }

  function amount(data_, id_) {
    var n = 0;

    for (var i = 0; i < data_.length; i++) {
      if (data_[i]['tmp_value']['acId'] == id_) {
        n++
      }
    };

    return n
  }


  //点赞
  $("body").on("click","#linkCount",function(){
         var this_ = $(this); 

       Global.User.passport(function() {
        var acId_ = this_.data("id");

        var userId_ = Global.User.get("user_id");

        //判断当前用户是否已经点过赞
        TP.fetch({
          activityId: 4587,
          field1: {
            user_id: userId_
          },
          field2: {
            acId: acId_ + ''
          },
          'callback': function(aa) {

            if (!(aa.list) || aa.list.length === 0) {

              TP.save({
                activityId: 4587,
                data: {
                  acId: acId_
                },
                'callback': function(aa) {

                }
              })

               var star = parseInt(this_.find("span").html(), 10);
                this_.find("span").html(star + 1);
                this_.addClass('l-star');

            } else {

              alert("您已经点过赞奥")

            }
          }
        })

      })


  }) 


  //弹框输入框
  $("body").find("#mComment").find(".com-pic").each(function(){
          $(this).on("click",function(){
             var this_=$(this)
              Global.User.passport(function() {
                compop(this_);
              })
          })
  }) 

  $("body").find("#mComment").find(".com-inf").each(function(){
          $(this).on("click",function(){
             var this_=$(this);
             Global.User.passport(function() { 
               compop(this_);
             }) 
          })
  }) 

  

  function compop(this_){  
     
     var tt=this_.closest("#mComment");

     var id_ = tt.data("id"),
         pic = tt.find(".com-pic").html(),
         link =tt.find(".com-praise").html();

        var pop = $("#comPop");

        pop.find(".com-pic").html(pic);
        pop.find(".com-praise").html(link);
        
        guestbook.init({
          activityId: id_,
          post_el: ".r-pop-post",
          list_el: ".r-pop-list",
          post_txt: "亲，内容不呢为空呢",
          page: 4
        })

        $("body").find("#gb-list-start").attr("id","top")

         $("#comPop").modal({
           closeClass: 'xp-close'
         })
  } 


  //签到
  function signIn(){
    TP.fetch({
      activityId: 4588,
      field1: {},
      field2: {},
      'callback': function(aa) {
          $(".sign-in").find("span").html(aa.list.length)
      }
    })
  }

  $("#signIn").on("click",function(){
       var this_=$(".sign-in");

       Global.User.passport(function() {
          var userId_ = Global.User.get("user_id");

          //判断是否签过到
          TP.fetch({
            activityId: 4588,
            field1: {
              user_id: userId_
            },
            'callback': function(aa) {
              
              if (!(aa.list) || aa.list.length === 0) {

                TP.save({
                  activityId: 4588,
                  data: {
                     acId: '20140902'
                  },
                  'callback': function(aa) {
                    
                  } 
                })

                var star = parseInt(this_.find("span").html(), 10);

                  this_.find("span").html(star + 1);

              } else {

                alert("您已经签到过奥")

              }
            }
          })
       })
  })


  //手机号码发短信
  $(".link-get").on("click",function(){
    Global.User.passport(function() {
      sb.install({
              id: "0000",
              title: "输入麦宝手机号，让他回来看看那时的他！",
              button: "呼叫",
              output_: function(aa, pop) {
                var phone=aa;
                
                Ajax(PHONEURL,{
                     mobiles:phone,
                     activityid:'a4b61a90927d00fa6893a2f22b531396'
                },function(json){
                     alert(json.message)

                     pop.close();
                })   
              }
       })
     }) 
  })


})