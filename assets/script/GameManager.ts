/**
 * 游戏管理基类
 * lear
 */
import UIManager from "./core/UIManager"
import Utils from "./util/Utils";
import NetManager from "./core/NetManager"
import GameDataManager from "./data/GameDataManager"
import StorageHelper from "./core/helper/StorageHelper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager {

    private static _gameManager: GameManager
    public uiManager: UIManager
    public netMgr: NetManager
    public dataMgr: GameDataManager
    public gameSize: cc.Size = new cc.Size(1334, 750)

    public static get Ins(): GameManager {
        if (!GameManager._gameManager) {
            GameManager._gameManager = new GameManager()
            GameManager._gameManager.init()
        }
        return GameManager._gameManager
    }

    public init() {
        cc.debug.setDisplayStats(false)
        this.uiManager = new UIManager()
        this.netMgr = new NetManager()
        this.dataMgr = new GameDataManager()
    }
}

export let Game: GameManager = GameManager.Ins
export let UIMgr: UIManager = Game.uiManager
export let Net: NetManager = Game.netMgr
export let Data: GameDataManager = Game.dataMgr
export let Storage: StorageHelper = StorageHelper.Ins