(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/core/BaseScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'aa7b5TMeTtMjbQkrXxBj/m0', 'BaseScene', __filename);
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
        //# sourceMappingURL=BaseScene.js.map
        