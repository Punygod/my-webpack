// 域名环境切换
let processEnvHost = process.env.HOST
console.log('服务环境 ---->>>> [' + processEnvHost + ']')
/**
 * 接口域名的管理
 */
// 开发环境
const dev = {
  mock: 'http://mock.welog.xyz',
  cicada: '/cicada', // 'https://www.hicicada.com'
  // cicada: 'https://www.hicicada.com/cicada', // 'https://www.hicicada.com' 线上
  // webSocket: 'wss://www.hicicada.com/ws'
  webSocket: 'ws://' + location.host + '/socket/ws'
  // webSocket: 'ws://192.168.0.3:9500/wss'
}
// 测试环境
const test = {
  mock: 'http://mock.welog.xyz',
  cicada: 'cicada', // 'https://www.hicicada.com'
  // cicada: 'https://www.hicicada.com', // 'https://www.hicicada.com' 线上
  webSocket: 'wss://www.hicicada.com/ws'
  // webSocket: 'ws://192.168.0.3:9500/wss'
}
// 线上环境
const prod = {
  mock: 'https://www.mock.com',
  cicada: 'https://www.hicicada.com', // 'https://www.hicicada.com' 线上
  webSocket: 'wss://www.hicicada.com/ws'
}
let host
if (processEnvHost === 'dev') {
  host = dev
} else if (processEnvHost === 'test') {
  host = test
} else {
  host = prod
}
console.log('HOST --- ', host)
export default host
