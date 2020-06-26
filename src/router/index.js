import Vue from 'vue'
import VueRouter from 'vue-router'
import goods from '../pages/index/goods'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'goods',
    component: goods
  },
  {
    path: '/store',
    name: 'store',
    component: () => import('../pages/index/store.vue')
  },
  {
    path: '/evaluate',
    name: 'evaluate',
    component: () => import('../pages/index/evaluate.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
