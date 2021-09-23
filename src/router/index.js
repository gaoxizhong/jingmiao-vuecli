import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
  
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
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
    component: Main,
    redirect: {name: 'home'},
    children: [
      {path:'Home',name:'home',component:()=>import('@/views/Home')},
      // {path:'Details',name:'详情',component:()=>import('@/views/Details')}
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
