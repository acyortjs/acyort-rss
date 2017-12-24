const pathFn = require('path')
const Rss = require('./rss')

acyort.extend.register('after_build', (data) => {
  const {
    config,
    fs,
    logger,
  } = acyort

  if (!config.rss) {
    return false
  }

  const { posts } = data
  const { limit, path } = config.rss
  const { base, public_dir } = config
  const rss = new Rss({ ...config, limit })

  fs.outputFileSync(pathFn.join(base, public_dir, path), rss.render(posts))

  return logger.success(path)
})
