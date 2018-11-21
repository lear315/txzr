"use strict";
cc._RF.push(module, 'abfecA95QVHKZ8nvC7lmYyc', 'BaseData');
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