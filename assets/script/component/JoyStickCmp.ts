/**
 * 游戏摇杆
 */

import BaseComponent from "../core/BaseComponent"
import { log, errlog } from "../core/helper/LogHelper";

const { ccclass, property } = cc._decorator

enum TouchType {
    DEFAULT = 0,
    FOLLOW =  1
}

enum DirectionType {
    FOUR = 0,
    EIGHT = 1,
    ALL = 2
}

export enum Dir {
    Center = null, // 无方向
    Up = 90, // 上
    Down = 270, // 下
    Left = 180, // 左
    Right = 0, // 右
    LeftUp = 135, // 左上
    LeftDown = 225, // 左下
    RightUp = 45, // 右上
    RightDown = 315 // 右下 
}

@ccclass
export default abstract class JoyStickCmp extends BaseComponent {

    // 控制杆
    @property(cc.Node)
    private stickBar: cc.Node = null

    // 控制杆背景
    @property(cc.Node)
    private stickBg: cc.Node = null

    // 半径
    @property(cc.Float)
    private radius: number = 0

    // 操作类型
    @property({type: cc.Enum(TouchType)})
    private touchType: TouchType = TouchType.DEFAULT

    // 方向类型
    @property({type: cc.Enum(DirectionType)})
    private directionType: DirectionType = DirectionType.ALL

    // 半径
    @property(cc.Integer)
    private defaultOpacity: number = 200

    //触控区域
    @property(cc.Node)
    private touchArea: cc.Node = null

    //当前角度
    private curAngle: number = 0

    //当前距离
    private distance: number = 0

    // 操作阈值(敏感度)
    private threshold: number = 10

    // 触发事件标志
    private isTrigger: boolean = false

    // 初始位置
    private initPos: cc.Vec2 

    // 角度改变回调
    private changeCallback

    public onLoad() {
        this.node.opacity = this.defaultOpacity
        this.initPos = this.node.position
        if (this.radius === 0) {
            this.radius = this.stickBg.width * this.stickBg.scale / 2
        }
        if (!this.touchArea) {
            const canvas = cc.find('Canvas')
            if (canvas) {
                // 如果没有设置触控区域,优先使用canvas节点5
                this.touchArea = canvas
            } else {
                // 如果没有设置触控区域,那么默认触控区域2000
                this.touchArea = new cc.Node()
                this.touchArea.parent = this.node.parent
                this.touchArea.setContentSize(2000, 2000)
            }
        }
        this.registerTouch()
    }

    public setChangeListener(callback) {
        this.changeCallback = callback
    }

    private registerTouch() {
        this.touchArea.on(cc.Node.EventType.TOUCH_START, (event) => {
            this.onTouchStart(event)
        }, this)

        this.touchArea.on(cc.Node.EventType.TOUCH_MOVE, (event) => {
            this.onTouchMove(event)
        }, this)

        this.touchArea.on(cc.Node.EventType.TOUCH_END, (event) => {
            this.onTouchEnd(event)
        }, this)

        this.touchArea.on(cc.Node.EventType.TOUCH_CANCEL, (event) => {
            this.onTouchCancel(event)
        }, this)
    }

    private onTouchStart(event: cc.Event.EventTouch) {
        //如果触摸类型为FOLLOW，则摇控杆的位置为触摸位置,触摸开始时候现形
        if (this.touchType == TouchType.FOLLOW) {
            const touchPos = this.node.parent.convertToNodeSpaceAR(event.touch.getLocation())
            this.node.setPosition(touchPos)
            this.isTrigger = true
            return
        } else {
            // 把触摸点坐标转换为相对与目标的模型坐标
            const touchPos = this.node.convertToNodeSpaceAR(event.touch.getLocation())
            //点与圆心的距离
            const distance = touchPos.sub(cc.v2(0, 0)).mag()
            //如果点与圆心距离小于圆的半径,且大于操作阈值,触控成功
            if (distance < this.radius && distance > this.threshold) {
                this.node.opacity = 255
                this.stickBar.setPosition(touchPos)
                this.updateAngle(touchPos)
                this.isTrigger = true
                return
            }
        }
        this.isTrigger = false
    }


    private onTouchMove(event: cc.Event.EventTouch) {
        if (!this.isTrigger) {
            return
        }
        const touchPos = this.node.convertToNodeSpaceAR(event.touch.getLocation())
        const distance = touchPos.sub(cc.v2(0, 0)).mag()
        if (this.radius >= distance) {
            //如果点与圆心距离小于圆的半径,控杆跟随触摸点
            if(distance > this.threshold){
                this.node.opacity = 255
                this.stickBar.setPosition(touchPos)
                // 更新角度
                this.updateAngle(touchPos)
            }else {
                this.node.opacity = this.defaultOpacity
                // 摇杆恢复位置
                this.stickBar.setPosition(cc.v2(0,0))
                this.curAngle = null
                // 通知角度变化回调
                this.emitAngle(this.curAngle)
            }
        } else {
            const x = Math.cos(this.calcuRadian(touchPos)) * this.radius
            let y = Math.sin(this.calcuRadian(touchPos)) * this.radius
            if(touchPos.y < 0){
                // 在三四象限的时候,y要调整
                y *= -1;
            }
            this.stickBar.setPosition(cc.v2(x, y))
            this.updateAngle(touchPos)
        }
    }

    private onTouchEnd(event: cc.Event.EventTouch) {
        if (!this.isTrigger) {
            return
        }
        this.isTrigger = false
        this.resetStick()
    }

    private onTouchCancel(event: cc.Event.EventTouch) {
        this.resetStick()
    }

    // 更新方向
    private updateAngle(point) {
        this.curAngle = Math.floor(this.calcuRadian(point) * 180 / Math.PI)

        if(point.x>0 && point.y<0 || point.x<0 && point.y<0) {
            this.curAngle = 360 - this.curAngle

        }else if(point.x<0 && point.y==0) {
            this.curAngle = 180

        }else if(point.x>0 && point.y==0) {
            this.curAngle = 0

        }else if(point.x==0 && point.y>0){
            this.curAngle = 90

        }else if(point.x==0 && point.y<0){
            this.curAngle = 270
        }
        this.formatAngle()
    }

    private formatAngle() {
        switch (this.directionType)
        {
            case DirectionType.FOUR:
                this.curAngle = this.fourDirections()
                break

            case DirectionType.EIGHT:
                this.curAngle = this.eightDirections()
                break

            case DirectionType.ALL:
                this.curAngle = this.curAngle
                break

            default :
                this.curAngle = null
                break
        }
        this.emitAngle(this.curAngle)
    }

    // 格式化方向(四方向)
    private fourDirections() {
        if(this.curAngle >= 45 && this.curAngle <= 135) {
            return Dir.Up

        } else if(this.curAngle >= 225 && this.curAngle <= 315) {
            return Dir.Down

        } else if(this.curAngle <= 225 && this.curAngle >= 180 || this.curAngle >= 135 && this.curAngle <= 180) {
            return Dir.Left

        } else if(this.curAngle <= 360 && this.curAngle >= 315 || this.curAngle >= 0 && this.curAngle <= 45) {
            return Dir.Right

        }
    }

    // 格式化方向(四方向)
    private eightDirections() {
        if(this.curAngle >= 67.5 && this.curAngle <= 112.5) {
            return Dir.Up

        } else if(this.curAngle >= 247.5 && this.curAngle <= 292.5) {
            return Dir.Down

        } else if(this.curAngle <= 202.5 && this.curAngle >= 180 || this.curAngle >= 157.5 && this.curAngle <= 180) {
            return Dir.Left

        } else if(this.curAngle <= 360 && this.curAngle >= 337.5 || this.curAngle >= 0 && this.curAngle <= 22.5) {
            return Dir.Right

        } else if(this.curAngle >= 112.5 && this.curAngle <= 157.5) {
            return Dir.LeftUp
            
        } else if(this.curAngle >= 22.5 && this.curAngle <= 67.5) {
            return Dir.RightUp
            
        } else if(this.curAngle >= 202.5 && this.curAngle <= 247.5) {
            return Dir.LeftDown
            
        } else if(this.curAngle >= 292.5 && this.curAngle <= 337.5) {
            return Dir.RightDown
            
        }
    }

    // 推送更新方向通知
    private emitAngle(angle) {
        if (this.changeCallback) {
            try {
                this.changeCallback(angle)
            } catch (error) {
                errlog(error)
            }
        }
    }

    private resetStick() {
        this.node.opacity = this.defaultOpacity
        //如果触摸类型为FOLLOW，离开触摸后隐藏
        if(this.touchType == TouchType.FOLLOW){
            this.node.position = this.initPos
        }
        this.stickBar.setPosition(cc.v2(0,0))
        this.curAngle = null
        this.emitAngle(this.curAngle)
    }

    // 计算弧度
    private calcuRadian(point) {
        const z = Math.sqrt(Math.pow(point.x,2)+Math.pow(point.y,2))
        if (z === 0) {
            return 0
        } else {
            return Math.acos(point.x/z)
        }
    }

    public onDestroy() {
        this.changeCallback = null
    }


}