/*! questionnaire 1.0.0 pub 2013-11-21 13:27 by douban */
//调查问卷
define("app/questionnaire/1.0.0/survey-debug", [ "jquery-debug", "simplemodal-debug", "./survey-debug.css" ], function(require, exports, module) {
    var $ = require("jquery-debug");
    require("simplemodal-debug")($);
    require("./survey-debug.css");
    //地址存放(默认是女孩)
    var survey_img = [ [ "http://cca.mbaobao.com/mkts/201311/15/survey/img/01/title_01_01.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/01/title_01_02.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/01/title_01_03.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/01/title_01_04.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/01/title_01_05.jpg" ], [ "http://cca.mbaobao.com/mkts/201311/15/survey/img/02/title_02_01.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/02/title_02_02.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/02/title_02_03.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/02/title_02_04.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/02/title_02_05.jpg" ], [ "http://cca.mbaobao.com/mkts/201311/15/survey/img/03/title_03_01.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/03/title_03_02.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/03/title_03_03.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/03/title_03_04.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/03/title_03_05.jpg" ], [ "http://cca.mbaobao.com/mkts/201311/15/survey/img/04/title_04_01.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/04/title_04_02.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/04/title_04_03.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/04/title_04_04.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/04/title_04_05.jpg" ], [ "http://cca.mbaobao.com/mkts/201311/15/survey/img/05/title_05_01.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/05/title_05_02.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/05/title_05_03.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/05/title_05_04.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/05/title_05_05.jpg" ], [ "http://cca.mbaobao.com/mkts/201311/15/survey/img/07/title_07_01.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/07/title_07_02.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/07/title_07_03.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/07/title_07_04.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img/07/title_07_05.jpg" ] ];
    var survey_img_id = [ [ "1", "0", "2", "3" ], [ "1", "3", "0", "2" ], [ "1", "3", "2", "0" ], [ "1", "3", "0", "2" ], [ "2", "0", "3", "1" ], [ "0", "1", "2", "3" ] ];
    var survey_img_boy = [ [ "http://cca.mbaobao.com/mkts/201311/15/survey/img2/01/title_01_01.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img2/01/title_01_02.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img2/01/title_01_03.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img2/01/title_01_04.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img2/01/title_01_05.jpg" ], [ "http://cca.mbaobao.com/mkts/201311/15/survey/img2/02/title_02_01.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img2/02/title_02_02.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img2/02/title_02_03.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img2/02/title_02_04.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img2/02/title_02_05.jpg" ], [ "http://cca.mbaobao.com/mkts/201311/15/survey/img2/03/title_03_01.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img2/03/title_03_02.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img2/03/title_03_03.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img2/03/title_03_04.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img2/03/title_03_05.jpg" ], [ "http://cca.mbaobao.com/mkts/201311/15/survey/img2/04/title_04_01.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img2/04/title_04_02.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img2/04/title_04_03.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img2/04/title_04_04.jpg", "http://cca.mbaobao.com/mkts/201311/15/survey/img2/04/title_04_05.jpg" ] ];
    var survey_img_boy_id = [ [ "0", "2", "1", "3" ], [ "0", "2", "1", "3" ], [ "0", "1", "2", "3" ], [ "2", "0", "1", "3" ] ];
    //每个图片的高度
    var survey_height = [ "437", "385", "385", "385", "385", "385", "385", "497" ];
    var survey_height_boy = [ "437", "385", "385", "385", "520" ];
    //试题编号
    var survey_sum = 1;
    //题目答案记录
    var answer = [];
    var answer_02 = [];
    //传入参数
    var sex = null;
    //性别
    var gender = "w";
    var callback = null;
    //回调函数
    //初始页面 (默认女生)
    var initial_Html = '<div class="mbb_survey">' + '<a href="#" class="mbb_survey_close"><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/achieve_10.jpg" /></a>' + '<div class="mbb_survey_roll">' + "</div>" + '<div class="mbb_survey_bar">' + "</div>" + "</div>";
    var initial_Html_boy = '<div class="mbb_survey mbb_survey_man">' + '<a href="#" class="mbb_survey_close"><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img2/achieve_06.jpg" /></a>' + '<div class="mbb_survey_roll">' + "</div>" + '<div class="mbb_survey_bar">' + "</div>" + "</div>";
    //女生最后一题
    var three_Html_ = '<div class="mbb_survey_content">' + '<div class="mbb_survey_head">' + '<img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_01.jpg" />' + "</div>" + '<div class="mbb_survey_head">' + '<img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_02.jpg" />' + "</div>" + '<div class="mbb_survey_choose mbb_survey_choose_more">' + "<ul>" + '<li><a href="#"   data-id="0" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_04.jpg" /></a></li>' + '<li><a href="#"   data-id="1" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_05.jpg" /></a></li>' + '<li><a href="#"   data-id="2" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_06.jpg" /></a></li>' + '<li><a href="#"   data-id="3" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_07.jpg" /></a></li>' + '<li><a href="#"   data-id="4" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_08.jpg" /></a></li>' + '<li><a href="#"   data-id="5" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_09.jpg" /></a></li>' + '<li><a href="#"   data-id="6" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_10.jpg" /></a></li>' + '<li><a href="#"   data-id="7" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_11.jpg" /></a></li>' + "</ul>" + "</div>" + '<div class="mbb_survey_head">' + '<img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_12.jpg" />' + "</div>" + '<div class="mbb_survey_choose mbb_survey_choose_long">' + '<ul style="float:left; margin-left:41px;">' + '<li><a href="#"   data-id="0" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_13.jpg" /></a></li>' + '<li><a href="#"   data-id="1" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_14.jpg" /></a></li>' + '<li><a href="#"   data-id="2" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_15.jpg" /></a></li>' + '<li><a href="#"   data-id="3" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_16.jpg" /></a></li>' + '<li><a href="#"   data-id="4" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_17.jpg" /></a></li>' + "</ul>" + "</div>" + '<div class="mbb_survey_head">' + '<img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_18.jpg" />' + "</div>" + '<div class="mbb_survey_choose mbb_survey_choose_size">' + '<ul style="float:left; margin-left:41px;">' + '<li><a href="#"   data-id="0" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_19.jpg" /></a></li>' + '<li><a href="#"   data-id="1" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_20.jpg" /></a></li>' + '<li><a href="#"   data-id="2" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_21.jpg" /></a></li>' + '<li><a href="#"   data-id="3" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_22.jpg" /></a></li>' + '<li><a href="#"   data-id="4" ><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_23.jpg" /></a></li>' + "</ul>" + "</div>" + '<a href="#" class="mbb_survey_submit"><span>亲，还木有完成哦(*^__^*)</span><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/08/title_07_24.jpg" /></a>' + "</div>";
    //男生最后一题
    var three_Html_boy_ = '<div class="mbb_survey_content">' + '<div class="mbb_survey_head">' + '<img src="http://cca.mbaobao.com/mkts/201311/15/survey/img2/05/title_05_01.jpg" />' + "</div>" + '<div class="mbb_survey_head">' + '<img src="http://cca.mbaobao.com/mkts/201311/15/survey/img2/05/title_05_02.jpg" />' + "</div>" + '<div class="mbb_survey_choose mbb_survey_choose_more">' + "<ul>" + '<li><a href="#"   data-id="0"><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img2/05/title_05_04.jpg" /></a></li>' + '<li><a href="#"   data-id="1"><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img2/05/title_05_06.jpg" /></a></li>' + '<li><a href="#"   data-id="2"><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img2/05/title_05_07.jpg" /></a></li>' + '<li><a href="#"   data-id="3"><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img2/05/title_05_08.jpg" /></a></li>' + '<li><a href="#"   data-id="4"><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img2/05/title_05_09.jpg" /></a></li>' + "</ul>" + "</div>" + '<div class="mbb_survey_head">' + '<img src="http://cca.mbaobao.com/mkts/201311/15/survey/img2/05/title_05_03.jpg?2013" />' + "</div>" + '<div class="mbb_survey_choose mbb_survey_choose_long">' + '<ul style="float:left; margin-left:41px;">' + '<li class="long_01"><a  href="#"   data-id="0">●&nbsp;&nbsp;款式</a></li>' + '<li class="long_02"><a  href="#"   data-id="1">●&nbsp;&nbsp;材质</a></li>' + '<li class="long_03"><a  href="#"   data-id="2">●&nbsp;&nbsp;价格</a></li>' + '<li class="long_04"><a  href="#"   data-id="3">●&nbsp;&nbsp;颜色</a></li>' + '<li class="long_05"><a  href="#"   data-id="4">●&nbsp;&nbsp;功能</a></li>' + '<li class="long_06"><a  href="#"   data-id="5">●&nbsp;&nbsp;风格</a></li>' + '<li class="long_07"><a  href="#"   data-id="6">●&nbsp;&nbsp;容量</a></li>' + '<li class="long_08"><a  href="#"   data-id="7">●&nbsp;&nbsp;性价比</a></li>' + '<li class="long_09"><a  href="#"   data-id="8">●&nbsp;&nbsp;品牌</a></li>' + '<li class="long_10"><a  href="#"   data-id="9">●&nbsp;&nbsp;质量</a></li>' + "</ul>" + "</div>" + '<div class="mbb_survey_head">' + '<img src="http://cca.mbaobao.com/mkts/201311/15/survey/img2/05/title_05_05.jpg" />' + "</div>" + '<div class="mbb_survey_choose mbb_survey_choose_size">' + '<ul style="float:left; margin-left:41px;">' + '<li><a href="#"   data-id="0"><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img2/05/title_05_21.jpg" /></a></li>' + '<li><a href="#"   data-id="1"><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img2/05/title_05_22.jpg" /></a></li>' + '<li><a href="#"   data-id="2"><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img2/05/title_05_23.jpg" /></a></li>' + '<li><a href="#"   data-id="3"><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img2/05/title_05_24.jpg" /></a></li>' + "</ul>" + "</div>" + '<a href="#" class="mbb_survey_submit"><span>亲，还木有完成哦(*^__^*)</span><img src="http://cca.mbaobao.com/mkts/201311/15/survey/img2/05/title_05_25.jpg" /></a></div>';
    //开始先构造初始页面
    exports.surveybegin = function(sex_, callback_) {
        sex = sex_;
        if (sex == "boy") {
            gender = "m";
        }
        callback = callback_;
        judge_sex();
    };
    //判断男女
    var judge_sex = function() {
        if (sex == "boy") {
            $("body").append(initial_Html_boy);
            choose_title_boy();
        } else {
            $("body").append(initial_Html);
            choose_title();
        }
        $(".mbb_survey").modal({
            position: [ "8%" ],
            closeClass: "mbb_survey_close",
            onClose: function() {
                $.modal.close();
                //初始
                survey_sum = 1;
                n = 0;
                answer = [];
                answer_02 = [];
                sex = null;
                gender = "w";
                callback = null;
                $(".mbb_survey").html("");
            }
        });
    };
    //答题判断
    var choose_title = function() {
        if (survey_sum <= 5 || survey_sum == 7) {
            one_Html(survey_img, survey_img_id);
            bar_Html();
        } else if (survey_sum == 6) {
            two_Html();
            bar_Html();
        } else if (survey_sum == 8) {
            three_Html();
            bar_Html();
        } else {
            return;
        }
    };
    //boy   
    var choose_title_boy = function() {
        if (survey_sum <= 4) {
            one_Html(survey_img_boy, survey_img_boy_id);
            bar_Html();
        } else if (survey_sum === 5) {
            three_Html_boy();
            bar_Html();
        } else {
            return;
        }
    };
    var n = 0;
    //模板一
    var one_Html = function(data, data_id_) {
        var now_survey_img = data[n];
        var data_id = data_id_[n];
        var one_Html = "";
        var N01 = "";
        var N02 = "";
        for (var i = 0; i < 5; i++) {
            if (i === 0) {
                N01 = '<div class="mbb_survey_head">' + "<img src=" + now_survey_img[i] + " />" + "</div>";
            } else {
                N02 = N02 + '<li><a href="#" data-id=' + data_id[i - 1] + '><img src="' + now_survey_img[i] + '" /></a></li>';
            }
        }
        one_Html = '<div class="mbb_survey_content" id="mbb_survey_' + survey_sum + '">' + N01 + '<div class="mbb_survey_choose"><ul>' + N02 + "</ul></div></div>";
        $(".mbb_survey_roll").append(one_Html).find(".mbb_survey_choose").find("a").click(function() {
            saveanswer($(this).data("id"));
            return false;
        });
        n++;
    };
    //模板二
    var two_Html = function() {
        var ans_id = "";
        for (var i = 0; i < answer.length; i++) {
            ans_id = ans_id + answer[i] + ",";
        }
        $.ajax({
            type: "GET",
            url: "http://recommend.mbaobao.com/r/getDelegateSkus",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            data: {
                options: ans_id
            },
            success: function(json) {
                two_Html_(json.data);
            }
        });
    };
    var two_Html_ = function(abc) {
        var two_Html = "";
        var N01 = '<div class="mbb_survey_head">' + '<img src="http://cca.mbaobao.com/mkts/201311/15/survey/img/06/title_06_01.jpg" />' + "</div>";
        var N02 = "";
        var check = [];
        for (var i = 0; i < abc.length; i++) {
            N02 = N02 + '<li><a href="#" data-id=' + abc[i].sku + '><img src="' + abc[i].imageUrl + '" /></a></li>';
        }
        two_Html = '<div class="mbb_survey_content" id="mbb_survey_' + survey_sum + '">' + N01 + '<div class="mbb_survey_choose mbb_survey_choose_sku"><ul>' + N02 + "</ul></div></div>";
        $(".mbb_survey_roll").append(two_Html).find(".mbb_survey_choose").find("a").click(function() {
            //选择4个
            if ($(this).hasClass("checked")) {
                $(this).removeClass("checked");
                for (var i = 0; i < check.length; i++) {
                    if ($(this).data("id") == check[i]) {
                        check.splice(i, 1);
                    }
                }
            } else {
                $(this).addClass("checked");
                check.push($(this).data("id"));
            }
            if (check.length == 4) {
                saveanswer(check);
            }
            return false;
        });
    };
    //模板三
    var three_Html = function() {
        var abc = $(".mbb_survey_roll").append(three_Html_);
        //经常使用（多选）
        var more_ = [];
        abc.find(".mbb_survey_choose_more").find("a").click(function() {
            if ($(this).hasClass("checked")) {
                $(this).removeClass("checked");
                for (var i = 0; i < more_.length; i++) {
                    if ($(this).data("id") == more_[i]) {
                        more_.splice(i, 1);
                    }
                }
            } else {
                $(this).addClass("checked");
                more_.push($(this).data("id"));
            }
            if (size_ === null || long_ === null || more_.length === 0) {} else {
                abc.find(".mbb_survey_content").find(".mbb_survey_submit").find("span").hide();
            }
            return false;
        });
        //材质
        var long_ = null;
        abc.find(".mbb_survey_choose_long").find("a").click(function() {
            if ($(this).hasClass("checked")) {
                $(this).removeClass("checked");
                long_ = null;
            } else {
                $(".mbb_survey_choose_long").find("a").eq(long_).removeClass("checked");
                $(this).addClass("checked");
                long_ = $(this).data("id");
            }
            if (size_ === null || long_ === null || more_.length === 0) {} else {
                abc.find(".mbb_survey_content").find(".mbb_survey_submit").find("span").hide();
            }
            return false;
        });
        //大小
        var size_ = null;
        abc.find(".mbb_survey_choose_size").find("a").click(function() {
            if ($(this).hasClass("checked")) {
                $(this).removeClass("checked");
                size_ = null;
            } else {
                $(".mbb_survey_choose_size").find("a").eq(size_).removeClass("checked");
                $(this).addClass("checked");
                size_ = $(this).data("id");
            }
            if (size_ === null || long_ === null || more_.length === 0) {} else {
                abc.find(".mbb_survey_content").find(".mbb_survey_submit").find("span").hide();
            }
            return false;
        });
        //提交  
        abc.find(".mbb_survey_content").find(".mbb_survey_submit").click(function() {
            if (size_ === null || long_ === null || more_.length === 0) {
                $(this).find("span").show();
            } else {
                answer_02.push(more_);
                answer_02.push(long_);
                answer_02.push(size_);
                answer_submit();
            }
            return false;
        });
    };
    //boy
    var three_Html_boy = function() {
        var abc = $(".mbb_survey_roll").append(three_Html_boy_);
        //经常使用 单选
        var more_ = null;
        abc.find(".mbb_survey_choose_more").find("a").click(function() {
            if ($(this).hasClass("checked")) {
                $(this).removeClass("checked");
                more_ = null;
            } else {
                $(".mbb_survey_choose_more").find("a").eq(more_).removeClass("checked");
                $(this).addClass("checked");
                more_ = $(this).data("id");
            }
            if (size_ === null || long_ok === false || more_ === null) {} else {
                abc.find(".mbb_survey_content").find(".mbb_survey_submit").find("span").hide();
            }
            return false;
        });
        //关注 选择3个
        var long_ = [];
        var long_ok = false;
        abc.find(".mbb_survey_choose_long").find("a").click(function() {
            if ($(this).hasClass("checked")) {
                $(this).removeClass("checked");
                for (var i = 0; i < long_.length; i++) {
                    if ($(this).data("id") == long_[i]) {
                        long_.splice(i, 1);
                    }
                }
            } else if (long_ok) {} else {
                $(this).addClass("checked");
                long_.push($(this).data("id"));
            }
            if (long_.length == 3) {
                long_ok = true;
            } else {
                long_ok = false;
            }
            if (size_ === null || long_ok === false || more_ === null) {} else {
                abc.find(".mbb_survey_content").find(".mbb_survey_submit").find("span").hide();
            }
            return false;
        });
        //材质
        var size_ = null;
        abc.find(".mbb_survey_choose_size").find("a").click(function() {
            if ($(this).hasClass("checked")) {
                $(this).removeClass("checked");
                size_ = null;
            } else {
                $(".mbb_survey_choose_size").find("a").eq(size_).removeClass("checked");
                $(this).addClass("checked");
                size_ = $(this).data("id");
            }
            if (size_ === null || long_ok === false || more_ === null) {} else {
                abc.find(".mbb_survey_content").find(".mbb_survey_submit").find("span").hide();
            }
            return false;
        });
        //提交  
        abc.find(".mbb_survey_content").find(".mbb_survey_submit").click(function() {
            if (size_ === null || long_ok === false || more_ === null) {
                $(this).find("span").show();
            } else {
                answer_02.push(more_);
                answer_02.push(long_);
                answer_02.push(size_);
                answer_submit();
            }
            return false;
        });
    };
    //显示条    
    var bar_Html = function() {
        $(".mbb_survey_bar").addClass("bar_0" + survey_sum);
    };
    //保存答案构造下一题
    var saveanswer = function(abc) {
        var survey_left = survey_sum * 960;
        //滚动长度
        answer.push(abc);
        //记录答案
        var n = survey_sum++;
        //下一题
        if (sex == "boy") {
            //显示下一题
            choose_title_boy();
            $(".mbb_survey_roll").animate({
                left: -survey_left,
                height: survey_height_boy[n--]
            }, "easeOutExpo", function() {});
        } else {
            choose_title();
            $(".mbb_survey_roll").animate({
                left: -survey_left,
                height: survey_height[n--]
            }, "easeOutExpo", function() {});
        }
    };
    //答案的提交
    var answer_submit = function() {
        var sku_ = "";
        //sku的答案
        var answers = "";
        //9道题的答案
        for (var i = 0; i < answer.length; i++) {
            if (isArray(answer[i]) === true) {
                for (var n = 0; n < answer[i].length; n++) {
                    sku_ = sku_ + answer[i][n] + ",";
                }
            } else {
                answers = answers + answer[i] + ",";
            }
        }
        for (var z = 0; z < answer_02.length; z++) {
            if (isArray(answer_02[z]) === true) {
                var answer_ = "";
                for (var m = 0; m < answer_02[z].length; m++) {
                    answer_ = answer_ + answer_02[z][m] + "|";
                }
                answers = answers + answer_ + ",";
            } else {
                answers = answers + answer_02[z] + ",";
            }
        }
        $.ajax({
            type: "GET",
            url: "http://recommend.mbaobao.com/r/getClusterRecommend",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            data: {
                num: "10",
                skus: sku_,
                answer: answers,
                gender: gender
            },
            success: function(json) {
                if (callback === null) {} else {
                    callback(json);
                }
                $(".mbb_survey_close").click();
            },
            error: function() {
                window.alert("提交失败，亲！请刷新下页面试试");
            }
        });
    };
    //判断是否是集合
    var isArray = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    };
});

define("app/questionnaire/1.0.0/survey-debug.css", [], function() {
    seajs.importStyle(".wrapper{width:100%}.simplemodal-overlay{background-color:#000}.mbb_survey{width:960px;margin:0 auto;background-color:#fff;overflow:hidden;position:relative}.mbb_survey .mbb_survey_close{position:absolute;top:0;right:0;z-index:2}.mbb_survey .mbb_survey_roll{width:9999px;position:relative;overflow:hidden}.mbb_survey .mbb_survey_roll .mbb_survey_head{width:960px;float:left}.mbb_survey .mbb_survey_roll .mbb_survey_content{width:960px;float:left;overflow:hidden}.mbb_survey .mbb_survey_roll .mbb_survey_content .mbb_survey_choose ul li{display:inline-block;*display:inline;*zoom:1}.mbb_survey .mbb_survey_roll .mbb_survey_content .mbb_survey_choose ul li a{width:198px;height:286px;background-color:#fff;display:block;border:2px solid #d5d5d5;margin:10px}.mbb_survey .mbb_survey_roll .mbb_survey_content .mbb_survey_choose ul li a:hover{border:2px solid #f06}.mbb_survey .mbb_survey_roll .mbb_survey_content .mbb_survey_choose ul li a img{margin:2px}.mbb_survey .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_sku ul li a img{width:134px;height:134px}.mbb_survey .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_sku ul li .checked{border:2px solid #f06}.mbb_survey .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_sku ul li a{width:138px;height:138px;margin:3px}.mbb_survey .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_more ul li a,.mbb_survey .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_size ul li a{width:98px;height:98px;margin:3px}.mbb_survey .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul li a{width:100px;height:35px;margin:3px}.mbb_survey .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_more ul li .checked,.mbb_survey .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_size ul li .checked,.mbb_survey .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul li .checked{border:2px solid #f06}.mbb_survey .mbb_survey_roll .mbb_survey_content .mbb_survey_submit{margin-top:30px;float:right;margin-right:51px;width:200px;height:60px;position:relative}.mbb_survey .mbb_survey_roll .mbb_survey_content .mbb_survey_submit span{font-size:14px;font-weight:'微软雅黑';font-weight:bolder;color:#ff0059;display:none}.mbb_survey .mbb_survey_roll .mbb_survey_content .mbb_survey_submit img{position:absolute;top:25px;left:45px}.mbb_survey .mbb_survey_bar{width:960px;height:52px;background:url(http://cca.mbaobao.com/mkts/201311/15/survey/img/achieve_09.jpg) no-repeat top center}.mbb_survey .bar_01{background-position:0 0}.mbb_survey .bar_02{background-position:0 -54px}.mbb_survey .bar_03{background-position:0 -108px}.mbb_survey .bar_04{background-position:0 -162px}.mbb_survey .bar_05{background-position:0 -216px}.mbb_survey .bar_06{background-position:0 -270px}.mbb_survey .bar_07{background-position:0 -324px}.mbb_survey .bar_08{background-position:0 -378px}.mbb_survey_man .mbb_survey_bar{width:960px;height:52px;background:url(http://cca.mbaobao.com/mkts/201311/15/survey/img2/achieve_07.jpg) no-repeat top center}.mbb_survey_man .bar_01{background-position:0 0}.mbb_survey_man .bar_02{background-position:0 -54px}.mbb_survey_man .bar_03{background-position:0 -108px}.mbb_survey_man .bar_04{background-position:0 -162px}.mbb_survey_man .bar_05{background-position:0 -216px}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose ul li a:hover{border:2px solid #38517b}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_more ul li a{width:170px;height:119px;margin:3px}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul li a{width:90px;height:35px;margin:3px;margin-right:80px;font-size:16px;font-family:'微软雅黑';text-align:center;line-height:37px;border:2px solid #fff}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_01 a{color:#5889b4}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_01 a:hover,.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_01 .checked{border:2px solid #5889b4}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_02 a{color:#ada468}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_02 a:hover,.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_02 .checked{border:2px solid #ada468}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_03 a{color:#a76e5d}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_03 a:hover,.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_03 .checked{border:2px solid #a76e5d}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_04 a{color:#da915a}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_04 a:hover,.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_04 .checked{border:2px solid #da915a}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_05 a{color:#ffc938}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_05 a:hover,.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_05 .checked{border:2px solid #ffc938}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_06 a{color:#92a76c}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_06 a:hover,.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_06 .checked{border:2px solid #92a76c}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_07 a{color:#a8896c}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_07 a:hover,.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_07 .checked{border:2px solid #a8896c}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_08 a{color:#94b356}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_08 a:hover,.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_08 .checked{border:2px solid #94b356}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_09 a{color:#92a76c}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_09 a:hover,.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_09 .checked{border:2px solid #92a76c}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_10 a{color:#b0afab}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_10 a:hover,.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul .long_10 .checked{border:2px solid #b0afab}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_size ul li a{width:152px;height:42px;margin:3px}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_submit{margin-top:-10px;float:right;margin-right:17px}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_submit span{color:#38517b}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_submit img{position:absolute;top:25px;left:45px}.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_more ul li .checked,.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_size ul li .checked,.mbb_survey_man .mbb_survey_roll .mbb_survey_content .mbb_survey_choose_long ul li .checked{border:2px solid #38517b}");
});
