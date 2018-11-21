(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/core/helper/3DHelper.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f8bf5K61y5BgpnJmwNnD8rj', '3DHelper', __filename);
// script/core/helper/3DHelper.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 欧拉角(弧度制)转四元数
 */
function changeAngle(pitch, yaw, roll) {
    // tslint:disable-next-line:one-variable-per-declaration
    var cosRoll, sinRoll, cosPitch, sinPitch, cosyaw, sinyaw, qw, qx, qy, qz;
    cosRoll = Math.cos(roll * 0.5); // z 
    sinRoll = Math.sin(roll * 0.5); // z
    cosyaw = Math.cos(yaw * 0.5); // y
    sinyaw = Math.sin(yaw * 0.5); // y
    cosPitch = Math.cos(pitch * 0.5); // x
    sinPitch = Math.sin(pitch * 0.5); // x
    qx = cosRoll * sinyaw * cosPitch + sinRoll * cosyaw * sinPitch;
    qy = cosRoll * cosyaw * sinPitch - sinRoll * sinyaw * cosPitch;
    qz = sinRoll * cosyaw * cosPitch - cosRoll * sinyaw * sinPitch;
    qw = cosRoll * cosyaw * cosPitch + sinRoll * sinyaw * sinPitch;
    return { qx: qx, qy: qy, qz: qz, qw: qw };
}
exports.changeAngle = changeAngle;

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
        //# sourceMappingURL=3DHelper.js.map
        