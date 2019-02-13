export default class InputData {
  constructor ({ value = '' } = {}) {
    this.value = value
  }

  static mapData (data = {}) {
    return Object.keys(data).reduce((obj, value) => {
      obj[value] = data[value].value
      return obj
    }, {})
  }

  static copyData (data = {}, keys = []) {
    const result = keys.reduce((obj, key) => {
      if (data[key] instanceof InputData) {
        obj[key] = new InputData(data[key])
      }

      return obj
    }, {})
    return result
  }

  static arrayFactory (keys) {
    return keys.reduce((obj, key) => {
      obj[key] = new InputData()
      return obj
    }, {})
  }
}
