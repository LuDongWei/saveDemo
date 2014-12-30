/*! seckill 1.0.0 pub 2014-06-16 14:53 by douban */
/* 官网限时秒杀插件 --By douban
 * @example
 * var sk1=SK.create({
 *     activity:"0000",  活动id和促销编号必须填写一个，支持多个
 *     sale:"0000",
 *     divID:jquer|id  秒杀输出位置支持jquery对象与id
 * })
 * SK.start();
 * @support
 * jquery seajs  handlebars
 */
define("mbb/seckill/1.0.0/seckilling-debug", [ "jquery-debug", "gallery/handlebars/1.0.0/handlebars-debug", "./template/seckill-debug.handlebars" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    var handlebars = require("gallery/handlebars/1.0.0/handlebars-debug");
    var skTemplate = require("./template/seckill-debug.handlebars");
    var seckill = exports;
    var skObject = {
        activity: "",
        //活动id (支持多个)
        sale: "",
        //促销编号 
        divID: "",
        //秒杀块id
        showDay: 0,
        //显示天数(0:今天,1:明天,2后天 等等,支持多个)
        imgSize: "100",
        //图片大小  (24 35 40 60 80 88 100 145 160 174 185 238 320 420 480 1024) 
        template: null,
        //秒杀模板
        passtitle: "距离秒杀开始",
        remainTitle: "距离秒杀结束",
        countDown: null,
        //秒杀时间显示 countDown:function(data,title,id) {},//秒杀时间输出(时间,type,促销编号) 
        showType: "html",
        //秒杀块加载方法(html|append)
        returnData: function() {},
        //返回接口数据方便处理
        begin: function() {},
        //开始秒死(本对象,有标识符号以解决多个活动id传入的情况)   
        end: function() {}
    };
    var skStandby = {
        //备用的秒杀时间设定
        beginTime: "",
        //秒杀开始时间  
        endTime: "",
        //秒杀结束时间
        amendDate: function(data_) {
            return data_;
        }
    };
    var SECKILLURL = "http://www.mbaobao.com/seckill/saleapi";
    //秒杀接口 
    var seckillArray = [];
    var activitys = [], sales = [], activitysList = "", salesList = "";
    var emptyData = [ {
        //空对象为无数据的时候进行页面的填充
        stockQty: 0,
        beginTime: "2014/5/29 9:30:38",
        endTime: "2014/5/29 14:00:51",
        passLag: "10",
        remainLag: "10",
        isSeckill: false,
        apId: "0000",
        sort: 1,
        remark: "",
        skus: [ {
            sku: 404,
            shoppePrice: "???",
            mbbPrice: "???",
            sellPrice: "???",
            priceTitle: "???",
            brandName: "???",
            categoryName: "???",
            promTitle: "",
            name: "???",
            image: "http://cca.mbaobao.com/mkts/201406/05/100/01.gif",
            stock: 0
        } ]
    } ];
    seckill.create = function(options) {
        var opts = $.extend({}, skObject, options || {});
        if (typeof opts.divID !== "object") {
            opts.divID = $("#" + opts.divID);
        }
        seckillArray.push(opts);
    };
    seckill.start = function(options) {
        var opts = $.extend(skStandby, options || {});
        for (var i = 0; i < seckillArray.length; i++) {
            if (seckillArray[i].activity !== "") {
                activitys.push(seckillArray[i]);
                activitysList = activitysList + "," + seckillArray[i].activity;
            }
            if (seckillArray[i].sale !== "") {
                sales.push(seckillArray[i]);
                salesList = salesList + "," + seckillArray[i].sale;
            }
        }
        factoryData();
    };
    //把2组数据进行组合封装,并进行相应的处理
    function factoryData() {
        seckillData(activitysList, salesList, skStandby.beginTime, skStandby.endTime).done(function(seckill_) {
            if (activitys.length !== 0) {
                for (var i = 0; i < activitys.length; i++) {
                    //判断是否为多个活动id
                    var act_id = (activitys[i].activity + "").split(",");
                    if (act_id.length === 1) {
                        singleSk(act_id[0], activitys[i], seckill_.activityID, "act");
                    } else {
                        moreSk(act_id, activitys[i], seckill_.activityID, "act");
                    }
                }
            }
            if (sales.length !== 0) {
                for (var m = 0; m < sales.length; m++) {
                    //判断是否为多个促销编号
                    var ap_id = (sales[m].sale + "").split(",");
                    if (ap_id.length === 1) {
                        singleSk(ap_id[0], sales[m], seckill_.salesList, "ap");
                    } else {
                        moreSk(ap_id, sales[m], seckill_.salesList, "ap");
                    }
                }
            }
            //全部完成的时候复位
            activitys = [], sales = [], activitysList = "", salesList = "";
        });
    }
    //单个活动id和单个促销编号
    function singleSk(id_, ce_, da_, ty_) {
        var seData = null;
        if (ty_ == "act") {
            if (da_[id_] !== undefined) {
                seData = assembly(ce_, da_[id_]);
            }
        }
        if (ty_ == "ap") {
            for (var i = 0; i < da_.length; i++) {
                if (da_[i].apId == id_) {
                    seData = assembly(ce_, [ da_[i] ]);
                }
            }
        }
        if (seData === null) {
            seData = assembly(ce_, emptyData);
        }
        createHtml(ce_, seData);
    }
    //多个活动id和多个促销编号
    function moreSk(ids_, ce_, das_, ty_) {
        var seData = null;
        var seDatas = [];
        if (ty_ == "act") {
            for (var i = 0; i < ids_.length; i++) {
                if (das_[ids_[i]] === undefined) {
                    seData = assembly(ce_, emptyData);
                } else {
                    seData = assembly(ce_, das_[ids_[i]]);
                }
                seDatas.push(seData);
            }
        }
        if (ty_ == "ap") {
            for (var m = 0; m < ids_.length; m++) {
                for (var n = 0; n < das_.length; n++) {
                    if (das_[n].apId == ids_[m]) {
                        seData = assembly(ce_, [ das_[n] ]);
                    }
                }
                if (seData === null) {
                    seData = assembly(ce_, emptyData);
                }
                seDatas.push(seData);
                seData = null;
            }
        }
        createHtml(ce_, seDatas);
    }
    //生成页面
    function createHtml(ce_, data_) {
        data_ = skStandby.amendDate(data_);
        var html = "";
        if (ce_.template === null) {
            html = skTemplate({
                seckill: data_
            });
        } else if (typeof ce_.template === "object") {
            var template = handlebars.compile(ce_.template.html());
            html = template({
                seckill: data_
            });
        } else if (typeof ce_.template === "function") {
            html = ce_.template({
                seckill: data_
            });
        }
        if (ce_.showType == "html") {
            ce_.divID.html(html);
        } else if (ce_.showType == "append") {
            ce_.divID.append(html);
        }
        ce_.returnData(data_);
    }
    //获取数据
    function seckillData(act_id_, ap_id_, begin_time_, end_time_) {
        return $.ajax({
            url: SECKILLURL,
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            data: {
                act_id: act_id_,
                ap_id: ap_id_,
                begin_time: begin_time_,
                end_time: end_time_
            }
        });
    }
    //对单个秒杀对象的分析构成一个完整的秒杀对象
    function assembly(create_, data_) {
        var skData_ = {};
        //--当前数据
        if (create_.showDay != "0") {
            if (data_[create_.showDay] === undefined) {
                skData_ = emptyData[0];
            } else {
                skData_ = data_[create_.showDay];
            }
        } else {
            skData_ = data_[0];
        }
        //--是否过期
        if (skData_.isSeckill) {
            skData_.isOverdue = false;
        } else {
            if (skData_.passLag < 0) {
                skData_.isOverdue = true;
            } else {
                skData_.isOverdue = false;
            }
        }
        //--是否秒杀时间输出
        if (create_.countDown !== null) {
            if (skData_.isSeckill) {
                //-秒杀开始 输出 距离秒杀结束时间
                skCountDown(create_, skData_.remainLag, "remainTitle", skData_.apId);
            } else {
                //-秒杀未开始 输出 距离秒杀开始时间 判断是否过期
                if (skData_.isOverdue) {
                    create_.countDown("过期了！");
                } else {
                    skCountDown(create_, skData_.passLag, "passtitle", skData_.apId);
                }
            }
        }
        //--对skus的解析
        for (var i = 0; i < skData_.skus.length; i++) {
            //--是否被抢完
            if (skData_.skus[i].stock > 0) {
                skData_.skus[i].isSellOut = false;
            } else {
                skData_.skus[i].isSellOut = true;
            }
            //--图片尺寸
            if (create_.imgSize != "100") {
                var image = skData_.skus[i].image;
                skData_.skus[i].image = image.replace("/100/", "/" + create_.imgSize + "/");
            }
            //--打折
            var promotionP = skData_.skus[i].sellPrice, marketP = skData_.skus[i].shoppePrice, decimals = 1, discount = promotionP ? String(promotionP / marketP * 10, 10).substring(0, 3) : String(promotionP / marketP * 10).substring(0, decimals + 2);
            skData_.skus[i].discount = discount + "折";
        }
        //--绑定id方便模板生成
        skData_.divID = create_.divID;
        return skData_;
    }
    //倒计时 距离秒杀开始|距离秒杀结束
    function skCountDown(ce_, time_, type_, id_) {
        var countDown = ce_.countDown;
        var title = ce_[type_];
        var output = null;
        if (type_ === "remainTitle") {
            output = ce_.end;
        }
        if (type_ === "passtitle") {
            output = ce_.begin;
        }
        if (time_ <= 0) {
            output(id_);
        } else {
            var timeDiff = setInterval(function() {
                var time = dateDiff(time_);
                time_ = time_ - 1;
                countDown(time, title, id_);
                if (time.d === 0 && time.h === 0 && time.m === 0 && time.s === 0) {
                    output(id_);
                    clearTimeout(timeDiff);
                }
            }, 1e3);
        }
    }
    function dateDiff(time) {
        var day = parseInt(time / 3600 / 24, 10), hour = parseInt(time / 3600 % 24, 10), minute = parseInt(time / 60 % 60, 10), second = parseInt(time % 60, 10);
        var day_ = (day < 10 ? "0" : "") + day, hour_ = (hour < 10 ? "0" : "") + hour, minute_ = (minute < 10 ? "0" : "") + minute, second_ = (second < 10 ? "0" : "") + second;
        var countTime = {
            d: day,
            h: hour,
            m: minute,
            s: second,
            dd: day_,
            hh: hour_,
            mm: minute_,
            ss: second_
        };
        return countTime;
    }
});

define("mbb/seckill/1.0.0/template/seckill-debug.handlebars", [ "gallery/handlebars/1.0.0/handlebars-debug" ], function(require, exports, module) {
    var Handlebars = require("gallery/handlebars/1.0.0/handlebars-debug");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [ 3, ">= 1.0.0-rc.4" ];
        helpers = helpers || {};
        for (var key in Handlebars.helpers) {
            helpers[key] = helpers[key] || Handlebars.helpers[key];
        }
        data = data || {};
        var buffer = "", stack1, options, functionType = "function", escapeExpression = this.escapeExpression, self = this, blockHelperMissing = helpers.blockHelperMissing;
        function program1(depth0, data) {
            var buffer = "", stack1, options;
            buffer += "\r\n       <li data-apId=";
            if (stack1 = helpers.apId) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.apId;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + ' >\r\n          <div class="seckill-item">\r\n             <div class="s-time">\r\n             </div>\r\n             ';
            options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
                data: data
            };
            if (stack1 = helpers.skus) {
                stack1 = stack1.call(depth0, options);
            } else {
                stack1 = depth0.skus;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            if (!helpers.skus) {
                stack1 = blockHelperMissing.call(depth0, stack1, options);
            }
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += " \r\n            ";
            stack1 = helpers["if"].call(depth0, depth0.isSeckill, {
                hash: {},
                inverse: self.program(7, program7, data),
                fn: self.program(5, program5, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "      \r\n            ";
            stack1 = helpers["if"].call(depth0, depth0.isOverdue, {
                hash: {},
                inverse: self.noop,
                fn: self.program(9, program9, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "\r\n             \r\n            ";
            stack1 = helpers["if"].call(depth0, depth0.isSeckill, {
                hash: {},
                inverse: self.program(17, program17, data),
                fn: self.program(11, program11, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += " \r\n          </div>\r\n        </li> \r\n     ";
            return buffer;
        }
        function program2(depth0, data) {
            var buffer = "", stack1;
            buffer += '      \r\n             <div class="s-pic">\r\n                   <span>还剩';
            if (stack1 = helpers.stock) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.stock;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '</span>\r\n                   <a href="http://www.mbaobao.com/item/';
            if (stack1 = helpers.sku) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.sku;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '" target="_blank"><img src=';
            if (stack1 = helpers.image) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.image;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + " alt=";
            if (stack1 = helpers.name) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.name;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + ' /></a>\r\n             </div>\r\n             <div class="s-content">\r\n                <div class="s-inf">\r\n                    <p class="shoppeP"><del>市场价￥';
            if (stack1 = helpers.shoppePrice) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.shoppePrice;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '</del></p>\r\n                    <p class="sellP">秒杀价<span>￥</span><span>';
            if (stack1 = helpers.sellPrice) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.sellPrice;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '</span></p> \r\n                </div>\r\n                <div class="s-buy">\r\n                    <span class="s-but">\r\n                        <i></i> \r\n                        <a href="http://cart.mbaobao.com/do/items/add/';
            if (stack1 = helpers.sku) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.sku;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '/1.html" target="_blank">秒</a>\r\n                    </span> \r\n                </div>           \r\n            </div>\r\n                ';
            stack1 = helpers["if"].call(depth0, depth0.isSellOut, {
                hash: {},
                inverse: self.noop,
                fn: self.program(3, program3, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "\r\n            ";
            return buffer;
        }
        function program3(depth0, data) {
            return '\r\n                  <div class="no-stockQty">\r\n                       已经抢购完\r\n                  </div>\r\n                ';
        }
        function program5(depth0, data) {
            return '    \r\n                <div class="have-begin">\r\n                     秒杀开始\r\n                </div>\r\n                ';
        }
        function program7(depth0, data) {
            return '\r\n                <div class="no-begin">\r\n                     未开始 \r\n                </div>\r\n            ';
        }
        function program9(depth0, data) {
            return '\r\n                <div class="no-stockQty">\r\n                     已经过期\r\n                </div>\r\n            ';
        }
        function program11(depth0, data) {
            var buffer = "", stack1, options;
            buffer += "\r\n                   ";
            options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(12, program12, data),
                data: data
            };
            if (stack1 = helpers.skus) {
                stack1 = stack1.call(depth0, options);
            } else {
                stack1 = depth0.skus;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            if (!helpers.skus) {
                stack1 = blockHelperMissing.call(depth0, stack1, options);
            }
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "    \r\n               ";
            return buffer;
        }
        function program12(depth0, data) {
            var buffer = "", stack1;
            buffer += "\r\n                   ";
            stack1 = helpers["if"].call(depth0, depth0.isSellOut, {
                hash: {},
                inverse: self.program(15, program15, data),
                fn: self.program(13, program13, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "\r\n                   ";
            return buffer;
        }
        function program13(depth0, data) {
            return "\r\n                     ";
        }
        function program15(depth0, data) {
            return "\r\n                   ";
        }
        function program17(depth0, data) {
            var buffer = "", stack1;
            buffer += "\r\n                   ";
            stack1 = helpers["if"].call(depth0, depth0.isOverdue, {
                hash: {},
                inverse: self.program(15, program15, data),
                fn: self.program(18, program18, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "  \r\n            ";
            return buffer;
        }
        function program18(depth0, data) {
            return " \r\n                     ";
        }
        buffer += '<ul class="mbbSeckill">\r\n     ';
        options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        };
        if (stack1 = helpers.seckill) {
            stack1 = stack1.call(depth0, options);
        } else {
            stack1 = depth0.seckill;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        if (!helpers.seckill) {
            stack1 = blockHelperMissing.call(depth0, stack1, options);
        }
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += "\r\n </ul>";
        return buffer;
    });
});
