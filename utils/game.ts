// ## 写出一个抽奖页面:
// - 有200个人参加抽奖，每次抽出一个人，不能重复，必须每个人都要抽中奖
// - 前面10次抽奖要选中固定的10个人，每次就从这10人中随机抽取一人，不能重复
// - 从第11次开始就从剩余的190人当中抽奖，不能重复，直到抽奖结束
// - 已经中过奖的人不能再次抽奖

/**
 *
 * @param {Array} data 参与抽奖总人数
 * @param {Number} num 抽中的人数
 * @param {Array} preset 预设的中奖人数
 */

export type IPrice = {
  data: string[]
  num?: number
  preset?: string[]
  onEnd?: () => void
}
export default class Price {
  private initPerson: string[]
  num: number
  restPerson: string[]
  specialPerson: string[]
  selected: string[]
  current: string
  index: number
  totalLen: number
  specialLen: number
  onEnd: () => void
  constructor({ data = [], num = 0, preset = [], onEnd = () => {} }: IPrice) {
    if (!Array.isArray(data)) {
      throw new TypeError(`parameter data must be an array!`)
    }
    if (!Array.isArray(preset)) {
      throw new TypeError(`parameter preset must be an array!`)
    }
    if (!/^[0-9]\d*$/.test(Number(num).toString())) {
      throw new TypeError(`parameter num must be an integer!`)
    }
    if (preset.length > data.length) {
      throw new TypeError(
        `the length of parameter preset should be less than the length of parameter data!`
      )
    }
    if (num > data.length) {
      throw new TypeError(
        `the num should be less than the length of parameter data!`
      )
    }
    this.initPerson = Array.isArray(data) ? data : [] // 总人数
    this.restPerson = this.initPerson.map((item) => item) // 剩余人数
    this.selected = []
    this.current = ''
    this.index = 0
    this.totalLen = this.initPerson.length
    this.num = Number(num) || this.totalLen
    this.specialPerson = preset || [] // 预设人数
    this.specialLen = this.specialPerson.length
    this.onEnd = onEnd
    // init execute shuffle
    this.shuffle()
  }
  run() {
    // 生成随机数
    if (this.index >= this.num) {
      this.onEnd?.()
      return
    }
    if (this.index >= this.specialLen) {
      // 剩余的
      if (this.restPerson.length == 0) return
      let inx = this.random(0, this.restPerson.length)
      let name = this.restPerson[inx]
      if (!this.selected.includes(name)) {
        this.selected.unshift(name)
        this.current = name
        this.restPerson.splice(inx, 1)
      }
    } else {
      // 前几个人
      if (this.specialPerson.length == 0) return
      let inx = this.random(0, this.specialPerson.length)
      let name = this.specialPerson[inx]
      if (!this.selected.includes(name)) {
        this.selected.unshift(name)
        this.current = name
        this.specialPerson.splice(inx, 1)
        this.restPerson.splice(this.restPerson.indexOf(name), 1)
      }
    }
    this.index = this.selected.length
    if (this.index === this.totalLen) {
      this.onEnd?.()
    }
  }
  random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min
  }
  /**
   * data shuffle
   */
  shuffle() {
    const data = this.initPerson
    let result: string[] = []
    result = this.solution(data)
    this.restPerson = result
    this.selected = []
    this.current = ''
    this.index = 0
    return result
  }
  /**
   *
   * @param data 随机洗牌算法,
   * 1 生成[0, totalLen]的有序数组orders
   *  2 从orders中随机去一个数，与数据项内容拼接，结构：[randomIndex] + '---' + [data[i]], orders删除对应随机数
   *  3 对循环后的数据按照randomIndex排序
   * @returns
   */
  solution(data: any[]): string[] {
    const originLen = data.length
    const result: any[] = []
    const orders = Object.keys(Array.from({ length: originLen })).map(function (
      item
    ) {
      return +item
    })
    const FLAG = '---'
    for (let i = 0; i < originLen; i++) {
      let end = orders.length
      const randomIndex = this.random(0, end - 1)
      result.push(`${orders[randomIndex]}${FLAG}${data[i]}`)
      orders.splice(randomIndex, 1)
    }
    result.sort((a, b) => {
      const [orderA] = a.split(FLAG)
      const [orderB] = b.split(FLAG)
      return orderA - orderB
    })
    return result.map((item) => {
      const [order, name] = item.split(FLAG)
      return name
    })
  }
  getCurrentName() {
    return this.current
  }
  getSelectedName() {
    return this.selected
  }
}
