const assert = require('power-assert')
const fs = require('fs')
const path = require('path')
const convert = require('xml-js')
const Acyort = require('acyort')
const { defaults } = require('acyort-config')

const config = defaults

config.base = __dirname
config.cache =  true
config.scripts = ['rss.js']
config.scripts_dir = '/'
config.rss = {
  limit: 5,
  path: 'rss.xml'
}

describe('rss', () => {
  it('width limit', async function () {
    this.timeout(10000)

    await new Acyort(config).build()
    assert(fs.existsSync(path.join(config.base, 'rss.xml')) === true)
    const xml = fs.readFileSync(path.join(config.base, 'rss.xml'))
    const json = JSON.parse(convert.xml2json(xml, { compact: true, spaces: 2 }))
    assert(json.rss.channel.item.length === 5)
  })

  it('no limit', async function () {
    this.timeout(10000)

    config.rss.limit = 0
    await new Acyort(config).build()
    const xml = fs.readFileSync(path.join(config.base, 'rss.xml'))
    const json = JSON.parse(convert.xml2json(xml, { compact: true, spaces: 2 }))
    assert(json.rss.channel.item.length === 9)
  })

  it('no rss', async function () {
    this.timeout(10000)

    fs.unlinkSync(path.join(config.base, 'rss.xml'))
    config.rss = null
    await new Acyort(config).build()
    assert(fs.existsSync(path.join(config.base, 'rss.xml')) === false)
  })
})
