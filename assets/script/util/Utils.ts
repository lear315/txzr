/**
 * 工具
 */
import { log } from "../core/helper/LogHelper"
import ToastCtrl from "../ctrl/ToastCtrl"
import { Game } from "../GameManager";

export enum UIlevel {
    Msg = 1000,
    Mask = 900
}

export default class Utils {
    /**
     * tip框
     */
    public static tip(content: string[] | string) {
        Utils.insPrefab('prefab/common/ToastPrefab').then((node: cc.Node) => {
            const toast: ToastCtrl = node.getComponent(ToastCtrl)
            Utils.getSceneCanvas().addChild(node, UIlevel.Msg)
            toast.show(content)
        })
    }

    /**
     * tip框
     */
    public static loading() {
        Utils.insPrefab('prefab/common/LoadingPrefab').then((node: cc.Node) => {
            node.name = 'loadingNode'
            Utils.getSceneCanvas().addChild(node, UIlevel.Mask)
        })
    }

    public static hideLoading() {
        const loadingNode = Utils.getSceneCanvas().getChildByName('loadingNode')
        if (loadingNode) {
            loadingNode.removeFromParent()
        }
    }

    /**
     * 创建预制件节点
     */
    public static insPrefab(ctrlName: string, count?: number) {
        return new Promise((resolve, reject) => {
            cc.loader.loadRes(ctrlName,  (err, prefab) => {
                if (err) {
                    log(err, ctrlName)
                    reject()
                }
                if (count && count > 0) {
                    const nodes = []
                    for (let i = 0; i < count; i ++) {
                        const node = cc.instantiate(prefab)
                        if (!node) reject()
                        nodes.push(node)
                    }
                    resolve(nodes)

                } else {
                    const node = cc.instantiate(prefab)
                    if (!node) reject()
                    resolve(node) 
                }
            })
        })
    }

    public static getSceneCanvas(): cc.Node {
        return cc.Canvas.instance.node
    }
}