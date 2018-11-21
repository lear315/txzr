"use strict";
cc._RF.push(module, 'aa7b5TMeTtMjbQkrXxBj/m0', 'BaseScene');
// script/core/BaseScene.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 场景基类
 */
var BaseComponent_1 = require("./BaseComponent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BaseScene = /** @class */ (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        return _super.call(this) || this;
    }
    BaseScene.prototype.onLoad = function () {
    };
    BaseScene = __decorate([
        ccclass
    ], BaseScene);
    return BaseScene;
}(BaseComponent_1.default));
exports.default = BaseScene;

cc._RF.pop();