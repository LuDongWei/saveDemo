define(function (require,exports,module){
       var $=require("jquery");
       var Events = require("events");  
       
      
       var User = exports;

       Events.mixTo(User);
      

       $("#Mtest").on("click",function(){
          User.trigger("longin") 
       }) 
         
   
})