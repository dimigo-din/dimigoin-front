const path = require('path')
const sftp = require('node-sftp-deploy')
const SentryCli = require('@sentry/cli')

const sentry = new SentryCli(path.resolve(__dirname, '../.sentryclirc'))

async function deploy () {
  const version = await sentry.releases.proposeVersion()

  await sentry.releases.new(version)
  await sentry.releases.uploadSourceMaps(version, {
    include: [path.resolve(__dirname, '../')],
    ignoreFile: path.resolve(__dirname, '../.gitignore')
  })
  await sentry.execute(['releases', 'set-commits', '--auto', version], false)

  await sftp({
    user: process.env.SFTP_USERNAME,
    pass: process.env.SFTP_PASSWORD,
    host: process.env.SFTP_HOST,
    port: 22,
    remotePath: process.env.SFTP_CWD,
    sourcePath: path.resolve(__dirname, '../dist')
  })
  await sentry.execute(['releases', 'deploys', version, 'new', '-e', '"production"'], false)
  await sentry.releases.finalize(version)
}

deploy()
  .then(() => console.log(`Deploy to ${process.env.SFTP_HOST} is finished`))
  .catch(err => console.error(err))
