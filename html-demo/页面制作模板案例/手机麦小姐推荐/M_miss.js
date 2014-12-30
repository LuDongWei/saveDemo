define(['jquery1_3_2', 'flickslide','mustache'], function (require, exports, module) {
	var $ = require("jquery1_3_2");
	require("flickslide")($);	
	var Mustache = require("mustache");
	var M = exports;		
		M.Slide = function(bagName,index,data){
			var tpl =   
						'{{#page}}'+
						'<li>'+
							'<dl>'+
							'{{#list}}'+
								'<dd>'+
								'<a href="http://m.mbaobao.com/item/{{.}}.html">'+
								'<img src="http://mobimage.mbbimg.cn/sku/{{.}}-1-264-264.jpg" data-sku="{{.}}">'+
								'</a>'+
								'</dd>'+
								'{{/list}}'+
							 '</dl>'+
						'</li>'+
						'{{/page}}';		
			var Mdata = {'page' : data[bagName]};
			console.log(Mdata)
			var MusHtml = Mustache.render(tpl, Mdata);			
			var dom = $('<ul id="new">' + MusHtml + '</ul>');
				dom.find('li').flickSlide({
						target: '#miss_goods_' + index,
						duration:6000,
						slideDuration:6000,
						colum: 1,
						parentArea: '.item_miss_' + index
				}).slideInit();
		}
	
	
	
	M.init = function(data){			
		    var newdate = {"剑桥包":paseaList(data['剑桥包']),"波士顿":paseaList(data['波士顿']),
			                "贝壳包":paseaList(data['贝壳包']),"托特包":paseaList(data['托特包']),
							"双肩包":paseaList(data['双肩包'])
			               };
				
		$('.miss_top li').click(function(){
			var bagname = $(this).find('a').text();
			var index = $('.miss_top li').index($(this));
 			$('.miss_top li').removeClass('on');
			$(this).addClass('on');
			$('.item_miss').hide();
			$('.item_miss').eq(index).show();
			if(!$(this).data("isclick")){
				M.Slide(bagname,index,newdate);
				$(this).data('isclick',true); 
			}
		})
		
		$('.miss_top li').eq(0).click();

	};
	
	 function paseaList(list){
				var arr = [];
				for(var i=0, l=list.length; i<l;i++){
						if(i%4===0){
							var o = {list:[]};
							arr.push(o);
						}
						o.list.push(list[i]);
					}
				return arr;
			}
})