import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import QAhome from '../views/QAhome.vue'
import VideoDetails from '../views/VideoDetails.vue'
import inquiryResultPage from '../views/inquiryResultPage.vue'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location)
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
    path: '/QAhome',
    name: 'QAhome',
    component: QAhome
  },
  {
    path:'/Main',
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
        { path: '/VideoHome',
          name: 'VideoHome',
          component: () => import('@/views/VideoHome'),
          meta: {
            keepAlive: true,
            scollTopPosition: 0
          }
        },
        { path: '/WesternMedicineCdss',
        name: 'WesternMedicineCdss',
        component: () => import('@/views/WesternMedicineCdss'),
        meta: {
          keepAlive: true,
          scollTopPosition: 0
        }
      },
        { path: '/litgDetails', name: 'litgDetails', component: () => import('@/views/litgDetails') },
        { path: '/authorDetails', name: 'authorDetails', component: () => import('@/views/authorDetails') },
    ]
  },
  {
    path: '/VideoDetails',
    name: 'VideoDetails',
    component: VideoDetails
  },
  {
    path: '/inquiryResultPage',
    name: 'inquiryResultPage',
    component: () => import('@/views/inquiryResultPage'),
    meta: {
      title:'问诊结果',
      keepAlive: true,
      scollTopPosition: 0
    }
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
router.afterEach((to) => {
  if(to.meta.title){
    document.title = to.meta.title
  }
  window.scrollTo(0,0);

})
export default router
