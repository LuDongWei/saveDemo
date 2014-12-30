define(function(require, exports, module) {

    var $ = require('jquery');
    var handlebars = require('handlebars');

    require("jquery-plugin/bxslider/4.1.1/bxslider")($);

    var data;

    exports.subclassGoods = function() {
        var currentSku = ITEM_INFO.sku;
        jsonpContent(currentSku);
    }

    //提取数据 
    var jsonpContent = function(currentSku) {
        $.ajax({
            url: 'http://m.mbaobao.com/item/promotions/' + currentSku + '.html',
            type: 'get',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            success: function(data) {
                if (data.result = 'success') {
                    analyzingData(data);
                }
            }
        })
    }


    var needData;

    //判断换购的商品数
    var analyzingData = function(data) {
        if (data.data == '') {
            return;
        }
        needData = data.data.appendbuy[0];
        var controlNum = '01';
        if (needData.skus.length == 1) {
            $('#detailBox .Present .goods').addClass('oneGoods');
        } else if (needData.skus.length == 2) {} else {
            $('#detailBox .Present .goods').addClass('moreGoods');
            controlNum = '02';
        };
        controlShow(controlNum);
    }



    //显示主商品
    var mainGoods = function() {
        var template = handlebars.compile($('#mainGoods-temolate').html());
        $('.mainGoods').html(template(needData));
        $('#append_rule_id').val(needData.rule_id);
    }

    //显示选购商品(正常)
    var subclassGood_01 = function() {
        var template = handlebars.compile($('#subclassGoods-temolate').html());
        var slider = $('.subclassGoods ul').html(template(needData));

        return 01;
    }

    //显示选购商品(带滚动)
    var subclassGood_02 = function() {
        var template = handlebars.compile($('#subclassGoods-temolate').html());
        var slider = $('.subclassGoods ul').html(template(needData)).bxSlider({
            'mode': 'vertical',
            'minSlides': 3, //定义显示个数
            'maxSlides': 3,
            'moveSlides': 3, //移动个数
            'speed': 1000,
            'auto': false,
            'controls': false,
            'easing': 'easeOutQuint',
            'pager': false,
            'onSliderLoad': function() {
                $('.subclassGoods').find('.chuangGoods').eq(3).click();
            }
        });

        $('.replaceButton .bottomButton').click(function() {
            slider.goToNextSlide();
        })

        $('.replaceButton .topButton').click(function() {
            slider.goToPrevSlide();
        })

        return 02;
    }

    //显示控制
    var controlShow = function(controlNum) {
        mainGoods();
        var slider = (controlNum == '01') ? subclassGood_01() : subclassGood_02();

        if (slider == 01) {
            $('.Present').show();
            $('.subclassGoods').find('.chuangGoods').eq(0).click();
        } else {
            $('.Present').show();
        };
    }



})