import axios from 'axios'

const token = window.localStorage.getItem('token')
const client = axios.create({ baseURL: process.env.API_URL })
client.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ''

export default client
