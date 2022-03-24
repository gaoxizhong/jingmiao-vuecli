import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import QAhome from '../views/QAhome.vue'
import VideoDetails from '../views/VideoDetails.vue'
import inquiryResultPage from '../views/inquiryResultPage.vue'
// =============================新版本 以下============================================
// import Login from '../newViews/Login.vue'
// import Main from '../newViews/Main.vue'




// ================================新版本 以上=========================================
import store from '../store/index'


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location)
}
Vue.use(VueRouter)

// =============================新版本 以下============================================
// const routes = [
//   {
//     path:'/',
//     name: 'Login',
//     component: Login
//   },
//   {
//     path:'/Main',
//     name: 'Main',
//     component: Main
//   },
// ]




// ================================新版本 以上=========================================

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/QAhome',
    name: 'QAhome',
    component: QAhome,
    meta:{requireAuth:true}
  },
  {
    path:'/Main',
    name:'Main',
    component: Main,
    children: [
        { path: '/Home',
          name: 'home',
          component: () => import('@/views/Home'),
            meta: {
              keepAlive: true,
              scollTopPosition: 0,
              requireAuth:true
            }
        },
        { path: '/zyHome',
          name: 'zyHome',
          component: () => import('@/views/zyHome'),
          meta: {
            keepAlive: true,
            scollTopPosition: 0,
            requireAuth:true
          }
        },
        { path: '/litgHome',
          name: 'litgHome',
          component: () => import('@/views/litgHome'),
          meta: {
            keepAlive: true,
            scollTopPosition: 0,
            requireAuth:true
          }
        },
        { path: '/Details',
          name: 'Details',
          component: () => import('@/views/Details'),
          meta: {
            keepAlive: true,
            scollTopPosition: 0,
            requireAuth:true
          }
        },
        { path: '/LcsyHome',
          name: 'LcsyHome',
          component: () => import('@/views/LcsyHome'),
          meta: {
            keepAlive: true,
            scollTopPosition: 0,
            requireAuth:true
          }
        },
        { path: '/LcsyDetails',
          name: 'LcsyDetails',
          component: () => import('@/views/LcsyDetails'),
          meta:{requireAuth:true}

        },
        { path: '/VideoHome',
          name: 'VideoHome',
          component: () => import('@/views/VideoHome'),
          meta: {
            keepAlive: true,
            scollTopPosition: 0,
            requireAuth:true
          }
        },
        { path: '/litgDetails', name: 'litgDetails', component: () => import('@/views/litgDetails'),meta:{requireAuth:true} },
        { path: '/authorDetails', name: 'authorDetails', component: () => import('@/views/authorDetails'),meta:{requireAuth:true} },
    ]
  },
  {
    path: '/VideoDetails',
    name: 'VideoDetails',
    component: VideoDetails,
    meta:{requireAuth:true}
  },
  {
    path: '/inquiryResultPage',
    name: 'inquiryResultPage',
    component: () => import('@/views/inquiryResultPage'),
    meta: {
      title:'问诊结果',
      keepAlive: true,
      scollTopPosition: 0,
      requireAuth:true
    }
  },
  { 
    path: '/WesternMedicineCdss',
    name: 'WesternMedicineCdss',
    component: () => import('@/views/WesternMedicineCdss'),
    meta: {
      title:'西医CDSS',
      keepAlive: true,
      scollTopPosition: 0,
      requireAuth:true
    }
  },
]

// 页面刷新时，重新赋值token
if (localStorage.getItem('token')) {
  store.dispatch("setToken",localStorage.getItem('token'));
  }
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
// router.beforeEach((to, from, next) => {
//   //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
//   if (to.matched.some(r => r.meta.requireAuth)) {
//     if (store.state.token) {
//        next();
//       }else {
//         console.log('请先登录！')
//         setTimeout(() => {
//           next({
//             path: '/',
//             query: {redirect: to.fullPath}
//           })
//         }, 1500);
//     }

//   }else {
//     next();
//   }
// })

export default router
