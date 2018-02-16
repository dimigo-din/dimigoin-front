export function factory (selected = []) {
  const props = {
    absolute: Boolean,
    bottom: Boolean,
    fixed: Boolean,
    left: Boolean,
    right: Boolean,
    top: Boolean
  }

  return {
    name: 'positionable',
    props: selected.length ? Object.keys(props)
      .filter(v => ~selected.indexOf(v))
      .reduce((pv, cv) => {
        pv[cv] = props[cv]
        return pv
      }, {}) : props
  }
}

export default factory()
