
function scrollSZ(con_id,speed,direct){
	var con,items,heightHalf,heightAll;
	var timer;
	speed = parseInt(speed);//获取设置的速度参数
	con = document.getElementById(con_id);
	con.style.overflow = "hidden";
	if(direct == "top"){
		direct = "top";
	}else if(direct == "bottom"){
		direct = "bottom";
	}else{
		direct = "top";
	}
	
	con.innerHTML +=con.innerHTML;
	con.innerHTML +=con.innerHTML;
	items = getChildNodes(con);
	if(items.length < 1){
		return;
	}
	heightAll = 0;
	for(var i=0;i<items.length;i++){
		var numTop,numBottom;
		if (!!window.ActiveXObject){
			numTop = items[i].currentStyle["marginTop"];
			numBottom = items[i].currentStyle["marginBottom"];
		}else{
			numTop = document.defaultView.getComputedStyle(items[i],null)["marginTop"];
			numBottom = document.defaultView.getComputedStyle(items[i],null)["marginBottom"];
		}
		numTop = parseInt(numTop);
		numBottom = parseInt(numBottom);
		numTop += numBottom;
		if(numTop >0){
			heightAll += numTop;
		}
		heightAll += items[i].offsetHeight;
	}
	heightHalf = heightAll/2;
	if(direct == "bottom"){
		con.scrollTop = heightHalf;
		timer = setInterval(_scrollBottom,speed);		
	}else if(direct == "top"){
		timer = setInterval(_scrollTop,speed);
	}
	con.onmouseover = function(){
		if(timer){
			clearInterval(timer);
			timer = null;
		}
	};
	con.onmouseout = function(){
		if(!timer){
			if(direct == "top"){
				timer = setInterval(_scrollTop,speed);
			}else if(direct == "bottom"){
				timer = setInterval(_scrollBottom,speed);
			}
			
		}
	};
	function _scrollTop(){
		if(con.scrollTop < heightHalf){
			con.scrollTop += 2;
		}else{
			con.scrollTop = 0;
		}
	}
	function _scrollBottom(){
		if(con.scrollTop > 0){
			con.scrollTop -= 2;
		}else{
			con.scrollTop = heightHalf;
		}
	}
}

function scrollSP(con_id,speed,direct){
	var con,innerCon,timer,items,widthAll,widthHalf;
	speed = parseInt(speed);
	con = document.getElementById(con_id);
	con.style.overflow = "hidden";
	items = getChildNodes(con);
	if(items.length == 1){
		innerCon = items[0];
	}else{	
		return;
	}
	innerCon.innerHTML += innerCon.innerHTML;
	innerCon.innerHTML += innerCon.innerHTML;
	items = getChildNodes(innerCon);
	if(items.length<1){
		return;
	}
	widthAll = 0;
	for(var i=0;i<items.length;i++){
		
	}
	
	for(var i=0;i<items.length;i++){
		var numLeft,numRight;
		if (!!window.ActiveXObject){
			items[i].style.styleFloat = "left";
			numLeft = items[i].currentStyle["marginLeft"];
			numRight = items[i].currentStyle["marginRight"];
		}else{
			items[i].style.cssFloat = "left";
			numLeft = document.defaultView.getComputedStyle(items[i],null)["marginLeft"];
			numRight = document.defaultView.getComputedStyle(items[i],null)["marginRight"];
		} 
		numLeft = parseInt(numLeft);
		numRight = parseInt(numRight);
		numLeft += numRight;
		if(numLeft>0){
			widthAll += numLeft;
		}
		widthAll += items[i].offsetWidth;
	}
	widthHalf = widthAll/2;	
	innerCon.style.width = widthAll+"px";
	if(direct == "left"){
		direct = "left";
	}else if(direct == "right"){
		direct = "right";
	}else{
		direct = "left"
	}
	if(direct == "left"){
		timer = setInterval(_scrollLeft,speed);
	}else if(direct == "right"){
		con.scrollLeft = widthHalf;
		timer = setInterval(_scrollRight,speed);
	}
	con.onmouseover = function(){
		if(timer){
			clearInterval(timer);
			timer = null;
		}
	}
	con.onmouseout = function(){
		if(direct == "left"){
			timer = setInterval(_scrollLeft,speed);
		}else{
			timer = setInterval(_scrollRight,speed);
		}
	}
	function _scrollLeft(){
		
		if(con.scrollLeft<widthHalf){
			con.scrollLeft += 2;
		}else{
			con.scrollLeft = 0;
		}
	}
	function _scrollRight(){
		if(con.scrollLeft>0){
			con.scrollLeft -= 2;
		}else{
			con.scrollLeft = widthHalf;
		}
	}
}
function getChildNodes(obj){//获取元素子节点
	var childList,list;
	childList = new Array();
	list = obj.childNodes;
	for(var i=0;i<list.length;i++){
		if(list[i].nodeType == 1)
		childList[childList.length] = list[i];
	}
	return childList;
}