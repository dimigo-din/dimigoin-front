import magician from '@/src/api/magician'
import { pureAxios as axios } from '@/src/api/axios'
import APIError from '@/src/errors/api-error'

/**
 * @param id
 * @param password
 * @returns {Promise<{token: string, needVerify: boolean}>}
 */
export async function auth (id, password) {
  const { data } = await magician(() => axios.post('/auth/', { id, password }), {
    400: () => new APIError('입력란을 모두 채워주세요.', 400),
    404: () => new APIError('아이디 혹은 비밀번호가 잘못되었습니다.', 404)
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
    401: () => {}, // Expired token
    422: () => {} // Wrong token
  })
}

export async function generateAccessToken (refreshToken) {
  const { data } = await magician(() => axios.post('/auth/token/refresh', {}, {
    headers: {
      'Authorization': `Bearer ${refreshToken}`
    }
  }), {
    401: () => {
      const err = new APIError('리프레쉬 토큰이 만료되었습니다.', 401)
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
  await magician(() => axios.post('/register/', {
    name, email, gender, id, password, phone_number: phone, birthday
  }), {
    422: () => new APIError('이미 존재하는 아이디 혹은 입력된 정보가 잘못되었습니다.', 422),
    403: () => new APIError('API 서버 오류입니다.', 403)
  })
}

export async function verifyStudent (authcode) {
  await magician(() => axios.post('/register_student/', { authcode }), {
    422: () => new APIError('인증 코드가 잘못되었습니다.', 422),
    403: () => new APIError('API 서버 오류입니다.', 403)
  })
}
