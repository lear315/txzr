"use strict";
cc._RF.push(module, '7a295c4TQVM4L36hUU1D4tn', 'LogHelper');
// script/core/helper/LogHelper.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.logState = CC_DEBUG;
function log(content) {
    var subst = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        subst[_i - 1] = arguments[_i];
    }
    if (exports.logState) {
        // showInScene(content)
        console.log.apply(console, [content].concat(subst));
    }
}
exports.log = log;
function errlog(content) {
    var subst = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        subst[_i - 1] = arguments[_i];
    }
    if (exports.logState) {
        console.warn.apply(console, ["ERROR: " + content].concat(subst));
    }
}
exports.errlog = errlog;
function logTime(name, finish) {
    if (exports.logState) {
        if (finish) {
            console.timeEnd(name);
        }
        else {
            console.time(name);
        }
    }
}
exports.logTime = logTime;
/**
 * 显示内容在场景中
 * @param content
 */
function showInScene(content) {
    var scene = cc.director.getScene();
    if (scene) {
        var logLabelNode = cc.director.getScene().getChildByName('logLabelNode');
        if (!logLabelNode) {
            logLabelNode = new cc.Node();
            logLabelNode.addComponent(cc.Label);
            logLabelNode.name = 'logLabelNode';
            logLabelNode.setAnchorPoint(0, 0);
            scene.addChild(logLabelNode);
        }
        logLabelNode.getComponent(cc.Label).string = content || '';
    }
}
exports.showInScene = showInScene;

cc._RF.pop();