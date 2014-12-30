/*global define:true, seajs:true*/

define(function (require, exprots, module) {
    var $ = require("jquery");
    var markers = [];

    /**
     * 仿淘宝广告区域的遮罩效果
     * @param  {string} boxCls  最外层广告元素样式名
     * @param  {string} itemCls 所有需要增加遮罩的样式名
     * @param  {array} sizeArr 提供第一个子区的广告尺寸，可以不提供
     */
    exprots.init = function (boxCls, itemCls, sizeArr) {

        var box = $(boxCls);
        itemCls = itemCls || "a";

        box.find(itemCls).each(function (i) {
            var self = $(this);
            var arr, w, h, marker;
            if (typeof sizeArr !== "undefined") {
                arr = sizeArr[i].split(",");
                w = arr[0];
                h = arr[1];
            } else {
                w = self.width() || self.find("img").attr("width");
                h = self.height() || self.find("img").attr("height");
            }
            marker = $('<div style="cursor:pointer;top:0;left:0;position:absolute;width:' + w + 'px;height:' + h + 'px;filter:alpha(opacity=0);opacity: 0;background-color:#000;"></div>');
            self.css({
                "position": "relative"
            });
            self.append(marker);
            self.mouseover(function () {
                var i;
                for (i = 0; i < markers.length; i++) {
                    markers[i].show().css({
                        "opacity": '0.2',
                        "filter": "alpha(opacity=20)"
                    });
                }
                marker.hide();
            });
            markers.push(marker);

        });

        box.mouseleave(function () {
            var i;
            for (i = 0; i < markers.length; i++) {
                markers[i].css({
                    "opacity": '0',
                    "filter": "alpha(opacity=0)"
                });
            }
        });
    };
});