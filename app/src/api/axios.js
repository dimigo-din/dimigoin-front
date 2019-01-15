import axios from 'axios'
import store from '@/store'

const client = axios.create({ baseURL: process.env.API_URL })

client.interceptors.request.use(async config => {
  if (store.state.account['getters/isAccessTokenExpired']) {
    await store.dispatch('account/regenerateAccessToken')
    config.headers['Authorization'] = store.state.account.auth.accessToken
  }

  return config
})

client.interceptors.response.use(r => r, async error => {
  if (!error.response) return error

  const errorCode = error.response.status
  if (errorCode === 401) { // When access token is expired
    try {
      await store.dispatch('account/regenerateAccessToken')
      error.config.headers['Authorization'] =
        `Bearer ${store.state.account.auth.accessToken}`
      return await client(error.config)
    } catch (err) {
      await store.dispatch('account/logout')
      return Promise.reject(err)
    }
  }

  return Promise.reject(error)
})

export default client
export const pureAxios = axios.create({ baseURL: process.env.API_URL })
