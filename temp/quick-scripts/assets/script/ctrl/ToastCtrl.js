(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/ctrl/ToastCtrl.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '68abcCUdllNwpixRzw3YL81', 'ToastCtrl', __filename);
// script/ctrl/ToastCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 英雄控制
 */
var BaseCtrl_1 = require("../core/BaseCtrl");
var AutoBind_1 = require("../core/decorator/AutoBind");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ToastCtrl = /** @class */ (function (_super) {
    __extends(ToastCtrl, _super);
    function ToastCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.showTime = 0.5;
        return _this;
    }
    ToastCtrl.prototype.onLoad = function () {
    };
    ToastCtrl.prototype.show = function (content) {
        if (Array.isArray(content)) {
            var showContent = content.join('\n');
            this.tipLabel.string = showContent;
        }
        else {
            this.tipLabel.string = content;
        }
        this.action();
    };
    ToastCtrl.prototype.action = function () {
        var _this = this;
        this.node.runAction(cc.spawn(cc.moveBy(1, cc.v2(0, 100)), cc.sequence(cc.fadeIn(0.25), cc.delayTime(this.showTime), cc.fadeOut(0.25), cc.callFunc(function () { _this.removeIt(); }))));
    };
    ToastCtrl.prototype.removeIt = function () {
        this.node.removeFromParent();
    };
    __decorate([
        AutoBind_1.autoBind(cc.Label)
    ], ToastCtrl.prototype, "tipLabel", void 0);
    ToastCtrl = __decorate([
        ccclass
    ], ToastCtrl);
    return ToastCtrl;
}(BaseCtrl_1.default));
exports.default = ToastCtrl;

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
        //# sourceMappingURL=ToastCtrl.js.map
        