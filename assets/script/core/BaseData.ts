import { errlog } from "./helper/LogHelper";

/**
 * 数据实例基类
 */

export default abstract class BaseData {
    private _events: any[] = []

    /**
     * 监听事件
     */
    public on(eventName, callback) {
        if (!this._events[eventName]) {
            this._events[eventName] = []
        }
        this._events[eventName].push(callback)
    }

    /**
     * 触发事件
     */
    public emit(eventName, payload?) {
        if (this._events[eventName]) {
            const events = [...this._events[eventName]]
            events.reverse().forEach((event, index) => {
                try {
                    if (event) {
                        event(payload)
                    } else {
                        errlog('触发回调事件异常')
                        this._events[eventName].splice(events.length - 1 - index, 1)
                    }
                } catch (e) {
                    errlog(`触发回调事件异常:${e}`)
                    this._events[eventName].splice(events.length - 1 - index, 1)
                }
            })
        }
    }
}