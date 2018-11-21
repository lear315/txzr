/**
 * 登录场景
 */
import BaseScene from "../core/BaseScene"
import { autoBind } from "../core/decorator/AutoBind"
import { UIMgr, Net, Data } from "../GameManager"
import { showInScene } from "../core/helper/LogHelper"
import { i18n } from "../core/I18nManager"
import Utils from "../util/Utils";
import { ServerUrl} from "../GameConfig";
import { Msg } from "../net/MsgDefine";
import QRBuilder from "../core/tool/QRBuilder";

const {ccclass, property} = cc._decorator

@ccclass
export default class HomeScene extends BaseScene {
    // 预加载
    @property([cc.Prefab])
    private preloadPrefab: cc.Prefab[] = []

    @autoBind(cc.Button)
    private startButton: cc.Button

    @autoBind(cc.Button)
    private helpButton: cc.Button

    public onLoad() {
        this.bindTouch(this.startButton, this.connectServer)
        this.bindTouch(this.helpButton, () => {Utils.tip([i18n('我一充钱'), i18n('快乐七天')])})
        this.onRegMessage()
    }

    public onRegMessage() {
        Net.regMsg(Msg.RES_LOGIN, data => {
            Data.player.updateSelfPlayer(data)
        })
    }

    private connectServer() {
        Net.connect(ServerUrl, this.enterHomeScene.bind(this))
    }

    private enterHomeScene(data) {
        Utils.loading()
        UIMgr.pushScenePre('scene/HomeScene', () => {
            Utils.hideLoading()
        })
    }
}