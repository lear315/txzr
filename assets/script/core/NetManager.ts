/**
 * Sokect管理类
 */
import { log } from "./helper/LogHelper"

export enum SocketState {
    Connect = 0,
    Disconnect = 1,
}

export default class NetManager {
    private socket
    private connectCallFunc
    private state: SocketState
    private listener: Map <any, any> = new Map()
    private onceListener: Map <any, any> = new Map()

    public constructor() {
    }

    public connect(ip, connectCallFunc?: () => any) {
        this.connectCallFunc = connectCallFunc
        this.socket = io.connect(ip, {"force new connection" : true});
        this.socket.on("connect", this.onConnect.bind(this))
        this.socket.on("message", this.onMessage.bind(this))
        this.socket.on("disconnect", this.onDisconnect.bind(this))
        this.socket.on("error", this.onError.bind(this))
    }

    public onConnect() {
        this.state = SocketState.Connect
        if (this.connectCallFunc && typeof (this.connectCallFunc) === 'function') {
            this.connectCallFunc()
        }
    }

    public onMessage(message) {
        try { 
            const msg = JSON.parse(message)
            this.pubMsg(msg.id, msg.content)
            log(msg.id, msg.content)
        } catch (err) { 
            log(err)
        } 
    }

    public onDisconnect() {
        this.state = SocketState.Disconnect
        log('socket disconnect')
    }

    public onError() {
        log('socket error')
    }

    public send(msgId, content, callback?: (content?) => void) {
        log('send', msgId, content)
        if (callback && typeof(callback) === 'function') {
            this.regOnceMsg(msgId, callback)
        }
        const msg: any = {}
        msg.id = msgId
        if (content) {
            msg.content = content
        }
        this.socket.emit(msg.id, JSON.stringify(msg))
    }

    /**
     * 注册单次回调
     */
    public regOnceMsg(id, callback: (content?) => void) {
        if (typeof (callback) !== 'function') {
            log(`regOnceMsg ${id} callback isn't function`)
            return
        }
        if (false === this.onceListener.has(id)) {
            this.onceListener.set(id, new Map())
        }
        const callbacks = this.onceListener.get(id)
        callbacks.set(callback, true)
    }

    /**
     * 注册消息监听
     */
    public regMsg(id, callback: (content?) => void) {
        if (typeof (callback) !== 'function') {
            log(`regMsg ${id} callback isn't function`)
            return
        }
        if (false === this.listener.has(id)) {
            this.listener.set(id, new Map())
        }
        const callbacks = this.listener.get(id)
        callbacks.set(callback, true)
    }

    /**
     *  取消消息监听
     */
    public unRegMsg(id, callback?: (content?) => void) {
        const callbacks = this.listener.get(id)
        if (!callbacks) return
        if (callback) {
            callbacks.has(callback) && callbacks.delete(callback)
        } else {
            this.listener.delete(id)
        }
    }

    /**
     * 推送消息
     */
    private pubMsg(id, content) {
        log('recv', id, content)
        if (false === this.listener.has(id)) {
            return
        }
        const callbacks = this.listener.get(id)
        callbacks.forEach((v, callfunc, m) => {
            callfunc(content)
        })

        const callbacksOnce = this.onceListener.get(id)
        callbacksOnce.forEach((v, callfunc, m) => {
            callfunc(content)
        })
        this.onceListener.delete(id)
    }

}
