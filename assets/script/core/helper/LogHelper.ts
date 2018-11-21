
export let logState: boolean = CC_DEBUG

export function log(content: any, ...subst: any[]) {
    if (logState) {
        // showInScene(content)
        console.log(content, ...subst)
    }
}

export function errlog(content: any, ...subst: any[]) {
    if (logState) {
        console.warn("ERROR: " + content, ...subst) 
    }
}

export function logTime(name: string, finish?: boolean) {
    if (logState) {
        if (finish) {
            console.timeEnd(name)
        } else {
            console.time(name)
        }
    }
}

/**
 * 显示内容在场景中
 * @param content 
 */
export function showInScene(content: string) {
    const scene = cc.director.getScene()
    if (scene) { 
        let logLabelNode = cc.director.getScene().getChildByName('logLabelNode')
        if (!logLabelNode) {
            logLabelNode = new cc.Node()
            logLabelNode.addComponent(cc.Label)
            logLabelNode.name = 'logLabelNode'
            logLabelNode.setAnchorPoint(0, 0)
            scene.addChild(logLabelNode)
        }
        logLabelNode.getComponent(cc.Label).string = content || ''
    }
}