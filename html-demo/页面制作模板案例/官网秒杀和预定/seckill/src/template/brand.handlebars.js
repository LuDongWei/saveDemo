define(function(require, exports, module) {
    var Handlebars = require("gallery/handlebars/1.0.0/handlebars");
    var template = Handlebars.template;
    module.exports = template(function(Handlebars, depth0, helpers, partials, data) {
        this.compilerInfo = [ 3, ">= 1.0.0-rc.4" ];
        helpers = helpers || {};
        for (var key in Handlebars.helpers) {
            helpers[key] = helpers[key] || Handlebars.helpers[key];
        }
        data = data || {};
        var buffer = "", stack1, options, functionType = "function", escapeExpression = this.escapeExpression, self = this, blockHelperMissing = helpers.blockHelperMissing;
        function program1(depth0, data) {
            var buffer = "", stack1, options;
            buffer += '\r\n        <div class="head">\r\n            <img src="http://cca.mbaobao.com/mkts/201406/05/mm/ms.png" width="316" height="51" />\r\n        </div>\r\n        <div class="br-seckill" data-ap="';
            if (stack1 = helpers.apId) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.apId;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '"  data-begin="';
            if (stack1 = helpers.beginTime) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.beginTime;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '" >\r\n           <div class="br-time">\r\n             ';
            stack1 = helpers["if"].call(depth0, depth0.isSeckill, {
                hash: {},
                inverse: self.program(4, program4, data),
                fn: self.program(2, program2, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += '   \r\n                <span class="countdown"> \r\n                    <span class="h">00</span>\r\n                    <span class="m">00</span>\r\n                    <span class="s">00</span>\r\n           </span>\r\n           ';
            stack1 = helpers["if"].call(depth0, depth0.isSeckill, {
                hash: {},
                inverse: self.program(8, program8, data),
                fn: self.program(6, program6, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "\r\n           </div>\r\n           ";
            options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(10, program10, data),
                data: data
            };
            if (stack1 = helpers.skus) {
                stack1 = stack1.call(depth0, options);
            } else {
                stack1 = depth0.skus;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            if (!helpers.skus) {
                stack1 = blockHelperMissing.call(depth0, stack1, options);
            }
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += '\r\n\r\n           <div class="br-inf">\r\n                ';
            options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(12, program12, data),
                data: data
            };
            if (stack1 = helpers.skus) {
                stack1 = stack1.call(depth0, options);
            } else {
                stack1 = depth0.skus;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            if (!helpers.skus) {
                stack1 = blockHelperMissing.call(depth0, stack1, options);
            }
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "\r\n                ";
            stack1 = helpers["if"].call(depth0, depth0.isSeckill, {
                hash: {},
                inverse: self.program(17, program17, data),
                fn: self.program(14, program14, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "\r\n            </div>\r\n          </div> \r\n             \r\n             ";
            options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(20, program20, data),
                data: data
            };
            if (stack1 = helpers.skus) {
                stack1 = stack1.call(depth0, options);
            } else {
                stack1 = depth0.skus;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            if (!helpers.skus) {
                stack1 = blockHelperMissing.call(depth0, stack1, options);
            }
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "\r\n     ";
            return buffer;
        }
        function program2(depth0, data) {
            return '  \r\n                <span class="clock">\r\n                    <img src="http://cca.mbaobao.com/mkts/201406/05/mm/ms_03.jpg" width="15" height="15" />&nbsp;\r\n                    剩&nbsp; \r\n                </span>\r\n             ';
        }
        function program4(depth0, data) {
            return '\r\n                <span class="clock">\r\n                    <img src="http://cca.mbaobao.com/mkts/201406/05/mm/ms_03.jpg" width="15" height="15" />&nbsp;\r\n                    距开始&nbsp; \r\n                </span>\r\n             ';
        }
        function program6(depth0, data) {
            return ' \r\n             <span class="over">\r\n                   &nbsp;结束\r\n                </span>\r\n            ';
        }
        function program8(depth0, data) {
            return "\r\n           ";
        }
        function program10(depth0, data) {
            var buffer = "", stack1;
            buffer += ' \r\n           <div class="br-pic">\r\n                <a href="http://www.mbaobao.com/item/';
            if (stack1 = helpers.sku) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.sku;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '" target="_blank">\r\n                    <img src="';
            if (stack1 = helpers.image) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.image;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '" width="254" height="254" />\r\n                </a>\r\n            </div>\r\n           ';
            return buffer;
        }
        function program12(depth0, data) {
            var buffer = "", stack1;
            buffer += ' \r\n                <div class="in-price-1">\r\n                    <p class="mbbP"><del>麦包价';
            if (stack1 = helpers.mbbPrice) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.mbbPrice;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '元</del>\r\n                    </p>\r\n                    <p class="sellP">秒杀价:</p>\r\n                </div>\r\n                <div class="in-price-2">\r\n                    <p class="sellP-2">\r\n                        ';
            if (stack1 = helpers.sellPrice) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.sellPrice;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + "<span>元</span>\r\n                    </p>\r\n                </div>\r\n                ";
            return buffer;
        }
        function program14(depth0, data) {
            var buffer = "", stack1, options;
            buffer += "\r\n                   ";
            options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(15, program15, data),
                data: data
            };
            if (stack1 = helpers.skus) {
                stack1 = stack1.call(depth0, options);
            } else {
                stack1 = depth0.skus;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            if (!helpers.skus) {
                stack1 = blockHelperMissing.call(depth0, stack1, options);
            }
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "\r\n                   ";
            return buffer;
        }
        function program15(depth0, data) {
            var buffer = "", stack1;
            buffer += ' \r\n                   <div class="in-a">\r\n                    <a href="http://cart.mbaobao.com/do/items/add/';
            if (stack1 = helpers.sku) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.sku;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '/1.html" target="_blank">\r\n                        <img src="http://cca.mbaobao.com/mkts/201406/05/mm/ms_01.png" width="95" height="59" />\r\n                    </a>\r\n                   </div>\r\n                    ';
            return buffer;
        }
        function program17(depth0, data) {
            var buffer = "", stack1, options;
            buffer += "\r\n                  ";
            options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(18, program18, data),
                data: data
            };
            if (stack1 = helpers.skus) {
                stack1 = stack1.call(depth0, options);
            } else {
                stack1 = depth0.skus;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            if (!helpers.skus) {
                stack1 = blockHelperMissing.call(depth0, stack1, options);
            }
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "\r\n                ";
            return buffer;
        }
        function program18(depth0, data) {
            return '\r\n                  <div class="in-a">\r\n                        <img src="http://cca.mbaobao.com/mkts/201406/05/mm/jj.png" width="95" height="59" />\r\n                   </div>\r\n                  ';
        }
        function program20(depth0, data) {
            var buffer = "", stack1;
            buffer += "  \r\n             ";
            stack1 = helpers["if"].call(depth0, depth0.isSellOut, {
                hash: {},
                inverse: self.noop,
                fn: self.program(21, program21, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "\r\n             ";
            return buffer;
        }
        function program21(depth0, data) {
            return '\r\n                <div class="stoleOut">\r\n                   <div class="masking">\r\n                   </div>\r\n                   <div class="text">                     \r\n                   已抢完\r\n                   </div> \r\n                 </div> \r\n             ';
        }
        buffer += " ";
        options = {
            hash: {},
            inverse: self.noop,
            fn: self.program(1, program1, data),
            data: data
        };
        if (stack1 = helpers.seckill) {
            stack1 = stack1.call(depth0, options);
        } else {
            stack1 = depth0.seckill;
            stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
        }
        if (!helpers.seckill) {
            stack1 = blockHelperMissing.call(depth0, stack1, options);
        }
        if (stack1 || stack1 === 0) {
            buffer += stack1;
        }
        buffer += " ";
        return buffer;
    });
});