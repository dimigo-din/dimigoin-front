const phoneRegex = /^\d{11}$/

function phone (value) {
  return phoneRegex.test(value)
}

export default phone
