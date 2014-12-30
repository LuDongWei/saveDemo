define("#countdown/1.0/countdown-deubg", [], function (require, exports) {

    return function ($) {
        $.fn.extend({
            "countdown": function (endtime, nowtime, format, callback) {
                var owner = $(this);
                if (!endtime || endtime == "" || !nowtime || nowtime == "") return false;
                endtime = new Date(endtime.replace(/-/g, "/"));
                nowtime = (typeof nowtime === 'string') ? new Date(nowtime.replace(/-/g, "/")) : nowtime;
                var now_s = nowtime.getTime();
                var end_s = endtime.getTime();
                var countdown_int = setInterval(function () {
                    now_s = now_s + 1000;
                    var countdownHtml = "";
                    var d, h, m, s;
                    var leftsecond = parseInt((end_s - now_s) / 1000);
                    d = parseInt(leftsecond / 3600 / 24);
                    h = parseInt((leftsecond / 3600) % 24);
                    m = parseInt((leftsecond / 60) % 60);
                    s = parseInt(leftsecond % 60);
                    if (s < 0) {
                        clearInterval(countdown_int);
                        d = h = m = s = 0;
                        if (typeof (callback) === "function") {
                            callback(owner);
                        }
                    }
                    countdownHtml = format.replace("{d}", d < 10 ? "0" + d : d).replace("{h}", h < 10 ? "0" + h : h).replace("{m}", m < 10 ? "0" + m : m).replace("{s}", s < 10 ? "0" + s : s);
                    owner.html(countdownHtml);
                }, 1000)
            }
        });
    };
})
/*
倒记时插件
@requires jQuery v1.2 or above
@example
$(".countdown").countdown("2011-06-19 12:11:12","2011-06-19 11:10:10","{d}天{h}小时{m}分{s}秒",function(){alert("完成!");});
*/