"use strict";
cc._RF.push(module, '06058bQbD9EqYleBgiv0s8W', 'StorageHelper');
// script/core/helper/StorageHelper.ts

/**
 * Stroage存储
 */
Object.defineProperty(exports, "__esModule", { value: true });
var StorageHelper = /** @class */ (function () {
    function StorageHelper() {
    }
    Object.defineProperty(StorageHelper, "Ins", {
        // 获取单例
        get: function () {
            try {
                wx.getStorageSync("wx");
                StorageHelper._isWx = true;
            }
            catch (e) {
                StorageHelper._isWx = false;
            }
            return StorageHelper._instance || (StorageHelper._instance = new StorageHelper());
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置键值
     */
    StorageHelper.prototype.setItem = function (key, val) {
        if (StorageHelper._isWx) {
            // 判断如果存在wx上下文
            wx.setStorageSync({ key: key, data: val });
        }
        else {
            cc.sys.localStorage.setItem(key, val);
        }
    };
    /**
     * 获取键值
     */
    StorageHelper.prototype.getItem = function (key) {
        if (StorageHelper._isWx) {
            var data = wx.getStorageSync({ key: key });
            return data;
        }
        try { }
        catch (e) {
            var data = cc.sys.localStorage.getItem(key);
            return data;
        }
    };
    /**
     * 清空存储数据
     */
    StorageHelper.prototype.clear = function () {
        if (StorageHelper._isWx) {
            wx.clearStorageSync({});
        }
        else {
            cc.sys.localStorage.clear();
        }
    };
    /**
     * 设置键值(异步)
     */
    StorageHelper.prototype.setItemAsync = function (key, val) {
        return new Promise(function (resolve, reject) {
            if (StorageHelper._isWx) {
                // 判断如果存在wx上下文
                wx.setStorage({
                    key: key,
                    data: val,
                    success: function () { return resolve(); },
                    fail: function (e) { return reject(e.errMsg); }
                });
            }
            else {
                cc.sys.localStorage.setItem(key, val);
                resolve();
            }
        });
    };
    /**
     * 获取键值(异步)
     */
    StorageHelper.prototype.getItemAsync = function (key) {
        return new Promise(function (resolve, reject) {
            if (StorageHelper._isWx) {
                wx.getStorage({
                    key: key,
                    success: function (res) {
                        if (res && res.errMsg.test(/ok/)) {
                            resolve(res.data);
                        }
                        else if (res.errMsg.test(/fail data not found/)) {
                            resolve(undefined);
                        }
                        else {
                            reject(res.errMsg);
                        }
                    },
                    fail: function (res) { return reject(res.errMsg); }
                });
            }
            else {
                var data = cc.sys.localStorage.getItem(key);
                resolve(data);
            }
        });
    };
    /**
     * 清空存储数据(异步)
     */
    StorageHelper.clearAsync = function () {
        return new Promise(function (resolve, reject) {
            if (StorageHelper._isWx) {
                wx.clearStorage({
                    success: function (data) { return resolve(data.errMsg); },
                    fail: function (e) { return reject(e.errMsg); }
                });
            }
            else {
                cc.sys.localStorage.clear();
                resolve();
            }
        });
    };
    return StorageHelper;
}());
exports.default = StorageHelper;

cc._RF.pop();