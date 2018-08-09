{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'assets/stylus/index.styl'
import App from './App'

import axios from 'api/axiosApi' // 经过封装处理的axiosApi
import { isIOS, isIphoneX } from 'assets/js/brower'
import { localUser } from 'assets/js/local'
import { on } from 'assets/js/dom'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
require('promise.prototype.finally').shim() // 低版本浏览器对finally语法支持

if (isIOS()) {
  FastClick.attach(document.body)
  // input框在ios上点击不灵敏BUG
  FastClick.prototype.focus = function(targetElement) {
    targetElement.focus()
  }
}
Vue.config.productionTip = false

// 设置一些全局的参数
Vue.prototype.$http = axios
Vue.prototype.$localUser = localUser
let paddingTop = 24
let paddingBottom = 0
if (isIphoneX()) {
  paddingTop = 34
  paddingBottom = 44
}
Vue.prototype.$paddingTop = paddingTop
Vue.prototype.$paddingBottom = paddingBottom
Vue.prototype.$tabHeight = 54.8

Vue.use(MintUI)
Vue.use(VueLazyload)

// 登录拦截
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.name !== 'Register' && localUser.get('id') == null) {
    next({
      path: '/login',
      replace: true
    })
    return
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
