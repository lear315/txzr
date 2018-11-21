"use strict";
cc._RF.push(module, 'dbe76gDHCRMrK5Vj85VByhc', 'PlayerModel');
// script/data/model/PlayerModel.ts

/**
 * 玩家数据模型
 */
Object.defineProperty(exports, "__esModule", { value: true });
var playerType;
(function (playerType) {
    playerType[playerType["Self"] = 1] = "Self";
    playerType[playerType["Enemy"] = 2] = "Enemy"; // 敌人
})(playerType = exports.playerType || (exports.playerType = {}));
var playerState;
(function (playerState) {
    playerState[playerState["Normal"] = 0] = "Normal";
    playerState[playerState["Luck"] = 1] = "Luck"; // 幸运儿
})(playerState = exports.playerState || (exports.playerState = {}));
var PlayerModel = /** @class */ (function () {
    function PlayerModel(data) {
        this.update(data);
    }
    PlayerModel.prototype.update = function (data) {
        this.playerId = data.playerId;
        this.dir = data.dir;
        this.pos = data.pos;
        this.playerType = data.playerType;
        this.roleType = data.roleType;
        this.time = data.time;
        this.state = data.state;
    };
    return PlayerModel;
}());
exports.default = PlayerModel;

cc._RF.pop();