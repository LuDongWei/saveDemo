/*global define:true, seajs:true*/

define(function (require, exports, module) {

    var $ = require("jquery");
    var cookie = require("cookie");
    var Global = require("global");
    var blockHighlight = require("./blockHighlight");
    var lazyLoad = require("./lazyLoad.js");
    require("bxslider")($);
    var www_url = Global.Config.domains("WWW_URL");
    $(function () {

        var formatPrice = function (price) { //除.00外保留两位小数
                return (price + "").replace(/(\.\d{2})\d*/, function ($1, $2) {
                    return ($2 === ".00") ? "" : $2;
                });
            };


        // 只有一张时不要显示下一页按钮
        if ($("#js-top-slider").find("li").length === 1) {
            $('#js-top-slider-next').hide();
        }
        if ($("#js-top-slider").find("li").length > 1) {
            var resizeTime = 0;
            var topSlider = $("#js-top-slider").bxSlider({
                displaySlideQty: 1,
                moveSlideQty: 1,
                auto: true,
                speed: 1400,
                pause: 4200,
                easing: 'easeOutQuint',
                pager: true,
                pagerSelector: ".top-slider-pager",
                onBeforeSlide: function (currentSlideNumber, totalSlideQty, currentSlideHtmlObject) {
                    var a = $(currentSlideHtmlObject).find("a");
                    if (a.data("pic") && !a.data("loaded")) {
                        a.css("background", "url('" + a.data("pic") + "') top center no-repeat").data({
                            "loaded": true
                        });
                    }
                }
            });
            $("#js-top-slider-next").show();
            $(window).on("resize", function () {
                clearTimeout();
                resizeTime = setTimeout(function () {
                    var sideDiv = ($(window).width() - 960) / 2;
                    if (sideDiv > 0) {
                        $("#js-top-slider-pager").show().html("").css({
                            right: sideDiv
                        });
                        $("#js-top-slider-next").show().css({
                            right: sideDiv
                        });
                    } else {
                        $("#js-top-slider-pager").hide();
                        $("#js-top-slider-next").hide();
                    }
                    topSlider.reloadShow();
                    topSlider.goToSlide(0);
                }, 400);
            });

            // 鼠标在首焦上停止滚动
            $('.top-banner').on("mouseover", function (e) {
                topSlider.stopShow();
            }).on("mouseout", function (e) {
                topSlider.startShow();
            });

            // 防止移动碰触
            setTimeout(function () {
                var timer;
                $("#js-top-slider-pager").on("mouseenter", ".pager-link", function () {
                    var self = this;
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        var thumbIndex = $("#js-top-slider-pager a").index(self);
                        topSlider.goToSlide(thumbIndex);
                    }, 100);
                });
            }, 200);

            $("#js-top-slider-pager").css({
                right: ($(window).width() - 960) / 2
            });

            $("#js-top-slider-next").css({
                right: ($(window).width() - 960) / 2 - 28
            });

            // 防止点击过快
            (function () {
                var timer;
                $("#js-top-slider-next").click(function () {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        topSlider.goToNextSlide(false);
                    }, 200);
                });
            }());

            // 延迟加载首焦图片
            setTimeout(function () {
                $('#js-top-slider').find("a").each(function (index, a) {
                    if ($(a).data("pic") && !$(a).data("loaded")) {
                        if ($(a).data("bgpic") && $(a).data("bgpic") !== "") {
                            $(a).parent().css("background", "url('" + $(a).data("bgpic") + "')");
                        }
                        $(a).css("background", "url('" + $(a).data("pic") + "') top center no-repeat").data({
                            "loaded": true
                        });
                    }
                });
            }, 2500);
        }

        $(".floor-slider").each(function () {
            var self = $(this),
                slider;

            if (self.find("ul li").length <= 1) {
                return;
            }
            slider = self.find("ul").bxSlider({
                displaySlideQty: 1,
                moveSlideQty: 1,
                auto: true,
                speed: 800,
                easing: 'easeOutQuint',
                pager: true,
                pagerSelector: self.find(".slider-pager")
            });

            self.find(".pager-link").mouseover(function () {
                var thumbIndex = self.find(".pager-link").index(this);
                slider.goToSlide(thumbIndex);
                return false;
            });

            self.on("mouseover", function () {
                slider.stopShow();
            }).on("mouseout", function () {
                slider.startShow();
            });
        });

        /* floor-0 模板0 */

        if ($('.floor-1#floor-1-style-0').length) {
            blockHighlight.init(".floor-1#floor-1-style-0", ".f-l, .f-c .up, .f-c .down, .f-r li");
        }

        /* floor-1 模板1 */

        if ($('.floor-1#floor-1-style-1').length) {
            blockHighlight.init(".floor-1#floor-1-style-1", ".f-l, .f-r, .f-c, .f-list li");
        }

        lazyLoad.init({
            defObj: ".lazybox"
        });
        //10 seconds lazyLoad again
        setTimeout(function () {
            lazyLoad.init({
                defObj: ".lazybox"
            });
        }, 9000);

        $(".hot-buy .tabs").find("a").mouseover(function () {
            $(".tabs").find("a").removeClass("current");
            $(this).addClass("current");
            $(".tabs-con").find(".tabs-con-item").hide();
            $($(this).attr("href")).show();
        }).click(function () {
            return false;
        });
		
        /* $(".guan-list").find("li").each(function () {
            var txt = $(this).find(".pop-txt");
            $(this).mouseover(function () {
                txt.stop().animate({
                    bottom: 0
                }, 200);
            }).mouseout(function () {
                txt.stop().animate({
                    bottom: -40
                }, 200);
            });
        }); */
		
		//新的逛鼠标经过效果
		$(".guan-list").find("li").each(function () {
            var liDom = $(this);
			liDom.find('a').first().append('<div class="guan-mask"></div>');
			liDom.hover(function(){
				$(this).addClass("guang-hover-on");
			},function(){
				$(".guan-list").find("li").removeClass("guang-hover-on");
			});
        });

        // AD首商品滚动
        $("#ad-tabs-a").bxSlider({
            displaySlideQty: 5,
            moveSlideQty: 5
        });

        //百分点
        require.async("http://static1.baifendian.com/service/mbaobao/mbaobao_home.js", function (BFD) {
            if (BFD) {
                BFD.register("rec_user", www_url + "category/bfd/bargainPrice.html", function (list) {
                    //S百分点[特惠商品]
                    if (list && list.length) {
                        (function (win, $, data) {
                            var len = data.length > 4 ? 4 : data.length;

                            if ($(".news").length > 0) {
                                len = data.length > 4 ? 4 : data.length;
                            } else {
                                len = data.length > 5 ? 5 : data.length;
                            }

                            var viewHtml = "";
                            var template = '<li>' + '<a href="' + www_url + 'item/{itemSku}?l_bi=a_2_1_2_2_{index}" class="pic" target="_blank">' + '<img src="{imageLink}" alt="" width="174" height="174" title="{itemName}">' + '</a>' + '<div class="pro_info">' + '<a href="' + www_url + 'item/{itemSku}?l_bi=a_2_1_2_2_{index}" target="_blank" class="name" title="{itemName}">{itemName}</a>' + '<div class="price">' + '{itemPriceType}' + '{itemPrice}' + '</div>' + '</div>' + '</li>';

                            for (var i = 0; i < len; i++) {
                                var d = data[i];
                                viewHtml += template.replace(/\{itemName\}/g, d.sku["title"]).replace(/\{itemSku\}/g, d.sku["skuNumber"]).replace(/\{imageLink\}/g, d.imageUrls["174*174"]).replace(/\{itemPriceType\}/g, d.prices["promotion"] ? '<strong class="red">优惠价：</strong>' : '<span class="gray">麦包价：</span>').replace(/\{itemPrice\}/g, d.prices["promotion"] ? '<strong class="red">￥' + formatPrice(d.prices["promotion"]) + '</strong><s>￥' + formatPrice(d.prices["sale"]) + '</s>' : '<strong class="red">￥' + formatPrice(d.prices["sale"]) + '</strong>').replace(/\{index\}/g, i + 1);
                            }

                            if (viewHtml !== "") {
                                $("#comms").html('<ul class="pro_list clearfix">' + viewHtml + '</ul>');
                            }

                        }(window, $, list));
                    }
                    //END
                });

                BFD.register("rec_allfu", www_url + "category/bfd/guess.html", function (list) {

                    //S百分点[猜你喜欢]
                    if (list && list.length) {
                        (function (win, $, data) {
                            var len = data.length > 4 ? 4 : data.length;
                            if ($(".news").length > 0) {
                                len = data.length > 4 ? 4 : data.length;
                            } else {
                                len = data.length > 5 ? 5 : data.length;
                            }
                            var viewHtml = "";
                            var template = '<li>' + '<a href="' + www_url + 'item/{itemSku}?l_bi=a_2_1_2_3_{index}" class="pic" target="_blank">' + '<img src="{imageLink}" alt="" width="174" height="174" title="{itemName}">' + '</a>' + '<div class="pro_info">' + '<a href="' + www_url + 'item/{itemSku}?l_bi=a_2_1_2_3_{index}" target="_blank" class="name" title="{itemName}">{itemName}</a>' + '<div class="price">' + '{itemPriceType}' + '{itemPrice}' + '</div>' + '</div>' + '</li>';
                            for (var i = 0; i < len; i++) {
                                var d = data[i];
                                viewHtml += template.replace(/\{itemName\}/g, d.sku["title"]).replace(/\{itemSku\}/g, d.sku["skuNumber"]).replace(/\{imageLink\}/g, d.imageUrls["174*174"]).replace(/\{itemPriceType\}/g, d.prices["promotion"] ? '<strong class="red">优惠价：</strong>' : '<span class="gray">麦包价：</span>').replace(/\{itemPrice\}/g, d.prices["promotion"] ? '<strong class="red">￥' + formatPrice(d.prices["promotion"]) + '</strong><s>￥' + formatPrice(d.prices["sale"]) + '</s>' : '<strong class="red">￥' + formatPrice(d.prices["sale"]) + '</strong>').replace(/\{index\}/g, i + 1);
                            }
                            if (viewHtml !== "") {
                                $("#your-like").html('<ul class="pro_list clearfix">' + viewHtml + '</ul>');
                            }
                            if (len > 3) {
                                $(".tabs-c").show();
                            }

                            function formatPrice(price) { //除.00外保留两位小数
                                return (price + "").replace(/(\.\d{2})\d*/, function ($1, $2) {
                                    return ($2 === ".00") ? "" : $2;
                                });
                            }

                        }(window, $, list));
                    }
                    //END   
                });

                BFD.push({
                    "user_id": Global.User.get("user_id"),
                    "client": "Cmaibaobao"
                });
            }
        });
        //底部邮箱focus时的高亮
        $(".floor-6 .subscription .subtext").focusin(function () {
            $(".floor-6 .subscription .sub-form").css({
                "backgroundPosition": "-10px -236px"
            });
        });
        $(".floor-6 .subscription .subtext").focusout(function () {
            $(".floor-6 .subscription .sub-form").css({
                "backgroundPosition": "-10px -90px"
            });
        });

        Global.floatBar({
			//showConfig: ["Bar-1|返回顶部", "Bar-2|在线咨询", "Bar-3|我的私囊"]
			showConfig: ["Bar-1|返回顶部", "Bar-2|在线咨询", "Bar-4|微信二维码"]
        });
    });
});