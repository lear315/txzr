/**
 * 玩家数据
 */
import BaseData from "../core/BaseData";
import PlayerModel from "./model/PlayerModel";
 
export default class PlayerData extends BaseData {
    // 玩家自己的数据
    public selfPlayer: PlayerModel
    public selfId: number

    public updateSelfPlayer(data) {
        this.selfPlayer = new PlayerModel(data.player)
        this.selfId = this.selfPlayer.playerId
    }

}