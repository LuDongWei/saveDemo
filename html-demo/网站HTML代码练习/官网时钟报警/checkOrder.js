var serverTime, _pollData, _pollTime, _pollAlert, _pollWarn, zeroTimes = 0, curOrderCount=0, api = "/data/OrderAlert?mode=1"; 
    //每一分钟进行金额的判断和时间的提取
    _pollData = setInterval(function(){
        poll(api, function(data){
            renderOrder(data.count);
            serverTime = new Date(data.time).getTime();
        });
    }, intervalTime());
    //设置间隔时间
    _pollTime = setInterval(function(){
        if(serverTime){
            var now = new Date(serverTime);
            serverTime = serverTime + 1000;
        } else {
            var now = new Date();
        }
        renderClock(now);
    }, 1000)

    function poll(api, callback){
        $.ajax({
            url : api,
            type : "GET",
            dataType : "json",
            success:function(json){
                var data = {count:0, time:json.time}
                //提取时间
                var serverNow = (new Date(json.time)).getTime();
                //提取每分钟购买的金额的数
                var total = isNaN(parseInt(json.order_total, 10)) ? 0 : json.order_total;
                var raise = total - curOrderCount ;
                data.count = (raise > 0) ? raise : 0;
                curOrderCount = total;
                callback(data);
            },
            error:function(){
                //错误停止时间显示
                clearInterval(_pollData);
                alert("条子，你接口挂了!");
            }
        })
    }

    function intervalTime(){
        return 1000 * 60;
    }
    //对金额的判断显示如果3分钟还没订单会报警
    function renderOrder(count){
        if(count === 0){
            zeroTimes = zeroTimes + 1;
            //没订单持续2分钟
            if(zeroTimes >= 2){
                alerting();
            }
            //没订单持续3分钟
            if(zeroTimes >=3){
                warning();
            }
        } else {
            zeroTimes = 0;
            clearInterval(_pollAlert);
            clearInterval(_pollWarn);
            $(".orderNumber").removeClass("alert");
            $("body").removeClass("warn");
        }

        $(".orderNumber").html('<b>' + count + ((zeroTimes >= 3) ? '['+ (zeroTimes - 1) +'分钟内]' : '') + '</b>').show();
    }

    function alerting(){
         var tag = true;
         clearInterval(_pollAlert);
        _pollAlert =setInterval(function(){
            tag ? $(".orderNumber").addClass("alert") : $(".orderNumber").removeClass("alert");
            tag = !tag;
        }, 300);
    }

    function warning(){
         var tag = true;
         clearInterval(_pollWarn);
        _pollWarn =setInterval(function(){
            tag ? $("body").addClass("warn") : $("body").removeClass("warn");
            tag = !tag;
        }, 300);
    }
    //计时器
    function renderClock(now){
        var h = now.getHours();
        var m = now.getMinutes();
        var s = now.getSeconds();
        var html = createTimeHtml(h) + '<span class="p"><b>:</b></span>' + createTimeHtml(m) + '<span class="p"><b>:</b></span>' +  createTimeHtml(s);
        $(".clock").html(html);
    }
     //计时器的页面的构造
    function createTimeHtml(t){
        var html = "";
        if(t < 10){
            html  = html + '<span class="n"><b>0</b></span>';
            html  = html + '<span class="n"><b>'+t+'</b></span>';
        } else {
            var tens = parseInt(t/10, 10);
            html  = html + '<span class="n"><b>'+tens+'</b></span>';
            html  = html + '<span class="n"><b>'+(t-tens*10)+'</b></span>';
        }
        return html;
    }

    poll(api, function(data){
        renderOrder(data.count);
        serverTime = new Date(data.time).getTime();
    });