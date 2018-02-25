const RssFn = require('rss')
const pathFn = require('path')

class Rss extends RssFn {
  constructor(config) {
    const {
      title,
      description,
      url,
      rss,
    } = config
    const { path = 'rss.xml', limit = 0 } = rss

    super({
      title,
      description,
      feed_url: pathFn.join(url, path),
      site_url: url,
      cdata: true,
      pubDate: new Date().toISOString(),
    })

    this.url = url
    this.limit = limit
  }

  render(posts) {
    let data = posts

    if (this.limit) {
      data = data.filter((p, i) => i < this.limit)
    }

    data.forEach((post) => {
      const {
        author: { name },
        title,
        updated,
        html,
        path,
      } = post

      this.item({
        title,
        url: pathFn.join(this.url, path),
        author: name,
        date: updated,
        description: html,
      })
    })

    return this.xml()
  }
}

module.exports = Rss
