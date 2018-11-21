"use strict";
cc._RF.push(module, '392ae9rtz1BgLDf/u8dLm9a', 'BaseComponent');
// script/core/BaseComponent.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 组件基类
 * lear
 */
var LogHelper_1 = require("./helper/LogHelper");
var GameManager_1 = require("../GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BaseComponent = /** @class */ (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    BaseComponent.prototype.getAutoBind = function () {
        return this._isAutoBind;
    };
    BaseComponent.prototype.setAutoBind = function (flag) {
        this._isAutoBind = flag;
    };
    BaseComponent.prototype.__preload = function () {
        if (!this._isAutoBind) {
            return;
        }
        LogHelper_1.logTime('autoBind ==>' + this.name);
        this.autoBind(this.node, this);
        LogHelper_1.logTime('autoBind ==>' + this.name, true);
    };
    BaseComponent.prototype.autoBind = function (node, target) {
        var _this = this;
        node.children.forEach(function (childNode) {
            var name = childNode.name;
            var type = _this._autoBindKey && _this._autoBindKey[name];
            if (type) {
                if (type === cc.Node) {
                    target[name] = childNode;
                }
                else {
                    target[name] = childNode.getComponent(type);
                }
            }
            _this.autoBind(childNode, target);
        });
    };
    BaseComponent.prototype.init = function () {
    };
    /**
     * 获取子节点
     * @param pathName 路径名
     */
    BaseComponent.prototype.getChild = function (pathName) {
        if (pathName) {
            return cc.find(pathName, this.node);
        }
        else {
            LogHelper_1.errlog("getChild " + pathName + " not found");
        }
    };
    /**
     * 获取子节点组件
     * @param pathName 路径名
     * @param type 组件名
     */
    BaseComponent.prototype.getComp = function (pathName, type) {
        var node = this.getChild(pathName);
        if (!node) {
            return;
        }
        var comp = node.getComponent(type);
        if (!comp) {
            LogHelper_1.errlog("getComp " + pathName + " not found componment");
            return;
        }
        return comp;
    };
    /**
     * 获取子节点或组件
     */
    BaseComponent.prototype.getEasy = function (pathName, type) {
        if (pathName) {
            var node = cc.find(pathName, this.node);
            if (type && node) {
                var comp = node.getComponent(type);
                return comp;
            }
            else {
                return node;
            }
        }
        else {
            LogHelper_1.errlog("getChild " + pathName + " not found");
        }
    };
    /**
     * 绑定监听
     * @param obj 绑定对象
     * @param callBack 回调事件
     * @param eventType 触控类型（默认点击抬起）
     */
    BaseComponent.prototype.bindTouch = function (obj, callBack, eventType) {
        if (eventType === void 0) { eventType = cc.Node.EventType.TOUCH_END; }
        var node = obj instanceof cc.Node ? obj : obj.node;
        if (node) {
            node.on(eventType, callBack, this);
        }
        return obj;
    };
    /**
     * 请求数据
     */
    BaseComponent.prototype.send = function (msgId, content, callback) {
        return new Promise(function (resolve, reject) {
            GameManager_1.Net.send(msgId, content, function (data) {
                callback && callback(data);
                resolve(data);
            });
        });
    };
    /**
     * 监听网络数据回调
     */
    BaseComponent.prototype.regMsg = function (msgId, callback) {
        return new Promise(function (resolve, reject) {
            GameManager_1.Net.regMsg(msgId, function (data) {
                callback && callback(data);
                resolve(data);
            });
        });
    };
    BaseComponent = __decorate([
        ccclass
    ], BaseComponent);
    return BaseComponent;
}(cc.Component));
exports.default = BaseComponent;

cc._RF.pop();