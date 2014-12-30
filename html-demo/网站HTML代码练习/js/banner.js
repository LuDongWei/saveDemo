define(function(require,exports,moudles){
	var $=require('jquery');
	var blockHighlight=require('blockHighlight');

    var initialize=0;    //初始位置
	var good='';
	var elect='';	
	exports.banner=function(banner,choose,time,boolean){
    good=banner;
    elect=choose;
	controller(time);
	blockHighlight.init(choose,"a", ["141,110", "141,110", "141,110", "141,110"]);//	仿淘宝广告区域的遮罩效果
	}


	//对点击的控制
	function controller(time){
	var choosesize=$(elect).find("li").size();//查看一共的商品的个数
    mouseChoose(elect);
    loop(time,choosesize);
    
    //鼠标移开选择位置
    $(elect).find("li").mouseout(function(){
    	loop(time,choosesize);
    })
    //鼠标点击在good上或者离开
    $(good).find("li").hover(function(){stop()},function(){loop(time,choosesize);})
	}
	
	//鼠标选择的位置
    var mouseChoose=function(){
	$(elect).find("li").mouseover(function(){
	var index=$(elect).find("li").index($(this));
	    stop();    
	    go(index);
	    initialize=index;
	})			
	}
   
 	
	//定时器开始
	function loop(time,allchang){
	startRun=setInterval(function(){
         nextPicture=initialize+1;
         if(nextPicture>=allchang){
             nextPicture=0;
             initialize=0;
         }else{
            initialize=initialize+1;
         }
         go(nextPicture);	     
	},time)		
	}
	
	//定时器停止
	function stop(){
	clearInterval(startRun);
	}
	
	//控制显示
	function go(page){
	$(good).find("li").hide();	
    $(good).find("li").eq(page).show();
	}
	
	});