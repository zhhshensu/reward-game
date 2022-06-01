// ## 写出一个抽奖页面:
// - 有200个人参加抽奖，每次抽出一个人，不能重复，必须每个人都要抽中奖
// - 前面10次抽奖要选中固定的10个人，每次就从这10人中随机抽取一人，不能重复
// - 从第11次开始就从剩余的190人当中抽奖，不能重复，直到抽奖结束
// - 已经中过奖的人不能再次抽奖

/**
 *
 * @param {Array} data 参与抽奖总人数
 * @param {Array} preset 预设的中奖人数
 */

export default class Price {
  private initPerson: string[]
  restPerson: string[]
  specialPerson: string[]
  selected: string[]
  current: string
  index: number
  totalLen: number
  specialLen: number
  constructor(data: string[], preset: string[] = []) {
    this.initPerson = data || [] // 总人数
    this.restPerson = this.initPerson.map((item) => item) // 剩余人数
    this.specialPerson = preset || [] // 预设人数
    this.selected = []
    this.current = ''
    this.index = 0
    this.totalLen = this.initPerson.length
    this.specialLen = this.specialPerson.length
  }
  run() {
    // 生成随机数
    function random(min: number, max: number) {
      return Math.floor(Math.random() * (max - min)) + min
    }
    if (this.index >= this.specialLen) {
      // 剩余的
      if (this.restPerson.length == 0) return
      let inx = random(0, this.restPerson.length)
      let name = this.restPerson[inx]
      if (!this.selected.includes(name)) {
        this.selected.unshift(name)
        this.current = name
        this.restPerson.splice(inx, 1)
      }
    } else {
      // 前几个人
      if (this.specialPerson.length == 0) return
      let inx = random(0, this.specialPerson.length)
      let name = this.specialPerson[inx]
      if (!this.selected.includes(name)) {
        this.selected.unshift(name)
        this.current = name
        this.specialPerson.splice(inx, 1)
        this.restPerson.splice(this.restPerson.indexOf(name), 1)
      }
    }
    this.index = this.selected.length
  }
  getCurrentName() {
    return this.current
  }
  getSelectedName() {
    return this.selected.join(',')
  }
}


