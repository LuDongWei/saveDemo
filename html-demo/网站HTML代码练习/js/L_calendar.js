define(function (require, exports, module){
	var $=require('jquery');
	
	//需要的参数
	var nowData;
	var W_date,SIGN_DAYS,nowmonth_SIGN_DAYS,now_SIGN_DAYS;
	var Day_week=['周日','周一','周二','周三','周四','周五','周六'];//星期
	var Day_month=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
	
	exports.calendar=function(){
    W_date=window.SERVER_DAY;
	SIGN_DAYS=window.SIGN_DAYS;
    W_date= W_date.replace(/-/g,'/'); //兼容ie
	nowData=new Date(W_date);
	nowDayHtml(nowData);
	weekHtml();
    sign_week();
	dateHtml(nowData);
	}
	
	//左
    $('.C_left').click(function(){
	nowData=new Date(nowData.getFullYear(),nowData.getMonth()-1,1)
	nowDayHtml(nowData);
	sign_week();
	dateHtml(nowData);			
	}) 
	
	
	//右
    $('.C_right').click(function(){
	nowData=new Date(nowData.getFullYear(),nowData.getMonth()+1,1)
	nowDayHtml(nowData);
	sign_week();
	dateHtml(nowData);	
	}) 
	
	
	//在当前显示日期
	var nowDayHtml=function(f){
	var nowDay=f.getFullYear()+'年'+(parseInt(f.getMonth())+1)+'月';	
	$('.Calendar_control').find('.C_main').html(nowDay);	
	}	
	//显示星期行
	var weekHtml=function(){
	var week_H;
	for(i=0;i<=6;i++){
	week_H=	week_H+'<li>'+Day_week[i]+'</li>';
	  }
	week_H='<ul>'+week_H+'</ul>';
	$('.Calendar_D').find('dt').html(week_H); 	
	}
	
	//显示日历
	var dateHtml=function(f){
     var  ad_ft=dayandweek(f);
	   var date_H;
	   for(i=0;i<ad_ft[1];i++){
	   date_H= date_H+'<li>&nbsp;</li>';
	   }
	   for(i=1;i<=ad_ft[0];i++){
		  var sign=false; 
		  for(n=0;n<now_SIGN_DAYS.length;n++){			  
		  if(i==now_SIGN_DAYS[n]){
		  date_H=date_H+'<li class="sign_in" ><img src="http://cca.mbaobao.com/mkts/201307/29/shoujw/qiand_02.jpg">'+i+'</li>';	
		  sign=true; 
			 }			   
	      }
		sign==false?date_H=date_H+'<li>'+i+'</li>':123;	 					 
	   }
	   for(i=1;i<=(42-ad_ft[1]-ad_ft[0]);i++){
	   date_H= date_H+'<li>&nbsp;</li>';
	   }
	date_H='<ul>'+date_H+'</ul>';
	$('.Calendar_D').find('dd').html(date_H);    		 		 
	}
	
	//判断当前天是否为签到
	var sign_day=function(days){
		alert(days);
	 for(i=0;i<now_SIGN_DAYS.length;i++){
		 if(days==now_SIGN_DAYS[i]){
			 alert(123);
			 }  
	    } 					
	}
	
	//把当前月签到日期存放到数组中
	var sign_week=function(){
	var	nowyear=nowData.getFullYear();	//年份
	var	nowmonth=nowData.getMonth()+1;  //月份
	  nowmonth_SIGN_DAYS=[];
	  now_SIGN_DAYS=[];
	for(i=0;i<SIGN_DAYS.length;i++){  
	  var m=parseInt(SIGN_DAYS[i].substring(0,4));
	  var n=parseInt(SIGN_DAYS[i].substring(5,7));
	  if(nowyear==m){
	  
	  if(nowmonth==n){
		  nowmonth_SIGN_DAYS.push(SIGN_DAYS[i]);
		  }
	  }
		}
	for(i=0;i<nowmonth_SIGN_DAYS.length;i++){  
	  var n=parseInt(nowmonth_SIGN_DAYS[i].substring(8,10));
	    now_SIGN_DAYS.push(n);
	  } 
	}
	
	
	//本月的天数和对应这个月一号的星期
	var dayandweek=function(f){
    var ad_ft=[];
    var allday=new Date(f.getFullYear(),f.getMonth()+1,0).getDate();   //个数
	var firstweek=new Date(f.getFullYear(),f.getMonth(),1).getDay();  //星期几
		ad_ft.push(allday);
		ad_ft.push(firstweek);
	return ad_ft; 	
    }
	
	
	
	
	
		
		
	})