define(function (require, exports, mobule) {

    var $ = require("jquery");
    require("#countdown/1.0/countdown")($);
    require("simplemodal")($);
    require("bxslider")($);

    $(function () {
		
		$('.znq_tab_hd a').hover(function(){
			var index = $('.znq_tab_hd a').index($(this));
			$('.znq_tab_hd a').removeClass('on');
			$(this).addClass('on');
			$('.znq_tab').hide();
			$('.znq_tab').eq(index).show();
		})
		
		
        $(".znq_countdown").countdown("2013-06-20 00:00:00", new Date(), '<div class="cd_d">{d}</div><div class="cd_h">{h}</div><div class="cd_m">{m}</div><div class="cd_s">{s}</div><div class="cd_ms"><img src="http://cca.mbaobao.com/mkts/201305/31/znq/home/ms.gif" width="56" height="40"/></div>', function (self) {
            setTimeout(function () {
                self.find(".cd_ms").html("00");
            }, 80)
        });

        $(".top_pop").on("click", function () {
            $(".znp_pop").modal({
                closeClass: "close_btn"
            });
            return false;
        })

        var isFloat = false;
        $(window).on("scroll", function () {
            if ($(document).scrollTop() > 620) {
                $(".znq_bar").addClass("float_top");
                isFloat = true;
            } else {
                $(".znq_bar").removeClass("float_top");
                isFloat = false
            }
        })

        $(".znq_bar").find("a").click(function () {
            var bar = $(this).attr("href");
            $(document).scrollTop(parseInt($(bar).offset().top) - (isFloat ? 72 : 72 * 2));
            return false;
        });

        $(".znq_show_list").bxSlider({
            displaySlideQty: 1,
            moveSlideQty: 1,
            auto: true,
            speed: 1400,
            pause: 4200,
            easing: 'easeOutQuint',
            pager: true,
            pagerSelector: ".znq_show_thumbil_wrap"
        });

        var slider = $(".znq_model_list ul").bxSlider({
            displaySlideQty: 4,
            moveSlideQty: 1,
            auto: true,
            speed: 400,
            pause: 4200,
            easing: 'easeOutQuint'
        });

        $(".m_l_btn").on("click", function(){
            slider.goToPreviousSlide();
        });

        $(".m_r_btn").on("click", function(){
            slider.goToNextSlide();
        });

    })

})