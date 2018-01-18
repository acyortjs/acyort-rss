const pathFn = require('path')
const Rss = require('./rss')

function generator(data) {
  const {
    config,
    fs,
    logger,
    markeder,
  } = this

  if (!config.rss) {
    return false
  }

  const { posts } = data
  const { path } = config.rss
  const { base, public_dir } = config
  const rss = new Rss(config)

  posts.forEach((post) => {
    post.html = markeder.mark(post.raw)
  })

  fs.outputFileSync(pathFn.join(base, public_dir, path), rss.render(posts))

  return logger.success(path)
}

module.exports = generator
