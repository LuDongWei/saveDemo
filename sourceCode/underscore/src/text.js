var _ = require("underscore");
    $ = require("./underscore.js");

    // 遍历
    // $.each(["a","b","c"],function(a){
    // 	console.log(this)
    // 	console.log(a)
    // },["bb","cc"])


    // console.log($.isEmpty(["a","b"]))
    // console.log($.isEmpty())
    // console.log($.isEmpty(""))
    // console.log($.isEmpty("aa"))

    var sum = $.reduce([1,2,3],function(memo,num){
          return   memo + num 
    },0)

    console.log(sum)