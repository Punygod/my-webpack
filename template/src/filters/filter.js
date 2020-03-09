import Vue from 'vue'
// 定义一个 Vue 全局的过滤器，名字叫做  msgFormat
Vue.filter('msgFormat', function(msg, arg, arg2) {
  // 字符串的  replace 方法，第一个参数，除了可写一个 字符串之外，还可以定义一个正则
  return msg.replace(/单纯/g, arg+arg2)
})