    
     $("document").ready(function(){
       $("#button_01").click(function(){
		  $("#div_1").fadeIn(1000);
		  $("#div_2").fadeIn(2000);
		  $("#div_3").fadeIn(3000);
		  });    
		  
		  
	 $("#button_02").click(function(){
		  $("#div_1").fadeOut("show");
		  $("#div_2").fadeOut("show");
		  $("#div_3").fadeOut("show");
		  });    	  
		     	   
     $("#button_03").click(function(){
		  $("#div_1").fadeToggle();
		  $("#div_2").fadeToggle("show");
		  $("#div_3").fadeToggle(3000); 
		 }) ;  
   
     $("#button_04").click(function(){
		
		 number.reduce();
		 
		 });   

	   
	   
	   });
