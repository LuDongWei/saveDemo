define(function(require, exports, module){
      var $=require("jquery");
      var Countdown = require("gallery/countdown/2.0.3/countdown");
      require('jquery-plugin/idtabs/3.0.0/idtabs')($);
      var data_time_today='20140105';
      var data_time_tomrrow="20140106";
      var app_seckill_head=['http://cca.mbaobao.com/mkts/201401/05/appmiao/tomorrow/tomorrow_01.jpg?2013','http://cca.mbaobao.com/mkts/201401/05/appmiao/tomorrow/tomorrow_02.jpg?2013','http://cca.mbaobao.com/mkts/201401/05/appmiao/tomorrow/tomorrow_03.jpg?2013'];
      var app_seckill_href=['tab_01','tab_02','tab_03']
      var app_seckill_href_02=['tab_04','tab_05','tab_06']
      var app_seckill_time=['2014年month月day日 09:00开抢','2014年month月day日 15:00开抢','2014年month月day日 21:00开抢']
      var app_seckill_button=[]
      var app_seckill_number=null;
      var app_seckill_numberold=null; 
      var app_seckill_button_html=['<span  class="ml-btn-19 app_seckill_goods_button_01" >即将开始....</span>',
                                   '<span  class="ml-btn-19 app_seckill_goods_button_02" >已抢完！</span>',
                                   '<a href="#" class="ml-btn-19 app_seckill_goods_button_03" id="seckill_click" >点击抢购>></a>']                
    
      var data_seckill={
      '20140106':[['1207019801','158',
      'http://mobimage.mbbimg.cn/sku/1207019801-1-500-500.jpg'],
      ['1309002901','428',
      'http://mobimage.mbbimg.cn/sku/1309002901-1-500-500.jpg'],
      ['1409008701','332',
      'http://mobimage.mbbimg.cn/sku/1409008701-1-500-500.jpg']],

      '20140107':[['1201028402','358',
      'http://mobimage.mbbimg.cn/sku/1201028402-1-500-500.jpg'],
      ['1411003502','538',
      'http://mobimage.mbbimg.cn/sku/1411003502-1-500-500.jpg'],
      ['1409009101','332',
      'http://mobimage.mbbimg.cn/sku/1409009101-1-500-500.jpg']],

      '20140108':[['1207019801','158',
      'http://mobimage.mbbimg.cn/sku/1207019801-1-500-500.jpg'],
      ['1309002901','428',
      'http://mobimage.mbbimg.cn/sku/1309002901-1-500-500.jpg'],
      ['1409007701','497',
      'http://mobimage.mbbimg.cn/sku/1409007701-1-500-500.jpg']],

      '20140109':[['10902301','98',
      'http://mobimage.mbbimg.cn/sku/10902301-1-500-500.jpg'],
      ['1403002701','358',
      'http://mobimage.mbbimg.cn/sku/1403002701-1-500-500.jpg'],
      ['1409007901','497',
      'http://mobimage.mbbimg.cn/sku/1409007901-1-500-500.jpg']],

      '20140110':[['1201028401','138',
      'http://mobimage.mbbimg.cn/sku/1201028401-1-500-500.jpg'],
      ['1409002502','436',
      'http://mobimage.mbbimg.cn/sku/1409002502-1-500-500.jpg'],
      ['1409008401','563',
      'http://mobimage.mbbimg.cn/sku/1409008401-1-500-500.jpg']],

      '20140111':[['1207022401','138',
      'http://mobimage.mbbimg.cn/sku/1207022401-1-500-500.jpg'],
      ['1409002904','498',
      'http://mobimage.mbbimg.cn/sku/1409002904-1-500-500.jpg'],
      ['1409007501','497',
      'http://mobimage.mbbimg.cn/sku/1409007501-1-500-500.jpg']],

      '20140112':[['1304015701','138',
      'http://mobimage.mbbimg.cn/sku/1304015701-1-500-500.jpg'],
      ['1410000103','578',
      'http://mobimage.mbbimg.cn/sku/1410000103-1-500-500.jpg'],
      ['1409008001','497',
      'http://mobimage.mbbimg.cn/sku/1409008001-1-500-500.jpg']],

      '20140113':[['1407006202','128',
      'http://mobimage.mbbimg.cn/sku/1407006202-1-500-500.jpg'],
      ['1409002904','498',
      'http://mobimage.mbbimg.cn/sku/1409002904-1-500-500.jpg'],
      ['1409008001','497',
      'http://mobimage.mbbimg.cn/sku/1409008001-1-500-500.jpg']],

      '20140114':[['1307003901','138',
      'http://mobimage.mbbimg.cn/sku/1307003901-1-500-500.jpg'],
      ['1411003901','658',
      'http://mobimage.mbbimg.cn/sku/1411003901-1-500-500.jpg'],
      ['1410006801','447',
      'http://mobimage.mbbimg.cn/sku/1410006801-1-500-500.jpg']],

      '20140115':[['1201028401','138',
      'http://mobimage.mbbimg.cn/sku/1201028401-1-500-500.jpg'],
      ['1409012502','728',
      'http://mobimage.mbbimg.cn/sku/1409012502-1-500-500.jpg'],
      ['1409008001','497',
      'http://mobimage.mbbimg.cn/sku/1409008001-1-500-500.jpg']],

      '20140116':[['10902301','98',
      'http://mobimage.mbbimg.cn/sku/10902301-1-500-500.jpg'],
      ['1409012901','458',
      'http://mobimage.mbbimg.cn/sku/1409012901-1-500-500.jpg'],
      ['1409007901','497',
      'http://mobimage.mbbimg.cn/sku/1409007901-1-500-500.jpg']],

      '20140117':[['1201028401','138',
      'http://mobimage.mbbimg.cn/sku/1201028401-1-500-500.jpg'],
      ['1403002701','358',
      'http://mobimage.mbbimg.cn/sku/1403002701-1-500-500.jpg'],
      ['1409007901','497',
      'http://mobimage.mbbimg.cn/sku/1409007901-1-500-500.jpg']],

      '20140118':[['1201028401','138',
      'http://mobimage.mbbimg.cn/sku/1201028401-1-500-500.jpg'],
      ['1409002502','436',
      'http://mobimage.mbbimg.cn/sku/1409002502-1-500-500.jpg'],
      ['1409008401','563',
      'http://mobimage.mbbimg.cn/sku/1409008401-1-500-500.jpg']],

      '20140119':[['1207022401','138',
      'http://mobimage.mbbimg.cn/sku/1207022401-1-500-500.jpg'],
      ['1409002904','498',
      'http://mobimage.mbbimg.cn/sku/1409002904-1-500-500.jpg'],
      ['1409007501','497',
      'http://mobimage.mbbimg.cn/sku/1409007501-1-500-500.jpg']],

      '20140120':[['1304015701','138',
      'http://mobimage.mbbimg.cn/sku/1304015701-1-500-500.jpg'],
      ['1410000103','578',
      'http://mobimage.mbbimg.cn/sku/1410000103-1-500-500.jpg'],
      ['1409008001','497',
      'http://mobimage.mbbimg.cn/sku/1409008001-1-500-500.jpg']],

      '20140121':[['1407006202','128',
      'http://mobimage.mbbimg.cn/sku/1407006202-1-500-500.jpg'],
      ['1409002904','498',
      'http://mobimage.mbbimg.cn/sku/1409002904-1-500-500.jpg'],
      ['1409008001','497',
      'http://mobimage.mbbimg.cn/sku/1409008001-1-500-500.jpg']],

      '20140122':[['1307003901','138',
      'http://mobimage.mbbimg.cn/sku/1307003901-1-500-500.jpg'],
      ['1411003901','658',
      'http://mobimage.mbbimg.cn/sku/1411003901-1-500-500.jpg'],
      ['1410006801','447',
      'http://mobimage.mbbimg.cn/sku/1410006801-1-500-500.jpg']],

      '20140123':[['1201028401','138',
      'http://mobimage.mbbimg.cn/sku/1201028401-1-500-500.jpg'],
      ['1409012502','728',
      'http://mobimage.mbbimg.cn/sku/1409012502-1-500-500.jpg'],
      ['1409008001','497',
      'http://mobimage.mbbimg.cn/sku/1409008001-1-500-500.jpg']],

      '20140124':[['10902301','98',
      'http://mobimage.mbbimg.cn/sku/10902301-1-500-500.jpg'],
      ['1409012901','458',
      'http://mobimage.mbbimg.cn/sku/1409012901-1-500-500.jpg'],
      ['1409007901','497',
      'http://mobimage.mbbimg.cn/sku/1409007901-1-500-500.jpg']],

      '20140125':[['1307003901','138',
      'http://mobimage.mbbimg.cn/sku/1307003901-1-500-500.jpg'],
      ['1403002701','358',
      'http://mobimage.mbbimg.cn/sku/1403002701-1-500-500.jpg'],
      ['1409007901','497',
      'http://mobimage.mbbimg.cn/sku/1409007901-1-500-500.jpg']],

      '20140126':[['1201028401','138',
      'http://mobimage.mbbimg.cn/sku/1201028401-1-500-500.jpg'],
      ['1409002502','436',
      'http://mobimage.mbbimg.cn/sku/1409002502-1-500-500.jpg'],
      ['1409008401','563',
      'http://mobimage.mbbimg.cn/sku/1409008401-1-500-500.jpg']]}
      
      exports.appseckill=function(){
          //if(USER_ID==''){
          // //跳转登录 
          //     window.location.href="/login.html"
          //}
          fetchServerTime();

          if(drive=="app"){
              $("body").append('<script src="http://s22.cnzz.com/stat.php?id=4999664&web_id=4999664" language="JavaScript" async></script>')
          }
      }

     //每天3场09:00/15:00/21:00,计算还剩下的时间.
	   //获取服务器时间
     var fetchServerTime=function(){
      	 $.ajax({
            type: "GET",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: "http://m.mbaobao.com/activity/seckillTime/3795.html",
            success: function (data) {
               var nowtime=data.data.currentTime;
               var seckilltime=data.data.seckillingTimes;

               var H_01=nowtime.split('.')[0];
               var H_02=H_01.slice(0,4);
               var H_03=H_01.slice(5,7);
               var H_04=H_01.slice(8,10);

               var H_05=H_01.slice(11,13);
               var H_06=H_01.slice(14,16);
               var H_07=H_01.slice(17,19);

              
			         var time=new Date(H_02,H_03-1,H_04,H_05,H_06,H_07);
			         data_time_today=H_02+H_03+H_04;              //记录时间今天
               data_time_tomrrow=new Number(H_02+H_03+H_04)+1;//明天

              //Countdowntime(time.getTime());     //秒杀
			   
               app_seckill_time_change(H_03,H_04);//日期显示

               seckillbegin(nowtime,seckilltime); //判断时间段显示
			         seckilltomrrow();                  //明天包的显示
           
            },
            error: function () {
                //失败				
            }
        });
     }
     
     //购买时间显示
     var app_seckill_time_change=function(month,day){
         var mouth_=new Number(month)
         var day_=new Number(day)
         
         var app_seckill_time_=[];
         for (var i = 0; i < app_seckill_time.length; i++) {
           app_seckill_time_.push(app_seckill_time[i].replace('month',mouth_).replace('day',day_))
         };
        app_seckill_time=app_seckill_time_
     }
    

    //解析string时间（兼容） 
    var  analysistime=function(time){         
               var H_01=time.split('.')[0];
               var H_02=H_01.slice(0,4);
               var H_03=H_01.slice(5,7);
               var H_04=H_01.slice(8,10);

               var H_05=H_01.slice(11,13);
               var H_06=H_01.slice(14,16);
               var H_07=H_01.slice(17,19);
          return new Date(H_02,H_03-1,H_04,H_05,H_06,H_07)             
     } 

     //判断
     var seckillbegin=function(nowtime,seckilltime){
         var T_now=analysistime(nowtime).getTime();
         var T_seckill_01=analysistime(seckilltime[0]).getTime();
         var T_seckill_02=analysistime(seckilltime[1]).getTime();
         var T_seckill_03=analysistime(seckilltime[2]).getTime();
    
           if(T_now<T_seckill_01){
                   app_seckill_button=[app_seckill_button_html[0],app_seckill_button_html[0],app_seckill_button_html[0]]
                   app_seckill_number=123;
            }else if(T_seckill_01<=T_now&&T_now<T_seckill_02){
                   app_seckill_button=[app_seckill_button_html[2],app_seckill_button_html[0],app_seckill_button_html[0]]
                   app_seckill_number=0;
            }else if(T_seckill_02<=T_now&&T_now<T_seckill_03){
                   app_seckill_button=[app_seckill_button_html[1],app_seckill_button_html[2],app_seckill_button_html[0]]
                   app_seckill_number=1;
            }else{
                   app_seckill_button=[app_seckill_button_html[1],app_seckill_button_html[1],app_seckill_button_html[2]]
                   app_seckill_number=2;  
            }
         
       setInterval(function(){
            if(T_now<T_seckill_01){
                   app_seckill_button=[app_seckill_button_html[1],app_seckill_button_html[0],app_seckill_button_html[0]]
                   app_seckill_number=123;
                   app_count_down(T_seckill_01-T_now)
            }else if(T_seckill_01<=T_now&&T_now<T_seckill_02){
                   app_seckill_button=[app_seckill_button_html[2],app_seckill_button_html[0],app_seckill_button_html[0]]
                   app_seckill_number=0;
                   app_count_down(T_seckill_02-T_now)
                   if(T_seckill_01==T_now){seckilltoday(); withoutseckill();}
            }else if(T_seckill_02<=T_now&&T_now<T_seckill_03){
                   app_seckill_button=[app_seckill_button_html[1],app_seckill_button_html[2],app_seckill_button_html[0]]
                   app_seckill_number=1;
                   app_count_down(T_seckill_03-T_now)
                   if(T_seckill_02==T_now){seckilltoday(); withoutseckill();}
            }else{
                   app_seckill_button=[app_seckill_button_html[1],app_seckill_button_html[1],app_seckill_button_html[2]]
                   app_seckill_number=2;
                   app_count_down((T_seckill_03+12*3600*1000)-T_now) 
                   if(T_seckill_03==T_now){seckilltoday(); withoutseckill();} 
            }
            T_now=T_now+1000;         
            
         },1000)
         seckilltoday();
         withoutseckill(); 
     }

     //倒计时
     var app_count_down=function(time_){
         var day=parseInt(time_/1000/ 3600 / 24,10);
         var hour=parseInt(time_/1000/ 3600 % 24,10);
         var minute=parseInt(time_/1000/ 60 % 60,10);
         var second=parseInt(time_/1000 % 60,10);

         day=(day < 10 ? "0" : "") + day;
         hour=(hour < 10 ? "0" : "") + hour;
         minute=(minute < 10 ? "0" : "") + minute;
         second=(second < 10 ? "0" : "") + second;

         $('.mbb_seckill_time').html('下一轮还有'+
                    '<span class="hour">'+hour+'</span>时'+
                    '<span class="minute">'+minute+'</span>分'+
                    '<span class="second">'+second+'</span>秒'+
                    '开抢')
     }

     //判断是否被抢完
     var withoutseckill=function(string){
        var isseckill=true;
         $.ajax({
            type: "GET",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: "http://m.mbaobao.com/activity/seckill/3795.html",
            success: function (data) {
                isseckill=data.result;
                withoutseckillhtml(isseckill);

                if(string=="click"){
                   beginseckill(isseckill);
                }

                if(string=="skip"){
                  if(!isseckill){
                    if(app_seckill_number<2){
                        $(".app_seckill_choose_01").find("a").eq(app_seckill_number+1).click();
                    }
                   }
                }
            },
            error: function () {
                //失败
                      
            }
         });              
     }

     var  withoutseckillhtml=function(isseckill){
          if(!isseckill){
             $(".app_seckill_goods_01").find("li").eq(app_seckill_number).find(".app_seckill_goods_purchase").html(
			       app_seckill_button_html[1])
          }
     }
      

      var head=0; 
      //秒杀包的显示今天
      var seckilltoday=function(){
          var data_=data_seckill[data_time_today]
          var html='';
          for (var i = 0; i < data_.length; i++) {
            html=html+seckilltoday_html(data_[i]);
          };
          head=0;   
          var abc=$(".app_seckill_today").find(".app_seckill_goods_01").html(html);
          $(".app_seckill_choose_01").idTabs();  //seckill---choose

          //判断是否被抢购跳转
          withoutseckill("skip");         

          //抢购  
          abc.find("#seckill_click").click(function(){                   
                 // if(USER_ID==''){
                 //     //跳转登录
                 //   window.location.href="/login.html"
                 // }
               withoutseckill("click");
               return false;
          })
      }

      var seckilltoday_html=function(data){
            var html='<li class="clearfix" id="'+app_seckill_href[head]+'">'+
              '<div class="app_seckill_left">'+
                '<a href="http://m.mbaobao.com/item/1201028402.html">'+
                  '<a href="http://m.mbaobao.com/item/' + data[0] + '.html" >'+
                           '<img src=' + data[2] + ' width="167" height="167">'+
                           '</a>'+
                  '</div>'+
              '<div class="app_seckill_right">'+
                '<div class="app_seckill_goods_time">'+
                  '<br>'+
                  '<br>'+          
                  '<br>'+app_seckill_time[head]+'</div>'+
                '<div class="app_seckill_goods_price">'+
                  '<img src="http://cca.mbaobao.com/mbaobao/201401/05/seckill/app_seckill_11.jpg?2013" width="140" height="82"></div>'+                             
              '</div>'+
              '<div class="app_seckill_goods_purchase">'+app_seckill_button[head]+               
             '</div>'+
            '</li>'
            head++       
            return html;       
      }
      
      var head=0;
      //秒杀包的显示明天
      var seckilltomrrow=function(){
          var data_=data_seckill[data_time_tomrrow]
          var html='';
          for (var i = 0; i < data_.length; i++) {
              html=html+seckilltomrrow_html(data_[i]);
          };
          head=0;
          $(".app_seckill_today").find(".app_seckill_goods_02").html(html);
          $(".app_seckill_choose_02").idTabs();  //seckill---choose
      }

      var seckilltomrrow_html = function(data) {
      var html='<li class="clearfix" id="'+app_seckill_href_02[head]+'">'+
               '<div class="app_seckill_left">'+
               '<a href="http://m.mbaobao.com/item/' + data[0] + '.html" >'+
                 '<img src=' + data[2] + ' width="167" height="167"></a></div>' +
              '<div class="app_seckill_right">'+
              '<div class="app_seckill_goods_time_02">'+
                                   '1'+ 
                '</div>'+
                '<div class="app_seckill_goods_price"><img src="http://cca.mbaobao.com/mbaobao/201401/05/seckill/app_seckill_11.jpg?2013" width="140" height="82"></div>'+
                '<div class="app_seckill_goods_purchase"><img src="http://cca.mbaobao.com/mbaobao/201401/05/seckill/app_seckill_14.jpg" width="66" height="16"></div>'+
                '</div>'+
               '</li>'
      head++
      return html;
     }

     //秒杀规则
     $("#seckill_regulation").click(function(){
           $("#popupWrap_regulation").show();
     })
     
     $(".popup-rule-close").click(function(){
           $("#popupWrap_regulation").hide(); 
     }) 
     
     //抢购
     var beginseckill=function(isseckill){
         if(isseckill){
            popupWrap_phone();
         }else{
            $("#popupWrap_failure").show();
         }
     }

     
     var mobile="";
     var vcode="";
     var parameter="";
     //提交手机号
     var popupWrap_phone=function(){
         $("#popupWrap_phone").show();  
         
         parameter=verificationcode();  

         $("#popupWrap_phone").find(".popup-btn").click(function(){
              mobile=$(".mobile-input").val();
              if (mobile !== "" && !/^[1][3458]\d{9}$/.test(mobile)) {
                    alert("请输入有效的手机号码")
                    return
              }

              vcode=$(".mobile-verification").val();

              if(vcode==""){
                alert("验证码不能为空")
                return
              }

            $.ajax({
            type: "GET",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: "http://m.mbaobao.com/activity/seckill/3795.html",
            "data": {
              "mobile": mobile,
              "vcodeKey":parameter,
              "vcode":vcode
            },
            success: function (data) {
              console.log(parameter)
              console.log(data)
               if(data.message=="验证码不正确"){
                 alert("验证码不正确")
                 parameter=verificationcode();
                 return
               }
               ifsucceed(data.result)
            },
            error: function () {
                //失败      
            }
            });

         }) 
     }
    
    //输入验证码
    var verificationcode = function() {
      var parameter = new Date().getTime() + Math.floor(Math.random() * 99999);

      $("#mobile-verification-span").find("img").attr("src", "http://gbmapi.mbaobao.com/picCode.jpg?unique_id=" + parameter);
      return parameter
    }


     var  ifsucceed=function(ifsucceed){
          $("#popupWrap_phone").hide();



          if(ifsucceed){
          $("#popupWrap_address").show();
          $("#popupWrap_address").find("#phone").val(mobile) 
          }else{
          $("#popupWrap_failure").show();
          }  
     }

     //确认信息提交
     $("#popupWrap_address").find(".popup-btn").click(function(){
         var address=$("#popupWrap_address").find("#address").val();
         var name=$("#popupWrap_address").find("#name").val();
         var phone=$("#popupWrap_address").find("#phone").val();

         if(address==''||name ==''|| phone ==''){
            alert("请填写完整信息")
            return 
         }

         $.ajax({
            type: "POST",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: "http://m.mbaobao.com/activity/addUserInfo/3795.html",
            data:{
              "addr": address,
              "mobile": phone,
              "realname": name
            },
            success: function (data){
                 if(data.result){
                      $("#popupWrap_address").hide();

                      var data=data_seckill[data_time_today][app_seckill_number];
                      $("#popupWrap_succeed_02").find(".popupWrap_succeed_02_goods").html(
                      '<div><img src='+data[2]+' width="128px" height="128px"></div>'+
                      '<div>麦包价'+data[1]+'元</div>')

                      $("#popupWrap_succeed_02").show();
                 }else{
                     $("#popupWrap_address").hide();
                     $("#popupWrap_failure").show();
                 }
            },
            error: function () {
                //失败      
            }
        });
     })
     
     //关闭成功
     $("#popupWrap_succeed_02").find(".popup-btn").click(function(){
         $("#popupWrap_succeed_02").hide();
     })

  
})