define(function(require, exports, module) {
	var Global = require("global");
	var $ = require("jquery");

	require("jquery-plugin/simplemodal/1.4.4/simplemodal")($);

	$.fn.foucsText = function(val) {
		var _self = this;
		var v = (val == null) ? $(_self).val() : val;
		_self.val(v);
		_self.focus(function() {
			if (_self.val() == v) {
				_self.val("");
			}
		});
		_self.blur(function() {
			if (_self.val() == "") {
				_self.val(v);
			}
		});
		return _self;
	}

	$('#input-order-number').foucsText('请输入你的订单号');

    var abc=true;

	function lottery(){
        var Oid = $('#input-order-number').val();

			if (Oid == '' || Oid == '请输入你的订单号') {
				alert("请输入订单号！");
				return false;
			}

			if (!/^[0-9]*$/.test(Oid)) {
				alert("请正确输入订单号！");
				return false;
			}


            abc=false;

			$.ajax({
				type: 'get',
				url: 'http://www.mbaobao.com/LuckyDraw/LuckyDrawOrder',
				data: {
					orderid: Oid,
					activityid: 'D023A38E39D4AB23551736D1A3C63C3A',
					d: Math.round(new Date().getTime() / 1000)
				},
				dataType: 'jsonp',
				jsonp: 'jsoncallback',
				success: function(result){

                    if(result['error']==0){
                       $("#xpMes").html(result.data['name'])
                    }else{
                       $("#xpMes").html(result.message)
                    }

					$(".xp-pop").modal({
						closeClass: "xp-close"
					})

					abc=true;
				},
				error: function() {}
			});
	}


	$('.go-lottery').click(function() {

		Global.User.passport(function() {
			 if(abc){
                lottery();
			 }
		});

		return false;
	});


})