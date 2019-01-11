import magician from '@/src/api/magician'
import { pureAxios as axios } from '@/src/api/axios'

/**
 * @param id
 * @param password
 * @returns {Promise<{token: string, needVerify: boolean}>}
 */
export async function auth (id, password) {
  const { data } = await magician(() => axios.post('/auth/', { id, password }), {
    400: () => new Error('입력란을 모두 채워주세요.'),
    404: () => new Error('아이디 혹은 비밀번호가 잘못되었습니다.')
  })

  return {
    accessToken: data['token'],
    refreshToken: data['refresh_token']
  }
}

export async function logout (refreshToken) {
  await magician(() => axios.post('/auth/logout/refresh', {}, {
    headers: {
      'Authorization': `Bearer ${refreshToken}`
    }
  }), {
    401: () => {} // 이미 만료된 토큰인 경우
  })
}

export async function generateAccessToken (refreshToken) {
  const { data } = await magician(() => axios.post('/auth/token/refresh', {}, {
    headers: {
      'Authorization': `Bearer ${refreshToken}`
    }
  }), {
    401: () => {
      const err = new Error('토큰이 만료되었습니다.')
      err.code = 401
      return err
    }
  })

  return {
    accessToken: data['token'],
    refreshToken: data['refresh_token']
  }
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
  try {
    await axios.post('/register/', {
      name, email, gender, id, password, phone_number: phone, birthday
    })
  } catch ({ message, response: res }) {
    console.error(message)
    switch (res.status) {
      case 422:
        throw new Error('이미 존재하는 아이디 혹은 입력된 정보가 잘못되었습니다.')
      case 403:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}

export async function verifyStudent (authcode) {
  try {
    await axios.post('/register_student/', { authcode })
  } catch ({ message, response: res }) {
    console.error(message)
    switch (res.status) {
      case 422:
        throw new Error('인증 코드가 잘못되었습니다.')
      case 403:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
      default:
        throw new Error('알 수 없는 오류로 잠시 후 다시 시도해주세요.')
    }
  }
}
