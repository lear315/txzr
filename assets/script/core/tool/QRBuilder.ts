import { errlog } from "../helper/LogHelper";


/**
 * 二维码生成器
 */

export default class QRBuilder{

    public static getQR(content: string, size: number = 100): cc.Node {
        if (!content) {
            errlog('getQR content is undifine')
            return 
        }
        const qrcode = new QRCode(-1, QRErrorCorrectLevel.H)
        qrcode.addData(content)
        qrcode.make()
        
        const qrNode = new cc.Node('qrNode')
        qrNode.setAnchorPoint(cc.v2(0.5, 0.5))
        qrNode.setContentSize(size, size)
        
        const ctx = qrNode.addComponent(cc.Graphics)
        ctx.fillColor = cc.Color.BLACK

        const tileW = qrNode.width / qrcode.getModuleCount()
        const tileH = qrNode.height / qrcode.getModuleCount()

        for (let row = 0; row < qrcode.getModuleCount(); row++) {
            for (let col = 0; col < qrcode.getModuleCount(); col++) {
                if (qrcode.isDark(row, col)) {
                    ctx.fillColor = cc.Color.BLACK
                } else {
                    ctx.fillColor = cc.Color.WHITE
                }
                const w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW))
                const h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW))
                ctx.rect(Math.round(col * tileW), Math.round(row * tileH), w, h)
                ctx.fill()
            } 
        }

        return qrNode
    }

}
