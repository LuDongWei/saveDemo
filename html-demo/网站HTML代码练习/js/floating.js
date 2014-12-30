/*  
 * 悬浮导航插件   --By douban
 * @css
 * .sup-left    //居左
 * .sup-right   //居右
 * .sup-bottom  //居下
 * @example
 * $("#supLeft").floating({
 *		isHide: true,   //刚开始是否隐藏
 *	    slideDis: 500,  //滑动显示
 *	    effect: 'show', //显示效果(show|down|custom)
 *		addClass: '',   //自定义添加样式("custom")
 *		iswidth: false, //宽度缩小隐藏
 *		widthDis: 1200  //宽度隐藏
 *})
 *@support
 *jquery  seajs   plugin-style
 *@newUrl
 * http://cca.mbaobao.com/mkts/201404/24/floating.js
 *@fixed
 * 插件使用jquery方式感觉有点不对，使用seajs模块化的更加符合。待改善  
 */
define(function(require, exports, module) {
	var $ = require("jquery");
	require("floatCss")

	$.fn.floating = function(options_) {
		var defaults = {
			isHide: true,
			slideDis: 500,
			effect: 'show',
			addClass: '',
			iswidth: false,
			widthDis: 1200
		}
		var this_ = this;
		var options = $.extend({}, defaults, options_);

		/*---显示隐藏(上下)---*/
		function showAndhide() {
			$(window).scroll(function() {
				showAndhide_();
			})
		}

		function showAndhide_() {
			var winTop = $(document).scrollTop();

			switch (options["effect"]) {
				case 'show':
					if (winTop >= options["slideDis"]) {
						this_.css('visibility', 'visible');
					} else {
						this_.css('visibility', 'hidden');
					}
					break;
				case 'down':
					if (winTop >= options["slideDis"]) {
						this_.slideDown();
					} else {
						this_.slideUp();
					}
					break;
				case 'custom':
					if (winTop >= options["slideDis"]) {
						this_.addClass(options["addClass"]);
					} else {
						this_.removeClass(options["addClass"]);
					}
					break;
			}
		}

		/*---显示隐藏(左右)---*/
		function showWidth() {
			$(window).resize(function() {
				showWidth_();
			})
		}

		function showWidth_() {
			var winWidth = $(window).width();
			if (winWidth <= options["widthDis"]) {
				this_.css('visibility', 'hidden');
			} else {
				this_.css('visibility', 'visible');
			}
		}

		$(function() {
			if (options["isHide"]) {
				showAndhide();
			}
			if (options["iswidth"]) {
				showWidth();
			}



		})
		return this;
	}

})
define("floatCss", [], function() {
	seajs.importStyle(".sup-left{position:fixed;top: 0;left: 50%;padding-top: 10px;zoom: 1;margin-left: -600px;visibility: hidden;z-index: 50;_position: absolute;_top: expression(eval(document.documentElement.scrollTop));}.sup-right{position:fixed;top: 0;right: 50%;padding-top: 10px;zoom: 1;margin-right: -600px;display:none;z-index: 50;_position: absolute;_top: expression(eval(document.documentElement.scrollTop));} .sup-bottom{position:fixed;right: 50%;bottom:0px;zoom: 1;margin-right: -480px;visibility: visible;z-index: 50;_position: absolute;_top: expression(eval(document.documentElement.scrollTop));}")
});