// !图片延迟加载来自腾讯
// 同时具有图片和背景加载等功能
// 
define("gallery/lazyload/2.0.0/lazyLoad", ["jquery"],function(require,exports,module){
       var $=require('jquery');
       
       var win=$(window)

       var lazy={flag:"data-oxlazy",
	       init:function(){
             this.items =$.makeArray($("[" + this.flag + "]"));
             this.cnt = this.items.length;

             if (this.cnt === 0) {
                return false;
             }

            win.on("scroll.oxlazy",function (d) {
                lazy.detect();
             }).on("resize.oxlazy", function (d) {
                lazy.detect();
             });    

	       },detect:function(){
	       	var newitems = [];
	       	for (var i = 0; i < this.cnt; i++) {
	       	    if (!lazy.rock(this.items[i])) {
                    newitems.push(this.items[i]);
                }
	       	};
            this.items = newitems;
            this.cnt = this.items.length
	       },isInView:function(data){
             var data_=$(data);
             var offset=data_.offset();
             var top=offset.top-win.scrollTop();
             var height= win.height();
             var height_= -(data_.height());

             if ((top< height_) || (top >= height)) {
                return false;
             }
             return data_;
	       },rock:function(data){
	       	 var h = data.getAttribute(this.flag);
	       	 if ((!h) || (h === "")) {
                return false;
             }
             var f = this.isInView(data);
             if (!f) {
                return false;
             }

             var ifimg=data.tagName=== "IMG";
             var ififrame=data.tagName=== "IFRAME";
             var g = data.getAttribute(this.flag + "-timestamp") === "1"
             var d = g ? ("?t=" + this.getTimeStamp()) : "";
             h = h + d;

             if (ifimg || ififrame) {
                data.setAttribute("src", h);
             } else {
                f.css("background-image", "url(" + h + ")");
             }
             data.removeAttribute(this.flag);
             return true
	       },getTimeStamp: function () {
            var d = new Date();
            return(d.getFullYear() + "" + d.getMonth() + "" + d.getDate());
          }}

       $(function(){
     
       	 lazy.init();
       	 lazy.detect();

       })
});