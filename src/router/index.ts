import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      page: 1
    }
  },
  {
    path: '/:page',
    name: 'home',
    component: Home
  },
  {
    path: '/details/:id',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
