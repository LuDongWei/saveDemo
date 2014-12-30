/*
 * app秒杀插件(时间部分)  --By douban
 *  @address
 *  http://cca.mbaobao.com/mbaobao/201403/27/seckill.js  
 *  @example 
 *  seckill.init({
 *  	   'seckill_id': '3926'
 *  }, function(date) {
 *	   	if (!date) {
 *	   		//倒计时到时间    
 *	   	} else {
 *	   		//console.log(date.d + "天" + date.h + "时" + date.m "分"+ date.s +"秒")
 *	   	}
 *   })
 */
define(function(require, exports, module) {
	var $ = require("jquery");

	var seckill = exports;

	var defaults = {
		seckill_id: ''
	}
	var SECKILLTIME;  //时间接口
	var SECKill;      //秒杀接口(暂时未启用)

	var callback=null;
	var finish=null;

	seckill.init = function(options,callback_,finish_) {
		var opts = $.extend(defaults, options || {});
		SECKILLTIME = 'http://m.mbaobao.com/activity /seckillTime/' + defaults.seckill_id + '.html';
		SECKill = 'http://m.mbaobao.com/activity/seckill/' + defaults.seckill_id + '.html';
        
		seckillTime();

		callback=callback_;
		finish=finish_;
	}

	// var data = {
	// 	result: true,
	// 	message: "",
	// 	data: {
	// 		currentTime: "2014-03-27 10:41:10",
	// 		seckillingTimes: [
	// 			"2014-03-27 10:41:15",
	// 			"2014-03-27 10:41:20",
	// 			"2014-03-27 10:41:25"
	// 		]
	// 	}
	// }

	//显示到下一场时间 
	function seckillTime() {
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			jsonp: "jsoncallback",
			url: SECKILLTIME,
			success: function(data_) {
				var data=data_;
                if(data.result){
                   whileTime(data.data);
                }
			}
		});
	}

    var  timer=null; 
	//解析时间
    function whileTime(data){
       var currentTime=analysisTime(data.currentTime).getTime();
       var seckillingTimes=[];
       var seckill=data.seckillingTimes;
       var index=0;
       
       for (var i = 0; i < seckill.length; i++) {
       	   seckillingTimes.push(analysisTime(seckill[i]).getTime())
       };
       seckillingTimes.push(seckillingTimes[0]+24*3600*1000); 
       
       var  site=0;
       //判断下一个时间
       for (; site < seckillingTimes.length; site++) {
            if(currentTime<seckillingTimes[site]){
               break
            }

       }; 

       countdown(currentTime,seckillingTimes[site])
    }

	//倒计时计算
    function countdown(nowtime,seckilltime){
       var timeDiff=seckilltime-nowtime;

        timer=setInterval(function(){
              dateDiff(timeDiff)
              timeDiff=timeDiff-1000
           },1000) 
    }

    //时间差转化时间
    function dateDiff(time){
        var day = parseInt(time / 1000 / 3600 / 24, 10);
		var hour = parseInt(time / 1000 / 3600 % 24, 10);
		var minute = parseInt(time / 1000 / 60 % 60, 10);
		var second = parseInt(time / 1000 % 60, 10);

		day_ = (day < 10 ? "0" : "") + day;
		hour_ = (hour < 10 ? "0" : "") + hour;
		minute_ = (minute < 10 ? "0" : "") + minute;
		second_ = (second < 10 ? "0" : "") + second;
        
        var countTime={
                    d: day,
                    h: hour,
                    m: minute,
                    s: second,
                    dd: day_,
                    hh: hour_,
                    mm: minute_,
                    ss: second_
            }
        callback(countTime)

        if(second==0&&minute==0&&hour==0&&day==0){
        	finish()
            clearTimeout(timer); 
            seckillTime();
        }
    }

	//解析string时间（兼容） 
	function  analysisTime(time){
		var H_01 = time.split('.')[0];
		var H_02 = H_01.slice(0, 4);
		var H_03 = H_01.slice(5, 7);
		var H_04 = H_01.slice(8, 10);

		var H_05 = H_01.slice(11, 13);
		var H_06 = H_01.slice(14, 16);
		var H_07 = H_01.slice(17, 19);
		return new Date(H_02, H_03 - 1, H_04, H_05, H_06, H_07)
	}
    		
})