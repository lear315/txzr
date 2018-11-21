(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/core/BaseData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'abfecA95QVHKZ8nvC7lmYyc', 'BaseData', __filename);
// script/core/BaseData.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LogHelper_1 = require("./helper/LogHelper");
/**
 * 数据实例基类
 */
var BaseData = /** @class */ (function () {
    function BaseData() {
        this._events = [];
    }
    /**
     * 监听事件
     */
    BaseData.prototype.on = function (eventName, callback) {
        if (!this._events[eventName]) {
            this._events[eventName] = [];
        }
        this._events[eventName].push(callback);
    };
    /**
     * 触发事件
     */
    BaseData.prototype.emit = function (eventName, payload) {
        var _this = this;
        if (this._events[eventName]) {
            var events_1 = this._events[eventName].slice();
            events_1.reverse().forEach(function (event, index) {
                try {
                    if (event) {
                        event(payload);
                    }
                    else {
                        LogHelper_1.errlog('触发回调事件异常');
                        _this._events[eventName].splice(events_1.length - 1 - index, 1);
                    }
                }
                catch (e) {
                    LogHelper_1.errlog("\u89E6\u53D1\u56DE\u8C03\u4E8B\u4EF6\u5F02\u5E38:" + e);
                    _this._events[eventName].splice(events_1.length - 1 - index, 1);
                }
            });
        }
    };
    return BaseData;
}());
exports.default = BaseData;

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
        //# sourceMappingURL=BaseData.js.map
        