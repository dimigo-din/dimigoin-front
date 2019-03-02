import axios from 'axios'
import store from '@/store'
import NProgress from 'nprogress'

const client = axios.create({ baseURL: process.env.API_URL })

client.interceptors.request.use(config => {
  NProgress.start()
  return config
})
client.interceptors.response.use(result => {
  NProgress.done()
  return result
}, err => {
  NProgress.done()
  throw err
})

let requestInterceptor = null
let responseInterceptor = null

export function createClient (endpoint = '', config = {
  defaultOptions: {}
}) {
  return new Proxy({
    get: (url, options = {}) =>
      client.get(endpoint + url, { ...config.defaultOptions, ...options }),
    post: (url, data, options = {}) =>
      client.post(endpoint + url, data, { ...config.defaultOptions, ...options }),
    put: (url, data, options = {}) =>
      client.put(endpoint + url, data, { ...config.defaultOptions, ...options }),
    delete: (url, options = {}) =>
      client.delete(endpoint + url, { ...config.defaultOptions, ...options })
  }, {
    get (target, name) {
      return (name in target) ? target[name] : client[name]
    }
  })
}

export function updateHeader (key, value) {
  if (value) client.defaults.headers.common[key] = value
  else delete client.defaults.headers.common[key]
}

export function mountTokenRefreshInterceptor () {
  responseInterceptor = client.interceptors.response.use(r => r, async error => {
    const errorCode = (error.response || {}).status
    if (errorCode !== 401 && errorCode !== 422) throw error

    try { // When access token is expired or invalid
      await store.dispatch('account/regenerateAccessToken')
      // The above dispatch patches default headers, but not in this request.
      error.config.headers['Authorization'] =
        `Bearer ${store.state.account.auth.accessToken}`
      return await client(error.config)
    } catch (err) {
      await store.dispatch('account/logout')
      throw err
    }
  })

  requestInterceptor = client.interceptors.request.use(async config => {
    if (!store.state.account['getters/isAccessTokenExpired']) return config
    try {
      await store.dispatch('account/regenerateAccessToken')
      // The above dispatch patches default headers, but not in this request.
      config.headers['Authorization'] =
        `Bearer ${store.state.account.auth.accessToken}`
    } catch (err) {
      await store.dispatch('account/logout')
      throw err
    }
    return config
  })
}

export function unmountTokenRefreshInterceptor () {
  if (!(requestInterceptor || responseInterceptor)) return

  client.interceptors.request.eject(requestInterceptor)
  client.interceptors.response.eject(responseInterceptor)
}
