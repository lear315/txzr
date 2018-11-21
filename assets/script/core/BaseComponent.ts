/**
 * 组件基类
 * lear
 */
import { errlog, logTime } from "./helper/LogHelper";
import { Net } from "../GameManager";
const { ccclass, property } = cc._decorator

@ccclass
export default abstract class BaseComponent extends cc.Component {
    // 是否启用节点自动绑定
    private _isAutoBind
    // 自动绑定内容
    public _autoBindKey

    constructor() {
        super()
        this.init()
    }

    public getAutoBind() {
        return this._isAutoBind
    }

    public setAutoBind(flag) {
        this._isAutoBind = flag
    }

    public __preload() {
        if (!this._isAutoBind) {
            return
        }
        logTime('autoBind ==>' + this.name)
        this.autoBind(this.node, this)
        logTime('autoBind ==>' + this.name, true)
    } 

    private autoBind(node: cc.Node, target) {
        node.children.forEach(childNode => {
            const name = childNode.name
            const type = this._autoBindKey && this._autoBindKey[name]
            if (type) {
                if (type === cc.Node) {
                    target[name] = childNode
                } else {
                    target[name] = childNode.getComponent(type)
                }
            }
            this.autoBind(childNode, target)
        })
    }

    public init() {

    }

    /**
     * 获取子节点
     * @param pathName 路径名
     */
    public getChild(pathName: string): cc.Node {
        if (pathName) {
            return cc.find(pathName, this.node)
        } else {
            errlog(`getChild ${pathName} not found`)
        }
    }

    /**
     * 获取子节点组件
     * @param pathName 路径名
     * @param type 组件名
     */
    public getComp<T extends cc.Component>(pathName: string, type: { prototype: T}): T {
        const node = this.getChild(pathName)
        if (!node) {
            return 
        }
        const comp = node.getComponent(type)
        if (!comp) {
            errlog(`getComp ${pathName} not found componment`)
            return
        }
        return comp
    }

    /**
     * 获取子节点或组件
     */
    public getEasy(pathName: string, type?): any {
        if (pathName) {
            const node: cc.Node = cc.find(pathName, this.node)
            if (type && node) {
                const comp = node.getComponent(type)
                return comp
            } else {
                return node
            }
        } else {
            errlog(`getChild ${pathName} not found`)
        }
    }

    /**
     * 绑定监听
     * @param obj 绑定对象
     * @param callBack 回调事件
     * @param eventType 触控类型（默认点击抬起）
     */
    public bindTouch(obj: cc.Node | cc.Component, callBack: (event: cc.Event.EventCustom) => void, eventType: string = cc.Node.EventType.TOUCH_END) {
        const node = obj instanceof cc.Node ? obj : obj.node 
        if (node) {
            node.on(eventType, callBack, this)
        }
        return obj
    }

    /**
     * 请求数据
     */
    public send(msgId, content, callback?: (data?) => void) {
        return new Promise((resolve, reject) => {
            Net.send(msgId, content, data => {
                callback && callback(data)
                resolve(data)
            })
        })
    }

    /**
     * 监听网络数据回调
     */
    public regMsg(msgId, callback?: (data?) => void) {
        return new Promise((resolve, reject) => {
            Net.regMsg(msgId, data => {
                callback && callback(data)
                resolve(data)
            })
        })
    }

}
    