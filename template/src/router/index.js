import Vue from 'vue'
import Router from 'vue-router'

import CliDocument from 'pages/document'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/doc',
      name: 'CliDocument',
      component: CliDocument
    }
  ]
})
