import Vue from 'vue'

const animationTrigger = Vue.directive('animation-trigger', {
  update (el, binding) {
    if (binding.value === binding.oldValue) {
      return
    }
    // 指令传入得触发动画得className
    let className = binding.arg.split(':')
    el.classList.remove(className[0])
    el.classList.remove(className[1])
    setTimeout(() => {
      if (binding.value > binding.oldValue) {
        el.classList.add(className[1])
      } else {
        el.classList.add(className[0])
      }
    }, 100)
  }
})

export default animationTrigger
