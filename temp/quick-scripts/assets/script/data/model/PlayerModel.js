(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/data/model/PlayerModel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dbe76gDHCRMrK5Vj85VByhc', 'PlayerModel', __filename);
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
        //# sourceMappingURL=PlayerModel.js.map
        