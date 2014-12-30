define(function (require, exports, module) {

    var $ = require("jquery");

    var navHtml = '<div class="J_Dom " dom-config="{\'map\':\'left\',\'width\':\'150\'}" dom-type="Float" style="width: 150px; position: fixed; right: auto; left: 0px; top: 160px; display: none;">'+
					'<div class="nav">'+
						'<div class="navOpen"><img src="http://cca.mbaobao.com/mkts/201306/09/fudong/xuanfu_01.jpg" alt=""/></div>'+
						'<div class="navMain">'+
						'<a><img src="http://cca.mbaobao.com/mkts/201306/09/fudong/xuanfu_03.jpg" alt=""/></a>'+
						'<a><img src="http://cca.mbaobao.com/mkts/201306/09/fudong/xuanfu_04.jpg" alt=""/></a>'+
						'<a href="http://mkt.mbaobao.com/a-hotdudu0613/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201306/09/fudong/xuanfu_06.jpg" alt=""/></a>'+
						'<a href="http://mkt.mbaobao.com/a-hotaef0613/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201306/09/fudong/xuanfu_07.jpg" alt=""/></a>'+
						'<a href="http://mkt.mbaobao.com/a-hotlm0613/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201306/09/fudong/xuanfu_08.jpg" alt=""/></a>'+
						'<a href="http://mkt.mbaobao.com/a-hotfy0613/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201306/09/fudong/xuanfu_09.jpg" alt=""/></a>'+
						'<a href="http://mkt.mbaobao.com/a-hotgeb0613/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201306/09/fudong/xuanfu_10.jpg" alt=""/></a>'+
						'<a href="http://mkt.mbaobao.com/a-hotxxbm0613/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201306/09/fudong/xuanfu_11.jpg" alt=""/></a>'+
						'<a href="http://bridge.mbaobao.com/suit-100000184.html" target="_blank"><img src="http://cca.mbaobao.com/mkts/201306/09/fudong/xuanfu_12.jpg" alt=""/></a>'+
						'<a href="http://mkt.mbaobao.com/a-onlysale0603/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201306/09/fudong/xuanfu_13.jpg" alt=""/></a>'+
						'<a href="http://mkt.mbaobao.com/a-middleyear0613/" target="_blank"><img src="http://cca.mbaobao.com/mkts/201306/09/fudong/xuanfu_14.jpg" alt=""/></a>'+
						'<a href="#" class="navClose"><img src="http://cca.mbaobao.com/mkts/201306/09/fudong/xuanfu_15.jpg" alt=""/></a>'+
						'</div>'+
						
					'</div>'+
					'</div>';


    var navCss = '.J_Dom{text-align:left}' +
		'.J_Dom .nav a{display:block;text-indent:0;}' +
		'.J_Dom .nav .navOpen{cursor:pointer;display:none;background:#fff;}'+
		'.J_Dom .nav .navClose{cursor:pointer}'+
		'.J_Dom .nav .navMain{display:block;background:#fff;width:118px}'+
        '.J_Dom .nav a.nav1{ background:url(http://cca.mbaobao.com/mkts/201305/31/dd/nav_01.png) no-repeat center top; height:51px}' +
        '.J_Dom .nav a.nav2{ background:url(http://cca.mbaobao.com/mkts/201305/31/dd/nav_02.png) no-repeat center top; height:34px}' +
        '.J_Dom .nav a.nav3{ background:url(http://cca.mbaobao.com/mkts/201305/31/dd/nav_03.png) no-repeat center top; height:34px}' +
        '.J_Dom .nav a.nav4{ background:url(http://cca.mbaobao.com/mkts/201305/31/dd/nav_04.png) no-repeat center top; height:35px}' +
        '.J_Dom .nav a.nav5{ background:url(http://cca.mbaobao.com/mkts/201305/31/dd/nav_05.png) no-repeat center top; height:34px}' +
        '.J_Dom .nav a.nav6{ background:url(http://cca.mbaobao.com/mkts/201305/31/dd/nav_06.png) no-repeat center top; height:54px}' +
        '.J_Dom .nav a.nav2:hover, .J_Dom .nav a.nav2-cur{ background:url(http://cca.mbaobao.com/mkts/201305/31/dd/Nnav_02.png) no-repeat center top; height:34px}' +
        '.J_Dom .nav a.nav3:hover, .J_Dom .nav a.nav3-cur{ background:url(http://cca.mbaobao.com/mkts/201305/31/dd/Nnav_03.png) no-repeat center top; height:34px}' +
        '.J_Dom .nav a.nav4:hover, .J_Dom .nav a.nav4-cur{ background:url(http://cca.mbaobao.com/mkts/201305/31/dd/Nnav_04.png) no-repeat center top; height:35px}' +
        '.J_Dom .nav a.nav5:hover, .J_Dom .nav a.nav5-cur{ background:url(http://cca.mbaobao.com/mkts/201305/31/dd/Nnav_05.png) no-repeat center top; height:35px}';


    var importStyle = function (cssText) {

        var doc = document
        var head = document.getElementsByTagName('head')[0] ||
            document.documentElement

        var element = doc.createElement('style')
        // Adds to DOM first to avoid the css hack invalid
        head.appendChild(element)
        // IE
        if (element.styleSheet) {
            // http://support.microsoft.com/kb/262161
            if (doc.getElementsByTagName('style').length > 31) {
                throw new Error('Exceed the maximal count of style tags in IE')
            }
            element.styleSheet.cssText = cssText
        }
        // W3C
        else {
            element.appendChild(doc.createTextNode(cssText))
        }
    }

    var getSuitId = function(){
        var url = location.href;
        var matchs = url.match(/suit\-([0-9]{6})([0-9]{3})\.html/i);
        return matchs[2];
    }

    var duduIds = "251,198,197,196,195,194,193,192,191,190,189,187";
    var aefIds = "250,231,230,229,228,227,226,225,224,223,222,221,220";
    var lmIds = "249,219,218,217,216,215,214,213,212,211,210,209,208,207,206,205,204,203,202,201,200,199";
    var fyIds = "248,247,246,245,243,242,241,240,239,238,237,236,235,234,233,232";




        $(function () {

            importStyle(navCss);

            $("body").append(navHtml);
			
			
			 $(".J_Dom .nav").find(".navClose").click(function(){
				$(".J_Dom .nav").find(".navMain").hide();
				 $(".J_Dom .nav").find(".navOpen").show();
				return false;
			 });
			 
			  $(".J_Dom .nav").find(".navOpen").click(function(){
				$(this).hide();
				$(".J_Dom .nav").find(".navMain").show();
				return false;
			 });
			 

            /* var suitId = getSuitId();

            if(duduIds.indexOf(suitId) !== -1){
                $(".J_Dom .nav").find(".nav2").addClass("nav2-cur");
            } else if(aefIds.indexOf(suitId) !== -1){
                $(".J_Dom .nav").find(".nav3").addClass("nav3-cur");
            } else if(lmIds.indexOf(suitId) !== -1){
                $(".J_Dom .nav").find(".nav4").addClass("nav4-cur");
            } else if(fyIds.indexOf(suitId) !== -1){
                $(".J_Dom .nav").find(".nav5").addClass("nav5-cur");
            } */
			
			
			

        })

})