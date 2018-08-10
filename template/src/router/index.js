import Vue from 'vue'
import Router from 'vue-router'

const CliDocument = () => import('pages/document')
const Login = () => import('pages/profile/login')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/doc',
      name: 'CliDocument',
      component: CliDocument
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
