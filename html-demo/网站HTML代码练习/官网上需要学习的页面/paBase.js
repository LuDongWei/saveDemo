/* paBase 1.0 build 2013-03-06 16:15 by shuangzhu */
/*global define:true, window:true, alert:true*/
/*=====================================================
*<div class="J_Dom" dom-config="{'map':'right','width':'150','height':'40'}" dom-type="Float"></div>
======================================================*/
define(function (require, exports, module) {
    "use strict";
    var $ = require("jquery");
    var Global = require("global");
    var Page = exports;
    var APPS_URL = Global.Config.domains("APPS_URL");

	
    var Node = { //a-\u9875\u5e38\u7528\u65b9\u6cd5
        'Float': function (i, O, currentDom) { //\u60ac\u6d6e
            var JBox = currentDom;
            var css = '';
            var isIE6 = (!-[1, ]) && (!window.XMLHttpRequest);
            var html = document.getElementsByTagName('html')[0];
            O = $.extend({
                map: 'right',
                width: '150'
            }, eval("(" + O + ")") || {});

            switch (O.map) {
            case 'top':
                css = 'width:' + O.width + 'px;position:fixed;margin:0 auto;bottom:auto;top:0px;_position:absolute;_top:expression(eval(document.documentElement.scrollTop));';
                break;

            case 'right':
                css = 'width:' + O.width + 'px;position:fixed;right:0px;top:160px;left:auto;_position:absolute;_top:expression(eval(document.documentElement.scrollTop)+160);';
                break;

            case 'bottom':
                css = 'width:' + O.width + 'px;left:50%;margin-left:-480px;position:fixed;bottom:0px;top:auto;_position:absolute;_bottom:auto;_top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)));';
                break;

            case 'left':
                css = 'width:' + O.width + 'px;position:fixed;right:auto;left:0px;top:160px;_position:absolute;_top:expression(eval(document.documentElement.scrollTop)+160);';
                break;
            }
            if (isIE6 && document.body.currentStyle.backgroundAttachment !== 'fixed') { //\u517c\u5bb9IE6
                html.style.backgroundImage = 'url(about:blank)';
                html.style.backgroundAttachment = 'fixed';
            }
            var s = JBox.attr('style');
            JBox.attr('style', css + (s ? s : "")).appendTo("body").show();
        },

        'Switch': function () { //\u8f6c\u6362
            return;
        }
    };


    $(function () {
        if ($('.activity_view_box li').length > 0) {
            $('body').on('click', '.pa_ac_must_login', function () { //\u5fc5\u987b\u767b\u5f55
                Global.User.passport(function (user) {
                    var goodsUrl = $(this).attr('href');
                    window.location.href = goodsUrl;
                });
                return false;
            });

            $('body').on('click', '.pa_ac_fav', function () { //\u6536\u85cf\u6309\u94ae
                var that = $(this);
                Global.User.passport(function (user) {
                    var sku = that.attr('data-sku');
                    var favGoods = function (goods_sku, isAlert) {
                            if (typeof isAlert === "undefined") {
                                isAlert = true;
                            }
                            var url = APPS_URL + 'item/ajax/do/add_favourite.html?goods_sku=' + goods_sku + '&d=' + (new Date()).getTime();
                            $.ajax({
                                async: true,
                                type: 'get',
                                url: url,
                                dataType: 'jsonp',
                                jsonp: 'jsoncallback',
                                success: function (result) {
                                    if (result.errorcode === 50) {
                                        alert('\u60a8\u8fd8\u672a\u767b\u5f55');
                                    } else if (result.errorcode === 0) {
                                        if (isAlert) {
                                            alert(result.errormessage);
                                        }
                                    }

                                }
                            });
                            return this;
                        };
                    favGoods(sku); //\u6536\u85cf
                    return false;
                });
            });
        }
		
		Global.floatBar({//\u5728\u7ebf\u5ba2\u670d
            showConfig: ["Bar-2|\u6d3b\u52a8\u54a8\u8be2"]
        });
		
		
        /************************
         *  J_Dom\u521d\u59cb\u5316
         ************************/
        if ($('.J_Dom').length > 0) {
            $('.J_Dom').each(function (index) {
                var type = $(this).attr('dom-type');
                var data = $(this).attr('dom-config');
                if (typeof Node[type] !== "undefined") {
                    Node[type](index, data, $(this));
                }
            });
        }

    });

    /*\u7528\u4e8e\u663e\u793avipbox\uff0cvip\u4ef7\u683c\u7684\u5c55\u793a*/
    $(function () {
        var vipContainer = $('.vipstock_container');
        if (vipContainer.length === 0) {
            return false;
        }

        function VipSprite(obj) {
            this.__init__(obj);
        }
        VipSprite.prototype = {
            __init__: function (obj) {
                var me = this;
                me.arrowBool = false;
                me.vipTipBool = false;
                me.vipSpriteNode = $(obj);
                me.vipArrowTip = me.vipSpriteNode.find('.moretip');
                me.vipPriceTip = me.vipSpriteNode.find('.vip-box');
                me.borderFrame = me.vipSpriteNode.find('.borderframe');
                me.OVER_ARROW_MSG = 10;
                me.OUT_ARROW_MSG = 20;
                me.OVER_VIPPRICE_MSG = 30;
                me.OUT_VIPPRICE_MSG = 40;
                me._initEvt();
            },
            _initEvt: function () {
                var me = this;
                me.vipSpriteNode.hover(function () {
                    me.borderFrame.css({
                        "border-color": "#d29000",
                        "z-index": "2"
                    });
                }, function () {
                    me.borderFrame.css({
                        "border-color": "#e3dcc0",
                        "z-index": "1"
                    });
                });

                me.vipArrowTip.hover(function () {
                    me._getMsg(me.OVER_ARROW_MSG);
                }, function () {
                    me._getMsg(me.OUT_ARROW_MSG);
                });
                me.vipPriceTip.hover(function () {
                    me._getMsg(me.OVER_VIPPRICE_MSG);
                }, function () {
                    me._getMsg(me.OUT_VIPPRICE_MSG);
                });
            },
            _getMsg: function (msg) {
                var me = this;
                switch (msg) {
                case me.OVER_ARROW_MSG:
                    me.arrowBool = true;
                    break;
                case me.OUT_ARROW_MSG:
                    me.arrowBool = false;
                    break;
                case me.OVER_VIPPRICE_MSG:
                    me.vipTipBool = true;
                    break;
                case me.OUT_VIPPRICE_MSG:
                    me.vipTipBool = false;
                    break;
                default:
                    break;
                }
                if (me.arrowBool || me.vipTipBool) {
                    me._showPriceTip();
                }

                if ((!me.arrowBool) && (!me.vipTipBool)) {
                    me._hidePriceTip();
                }

            },
            _showPriceTip: function () {
                var me = this;
                me.vipSpriteNode.addClass("status_hover");
                return false;
            },
            _hidePriceTip: function () {
                var me = this;
                me.vipSpriteNode.removeClass("status_hover");
                return false;
            }
        };
        vipContainer.each(function () {
            new VipSprite(this);
        });
    });
    // \u5546\u54c1\u6b3e\u578b\u5207\u6362
    $(function(){

        var countTitleLength = function (title, promoTitle) {
                var titleLen = title.length;
                var pTitleLen = promoTitle.length;
                var out = titleLen + pTitleLen - 37;
                if (out > 0) {
                    if (out < pTitleLen) {
                        promoTitle = promoTitle.substr(0, (pTitleLen - out)) + "...";
                    } else {
                        title = title.substr(0, titleLen - (out - pTitleLen)) + "...";
                        promoTitle = "";
                    }
                }
                return {
                    "title": title,
                    "promoTitle": promoTitle
                };
            };

        var goodsTitle = function (title, promoTitle) {
                var titles = countTitleLength(title, promoTitle);
                return titles.title + '<span class="red">' + titles.promoTitle + '</span>';
            };

        var createGoodsLink = function (sku) {
                return Global.Config.domains("WWW_URL") + 'item/' + sku;
            };

        var goodsPrice = function (salePrice, promPrice, PromTitle) {

            salePrice = parseInt(salePrice, 10);
            promPrice = parseInt(promPrice, 10);

            PromTitle = PromTitle || "\u4f18\u60e0\u4ef7";

            return (isNaN(promPrice) || promPrice <= 0) ? '<span class="gray">\u9ea6\u5305\u4ef7\uff1a</span><strong class="red">\uffe5' + salePrice + '</strong>' : '<strong class="red">' + PromTitle + '\uff1a</strong><strong class="red">\uffe5' + promPrice + '</strong> <s>\uffe5' + salePrice + '</s>';
        };

        var choiceStyleBtn = function (goodsInfo) {
            var self = this;
            var curGoods = $(goodsInfo.li);
            var goodsLink = createGoodsLink(goodsInfo.sku);

            if (curGoods.length) {
                curGoods.find(".pic").attr({
                    "href": goodsLink
                });

                curGoods.find(".pic-174").attr({
                    "src": goodsInfo.pic,
                    "title": goodsInfo.originaltitle + goodsInfo.promtitle
                }).data({
                    "sku": goodsInfo.sku
                });

                if (goodsInfo.tagpic !== "") {
                    curGoods.find(".goods-tag").html('<img src="' + goodsInfo.tagpic + '"/>').show();
                } else {
                    curGoods.find(".goods-tag").html("").hide();
                }

                curGoods.find(".name").attr({
                    "href": goodsLink
                }).html(goodsInfo.title);

                curGoods.find(".price").attr({
                    "href": goodsLink
                }).html(goodsPrice(goodsInfo.price, goodsInfo.promprice, goodsInfo.prompricetitle));
            }
        }

        $(".pro_list").find("li").each(function (index, li) {

            // \u8bbe\u7f6e\u6b3e\u5f0f\u6807\u9898
            $(li).find(".color-sel-box a").each(function (index, colorLink) {
                var originalTitle = $(colorLink).data("originaltitle");
                var promTitle = $(colorLink).data("promtitle");
                $(colorLink).data("title", goodsTitle(originalTitle, promTitle));
            });

        });

        $(".color-sel-box").find("a").on("mouseover", function(){
            var goodsInfo = $(this).data();
            choiceStyleBtn(goodsInfo);
        });
    });

    /************************
     *  Page.initPage
     ************************/
    Page.initPage = function (obj) {};

});
