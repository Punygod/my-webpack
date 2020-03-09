import host from '@/models/config/host'
import { get, post, put, uploadFile } from '@/axios/request'
import { sha256 } from 'js-sha256'
import store from '@/vuex'
import { UP_USER_INFO, UP_USER_AUTH } from '@/store/mutation-types'

class User {
  salt // 盐
  /**
   * 密码盐
   * @param {String} phone 手机号
   */
  async getSalt (phone) {
    let res = post(`${host.cicada}/api/user/salt`, { phone })
    return res
  }
  /**
   * 注册 验证码
   * @param {Number}} phone 手机号
   */
  async code (phone) {
    let res = post(`${host.cicada}/api/user/register/code`, { phone })
    return res
  }
  /**
   * 注册
   * @param {Number} phone 手机号
   * @param {String} code 验证码
   * @param {String} password 密码
   */
  async register (phone, code, password) {
    if (!phone || !code || !password) {
      return
    }
    const data = {
      password,
      phone
    }
    // const now = new Date().valueOf()
    let res = await post(`${host.cicada}/api/user/register?code=${code}`, data)
    if (res && res.code === 0) {
      store.dispatch(UP_USER_AUTH, res.data)
    }
    return res
  }

  /**
   * 密码登录
   * @param {*} phone 手机号
   * @param {*} password 密码 -> sha256(now + sha256(salt + sha256(real passowrd)))
   */
  async login (phone, password) {
    const now = new Date().valueOf()
    const { data } = await this.getSalt(phone)
    // console.log(data)
    // 加密 密码
    password = sha256(now + sha256(data.salt + sha256(password)))
    let res = await post(`${host.cicada}/api/user/login?now=${now}`, {
      phone,
      password
    })
    if (res && res.code === 0) {
      store.dispatch(UP_USER_AUTH, res.data)
    }
    return res
  }
  /**
   * 登录短信验证码
   * @param {Number} phone 手机号
   */
  async loginCode (phone) {
    // console.log(phone)
    // console.log(qs.stringify(phone))
    // return
    let res = post(`${host.cicada}/api/user/login/code`, { phone })
    return res
  }
  /**
   * 验证码登录
   * @param {Number} phone 电话号码
   * @param {Number} code 验证码
   */
  async loginByCode (phone, code) {
    const now = new Date().valueOf()
    // phonePath = encodeURIComponent(phone)
    let res = await post(
      `${host.cicada}/api/user/login?code=${code}&now=${now}`,
      {
        phone
      }
    )
    if (res && res.code === 0) {
      store.dispatch(UP_USER_AUTH, res.data)
    }
    return res
  }
  /**
   * 获取用户信息
   */
  async userInfo () {
    // const user = store.state.user
    // if (!user || !user.id || !user.token) {
    //   console.error('没有注册或登录')
    //   return
    // }
    let res = await get(`${host.cicada}/api/user/info`)
    if (res && res.code === 0) {
      // store.dispatch('up_user_info', res.data.user)
      store.dispatch(UP_USER_INFO, res.data.user)
    }
    return res
  }
  /**
   * 获取用户元数据信息
   */
  async userInfoMeta () {
    // const user = store.state.user
    // if (!user || !user.id || !user.token) {
    //   console.error('没有注册或登录')
    //   return
    // }
    let res = get(`${host.cicada}/api/user/meta`)
    return res
  }
  /**
   * 用户信息修改
   * @param {Object} user 用户信息
   */
  async updateUserInfo (user) {
    let res = await put(`${host.cicada}/api/user/info`, user)
    if (res && res.code === 0) {
      store.dispatch(UP_USER_INFO, res.data.user)
    }
    return res
  }
  async updateUserAvatar (avafile) {
    if (!avafile) {
      // console.log('no file')
      return
    }
    // console.log(store.state.user.token)
    let formData = new FormData()
    formData.append('file', avafile)
    formData.append('type', 'USER_AVATAR')
    let res = await uploadFile({
      url: `${host.cicada}/api/upload/image`,
      // method: 'POST',
      data: formData
      // headers: {'Content-Type': 'multipart/form-data'}
    })
    if (res && res.code === 0) {
      const info = store.state.user.info
      info.avatar = res.data.avatar
      store.dispatch(UP_USER_INFO, info)
    }
    return res
  }
}
export default User
