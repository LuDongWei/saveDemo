define(function(require, exports, moudles) {
	var $ = require('jquery');
	require("easing")($);
	var handlebars = require('handlebars');

    var dataJ=[];
dataJ=[ ['2013-9-1','98','13215804191','1308004601'],
        ['2013-9-1','99','13215804191','1308004601'],
        ['2013-9-1','143','15914031160','1307003903'],
        ['2013-9-1','131','rosalie1119@163.com','1406001001'],
        ['2013-9-1','208','18825159485','1311000301'],
        ['2013-9-1','175','2088002497319607_alipay@mbaobao.com','1108007230'],
        ['2013-9-1','137','1848595107@qq.com','1110018301'],
        ['2013-9-1','144','15220004175@126.com','1404005101'],
        ['2013-9-1','153','QQ_BF4F25FD0CD6F4B4FEA86F39F41EFBA2','1406003601'],
        ['2013-9-1','267','tanjinjin@yeah.net','1404003502'],
        ['2013-9-1','83','779887088@qq.com','1302006501'],
        ['2013-9-1','239','634351263@qq.com','1308000102'],
        ['2013-9-1','113','2088002987433673_alipay@mbaobao.com','1308014901'],
        ['2013-9-1','278','348019326@qq.com','1406004101'],
        ['2013-9-1','204','835551525@qq.com','1406003101'],
        ['2013-9-1','122','a200445215@126.com','1405004301'],
        ['2013-9-1','149','779633715@qq.com','1307011507'],
        ['2013-9-1','99','429321281@qq.com','1312002802'],
        ['2013-9-1','166','190524386@qq.com','1311003201'],
        ['2013-9-1','188','547117088@qq.com','1209005303'],
        ['2013-9-1','163','943171668@qq.com','1403000202'],
        ['2013-9-1','229','260382381@qq.com','1303022803'],
        ['2013-9-1','82','QQ_2AFD65BDD5E3E54B85952F916C228D00','1106002111'],
        ['2013-9-1','114','445225205@qq.com','1110018303'],
        ['2013-9-1','152','QQ_2E2BCC2B7846E210F42DDC6DB66EB2E2','1307002308'],
        ['2013-9-1','108','zhangyao1006@yahoo.cn','1308015301'],
        ['2013-9-1','93','5155970@51fanli','1312000801'],
        ['2013-9-1','168','13815650873','1310004901'],
        ['2013-9-1','198','123973157_360@mbaobao.com','1307013901'],
        ['2013-9-1','158','2088002601616822_alipay@mbaobao.com','1311001801'],
        ['2013-9-1','104','806001248@qq.com','1209003802'],
        ['2013-9-1','67','1595415326@qq.com','1307013104'],
        ['2013-9-1','338','kevinyan86@126.com','1406004501'],
        ['2013-9-1','179','sunshinecutegirl@sina.cn','1406001401'],
        ['2013-9-1','178','13811391522','1404002401'],
        ['2013-9-1','148','184757761@qq.com','1405001110'],
        ['2013-9-1','122','502152607@qq.com','1208013201'],
        ['2013-9-1','98','13510699803','1403004101'],
        ['2013-9-1','272','sichuanjiangting8@163.com','1403002701'],
        ['2013-9-1','161','402193125@qq.com','1306006601'],
        ['2013-9-1','123','18666566184','1404006102'],
        ['2013-9-1','129','QQ_F8BAD5D267554E0A17E9A5B316C13597','1311006302'],
        ['2013-9-1','158','390831356@qq.com','1308002903'],
        ['2013-9-1','323','kinki83820@hotmail.com','1308000201'],
        ['2013-9-1','112','QQ_47062EA15C456B9333CC59B960F84947','1405004803'],
        ['2013-9-1','284','chengzi05@qq.com','1401000102'],
        ['2013-9-1','181','8170587298_netease@mbaobao.com','1311000201'],
        ['2013-9-1','104','QQ_ED231CD7A36CCA8DEA8F2C4FBB26244A','1309003206'],
        ['2013-9-1','122','527114691@qq.com','1405004801'],
        ['2013-9-1','171','330872376@qq.com','1404002501'],
        ['2013-9-1','306','comeonqiuhua@163.com','1309006805'],
        ['2013-9-1','203','2088802797918203_alipay@mbaobao.com','1404001503'],
        ['2013-9-1','149','pianpian.h@163.com','1406002401'],
        ['2013-9-1','137','595621110@qq.com','1302006601'],
        ['2013-9-1','79','270683488@qq.com','1404006401'],
        ['2013-9-1','112','1498128893@qq.com','1405004302'],
        ['2013-9-1','163','18810524580','1405001601'],
        ['2013-9-1','338','4999533@51fanli','1308008101'],
        ['2013-9-1','171','10107661@qq.com','1311001501'],
        ['2013-9-2','93','15918166003','1308013302'],
        ['2013-9-2','94','QQ_C540905A468AAA049CBEB337A733EB65','1404001702'],
        ['2013-9-2','92','QQ_9E43A69C5AD1F483F4645867F62B8F73','1307013902'],
        ['2013-9-2','123','nndxtwmxy@126.com','1311003301'],
        ['2013-9-2','124','jiangxinwa10@sohu.com','1304015702'],
        ['2013-9-2','199','QQ_7CB945C2CD60B1FD13620B75CD09BF1E','1406002001'],
        ['2013-9-2','103','2088702468840357_alipay@mbaobao.com','1209047901'],
        ['2013-9-2','248','QQ_CE7E03DF52A132C2B07C5C8D0BD86084','1304020202'],
        ['2013-9-2','50','stellaqianjing@sohu.com','1408006801'],
        ['2013-9-2','216','13918028103','1406000702'],
        ['2013-9-2','166','mengru561@163.com','1404006302'],
        ['2013-9-2','83','sina_1690051123@mbaobao.com','1212035903'],
        ['2013-9-2','312','13621930475','1405005501'],
        ['2013-9-2','152','15215106400','1312003702'],
        ['2013-9-2','144','398194066@qq.com','1404005803'],
        ['2013-9-2','217','sunhongjie_baixue@126.com','1407003902'],
        ['2013-9-2','138','QQ_E29ACEF4DF9E5110D7646C577831E758','1405001106'],
        ['2013-9-2','187','QQ_36E0131C21EB18358867C33753734792','1309005802'],
        ['2013-9-2','129','17332909@51fanli','1404005001'],
        ['2013-9-2','143','mashujian@21cn.com','1207020502'],
        ['2013-9-2','178','QQ_BCA5BA70C0C98B5169140824F1215E6C','1308006501'],
        ['2013-9-2','149','MB13053276_comm@mbaobao.com','1404004902'],
        ['2013-9-2','185','13928048767','1403002902'],
        ['2013-9-2','123','yishelle@163.com','1310005703'],
        ['2013-9-2','103','xinwoyang@126.com','1404002801'],
        ['2013-9-2','149','gl1128@sina.cn','1404001202'],
        ['2013-9-2','60','13918028103','1406003402'],
        ['2013-9-2','119','236046984@qq.com','1308014601']
    ];


	exports.miand = function() {
		jsonpContent();
		analysisSku();
	}

	//剩下的名单
	var jsonpContent = function() {
		$.ajax({
			url: 'http://www.mbaobao.com/activity/freeOrder',
			type: 'get',
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			success: function(data) {
				$('.number').text(data.data);
			}
		})
	}

	//浮动框
	$("body").on("mouseover", ".h-f a", function() {
		$(this).find("b").stop().animate({
			width: 120
		}, 800, "easeOutQuint")
	}).on("mouseout", ".h-f a", function() {
		$(this).find("b").stop().animate({
			width: 0
		}, 800, "easeOutQuint")
	})


	//解析字符串
	var analysisSku = function() {
		var sku = '';
		for (var i = 0; i < dataJ.length; i++) {
			sku = sku + dataJ[i][3] + ',';
		};
		jsonGoods(sku);
	}

	//提取商品图片名称
	var jsonGoods = function(sku) {
		$.ajax({
			url: 'http://www.mbaobao.com/ajax/sku?all=false&presell=false&size=174&skus=' + sku,
			type: 'get',
			dataType: 'jsonp',
			jsonp: 'jsoncallback',
			success: function(data) {
				newData(data);
			}
		});
	}

	//从新封装
	var newDatal = []; //商品
	var page = 0; //当前页数
	var pageGoods = 9; //每页显示的商品数
	var allPage = 0; //总共的商品页数
	var _numb = 0; //编号
	var newData = function(data) {
		var useGoods = {};
		for (var i = 0; i < dataJ.length; i++) {
			var sku = dataJ[i][3];
			for (var n = 0; n < data.length; n++) {
				if (sku == data[n].sku_id) {
					_numb = parseInt(_numb);
					_numb += 1;
					useGoods = {
						_time: dataJ[i][0],
						_price: dataJ[i][1],
						_use: dataJ[i][2].substring(0,5)+'...',
						_image: data[n]._image,
						_name: data[n]._name,
						_sku_id: data[n].sku_id,
						_numb: _numb < 10 ? '0' + _numb : _numb
					};
					newDatal.push(useGoods);
					break;
				};
			};

		};
		var goods_num = newDatal.length;
		goods_num % 9 == 0 ? allPage = goods_num / 9 : allPage = parseInt(goods_num / 9);
		htmlPage();
		allGoods();
	}

	//屏幕上显示的商品
	var allGoods = function() {
		var nextData = [];
		for (var i = page * pageGoods; i < page * pageGoods + pageGoods; i++) {
			nextData.push(newDatal[i]);
		};

		var data = {
			useGoods: nextData
		}
		htmlGoods(data);
		redPage();
	}

	//生成的商品信息反映到页面
	var htmlGoods = function(data) {
		var template = handlebars.compile($('#useGoods-temolate').html());
		$('.avoidUsers ul').html(template(data));
	}

	//页码显示
	var htmlPage = function() {
		var htmlp = '<li class="red">1</li>';
		for (var i = 2; i < allPage + 1; i++) {
			htmlp = htmlp + '<li>' + i + '</li>';
		};
		var dom = $('<ul>' + htmlp + '</ul>')
		//加入点击事件
		dom.find('li').click(function() {
		    page=$(this).text()-1;
		    allGoods();
		})
		$('.mainPage').html(dom);
	}

	//改变页码
    var redPage=function(){
       $('.mainPage ul').find('li').removeClass('red');
       $('.mainPage ul').find('li').eq(page).addClass('red');
    }  

	//上一页
	$('.controller .topButton').click(function() {
		if (page >= 1) {
			page -= 1;
			allGoods();
		}
	})

	//下一页
	$('.controller .bottomButton').click(function() {
		if (page < allPage - 1) {
			page += 1;
			allGoods();
		}
	})


})