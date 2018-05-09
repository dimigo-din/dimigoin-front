import * as components from './components'

export default {
  install (Vue) {
    Object.keys(components)
      .forEach(comp => {
        Vue.component(comp, components[comp])
      })
  }
}
