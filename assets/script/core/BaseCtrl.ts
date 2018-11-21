/**
 * 视图控制基类
 */
import BaseComponent from "./BaseComponent"

const { ccclass, property } = cc._decorator

@ccclass
export default abstract class BaseCtrl extends BaseComponent {
    constructor() {
        super()
    }

}