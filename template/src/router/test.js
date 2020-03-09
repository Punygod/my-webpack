const HelloWorld = () =>import('@/components/HelloWorld')
const Test = () => ({
  // 需要加载的组件
  component: import('@/views/test/Test'),
  delay: 200,
  timeout: 3000
})

const TestRouter = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/test',
    name: 'test',
    component: Test
  }
]

export default TestRouter
