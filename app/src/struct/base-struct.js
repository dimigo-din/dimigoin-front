import { superstruct } from 'superstruct'

export default superstruct({
  types: {
    email: v => /.+@.+\..+/.test(v)
  }
})
