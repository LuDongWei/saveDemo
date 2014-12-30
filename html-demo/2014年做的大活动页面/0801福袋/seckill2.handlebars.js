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
        var stack1, options, functionType = "function", escapeExpression = this.escapeExpression, self = this, blockHelperMissing = helpers.blockHelperMissing;
        function program1(depth0, data) {
            var buffer = "", stack1, options;
            buffer += '\r\n<div class="be-itme" data-ap="';
            if (stack1 = helpers.apId) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.apId;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '">\r\n      <div class="b-head">\r\n          限量 <strong>20</strong>\r\n          个\r\n      </div>\r\n      <div class="b-pic">\r\n          ';
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
            buffer += ' \r\n          <div class="b-time">\r\n              <span class="clock">\r\n                  <img src="http://cca.mbaobao.com/mkts/201406/05/mm/ms_03.jpg" width="15" height="15" />\r\n                  ';
            stack1 = helpers["if"].call(depth0, depth0.isSeckill, {
                hash: {},
                inverse: self.program(6, program6, data),
                fn: self.program(4, program4, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += '\r\n              </span>\r\n              <span class="countdown">\r\n                  <span class="h">00</span>\r\n                  <span class="m">00</span>\r\n                  <span class="s">00</span>\r\n              </span>\r\n              ';
            stack1 = helpers["if"].call(depth0, depth0.isSeckill, {
                hash: {},
                inverse: self.program(10, program10, data),
                fn: self.program(8, program8, data),
                data: data
            });
            if (stack1 || stack1 === 0) {
                buffer += stack1;
            }
            buffer += '\r\n          </div>\r\n      </div>\r\n      <div class="b-inf">\r\n          ';
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
            buffer += '\r\n          <div class="go"> <i></i>\r\n              ';
            options = {
                hash: {},
                inverse: self.noop,
                fn: self.program(14, program14, data),
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
            buffer += "\r\n          </div>\r\n      </div>\r\n  </div>\r\n  ";
            return buffer;
        }
        function program2(depth0, data) {
            var buffer = "", stack1;
            buffer += '  \r\n          <a href="http://www.mbaobao.com/item/';
            if (stack1 = helpers.sku) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.sku;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '" target="_blank">\r\n              <img src="';
            if (stack1 = helpers.image) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.image;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '" width="298px" height="263px">\r\n          </a>\r\n          ';
            return buffer;
        }
        function program4(depth0, data) {
            return "\r\n                    &nbsp;剩&nbsp;\r\n                  ";
        }
        function program6(depth0, data) {
            return "\r\n                    &nbsp;距开始&nbsp;\r\n                  ";
        }
        function program8(depth0, data) {
            return '\r\n              <span class="over">&nbsp;结束</span>\r\n              ';
        }
        function program10(depth0, data) {
            return "\r\n              ";
        }
        function program12(depth0, data) {
            var buffer = "", stack1;
            buffer += '\r\n          <div class="price-1">\r\n              <p class="p-1"> <del>麦包价';
            if (stack1 = helpers.mbbPrice) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.mbbPrice;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '元</del>\r\n              </p>\r\n              <p class="p-2"> <strong>秒杀价￥</strong>\r\n              </p>\r\n          </div>\r\n          <div class="price-2">\r\n              <p>';
            if (stack1 = helpers.sellPrice) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.sellPrice;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '</p>\r\n          </div>\r\n          <div class="discount">\r\n              <p>4.8折</p>\r\n          </div>\r\n          ';
            return buffer;
        }
        function program14(depth0, data) {
            var buffer = "", stack1;
            buffer += '\r\n              <a href="http://cart.mbaobao.com/do/items/add/';
            if (stack1 = helpers.sku) {
                stack1 = stack1.call(depth0, {
                    hash: {},
                    data: data
                });
            } else {
                stack1 = depth0.sku;
                stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
            }
            buffer += escapeExpression(stack1) + '/1.html" target="_blank" title="">\r\n                  <span>\r\n                      立即\r\n                      <br>抢购</span>\r\n                  <div class="right"></div>\r\n              </a>\r\n              ';
            return buffer;
        }
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
            return stack1;
        } else {
            return "";
        }
    });
});