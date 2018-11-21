/**
 * 英雄控制
 */
import BaseCtrl from "../core/BaseCtrl"
import { autoBind } from "../core/decorator/AutoBind"

const {ccclass, property} = cc._decorator

@ccclass
export default class ToastCtrl extends BaseCtrl {
    private showTime = 0.5

    @autoBind(cc.Label)
    private tipLabel: cc.Label

    public onLoad() {
    
    }

    public show(content: string[]| string) {
        if (Array.isArray(content)) {
            const showContent = content.join('\n')
            this.tipLabel.string = showContent
        } else {
            this.tipLabel.string = content
        }
        this.action()
    }

    private action() {
        this.node.runAction(
            cc.spawn(  
                cc.moveBy(1, cc.v2(0, 100)),          
                cc.sequence(
                    cc.fadeIn(0.25),
                    cc.delayTime(this.showTime),
                    cc.fadeOut(0.25),
                    cc.callFunc(() => { this.removeIt() }),
                )
            )

        )
    }

    private removeIt() {
        this.node.removeFromParent()
    }
}