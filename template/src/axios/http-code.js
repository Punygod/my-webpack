
// import router from '../router'
import { Message } from 'element-ui'

const msg = options => {
  Message({
    message: options.message,
    type: 'error',
    duration: 2000,
    showClose: false,
    center: true
  })
}

/**
 * 请求失败后的错误统一处理
 */
const errorHandle = ({ code, message }) => {
  // debugger
  // 状态码判断
  switch (code) {
    // 401: 未登录状态，跳转登录页
    case 401:
      msg({ message: message || '未登录' })
      break
    case '401':
      // router.push({ name: 'error' })
      msg({ message: message || '未登录' })
      break
    case 403:
      msg({ message: message || '登录过期，请重新登录' })
      break
    case 404:
      msg({ message: message || '请求资源不存在' })
      break
    case 500:
      msg({ message: message || '500' })
      break
    case 10009:
      msg({ message: message || '密码或账号错误' })
      break
    case 10010:
      msg({ message: message || '错误太多' })
      break
    default:
      msg({ message: message || '请求出错' })
  }
}

export {
  errorHandle
}
