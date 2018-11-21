/**
 * 主场景
 */
import BaseScene from "../core/BaseScene"
import { autoBind } from "../core/decorator/AutoBind"
import Utils from "../util/Utils"
import { UIMgr, Net} from "../GameManager"
import { i18n } from "../core/I18nManager"
import { Msg } from "../net/MsgDefine";


const {ccclass, property} = cc._decorator

@ccclass
export default class HomeScene extends BaseScene {
    @autoBind(cc.Button)
    private fightBtn: cc.Button

    @autoBind(cc.Button)
    private activityFightBtn: cc.Button

    @autoBind(cc.Button)
    private adBtn: cc.Button

    @autoBind(cc.Button)
    private gitBtn: cc.Button

    private _findBattleSche

    private _gitCount = 0

    public onLoad() {
        this.bindTouch(this.fightBtn, this.enterHouse)
        this.bindTouch(this.activityFightBtn, () => {Utils.tip(i18n('非常抱歉!只有尊贵的VIP才有资格进入.'))})
        this.bindTouch(this.adBtn, () => {Utils.tip([i18n('是你叫我打广告的啊，我从来没听过这样的要求'), i18n('....关注微信公众号极客小厨房')])})
        this.bindTouch(this.gitBtn, this.goGit)

        this.onRegMessage()
    }

    public onRegMessage() {
        
    }

    private enterHouse() {
        Utils.loading()
        this.showFindBattle()
        UIMgr.loadScenePre('scene/BattleScene')
        this.send(Msg.REQ_JOINHOUSE, {}).then((data: any) => {
            if (data.result) {
                this.enterBattleScene()
            }
        })
    }

    private showFindBattle() {
        this._findBattleSche = this.schedule(()=> {
            Utils.tip(i18n('匹配中..'))
        }, 1)
    }

    private hideFindBattle() {
        if (this._findBattleSche) {
            this.unschedule(this._findBattleSche)
            this._findBattleSche = null
        }
    }

    private enterBattleScene() {
        Utils.loading()
        UIMgr.pushScenePre('scene/BattleScene', () => {
            Utils.hideLoading()
        })

        this.hideFindBattle()
    }

    private goGit() {
        if (this._gitCount === 0) {
            Utils.tip(i18n('如果你点100下,就会有好事发生!.'))
        } else if (this._gitCount === 100) {
            this._gitCount = 0
            Utils.tip('真够无聊的你')
            this.scheduleOnce(() => {
                cc.sys.openURL(GAME_URL)
            }, 2)
        } else {
            Utils.tip(i18n('美好的事情即将来临%d.').replace('%d', (100 - this._gitCount) + ''))
        }
    }
        
        
}