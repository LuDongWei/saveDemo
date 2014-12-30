var canvas;
var context;

window.onload=function(){
	//取得<canvas>和绘图上下文
	canvas=document.getElementById("drawingCanvas");
	context=canvas.getContext("2d");

    //添加用于实现绘图操作的事件处理程序
    canvas.onmousedown=startDrawing;
    canvas.onmouseup=stopDrawing;
    canvas.onmouseout=stopDrawing;
    canvas.onmousemove=draw;
}

var isDrawing=false;

function startDrawing(e){
    //开始绘图
    isDrawing=true;
    
    //创造新路径(使用当前设置好的描边颜色和线条粗细)
    context.beginPath();

    //把画笔放到鼠标当前所在的位置
    context.moveTo(e.pageX-canvas.offsetLeft,e.pageY-canvas.offsetTop);
}

function stopDrawing(){
    isDrawing=false;
}

function draw(e){
    if(isDrawing==true){
    	//找到鼠标的新位置
    	var x=e.pageX-canvas.offsetLeft;
    	var y=e.pageY-canvas.offsetTop;

    	//画一条到新位置的线
    	context.lineTo(x,y);
    	context.stroke();
    }
}


//记录此前为选择颜色而被单击过的<img>元素
var previousColorElement;

function changeColor(color,imgElement){
	//重新设置当前绘图要使用的颜色
	context.strokeStyle=color;

	//为刚被单击的<img>元素应用一个新样式
	imgElement.className="Selected";

    //恢复上一次被单击的<img>元素的样式
    if (previousColorElement!=null){
    	previousColorElement.className="";
    }
    previousColorElement=imgElement;
}

//记录此前为选择粗细而被单击过的<img>元素
var  previousThicknessElement;

function changeThickness(thickness,imgElement){
	//重新设置当前绘图要使用的颜色
	context.lineWidth=thickness;

	//为刚被单击的<img>元素应用一个新样式
	imgElement.className="Selected";

    //恢复上一次被单击的<img>元素的样式
    if (previousThicknessElement!=null){
    	previousThicknessElement.className="";
    }
    previousThicknessElement=imgElement;
}

//清除画布
function  clearCanvas(){
   context.clearRect(0,0,canvas.width,canvas.height);
}

//保存图像
function saveCanvas(){
	var savedImage=document.getElementById("savedImageCopy");

	//在图像显示画布数据
	savedImage.src=canvas.toDataURL();

	//显示包含<img>元素的<div>,以便把图像显示出来
	var  imgContainer=document.getElementById("savedCopyContainer");
    imgContainer.style.display="block";

}


