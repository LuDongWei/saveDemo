//麦包包 - 返利
define(function (require,exports,module){
    var $=require("jquery"),
        Handlebars=require("gallery/handlebars/1.0.0/handlebars"),
        noteWarn =require("mbb/noteWarn/1.0.0/noteWarn"),
        template = require("http://cca.mbaobao.com/mkts/201411/28/fex/mbb-share.handlebars.js?20141204");

        Global = require("global");
     
    /*------------接口-----------*/
    var mbbHost = "http://mkt.mbaobao.com",
        InviteUserList = mbbHost+"/Ajax/InviteUserList",           //获取参加者列表 
        InviteOrderList = mbbHost+"/Ajax/InviteOrderList",         //获取当前用户可参加活动订单 
        InviteCreate = mbbHost+"/Ajax/InviteCreate",               //创建邀请码
        InviteList = mbbHost+"/Ajax/InviteList",                   //查看生成邀请码使用情况 
        InviteBind = mbbHost+"/Ajax/InviteBind",                   //绑定邀请订单 
        CheckInviteBind = mbbHost+"/Ajax/CheckInviteBind";         //查看改账号是否
        // InviteUseOrderList = mbbHost+"/Ajax/InviteUseOrderList",   //获取可选择返利订单列表 
        // InviteUseOrder = mbbHost+"/Ajax/InviteUseOrder";           //绑定返利订单 
    /*------------接口-----------*/

    /*------------页面id----------*/ 
    var $mbbJoin = $("#mbbJoin"),          //参加者列表
        $mbbPeople = $("#mbbPeople"),      //参加个数
        $mbbChoose = $("#mbbChoose"),      //入口
        $mbbEntry = $(".mbbEntry"),        //入口 邀请|返利 
        $mbbModule = $(".mbbModule"),      //模块 要求|返利
        $mbbInviteOrder = $("#inviteOrder"),  //邀请订单
        $mbbInviteCodeList = $("#inviteCodeList"),  //邀请编码状态
        $mbbRebateLog = $("#rebateLog"),     //返利登陆 
        $mbbRebateSubmit = $mbbRebateLog.find(".submit"), //返利登陆提交        
        $mbbRebateOred = $("#rebateOred"),   //返利选择
        $mbbNoRebate = $("#noRebate"),       //没有返利订单
        $mbbName = $(".mbbName"),            //名字
        $mbbInviteInf = $("#inviteInf"),     //邀请信息
        $mbbRebateInf = $("#rebateInf"),     //返利信息

        $mbbButton01 = $("#button01"),       //邀请状态
        $mbbButton02 = $("#button02");       //返利状态
    /*------------页面id----------*/ 

    /*----------接口数据保存----------*/
    var InviteData = {},              //邀请数据
        rebateData = {};              //返利数据 
    /*----------接口数据保存----------*/
    
    //参加人滚动
	function mbbRoll() {
		var roll = $mbbJoin,
			li = roll.find("li"),
			sum = li.length;

		if (sum > 10) {
			setInterval(function() {
				roll.animate({
					"margin-top": "-28px"
				}, 700, function(aaa) {

					roll.css({
						"margin-top": "0px"
					})

					var first = roll.find("li:first");

					first.remove();
					roll.append(first);
				})
			}, 1300)
		}
	}

	//ajax
	function ajax(url_, data_, callback_) {
		$.ajax({
			type: "get",
			url: url_,
			dataType: "jsonp",
			jsonp: "jsoncallback",
			data: data_,
			success: function(json) {
				callback_ && callback_(json);
			}
		})
	}

    /*--------------------begin------------------------*/
	
	function joinList() {

		ajax(InviteUserList, {}, function(data) {
			if (data && data.data && data.data.list) {

				var list = {
					"InviteUserList": data.data.list
				};

				$mbbJoin.html(template(list));

				var num = data.data.count;

				$mbbPeople.html(num);

				num > 10 ? mbbRoll() : {};

			}
		})

	}
    
  

    //邀请
    function invite(id_){

    	$mbbModule.hide();


        $mbbModule.eq(id_).show();   


        data = InviteData;

            if(data){
               if(data["error"] == 0){	
	               var list = data.data.list,
	                   length = data.data.list.length || 0,
	                   max = parseInt(data.data.list[0] && data.data.list[0].rebate_price,10) || 0, 
	                   newList = [];
           
	               for (var i = 0; i < list.length; i++) {
	                   
	                    list[i].number = i+1;
	                    list[i].pay_amount = parseInt(list[i].pay_amount,10);
	                    list[i].rebate_price = parseInt(list[i].rebate_price,10); 
	                    
	                    if (list[i].type == 1 ){
	                        list[i].isUse = true;
	                        list[i].isCode = true;
	                    }else if(list[i].type == 2 ){
	                        list[i].isUse = true;
	                        list[i].isCode = false;
	                    }else if(list[i].type == 0){
	                        list[i].isUse = false;
	                        list[i].isCode = false;
	                    }
	                    newList.push(list[i]);
	               };

	               var list = {
						"InviteOrderList": newList
					};
                    
					$mbbInviteOrder.find("tr:not(.headline)").remove();
					$mbbInviteCodeList.find("tr:not(.headline)").remove();	
	                
	                $mbbInviteOrder.find(".table").append(template(list)); 

	                $mbbInviteInf.find(".d").html(length);     

	                codeAction();
	                codeList();
                }else{
                	alert(data["message"])	 
                }
            }
            
    }
    
    //查看和生成邀请码
    function codeAction(){
       var   $mbbCodeShow = $mbbInviteOrder.find(".invite-code-show"),        //邀请 查看编码
             $mbbCodeCreate = $mbbInviteOrder.find(".invite-code-create"),    //邀请 生成编码
             $mbbInviteList = $mbbInviteOrder.find(".invite-list");           //邀请码
       
       $mbbCodeShow.find("button").on("click",function(){
           var order = $(this).parent().data("order"); 
           
           $mbbInviteList.each(function(){
           	   var order_ = $(this).data("order");

           	   if(order == order_){
                  $(this).show();

                  shareHtml($(this));
           	   } 
           }) 
       
       })

       $mbbCodeCreate.find("button").on("click",function(){
       	   var  order = $(this).parent().data("order"); 
                      
           ajax(InviteCreate,{"orderId":order},function(data){
				
				if (data) {
					if(data["error"] == 0){
						var list = {
							"details": data.data.list
						};

						$mbbInviteList.each(function() {
							var order_ = $(this).data("order");

							if (order == order_) {
								$(this).find(".table").find("tr td").before(template(list));

								$(this).show();

								shareHtml($(this));
							}
						})
					}else{
					    alert(data["message"])	
					}
				}

           })  

       }) 
    }

    //构造分享
    function shareHtml(this_){
         
         var n=5;
             Codes="",
             reg=/,$/gi,
             tds=this_.find(".table").find("td"),
             share=this_.find("#goodsShare");

         for (var i = 0; i < n; i++) {
         	 Codes=Codes+tds.eq(i).html()+",";
         };          
         
         share.find("a").each(function(){
             var href = $(this).attr("href");
              
             href=href.replace("http://www.mbaobao.com",winShare['url']);
             href=href.replace("麦包包",winShare['title1']+Codes.replace(reg,"")+winShare['title2']);
             href=href.replace("http://cca.mbaobao.com/mkts/201411/28/fex2/60x60.jpg",winShare['pic']);
               
             $(this).attr("href",href);
         }) 
         
    }
    
    //全部订单状态
    function  codeList(){
        ajax(InviteList,{},function(data){
		
        	if (data && data.data && data.data.list) {

                var list = {
						"InviteList": data.data.list
			    };

			    $mbbInviteCodeList.find(".table").append(template(list)); 
        	}
        })
    }


    //---------------------------返利--------------------------
    
    //绑定邀请码
    function rebateLogin(){
        var  code = /^[0-9A-Z]{7}$/,
            phone = /^1\d{10}$/;
        
        $mbbRebateSubmit.on("click",function(){
             var phone_ =  $mbbRebateLog.find(".phone").val(),
                  code_ =  $mbbRebateLog.find(".code").val();
               
             if(!phone.test(phone_)){
             	alert("手机号码不正确")

             	return 
             }    
             
             if(!code.test(code_)){
             	alert("邀请码不正确")

             	return 
             }

			ajax(InviteBind, {"code": code_,"mobile": phone_}, function(data) {
                              
				if (data) {

					if (data['error'] == 0) {
						$mbbRebateLog.hide();
				        
                        $mbbNoRebate.show();
					} else {
                        switch(data['error']){
                        	case 1: alert("未登陆，请尝试重新登陆");
                        	      break;
                        	case 2: alert("手机号码有误");
                        	      break;
                        	case 3: alert("邀请码已经被使用");
                        	      break;
                        	case 4: alert("邀请码无效");
                        	      break;                  
                        	default: 
                        	     alert("邀请码无效");
                        }
					}

				} else {
					alert("稍等片刻");
				}

			})
                                 
        })
    }
    
    //生成返利
	function rebateOred(data){

		data={order_id: 96094163, order_date: "2014-12-02 16:25:58", rebate_price: 36.65}
        
		if(data){
           data.rebate_price = parseInt(data.rebate_price, 10);
           data.rebate_state = "以"+data["order_date"].substring(0,10)+"计算30天后获得返利";
		}

         
		var list = {
			"InviteUseOrderList": data
		};
        
       	$mbbRebateOred.find("tr:not(.headline)").remove();  
        $mbbRebateOred.find(".table").append(template(list));
        $mbbRebateOred.show(); 
 
	}
    
    //点击确定返利
    function rebateUse(){
         var $rebateUse = $mbbRebateOred.find(".rebate-code-use");

         $rebateUse.find("button").on("click",function(){

                var order = $(this).parent().data("order"); 
                 
                ajax(InviteUseOrder,{"orderId":order},function(data){

                     if(data){
                     	if(data["error"] == 0 ){
                           alert("返利成功")
                     	}else{
                           alert(data["message"])
                     	}

                     }
                
                })  
                
         })

    }

    
    //已经登陆 邀请|返利
    function  isLogin(clickId){

        //状态码
        //邀请  1.无订单  2.有订单/无邀请   3.有订单/有邀请
        //返利  2.无绑定  2.有绑定/无订单   3.有绑定/有订单
        
		var inviteType = {
				'type': 0,
				'order': 0,
				'code':0,
				'successCode': 0
			},
            rebateType = 0;
        
        //判断我要邀请  
        ajax(InviteOrderList,{},function(data){

             InviteData = data;

			if (InviteData) {
				if (InviteData["error"] == 0) {
					var list = InviteData.data.list,
						length = InviteData.data.list.length || 0;


					if (length > 0) {
						inviteType['type'] = 2;

						for (var i = 0; i < list.length; i++) {

							if (list[i]['type'] == 1) {
								inviteType['type'] = 3;

								var Codes = list[i]['details'];
								//计算邀请码和成功邀请
								for (var m = 0; m < Codes.length; m++) {
									if (Codes[m]['yq'] == 1) {
										inviteType['successCode'] ++
									}
									inviteType['code'] ++
								};

							} else if (list[i]['type'] == 0) {
								inviteType['order'] ++
							}
						};
					} else {
						inviteType['type'] = 1;
					}


					switch (inviteType['type']){
						case 1 :  $mbbButton01.find(".p-1").show();
						          $mbbEntry.eq(0).addClass("noMbbEntry").unbind('click');
						   break;
                        case 2 :  $mbbButton01.find(".p-2").show();
                                  $mbbButton01.find(".p-2 span").html(inviteType['order']);
						   break;
						case 3 :  $mbbButton01.find(".p-3").show();
						          $mbbButton01.find(".p-3 span:first").html(inviteType['code']);
						          $mbbButton01.find(".p-3 span:last").html(inviteType['successCode']); 
						   break;
					    default :        
					}
				}
			}

            //跳转
            if(clickId==0){
               if(inviteType['type']!=1){
                 invite(clickId);
               }  		
            }
        })


        //判断我要返利
		ajax(CheckInviteBind, {}, function(data) {
            
             rebateData = data;

			if (rebateData) {

				switch (rebateData['error']) {
                    case 0: $mbbButton02.find(".p-3").show();
                        break;
                    case 1: $mbbEntry.eq(1).addClass("noMbbEntry").unbind('click');
                            alert("请尝试退出登陆");
                        break;
                    case 2: $mbbEntry.eq(1).addClass("noMbbEntry").unbind('click');
                            $mbbButton02.find(".p-1").show();
                        break;
                    case 3: $mbbEntry.eq(1).addClass("noMbbEntry").unbind('click');
                            $mbbButton02.find(".p-2").show();

                            rebateOred(rebateData['data']);
                        break;             
					default:
				}

			}
           
            
            //跳转
			if (clickId == 1) {
			   if (rebateData['error'] == 0) {
					$mbbModule.hide();
					$mbbModule.eq(clickId).show();

					$mbbRebateLog.show();

					$mbbRebateSubmit.unbind("click");
					rebateLogin();
			   }                               
			}

		})

    }



	//没登陆   
	$mbbEntry.on("click", function() {
		var id = $(this).data("id");

		Global.User.passport(function() {
            
		    $mbbName.html(Global.User.get("username").substring(0, 5) + "...");

		    isLogin(id);          
	    })  

	})

    //分享小伙伴
    $("body").on("click", ".invite-friends", function() {

        var code=$(this).data("code");

        noteWarn.install({
            "activityid": "ab81b75bf6fa80b4bf1f133d08b31123",
            "data": {
                "number": code,
                "url": winShare['url']
            },
            succeed_: function(tit, modal) {
                modal.close();

                alert("短信发送小朋友成功");
            },
            false_: function(tit, modal) {
                alert(tit)
            }
        })
    })
    


    //-----------------------进入页面---------------------------
    $(function(){
         if(Global.User.isLogin()){
            //登陆
            isLogin(); 
         }

    })  

})