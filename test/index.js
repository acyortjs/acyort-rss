const assert = require('power-assert')
const fs = require('fs')
const path = require('path')
const convert = require('xml-js')
const Acyort = require('acyort')

const config = {
  base: __dirname,
  cache: true,
  title: '',
  description: '',
  url: 'http://acyort.com',
  theme: 'ccc45',
  per_page: 10,
  default_category: 'uncategorized',
  user: '',
  repository: '',
  scripts: ['rss.js'],
  plugins: [],
  public_dir: '/',
  authors: [],
  timezone: 'UTC',
  language: 'default',
  order: 'created',
  thumbnail_mode: 2,
  category_dir: 'category',
  tag_dir: 'tag',
  post_dir: 'post',
  root: '/',
  scripts_dir: 'scripts',
  rss: {
    limit: 5,
    path: 'rss.xml'
  }
}

describe('rss', () => {
  it('width limit', async () => {
    await new Acyort(config).build()
    assert(fs.existsSync(path.join(config.base, 'rss.xml')) === true)
    const xml = fs.readFileSync(path.join(config.base, 'rss.xml'))
    const json = JSON.parse(convert.xml2json(xml, { compact: true, spaces: 2 }))
    assert(json.rss.channel.item.length === 5)
  })

  it('no limit', async () => {
    config.rss.limit = 0
    await new Acyort(config).build()
    const xml = fs.readFileSync(path.join(config.base, 'rss.xml'))
    const json = JSON.parse(convert.xml2json(xml, { compact: true, spaces: 2 }))
    assert(json.rss.channel.item.length === 9)
  })

  it('no rss', async () => {
    fs.unlinkSync(path.join(config.base, 'rss.xml'))
    config.rss = null
    await new Acyort(config).build()
    assert(fs.existsSync(path.join(config.base, 'rss.xml')) === false)
  })
})
