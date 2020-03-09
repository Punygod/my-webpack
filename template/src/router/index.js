import Vue from 'vue'
import Router from 'vue-router'
import test from '@/router/test'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [...test]
})


// 路由守卫，路由拦截器
router.beforeEach((to, from, next) => {
  if (!to.matched || to.matched.length === 0) {
    next({
      name: '/'
    })
  } else {
    next()
  }
})

export default router
