import magician from '@/src/api/magician'
import { pureAxios as axios } from '@/src/api/axios'

/**
 * @param id
 * @param password
 * @returns {Promise<{token: string, needVerify: boolean}>}
 */
export async function auth (id, password) {
  const { data } = await magician(() => axios.post('/auth/', { id, password }), {
    400: '존재하지 않거나 접근할 수 없는 과제입니다.',
    404: '아이디 혹은 비밀번호가 잘못되었습니다.'
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
    401: '리프레쉬 토큰이 만료되었습니다.'
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
    400: '이미 존재하는 아이디이거나 입력하신 정보가 잘못되었습니다.',
    403: 'API 서버 오류입니다.'
  })
}

export async function verifyStudent (authcode) {
  await magician(() => axios.post('/register_student/', { authcode }), {
    422: '인증 코드가 잘못되었습니다.',
    403: 'API 서버 오류입니다.'
  })
}
