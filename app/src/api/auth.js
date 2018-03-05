import { superstruct } from 'superstruct'
import axios from './axios'

const struct = superstruct({
  types: {
    email: v => /.+@.+\..+/.test(v)
  }
})

/**
 * @param id
 * @param password
 * @returns {Promise<{token: string, needVerify: boolean}>}
 */
export async function getAccessToken (id, password) {
  const res = await axios.post('/auth/', { id, password })
  const returnVal = { token: res.data.token, needVerify: false }

  switch (res.status) {
    case 400:
      throw new Error('입력란을 모두 채워주세요.')
    case 404:
      throw new Error('아이디 혹은 비밀번호가 잘못되었습니다.')
    case 205:
      returnVal.needVerify = true
      break
    case 200:
  }

  return returnVal
}

export async function register ({
  name,
  email,
  gender,
  id,
  password,
  phone,
  birthday
}) {
  const res = await axios.post('/register/', {
    name, email, gender, id, password, phone_number: phone, birthday
  })

  switch (res.status) {
    case 422:
      throw new Error('이미 존재하는 아이디 혹은 입력된 정보가 잘못되었습니다.')
    case 403:
      throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    case 200:
      break
    default:
      throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
  }
}

export async function verifyStudent (authcode) {
  const res = await axios.post('/register_student/', { authcode })

  switch (res.status) {
    case 422:
      throw new Error('인증 코드가 잘못되었습니다.')
    case 403:
      throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    case 200:
      break
    default:
      throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
  }
}
