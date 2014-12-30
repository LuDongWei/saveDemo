define(function(require,exports,module){return function(b){b.fn.flickSlide=function(F){var x;var H;var G=navigator.userAgent.toLowerCase(),z=["iphone","android","ipad"],K=false,g="",x=0,H=0,o={},w=1,c={},E={},h=4000,J=0,f=0,t=0;for(var A=0;A<z.length;A++){if(G.indexOf(z[A],0)!=-1){K=true;if(z[A]==="android"){t=400}if(z[A]==="iphone"){t=0}}}window.addEventListener("orientationchange",function(){if(K!==true){return}switch(window.orientation){case 0:L();break;case 90:L();break;case -90:L();break}},false);function L(){clearTimeout(c);setTimeout(function(){var i=getComputedStyle(b(".moveWrap").get(0));if(i){b(".resizable").css("width",i.width);b(".slideMask").css("height",b(".move").outerHeight()).css("width",i.width-1);H=Number(b(F.parentArea+" .flickSlideContainer li.slideUnit").length-1)*Number(getComputedStyle(b(F.parentArea+" .flickSlideContainer li.slideUnit").get(0)).width.replace("px",""))*-1;b("div.flickSlideContainer ul.move").get(0).style.webkitTransform="translate3d(0,0,0)";x=0;J=0;e();c=setTimeout(v,h)}else{}},t)}function v(){if(w===0){var i=o.children("li.slideUnit").outerWidth();o.get(0).style.webkitTransition="-webkit-transform 0.6s ease-out";diffX=-151;if(x===H){o.get(0).style.webkitTransform="translate3d(0, 0, 0)";x=0;J=0;e()}else{x=x-i;o.get(0).style.webkitTransform="translate3d("+x+"px, 0, 0)";J++;e()}}w=0;c=setTimeout(v,h)}function e(){var j=b(".slidePagerPointer.active");var i="#pager"+String(J);j.removeClass("active");b(i).addClass("active");switch(J){case 0:b(".flickSlideBottom .bottomLeft").addClass("off");b(".flickSlideBottom .bottomRight").removeClass("off");break;case f:b(".flickSlideBottom .bottomRight").addClass("off");b(".flickSlideBottom .bottomLeft").removeClass("off");break;default:b(".flickSlideBottom .bottomLeft").removeClass("off");b(".flickSlideBottom .bottomRight").removeClass("off");break}}b.fn.slideButton=function(j){var j=b.extend({direction:"prev",widthSource:{}},j);var i=b(this);i.click(function(){var N=j.widthSource.outerWidth();w=1;clearTimeout(c);o.get(0).style.webkitTransition="-webkit-transform 0.6s ease-out";if(j.direction==="prev"){if(x==0){o.get(0).style.webkitTransform="translate3d(0, 0, 0)";c=setTimeout(v,h);w=0}else{x=x+N;o.get(0).style.webkitTransform="translate3d("+x+"px, 0, 0)";J--;e();c=setTimeout(v,h);w=0}}else{if(j.direction==="next"){if(x===H){o.get(0).style.webkitTransform="translate3d("+H+"px, 0, 0)";c=setTimeout(v,h);w=0}else{x=x-N;o.get(0).style.webkitTransform="translate3d("+x+"px, 0, 0)";J++;e();c=setTimeout(v,h);w=0}}}})};b.fn.touchDrag=function(N){var N=b.extend({slideDuration:4000,targetWidth:150},N);var j=0;o=b(this);h=N.slideDuration;o.bind("touchstart",{type:"start"},i);o.bind("touchmove",{type:"move"},i);o.bind("touchend",{type:"end"},i);function i(Q){var R=o.children("li.slideUnit").outerWidth();var S=Q.originalEvent.touches[0];if(Q.type=="touchstart"){clearTimeout(c);j=0;startX=S.pageX;startY=S.pageY;startTime=(new Date()).getTime()}else{if(Q.type=="touchmove"){j=S.pageX-startX;diffY=S.pageY-startY;if(Math.abs(j)-Math.abs(diffY)>0){Q.preventDefault();moveX=Number(x+j);o.css("-webkit-transition","none");o.get(0).style.webkitTransform="translate3d( "+moveX+"px, 0, 0)"}}else{if(Q.type=="touchend"){var O=(new Date()).getTime();var P=O-startTime;if(P<300){o.get(0).style.webkitTransition="-webkit-transform 0.5s ease-out"}else{o.get(0).style.webkitTransition="-webkit-transform 0.6s ease-out"}if(j>N.targetWidth||(j>60&&P<400&&t===0)){if(x==0){o.get(0).style.webkitTransform="translate3d(0, 0, 0)"}else{x=x+R;o.get(0).style.webkitTransform="translate3d("+x+"px, 0, 0)";J--;e()}}else{if(j<(N.targetWidth*-1)||(j<-60&&P<400&&t===0)){if(x===H){o.get(0).style.webkitTransform="translate3d("+H+"px, 0, 0)"}else{x=x-R;o.get(0).style.webkitTransform="translate3d("+x+"px, 0, 0)";J++;e()}}else{if(x===0){o.get(0).style.webkitTransform="translate3d(0, 0, 0)"}else{if(x===H){o.get(0).style.webkitTransform="translate3d("+H+"px, 0, 0)"}else{o.get(0).style.webkitTransform="translate3d("+x+"px, 0, 0)"}}}}c=setTimeout(v,h);w=0}}}}c=setTimeout(v,h)};var F=b.extend({target:"",colum:1,height:170,duration:4000,parentArea:""},F);var B=b(this);var l=B.outerWidth();var D=B.length;var q=b('<div class="flickSlideContainer"><div class="moveWrap"><ul class="move"></ul></div></div>');var s=b('<div class="slideMask resizable"></div>');var n=b('<div class="flickSlideBottom"><div class="bottomLeft off">&lt;</div><ul class="slidePager"></ul><div class="bottomRight">&gt;</div></div>');var d=b('<div class="flickSlideBottom"><div class="bottomLeft off"></div><ul class="slidePager"></ul><div class="bottomRight"></div></div>');var M=b(this).contents().find("img");var I=Math.floor(D/F.colum);I=D%F.colum>0?I++:I;f=I-1;var p=0;for(var A=0;A<I;A++){var m=b("<li/>").addClass("slideUnit").addClass("resizable");var r=b('<li id="pager'+A+'" class="slidePagerPointer"></li>');if(A===0){r.addClass("active")}for(var y=0;y<F.colum;y++){var u=b("<div/>");if(typeof B[p]!==undefined){u.append(b(B[p]).children())}m.append(u);p++}var C=m.children().find("img").attr("height");if(C<1){C=F.height}var k=(F.height/2)-(C/2);m.css("padding-top",k+"px");q.contents().find("ul.move").append(m);n.children("ul.slidePager").append(r)}b(F.target).after(q);b(F.target).remove();n.children(".bottomLeft").slideButton({direction:"prev",widthSource:q.contents().find("li.slideUnit")});n.children(".bottomRight").slideButton({direction:"next",widthSource:q.contents().find("li.slideUnit")});q.contents().find("ul.move").touchDrag({duration:F.duration,targetWidth:(l*0.4)});if(D>1){q.after(n)}else{q.after(d)}b(window).bind("load",function(){var j=getComputedStyle(b(".moveWrap").get(0));if(j){b(".resizable").css("width",j.width);b(".slideMask").css("height",b(".move").outerHeight()).css("width",j.width-1);if(b(F.parentArea+" .flickSlideContainer li.slideUnit").get(0)){H=Number(b(F.parentArea+" .flickSlideContainer li.slideUnit").length-1)*Number(getComputedStyle(b(F.parentArea+" .flickSlideContainer li.slideUnit").get(0)).width.replace("px",""))*-1}}var i=b("ul.move li:first").clone();b("ul.move").show()})}};var a={ie:navigator.appName=="Microsoft Internet Explorer",java:navigator.javaEnabled(),ns:navigator.appName=="Netscape",ua:navigator.userAgent.toLowerCase(),version:parseFloat(navigator.appVersion.substr(21))||parseFloat(navigator.appVersion),win:navigator.platform=="Win32"};a.mac=a.ua.indexOf("mac")>=0;if(a.ua.indexOf("opera")>=0){a.ie=a.ns=false;a.opera=true}if(a.ua.indexOf("gecko")>=0){a.ie=a.ns=false;a.gecko=true}});
