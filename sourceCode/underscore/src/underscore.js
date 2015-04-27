// 学习 underscore.js 2015-4-24

(function(){
  
  //创建全局对象   
  var root = this;
  
  //创建之前的_
  var previonsUnderscore = root._;
  
  //创建一个空对象常量，便于内部共享使用
  var breaker = {};

  //将内置对象的原型链接缓存在局部变量
  var ArrayProto = Array.prototype,
      ObjProto = Object.prototype,
      FuncProto = Function.prototype;

  var push = ArrayProto.push,
      slice = ArrayProto.slice,
      concat = ArrayProto.concat,
      toString = ObjProto.toString,
      hasOwnProperty = ObjProto.hasOwnProperty;    
  
  var nativeIsArray = Array.isArray,
      nativeKeys = Object.keys,
      nativeBind = FuncProto.bind;

  //创建
  var _ = function(obj){
  	  if(obj instanceof _){
  	  	 return obj;
  	  }
  	  if(!(this instanceof _)){
  	  	 return new _(obj);
  	  }
  	  this.wrapped = obj;
  }

  //针对不同的宿主环境，将undersocre的命名变量放在不同的对象中.
  if (typeof exports !== 'undefined'){
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = _;	
    }
    exports._ = _;
  } else {
    root._ = _;
  }


  _.VERSION = '1.6.0';

  
  // 集合方法
  // ----------------

  // 集合函数能在数组，对象，和类数组对象上正常工作;
  // 每次调用iteratee 都会传递三个参数 (element,index,list)
  // 如果list是对象,参数是 (value,key,list)
  _.each = _.forEach = function(obj, iterator, context){
  	if(obj == null) return obj;
  	if(obj.length === +obj.length){
      for (var i = 0, length = obj.length; i < length; i++) {
      	if (iterator.call(context, obj[i], i,obj) === breaker) return ; 
      };
  	}else{
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length ; i++) {
      	if(iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      };
  	}
    return obj 
  } 

  // 通过转换函数(iteratee)映射列表中的每个值产生新数组
  _.map = _.collect = function(obj, iterator, context){
    var results = [];
    if (obj == null ) return results;
    _.each(obj,function(value, index, list){
        results.push(iterator.call(context, value, index, list));
    });
    return results;
  }
   
  var reduceError = 'Reduce of empty array with no initial value'; //初始值为空
  // reduce方法把list中元素归结为一个单独的数值 
  _.reduce = _.foldl = _.inject = function(obj, interator, memo, context){
      var initial = arguments.length > 2;
      if (obj ==null) obj = [];
      _.each(obj,function(value, index, list){
          if(!initial) {
            memo = value;
            initial = true;
          } else {
            memo = interator.call(context, memo, value, index, list);
          } 
      });
      if (!initial ) throw new TypeError(reduceError);
      return meno; 
  }  
  

  // 对象方法
  // ----------------

  // 检索object拥有的所有可枚举属性的名称
  _.keys = function(obj){
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj){
    	if( _.has(obj, key)){
    		keys.push(key);
    	}
    }
    return keys;
  };
  

  //判断数据，字符，对象是否为空
  //一个空对象不能枚举自身属性
  _.isEmpty = function(obj) {
    console.log(obj)
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) {
      if (_.has(obj, key)) {
        return false;
      }
    }
    return true;
  }

  // 判断是否 Dom 元素 ？
  _.isElement = function(obj){
    return !!(obj && obj.nodeType === 1)
  }

  // 判断是否是对象 ？
  _.isObject = function(obj){
    return obj === Object(obj);
  };

  // 判断是否是数组
  // ECMA5 Array.isArray
  _.isArray = nativeIsArray || function (obj) {
    return toString.call(obj) == '[object Array]';   
  }

  // 判断 是否参数 是否方法 是否字符串 是否数字 是否日期 是否正则
  _.each(['Arguments','Function','String','Number','Date','RegExp'],function(name){
      _['is'+name] = function(obj){
        return toString.call(obj) == '[object '+name+']';
      }
  });


  // 是否是有限的数字（inf）
  _.isFinite = function(obj){
    return isFinite(obj) && !isNaN(parseFloat(obj)); 
  }

  // 如果object是NaN，返回true。
  // 原生的isNaN 如果变量是undefined，原生会返回为true
  _.isNaN = function(obj){
    return _.isNamber(obj) && obj != +obj;
  }

  // 是否是布尔型
  _.isBoolean = function(obj){
    return obj === true || obj ===false || toString.call(obj) == '[object Boolean]';
  }
  
  // 是否 null
  _.isNull = function(obj){
    return obj === null; 
  } 

  // 是否undefined
  _.isUnderFined = function(obj){
    return obj === void 0; 
  } 

  // 对象是否含有给定的键
  _.has = function(obj, key){
    return hasOwnProperty.call(onj, key);
  }



  // 实用函数
  // -------------------



  
  //AMD 规范
  if(typeof define === 'function' && define.amd){
    define('underscore',[],function(){
    	return _;
    })
  }
}).call(this)
