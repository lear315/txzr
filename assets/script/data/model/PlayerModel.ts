/**
 * 玩家数据模型
 */

export enum playerType {
    Self = 1, // 自己
    Enemy = 2 // 敌人
}

export enum playerState {
    Normal = 0, // 普通
    Luck =  1 // 幸运儿
}

export default class PlayerModel {
    public playerId: number
    public dir: number
    public pos: cc.Vec2
    public playerType: playerType
    public roleType: number
    public time: number
    public state: playerState

    public constructor(data) {
        this.update(data)
    }

    public update(data) {
        this.playerId = data.playerId
        this.dir = data.dir
        this.pos = data.pos
        this.playerType = data.playerType
        this.roleType = data.roleType
        this.time = data.time
        this.state = data.state
    }

}