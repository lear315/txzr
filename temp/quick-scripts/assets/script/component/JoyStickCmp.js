(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/component/JoyStickCmp.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8a024emck1PNrav2yF226Us', 'JoyStickCmp', __filename);
// script/component/JoyStickCmp.ts

/**
 * 游戏摇杆
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BaseComponent_1 = require("../core/BaseComponent");
var LogHelper_1 = require("../core/helper/LogHelper");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TouchType;
(function (TouchType) {
    TouchType[TouchType["DEFAULT"] = 0] = "DEFAULT";
    TouchType[TouchType["FOLLOW"] = 1] = "FOLLOW";
})(TouchType || (TouchType = {}));
var DirectionType;
(function (DirectionType) {
    DirectionType[DirectionType["FOUR"] = 0] = "FOUR";
    DirectionType[DirectionType["EIGHT"] = 1] = "EIGHT";
    DirectionType[DirectionType["ALL"] = 2] = "ALL";
})(DirectionType || (DirectionType = {}));
var Dir;
(function (Dir) {
    Dir[Dir["Center"] = null] = "Center";
    Dir[Dir["Up"] = 90] = "Up";
    Dir[Dir["Down"] = 270] = "Down";
    Dir[Dir["Left"] = 180] = "Left";
    Dir[Dir["Right"] = 0] = "Right";
    Dir[Dir["LeftUp"] = 135] = "LeftUp";
    Dir[Dir["LeftDown"] = 225] = "LeftDown";
    Dir[Dir["RightUp"] = 45] = "RightUp";
    Dir[Dir["RightDown"] = 315] = "RightDown"; // 右下 
})(Dir = exports.Dir || (exports.Dir = {}));
var JoyStickCmp = /** @class */ (function (_super) {
    __extends(JoyStickCmp, _super);
    function JoyStickCmp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 控制杆
        _this.stickBar = null;
        // 控制杆背景
        _this.stickBg = null;
        // 半径
        _this.radius = 0;
        // 操作类型
        _this.touchType = TouchType.DEFAULT;
        // 方向类型
        _this.directionType = DirectionType.ALL;
        // 半径
        _this.defaultOpacity = 200;
        //触控区域
        _this.touchArea = null;
        //当前角度
        _this.curAngle = 0;
        //当前距离
        _this.distance = 0;
        // 操作阈值(敏感度)
        _this.threshold = 10;
        // 触发事件标志
        _this.isTrigger = false;
        return _this;
    }
    JoyStickCmp.prototype.onLoad = function () {
        this.node.opacity = this.defaultOpacity;
        this.initPos = this.node.position;
        if (this.radius === 0) {
            this.radius = this.stickBg.width * this.stickBg.scale / 2;
        }
        if (!this.touchArea) {
            var canvas = cc.find('Canvas');
            if (canvas) {
                // 如果没有设置触控区域,优先使用canvas节点5
                this.touchArea = canvas;
            }
            else {
                // 如果没有设置触控区域,那么默认触控区域2000
                this.touchArea = new cc.Node();
                this.touchArea.parent = this.node.parent;
                this.touchArea.setContentSize(2000, 2000);
            }
        }
        this.registerTouch();
    };
    JoyStickCmp.prototype.setChangeListener = function (callback) {
        this.changeCallback = callback;
    };
    JoyStickCmp.prototype.registerTouch = function () {
        var _this = this;
        this.touchArea.on(cc.Node.EventType.TOUCH_START, function (event) {
            _this.onTouchStart(event);
        }, this);
        this.touchArea.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            _this.onTouchMove(event);
        }, this);
        this.touchArea.on(cc.Node.EventType.TOUCH_END, function (event) {
            _this.onTouchEnd(event);
        }, this);
        this.touchArea.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            _this.onTouchCancel(event);
        }, this);
    };
    JoyStickCmp.prototype.onTouchStart = function (event) {
        //如果触摸类型为FOLLOW，则摇控杆的位置为触摸位置,触摸开始时候现形
        if (this.touchType == TouchType.FOLLOW) {
            var touchPos = this.node.parent.convertToNodeSpaceAR(event.touch.getLocation());
            this.node.setPosition(touchPos);
            this.isTrigger = true;
            return;
        }
        else {
            // 把触摸点坐标转换为相对与目标的模型坐标
            var touchPos = this.node.convertToNodeSpaceAR(event.touch.getLocation());
            //点与圆心的距离
            var distance = touchPos.sub(cc.v2(0, 0)).mag();
            //如果点与圆心距离小于圆的半径,且大于操作阈值,触控成功
            if (distance < this.radius && distance > this.threshold) {
                this.node.opacity = 255;
                this.stickBar.setPosition(touchPos);
                this.updateAngle(touchPos);
                this.isTrigger = true;
                return;
            }
        }
        this.isTrigger = false;
    };
    JoyStickCmp.prototype.onTouchMove = function (event) {
        if (!this.isTrigger) {
            return;
        }
        var touchPos = this.node.convertToNodeSpaceAR(event.touch.getLocation());
        var distance = touchPos.sub(cc.v2(0, 0)).mag();
        if (this.radius >= distance) {
            //如果点与圆心距离小于圆的半径,控杆跟随触摸点
            if (distance > this.threshold) {
                this.node.opacity = 255;
                this.stickBar.setPosition(touchPos);
                // 更新角度
                this.updateAngle(touchPos);
            }
            else {
                this.node.opacity = this.defaultOpacity;
                // 摇杆恢复位置
                this.stickBar.setPosition(cc.v2(0, 0));
                this.curAngle = null;
                // 通知角度变化回调
                this.emitAngle(this.curAngle);
            }
        }
        else {
            var x = Math.cos(this.calcuRadian(touchPos)) * this.radius;
            var y = Math.sin(this.calcuRadian(touchPos)) * this.radius;
            if (touchPos.y < 0) {
                // 在三四象限的时候,y要调整
                y *= -1;
            }
            this.stickBar.setPosition(cc.v2(x, y));
            this.updateAngle(touchPos);
        }
    };
    JoyStickCmp.prototype.onTouchEnd = function (event) {
        if (!this.isTrigger) {
            return;
        }
        this.isTrigger = false;
        this.resetStick();
    };
    JoyStickCmp.prototype.onTouchCancel = function (event) {
        this.resetStick();
    };
    // 更新方向
    JoyStickCmp.prototype.updateAngle = function (point) {
        this.curAngle = Math.floor(this.calcuRadian(point) * 180 / Math.PI);
        if (point.x > 0 && point.y < 0 || point.x < 0 && point.y < 0) {
            this.curAngle = 360 - this.curAngle;
        }
        else if (point.x < 0 && point.y == 0) {
            this.curAngle = 180;
        }
        else if (point.x > 0 && point.y == 0) {
            this.curAngle = 0;
        }
        else if (point.x == 0 && point.y > 0) {
            this.curAngle = 90;
        }
        else if (point.x == 0 && point.y < 0) {
            this.curAngle = 270;
        }
        this.formatAngle();
    };
    JoyStickCmp.prototype.formatAngle = function () {
        switch (this.directionType) {
            case DirectionType.FOUR:
                this.curAngle = this.fourDirections();
                break;
            case DirectionType.EIGHT:
                this.curAngle = this.eightDirections();
                break;
            case DirectionType.ALL:
                this.curAngle = this.curAngle;
                break;
            default:
                this.curAngle = null;
                break;
        }
        this.emitAngle(this.curAngle);
    };
    // 格式化方向(四方向)
    JoyStickCmp.prototype.fourDirections = function () {
        if (this.curAngle >= 45 && this.curAngle <= 135) {
            return Dir.Up;
        }
        else if (this.curAngle >= 225 && this.curAngle <= 315) {
            return Dir.Down;
        }
        else if (this.curAngle <= 225 && this.curAngle >= 180 || this.curAngle >= 135 && this.curAngle <= 180) {
            return Dir.Left;
        }
        else if (this.curAngle <= 360 && this.curAngle >= 315 || this.curAngle >= 0 && this.curAngle <= 45) {
            return Dir.Right;
        }
    };
    // 格式化方向(四方向)
    JoyStickCmp.prototype.eightDirections = function () {
        if (this.curAngle >= 67.5 && this.curAngle <= 112.5) {
            return Dir.Up;
        }
        else if (this.curAngle >= 247.5 && this.curAngle <= 292.5) {
            return Dir.Down;
        }
        else if (this.curAngle <= 202.5 && this.curAngle >= 180 || this.curAngle >= 157.5 && this.curAngle <= 180) {
            return Dir.Left;
        }
        else if (this.curAngle <= 360 && this.curAngle >= 337.5 || this.curAngle >= 0 && this.curAngle <= 22.5) {
            return Dir.Right;
        }
        else if (this.curAngle >= 112.5 && this.curAngle <= 157.5) {
            return Dir.LeftUp;
        }
        else if (this.curAngle >= 22.5 && this.curAngle <= 67.5) {
            return Dir.RightUp;
        }
        else if (this.curAngle >= 202.5 && this.curAngle <= 247.5) {
            return Dir.LeftDown;
        }
        else if (this.curAngle >= 292.5 && this.curAngle <= 337.5) {
            return Dir.RightDown;
        }
    };
    // 推送更新方向通知
    JoyStickCmp.prototype.emitAngle = function (angle) {
        if (this.changeCallback) {
            try {
                this.changeCallback(angle);
            }
            catch (error) {
                LogHelper_1.errlog(error);
            }
        }
    };
    JoyStickCmp.prototype.resetStick = function () {
        this.node.opacity = this.defaultOpacity;
        //如果触摸类型为FOLLOW，离开触摸后隐藏
        if (this.touchType == TouchType.FOLLOW) {
            this.node.position = this.initPos;
        }
        this.stickBar.setPosition(cc.v2(0, 0));
        this.curAngle = null;
        this.emitAngle(this.curAngle);
    };
    // 计算弧度
    JoyStickCmp.prototype.calcuRadian = function (point) {
        var z = Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
        if (z === 0) {
            return 0;
        }
        else {
            return Math.acos(point.x / z);
        }
    };
    JoyStickCmp.prototype.onDestroy = function () {
        this.changeCallback = null;
    };
    __decorate([
        property(cc.Node)
    ], JoyStickCmp.prototype, "stickBar", void 0);
    __decorate([
        property(cc.Node)
    ], JoyStickCmp.prototype, "stickBg", void 0);
    __decorate([
        property(cc.Float)
    ], JoyStickCmp.prototype, "radius", void 0);
    __decorate([
        property({ type: cc.Enum(TouchType) })
    ], JoyStickCmp.prototype, "touchType", void 0);
    __decorate([
        property({ type: cc.Enum(DirectionType) })
    ], JoyStickCmp.prototype, "directionType", void 0);
    __decorate([
        property(cc.Integer)
    ], JoyStickCmp.prototype, "defaultOpacity", void 0);
    __decorate([
        property(cc.Node)
    ], JoyStickCmp.prototype, "touchArea", void 0);
    JoyStickCmp = __decorate([
        ccclass
    ], JoyStickCmp);
    return JoyStickCmp;
}(BaseComponent_1.default));
exports.default = JoyStickCmp;

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
        //# sourceMappingURL=JoyStickCmp.js.map
        