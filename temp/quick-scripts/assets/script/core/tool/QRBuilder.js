(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/core/tool/QRBuilder.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c5affupcTtP4rWs6TbY/F5X', 'QRBuilder', __filename);
// script/core/tool/QRBuilder.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LogHelper_1 = require("../helper/LogHelper");
/**
 * 二维码生成器
 */
var QRBuilder = /** @class */ (function () {
    function QRBuilder() {
    }
    QRBuilder.getQR = function (content, size) {
        if (size === void 0) { size = 100; }
        if (!content) {
            LogHelper_1.errlog('getQR content is undifine');
            return;
        }
        var qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
        qrcode.addData(content);
        qrcode.make();
        var qrNode = new cc.Node('qrNode');
        qrNode.setAnchorPoint(cc.v2(0.5, 0.5));
        qrNode.setContentSize(size, size);
        var ctx = qrNode.addComponent(cc.Graphics);
        ctx.fillColor = cc.Color.BLACK;
        var tileW = qrNode.width / qrcode.getModuleCount();
        var tileH = qrNode.height / qrcode.getModuleCount();
        for (var row = 0; row < qrcode.getModuleCount(); row++) {
            for (var col = 0; col < qrcode.getModuleCount(); col++) {
                if (qrcode.isDark(row, col)) {
                    ctx.fillColor = cc.Color.BLACK;
                }
                else {
                    ctx.fillColor = cc.Color.WHITE;
                }
                var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
                var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
                ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
                ctx.fill();
            }
        }
        return qrNode;
    };
    return QRBuilder;
}());
exports.default = QRBuilder;

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
        //# sourceMappingURL=QRBuilder.js.map
        