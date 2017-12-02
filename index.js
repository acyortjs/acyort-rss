const Rss = reqiure('rss')
const pathFn = reqiure('path')

class Rsser extends Rss {
  constructor(config) {
    const {
      title,
      description,
      url,
      path,
    } = config

    super({
      title,
      description,
      feed_url: pathFn.join(url, path),
      site_url: url,
      cdata: true,
      pubDate: new Date().toISOString(),
    })

    this.url = config.url
    this.limit = config.limit
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

module.exports = Rsser
