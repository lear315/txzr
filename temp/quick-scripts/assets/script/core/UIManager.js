(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/core/UIManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5a3b30zEjdNb5uByEYiR1r7', 'UIManager', __filename);
// script/core/UIManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * UI管理类
 */
var LogHelper_1 = require("./helper/LogHelper");
var UIManager = /** @class */ (function () {
    function UIManager() {
    }
    /**
     * 进入场景
     */
    UIManager.prototype.pushScene = function (sceneName) {
        cc.director.runScene(sceneName);
    };
    /**
     * 预加载进入场景
     */
    UIManager.prototype.pushScenePre = function (sceneName, callfunc) {
        cc.director.preloadScene(sceneName, function (err, res) {
            if (err) {
                LogHelper_1.log("pushScenePre " + sceneName + " faild");
                return;
            }
            callfunc && callfunc();
            cc.director.runScene(res.scene);
        });
    };
    /**
     * 预加载场景
     */
    UIManager.prototype.loadScenePre = function (sceneName, callfunc) {
        return new Promise(function (resolve, reject) {
            cc.director.preloadScene(sceneName, function (err, res) {
                if (err) {
                    reject();
                    LogHelper_1.log("pushScenePre " + sceneName + " faild");
                    return;
                }
                callfunc && callfunc(res.scene);
                resolve(res.scene);
            });
        });
    };
    return UIManager;
}());
exports.default = UIManager;

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
        //# sourceMappingURL=UIManager.js.map
        