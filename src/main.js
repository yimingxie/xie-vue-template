// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入vuex
import store from './store'

// 引入第三方插件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import jsonp from 'jsonp'
import Mock from './mock/index'

// Mock数据
// Mock.mockData()

// 全局过滤器
import * as filters from './filters/filters'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


// 安装
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.prototype.$jsonp = jsonp

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
