define(function (require,exports,module){
      var $=require("jquery");
      //require("jquery_Mousewheel")($);   //使jquery绑定mousewheel事件
      

      // $("#wheel").mousewheel(function(){
      // 	console.log(1)
      // })
      
      // $("#wheel").mousewheel(function(){
      // 	 alert(1)
      // })

      $("#wheel").bind("mousewheel",function(event, delta){

            //  e = e || window.event;
			// if (navigator.userAgent.toLowerCase().indexOf('msie') >= 0) {
			// 	event.returnValue = false;
			// } else {
			// 	e.preventDefault();
			// };
			console.log(event)
			console.log(delta)
             var dir = delta > 0 ? 'Up' : 'Down',  
                vel = Math.abs(delta);  
           // console.log(vel) 
            return false;  
     }) 
})