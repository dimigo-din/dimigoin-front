import axios from './axios'
import magician from './magician'

export async function getServiceList () {
  return (await magician(() => axios.get('/services/'))).services
}
