import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)
// if (sessionStorage.getItem('token')) {
//   store.commit('set_token', sessionStorage.getItem('token'))

//   }
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path:'/Main',
    name:'Main',
    component: Main
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
