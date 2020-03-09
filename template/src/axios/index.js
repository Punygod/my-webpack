import instance from 'http'
// import router from '../router'
// import { Message } from 'element-ui'
import store from '../vuex'
import { sha256 } from 'js-sha256'
// import { errorHandle } from './http-code'
// const qs = require('qs')
const getUrlRelativePath = (url) => {
  if (!url) {
    url = document.location.toString()
  }
  let arrUrl = url.split('//')
  if (arrUrl.length < 2) {
    return url
  }

  let start = arrUrl[1].indexOf('/')
  let relUrl = arrUrl[1].substring(start)// stop省略，截取从start开始到结尾的所有字符

  if (relUrl.indexOf('?') !== -1) {
    relUrl = relUrl.split('?')[0]
  }
  return relUrl
}
// 创建 instance 实例
let http = instance.create({ timeout: 1000 * 12 })
// 设置 post 请求头
http.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// http.defaults.headers.post['Content-Type'] = 'text/plain'
http.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8'
// 'application/x-www-form-urlencoded'

/**
 * 请求拦截器
 * 每次请求前，如果存在 token ，则在请求头中携带 token
 */
http.interceptors.request.use(
  config => {
    // 设置请求头
    // if (config.method === 'post') {
    //   config.headers['X-Token'] = 'application/json;charset=UTF-8'
    // }
    // console.log(store.state.user.getters)
    // console.log(store.state.user.getters.getToken(2))
    // console.log(config)
    // const token = store.state.user.token
    const token = store.getters.getToken
    const id = store.getters.getId
    const now = new Date().valueOf()
    // 添加 token
    if (token) {
      // sha256(uri+timestamp+id+token)
      // console.log(config.url)
      let url = getUrlRelativePath(config.url)
      if (url.includes('cicada/')) {
        url = url.slice(url.indexOf('cicada/') + 7, url.length)
      }
      if (url.includes('?')) {
        url = url.slice(0, url.indexOf('?'))
      }
      if (url.indexOf('/') !== 0) {
        url = '/' + url
      }
      if (url.lastIndexOf('/') === url.length - 1) {
        url = url.slice(0, url.length - 1)
      }
      const sha256Token = sha256(url + now + id + token)
      // console.log(url, now, id, token, sha256Token)
      config.headers['X-Token'] = sha256Token
    }
    if (id) {
      config.headers['X-ID'] = id
    }
    // 添加请求时间戳
    config.headers['X-Timestamp'] = now
    return config
  },
  error => {
    // console.log('Request:' + error)
    Promise.error(error)
  }
)

http.interceptors.response.use(
  // 请求成功
  res => {
    // console.log(res)
    if (res.status !== 200) {
      const err = {
        code: res.status
      }
      return Promise.reject(err)
    }
    const data = res.data
    if ((data && (data.code === 0 || data.code === 200 || data.code === '200'))) {
      return Promise.resolve(data)
    } else {
      return Promise.reject(data)
    }
    // 不是 200
    // errorHandle(res.data.code, res.data.msg)
    // return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data)
  },
  // 请求失败
  error => {
    const { response } = error
    // const { code } = error
    if (response) {
      // console.log('err')
      // 请求已发出，但是不在2XX的范围
      // errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      console.log(error)
      // console.log(code)
      // 处理断网的情况
      // eg: 请求超时或断网，更新 state 的 network状态
      // network 状态在 app.vue 中控制着一个全局的断网提示组件的显示隐藏
      // store.dispatch('changeNetwork', false)

      return Promise.reject(new Error('你已退出互联网群聊'))
    }
  }
)

export { http }
