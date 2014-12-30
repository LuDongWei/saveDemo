define(function(require,exports,modules){
	var $=require("jquery");
	
	var mydate=new Date();
	exports.timing=function(){	
	update();
	alarm_clock();
	}
	/*▼定时报警*/
	var start=".start";//开始
	var end=".end"; //结束
	var hours="#hours"; //小时
	var minutes="#minutes"; //分钟
	var seconds="#seconds";  //秒
	var alarm=".alarm" //报警
	var hour,minute,second,all_time;
	function alarm_clock(){
	pressbutton(start);  	pressbutton(end); //按钮的属性
    }
	
	//按钮状态改变  开始 结束
	function pressbutton(button){
	$(button).mousedown(function(){
	$(button).css({"border":"1px solid #333"});
	    if(button==start){start_time();}
		if(button==end){end_time();}
	})
    $(button).mouseup(function(){
	$(button).css({"border":"1px solid #0F3"});
	})
	}
	
	
	//开始按钮
	function start_time(){
     hour=$(hours).val();
	 minute=$(minutes).val();
	 second=$(seconds).val();
	 all_time=(hour*3600+minute*60+second)*1000;
	 if(all_time==0){
	 alert("请输入时间!");
	 return ;
	 }
	 alert("开始计时时间为："+hour+"小时"+minute+"分钟"+second+"秒");	
     setTimeout(overtime(),all_time);	
	}
        //开始按钮	
	function overtime(){
	return function(){
    alarm_time();
    }	
	}
		//结束按钮
	function end_time(){
    $(start).css({"border":"1px solid #0F3"});
	$(alarm).hide();
	$(hours).val(0);
	$(minutes).val(0);	
	$(seconds).val(0);		
	}
	
	//时间到了
	function  alarm_time(){
	$(alarm).show();
	setInterval(function(){
	$(alarm).animate({width:'250px',height:'50px'},500 )
	$(alarm).animate({width:'120px',height:'30px'},500 )	
	},1000)
	}
	
	/*▼时钟*/
	//没秒更新桌面的内容
	function update(){
	var startRun=setInterval(function(){
	mydate=new Date();
    var hours=mydate.getHours(); //获取小时
    var minutes=mydate.getMinutes();//获取分钟
	var seconds=mydate.getSeconds();//获取秒数
    show(hours,minutes,seconds);  
    },1000)	
    }
	
	function stop(){
	clearInterval(startRun);
	}
	
	
	//把时间显示到桌面
	function show(hours,minutes,seconds){
	if(hours>=10){           //显示小时数
		$(".hours").eq(0).html(Math.floor(hours/10));
	}else{
		$(".hours").eq(0).html(0);
		}
	$(".hours").eq(1).html(hours%10);	

    if(minutes>=10){           //显示分钟
		$(".minutes").eq(0).html(Math.floor(minutes/10));
	}else{
		$(".minutes").eq(0).html(0);
		}
	$(".minutes").eq(1).html(minutes%10);	
	
	if(seconds>=10){           //显示秒
		$(".seconds").eq(0).html(Math.floor(seconds/10));
	}else{
		$(".seconds").eq(0).html(0);
		}
	$(".seconds").eq(1).html(seconds%10);		
	}
	})