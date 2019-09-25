import Vue from 'vue'
import Router from 'vue-router'
import dateComponent from '@/components/dateComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dateComponent',
      component: dateComponent
    }
  ]
})
