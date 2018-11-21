(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/scene/BattleScene.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '40b771hoV9H3ZD1lxzDA272', 'BattleScene', __filename);
// script/scene/BattleScene.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 战斗场景
 */
var BaseScene_1 = require("../core/BaseScene");
var JoyStickCmp_1 = require("../component/JoyStickCmp");
var LogHelper_1 = require("../core/helper/LogHelper");
var AutoBind_1 = require("../core/decorator/AutoBind");
var Utils_1 = require("../util/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BattleScene = /** @class */ (function (_super) {
    __extends(BattleScene, _super);
    function BattleScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.preloadPrefab = [];
        return _this;
    }
    BattleScene.prototype.onLoad = function () {
        var _this = this;
        this.bindTouch(this.fireBtn, function () { return (_this.onFire(1)); });
        this.bindTouch(this.fireBtn2, function () { return (_this.onFire(2)); });
        this.joyStick.setChangeListener(this.joyEvent.bind(this));
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyBoardEvent, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyBoardEvent, this);
        this.loadHero();
        // Utils.loading()
        // this.send(Msg.REQ_BATTLE, {}).then(() => {
        //     Utils.hideLoading()
        //     log('开始')
        // })
    };
    BattleScene.prototype.loadHero = function () {
        var _this = this;
        Utils_1.default.insPrefab('prefab/battle/HeroPrefab').then(function (node) {
            _this.bgLayer.addChild(node);
            _this.hero = node.getComponent('HeroCtrl');
        });
        // Utils.insPrefab('prefab/battle/HeroPrefab').then((node: cc.Node) => {
        //     this.bgLayer.addChild(node)
        // })
        // Utils.insPrefab('prefab/battle/HeroPrefab').then((node: cc.Node) => {
        //     this.bgLayer.addChild(node)
        // })
    };
    BattleScene.prototype.onFire = function (type) {
        this.hero && this.hero.attack(type);
    };
    BattleScene.prototype.keyBoardEvent = function (event) {
        if (event.type !== "keydown") {
            this.joyEvent(null);
            return;
        }
        switch (event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.joyEvent(180);
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.joyEvent(0);
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.joyEvent(270);
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.joyEvent(90);
                break;
        }
    };
    BattleScene.prototype.joyEvent = function (angel) {
        LogHelper_1.log(angel);
        this.hero && this.hero.heroMove(angel);
    };
    __decorate([
        property([cc.Prefab])
    ], BattleScene.prototype, "preloadPrefab", void 0);
    __decorate([
        AutoBind_1.autoBind(cc.Button)
    ], BattleScene.prototype, "fireBtn", void 0);
    __decorate([
        AutoBind_1.autoBind(cc.Button)
    ], BattleScene.prototype, "fireBtn2", void 0);
    __decorate([
        AutoBind_1.autoBind(JoyStickCmp_1.default)
    ], BattleScene.prototype, "joyStick", void 0);
    __decorate([
        AutoBind_1.autoBind(cc.Node)
    ], BattleScene.prototype, "bgLayer", void 0);
    BattleScene = __decorate([
        ccclass
    ], BattleScene);
    return BattleScene;
}(BaseScene_1.default));
exports.default = BattleScene;

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
        //# sourceMappingURL=BattleScene.js.map
        