import { ServiceBase } from '@/src/api/service-base'

export class AuthService extends ServiceBase {
  /**
   * @param {string} id
   * @param {string} password
   * @returns {{accessToken: string, refreshToken: string}}
   */
  async verify (id, password) {
    const { data } = await this.magician(() => this.r.post('/auth/', { id, password }), {
      400: '존재하지 않거나 접근할 수 없는 과제입니다.',
      404: '아이디 혹은 비밀번호가 잘못되었습니다.'
    })

    return {
      accessToken: data['token'],
      refreshToken: data['refresh_token']
    }
  }

  async logout (refreshToken) {
    await this.magician(() => this.r.post('/auth/logout/refresh', {}, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    }), {
      401: () => {}, // Expired token
      422: () => {} // Wrong token
    })
  }

  async generateAccessToken (refreshToken) {
    const { data } = await this.magician(() => this.r.post('/auth/token/refresh', {}, {
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

  async register ({ name, email, gender, id, password, phone, birthday }) {
    await this.magician(() => this.r.post('/register/', {
      name, email, gender, id, password, phone_number: phone, birthday
    }), {
      400: '이미 존재하는 아이디이거나 입력하신 정보가 잘못되었습니다.',
      403: 'API 서버 오류입니다.'
    })
  }

  async verifyStudent (authcode) {
    await this.magician(() => this.r.post('/register_student/', { authcode }), {
      422: '인증 코드가 잘못되었습니다.',
      403: 'API 서버 오류입니다.'
    })
  }
}
