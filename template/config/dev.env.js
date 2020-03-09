'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
let HOST = process.argv.splice(2)[0] || 'dev'
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 开发环境
  HOST: '"'+HOST+'"'
})
