define(function(require, exports, module) {
	var $ = require("jquery");

	require("./floating.js");

	//console.log(a)

	$("#supLeft").floating({
		slideDis: 800,
		effect: 'show',
		iswidth:true,
		widthDis:1200
	})

	// $("#supRight").floating({
	// 	slideDis: 500,
	// 	effect: 'down'
	// })
    

    $("#supRight").floating({
		slideDis: 500,
		effect: 'custom',
		addClass:'sup-right-test'
	})

    

    



})