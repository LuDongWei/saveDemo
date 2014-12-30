define(function(require, exports, module) {
	var $ = require("jquery");
	var easing = require("jquery-plugin/easing/1.3/easing");
	simplemodal: require("simplemodal")($);

	require("http://cca.mbaobao.com/mkts/201408/04/roll/textRoll.js");
	require("http://cca.mbaobao.com/mkts/201408/04/roll/jQueryRotate.2.2.js");

	var pbase = require("mbb/paBase/2.0.0/paBase"),
		Global = require("global"),
		mcc = require("mbb/mpeaConvertCoupen/1.0.0/mpeaConvertCoupen");


	var GETLOM = "http://www.mbaobao.com/LuckyDraw/LuckyDrawTop", //获奖用户
		GETLL = "http://www.mbaobao.com/LuckyDraw/LuckyDrawMain"; //抽奖

	var award = {
		"1":["270","好遗憾"], 
		"2":["210","恭喜"], 
		"3":["30","好遗憾"],
		"4":["120","恭喜"], 
		"5":["120","恭喜"], 
		"6":["330","好遗憾"], 
		"7":["120","恭喜"], 
		"8":["120","恭喜"] 
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


	$(function() {
		luckRoll();

		beanCode();

		dFlash();

		$("#content").html($("#mName").val())

		$("#container").roll({
			speed: 3
		});
		//roll();
	})


	//幸运大转盘
	function luckRoll() {
		$("#wPointer").rotate({
			bind: {
				click: function() {
					var this_ = this;

					//判断登陆 - 接口获取 - 转动 - 再玩一次

					Global.User.passport(function() {
						Ajax(GETLL, {
							activityId: "1ac8398915a1b582e813cb1f562f4519",
							d: Math.round(new Date().getTime() / 1000)
						}, function(json) {

							console.log(json)
							if (json.error === 0) {
								var type = json.data.type,
									name = json.data.name;

								//console.log(award[type]+":"+name) 

								$(this_).rotate({
									duration: 3000,
									angle: 0,
									animateTo: 1440 + parseInt(award[type][0], 10),
									easing: $.easing.easeOutSine,
									callback: function() {
										$(".xp-award").find("h3").html(award[type][1]);
										$(".xp-award").find(".award").html(name);

										$(".xp-award").modal({
											closeClass: 'xp-award'
										})
									}
								});

							} else {
								alert(json.message)
							}
						})

					})
				}
			}
		});
	}

	//麦豆抽优惠劵
	function beanCode() {
		$("#getCode").find("li").find("a").on("click", function() {
			var id = $(this).data("id").split("|"),
				a_id = id[0],
				g_id = id[1];

			Global.User.passport(function() {

				mcc.convert({
					activityId: a_id,
					coupenGroupId: g_id
				});

			})

		})
	}

	//闪动
	function dFlash() {
		setInterval(function() {
			setTimeout(function() {
				$("#mdisk").addClass("dFlash");
				setTimeout(function() {
					$("#mdisk").removeClass("dFlash");
				}, 500)
			}, 500)
		}, 1500)
	}

	//文字滚动
	function roll() {
		//  Ajax(GETLOM,{
		//     	 activityId : 4359,
		// d : Math.round(new Date().getTime() / 1000) 
		//  },function(json){
		//       var data=json.data;

		//       //console.log(data)

		//       var html=""

		//       for (var i = 0; i < data.length; i++) {
		//       	  html=html+"<span>"+data[i].user_name+"||"+data[i].value+"<span>";
		//       };

		//       $("#content").html(html); 

		//       $("#container").roll({
		// speed: 2
		// });

		//  })
	}



})