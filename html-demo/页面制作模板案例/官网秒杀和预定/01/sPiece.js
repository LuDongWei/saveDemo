define(function(require, exports, module) {
	var $ = require("jquery");
  var Countdown = require("gallery/countdown/2.0.3/countdown");
  var SK=require("mbb/seckill/1.0.0/seckilling");
  var top_=$("#sPiece").offset().top,
      sPiece_=$("#sTime");

	//存块数组
	var pieceAll = {
	"0605":[["http://placehold.it/192x192/fc46aa|http://www.mbaobao.com/item/1403002701|#6c39b2","5995|#1965d4","99真皮包|http://www.mbaobao.com/item/1403002701|#6c39b2","3598|#6c39b2","99真皮包|http://www.mbaobao.com/item/1403002701|#6c39b2"],
		     ["http://placehold.it/192x192/fc46aa|http://www.mbaobao.com/item/1403002701|#fc46aa","99真皮包|http://www.mbaobao.com/item/1403002701|#fc46aa","5885|#fc46aa","5983|#fc46aa","99真皮包|http://www.mbaobao.com/item/1403002701|#fc46aa"],
		     ["http://placehold.it/192x192/fc46aa|http://www.mbaobao.com/item/1403002701|#6c39b2","3598|#1965d4","99真皮包|http://www.mbaobao.com/item/1403002701|#6c39b2","3598|#6c39b2","99真皮包|http://www.mbaobao.com/item/1403002701|#6c39b2"],
		     ["http://placehold.it/192x192/fc46aa|http://www.mbaobao.com/item/1403002701|#fc46aa","99真皮包|http://www.mbaobao.com/item/1403002701|#fc46aa","3598|#fc46aa","3598|#fc46aa","99真皮包|http://www.mbaobao.com/item/1403002701|#fc46aa"]],
          
  "0606":[["http://cca.mbaobao.com/mkts/201406/05/miao/dudu.jpg|http://mkt.mbaobao.com/a-dudunzq140609/|#9b51ff","5913|#9b51ff","真皮包一口价198|http://mkt.mbaobao.com/a-dudunzq140609/|#9b51ff","5914|#9b51ff","真皮包5折回馈|http://mkt.mbaobao.com/a-dudunzq140609/|#9b51ff"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/lm.jpg|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","人气款一口价149|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","5974|#fc46aa","加39元多一件|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","5975|#fc46aa"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/arf.jpg|http://mkt.mbaobao.com/a-aefnzq140609/|#30c6d4","热销款一口价148|http://mkt.mbaobao.com/a-aefnzq140609/|#30c6d4","5954|#30c6d4","经典款一口价168|http://mkt.mbaobao.com/a-aefnzq140609/|#30c6d4","精品款一口价278|http://mkt.mbaobao.com/a-aefnzq140609/|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/mp.jpg|http://mkt.mbaobao.com/a-mnzq140609/|#1965d4","5996|#1965d4","多彩PU4折起|http://mkt.mbaobao.com/a-mnzq140609/|#1965d4","5963|#1965d4","复古真皮2折起|http://mkt.mbaobao.com/a-mnzq140609/|#1965d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/gb.jpg|http://mkt.mbaobao.com/a-gebnzq140609/|#30c6d4","真皮男包一口价199|http://mkt.mbaobao.com/a-gebnzq140609/|#30c6d4","超值男包一口价229|http://mkt.mbaobao.com/a-gebnzq140609/|#30c6d4","精品真皮一口价249|http://mkt.mbaobao.com/a-gebnzq140609/|#30c6d4","5967|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/sp.jpg|http://mkt.mbaobao.com/a-xxbmnzq140609/|#9b51ff","6006|#9b51ff","双肩包一口价79|http://mkt.mbaobao.com/a-xxbmnzq140609/|#9b51ff","人气款一口价149|http://mkt.mbaobao.com/a-xxbmnzq140609/|#9b51ff","买赠89元腰包|http://mkt.mbaobao.com/a-xxbmnzq140609/|#9b51ff"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/yz.jpg|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4","热销钻石拉杆箱6折|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4","6009|#1965d4","多彩拉杆箱立省255|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4","拉杆箱全系6折|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/co.jpg|http://coach.mbaobao.com/|#30c6d4","买返100元现金券|http://coach.mbaobao.com/|#30c6d4","5902|#30c6d4","轻奢品牌4.2折|http://coach.mbaobao.com/|#30c6d4","购最高立省3998|http://coach.mbaobao.com/|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/js.jpg|http://mkt.mbaobao.com/a-jansport0506|#9b51ff","全场立减100元|http://mkt.mbaobao.com/a-jansport0506|#9b51ff","首创1967年的经典|http://mkt.mbaobao.com/a-jansport0506|#9b51ff","5942|#9b51ff","潮爆双肩包259|http://mkt.mbaobao.com/a-jansport0506|#9b51ff"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/tz.jpg|http://tzot.mbaobao.com/|#1965d4","风靡全日棉麻风|http://tzot.mbaobao.com/|#1965d4","全场手袋49元起|http://tzot.mbaobao.com/|#1965d4","5947|#1965d4","舒适托特袋89|http://tzot.mbaobao.com/|#1965d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/va.jpg|http://mkt.mbaobao.com/a-avec130106|#fc46aa","英国户外功能箱包|http://mkt.mbaobao.com/a-avec130106|#fc46aa","双肩包一口价149|http://mkt.mbaobao.com/a-avec130106|#fc46aa","购最高立省241|http://mkt.mbaobao.com/a-avec130106|#fc46aa","5951|#fc46aa"]],

  "0609":[["http://cca.mbaobao.com/mkts/201406/05/miao/dudu.jpg|http://mkt.mbaobao.com/a-dudunzq140609/|#9b51ff","5913|#9b51ff","真皮包一口价198起|http://dudu.mbaobao.com/list/7133|#9b51ff","5914|#9b51ff","真皮包5折回馈|http://dudu.mbaobao.com/list/7132|#9b51ff"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/lm.jpg|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","人气款一口价129元起|http://lm.mbaobao.com/list/7131|#fc46aa","5974|#fc46aa","加39元多一件|http://lm.mbaobao.com/list/|#fc46aa","5975|#fc46aa"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/arf.jpg|http://mkt.mbaobao.com/a-aefnzq140609/|#30c6d4","热销款一口价148|http://alfa.mbaobao.com/list/7127|#30c6d4","5954|#30c6d4","经典款一口价168|http://alfa.mbaobao.com/list/7126|#30c6d4","精品款一口价278|http://alfa.mbaobao.com/list/7125|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/mp.jpg|http://mkt.mbaobao.com/a-mnzq140609/|#1965d4","5996|#1965d4","多彩PU4折起|http://mplus.mbaobao.com/list/7134|#1965d4","5963|#1965d4","复古真皮2折起|http://mplus.mbaobao.com/list/7135|#1965d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/gb.jpg|http://mkt.mbaobao.com/a-gebnzq140609/|#30c6d4","真皮男包一口价199|http://gb.mbaobao.com/list/7137|#30c6d4","超值男包一口价229|http://gb.mbaobao.com/list/7138|#30c6d4","精品真皮一口价249|http://gb.mbaobao.com/list/7139|#30c6d4","5967|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/sp.jpg|http://mkt.mbaobao.com/a-xxbmnzq140609/|#9b51ff","6006|#9b51ff","双肩包一口价79|http://sp.mbaobao.com/list/7141|#9b51ff","人气款一口价119|http://sp.mbaobao.com/list/7142|#9b51ff","买赠89元腰包|http://sp.mbaobao.com/list/7143|#9b51ff"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/yz.jpg|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4","热销钻石拉杆箱6折|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4","6009|#1965d4","多彩拉杆箱立省255|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4","拉杆箱全系6折|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/co.jpg|http://coach.mbaobao.com/|#30c6d4","买返100元现金券|http://coach.mbaobao.com/|#30c6d4","5902|#30c6d4","轻奢品牌4.2折|http://coach.mbaobao.com/|#30c6d4","购最高立省3998|http://coach.mbaobao.com/|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/js.jpg|http://mkt.mbaobao.com/a-jansport0506|#9b51ff","全场立减100元|http://mkt.mbaobao.com/a-jansport0506|#9b51ff","首创1967年的经典|http://mkt.mbaobao.com/a-jansport0506|#9b51ff","5942|#9b51ff","潮爆双肩包259|http://mkt.mbaobao.com/a-jansport0506|#9b51ff"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/tz.jpg|http://tzot.mbaobao.com/|#1965d4","风靡全日棉麻风|http://tzot.mbaobao.com/|#1965d4","全场手袋49元起|http://tzot.mbaobao.com/|#1965d4","5947|#1965d4","舒适托特袋89|http://tzot.mbaobao.com/|#1965d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/va.jpg|http://mkt.mbaobao.com/a-avec130106|#fc46aa","英国户外功能箱包|http://vanwalk.mbaobao.com/|#fc46aa","双肩包一口价149|http://vanwalk.mbaobao.com/|#fc46aa","购最高立省241|http://vanwalk.mbaobao.com/|#fc46aa","5951|#fc46aa"]],
  
  "0610":[["http://cca.mbaobao.com/mkts/201406/05/miao/dudu.jpg|http://mkt.mbaobao.com/a-dudunzq140609/|#9b51ff","5917|#9b51ff","真皮包一口价198起|http://dudu.mbaobao.com/list/7133|#9b51ff","5918|#9b51ff","真皮包5折回馈|http://dudu.mbaobao.com/list/7132|#9b51ff"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/lm.jpg|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","人气款一口价129元起|http://lm.mbaobao.com/list/7131|#fc46aa","5976|#fc46aa","加39元多一件|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","5977|#fc46aa"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/arf.jpg|http://mkt.mbaobao.com/a-aefnzq140609/|#30c6d4","热销款一口价148|http://alfa.mbaobao.com/list/7127|#30c6d4","5955|#30c6d4","经典款一口价168|http://alfa.mbaobao.com/list/7126|#30c6d4","精品款一口价278|http://alfa.mbaobao.com/list/7125|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/mp.jpg|http://mkt.mbaobao.com/a-mnzq140609/|#1965d4","5997|#1965d4","糖果色手袋4折起|http://mplus.mbaobao.com/list/7134|#1965d4","5998|#1965d4","复古真皮2折起|http://mplus.mbaobao.com/list/7135|#1965d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/gb.jpg|http://mkt.mbaobao.com/a-gebnzq140609/|#30c6d4","真皮男包一口价199|http://gb.mbaobao.com/list/7137|#30c6d4","超值男包一口价229|http://gb.mbaobao.com/list/7138|#30c6d4","精品真皮一口价249|http://gb.mbaobao.com/list/7139|#30c6d4","5968|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/co.jpg|http://coach.mbaobao.com/|#30c6d4","买返100元现金券|http://coach.mbaobao.com/|#30c6d4","轻奢品牌4.2折|http://coach.mbaobao.com/|#30c6d4","购最高立省3998|http://coach.mbaobao.com/|#30c6d4","5903|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/js.jpg|http://mkt.mbaobao.com/a-jansport0506|#9b51ff","全场立减100元|http://mkt.mbaobao.com/a-jansport0506|#9b51ff","首创1967年的经典|http://mkt.mbaobao.com/a-jansport0506|#9b51ff","5943|#9b51ff","潮爆双肩包259|http://mkt.mbaobao.com/a-jansport0506|#9b51ff"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/fe.jpg|http://fendi.mbaobao.com/|#1965d4","买返100元现金券|http://fendi.mbaobao.com/|#1965d4","5941|#1965d4","全场4.5折起|http://fendi.mbaobao.com/|#1965d4","购最高立省9099|http://fendi.mbaobao.com/|#1965d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/dg.jpg|http://dolcegabbana.mbaobao.com/|#9b51ff","买返100元现金券|http://dolcegabbana.mbaobao.com/|#9b51ff","全场7.5折封顶|http://dolcegabbana.mbaobao.com/|#9b51ff","购最高立省2567|http://dolcegabbana.mbaobao.com/|#9b51ff","5909|#9b51ff"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/ny.jpg|http://envirosax.mbaobao.com/|#6c39b2","5939|#6c39b2","国内首发一口价98|http://envirosax.mbaobao.com/|#6c39b2","多功能防水折叠袋|http://envirosax.mbaobao.com/|#6c39b2","多系列缤纷不断|http://envirosax.mbaobao.com/|#6c39b2"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/tz.jpg|http://tzot.mbaobao.com/|#1965d4","风靡全日棉麻风|http://tzot.mbaobao.com/|#1965d4","全场手袋49元起|http://tzot.mbaobao.com/|#1965d4","舒适托特袋89|http://tzot.mbaobao.com/|#1965d4","5948|#1965d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/av.jpg|http://mkt.mbaobao.com/a-avec130106|#9b51ff","个性设计师品牌|http://mkt.mbaobao.com/a-avec130106|#9b51ff","5961|#9b51ff","超舒适双肩包|http://mkt.mbaobao.com/a-avec130106|#9b51ff","全场515元起|http://mkt.mbaobao.com/a-avec130106|#9b51ff"]],
  
  "0611":[["http://cca.mbaobao.com/mkts/201406/05/miao/dudu.jpg|http://mkt.mbaobao.com/a-dudunzq140609/|#9b51ff","5921|#9b51ff","真皮包一口价198起|http://dudu.mbaobao.com/list/7133|#9b51ff","5924|#9b51ff","真皮包5折回馈|http://dudu.mbaobao.com/list/7132|#9b51ff"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/lm.jpg|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","人气款一口价129元起|http://lm.mbaobao.com/list/7131|#fc46aa","5978|#fc46aa","加39元多一件|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","5981|#fc46aa"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/arf.jpg|http://mkt.mbaobao.com/a-aefnzq140609/|#30c6d4","热销款一口价148|http://alfa.mbaobao.com/list/7127|#30c6d4","5956|#30c6d4","经典款一口价168|http://alfa.mbaobao.com/list/7126|#30c6d4","精品款一口价278|http://alfa.mbaobao.com/list/7125|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/mp.jpg|http://mkt.mbaobao.com/a-mnzq140609/|#1965d4","5964|#1965d4","糖果色手袋4折起|http://mplus.mbaobao.com/list/7134|#1965d4","5999|#1965d4","复古真皮2折起|http://mplus.mbaobao.com/list/7135|#1965d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/gb.jpg|http://mkt.mbaobao.com/a-gebnzq140609/|#30c6d4","真皮男包一口价199|http://gb.mbaobao.com/list/7137|#30c6d4","超值男包一口价229|http://gb.mbaobao.com/list/7138|#30c6d4","精品真皮一口价249|http://gb.mbaobao.com/list/7139|#30c6d4","5969|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/sp.jpg|http://mkt.mbaobao.com/a-xxbmnzq140609/|#9b51ff","6007|#9b51ff","双肩包一口价79|http://mkt.mbaobao.com/a-xxbmnzq140609/|#9b51ff","人气款一口价149|http://mkt.mbaobao.com/a-xxbmnzq140609/|#9b51ff","买赠89元腰包|http://mkt.mbaobao.com/a-xxbmnzq140609/|#9b51ff"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/yz.jpg|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4","热销钻石拉杆箱6折|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4","6010|#1965d4","多彩拉杆箱立省255|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4","拉杆箱全系6折|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/co.jpg|http://coach.mbaobao.com/|#30c6d4","买返100元现金券|http://coach.mbaobao.com/|#30c6d4","5904|#30c6d4","购最高立省3998|http://coach.mbaobao.com/|#30c6d4","轻奢品牌4.2折|http://coach.mbaobao.com/|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/js.jpg|http://mkt.mbaobao.com/a-jansport0506|#9b51ff","全场立减100元|http://mkt.mbaobao.com/a-jansport0506|#9b51ff","首创1967年的经典|http://mkt.mbaobao.com/a-jansport0506|#9b51ff","5944|#9b51ff","潮爆双肩包259|http://mkt.mbaobao.com/a-jansport0506|#9b51ff"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/dg.jpg|http://dolcegabbana.mbaobao.com/|#fc46aa","买返100元现金券|http://dolcegabbana.mbaobao.com/|#fc46aa","全场7.5折封顶|http://dolcegabbana.mbaobao.com/|#fc46aa","购最高立省2567|http://dolcegabbana.mbaobao.com/|#fc46aa","5910|#fc46aa"]],
 
  "0612":[["http://cca.mbaobao.com/mkts/201406/05/miao/dudu.jpg|http://mkt.mbaobao.com/a-dudunzq140609/|#9b51ff","5925|#9b51ff","真皮包一口价198起|http://dudu.mbaobao.com/list/7133|#9b51ff","5928|#9b51ff","真皮包5折回馈|http://dudu.mbaobao.com/list/7132|#9b51ff"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/lm.jpg|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","人气款一口价129元起|http://lm.mbaobao.com/list/7131|#fc46aa","5982|#fc46aa","加39元多一件|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","5983|#fc46aa"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/arf.jpg|http://mkt.mbaobao.com/a-aefnzq140609/|#30c6d4","热销款一口价148|http://alfa.mbaobao.com/list/7127|#30c6d4","5957|#30c6d4","经典款一口价168|http://alfa.mbaobao.com/list/7126|#30c6d4","精品款一口价278|http://alfa.mbaobao.com/list/7125|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/mp.jpg|http://mkt.mbaobao.com/a-mnzq140609/|#1965d4","6000|#1965d4","糖果色手袋4折起|http://mplus.mbaobao.com/list/7134|#1965d4","6001|#1965d4","复古真皮2折起|http://mplus.mbaobao.com/list/7135|#1965d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/gb.jpg|http://mkt.mbaobao.com/a-gebnzq140609/|#30c6d4","真皮男包一口价199|http://gb.mbaobao.com/list/7137|#30c6d4","超值男包一口价229|http://gb.mbaobao.com/list/7138|#30c6d4","精品真皮一口价249|http://gb.mbaobao.com/list/7139|#30c6d4","5970|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/sp.jpg|http://mkt.mbaobao.com/a-xxbmnzq140609/|#9b51ff","6008|#9b51ff","双肩包一口价79|http://mkt.mbaobao.com/a-xxbmnzq140609/|#9b51ff","人气款一口价149|http://mkt.mbaobao.com/a-xxbmnzq140609/|#9b51ff","买赠89元腰包|http://mkt.mbaobao.com/a-xxbmnzq140609/|#9b51ff"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/yz.jpg|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4","热销钻石拉杆箱6折|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4","6011|#1965d4","多彩拉杆箱立省255|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4","拉杆箱全系6折|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/co.jpg|http://coach.mbaobao.com/|#30c6d4","买返100元现金券|http://coach.mbaobao.com/|#30c6d4","5905|#30c6d4","购最高立省3998|http://coach.mbaobao.com/|#30c6d4","轻奢品牌4.2折|http://coach.mbaobao.com/|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/dg.jpg|http://dolcegabbana.mbaobao.com/|#6c39b2","买返100元现金券|http://dolcegabbana.mbaobao.com/|#6c39b2","全场7.5折封顶|http://dolcegabbana.mbaobao.com/|#6c39b2","购最高立省2567|http://dolcegabbana.mbaobao.com/|#6c39b2","5911|#6c39b2"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/tz.jpg|http://tzot.mbaobao.com/|#1965d4","风靡全日棉麻风|http://tzot.mbaobao.com/|#1965d4","全场手袋49元起|http://tzot.mbaobao.com/|#1965d4","5949|#1965d4","舒适托特袋89|http://tzot.mbaobao.com/|#1965d4"]],

	  "0613":[["http://cca.mbaobao.com/mkts/201406/05/miao/dudu.jpg|http://mkt.mbaobao.com/a-dudunzq140609/|#9b51ff","5929|#9b51ff","真皮包一口价198起|http://dudu.mbaobao.com/list/7133|#9b51ff","5930|#9b51ff","真皮包5折回馈|http://dudu.mbaobao.com/list/7132|#9b51ff"],
           ["http://cca.mbaobao.com/mkts/201406/05/miao/lm.jpg|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","人气款一口价129元起|http://lm.mbaobao.com/list/7131|#fc46aa","5986|#fc46aa","加39元多一件|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","5988|#fc46aa"],
           ["http://cca.mbaobao.com/mkts/201406/05/miao/arf.jpg|http://mkt.mbaobao.com/a-aefnzq140609/|#30c6d4","热销款一口价148|http://alfa.mbaobao.com/list/7127|#30c6d4","5958|#30c6d4","经典款一口价168|http://alfa.mbaobao.com/list/7126|#30c6d4","精品款一口价278|http://alfa.mbaobao.com/list/7125|#30c6d4"],
           ["http://cca.mbaobao.com/mkts/201406/05/miao/mp.jpg|http://mkt.mbaobao.com/a-mnzq140609/|#1965d4","6002|#1965d4","糖果色手袋4折起|http://mplus.mbaobao.com/list/7134|#1965d4","6003|#1965d4","复古真皮2折起|http://mplus.mbaobao.com/list/7135|#1965d4"],
           ["http://cca.mbaobao.com/mkts/201406/05/miao/gb.jpg|http://mkt.mbaobao.com/a-gebnzq140609/|#30c6d4","真皮男包一口价199|http://gb.mbaobao.com/list/7137|#30c6d4","超值男包一口价229|http://gb.mbaobao.com/list/7138|#30c6d4","精品真皮一口价249|http://gb.mbaobao.com/list/7139|#30c6d4","5971|#30c6d4"],
           ["http://cca.mbaobao.com/mkts/201406/05/miao/co.jpg|http://coach.mbaobao.com/|#30c6d4","买返100元现金券|http://coach.mbaobao.com/|#30c6d4","5906|#30c6d4","购最高立省3998|http://coach.mbaobao.com/|#30c6d4","轻奢品牌4.2折|http://coach.mbaobao.com/|#30c6d4"],
           ["http://cca.mbaobao.com/mkts/201406/05/miao/va.jpg|http://mkt.mbaobao.com/a-avec130106|#fc46aa","英国户外功能箱包|http://vanwalk.mbaobao.com/|#fc46aa","双肩包一口价149|http://vanwalk.mbaobao.com/|#fc46aa","购最高立省241|http://vanwalk.mbaobao.com/|#fc46aa","5952|#fc46aa"],
           ["http://cca.mbaobao.com/mkts/201406/05/miao/tt.jpg|http://toppu.mbaobao.com/|#1965d4","5945|#1965d4","韩国双肩包潮牌|http://toppu.mbaobao.com/|#1965d4","全场一口价229|http://toppu.mbaobao.com/|#1965d4","购最高立省450|http://toppu.mbaobao.com/|#1965d4"],
           ["http://cca.mbaobao.com/mkts/201406/05/miao/dg.jpg|http://dolcegabbana.mbaobao.com/|#6c39b2","买返100元现金券|http://dolcegabbana.mbaobao.com/|#6c39b2","全场7.5折封顶|http://dolcegabbana.mbaobao.com/|#6c39b2","购最高立省2567|http://dolcegabbana.mbaobao.com/|#6c39b2","5912|#6c39b2"]],
  
     "0614":[["http://cca.mbaobao.com/mkts/201406/05/miao/dudu.jpg|http://mkt.mbaobao.com/a-dudunzq140609/|#9b51ff","5933|#9b51ff","真皮包一口价198起|http://dudu.mbaobao.com/list/7133|#9b51ff","5934|#9b51ff","真皮包5折回馈|http://dudu.mbaobao.com/list/7132|#9b51ff"],
            ["http://cca.mbaobao.com/mkts/201406/05/miao/lm.jpg|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","人气款一口价129元起|http://lm.mbaobao.com/list/7131|#fc46aa","5989|#fc46aa","加39元多一件|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","5990|#fc46aa"],
            ["http://cca.mbaobao.com/mkts/201406/05/miao/arf.jpg|http://mkt.mbaobao.com/a-aefnzq140609/|#30c6d4","热销款一口价148|http://alfa.mbaobao.com/list/7127|#30c6d4","5959|#30c6d4","经典款一口价168|http://alfa.mbaobao.com/list/7126|#30c6d4","精品款一口价278|http://alfa.mbaobao.com/list/7125|#30c6d4"],
            ["http://cca.mbaobao.com/mkts/201406/05/miao/mp.jpg|http://mkt.mbaobao.com/a-mnzq140609/|#1965d4","5965|#1965d4","糖果色手袋4折起|http://mplus.mbaobao.com/list/7134|#1965d4","6004|#1965d4","复古真皮2折起|http://mplus.mbaobao.com/list/7135|#1965d4"],
            ["http://cca.mbaobao.com/mkts/201406/05/miao/gb.jpg|http://mkt.mbaobao.com/a-gebnzq140609/|#30c6d4","真皮男包一口价199|http://gb.mbaobao.com/list/7137|#30c6d4","超值男包一口价229|http://gb.mbaobao.com/list/7138|#30c6d4","精品真皮一口价249|http://gb.mbaobao.com/list/7139|#30c6d4","5972|#30c6d4"],
            ["http://cca.mbaobao.com/mkts/201406/05/miao/co.jpg|http://coach.mbaobao.com/|#30c6d4","买返100元现金券|http://coach.mbaobao.com/|#30c6d4","5907|#30c6d4","轻奢品牌4.2折|http://coach.mbaobao.com/|#30c6d4","购最高立省3998|http://coach.mbaobao.com/|#30c6d4"],
            ["http://cca.mbaobao.com/mkts/201406/05/miao/tt.jpg|http://toppu.mbaobao.com/|#1965d4","5946|#1965d4","韩国双肩包潮牌|http://toppu.mbaobao.com/|#1965d4","全场一口价229|http://toppu.mbaobao.com/|#1965d4","购最高立省450|http://toppu.mbaobao.com/|#1965d4"],
            ["http://cca.mbaobao.com/mkts/201406/05/miao/bu.jpg|http://burberry.mbaobao.com/|#30c6d4","买返100元现金券|http://burberry.mbaobao.com/|#30c6d4","全场7.9折封顶|http://burberry.mbaobao.com/|#30c6d4","格纹中的英伦风情|http://burberry.mbaobao.com/|#30c6d4","5900|#30c6d4"],
            ["http://cca.mbaobao.com/mkts/201406/05/miao/av.jpg|http://mkt.mbaobao.com/a-avec130106|#9b51ff","个性设计师品牌|http://mkt.mbaobao.com/a-avec130106|#9b51ff","5962|#9b51ff","超舒适双肩包|http://mkt.mbaobao.com/a-avec130106|#9b51ff","全场515元起|http://mkt.mbaobao.com/a-avec130106|#9b51ff"]], 
    
     "0615":[["http://cca.mbaobao.com/mkts/201406/05/miao/dudu.jpg|http://mkt.mbaobao.com/a-dudunzq140609/|#9b51ff","5935|#9b51ff","真皮包一口价198起|http://dudu.mbaobao.com/list/7133|#9b51ff","5936|#9b51ff","真皮包5折回馈|http://dudu.mbaobao.com/list/7132|#9b51ff"],
           ["http://cca.mbaobao.com/mkts/201406/05/miao/lm.jpg|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","人气款一口价129元起|http://lm.mbaobao.com/list/7131|#fc46aa","5992|#fc46aa","加39元多一件|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","5993|#fc46aa"],
           ["http://cca.mbaobao.com/mkts/201406/05/miao/arf.jpg|http://mkt.mbaobao.com/a-aefnzq140609/|#30c6d4","热销款一口价148|http://alfa.mbaobao.com/list/7127|#30c6d4","5960|#30c6d4","经典款一口价168|http://alfa.mbaobao.com/list/7126|#30c6d4","精品款一口价278|http://alfa.mbaobao.com/list/7125|#30c6d4"],
           ["http://cca.mbaobao.com/mkts/201406/05/miao/mp.jpg|http://mkt.mbaobao.com/a-mnzq140609/|#1965d4","5966|#1965d4","糖果色手袋4折起|http://mplus.mbaobao.com/list/7134|#1965d4","6005|#1965d4","复古真皮2折起|http://mplus.mbaobao.com/list/7135|#1965d4"],
           ["http://cca.mbaobao.com/mkts/201406/05/miao/gb.jpg|http://mkt.mbaobao.com/a-gebnzq140609/|#30c6d4","真皮男包一口价199|http://gb.mbaobao.com/list/7137|#30c6d4","超值男包一口价229|http://gb.mbaobao.com/list/7138|#30c6d4","精品真皮一口价249|http://gb.mbaobao.com/list/7139|#30c6d4","5973|#30c6d4"],
           ["http://cca.mbaobao.com/mkts/201406/05/miao/co.jpg|http://coach.mbaobao.com/|#30c6d4","买返100元现金券|http://coach.mbaobao.com/|#30c6d4","5908|#30c6d4","购最高立省3998|http://coach.mbaobao.com/|#30c6d4","轻奢品牌4.2折|http://coach.mbaobao.com/|#30c6d4"],
           ["http://cca.mbaobao.com/mkts/201406/05/miao/va.jpg|http://mkt.mbaobao.com/a-avec130106|#fc46aa","英国户外功能箱包|http://vanwalk.mbaobao.com/|#fc46aa","双肩包一口价149|http://vanwalk.mbaobao.com/|#fc46aa","购最高立省241|http://vanwalk.mbaobao.com/|#fc46aa","5953|#fc46aa"],      
           ["http://cca.mbaobao.com/mkts/201406/05/miao/ny.jpg|http://envirosax.mbaobao.com/|#9b51ff","国内首发一口价98|http://envirosax.mbaobao.com/|#9b51ff","5900|#9b51ff","多功能防水折叠袋|http://envirosax.mbaobao.com/|#9b51ff","多系列缤纷不断|http://envirosax.mbaobao.com/|#9b51ff"],
           ["http://cca.mbaobao.com/mkts/201406/05/miao/bu.jpg|http://burberry.mbaobao.com/|#30c6d4","买返100元现金券|http://burberry.mbaobao.com/|#30c6d4","全场7.9折封顶|http://burberry.mbaobao.com/|#30c6d4","格纹中的英伦风情|http://burberry.mbaobao.com/|#30c6d4","5901|#30c6d4"],
           ["http://cca.mbaobao.com/mkts/201406/05/miao/tz.jpg|http://tzot.mbaobao.com/|#1965d4","5950|#1965d4","风靡全日棉麻风|http://tzot.mbaobao.com/|#1965d4","全场手袋49元起|http://tzot.mbaobao.com/|#1965d4","舒适托特袋89|http://tzot.mbaobao.com/|#1965d4"]],

    "0616":[["http://cca.mbaobao.com/mkts/201406/05/miao/dudu.jpg|http://mkt.mbaobao.com/a-dudunzq140609/|#9b51ff","6079|#9b51ff","真皮包一口价198起|http://dudu.mbaobao.com/list/7133|#9b51ff","6092|#9b51ff","真皮包5折回馈|http://dudu.mbaobao.com/list/7132|#9b51ff"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/lm.jpg|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","人气款一口价129元起|http://lm.mbaobao.com/list/7131|#fc46aa","6090|#fc46aa","加39元多一件|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","6102|#fc46aa"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/arf.jpg|http://mkt.mbaobao.com/a-aefnzq140609/|#30c6d4","热销款一口价148|http://alfa.mbaobao.com/list/7127|#30c6d4","6084|#30c6d4","经典款一口价168|http://alfa.mbaobao.com/list/7126|#30c6d4","精品款一口价278|http://alfa.mbaobao.com/list/7125|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/mp.jpg|http://mkt.mbaobao.com/a-mnzq140609/|#1965d4","6083|#1965d4","糖果色手袋4折起|http://mplus.mbaobao.com/list/7134|#1965d4","6095|#1965d4","复古真皮2折起|http://mplus.mbaobao.com/list/7135|#1965d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/gb.jpg|http://mkt.mbaobao.com/a-gebnzq140609/|#30c6d4","真皮男包一口价199|http://gb.mbaobao.com/list/7137|#30c6d4","超值男包一口价229|http://gb.mbaobao.com/list/7138|#30c6d4","6094|#30c6d4","6100|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/sp.jpg|http://mkt.mbaobao.com/a-xxbmnzq140609/|#9b51ff","6080|#9b51ff","6088|#9b51ff","双肩包一口价79|http://mkt.mbaobao.com/a-xxbmnzq140609/|#9b51ff","人气款一口价149|http://mkt.mbaobao.com/a-xxbmnzq140609/|#9b51ff"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/yz.jpg|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4","热销钻石拉杆箱6折|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4","多彩拉杆箱立省255|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4","6093|#1965d4","拉杆箱全系6折|http://mkt.mbaobao.com/a-yznzq140609/|#1965d4"],          
          ["http://cca.mbaobao.com/mkts/201406/05/miao/ld.jpg|http://mkt.mbaobao.com/a-landeiw0605/|#30c6d4","全场5折回馈|http://mkt.mbaobao.com/a-landeiw0605/|#30c6d4","加49元换购299礼盒|http://mkt.mbaobao.com/a-landeiw0605/|#30c6d4","购最高立省569|http://mkt.mbaobao.com/a-landeiw0605/|#30c6d4","6099|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/tms.jpg|http://thomasfriends.mbaobao.com/|#fc46aa","动画第一品牌|http://thomasfriends.mbaobao.com/|#fc46aa","全场手袋7.5折起|http://thomasfriends.mbaobao.com/|#fc46aa","全场79元起|http://thomasfriends.mbaobao.com/|#fc46aa","6101|#fc46aa"]],

    "0902":[["http://cca.mbaobao.com/mkts/201406/05/miao/dudu.jpg|http://mkt.mbaobao.com/a-dudunzq140609/|#9b51ff","6108|#9b51ff","真皮包一口价198起|http://dudu.mbaobao.com/list/7133|#9b51ff","6126|#9b51ff","真皮包5折回馈|http://dudu.mbaobao.com/list/7132|#9b51ff"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/lm.jpg|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","人气款一口价129元起|http://lm.mbaobao.com/list/7131|#fc46aa","6120|#fc46aa","加39元多一件|http://mkt.mbaobao.com/a-lmnzq140609/|#fc46aa","6129|#fc46aa"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/arf.jpg|http://mkt.mbaobao.com/a-aefnzq140609/|#30c6d4","热销款一口价148|http://alfa.mbaobao.com/list/7127|#30c6d4","6121|#30c6d4","经典款一口价168|http://alfa.mbaobao.com/list/7126|#30c6d4","精品款一口价278|http://alfa.mbaobao.com/list/7125|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/mp.jpg|http://mkt.mbaobao.com/a-mnzq140609/|#1965d4","6104|#1965d4","糖果色手袋4折起|http://mplus.mbaobao.com/list/7134|#1965d4","6125|#1965d4","复古真皮2折起|http://mplus.mbaobao.com/list/7135|#1965d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/gb.jpg|http://mkt.mbaobao.com/a-gebnzq140609/|#30c6d4","6113|#30c6d4","真皮男包一口价199|http://gb.mbaobao.com/list/7137|#30c6d4","超值男包一口价229|http://gb.mbaobao.com/list/7138|#30c6d4","精品真皮一口价249|http://gb.mbaobao.com/list/7138|#30c6d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/tz.jpg|http://tzot.mbaobao.com/|#1965d4","风靡全日棉麻风|http://tzot.mbaobao.com/|#1965d4","全场手袋49元起|http://tzot.mbaobao.com/|#1965d4","6123|#1965d4","6128|#1965d4"],
          ["http://cca.mbaobao.com/mkts/201406/05/miao/lo.jpg|http://mkt.mbaobao.com/a-lollipops/|#1965d4","法国少女品牌|http://mkt.mbaobao.com/a-lollipops/|#1965d4","全场手袋8折|http://mkt.mbaobao.com/a-lollipops/|#1965d4","6122|#1965d4","Lolita的甜美世界|http://mkt.mbaobao.com/a-lollipops/|#1965d4"], 
          ["http://cca.mbaobao.com/mkts/201406/05/miao/ld.jpg|http://mkt.mbaobao.com/a-landeiw0605/|#30c6d4","全场5折回馈|http://mkt.mbaobao.com/a-landeiw0605/|#30c6d4","加49元换购299礼盒|http://mkt.mbaobao.com/a-landeiw0605/|#30c6d4","购最高立省569|http://mkt.mbaobao.com/a-landeiw0605/|#30c6d4","6127|#30c6d4"]] 

  }; 
  var piece=[];

	//品牌
  function brand(data_,top_,left_,nu_){
        var html='<div class="piece sk-brand" data-num='+nu_+' style="top:'+top_+'px; left:'+left_+'px; background-color:'+data_[2]+'; ">'+
     	               '<a href='+data_[1]+' target="_blank" class="url">'+
     	                 '<img src='+data_[0]+' width="192" height="192">'+
     	               '</a>'+
                     '<a class="masking" ></a>'+ 
                  '</div>'; 

        $("#sPiece").append(html);
    }

	//小色块
	function color(data_,top_,left_,nu_){
        var html='<div class="piece sk-colour" data-num='+nu_+' style="top:'+top_+'px; left:'+left_+'px; background-color:'+data_[2]+'; ">'+
				     	'<a href='+data_[1]+' target="_blank">'+  
				     	  '<div class="p-text">'+
				     	  	   '<p class="p-1">'+data_[0]+'&nbsp;&nbsp;&nbsp;</p>'+
				     	  	   '<p class="p-2">查看详情<i></i>&nbsp;&nbsp;</p>'+
				     	  '</div>'+
				     	'</a>'+
              '<a class="masking" ></a>'+ 
                 '</div>';

        $("#sPiece").append(html);            
    }

	//秒杀
	function seckill(data_,top_,left_,nu_){
       var html='<div class="piece sk-seckill" data-num='+nu_+' data-ap='+data_[0]+' style="top:'+top_+'px; left:'+left_+'px; background-color:'+data_[1]+';">'+
                  '<a class="masking" ></a>'+
                  '<div id="seckill"></div>'
                '</div>';

           $("#sPiece").append(html);          
  }

  //--秒杀倒计时判断 并开始秒杀--
  var fetchServerTime = function() {
    $.ajax({
      type: "GET",
      dataType: "jsonp",
      jsonp: "jsoncallback", 
      url: "http://www.mbaobao.com/ajax/getTime?d=" + Math.floor((Math.random() * 100) + 1),
      success: function(data){
   
        var H_01 = data.data.split('.')[0];
        var H_02 = H_01.slice(0, 4);
        var H_03 = H_01.slice(5, 7);
        var H_04 = H_01.slice(8, 10);

        var H_05 = H_01.slice(11, 13);
        var H_06 = H_01.slice(14, 16);
        var H_07 = H_01.slice(17, 19);
        
        var dd=H_03+H_04;
        piece=pieceAll[dd];
        setHeight();
        kuaishow();

        var time = new Date(H_02, H_03 - 1, H_04, H_05, H_06, H_07);
        Countdowntime(time.getTime());
      }
    });
  }

  //控制页面的高度
  function setHeight(){
      var ll=piece.length;
      var height=ll*200;
      $("#sPiece").find(".s-status").each(function(){
         $(this).css({"height":height}); 
      }) 
     
      $("#sPiece").css({"height":(height+50)}); 

  }
   
  //页面块显示
  function kuaishow(){
      for (var m = 0; m < piece.length; m++) {
            for (var i = 0; i < piece[m].length; i++) {
              var data=piece[m][i].split("|");
                var top=200*m;
                var left=192*i;
              if (data.length===3){
                   if(data[0].indexOf("http")<0){
                       color(data,top,left,m+"|"+i);
                   }else{ 
                       brand(data,top,left,m+"|"+i);
                   } 
              }else{                      
                   seckill(data,top,left,m+"|"+i);
              };
              // console.log(data);
              // console.log(m+"|"+i);
             };           
        };

    skSeckill();
  }  


  var Countdowntime = function(time) {
    var nowtime = time / 1000 % 86400 + 8 * 3600;     //今天已经过的时间
    var yesttime = time - nowtime * 1000;             //上一天
    var counttime;                                    //到计时时间
    var isSeckill=false;                              //是否开启秒杀  

    //console.log(nowtime)
    
    /*  需要分块的时间段
     *  未开始秒杀：0-9:30       11:00-13:30  15:00-15:30  17:00-19:30  21:00-24:00     
     *  秒杀倒计时：9:30-10:00   13:30-14:00  15:30-16:00  19:30-20:00
     *  秒杀进行中：10:00-11:00  14:00-15:00  16:00-17:00  20:00-21:00
     */
    
    /*  需要分块的时间段
     *  未开始秒杀：0-9:00       11:00-13:00  15:00-15:00  17:00-19:00  21:00-24:00     
     *  秒杀倒计时：9:00-10:00   13:00-14:00  15:00-16:00  19:00-20:00
     *  秒杀进行中：10:00-11:00  14:00-15:00  16:00-17:00  20:00-21:00
     */ 


     
    if (nowtime<(9*3600)){
         //console.log("0-9:00")
         noSeckill(yesttime+(9*3600)*1000);
    }else if(nowtime>=(9*3600)&&nowtime<=(11*3600)){
        if(nowtime<(10*3600)){
           //console.log("9:30-10:00")
           counttime=yesttime+10*3600*1000;
        }else{
           //console.log("10:00-11:00")
           isSeckill=true;
           counttime=yesttime+11*3600*1000;
        } 
        showSeckill(counttime,isSeckill,"1");   
    }else if(nowtime>(11*3600)&&nowtime<(13*3600)){
           //console.log("11:00-13:00")
           noSeckill(yesttime+(13*3600)*1000); 
    }else if(nowtime>=(13*3600)&&nowtime<=(15*3600)){
        if(nowtime<(14*3600)){
           //console.log("13:30-14:00")
           counttime=yesttime+14*3600*1000;
        }else{
           //console.log("14:00-15:00")
           isSeckill=true;
           counttime=yesttime+15*3600*1000;
        }
        showSeckill(counttime,isSeckill,"2");   
    }else if(nowtime>(15*3600)&&nowtime<(15*3600)){
           //console.log("15:00-15:00") 
           noSeckill(yesttime+(15*3600)*1000);
    }else if(nowtime>=(15*3600)&&nowtime<=(17*3600)){
        if(nowtime<(16*3600)){
           //console.log("15:30-16:00")
           counttime=yesttime+16*3600*1000;
        }else{
           //console.log("15:30-16:00")
           isSeckill=true;
           counttime=yesttime+17*3600*1000;
        }
        showSeckill(counttime,isSeckill,"3");      
    }else if(nowtime>(17*3600)&&nowtime<(19*3600)){
           //console.log("17:00-19:00") 
           noSeckill(yesttime+(19*3600)*1000);
    }else if(nowtime>=(19*3600)&&nowtime<=(21*3600)){
        if(nowtime<(20*3600)){
           //console.log("19:30-20:00")
           counttime=yesttime+20*3600*1000;
        }else{
           //console.log(" 20:00-21:00")
           isSeckill=true;
           counttime=yesttime+21*3600*1000;
        }  
        showSeckill(counttime,isSeckill,"4");    
    }else{
         noSeckill(yesttime+(23*3600+99*60)*1000); 
        //console.log("21:00-24:00");
    };   
  }

  //未开始倒计时
  function noSeckill(time_){
      var date = new Date(time_);
      var data2 = formatDate(date);
      
      new Countdown(data2, function(abc) {
        //进行倒计时
      }, function() {
        //倒计时完成
        fetchServerTime();

        SK.start();
      }); 

      zIndex(888);
      $("#sPiece").find(".piece").each(function(){
         $(this).removeClass("sk-masking");
      })
      
      $("#sPiece").find(".s-status").hide(); 
      $("#sTime").find("li").css("visibility","hidden");

      $("#seckillBar").find("li").css("visibility","hidden");
  }

  //页面秒杀块与倒计时显示
  function showSeckill(time_,is_,n_){
      var date = new Date(time_);
      var data2 = formatDate(date);
      var title=is_?"秒杀中":"距离秒杀";
      
      var sLi="#time_"+n_;
      var sDiv="#time_"+n_+"_";
      var barli="#ti_"+n_;
      
      $("#sPiece").find(".s-status").hide();
      $(sDiv).show();
          zIndex(n_);
          masking(n_); 
      $(sLi).find(".state").html(title);
      
      $("#sTime").find("li").css("visibility","hidden");
      $(sLi).css("visibility","visible");

      $(barli).css("visibility","visible");      

      new Countdown(data2, function(abc) {
        //进行倒计时
        $(sLi).find(".time").html(abc.hh + ":" + abc.mm + ":" + abc.ss); 
        $(barli).find(".time").html(abc.hh + ":" + abc.mm + ":" + abc.ss); 
      }, function() {
        //倒计时完成
        fetchServerTime();

        SK.start();
      }); 
  }
  
  //上浮和下沉
  function zIndex(n_){
      $("#sPiece").find(".piece").each(function(){
             var num=$(this).data("num");           
             if(num.split("|")[1]==n_){
               $(this).css({"z-index":6,
                            "border-left":"1px solid #FDD131"});
             }else{
               $(this).css({"z-index":3,
                            "border-left":"1px solid #40316A"});
             }        
      })   
  } 

  //添加蒙版
  function masking(n_){
      var pi=[1,2,3,4];
          pi.splice(n_-1,1);
      
      $("#sPiece").find(".piece").each(function(){
        var num=$(this).data("num"); 
        for (var i = 0; i < pi.length; i++) {
             if(num.split("|")[1]==pi[i]){
               $(this).addClass("sk-masking");
             }
        }; 
      })      
  }


  function formatDate(now){
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    month < 10 ? month = '0' + month : month = month;
    date < 10 ? date = '0' + date : date = date;
    hour < 10 ? hour = '0' + hour : hour = hour;
    minute < 10 ? minute = '0' + minute : minute = minute;
    second < 10 ? second = '0' + second : second = second;
    return year + "-" + month + "-" + date + "   " + hour + ":" + minute + ":" + second;  
  }
  
  //秒杀块内容填充
  function skSeckill(){
       $("#sPiece").find(".sk-seckill").each(function(){
            var ap=$(this).data("ap");
            
            var sk1=SK.create({
                sale:ap,
                divID:$(this).find("#seckill"),
                imgSize:185,
                showType:"html",
                template:$("#seckill-template")
            });
       })

       SK.start();    
  }
   
  //横栏显示
  $(window).on("scroll.oxlazy", function() {
       var top = top_ -  $(window).scrollTop() - sPiece_.height(),
           height_ = -(sPiece_.height()); 
            
         if (top < height_) {
             $("#seckillBar").addClass("seckill-Bar-show");
         }else{
             $("#seckillBar").removeClass("seckill-Bar-show");
         }  
  })

  //品牌点击  先计算出x|0点，然后取得url
  $("body").on("click",".clBrand",function(){
      var da=$(this).closest(".piece");
          x=da.data("num").split("|")[0], 
          data=null;

      $("#sPiece").find(".piece").each(function(){
            var num=$(this).data("num"),
                xx =num.split("|")[0],
                yy =num.split("|")[1];
            if(yy==0){
              if(xx==x){
                data=this;
                return
              }
            }   
      })
     
      var url=$(data).find(".url").attr("href");         
      $(this).attr("href",url); 
   
  }) 

  
  //构造代码
  $(function(){
        fetchServerTime(); 
  })

})