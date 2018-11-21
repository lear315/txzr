(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/core/tool/LCGRandom.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '44e7dOhP8JDNbtUGJQTp5iV', 'LCGRandom', __filename);
// script/core/tool/LCGRandom.ts

/**
 * 线性同余随机发生器
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * I n+1=aI n+c(mod m)生成的伪随机数序列最大周期m，范围在0到m-1之间.Hull-Dobell定理:
 * 1.c与m互质
 * 2.a - 1可以被m的所有质因数整除
 * 3.如果m是4的倍数，a - 1也必须是4的倍数
 * a=9301, c = 49297, m = 233280这组参数满足
 */
var LCGRandom = /** @class */ (function () {
    function LCGRandom() {
        this.lcgRandomSeed = 1;
    }
    LCGRandom.prototype.setLcgSeed = function (seed) {
        this.lcgRandomSeed = seed;
    };
    LCGRandom.prototype.lcgRandom = function (min, max) {
        min = min || 0;
        max = max || 1;
        this.lcgRandomSeed = (this.lcgRandomSeed * 9301 + 49297) % 233280;
        var rnd = this.lcgRandomSeed / 233280.0;
        return min + rnd * (max - min);
    };
    LCGRandom.prototype.lcgRandomInt = function (min, max) {
        min = min || 0;
        max = max || 1;
        this.lcgRandomSeed = (this.lcgRandomSeed * 9301 + 49297) % 233280;
        var rnd = this.lcgRandomSeed / 233280.0;
        return min + Math.floor(rnd * (max - min + 1));
    };
    return LCGRandom;
}());
exports.default = LCGRandom;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=LCGRandom.js.map
        