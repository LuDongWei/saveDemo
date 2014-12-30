define(['jquery1_3_2', 'flickslide'], function (require, exports, module) {
	var $ = require("jquery1_3_2");
	require("flickslide")($);
	var R = exports;
	
	var LoadData = function(){
		/*response.setHeader("Access-Control-Allow-Origin", "*");*/
		var RollSku=document.getElementById("RollSku").innerHTML;
		$.ajax({
		url :'http://activity.mbaobao.test/r/getSimilarItem',
		type:'get',
		dataType: "jsonp",
		jsonp : 'jsoncallback', /*定义好的名称*/
		data:{"sku":RollSku,"page":"mobile_item","num":"9"},
	    success:function(data){
			var listRoll=data.data;
			var length=data.data.length;
            var  rollText_2="";
			
			if(length<3){
			  return;	
			}
			
			for(i=0;i<length;i++){
		      rollText_2="<li><a href="+listRoll[i].url+" target='_blank'><img width='86' height='86' src="+listRoll[i].imageUrl+"></a><span>￥"+listRoll[i].salePrice+"</span></li>"+rollText_2;
			}
		
	
		var dom = $('<ul class="rollList" id="rollList">' + rollText_2 + '</ul>');
	    $("#rollListBox").html(dom);
	    $('#rollListBox ul li').flickSlide({
                target: '#rollListBox',
                duration: 5000,
                height: 100,  
				colum: 3,
                parentArea: '#rollCot'
     	});
	 
		$('.rollBox').show();
		
	
     } ,
		error:function(){
			alert('fail');
			}	
	    });
	};
	
	
	
	R.init = function(){
	  LoadData();	
	};
})