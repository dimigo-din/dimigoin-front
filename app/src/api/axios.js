import axios from 'axios'
import config from '../../../config'

const client = axios.create({
  baseURL: config.apiUrl
})
const token = window.localStorage.getItem('token')
client.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ''

export default client
