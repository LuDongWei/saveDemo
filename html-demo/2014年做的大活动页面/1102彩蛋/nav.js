// fashion page module

define(function (require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Global = require("global")

    require("./scrollSpy.js")($);


    $(function () {

        /*------------------------------ 侧边导航--------------------*/
        setTimeout(function () {
            $('body').scrollspy({
                target: '.nav-float'
            })
        }, 0)





    })


});