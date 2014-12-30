/* global 0.1 build 2013-04-01 14:27 by baoluo */
/*global seajs:false*/

seajs.config({
    "alias": {

        "global": "global/0.1/global",

        // Base
        'base': 'base/0.9.16/base',
        'events': 'events/0.9.1/events',
        'class': 'class/0.9.2/class',
        'es5-safe': 'es5-safe/0.9.2/es5-safe',
        'json': 'json/1.0.2/json',
        'jquery1_3_2': 'jquery/1.3.2/jquery',
        'jquery': 'jquery/1.7.2/jquery',
        '$': 'jquery/1.7.2/jquery',
        'jqtouch': 'jqtouch/1.0/jqtouch',
        'backbone': 'backbone/0.9.2/backbone',
        'underscore': 'underscore/1.3.3/underscore',
        'cookie': 'cookie/1.0.2/cookie.js',
        'handlebars': 'handlebars/1.0.0/handlebars',
        'mustache': 'mustache/0.5.0/mustache',
        'zepto': 'zepto/1.0/zepto',
        'easing': 'easing/1.3/easing',

        // UI
        'swfobject': 'swfobject/2.2/swfobject',
        'idtabs': 'idtabs/3.0/idtabs',
        'placeholder': 'placeholder/1.0/placeholder',
        'simplemodal': 'simplemodal/1.4.2/simplemodal',
        'flickslide': 'flickslide/1.0.2/flickslide',
        'bxslider': 'bxslider/3.0/bxslider',
        'blockHighlight': 'blockhighlight/0.1/blockHighlight',
        'wookmark': 'wookmark/0.5/wookmark'
    },
    preload: [
        Function.prototype.bind ? '' : 'es5-safe', this.JSON ? '' : 'json'
    ],
    map: [
        [/^(.*\/libs\/global\/0\.1\/.*\.(?:css|js))(?:.*)$/i, '$1?20130401'],
        [/^(.*\/libs\/mbb-region\/0\.2\/.*\.(?:css|js))(?:.*)$/i, '$1?20120926'],
        [/^(.*\/p\/list\/0\.3\/.*\.(?:css|js))(?:.*)$/i, '$1?20130128'],
        [/^(.*\/p\/cart\/3\.2\/.*\.(?:css|js))(?:.*)$/i, '$1?201303252'],
        [/^(.*\/p\/home\/0\.4\/.*\.(?:css|js))(?:.*)$/i, '$1?20130128'],
        [/^(.*\/p\/new\/0\.2\/.*\.(?:css|js))(?:.*)$/i, '$1?20130314'],
        [/^(.*\/p\/goodsdetail\/0\.6\/.*\.(?:css|js))(?:.*)$/i, '$1?20130302'],
        [/^(.*\/libs\/mbb-paBase\/1\.0\/.*\.(?:css|js))(?:.*)$/i, '$1?20130307'],
        [/^(.*\/libs\/mbb-floatbar\/1\.3\/.*\.(?:css|js))(?:.*)$/i, '$1?20130129'],
        [/^(.*\/p\/guang\/2\.0\/.*\.(?:css|js))(?:.*)$/i, '$1?20130128'],
		[/^(.*\/p\/channels\/1\.0\/.*\.(?:css|js))(?:.*)$/i, '$1?20130128'],
		[/^(.*\/p\/login\/1\.0\/.*\.(?:css|js))(?:.*)$/i, '$1?20130128']
    ],
    debug: false,
    base: 'http://cca.mbaobao.test/static/libs/'
});


// 注意  preload加载的模块，可能会有多个模块有依赖(backbone.js)，不能去除
