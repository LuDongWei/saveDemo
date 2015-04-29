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
    // var aabb = _.reduce([[1,2],[2,3],[4,5]],function(memo,num){
    //       return   parseInt(memo,10) + parseInt(num,10) 
    // },0)

    // var aabb2 = _.reduceRight([[1,2],[2,3],[4,5]],function(memo,num){
    //       return   parseInt(memo,10) + parseInt(num,10) 
    // },0)

    // var sum = $.reduceRight([[1,2],[2,3],[4,5]],function(memo,num){
    //       return  memo.concat(num)
    // },[])
    
    // console.log(aabb)
    // console.log(aabb2)
    // console.log(sum)

    // console.log($.some([null,0,'yes',false]))

    // var stooge = {name : 'moe'};
    // console.log( _.property('name')(stooge))



    // _.some([null,0,'yes',false],function(aa){
    //     console.log(aa)
    // })

  var listOfPlays = [{
      title: 'aaa',
      author: "Shakespeare",
      year: 1612
   }, {
      title: 'bbb',
      author: "Shakespeare",
      year: 1611
   }];
   
  //  console.log(aa)
    // var ready = $.matcher({selected: true, visible: true}); 

   var aabb =  $.where(listOfPlays, {author: "Shakespeare", year: 1611});

   console.log(aabb)

    // var readyToGoList = _.filter(list, ready);