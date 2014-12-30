define(function (require,exports,module){
       var $=require('jquery');
       
       var seajsT=exports;
       
       var defaults={
       	   'name':'LU',
       	   'sex':'man',
       	   'age':24
       }

       seajsT.init=function(options){
          var boy=$.extend({},defaults,options||{}); 
          console.log(boy) 
       }
})