/* 官网限时秒杀插件
 * 当刷新或者商品发生点击的时候刷新接口 ？
 * 
 * 
 */
define(function(require, exports, module) {
	var $ = require("jquery");
	    require("gallery/handlebars/1.0.0/handlebars");

	var seckill = exports;

	var skObject = {
			activity: "",            //活动id (支持多个)
			sale: "",                //促销编号 
			divID: "",               //秒杀块id
			showDay: 0,              //显示天数(0:今天,1:明天,2后天 等等,支持多个)
			imgSize: "100",          //图片大小  (24 35 40 60 80 88 100 145 160 174 185 238 320 420 480 1024) 
			template: null,          //秒杀模板    
			countDown: null,         //秒杀时间显示
			begin: function() {},    //开始秒死(本对象,有标识符号以解决多个活动id传入的情况)   
			end: function() {}       //结束秒杀(本对象,有标识符号以解决多个活动id传入的情况)   
    }
		//   countDown: function(passLag_, remainLag_, objects_) { 
		// },//秒杀时间输出(离开始秒杀，离结束秒杀,本对象) 

	var skStandby = {       //备用的秒杀时间设定
		beginTime: "",      //秒杀开始时间  
		endTime: "",        //秒杀结束时间
	}

	var SECKILLURL = "http://www.mshop.cn/seckill/saleapi";   //秒杀接口 
	var seckillArray = [];
	var activitys = [],
		sales = [],
		activitysList = "",
		salesList = "";

	var emptyData = [{                      //空对象为无数据的时候进行页面的填充
		stockQty: 0,
		beginTime: "2014/5/29 9:30:38",
		endTime: "2014/5/29 14:00:51",
		passLag: "888",
		remainLag: "888",
		isSeckill: "false",
		apId: 0000,
		sort: 1,
		remark: "",
		skus: [{
			sku: 1404002502,
			shoppePrice: "???",
			mbbPrice: "???",
			sellPrice: "???",
			priceTitle: "???",
			brandName: "???",
			categoryName: "???",
			promTitle: "",
			name: "???",
			image: "http://cdn06.mbbimg.cn/1404/14040025/02/100/01.jpg",
			stock: 0
		}]
	}];


	seckill.create = function(options) {
		var opts = $.extend({}, skObject, options || {});

		seckillArray.push(opts);
	}

	seckill.start = function(options) {
		var opts = $.extend(skStandby, options || {});

		for (var i = 0; i < seckillArray.length; i++) {
			if (seckillArray[i].activity != "") {
				activitys.push(seckillArray[i]);
				activitysList = activitysList + "," + seckillArray[i].activity;
			}
			if (seckillArray[i].sale != "") {
				sales.push(seckillArray[i]);
				salesList = salesList + "," + seckillArray[i].sale;
			}
		};

		// console.log(activitys)
		// console.log(sales)

		factoryData();
	}



	//把2组数据进行组合封装,并进行相应的处理
	function factoryData() {
		seckillData(activitysList, salesList, skStandby.beginTime, skStandby.endTime).done(function(seckill_) {
			// var seckill_ = data_;

			if (activitys.length != 0) {
				for (var i = 0; i < activitys.length; i++) {
					//判断是否为多个活动id
					var act_id = activitys[i].activity.split(",");
					if (act_id.length === 1) {
						singleSk(act_id[0], activitys[i], seckill_.activityID, "act");
					} else {
						moreSk(act_id, activitys[i], seckill_.activityID, "act");
					}
				};
			}

			if (sales.length != 0) {
				for (var i = 0; i < sales.length; i++) {
					//判断是否为多个促销编号
					var ap_id = sales[i].sale.split(",");
					if (ap_id.length === 1) {
						singleSk(ap_id[0], sales[i], seckill_.salesList, "ap");
					} else {
						moreSk(ap_id, sales[i], seckill_.salesList, "ap");
					}
				};
			}

		})
	}

	//单个活动id和单个促销编号
	function singleSk(id_, ce_, da_, ty_) {
		var seData = null;

		if (ty_ == "act") {
			if (da_[id_] != undefined) {
				seData = assembly(ce_, da_[id_]);
			}
		}

		if (ty_ == "ap") {
			for (var i = 0; i < da_.length; i++) {
				if (da_[i].apId == id_) {
					seData = assembly(ce_, [da_[i]]);
				}
			};
		}

		if (seData == null) {
			seData = assembly(ce_, emptyData);
		}

		console.log(seData)
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
			};
		}

		if (ty_ == "ap") {
			for (var i = 0; i < ids_.length; i++) {
				for (var n = 0; n < das_.length; n++) {
					if (das_[n].apId == ids_[i]) {
						seData = assembly(ce_, [das_[n]]);
					}
				};
				if (seData == null) {
					seData = assembly(ce_, emptyData);
				}
				seDatas.push(seData);
				seData = null;
			};
		}

		console.log(seDatas) 
	}

	//生成页面
	function createHtml() {


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
		//是否启用新的模板 ？

		var skData_ = {}; //当前秒杀数据

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

		//--是否秒杀时间输出
		if (create_.countDown != null) {
			if (skData_.isSeckill) {
				//-秒杀开始 输出 距离秒杀结束时间
				create_.countDown("123");
			} else {
				//-秒杀未开始 输出 距离秒杀开始时间 
				create_.countDown();
			}
		}

		//--是否被抢完
		if (skData_.stockQty > 0) {
			skData_.isSellOut = "false";
		} else {
			skData_.isSellOut = "true";
		}

		//--对skus的解析
		for (var i = 0; i < skData_.skus.length; i++) {
			//--是否有库存
			if (skData_.skus[i].stock > 0) {
				skData_.skus[i].isStock = "true";
			} else {
				skData_.skus[i].isStock = "false";
			}

			//--图片尺寸
			if (create_.imgSize != "100") {
				var image = skData_.skus[i].image;
				skData_.skus[i].image = image.replace("100", create_.imgSize);
			}

			//--打折
			var promotionP = skData_.skus[i].sellPrice,
				marketP = skData_.skus[i].shoppePrice,
				decimals = 1,
				discount = promotionP ? String(promotionP / marketP * 10, 10).substring(0, 3) : String(promotionP / marketP * 10).substring(0, (decimals + 2));
			skData_.skus[i].discount = discount + "折";

		};

		//--绑定id方便模板生成
		skData_.divID = create_.divID;

		return skData_;
		// console.log(create_)
		// console.log(skData_)
	}



})