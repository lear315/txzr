"use strict";
cc._RF.push(module, '2222fAzIghIcYqxMGL2+mnl', 'LanchScene');
// script/scene/LanchScene.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 登录场景
 */
var BaseScene_1 = require("../core/BaseScene");
var AutoBind_1 = require("../core/decorator/AutoBind");
var GameManager_1 = require("../GameManager");
var I18nManager_1 = require("../core/I18nManager");
var Utils_1 = require("../util/Utils");
var GameConfig_1 = require("../GameConfig");
var MsgDefine_1 = require("../net/MsgDefine");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HomeScene = /** @class */ (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 预加载
        _this.preloadPrefab = [];
        return _this;
    }
    HomeScene.prototype.onLoad = function () {
        this.bindTouch(this.startButton, this.connectServer);
        this.bindTouch(this.helpButton, function () { Utils_1.default.tip([I18nManager_1.i18n('我一充钱'), I18nManager_1.i18n('快乐七天')]); });
        this.onRegMessage();
    };
    HomeScene.prototype.onRegMessage = function () {
        GameManager_1.Net.regMsg(MsgDefine_1.Msg.RES_LOGIN, function (data) {
            GameManager_1.Data.player.updateSelfPlayer(data);
        });
    };
    HomeScene.prototype.connectServer = function () {
        GameManager_1.Net.connect(GameConfig_1.ServerUrl, this.enterHomeScene.bind(this));
    };
    HomeScene.prototype.enterHomeScene = function (data) {
        Utils_1.default.loading();
        GameManager_1.UIMgr.pushScenePre('scene/HomeScene', function () {
            Utils_1.default.hideLoading();
        });
    };
    __decorate([
        property([cc.Prefab])
    ], HomeScene.prototype, "preloadPrefab", void 0);
    __decorate([
        AutoBind_1.autoBind(cc.Button)
    ], HomeScene.prototype, "startButton", void 0);
    __decorate([
        AutoBind_1.autoBind(cc.Button)
    ], HomeScene.prototype, "helpButton", void 0);
    HomeScene = __decorate([
        ccclass
    ], HomeScene);
    return HomeScene;
}(BaseScene_1.default));
exports.default = HomeScene;

cc._RF.pop();