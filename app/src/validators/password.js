const passwordLength = 6

function password (value) {
  return passwordLength <= value.length
}

export default password
