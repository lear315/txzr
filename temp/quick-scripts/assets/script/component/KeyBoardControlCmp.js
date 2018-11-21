(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/component/KeyBoardControlCmp.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '40bfcTXaUZGYJpH8VxQJQ/s', 'KeyBoardControlCmp', __filename);
// script/component/KeyBoardControlCmp.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 游戏摇杆
 */
var BaseComponent_1 = require("../core/BaseComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var KeyBoardControlCmp = /** @class */ (function (_super) {
    __extends(KeyBoardControlCmp, _super);
    function KeyBoardControlCmp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KeyBoardControlCmp = __decorate([
        ccclass
    ], KeyBoardControlCmp);
    return KeyBoardControlCmp;
}(BaseComponent_1.default));
exports.default = KeyBoardControlCmp;

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
        //# sourceMappingURL=KeyBoardControlCmp.js.map
        