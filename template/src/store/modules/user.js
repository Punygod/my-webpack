// user.js 用户相关
import { UP_USER_INFO, INCREMENT, UP_USER_AUTH, DEL_TOKEN } from '../mutation-types'

const user = {
  state: {
    count: 0,
    login: false,
    id: undefined,
    token: undefined,
    info: undefined
  },
  getters: {
    getId: state => {
      if (!state.id) {
        state.id = sessionStorage.getItem('id')
      }
      return state.id
    },
    getToken: state => {
      if (!state.token) {
        state.token = sessionStorage.getItem('authToken')
      }
      return state.token
    }
  },
  mutations: {
    [INCREMENT] (state) {
      state.count++
    },
    [UP_USER_AUTH] (state, user) {
      if (!user) {
        return
      }
      if (user.id) {
        state.id = user.id
        // 保存到 sessionStorage 中
        sessionStorage.setItem('id', user.id)
      }
      if (user.token) {
        state.token = user.token
        // 保存到 sessionStorage 中
        sessionStorage.setItem('authToken', user.token)
      }
    },
    [UP_USER_INFO] (state, info) {
      console.log(info)
      if (info) {
        state.info = info
      }
    },
    [DEL_TOKEN] (state) {
      state.token = undefined
      state.id = undefined
      state.info = undefined
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    },
    [UP_USER_AUTH] ({ commit }, user) {
      commit(UP_USER_AUTH, user)
    },
    [UP_USER_INFO] ({ commit }, info) {
      commit(UP_USER_INFO, info)
    }
  }
}

export default user
