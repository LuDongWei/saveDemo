define(function(require) {
    var $ = require("jquery");
    require("simplemodal")($);
    var G = require("global");
    var pbase = require("mbb/paBase/2.0.0/paBase");
    var Countdown = require('gallery/countdown/2.0.3/countdown');

    var lazyload = require("gallery/lazyload/1.0.0/lazyLoad");

    var curModal;
    var curModal1;
    var MOBLIE_PHONE_REG = /^[1]([3|4|5|8][0-9]{1})[0-9]{8}$/;

    var urlArr = window.location.href.split('#');
    var isGetCoupen = urlArr[1] ? true : false;



    $(function() {

        lazyload.init({
            defObj: ".lazybox"
        })
        setTimeout(function() {
            lazyload.init({
                defObj: ".lazybox"
            })
        }, 3000)
        if (isGetCoupen) {

            if (urlArr[1] == 'getCoupen20') {
                G.User.passport(function() {
                    pbase.loginGetCoupen.get(3701);
                    return false
                }, {
                    'refererUrl': window.location.href + '#getCoupen20'
                })
            }
            if (urlArr[1] == 'getCoupen50') {
                G.User.passport(function() {
                    pbase.loginGetCoupen.get(3700);
                    return false
                }, {
                    'refererUrl': window.location.href + '#getCoupen50'
                })
                return false
            }
        }

        $("#look").click(function() {
            curModal = $(".look-wrap").modal({
                escClose: true,
                close: true,
                overlayClose: true,
                closeClass: 'tc2-close'
            });
            return false
        })
        $(".get50").click(function() {
            G.User.passport(function() {
                pbase.loginGetCoupen.get(3700);
                return false
            }, {
                'refererUrl': window.location.href + '#getCoupen50'
            })
            return false
        })
        $(".get30").click(function() {
            G.User.passport(function() {
                pbase.loginGetCoupen.get(3701);
                return false
            }, {
                'refererUrl': window.location.href + '#getCoupen20'
            })
            return false
        })
        var isFloat = false;
        $(window).on("scroll", function() {
            if ($(document).scrollTop() > 800) {
                $(".f-float").fadeIn();
                isFloat = true;
            } else {
                $(".f-float").fadeOut();
                isFloat = false
            }
        })

    });

});