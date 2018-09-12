import axios from './axios'
import magician from './magician'

export const page = {
  /**
   * 모든 SNS 페이지를 출력합니다.
   *
   * @returns {Promise<Array<snspage>>}
   */
  async getAllPage () {
    const { snspages } = await magician(() => axios.get(`/snspages/`), {
      default: () => new Error('Error by getAllPage')
    })
    return snspages
  },

  /**
   * SNS 페이지를 개설합니다.
   *
   * @param snspage
   * @returns {Promise<void>}
   */

  async postPage (snspage) {
    await magician(() => axios.post(`/snspages/`, snspage), {
      default: () => new Error('Error by postPage')
    })
  },

  /**
   * 관리자 이상의 권한을 요구하는 요청입니다.
   * SNS 페이지를 삭제합니다
   *
   * @param idx
   * @returns {Promise<void>}
   */
  async delAdminPage (idx) {
    await magician(() => axios.delete(`/snspages/admin/${idx}`), {
      404: () => new Error('존재하지 않는 SNS 페이지입니다.'),
      default: () => new Error('Error by delAdminPage')
    })
  },

  /**
   * 관리자 이상의 권한을 요구하는 요청입니다.
   * SNS 페이지를 수정합니다.
   *
   * @param idx
   * @param snspage
   * @returns {Promise<void>}
   */
  async putAdminPage (idx, snspage) {
    await magician(() => axios.put(`/snspages/admin/${idx}`, snspage), {
      default: () => new Error('Error by putAdminPage')
    })
  },

  /**
   * 해당 학년의 SNS 페이지를 출력합니다.
   *
   * @param grade
   * @returns {Promise<Array<snspage>>}
   */
  async getGradePage (grade) {
    const { snspages } = await magician(() => axios.get(`/snspages/grade/${grade}`), {
      default: () => new Error('Error by getGradePage')
    })
    return snspages
  },

  /**
   * 개설한 SNS 페이지를 출력합니다
   *
   * @returns {Promise<Array<snspage>>}
   */
  async getMyPage () {
    const { snspages } = await magician(() => axios.get(`/snspages/mypage/`), {
      default: () => new Error('Error by getMyPage')
    })
    return snspages
  },

  /**
   * 프로필 이미지를 출력합니다
   *
   * @param idx
   * @returns {Promise<Image>}
   */
  async getProfileImage (idx) {
    const image = new Image()
    image.src = await magician(() => axios.get(`/snspages/profileimage/${idx}`), {
      default: () => new Error('Error by getProfileImage')
    })
  },

  /**
   * 프로필 이미지를 등록합니다
   *
   * @param idx
   * @param image
   * @returns {Promise<void>}
   */
  async postProfileImage (idx, image) {
    const img = new Image()
    img.src = image
    await magician(() => axios.post(`/snspages/profileimage/${idx}`, img), {
      400: () => new Error('이미지를 찾을 수 없습니다'),
      403: () => new Error('제출한 이미지 파일에 문제가 있습니다'),
      405: () => new Error('이미 프로필 사진이 있습니다.'),
      default: () => new Error('Error by postProfileImage')
    })
  },

  /**
   * SNS 페이지를 찾아 출력합니다
   *
   * @param title
   * @returns {Promise<Array<snspage>>}
   */
  async getSearchPage (title) {
    const { snspages } = await magician(() => axios.get(`/snspages/search/${title}`), {
      default: () => new Error('Error by getSearchPage')
    })
    return snspages
  },

  /**
   * idx의 SNS 페이지를 출력합니다.
   *
   * @param idx
   * @returns {Promise<snspage>}
   */
  async getPage (idx) {
    const snspage = await magician(() => axios.get(`/snspages/${idx}`), {
      default: () => new Error('Error by getPage')
    })
    return snspage
  },

  /**
   * 페이지를 개설한 유저만 요청할 수 있습니다.
   * SNS 페이지를 삭제합니다.
   *
   * @param idx
   * @returns {Promise<void>}
   */
  async delPage (idx) {
    await magician(() => axios.delete(`/snspages/${idx}`), {
      404: () => new Error('페이지가 존재하지 않습니다'),
      default: () => new Error('Error by delPage')
    })
  },

  /**
   * 페이지를 개설한 유저만 요청할 수 있습니다.
   * SNS 페이지를 수정합니다.
   *
   * @param idx
   * @param snspage
   * @returns {Promise<void>}
   */
  async putPage (idx, snspage) {
    await magician(() => axios.put(`/snspages/${idx}`, snspage), {
      default: () => new Error('Error by putPage')
    })
  }
}

/**
 * SNS Post API
 * 여기서 Post (게시글)은 Poost로 대체하였으니 참고하셈!
 */
export const poost = {
  /**
   * 해당 SNS 페이지의 모든 글을 출력합니다.
   *
   * @param idx
   * @returns {Promise<Array<snspost>>}
   */
  async getPoost (idx) {
    const { snsposts } = await magician(() => axios.get(`/snspost/${idx}`), {
      default: () => new Error('Error by getPoost')
    })
    return snsposts
  },

  /**
   * SNS 페이지에 글을 추가합니다.
   *
   * @param idx
   * @param poost
   * @returns {Promise<void>}
   */
  async postPoost (idx, poost) {
    await magician(() => axios.post(`/snspost/${idx}`), {
      default: () => new Error('Error by postPoost')
    })
  }
}

export const per = {
  /**
   * 내가 권한을 가지고 있거나 구독중인 페이지를 모두 출력합니다.
   *
   * @returns {Promise<Array<permission>>}
   */
  async getMyPer () {
    const { snspermission } = await magician(() => axios.get(`/snsper/`), {
      default: () => new Error('Error by getMyPer')
    })
    return snspermission
  },

  /**
   * 페이지를 개설한 유저만 요청할 수 있습니다.
   * 해당 SNS 페이지의 권한이 있는 사람들을 모두 출력합니다.
   *
   * @param idx
   * @returns {Promise<Array<snspermission>>}
   */
  async getBossPer (idx) {
    const { snspermission } = await magician(() => axios.get(`/snsper/boss/${idx}`), {
      default: () => new Error('Error by getBossPer')
    })
    return snspermission
  },

  /**
   * 페이지를 개설한 유저만 요청할 수 있습니다.
   * SNS 페이지 관리자를 추가합니다.
   *
   * @param idx
   * @param permission
   * @returns {Promise<void>}
   */
  async postBossPer (idx, permission) {
    await magician(() => axios.post(`/snsper/boss/${idx}`, permission), {
      default: () => new Error('Error by postBossPer')
    })
  },

  /**
   * 페이지를 개설한 유저만 요청할 수 있습니다.
   * SNS 페이지의 권한이 있는 사람들을 출력합니다.
   *
   * @param idx
   * @returns {Promise<Array<snspermission>>}
   */
  async getPer (idx) {
    const { snspermission } = await magician(() => axios.get(`/snsper/${idx}`), {
      default: () => new Error('Error by getPer')
    })
    return snspermission
  },

  /**
   * SNS 페이지를 구독합니다.
   *
   * @param idx
   * @returns {Promise<void>}
   */
  async postPer (idx) {
    await magician(() => axios.post(`/snsper/${idx}`), {
      default: () => new Error('Error by postPer')
    })
  }
}

export const image = {
  /**
   * 해당 SNS글의 특정 사진을 출력합니다.
   *
   * @param idx
   * @returns {Promise<Image>}
   */
  async getImage (idx) {
    const img = new Image()
    img.src = await magician(() => axios.get(`/snsimage/${idx}`), {
      default: () => new Error('Error by getImage')
    })
    return img
  },

  /**
   * SNS 글의 모든 사진을 json으로 출력합니다.
   *
   * @param idx
   * @returns
   */
  /**
   * SNS 글의 사진을 추가합니다.
   *
   * @param idx
   * @param image
   * @returns {Promise<void>}
   */
  async postImage (idx, image) {
    const img = new Image()
    img.src = image
    await magician(() => axios.post(`/snsimage/${idx}`), {
      default: () => new Error('Error by postImage')
    })
  }
}
