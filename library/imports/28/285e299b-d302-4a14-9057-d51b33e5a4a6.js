"use strict";
cc._RF.push(module, '285e2mb0wJKFJBX1Rsz5aSm', 'HeroCtrl');
// script/ctrl/battle/HeroCtrl.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 英雄控制
 */
var BaseCtrl_1 = require("../../core/BaseCtrl");
var AutoBind_1 = require("../../core/decorator/AutoBind");
var _3DHelper_1 = require("../../core/helper/3DHelper");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HeroState;
(function (HeroState) {
    HeroState[HeroState["Idle"] = 0] = "Idle";
    HeroState[HeroState["Run"] = 1] = "Run";
    HeroState[HeroState["Attack"] = 2] = "Attack";
})(HeroState = exports.HeroState || (exports.HeroState = {}));
var attackTime = 60;
var HeroCtrl = /** @class */ (function (_super) {
    __extends(HeroCtrl, _super);
    function HeroCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 300;
        _this.offset = cc.v2(0, 0);
        _this.curState = HeroState.Idle;
        return _this;
    }
    HeroCtrl.prototype.onLoad = function () {
        this.clockAction();
    };
    HeroCtrl.prototype.clockAction = function () {
        this.clockSprite.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.5, 1.2), cc.scaleTo(0.5, 1))));
    };
    HeroCtrl.prototype.heroMove = function (angle) {
        if (angle === null) {
            this.offset = cc.v2(0, 0);
            return;
        }
        var angelvec4 = _3DHelper_1.changeAngle(Math.PI / 180 * (angle + 90), 0, Math.PI / 180 * 90);
        this.stoneKing.node.setRotation(angelvec4.qw, angelvec4.qx, angelvec4.qy, angelvec4.qz);
        if (angle === 0 || angle === 180 || angle === 90) {
            this.offset = cc.v2(Math.floor(Math.cos(Math.PI / 180 * angle)), Math.floor(Math.sin(Math.PI / 180 * angle)));
        }
        else if (angle === 270) {
            this.offset = cc.v2(Math.ceil(Math.cos(Math.PI / 180 * angle)), Math.floor(Math.sin(Math.PI / 180 * angle)));
        }
        else {
            this.offset = cc.v2(Math.cos(Math.PI / 180 * angle), Math.sin(Math.PI / 180 * angle));
        }
    };
    HeroCtrl.prototype.update = function (dt) {
        var interpolation = 1;
        if (this.curState !== HeroState.Attack) {
            if (this.offset.x === 0 && this.offset.y === 0) {
                this.idle();
            }
            else {
                this.run();
            }
        }
        else {
            interpolation = 0.05;
        }
        var nextX = this.node.x + this.offset.x * this.speed * dt * interpolation;
        var nextY = this.node.y + this.offset.y * this.speed * dt * interpolation;
        this.node.setPosition(nextX, nextY);
    };
    /**
     * 攻击
     */
    HeroCtrl.prototype.attack = function (type) {
        var _this = this;
        if (this.curState === HeroState.Attack) {
            return;
        }
        this.curState = HeroState.Attack;
        // if (type === 1) {
        //     this.spine.animation = `punch1`
        // } else {
        //     this.spine.animation = `meleeSwing1`
        // }
        // this.spine.loop = false
        this.scheduleOnce(function () {
            _this.idle();
        }, 0.2);
    };
    /**
     * 休息
     */
    HeroCtrl.prototype.idle = function () {
        if (this.curState === HeroState.Idle) {
            return;
        }
        this.curState = HeroState.Idle;
        // this.spine.animation = 'idle'
        // this.spine.loop = true
    };
    /**
     * 跑
     */
    HeroCtrl.prototype.run = function () {
        if (this.curState === HeroState.Run) {
            return;
        }
        this.curState = HeroState.Run;
        // this.spine.animation = 'run'
        // this.spine.loop = true
    };
    __decorate([
        AutoBind_1.autoBind(cc.SkeletonAnimation)
    ], HeroCtrl.prototype, "stoneKing", void 0);
    __decorate([
        AutoBind_1.autoBind(cc.Sprite)
    ], HeroCtrl.prototype, "clockSprite", void 0);
    __decorate([
        AutoBind_1.autoBind(cc.Label)
    ], HeroCtrl.prototype, "nameLabel", void 0);
    HeroCtrl = __decorate([
        ccclass
    ], HeroCtrl);
    return HeroCtrl;
}(BaseCtrl_1.default));
exports.default = HeroCtrl;

cc._RF.pop();