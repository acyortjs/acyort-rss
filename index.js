const generator = require('./lib/generator')

acyort.extend.register('after_build', generator.bind(acyort))
