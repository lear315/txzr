(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/core/NetManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '066cbnroPhKhbbHfNKTYW5Q', 'NetManager', __filename);
// script/core/NetManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sokect管理类
 */
var LogHelper_1 = require("./helper/LogHelper");
var SocketState;
(function (SocketState) {
    SocketState[SocketState["Connect"] = 0] = "Connect";
    SocketState[SocketState["Disconnect"] = 1] = "Disconnect";
})(SocketState = exports.SocketState || (exports.SocketState = {}));
var NetManager = /** @class */ (function () {
    function NetManager() {
        this.listener = new Map();
        this.onceListener = new Map();
    }
    NetManager.prototype.connect = function (ip, connectCallFunc) {
        this.connectCallFunc = connectCallFunc;
        this.socket = io.connect(ip, { "force new connection": true });
        this.socket.on("connect", this.onConnect.bind(this));
        this.socket.on("message", this.onMessage.bind(this));
        this.socket.on("disconnect", this.onDisconnect.bind(this));
        this.socket.on("error", this.onError.bind(this));
    };
    NetManager.prototype.onConnect = function () {
        this.state = SocketState.Connect;
        if (this.connectCallFunc && typeof (this.connectCallFunc) === 'function') {
            this.connectCallFunc();
        }
    };
    NetManager.prototype.onMessage = function (message) {
        try {
            var msg = JSON.parse(message);
            this.pubMsg(msg.id, msg.content);
            LogHelper_1.log(msg.id, msg.content);
        }
        catch (err) {
            LogHelper_1.log(err);
        }
    };
    NetManager.prototype.onDisconnect = function () {
        this.state = SocketState.Disconnect;
        LogHelper_1.log('socket disconnect');
    };
    NetManager.prototype.onError = function () {
        LogHelper_1.log('socket error');
    };
    NetManager.prototype.send = function (msgId, content, callback) {
        LogHelper_1.log('send', msgId, content);
        if (callback && typeof (callback) === 'function') {
            this.regOnceMsg(msgId, callback);
        }
        var msg = {};
        msg.id = msgId;
        if (content) {
            msg.content = content;
        }
        this.socket.emit(msg.id, JSON.stringify(msg));
    };
    /**
     * 注册单次回调
     */
    NetManager.prototype.regOnceMsg = function (id, callback) {
        if (typeof (callback) !== 'function') {
            LogHelper_1.log("regOnceMsg " + id + " callback isn't function");
            return;
        }
        if (false === this.onceListener.has(id)) {
            this.onceListener.set(id, new Map());
        }
        var callbacks = this.onceListener.get(id);
        callbacks.set(callback, true);
    };
    /**
     * 注册消息监听
     */
    NetManager.prototype.regMsg = function (id, callback) {
        if (typeof (callback) !== 'function') {
            LogHelper_1.log("regMsg " + id + " callback isn't function");
            return;
        }
        if (false === this.listener.has(id)) {
            this.listener.set(id, new Map());
        }
        var callbacks = this.listener.get(id);
        callbacks.set(callback, true);
    };
    /**
     *  取消消息监听
     */
    NetManager.prototype.unRegMsg = function (id, callback) {
        var callbacks = this.listener.get(id);
        if (!callbacks)
            return;
        if (callback) {
            callbacks.has(callback) && callbacks.delete(callback);
        }
        else {
            this.listener.delete(id);
        }
    };
    /**
     * 推送消息
     */
    NetManager.prototype.pubMsg = function (id, content) {
        LogHelper_1.log('recv', id, content);
        if (false === this.listener.has(id)) {
            return;
        }
        var callbacks = this.listener.get(id);
        callbacks.forEach(function (v, callfunc, m) {
            callfunc(content);
        });
        var callbacksOnce = this.onceListener.get(id);
        callbacksOnce.forEach(function (v, callfunc, m) {
            callfunc(content);
        });
        this.onceListener.delete(id);
    };
    return NetManager;
}());
exports.default = NetManager;

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
        //# sourceMappingURL=NetManager.js.map
        