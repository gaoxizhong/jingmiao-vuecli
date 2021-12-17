import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import QAhome from '../views/QAhome.vue'


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
  // {
  //   path: '/',
  //   name: 'Login',
  //   component: Login
  // },
  {
    path: '/QAhome',
    name: 'QAhome',
    component: QAhome
  },
  {
    path:'/',
    name:'Main',
    component: Main,
    // redirect: {name: 'home'},
    children: [
        { path: '/Home',
          name: 'home',
          component: () => import('@/views/Home'),
            meta: {
              keepAlive: true,
              scollTopPosition: 0
            }
        },
        { path: '/zyHome',
          name: 'zyHome',
          component: () => import('@/views/zyHome'),
          meta: {
            keepAlive: true,
            scollTopPosition: 0
          }
        },
        { path: '/litgHome',
          name: 'litgHome',
          component: () => import('@/views/litgHome'),
          meta: {
            keepAlive: true,
            scollTopPosition: 0
          }
        },
        { path: '/Details',
          name: 'Details',
          component: () => import('@/views/Details'),
          meta: {
            keepAlive: true,
            scollTopPosition: 0
          }
        },
        { path: '/LcsyHome',
          name: 'LcsyHome',
          component: () => import('@/views/LcsyHome'),
          meta: {
            keepAlive: true,
            scollTopPosition: 0
          }
        },
        { path: '/LcsyDetails',
          name: 'LcsyDetails',
          component: () => import('@/views/LcsyDetails'),
        },
        { path: '/litgDetails', name: 'litgDetails', component: () => import('@/views/litgDetails') },
        { path: '/authorDetails', name: 'authorDetails', component: () => import('@/views/authorDetails') },
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
