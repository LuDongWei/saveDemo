define( function(require, exports, module) {
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
            buffer += "\r\n       <li data-apId=";
            if (stack1 = helpers.apId) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.apId;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + ' >\r\n          <div class="seckill-item">\r\n             <div class="s-time">\r\n             </div>\r\n             ';
            options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(2, program2, data),
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
            buffer += " \r\n            ";
            stack1 = helpers["if"].call(depth0, depth0.isSeckill, {
                hash: {},
                inverse: self.program(7, program7, data),
                fn: self.program(5, program5, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "      \r\n            ";
            stack1 = helpers["if"].call(depth0, depth0.isOverdue, {
                hash: {},
                inverse: self.noop,
                fn: self.program(9, program9, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "\r\n             \r\n            ";
            stack1 = helpers["if"].call(depth0, depth0.isSeckill, {
                hash: {},
                inverse: self.program(17, program17, data),
                fn: self.program(11, program11, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += " \r\n          </div>\r\n        </li> \r\n     ";
            return buffer;
        }
        function program2(depth0, data) {
            var buffer = "", stack1;
            buffer += '      \r\n             <div class="s-pic">\r\n                   <span>还剩';
            if (stack1 = helpers.stock) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.stock;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '</span>\r\n                   <a href="http://www.mbaobao.com/item/';
            if (stack1 = helpers.sku) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.sku;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '" target="_blank"><img src=';
            if (stack1 = helpers.image) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.image;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + " alt=";
            if (stack1 = helpers.name) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.name;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + ' /></a>\r\n             </div>\r\n             <div class="s-content">\r\n                <div class="s-inf">\r\n                    <p class="shoppeP"><del>市场价￥';
            if (stack1 = helpers.shoppePrice) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.shoppePrice;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '</del></p>\r\n                    <p class="sellP">秒杀价<span>￥</span><span>';
            if (stack1 = helpers.sellPrice) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.sellPrice;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '</span></p> \r\n                </div>\r\n                <div class="s-buy">\r\n                    <span class="s-but">\r\n                        <i></i> \r\n                        <a href="http://cart.mbaobao.com/do/items/add/';
            if (stack1 = helpers.sku) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.sku;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '/1.html" target="_blank">秒</a>\r\n                    </span> \r\n                </div>           \r\n            </div>\r\n                ';
            stack1 = helpers["if"].call(depth0, depth0.isSellOut, {
                hash: {},
                inverse: self.noop,
                fn: self.program(3, program3, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "\r\n            ";
            return buffer;
        }
        function program3(depth0, data) {
            return '\r\n                  <div class="no-stockQty">\r\n                       已经抢购完\r\n                  </div>\r\n                ';
        }
        function program5(depth0, data) {
            return '    \r\n                <div class="have-begin">\r\n                     秒杀开始\r\n                </div>\r\n                ';
        }
        function program7(depth0, data) {
            return '\r\n                <div class="no-begin">\r\n                     未开始 \r\n                </div>\r\n            ';
        }
        function program9(depth0, data) {
            return '\r\n                <div class="no-stockQty">\r\n                     已经过期\r\n                </div>\r\n            ';
        }
        function program11(depth0, data) {
            var buffer = "", stack1, options;
            buffer += "\r\n                   ";
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
            buffer += "    \r\n               ";
            return buffer;
        }
        function program12(depth0, data) {
            var buffer = "", stack1;
            buffer += "\r\n                   ";
            stack1 = helpers["if"].call(depth0, depth0.isSellOut, {
                hash: {},
                inverse: self.program(15, program15, data),
                fn: self.program(13, program13, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "\r\n                   ";
            return buffer;
        }
        function program13(depth0, data) {
            return "\r\n                     ";
        }
        function program15(depth0, data) {
            return "\r\n                   ";
        }
        function program17(depth0, data) {
            var buffer = "", stack1;
            buffer += "\r\n                   ";
            stack1 = helpers["if"].call(depth0, depth0.isOverdue, {
                hash: {},
                inverse: self.program(15, program15, data),
                fn: self.program(18, program18, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += "  \r\n            ";
            return buffer;
        }
        function program18(depth0, data) {
            return " \r\n                     ";
        }
        buffer += '<ul class="mbbSeckill">\r\n     ';
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
        buffer += "\r\n </ul>";
        return buffer;
    });
});