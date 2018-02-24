const pathFn = require('path')
const Rss = require('./rss')

function generator(data) {
  const {
    config,
    fs,
    logger,
    marker,
  } = this

  if (!config.rss) {
    return false
  }

  const { posts } = data
  const { path } = config.rss
  const { base, public_dir } = config
  const rss = new Rss(config)

  posts.forEach((post) => {
    post.html = marker.parse(post.raw, { simple_mode: true })
  })

  fs.outputFileSync(pathFn.join(base, public_dir, path), rss.render(posts))

  return logger.success(path)
}

module.exports = generator
