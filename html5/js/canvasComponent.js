//带圆角的矩形
CanvasRenderingContext2D.prototype.roundRect=        
  function(x,y,width,height,radius,fill,stroke){
      if(typeof stroke=="undefined"){
         stroke=true;
      }
      if(typeof radius==="undefined"){
         radius=5;
      }
      this.beginPath();
      this.moveTo(x+radius,y);
      this.lineTo(x+width-radius,y);
      this.quadraticCurveTo(x+width,y,x+width,y+radius);
      this.lineTo(x + width, y + height - radius);
	  this.quadraticCurveTo(x + width, y + height, x + width - radius, y+ height);
	  this.lineTo(x + radius, y + height);
	  this.quadraticCurveTo(x, y + height, x, y + height - radius);
	  this.lineTo(x, y + radius);
	  this.quadraticCurveTo(x, y, x + radius, y);
	  this.closePath();
	  if(stroke){
	  	this.stroke();
	  }
      if(fill){
      	this.fill();
      }
  }
//画虚线
CanvasRenderingContext2D.prototype.dashedLineTo=
   function(fromX,fromY,toX,toY,pattern){
   	  //默认虚线为5px
   	  if (typeof pattern==="undefined"){
   	  	pattern=5;
   	  }
   	  //计算三角形的长和宽
   	  var dx=(toX-fromX);
   	  var dy=(toY-fromY);
   	  var distance=Math.floor(Math.sqrt(dx*dx+dy*dy)); //距离
   	  var dashlineInteveral=(pattern<=0)?distance:(distance/pattern);      //空隙间隔数
      var deltay=(dy/distance)*pattern;
      var deltax=(dx/distance)*pattern;

      //draw dash line
      this.beginPath();
      for(var dl=0;dl<dashlineInteveral;dl++){             
          if(dl%2){
            this.lineTo(fromX+dl*deltax,fromY+dl*deltay);
          }else{
            this.moveTo(fromX+dl*deltax,fromY+dl*deltay);
          }
      }
      this.stroke();
      
   }
