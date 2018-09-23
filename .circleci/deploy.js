const path = require('path')
const FTPS = require('ftps')

const ftps = new FTPS({
  username: process.env.SFTP_USERNAME,
  password: process.env.SFTP_PASSWORD,
  host: process.env.SFTP_HOST,
  protocol: 'sftp',
  cwd: process.env.SFTP_CWD
})

ftps
  .raw('rm -rf ./*')
  .mirror({
    remoteDir: '.',
    localDir: path.resolve(__dirname, '../dist'),
    parallel: true,
    upload: true
  })
  .exec(console.log)
