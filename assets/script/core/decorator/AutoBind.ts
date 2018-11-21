/**
 * 装饰器
 * lear
 */
import { log } from "../helper/LogHelper";

/**
 * 自动绑定Scene或者Prefab下的组件或者节点
 * @param type 
 */
export function autoBind<T extends cc.Component | cc.Node>(type: { prototype: T }) {
    return (target: any, propertyKey: string) => {
        log(type + ', '  + ', ' + target + ', ' + propertyKey)
        target.setAutoBind(true)
        if (!target._autoBindKey) {
            target._autoBindKey = {}
        }
        target._autoBindKey[propertyKey] = type
    }
}