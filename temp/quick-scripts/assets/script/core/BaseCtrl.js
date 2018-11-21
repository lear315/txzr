(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/core/BaseCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1e8d3gNF/RMuKWaE26cCMld', 'BaseCtrl', __filename);
// script/core/BaseCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 视图控制基类
 */
var BaseComponent_1 = require("./BaseComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BaseCtrl = /** @class */ (function (_super) {
    __extends(BaseCtrl, _super);
    function BaseCtrl() {
        return _super.call(this) || this;
    }
    BaseCtrl = __decorate([
        ccclass
    ], BaseCtrl);
    return BaseCtrl;
}(BaseComponent_1.default));
exports.default = BaseCtrl;

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
        //# sourceMappingURL=BaseCtrl.js.map
        