/**
 * 英雄控制
 */
import BaseCtrl from "../../core/BaseCtrl"
import { autoBind } from "../../core/decorator/AutoBind"
import { log } from "../../core/helper/LogHelper";
import { changeAngle } from "../../core/helper/3DHelper";
const {ccclass, property} = cc._decorator

export enum HeroState {
    Idle = 0,
    Run = 1,
    Attack = 2,
}
const attackTime = 60

@ccclass
export default class HeroCtrl extends BaseCtrl {
    private speed: number = 300
    private offset: cc.Vec2 = cc.v2(0, 0)
    private curState: HeroState = HeroState.Idle

    @autoBind(cc.SkeletonAnimation)
    private stoneKing: cc.SkeletonAnimation

    @autoBind(cc.Sprite)
    private clockSprite: cc.Sprite

    @autoBind(cc.Label)
    private nameLabel: cc.Label

    public onLoad() {
        this.clockAction()
    }

    public clockAction() {
        this.clockSprite.node.runAction(cc.repeatForever(
            cc.sequence(
                cc.scaleTo(0.5, 1.2),
                cc.scaleTo(0.5, 1)
            )
        ))
    }

    public heroMove(angle) {
        if (angle === null) {
            this.offset = cc.v2(0, 0)
            return
        }

        const angelvec4 = changeAngle(Math.PI / 180 * (angle + 90), 0, Math.PI / 180 * 90)
        this.stoneKing.node.setRotation(angelvec4.qw, angelvec4.qx, angelvec4.qy, angelvec4.qz)

        if (angle === 0 || angle === 180 || angle === 90) {
            this.offset = cc.v2(Math.floor(Math.cos(Math.PI / 180 * angle)), Math.floor(Math.sin(Math.PI / 180 * angle)))

        } else if (angle === 270) {
            this.offset = cc.v2(Math.ceil(Math.cos(Math.PI / 180 * angle)), Math.floor(Math.sin(Math.PI / 180 * angle)))

        } else {
            this.offset = cc.v2(Math.cos(Math.PI / 180 * angle), Math.sin(Math.PI / 180 * angle));
        }
    }
 
    public update(dt) {
        let interpolation = 1
        if (this.curState !== HeroState.Attack) {
            if (this.offset.x === 0 && this.offset.y === 0) {
                this.idle()
            } else {
                this.run()
            }
        } else {
            interpolation = 0.05
        }

        const nextX = this.node.x + this.offset.x * this.speed * dt * interpolation
        const nextY = this.node.y + this.offset.y * this.speed * dt * interpolation
        this.node.setPosition(nextX, nextY)
    }

    /**
     * 攻击
     */
    public attack(type) {
        if (this.curState === HeroState.Attack) {
            return
        }
        this.curState = HeroState.Attack
        // if (type === 1) {
        //     this.spine.animation = `punch1`
        // } else {
        //     this.spine.animation = `meleeSwing1`
        // }
        
        // this.spine.loop = false
        this.scheduleOnce(() => {
            this.idle()
        }, 0.2)
    }

    /**
     * 休息
     */
    public idle() {
        if (this.curState === HeroState.Idle) {
            return
        }
        this.curState = HeroState.Idle
       // this.spine.animation = 'idle'
        // this.spine.loop = true
    }

    /**
     * 跑
     */
    public run() {
        if (this.curState === HeroState.Run) {
            return
        }
        this.curState = HeroState.Run
        // this.spine.animation = 'run'
        // this.spine.loop = true
    }
 
}