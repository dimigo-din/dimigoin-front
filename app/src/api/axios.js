import axios from 'axios'
import store from '@/store'

const client = axios.create({ baseURL: process.env.API_URL })

client.interceptors.response.use(r => r, error => {
  const errorCode = error.response.status
  if (errorCode === 401) { // When access token is expired
    return store.dispatch('account/regenerateAccessToken')
      .then(() => {
        return client(error.config)
      }).catch(err => {
        if (err.code === 401) { // When refresh token is expired too
          return store.dispatch('account/logout')
        }
      })
  } else if (errorCode === 422) { // Wrong
    return store.dispatch('account/logout')
  }

  return error
})

export default client
export const pureAxios = axios.create({ baseURL: process.env.API_URL })
