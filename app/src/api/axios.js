import axios from 'axios'
import config from '../../../config'

const token = window.localStorage.getItem('token')
const client = axios.create({ baseURL: config.apiUrl })
client.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ''

export default client
