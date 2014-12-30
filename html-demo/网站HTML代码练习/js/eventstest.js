define(function (require,exports,module){
       var $=require("jquery");
       var Events = require("events");  


       var User=require("./eventstest2.js");    
       
       // var object=new Events();       //直接实例化
       // object.on("aabb",function(){
       //      alert("xxxx"); 
       // });

    
       User.on('longin',function(){
       	   alert(1)
       })




       
      
})