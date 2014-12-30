define(['jquery1_3_2', 'flickslide','mustache'], function (require, exports, module) {
	var $ = require("jquery1_3_2");
	require("flickslide")($);	
	var Mustache = require("mustache");
	var M = exports;
	var index;//按键编码		
	var page;//记录页数
	var page_num;//一页显示的数量
	var baoover;//剩下的包
	var n;//查看到第几个
	var data,bagname;
	
	M.init = function(Mis_mai){
	data=Mis_mai;		//改变颜色123						
	$('.miss_top li').click(function(){
	bagname = $(this).find('a').text();//名字
    index = $('.miss_top li').index($(this));//编号
 	$('.miss_top li').removeClass('on');
	$(this).addClass('on');  //控制背景和下面箭头
	//提取数据
	page=0;
	n=0;
	$('.goods_more').text('点击查看更多');	
    creationSku();		
	})
	//默认
	$('.miss_top li').eq(0).click();	
	};
	//产生SKU
	var creationSku=function(){		
	var a_Sku='http://m.mbaobao.test/item/ajax/list';
	var b_Sku='';
	var baodata=data[bagname];
	var baosize=baodata.length;
	    baoover=baosize-page*4;//还有的包	 
	    baoover>=4?page_num=4:page_num=baoover;		
		for(i=0;i<page_num;i++){
	    i==page_num-1?b_Sku=b_Sku+baodata[n]:b_Sku=b_Sku+baodata[n]+',';//判断是否为最后一个	
		n++;		
		}
		loadDate(a_Sku,b_Sku);
     }
	 
	//json提取接口数据
	var loadDate=function(url,skus){
     $.ajax({
	    url:url,
		type:'GET',
		dataType:'jsonp',
		jsonp : 'jsoncallback',
		data:{'skus':skus},	
		async: false,
		success:function(json){
         listgoods(json);	
              },
        error:function(){
        alert('fail');
              }

		})		
	   }
	  	  
	  
	 //提取图片，价格，品牌 
	var listgoods=function(json){
	   var listRoll=json.data;
	   var length=json.data.length;
	   var arr=[];
	   for(i=0;i<length;i++){
		   var o=[];
	   var name=json.data[i].itemName 
	   var name=name.substring(name.indexOf('['),name.indexOf(']')+1)   
	       var name=name.replace('·阿蒂斯特','');  
		   o.push(name);
		   o.push(json.data[i].imageUrl);
		   o.push(json.data[i].mbbPrice);
		   o.push(json.data[i].itemId);
		   arr.push(o);	   	   
	   }
   	   creationHtml(length,arr);
	   }
	   
	   //写成html
   var creationHtml=function(length,Alist){
       var Ahtml='';
	   if(page==0){
	   for(i=0;i<length;i++){	  
       Ahtml=Ahtml+'<dd>'+
                  '<a href="http://m.mbaobao.com/item/'+Alist[i][3]+'.html"><img src='+Alist[i][1]+'></a>'+
                  '<span class="brand">'+Alist[i][0]+'</span>'+
				  '<span class="price">￥'+Alist[i][2]+'</span>'+
				  '<span class="baok"><img src="http://cca.mbaobao.com/edm/201307/17/baokuan/baok.png"></span>'+         
                  '</dd>';				  
	   }
	   $('.miss_goods').html('<dl>'+Ahtml+'</dl>'); 	  	   		   
	   }else{ 
       for(i=0;i<length;i++){	  
       Ahtml=Ahtml+'<dd>'+
                  '<a href="http://m.mbaobao.com/item/'+Alist[i][3]+'.html"><img src='+Alist[i][1]+'></a>'+
                  '<span class="brand">'+Alist[i][0]+'</span>'+
				  '<span class="price">￥'+Alist[i][2]+'</span>'+         
                  '</dd>';				  
	   }
	   $('.miss_goods').append('<dl>'+Ahtml+'</dl>'); 	  
	   }	 	   
   }
  	
    //点击查看更多
	$('.goods_more').click(function(){
		if(baoover-page_num>0){
	    page++;		
	    creationSku();	
		}else{
	    $('.miss_top li').eq(index).click();	
		}
		if(baoover<=4){
		$('.goods_more').text('点击返回顶部');	
		}
			
    })	
	
})