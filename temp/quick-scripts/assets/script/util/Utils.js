(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/util/Utils.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '577bevfmxRBIY63XEHYVQxb', 'Utils', __filename);
// script/util/Utils.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 工具
 */
var LogHelper_1 = require("../core/helper/LogHelper");
var ToastCtrl_1 = require("../ctrl/ToastCtrl");
var UIlevel;
(function (UIlevel) {
    UIlevel[UIlevel["Msg"] = 1000] = "Msg";
    UIlevel[UIlevel["Mask"] = 900] = "Mask";
})(UIlevel = exports.UIlevel || (exports.UIlevel = {}));
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * tip框
     */
    Utils.tip = function (content) {
        Utils.insPrefab('prefab/common/ToastPrefab').then(function (node) {
            var toast = node.getComponent(ToastCtrl_1.default);
            Utils.getSceneCanvas().addChild(node, UIlevel.Msg);
            toast.show(content);
        });
    };
    /**
     * tip框
     */
    Utils.loading = function () {
        Utils.insPrefab('prefab/common/LoadingPrefab').then(function (node) {
            node.name = 'loadingNode';
            Utils.getSceneCanvas().addChild(node, UIlevel.Mask);
        });
    };
    Utils.hideLoading = function () {
        var loadingNode = Utils.getSceneCanvas().getChildByName('loadingNode');
        if (loadingNode) {
            loadingNode.removeFromParent();
        }
    };
    /**
     * 创建预制件节点
     */
    Utils.insPrefab = function (ctrlName, count) {
        return new Promise(function (resolve, reject) {
            cc.loader.loadRes(ctrlName, function (err, prefab) {
                if (err) {
                    LogHelper_1.log(err, ctrlName);
                    reject();
                }
                if (count && count > 0) {
                    var nodes = [];
                    for (var i = 0; i < count; i++) {
                        var node = cc.instantiate(prefab);
                        if (!node)
                            reject();
                        nodes.push(node);
                    }
                    resolve(nodes);
                }
                else {
                    var node = cc.instantiate(prefab);
                    if (!node)
                        reject();
                    resolve(node);
                }
            });
        });
    };
    Utils.getSceneCanvas = function () {
        return cc.Canvas.instance.node;
    };
    return Utils;
}());
exports.default = Utils;

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
        //# sourceMappingURL=Utils.js.map
        