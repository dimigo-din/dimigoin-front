const path = require('path')
const FTPS = require('ftps')

const ftps = new FTPS({
  username: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  protocol: 'sftp',
  cwd: process.env.FTP_CWD
})

ftps
  .raw('rm -rf ./*')
  .mirror({
    remoteDir: '.',
    localDir: '../dist/',
    parallel: true,
    upload: true
  })
  .exec(console.log)
