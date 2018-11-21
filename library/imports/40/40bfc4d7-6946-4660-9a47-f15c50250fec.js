"use strict";
cc._RF.push(module, '40bfcTXaUZGYJpH8VxQJQ/s', 'KeyBoardControlCmp');
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