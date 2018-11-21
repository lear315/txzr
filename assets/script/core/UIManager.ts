/**
 * UI管理类
 */
import { log } from "./helper/LogHelper"

export default class UIManager {
    constructor() {
        
    }

    /**
     * 进入场景
     */
    public pushScene(sceneName: string) {
        cc.director.runScene(sceneName)
    }

    /**
     * 预加载进入场景
     */
    public pushScenePre(sceneName: string, callfunc?) {
        cc.director.preloadScene(sceneName, (err, res)=> {
            if (err) {
                log(`pushScenePre ${sceneName} faild`)
                return
            }
            callfunc && callfunc()
            cc.director.runScene(res.scene)
        })
    }


    /**
     * 预加载场景
     */
    public loadScenePre(sceneName: string, callfunc?) {
        return new Promise((resolve, reject) => {
            cc.director.preloadScene(sceneName, (err, res)=> {
                if (err) {
                    reject()
                    log(`pushScenePre ${sceneName} faild`)
                    return
                }
                callfunc && callfunc(res.scene)
                resolve(res.scene)
            })
        })
    }


}