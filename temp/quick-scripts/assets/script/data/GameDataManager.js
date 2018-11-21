(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/data/GameDataManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '393b2QnMc5DeIocuc5n8DMq', 'GameDataManager', __filename);
// script/data/GameDataManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayerData_1 = require("./PlayerData");
/**
 * 数据管理
 */
var GameDataManager = /** @class */ (function () {
    function GameDataManager() {
        this._player = new PlayerData_1.default();
    }
    Object.defineProperty(GameDataManager.prototype, "player", {
        get: function () {
            return this._player;
        },
        enumerable: true,
        configurable: true
    });
    GameDataManager.prototype.regMsg = function () {
    };
    return GameDataManager;
}());
exports.default = GameDataManager;

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
        //# sourceMappingURL=GameDataManager.js.map
        