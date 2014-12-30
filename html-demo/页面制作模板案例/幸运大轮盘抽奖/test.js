define(function(require, exports, module) {
	var $ = require("jquery");
	var easing = require("jquery-plugin/easing/1.3/easing");
	require("./jQueryRotate.2.2.js");


	$(function() {
		$("#wPointer").rotate({
			bind: {
				click: function() {
					var a = Math.floor(Math.random() * 360);
					$(this).rotate({
						duration: 3000,
						angle: 0,
						animateTo: 1440 + a,
						easing: $.easing.easeOutSine,
						callback: function() {
							alert('中奖了！' + a);

						}
					});
				}
			}
		});
         
        $("#mbbStart").click(function(){  console.log($("#wPointer").getRotateAngle()) }) 

	})



})