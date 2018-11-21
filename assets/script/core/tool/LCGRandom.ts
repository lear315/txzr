/**
 * 线性同余随机发生器
 */

/**
 * I n+1=aI n+c(mod m)生成的伪随机数序列最大周期m，范围在0到m-1之间.Hull-Dobell定理:
 * 1.c与m互质
 * 2.a - 1可以被m的所有质因数整除
 * 3.如果m是4的倍数，a - 1也必须是4的倍数
 * a=9301, c = 49297, m = 233280这组参数满足
 */

export default class LCGRandom{
    private lcgRandomSeed: number = 1

    public setLcgSeed(seed: number) {
        this.lcgRandomSeed = seed
    }
    
    public lcgRandom(min: number, max: number): number {
        min = min || 0
        max = max || 1
        this.lcgRandomSeed = (this.lcgRandomSeed * 9301 + 49297) % 233280
        const rnd = this.lcgRandomSeed / 233280.0
        return min + rnd * (max - min)
    }
    
    public lcgRandomInt(min: number, max: number): number {
        min = min || 0
        max = max || 1
        this.lcgRandomSeed = (this.lcgRandomSeed * 9301 + 49297) % 233280
        const rnd = this.lcgRandomSeed / 233280.0
        return min + Math.floor(rnd * (max - min + 1))
    }
}

