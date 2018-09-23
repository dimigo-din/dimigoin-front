const path = require('path')
const sftp = require('node-sftp-deploy')

sftp({
  user: process.env.SFTP_USERNAME,
  pass: process.env.SFTP_PASSWORD,
  host: process.env.SFTP_HOST,
  port: 22,
  remotePath: process.env.SFTP_CWD,
  sourcePath: path.resolve(__dirname, '../dist')
})
  .then(() => console.log('deploy finish'))
  .catch(err => { throw err })
