import axios from './axios'
import magician from './magician'

/**
 * specific class 에 message 보냄
 *
 * @param post
 * @returns {Promise<void>}
 */
export async function postMessage (post) {
  await magician(() => axios.post(`/freshman/`, post), {})
}
