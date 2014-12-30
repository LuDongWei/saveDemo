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
define(function(require, exports, module) {
    var $ = require("jquery");
    var handlebars = require("gallery/handlebars/1.0.0/handlebars");
    var skTemplate = require("./template/seckill.handlebars");

    var seckill = exports;

    var skObject = {
        activity: "",              //活动id (支持多个)
        sale: "",                  //促销编号 
        divID: "",                 //秒杀块id
        showDay: 0,                //显示天数(0:今天,1:明天,2后天 等等,支持多个)
        imgSize: "100",            //图片大小  (24 35 40 60 80 88 100 145 160 174 185 238 320 420 480 1024) 
        template: null,            //秒杀模板
        passtitle: "距离秒杀开始",
        remainTitle: "距离秒杀结束",
        countDown: null,           //秒杀时间显示 countDown:function(data,title,id) {},//秒杀时间输出(时间,type,促销编号) 
        showType: "html",          //秒杀块加载方法(html|append)
        returnData:function() {},  //返回接口数据方便处理
        begin: function() {},      //开始秒死(本对象,有标识符号以解决多个活动id传入的情况)   
        end: function() {}         //结束秒杀(本对象,有标识符号以解决多个活动id传入的情况)          
    }

    var skStandby = {   //备用的秒杀时间设定
        beginTime: "",  //秒杀开始时间  
        endTime: "" ,   //秒杀结束时间
        amendDate:function(data_){return data_}     //修改接口数据
    }

    var SECKILLURL = "http://www.mbaobao.com/seckill/saleapi";   //秒杀接口 
    var seckillArray = [];
    var activitys = [],
        sales = [],
        activitysList = "",
        salesList = "";

    var emptyData = [{           //空对象为无数据的时候进行页面的填充
        stockQty: 0,
        beginTime: "2014/5/29 9:30:38",
        endTime: "2014/5/29 14:00:51",
        passLag: "10",
        remainLag: "10",
        isSeckill: false,
        apId: "0000",
        sort: 1,
        remark: "",
        skus: [{
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
        }]
    }];


    seckill.create = function(options) {
        var opts = $.extend({}, skObject, options || {});

        if (typeof(opts.divID) !== "object") {
            opts.divID = $("#" + opts.divID);
        }

        seckillArray.push(opts);
    }

    seckill.start = function(options) {
        var opts = $.extend(skStandby, options || {});

        for (var i = 0; i < seckillArray.length; i++) {
            if (seckillArray[i].activity !== '') {
                activitys.push(seckillArray[i]);
                activitysList = activitysList + "," + seckillArray[i].activity;
            }
            if (seckillArray[i].sale !== '') {
                sales.push(seckillArray[i]);
                salesList = salesList + "," + seckillArray[i].sale;
            }
        }

        factoryData();
    }

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
            activitys = [],
            sales = [],
            activitysList = "",
            salesList = "";
        })
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
                    seData = assembly(ce_, [da_[i]]);
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
                        seData = assembly(ce_, [das_[n]]);
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
        
        data_=skStandby.amendDate(data_);
       
        var html = "";
        
        if (ce_.template === null) {
            html = skTemplate({
                seckill: data_
            });
        } else if(typeof(ce_.template) === "object"){
            var template = handlebars.compile(ce_.template.html());
            html = template({
                seckill: data_
            });
        } else if(typeof(ce_.template) === "function"){
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
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            data: {
                act_id: act_id_,
                ap_id: ap_id_,
                begin_time: begin_time_,
                end_time: end_time_
            }
        })
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
                    create_.countDown("过期了！")
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
            var promotionP = skData_.skus[i].sellPrice,
                marketP = skData_.skus[i].shoppePrice,
                decimals = 1,
                discount = promotionP ? String(promotionP / marketP * 10, 10).substring(0, 3) : String(promotionP / marketP * 10).substring(0, (decimals + 2));
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
            output(id_)
        } else {
            var timeDiff = setInterval(function() {
                var time = dateDiff(time_);
                time_ = time_ - 1;
                countDown(time, title, id_);

                if (time.d === 0 && time.h === 0 && time.m === 0 && time.s === 0) {
                    output(id_);
                    clearTimeout(timeDiff);
                }
            }, 1000)
        }
    }

    function dateDiff(time) {
        var day = parseInt(time / 3600 / 24, 10),
            hour = parseInt(time / 3600 % 24, 10),
            minute = parseInt(time / 60 % 60, 10),
            second = parseInt(time % 60, 10);

        var day_ = (day < 10 ? "0" : "") + day,
            hour_ = (hour < 10 ? "0" : "") + hour,
            minute_ = (minute < 10 ? "0" : "") + minute,
            second_ = (second < 10 ? "0" : "") + second;

        var countTime = {
            d: day,
            h: hour,
            m: minute,
            s: second,
            dd: day_,
            hh: hour_,
            mm: minute_,
            ss: second_
        }

        return countTime;
    }

})