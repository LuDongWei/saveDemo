//1.创建一个canvas
var canvas = document.createElement("canvas");//创建一块画布
var ctx=canvas.getContext("2d");//参数 contextID 指定了您想要在画布上绘制的类型。当前唯一的合法值是 "2d"，它指定了二维绘图，并且导致这个方法返回一个环境对象，该对象导出一个二维绘图 API。
canvas.width=512;//设置 canvas 的高度
canvas.height=480;//设置 canvas 的宽度。
document.body.appendChild(canvas);//把该canvas添加到body中
//我们首先要做的当然是创建一个画板要素。笔者在这一步使用JavaScript而不是HTML，因为前者更简单。在具备有素后，我们就可以引用文本，设置规模并将其添加到文档中。

//2.添加背景图像
var bgReady=false;
var bgImage=new Image();
bgImage.onload=function(){//bgImage加载时执行
bgReady=true;
};
bgImage.src="images/background.png";

//英雄图片
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
heroReady = true;
};
heroImage.src = "images/hero.png";
//魔鬼图片
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
monsterReady = true;
};
monsterImage.src = "images/monster.png";
//游戏当然需要图像！所以我们要上传一下图像。笔者希望尽可能化繁为简，因此只使用了一张图像而不是用漂亮的类对其进行包装。bgReady被用来告知画板何时可以安全作画，因为如果在加载前就安排其作画可能会抛出DOM错误。

//3.游戏对象
var hero={
speed:256//速度，每秒移动的像素
};
var monster={};
var monstersCaught=0;
//现在，我们定义稍后会用到的变量。Hero通过speed（也就是每秒移动的像素）安装。Monster不会移动所以它是坐标。最后mostersCaught保存了玩家捕捉的怪物数量。

//4.玩家输入
//处理键盘的输入
var keysDown={};
addEventListener("keydown",function(e){
keysDown[e.keyCode]=true;
},false);

addEventListener("keyup",function(e){
delete keysDown[e.keyCode];
},false);
//现在输入操作的时候了。或许对于具有Web开发背景的程序员而言，这是第一个绊脚石。关键是要记住我们不需要立刻对输入事件作出即时响应。在Web堆栈里，可能在用户初始化输入的时候开始动画或请求数据会更合适一些。但是，在此流程中，我们希望此游戏的逻辑是保留较大的控制权。因此，我们只需要稍后输入保存用户输入即可。变量keysDown可以保存任意事件的keyCode。如果按键代码在对象中，那么用户就可以按下此按键。就这么简单。

//5.新游戏
//当玩家抓到魔鬼之后，重新启动游戏
var reset=function(){
hero.x=canvas.width/2;
hero.y=canvas.height/2;

//随机放置魔鬼
monster.x=32+(Math.random()*(canvas.width-64));
monster.y=32+(Math.random()*(canvas.height-64));
};
//Reset函数的调用是为了开始新游戏，或是设置新游戏级别等。它会把玩家的角色放到屏幕正中，而怪物的位置则随机摆放。

//6.更新对象
var update=function(modifier){
if(38 in keysDown){//按住键盘向上箭头
hero.y-=hero.speed*modifier;
}

if(40 in keysDown){//按住键盘向下箭头
hero.y+=hero.speed*modifier;
}

if(37 in keysDown){//按住键盘向左箭头
hero.x-=hero.speed*modifier;
}

if(39 in keysDown){//按住键盘向右箭头
hero.x+=hero.speed*modifier;
}

//是否碰到了魔鬼 
if(hero.x<=(monster.x+32)
			&&monster.x<=(hero.x+32)
			&&hero.y<=(monster.y+32)
			&&monster.y<=(hero.y+32))
{
++monstersCaught;
reset();
}
};
//在每次进行多选项操作时可以调用Update函数。它可以检查“上下左右”按键看用户是否有按下这些按键。如果按下，那么玩家角色会朝相应的方向移动。
//把Modifier参数发送给update可能会让大家感到疑惑。你可以在main函数中看到它是符合被引用，但是我们在此先解释一下，modifier是一个机遇时间的量，其基数是1.如果时间过了一秒，那么其数值就会是1，玩家角色的速度也会乘以1，这意味着玩家在这一秒内移动了256个像素。如果过去半秒，那么数值为0.5，玩家移动速度也相应乘以0.5。以此类推。这个函数的调用速度如此之快，以至于modifier的数值会很低，但是使用这种模式可以确保玩家橘色以相同的速度移动，而不论脚本的运行速度是快还是慢。现在我们是按照玩家的输入来移动角色，我们可以对此进行检查。如果玩家角色和怪兽之间出现冲突，那就对了。我们就可以得分，然后重置游戏。

//7.对象的安排
var render=function(){
if(bgReady){
ctx.drawImage(bgImage,0,0);
}
if(heroReady){
ctx.drawImage(heroImage,hero.x,hero.y);
}
if(monsterReady){
ctx.drawImage(monsterImage,monster.x,monster.y);
}

//得分
ctx.fillStyle="rgb(250,250,250)";
ctx.font="24pxHelvetica";
ctx.textAlign="left";
ctx.textBaseline="top";
ctx.fillText("抓住魔鬼数："+monstersCaught,32,32);
};	
//当你看到动作慢下来的时候，游戏就变得有趣起来，所以让我们把一切都画出来。首先，把背景图片放到画板上，然后是玩家角色的图像和怪物的图像。注意放的顺序很重要，因为图片之间会产生覆盖效果。
//下面我们要更改与字体相关的文本的属性，然后调用fillText来显示玩家分数。由于我们没有复杂的动画或移动方式，所以只需完成上面的贴图就可以了。

//8.主要的游戏循环
var main=function(){
var now =Date.now();
var delta=now-then;

update(delta/1000);
render();

then=now;
};
//主游戏循环就是控制游戏流程。首先我们要获取当前时间戳，这样才能计算delta值（上次间隔后过去了多少毫秒）。通过除以1000（一秒中包含的毫秒数）将调节器发送给update。然后调用render并记录时间戳。

//9.开始游戏
reset();
var then =Date.now();
setInterval(main,1);
//这是最后一段代码。首先我们调用reset开始新游戏/设置新的游戏级别。然后我们用then变量开始时间戳，并启动interval。