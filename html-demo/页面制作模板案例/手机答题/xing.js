define(function(require, exports, module) {
	  var $=require("jquery");
      var answers=[];
      var questions=[];
      var recentUsers=[];

      var problems=[];     //问题卷
      var problem_numb=0;  

      var prize_type_ = {
        "ET": ["ET", "ET，来自不具名星球。没有伟岸身材但是两眼含爱，史上最憨厚可爱的外星人。你的TA，温柔细腻眼大有神！宇宙级暖男/暖女TOP ONE!~", "http://cca.mbaobao.com/mbaobao/201403/01/ET.jpg"],
        "WKXR": ["瓦肯星人", "瓦肯星人，来自神秘的瓦肯星！（出处：星际迷航）智慧外星类人类族群，以信仰严谨的逻辑和推理闻名~最大的特征当然是一对尖耳朵。你的TA能使用心灵融合来解决两人所遇到的难题，哇塞！", "http://cca.mbaobao.com/mbaobao/201403/01/WKXR.jpg"],
        "BXJG": ["变形金刚", "变形金刚， 在遥远的宇宙中有一个星球——塞博特恩。星球上有一种金属生命体， 他们在近百万年间分化成正义的汽车人和邪恶的霸天虎。你的TA充满正义感，还能随时带你兜风或者策划出行，妙！", "http://cca.mbaobao.com/mbaobao/201403/01/BXJG.jpg"],
        "ATM": ["奥特曼", "迪迦奥特曼，来自光之帝国-M528星云拯救地球的光之战士！‘猫吃鱼，狗吃肉，奥特曼打小怪兽’你的TA充满正义感，并会在危机时挺身相助，赞", "http://cca.mbaobao.com/mbaobao/201403/01/ATM.jpg"],
        "AFD": ["阿凡达", "阿凡达，来自矿藏丰富的潘多拉星球！特色是大长腿和长辫子，能和生命之树互通感应。你的TA，内心纯净善良，向往自由和平！", "http://cca.mbaobao.com/mbaobao/201403/01/AFD.jpg"],
        "CR": ["超人", "超人，来自神秘氪星Krypton！地球长大的氪星全能帅哥，上天入地且身姿矫健。内裤外穿是其独特的个人魅力！你的TA，也许外表看起来是普罗大众的一枚，其实有很多潜在的隐藏技能，要好好珍惜哦~！", "http://cca.mbaobao.com/mbaobao/201403/01/CR.jpg"],
        "LS": ["雷神", "雷神，来自仙宫神域！男神二字当之无愧唉~长子的担当外加未来的神域之王！你的TA，极具责任心，胸怀正义天平，天神下凡！", "http://cca.mbaobao.com/mbaobao/201403/01/LS.jpg"]
      };
      
       //开始答题
      $("#beginAnswer").on("click",function(){
      	  if(USER_ID!=''){
             getAnswers()
      	  	 return false
      	  }
      })

      var getAnswers=function(){
      	  $.ajax({
	          "url": "http://m.mbaobao.com/activity/getQuestions.html",
	          "type": "GET",
	          "dataType": "jsonp",
	          "jsonp": "jsoncallback",
	          "data": {
	            "activityId":3878
	          },
	          "success": function(json) {        
	          	 if(json.result){
	          	 	problems=json.data;
                    beginAnswer()
	          	 }else{
	          	 	alert("亲耐心等待")
	          	 }
	          }
	       }); 
      }

      var beginAnswer=function(){
      	  if(problem_numb>=problems.length){
             //提交数据
             showAnswers();
      	  }else{
      	     var problem_=[];
      	     var answers_=[];

             var problem=problems[problem_numb];
             var answers=problem.answers;
             var num=problem.answers.length;   //打乱排序
             var arr=[];
                 for(var i=0;i<num;i++){
                 arr[i]=i;
             }   
             arr.sort(function(){ 
	             return 0.5 - Math.random(); 
             });

             for (var n = 0; n < arr.length; n++) {
             	 answers_.push(answers[arr[n]])
             };

             problem_.push(problem.question)
             problem_.push(problem.questionId)
             problem_.push(answers_)

             htmlAnswer(problem_)
          }
      }

      var htmlAnswer=function(data){

          var html='<li class="problem" data-number='+data[1]+'>'+
      	   	  	  '<dl>'+
      	   	  	  	'<dt class="matter">'+
      	   	  	  		'<p class="title">问题 '+(problem_numb+1)+'</p>'+
      	   	  	  		'<p class="content">'+data[0]+'</p>'+
      	   	  	  	'</dt>'+
      	   	  	  	'<dd class="answer_a">A. '+data[2][0].answer+'</dd>'+
      	   	  	  	'<dd class="answer_b">B. '+data[2][1].answer+'</dd>'+
      	   	  	  	'<dd class="answer_c">C. '+data[2][2].answer+'</dd>'+
      	   	  	  	'<dd class="answer_d">D. '+data[2][3].answer+'</dd>'+
      	   	  	  	'<dd class="button_">'+
      	   	  	  		'<a href="#" data-answerId='+data[2][0].answerId+' class="button button-rounded button-flat-primary">A</a>'+
      	   	  	  		'<a href="#" data-answerId='+data[2][1].answerId+' class="button button-rounded button-flat-primary">B</a>'+
      	   	  	  		'<a href="#" data-answerId='+data[2][2].answerId+' class="button button-rounded button-flat-primary">C</a>'+
      	   	  	  		'<a href="#" data-answerId='+data[2][3].answerId+' class="button button-rounded button-flat-primary">D</a>'+
      	   	  	  	'</dd>'+
      	   	  	  '</dl>'+	   	         	  
      	   	  '</li>';

       	 $(".mbbXing").find("ul").html(html).find("a").each(function(){
            $(this).on("click",function(){
                var answerId_=$(this).data("answerid");
                var question_=$(this).parent().parent().parent().data("number");
                saveAnswers(answerId_,question_)
                return false 
            })  
         })
      }
  
      var showAnswers=function(){
      	  var Result=[];
          
          for (var i = 0; i < answers.length; i++) {
               Result.push({"question_id": questions[i],"answer_id": answers[i]})          	   
          };
          
          $.ajax({
	          "url": "http://m.mbaobao.com/activity/getQAResult.html",
	          "type": "GET",
	          "dataType": "jsonp",
	          "jsonp": "jsoncallback",
	          "data": {
	          	"activityId":3878,
	            "answerData":JSON.stringify(Result)
	          },
	          "success": function(json) {
	             console.log(json)
	             if(json.result){
                    succeed(json.data);
	             }else{
	             	alert(json.message);
	             }	        
	          	 
	          }
	       });
      }
      
      //成功显示结果
      var succeed=function(data){
      	var name_=data.prize_type;
        var html='<li class="result">'+
                    '<div class="result_">'+
      	   	  	  '<div  class="title">'+prize_type_[name_][1]+'</div>'+
      	   	  	  '<div class="pic">'+
      	   	  	  	   '<img src='+prize_type_[name_][2]+' width="107" height="110">'+
      	   	  	  '</div>'+
      	   	  	  '<div class="prize">'+prize_type_[name_][0]+'</div>'+
      	   	  	  '<a href="#" id="beginAnswer_" class="button button-rounded button-flat-caution">再测一次</a> '+ 
      	   	      '</div>'+
      	   	    '</li>';
            
            $(".mbbXing").find("ul").html(html).find("#beginAnswer_").on("click",function(){
      	      if(USER_ID!=''){
               getAnswers()
      	  	   return false
      	      }
            })
       	    problem_numb=0;
       	    answers=[];      
      }
    
      //保存答案
      var saveAnswers=function(answerId,question){
      	  answers.push(answerId)
          questions.push(question)
          problem_numb++
          beginAnswer()
      } 

})