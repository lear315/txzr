"use strict";
cc._RF.push(module, '393b2QnMc5DeIocuc5n8DMq', 'GameDataManager');
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