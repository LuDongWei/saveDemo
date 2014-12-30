define(function (require,exports,module){

	 //彩蛋链接数据
    var glink=[["http://zhenpi.mbaobao.com/","真皮馆可能有彩蛋哦！"],
              ["http://nanbao.mbaobao.com/","绅士馆可能有彩蛋哦！"],
              ["http://lux.mbaobao.com/","海外馆可能有彩蛋哦！"],
              ["http://sport.mbaobao.com/","运动馆可能有彩蛋哦！"],
              ["http://baby.mbaobao.com/","亲子馆可能有彩蛋哦！"],
              ["http://new.mbaobao.com/","新品频道可能有彩蛋哦！"],
              ["http://remai.mbaobao.com/","爆款频道可能有彩蛋哦！"],
              ["http://nvbao.mbaobao.com/","潮流女包里可能有彩蛋哦！"],
              ["http://www.mbaobao.com/category/list/men/","商务男包里可能有彩蛋哦！"],
              ["http://brand.mbaobao.com/","品牌专区里可能有彩蛋哦！"]],
        gmax=glink.length-1,
        index=Math.round(Math.random()*gmax);

    //彩蛋
    var eggHtml='<div class="pop-eggs" style="width:260px;height:290px;">'+
        '<div id="nnEgg" style="position:relative" >'+
            '<img src="http://cca.mbaobao.com/mkts/201408/12/egg/gegg.png?2014" width="260" height="290" border="0" usemap="#Map753"  />'+
            '<map name="Map753" id="Map753">'+
                '<area shape="rect" coords="36,237,218,285"  href="http://mkt.mbaobao.com/a-sevenyr0820/#actionShow" target="_blank"  />'+
                '<area shape="rect" coords="20,5,243,236" href="javascript:void(0)" onclick=$("#nnEgg").hide();$("#mmEgg").show(); />'+
            '</map>'+
            '<div id="eggs-animation"  style="position:absolute;width:60px;height:48px;top:20px;right:20px;">'+
                '<img src="http://cca.mbaobao.com/mkts/201408/12/egg/geggC.png" width="60" height="49" >'+
            '</div>'+
        '</div>'+
        '<img src="http://cca.mbaobao.com/mkts/201408/12/egg/geggp.png" width="260" height="290" border="0" usemap="#mmEggMap" id="mmEgg"  style="display:none;"   />'+
        '<map name="mmEggMap" id="mmEggMap">'+
            '<area shape="rect" coords="18,14,244,223" href="javascript:void(0)" class="xp-close" />'+
            '<area shape="rect" coords="17,228,243,271" href='+glink[index][0]+' title='+glink[index][1]+' target="_blank" />'+
        '</map>'+
    '</div>';

    //年中庆彩蛋
    function yearEgg(){
        if(!Config.isList()){
            $.ajax({
               type: "get",
               url: "http://www.mbaobao.com/LuckyDraw/CollectingData",
               dataType: "jsonp",
               jsonp: "jsoncallback",
               data: {
                  activityid:"30c1ae6928b56139a0a67fa2c3a2f875" 
               },
               success: function(json) {
                   require.async('jquery-plugin/simplemodal/1.4.4/simplemodal', function(simplemodal){
                           simplemodal($);
                           
                            if (json.data) {
                                if (json.data.have === 1) {
                                    $.modal(eggHtml, {
                                        closeClass: "xp-close"
                                    });

                                    $(".simplemodal-overlay").css("background", "#000000");
                                }
                            }
                       
                   })
               }
           })  
        }

    }

    $(function () {
        yearEgg();
    });

})