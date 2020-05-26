import axios from 'axios'

const RUNNING_ADDRESS = 'https://imageserver.dimigo.in/'

const simpleAPI = axios.create({
  baseURL: RUNNING_ADDRESS
})

export const encodeAsBase64 = (stringValue) => btoa(unescape(encodeURIComponent(stringValue)))
export const decodeAsBase64 = (base64Value) => decodeURIComponent(escape(window.atob(base64Value)))

export const getPosterURL = async (title) => {
  const encodedTitle = encodeAsBase64(title)
  const { data: { url } } = await simpleAPI.get(`/get?title=${encodedTitle}`)
  return url
}

export const uploadPosterURL = async (title, url) => {
  const { status } = await simpleAPI.post('/upload', {
    title: encodeAsBase64(title),
    url
  })
  return status === 200
}
