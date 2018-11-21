"use strict";
cc._RF.push(module, '4c0dcU5MllEs4eLpxMEeO89', 'AutoBind');
// script/core/decorator/AutoBind.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 装饰器
 * lear
 */
var LogHelper_1 = require("../helper/LogHelper");
/**
 * 自动绑定Scene或者Prefab下的组件或者节点
 * @param type
 */
function autoBind(type) {
    return function (target, propertyKey) {
        LogHelper_1.log(type + ', ' + ', ' + target + ', ' + propertyKey);
        target.setAutoBind(true);
        if (!target._autoBindKey) {
            target._autoBindKey = {};
        }
        target._autoBindKey[propertyKey] = type;
    };
}
exports.autoBind = autoBind;

cc._RF.pop();