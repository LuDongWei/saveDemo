define(function(require,exports,moudles){
      var $=require('jquery'); 
	

	  var nowMonth,nowDate,nowHours;
	  //到达时间点  
	  exports.picture_time=function(value,SERVER_TIME){
      nowMonth=SERVER_TIME.slice(5,7);	  
	  nowDate=SERVER_TIME.slice(8,10);
	  nowMonth=parseInt(nowMonth);
	  nowDate=parseInt(nowDate);
	  
	  var now_chang=String(nowMonth)+String(nowDate); //当前的时间和月份
	  chang_picture(now_chang,value);
	
	  }	
	  //未到达时间点
	  exports.picture_now=function(value,SERVER_TIME,END_TIME){
	  nowMonth=SERVER_TIME.slice(5,7);	  
	  nowDate=SERVER_TIME.slice(8,10);
	  nowHours=SERVER_TIME.slice(11,13);
	  nowMonth=parseInt(nowMonth);
	  nowDate=parseInt(nowDate);
	  nowHours=parseInt(nowHours);
    
		  
	  if(SERVER_TIME<END_TIME){	  	  
	  var now_chang=String(nowMonth)+String(nowDate-1); //前一天时间和月份
	     if(nowHours>=11){now_chang=parseInt(now_chang)+1;}
	  chang_picture(now_chang,value);
	  }
	  }	  
	  
	  var chang_picture=function(now_chang,value){
      var picture='http://cca.mbaobao.com/mkts/201307/11/mobile_chang/';
	  var picture_chang=picture+now_chang+'.jpg';	 
	  $('.wx-body').html("<a href="+value[now_chang]+"><img src="+picture_chang+" width='300' /></a>");
	  }
	  
	   
	})
	
	
	

		
		