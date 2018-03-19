class Meal {
  constructor (key, name, startTime, endTime) {
    this.key = key
    this.name = name
    this.startTime = startTime
    this.endTime = endTime
  }

  isActive (date = new Date()) {
    const formatted = date.getHours() * 100 + date.getMinutes()
    return this.startTime <= formatted && formatted <= this.endTime
  }
}

const create = (...list) =>
  list.map(data => Object.freeze(new Meal(...data)))

export default create(
  ['breakfast', '아침', 0, 815],
  ['lunch', '점심', 816, 1340],
  ['dinner', '저녁', 1341, 1920],
  ['snack', '간식', 1921, 2140])
