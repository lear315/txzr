"use strict";
cc._RF.push(module, '555d7DXO5VIi78Q/8tH2UJ7', 'HomeScene');
// script/scene/HomeScene.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 主场景
 */
var BaseScene_1 = require("../core/BaseScene");
var AutoBind_1 = require("../core/decorator/AutoBind");
var Utils_1 = require("../util/Utils");
var GameManager_1 = require("../GameManager");
var I18nManager_1 = require("../core/I18nManager");
var MsgDefine_1 = require("../net/MsgDefine");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HomeScene = /** @class */ (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomeScene.prototype.onLoad = function () {
        this.bindTouch(this.fightBtn, this.enterHouse);
        this.bindTouch(this.activityFightBtn, function () { Utils_1.default.tip(I18nManager_1.i18n('非常抱歉!只有尊贵的VIP才有资格进入.')); });
        this.bindTouch(this.adBtn, function () { Utils_1.default.tip([I18nManager_1.i18n('是你叫我打广告的啊，我从来没听过这样的要求'), I18nManager_1.i18n('....关注微信公众号极客小厨房')]); });
        this.onRegMessage();
    };
    HomeScene.prototype.onRegMessage = function () {
    };
    HomeScene.prototype.enterHouse = function () {
        var _this = this;
        Utils_1.default.loading();
        this.showFindBattle();
        GameManager_1.UIMgr.loadScenePre('scene/BattleScene');
        this.send(MsgDefine_1.Msg.REQ_JOINHOUSE, {}).then(function (data) {
            if (data.result) {
                _this.enterBattleScene();
            }
        });
    };
    HomeScene.prototype.showFindBattle = function () {
        this._findBattleSche = this.schedule(function () {
            Utils_1.default.tip(I18nManager_1.i18n('匹配中..'));
        }, 1);
    };
    HomeScene.prototype.hideFindBattle = function () {
        if (this._findBattleSche) {
            this.unschedule(this._findBattleSche);
            this._findBattleSche = null;
        }
    };
    HomeScene.prototype.enterBattleScene = function () {
        Utils_1.default.loading();
        GameManager_1.UIMgr.pushScenePre('scene/BattleScene', function () {
            Utils_1.default.hideLoading();
        });
        this.hideFindBattle();
    };
    __decorate([
        AutoBind_1.autoBind(cc.Button)
    ], HomeScene.prototype, "fightBtn", void 0);
    __decorate([
        AutoBind_1.autoBind(cc.Button)
    ], HomeScene.prototype, "activityFightBtn", void 0);
    __decorate([
        AutoBind_1.autoBind(cc.Button)
    ], HomeScene.prototype, "adBtn", void 0);
    HomeScene = __decorate([
        ccclass
    ], HomeScene);
    return HomeScene;
}(BaseScene_1.default));
exports.default = HomeScene;

cc._RF.pop();