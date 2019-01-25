const path = require('path')
const fs = require('fs')

const aliases = {
  '@': 'app',
  'styles': 'app/scss'
}

module.exports = {
  webpack: {},
  jsconfig: {}
}

Object.keys(aliases).forEach(alias => {
  const aliasTo = aliases[alias]
  module.exports.webpack[alias] = resolveSrc(aliasTo)
  module.exports.jsconfig[alias + '/*'] = [aliasTo + '/*']
  module.exports.jsconfig[alias] = aliasTo.includes('/index.')
    ? [aliasTo]
    : [
      aliasTo + '/index.js',
      aliasTo + '/index.json',
      aliasTo + '/index.vue',
      aliasTo + '/index.scss',
      aliasTo + '/index.css'
    ]
})

const jsconfigTemplate = require('./jsconfig.template')
const jsconfigPath = path.resolve(__dirname, 'jsconfig.json')

fs.writeFile(
  jsconfigPath,
  JSON.stringify({
    ...jsconfigTemplate,
    compilerOptions: {
      ...(jsconfigTemplate.compilerOptions || {}),
      paths: module.exports.jsconfig
    }
  }),
  error => {
    if (error) {
      console.error(
        'Error while creating jsconfig.json from aliases.config.js.'
      )
      throw error
    }
  }
)

function resolveSrc (_path) {
  return path.resolve(__dirname, _path)
}
