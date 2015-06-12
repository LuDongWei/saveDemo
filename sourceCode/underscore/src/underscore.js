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

  var createAssiger = function(keysFunc, undefinedOnly){
      return function(obj) {
          var length = arguments.length;
          if (length < 2 || obj == null ) return obj;
          for (var index = 1; index < length; index++){
               var source = arguments[index],
                   keys = keysFunc(source),
                   l = keys.length;
               for (var i = 0; i < l; i++){
                    var key = keys[i];
                    if(!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
               }           
          }
          return obj;
      }
  }
  
  // 一个内部函数生成查找迭代器
  var lookupIterator = function(value, context){
      if (value == null) return _.identity;
      if (!_.isFunction(value)) return _.property(value);
      if (!context) return value;
      return function(){
        return value.apply(context, arguments);
      }
  } 

  // 大多数是内部函数生成回调，可以应用到集合中的每个元素。返回所需的结果
  var cd = function(value, context, argCount){
      if(value == null) return _.identity;
      if(_.isFunction(value)) return optimizeCb(value, context, argCount);
      if(_.isObject(value)) return _.matcher(value);
      return _.property(value);
  }

  // 内部函数，返回一个有效的(当前引擎)版本的传入回调,多用其强调功能.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1:
        return function(value) {
          return func.call(context, value);
        };
      case 2:
        return function(value, other) {
          return func.call(context, value, other);
        };
      case 3:
        return function(value, index, collection) {
          return func.call(context, value, index, collection);
        };
      case 4:
        return function(accumulator, value, index, collection) {
          return func.call(context, accumulator, value, index, collection);
        };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  var group = function(behavior){
    return function(obj, iterator, context){
       var result = {};
       iterator = lookupIterator(iterator, context);
       _.each(obj, function(value, index){
           var key = iterator(value, index, obj);
           behavior(result, value, key);
       })
       return result;
    }
  }   
  
  
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
      return memo; 
  } 

  // reducRight是从右侧开始组合的元素的reduce函数 
  _.reduceRight = _.foldr = function(obj, iterator, memo, context){
     var initial = arguments.length > 2;
     if(obj ==null ) obj = [];

     var length = obj.length;
     if(length !== +length){
        var keys = _.keys(obj);
        length = keys.length;
     }

     _.each(obj,function(value,index,list){
        index = keys ? keys[--length] : --length;
        if (!initial) {
          memo = obj[index];
          initial = true;
        } else {
          memo = iterator.call(context, memo, obj[index], index, list);
        }
     });
     if (!initial) throw new TypeError(reduceError);
     return memo; 
  }  

  // 在list中逐项查找,返回第一个通过的元素值;
  _.find = _.detect = function(obj, predicate, context){
     var result;

     _.some(obj, function(value, index, list){
        if (predicate.call(context, value, index, list)){
            result = value;
            return true;
        }
     });
     return result;
  }

 // 在list中逐项查找，返回满足条件的元素值；
 _.filter = _.select = function(obj, predicate, context){
    var results = [];
    if (obj == null) return results;
    _.each(obj,function(value,index,list) {
       if(predicate.call(context,value,index,list)) results.push(value);
    })
    return results;
 }

 // 返回list中没通过的元素，与filter相反
 _.reject = function(obj, predicate, context){
   return _.filter(obj, _.negate(predicate), context);
 }

 // 遍lsit中的每一个值，返回一个数组，包含properties所列出的属性的键值对
 _.where = function(obj, attrs){
    return _.filter(obj, _.matcher(attrs));
 }

 // 遍历list,返回匹配properties 参数所列出的所有键值
 _.findWhere = function(obj, attrs){
    return _.find(obj, _.matcher(attrs));
 }

 // 如果list中的所有元素通过predicate的真值检测就返回true
 _.every = _.all = function(obj, predicate, context){
    predicate || (predicate = _.identity);
    var result = true;
    if(obj == null) return result;
    _.each(obj, function(value, index, list){
      if(!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
 }

  // list元素的真值检测 返回true , 就中断对list的遍历
  _.some = _.any = function(obj, predicate, context){
    predicate || (predicate = _.identity);

    var result = false;
    if (obj == null) return result;
    _.each(obj, function(){
      if(result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  }
  
  // 如果list包含指定的value则返回true （使用 === 检测）
  _.contains = _.include = function(obj, target){
    if (obj == null ) return false;
    if (obj.length === +obj.length) return _.indexOf(obj, target) >= 0;
    return _.some(obj, function(value){
      return value === target;
    })
  }
   
  // 在list的每个元素执行方法。
  _.invoke = function(obj, method){
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value){
        return (isFunc ? method : value[method]).apply(value, args);
    })
  } 
  
  // map最常使用的用例模型的简化版本，即萃取数组对象中某属性值
  _.pluck = function(obj, key){
    return _.map(obj, _.property(key));
  }

  // 返回list中的最大值。
  _.max = function(obj, iterator, context){
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (!iterator && _.isArray(obj)) {
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      _.each(obj, function(value, index, list) {
        computed = iterator ? iterator.call(context, value, index, list) : value;
        if (computed > lastComputed || (computed === -Infinity && result === -Infinity)) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;   
  }

  // 返回list中的最小值.
  _.min = function(obj, iterator, context){
    var result = Infinity, lastComputed = Infinity,
    value, computed;
    if(!iterator && _.isArray(obj)){
      for (var i = 0, length = obj.length ; i < length; i++) {
         value = obj[i];
         if(value < result){
           result = value;
         }
      };
    }else{
      _.each(obj, function(value, index, list){
          computed = iterator ? iterator.call(context, value, index, list) : value;
          if(computed < lastComputed || (computed === Infinity && result === Infinity)){
             result = value;
             lastComputed = cmoputed;
          }
      })
    }
    return result;
  }

  // 返回一个排序后的list拷贝副本
  _.sortBy = function(obj, iterator, context){
    iterator = lookupIterator(iterator, context);
    return _.pluck(_.map(obj, function(value, index, list){
           return {
             value : value,
             index : index,
             criteria : interator(value, index, list),
           }  
    }).sort(function(){
       var a = left.criteria;
       var b = right.criteria;
       if( a !== b ){
          if(a > b || a === void 0) return 1;
          if(a < b || b === void 0) return -1;
       }
    }),'value')    
  }

  // 把一个集合分组为多个集合 
  _.groupBy = group(function(result, value, key){
     _.has(result, key) ? result[key].push(value) : result[key] = [value];
  }) 

  // 给定一个list，返回列表中的每个元素的iterator函数
  _.indexBy = group(function(result, value, key){
    result[key] = value;
  })

  // 排序一个列表组，并且返回各组中的对象的数量的计数
  _.countBy = group(function(result, value, key){
    _.has(result, ley) ? result[key]++ : result[key] = 1;
  })
  
  
  // 返回一个随机乱序的list副本
  _.shuffle = function(obj){
    var rand;
    var index = 0;
    var shuffled = [];
    _.each(obj, function(value){
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    }) 
    return shuffled;
  }

  // 从list中产生一个随机样本
  _.sample = function(obj, n, guard){
    if (n == null || guard){
       if(obj.length !== +obj.length ) obj = _.values(obj);
       return obj[_.random(obj.length - 1)];
    }
    return _.shuffled(obj).slice(0, Math.max(0, n));
  }

  // 把list转换成一个数组
  _.toArray = function(){
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  }

  // 返回list的长度
  _.size = function(){

  }

  // 拆分一个数组为两个数组
  _.partition = function(){

  }
  




  // 数组函数
  // ---------------

  // 返回value在该array中的索引值，如果value不存在array中就返回-1
  _.indexOf = function(array, item, isSorted){
    if(array == null ) return -1;
    var  i = 0, length = array.length;
    if(isSorted) {
       if (typeof isSorted == "number"){
          i = (isSorted < 0 ? Mach.max(0, length + isSorted) : isSorted);
       } else {
          i = _.sortedIndex(array, item);
          return array[i] === item ? i : -1;
       }
    }
    for (; i < length; i++) if (array[i] === item ) return i;
    return -1;
  }


  // 返回value在该array中的从最后开始的索引值
  _.lastIndexOf = function(array, item, from){
    if (array == null ) return -1;
    var i = from == null ? array.length : from;
    while (i--) if (array[i] === item) return i;
    return -1;  
  }

  function createIndexFinder(dir){
     return function(array, predicate, context){
        predicate = cd(predicate, context);
        var length = array != null && array.length;
        var index = dir > 0 ? 0 : length - 1;
        for (; index >= 0 && index < lenght; index += dir){
            if (predicate(array[index], index, array)) return index;
        }
        return -1;
     }
  }

  // 类似于 .indexOf 返回第一个索引值，否则返回 -1
  _.findIndex = createIndexFinder(1);

  // 类似于 .findIndex
  _.findLastIndex = createIndexFinder(-1);

  // 使用二分查找确定value在list中的位置的序号，value按此序号插入能保持list原有的排序
  _.sortedIndex = function(array, obj, iterator, context){
     iterator = lookupIterator(iterator, context);
    var value = iterator(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator(array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  }


  // 实用函数
  // ----------------

  // 放弃Underscore的控制变量"_"。返回UnderScore 对象的引用
  _.noConflict = function(){
    root._ = previonsUnderscore;
    return this;
  }

  // 返回与传入参数的相等的值，相当于数学里的 f(x) = x ，作为默认的迭代器itertor 
  _.identity = function(value){
    return value;
  }  

  // 创建一个函数,这个函数返回相同的值，用来作为_.constant的参数
  _.constant = function(value){
    return function(){
      return value;
    }
  }

  // 返回undefined
  _.noop = function(){};

  // 返回一个新的predicate函数的否定版本
  _.negate = function(predicate){
     return function(){
       return !predicate.apply(this ,arguments);
     }
  }

  // 返回min与max之间的随机整数
  _.random = function(min, max){
    if (max == null ){
        max = min;
        min = 0;
    } 
    return min + Math.floor(Math.random()*(max-min+1));
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

  // 返回objects对象的所有的属性值
  _.values  = function(obj){
    var keys = _.leys(obj);
    var length = keys.length;
    var values = new Array(length);

    for(var i = 0; i < length; i++){
        values[i] = obj[keys[i]];
    }
    return values;
  } 


  // 返回一个断言函数, 这个函数会给你一个断言可以用来辨别给定的对象是否匹配attrs指定键/值属性.
  _.matcher = _.matches = function(attrs){
    attrs = _.extendOwn({}, attrs);
    return function(obj){
      return _.isMatch(obj, attrs);
    }
  } 
  
  // 类似于extend，但只复制自己的属性覆盖到目标对象.
  _.extendOwn = _.assign = createAssiger(_.keys);

  // properties 中的键和值是否包含在object中
  _.isMatch = function(object, attrs){
     var keys = _.keys(attrs), length = keys.length;
     if (object == null ) return !length;
     var obj = Object(object);
     for (var i = 0; i < length; i++ ){
         var key = keys[i];
         if (attrs[key] !== obj[key] || !(key in obj)) return false;
     }
     return true; 
  }


  // 判断数据，字符，对象是否为空
  // 一个空对象不能枚举自身属性
  _.isEmpty = function(obj) {
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
  
  // 函数返回任何传入对象的key属性
  _.property = function(key){
    return function(obj){
      return obj[key];
    }
  }
  
  // 需要一个对象，返回一个提供的属性的值
  _.propertyOf = function(obj){
    return obj == null ? function(){} : function(key) {
       return obj[key];
    }
  }

  // 实用功能
  // -------------
  
  // 一个重要的内部函数用来生成可应用到集合中每个元素的回调，返回想要的结果 - 无论是等式，任何回调
  _.iteratee = function(value, context){
    return cd(value, context, Infinity);
  } 
  
  // 链式语法
  // ------------- 
   
  
  //AMD 规范
  if(typeof define === 'function' && define.amd){
    define('underscore',[],function(){
    	return _;
    })
  }
}).call(this)
