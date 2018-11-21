"use strict";
cc._RF.push(module, '30b3fk+yLVK+rxQV9yBQSCC', 'PlayerData');
// script/data/PlayerData.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 玩家数据
 */
var BaseData_1 = require("../core/BaseData");
var PlayerModel_1 = require("./model/PlayerModel");
var PlayerData = /** @class */ (function (_super) {
    __extends(PlayerData, _super);
    function PlayerData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerData.prototype.updateSelfPlayer = function (data) {
        this.selfPlayer = new PlayerModel_1.default(data.player);
        this.selfId = this.selfPlayer.playerId;
    };
    return PlayerData;
}(BaseData_1.default));
exports.default = PlayerData;

cc._RF.pop();