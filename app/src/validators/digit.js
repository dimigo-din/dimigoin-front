const digitRegex = /^[0-9]+$/

function digit (value) {
  return digitRegex.test(value)
}

export default digit
