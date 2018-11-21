(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/GameManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '39921CEWRpMCpDBfAQ+wu79', 'GameManager', __filename);
// script/GameManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 游戏管理基类
 * lear
 */
var UIManager_1 = require("./core/UIManager");
var NetManager_1 = require("./core/NetManager");
var GameDataManager_1 = require("./data/GameDataManager");
var StorageHelper_1 = require("./core/helper/StorageHelper");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameManager = /** @class */ (function () {
    function GameManager() {
        this.gameSize = new cc.Size(1334, 750);
    }
    GameManager_1 = GameManager;
    Object.defineProperty(GameManager, "Ins", {
        get: function () {
            if (!GameManager_1._gameManager) {
                GameManager_1._gameManager = new GameManager_1();
                GameManager_1._gameManager.init();
            }
            return GameManager_1._gameManager;
        },
        enumerable: true,
        configurable: true
    });
    GameManager.prototype.init = function () {
        cc.debug.setDisplayStats(false);
        this.uiManager = new UIManager_1.default();
        this.netMgr = new NetManager_1.default();
        this.dataMgr = new GameDataManager_1.default();
    };
    var GameManager_1;
    GameManager = GameManager_1 = __decorate([
        ccclass
    ], GameManager);
    return GameManager;
}());
exports.default = GameManager;
exports.Game = GameManager.Ins;
exports.UIMgr = exports.Game.uiManager;
exports.Net = exports.Game.netMgr;
exports.Data = exports.Game.dataMgr;
exports.Storage = StorageHelper_1.default.Ins;

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
        //# sourceMappingURL=GameManager.js.map
        