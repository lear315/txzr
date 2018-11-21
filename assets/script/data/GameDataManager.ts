import { Net } from "../GameManager";
import { Msg } from "../GameConfig";
import PlayerData from "./PlayerData";

/**
 * 数据管理
 */
export default class GameDataManager {
    public _player: PlayerData

    public get player(): PlayerData {
        return this._player
    }

    public constructor() {
        this._player = new PlayerData()
    }

    public regMsg() {
    }
}