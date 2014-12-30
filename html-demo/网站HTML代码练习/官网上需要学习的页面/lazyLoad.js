/*global define:true, seajs:true*/
define("http://cca.mbaobao.com/static/p/home/0.4/lazyLoad", [ "jquery" ], function(require, exports, module) {
    var $ = require("jquery");
    var lazyLoad = exports;
    lazyLoad.init = function(option) {
        var settings = {
            defObj: null,
            defHeight: -200
        };
        settings = $.extend(settings, option || {});
        var defHeight = settings.defHeight;
        var defObj = typeof settings.defObj === "object" ? settings.defObj.find("img") : $(settings.defObj).find("img");
        var pageTop = function() {
            return document.documentElement.clientHeight + Math.max(document.documentElement.scrollTop, document.body.scrollTop) - settings.defHeight;
        };
        var imgLoad = function() {
            defObj.each(function() {
                if ($(this).offset().top <= pageTop()) {
                    var src2 = $(this).attr("src2");
                    if (src2) {
                        $(this).attr("src", src2).removeAttr("src2");
                    }
                }
            });
        };
        imgLoad();
        $(window).bind("scroll", function() {
            imgLoad();
        });
    };
});
