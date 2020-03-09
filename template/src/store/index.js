import Vue from 'vue'
import Vuex from 'vuex'
// import 各模块 的 状态管理
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: user
  }
})
