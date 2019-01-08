import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/views/Test'

Vue.use(Router)


// export default new Router({})

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      meta: {
        title: 'hw', // 添加该字段，用于显示不同页面的标题
        requiresAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'Test',
      meta: {
        title: 'Test', // 添加该字段，用于显示不同页面的标题
        requiresAuth: false // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Test
    },
  ]
})

router.beforeEach((to, from, next) => {
  // 判断当前的token是否存在
  let token = window.localStorage.getItem('user-token')
  if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
    next({
      path: '/test',
      query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  }

  // 设置不同页面title
  if (to.meta.title) {
    document.title = to.meta.title
  }

  next()
})

export default router