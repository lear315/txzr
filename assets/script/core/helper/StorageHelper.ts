/**
 * Stroage存储
 */

export default class StorageHelper {
    private static _instance: StorageHelper
    // 是否是微信环境下
    private static _isWx: boolean

    // 获取单例
    public static get Ins(): StorageHelper {
        try {
            wx.getStorageSync("wx")
            StorageHelper._isWx = true
        } catch (e) {
            StorageHelper._isWx = false
        }
        return StorageHelper._instance || (StorageHelper._instance = new StorageHelper())
    }

    /**
     * 设置键值
     */
    public setItem(key: string, val) {
        if (StorageHelper._isWx) {
            // 判断如果存在wx上下文
            wx.setStorageSync({key, data: val})
        } else {
            cc.sys.localStorage.setItem(key, val)
        }
    }

    /**
     * 获取键值
     */
    public getItem(key: string) {
        if (StorageHelper._isWx) {
            const data = wx.getStorageSync({key})
            return data
        } catch (e) {
            const data = cc.sys.localStorage.getItem(key)
            return data
        }
    }

    /**
     * 清空存储数据
     */
    public clear() {
        if (StorageHelper._isWx) {
            wx.clearStorageSync({})
        } else {
            cc.sys.localStorage.clear()
        }
    }
    
    /**
     * 设置键值(异步) 
     */
    public setItemAsync(key: string, val): Promise<any> {
        return new Promise((resolve, reject) => {
            if (StorageHelper._isWx) {
                // 判断如果存在wx上下文
                wx.setStorage({
                    key,
                    data: val,
                    success: () => resolve(),
                    fail: e => reject(e.errMsg)
                })
            } else {
                cc.sys.localStorage.setItem(key, val)
                resolve()
            }
        })
    }

    /**
     * 获取键值(异步)
     */
    public getItemAsync(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (StorageHelper._isWx) {
                wx.getStorage({
                    key,
                    success: res => {
                        if (res && res.errMsg.test(/ok/)) {
                            resolve(res.data)
                        } else if (res.errMsg.test(/fail data not found/)) {
                            resolve(undefined)
                        } else {
                            reject(res.errMsg)
                        }
                    },
                    fail: res => reject(res.errMsg)
                })
            } else {
                const data = cc.sys.localStorage.getItem(key)
                resolve(data)
            }
        })
    }

    /**
     * 清空存储数据(异步)
     */
    public static clearAsync(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (StorageHelper._isWx) {
                wx.clearStorage({
                    success: data => resolve(data.errMsg),
                    fail: e => reject(e.errMsg)
                })
            } else {
                cc.sys.localStorage.clear()
                resolve()
            }
        })
    }
} 

