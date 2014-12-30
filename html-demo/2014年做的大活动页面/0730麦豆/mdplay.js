define(function (require, exports, module) {

	var $ = require("jquery");
	var Global = require("global");
	
	var simpleModal = require("simplemodal")($);

	var MKT_URL = Global.Config.domains("MKT_URL");
	
	var GetUserMpea_PATH = MKT_URL + 'ajax/AllowLotteryMpeaCount';//用户是否符合条件
	var Anniversary_PATH = MKT_URL + 'ajax/LotteryMpea';//抽奖
	
	var LuckyDraw = exports;
	
	var GetLotteryNumber = function(){
		$.ajax({
			type: 'get',
			url: GetUserMpea_PATH,
			data: {
				active_id : 1251,
				d : Math.round(new Date().getTime() / 1000)
			},
			dataType : 'json',
			success: function (json) {
				if(json.result == true){
					if(Global.User.isLogin()){
						$('.Lottery-number').html('你还有  '+json.data.surplusNum+'  次抽奖机会');
					}else{
						var html = '<div><a href="#" style="color:#ff6161;text-decoration:underline;">点击登录查看抽奖机会</a></div>';
						var dom = $(html);
							dom.find('a').click(function(){
								Global.User.passport(function () {
									GetLotteryNumber();
								});
								return false;
							});
						$('.Lottery-number').html(dom);
					}
					
				}
			},
			error: function () {}
		});
	};
	
	GetLotteryNumber();
	
	var LuckyWheel = function (EventTarget, Config) {
		
		var _this = this;
		
		this.target = $(EventTarget);
		this.config = {

			luckywheelID : 1251,
			userState : "NOT-LOGGED-IN",
			isThanksJoin : true,

			awardNum : 12,
			awardBoxes : "",

			isBegin : true,
			isRunning : false,
			msg : {
				"NOT-LOGGED-IN" : '您还没登录'
			},
			//resultData: e,

			//------------------------------------------Roll Config
			rollStartSpeed : 300,
			rollStartIndex : 0,       					//当前亮区
			rollPrevIndex  : 0,       					//前一位置
			rollEndIndex   : 10,		  				//哪一格变慢
			rollTime       :  null,  				 	//定义对象
			rollArr        : [],	//初始化数组
			rollCycle      : 0,    						//转动圈数
			rollEndCycle   : 0,							//计算圈数
			rollFlag       : false,						//结束转动标志
			rollQuick      : 0,							//加速
			//--------------------------------------------------------
			
			resultId : 1,
			resultTable : {
				'30' : [0,3],
				'50' : [2,7],
				'300' : [4,6,10],
				'500' : [5,9,11],
				'1000' : [1],
				'2000' : [8]
			},
			

			Success : function (resultId, resultData) {//抽奖结果处理
				_this._resultShow('GET-WIN', resultId, resultData);
			}
		};
		
		this.create();
	};

	LuckyWheel.prototype = {

		_controlMachine : function () {
			
			var _this = this;
			var _config = _this.config;
				_config.rollArr = _this._setRunNum(_config.awardNum);

			var _OperateBtn = _this.target.find("#J_OperateBtn");
			
			//------------获取服务器抽奖结果------------

			_OperateBtn.bind('click', function(){
				Global.User.passport(function () {
					_ajaxServe();
				});
				return false;
			});

			function _ajaxServe(){

				if (_config.isBegin && !_config.isRunning) {
					_config.isRunning = true;
					
					$.ajax({
						type: 'get',
						url: Anniversary_PATH,
						data: {
							active_id : _config.luckywheelID,
							d : Math.round(new Date().getTime() / 1000)
						},
						dataType : 'json',
						success: function (json) {
							if(json.result == true){//抽奖
								
								var resultI = parseInt(Math.random() * _config.resultTable[json.data.mpea].length)
								_config.resultId = _config.resultTable[json.data.mpea][resultI];//获取中奖结果Id
								GetLotteryNumber();//更新抽奖机会
								setTimeout(function() {
									_this._runMachine(json.data);
								}, 100)
								
							}else{
								if(json.error_code == 102){
									alert("对不起，此活动您已经参加过了！");
									_config.isRunning = false;
								}else if(json.error_code == 103){
									alert("对不起，只有注册周年和当月生日的会员才能抽奖！");
									_config.isRunning = false;
								}else if(json.error_code == 002){
									alert("对不起，您尚末登陆，请登陆后抽奖！");
									_config.isRunning = false;
								}else{
									alert(json.message);
									_config.isRunning = false;
								}
							}
						},
						error: function () {}
					});
				}
			}
			
		},
		_runMachine : function (resultData) {
			var _this = this;
			var _config = _this.config;
			
			clearInterval(_config.rollTime);
			_config.rollCycle = 0;
			_config.rollFlag = false;
			_config.rollEndIndex = Math.floor(Math.random() * 10) + 1;
			_config.rollEndCycle = 2;
			_config.rollTime = setInterval(_setRunAnim, _config.rollStartSpeed);

			_this.target.find('#J_AwardMask').show();
			
			function _setRunAnim(){

				if (_config.rollFlag == false) {
					
					if (_config.rollQuick == 5) {
						clearInterval(_config.rollTime);
						_config.rollStartSpeed = 50;
						_config.rollTime = setInterval(_setRunAnim, _config.rollStartSpeed);
					}
					if (_config.rollCycle == _config.rollEndCycle + 1 && _config.rollStartIndex == parseInt(_config.rollEndIndex)) {//跑N圈减速
						clearInterval(_config.rollTime);
						_config.rollStartSpeed = 300;
						_config.rollFlag = true; //触发结束
						_config.rollTime = setInterval(_setRunAnim, _config.rollStartSpeed);
					}
				}
				if (_config.rollStartIndex >= _config.rollArr.length) {
					_config.rollStartIndex = 0;
					_config.rollCycle++;
				}
				if (_config.rollFlag == true && _config.rollStartIndex == parseInt(_config.resultId)) {//结束转动并选中号码
					_config.rollQuick = 0;
					clearInterval(_config.rollTime);
					
					//--------------显示抽奖结果--------------
					setTimeout(function() {
						_config.Success(_config.resultId, resultData);
						_config.isRunning = false;
					},200);

				}
				_this.target.find('#J_AwardBox' + _config.rollArr[_config.rollStartIndex]).addClass("selectedBox");
				if(_config.rollStartIndex > 0){
					_config.rollPrevIndex = _config.rollStartIndex - 1;
				}else {
					_config.rollPrevIndex = _config.rollArr.length - 1;
				}
				_this.target.find('#J_AwardBox' + _config.rollArr[_config.rollPrevIndex]).removeClass("selectedBox");
				_config.rollStartIndex++;
				_config.rollQuick++;
			};
			
		},
		_setRunNum : function (n){
			var resultArr = [];
			for (var i = 0; i < n; i++) {
				resultArr.push(i);
			}
			return resultArr;
		},
		_resultShow : function(status, resultId, resultData){
			var _this = this;
			var _resultData = resultData ? resultData : {};
			var resultHtml,resultDom;
				
			if(status === 'GET-WIN'){//中奖
				resultHtml = 	'<div class="J-result-box" style="border:2px solid #fce36f;width:384px;height:180px;background:#ffe795;color:#e82335;position:relative;font-family:Microsoft YaHei">'+
								'<span class="J_CloseResult popup-close" style="width:40px;height:40px;font-size:24px;float:right;cursor:pointer">X</span>'+
								'<div class="result-content" id="J_ResultContent">'+
									'<div class="tips-content" style="padding:20px 10px;background:url(http://cca.mbaobao.com/mkts/201311/29/mbaoclear/luck_ok.png) no-repeat 120px 12px;padding-left:40px">'+
										'<h4 class="maximum" style="padding-bottom:10px;padding-left:50px">恭喜您!</h4>'+
										'<div style="margin:0 auto;text-align:center;font-size:22px;line-height:35px"><p>'+
										'获得了 '+_resultData.mpea+' 个麦豆<br/>'+
										'可抵现金 '+parseInt(_resultData.mpea/10)+' 元'+
										'</p>'+
										'</div>'+
									'</div>'+
								'</div>'+
								'</div> ';
			}
			
			LuckyDraw.popup(resultHtml, 400, 200);

		},
		create : function () {this._controlMachine();}

	};

	
	//生成接口
	LuckyDraw.create = function (target, config) {
		new LuckyWheel(target, config);
	}
	
	
	//弹窗
	LuckyDraw.popup = function(_thisHtml,_thisWidth,_thisHeight){
		$.modal(_thisHtml, {
			autoResize: true,
			minWidth: _thisWidth,
			minHeight: _thisHeight,
			closeClass: 'popup-close'
		});
	}

});
