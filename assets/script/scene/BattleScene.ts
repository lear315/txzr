/**
 * 战斗场景
 */
import BaseScene from "../core/BaseScene";
import JoyStickCmp from "../component/JoyStickCmp";
import HeroCtrl from "../ctrl/battle/HeroCtrl";
import { log } from "../core/helper/LogHelper";
import { autoBind } from "../core/decorator/AutoBind"
import Utils from "../util/Utils";

const {ccclass, property} = cc._decorator

@ccclass
export default class BattleScene extends BaseScene {
    @property([cc.Prefab])
    private preloadPrefab: cc.Prefab[] = []

    private hero: HeroCtrl

    @autoBind(cc.Button)
    private fireBtn: cc.Button

    @autoBind(cc.Button)
    private fireBtn2: cc.Button

    @autoBind(JoyStickCmp)
    private joyStick: JoyStickCmp

    @autoBind(cc.Node)
    private bgLayer: cc.Node

    public onLoad() {
        this.bindTouch(this.fireBtn, () => (this.onFire(1)))
        this.bindTouch(this.fireBtn2, () => (this.onFire(2)))
        this.joyStick.setChangeListener(this.joyEvent.bind(this))
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.keyBoardEvent, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.keyBoardEvent, this)

        this.loadHero()

        // Utils.loading()
        // this.send(Msg.REQ_BATTLE, {}).then(() => {
        //     Utils.hideLoading()
        //     log('开始')
        // })
    }

    public loadHero() {
        Utils.insPrefab('prefab/battle/HeroPrefab').then((node: cc.Node) => {
            this.bgLayer.addChild(node)
            this.hero = node.getComponent('HeroCtrl')
        })

        // Utils.insPrefab('prefab/battle/HeroPrefab').then((node: cc.Node) => {
        //     this.bgLayer.addChild(node)
        // })

        // Utils.insPrefab('prefab/battle/HeroPrefab').then((node: cc.Node) => {
        //     this.bgLayer.addChild(node)
        // })

    }

    private onFire(type) {
        this.hero && this.hero.attack(type)
    }

    private keyBoardEvent(event) {
        if (event.type !== "keydown") {
            this.joyEvent(null)
            return 
        }
        switch(event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.joyEvent(180)
                break
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.joyEvent(0)
                break
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.joyEvent(270)
                break
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.joyEvent(90)
                break
        }
    }

    private joyEvent(angel) {
        log(angel)
        this.hero && this.hero.heroMove(angel)
    }

}