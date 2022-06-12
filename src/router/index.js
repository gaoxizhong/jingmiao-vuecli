import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'


import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import QAhome from '../views/QAhome.vue'
import VideoDetails from '../views/VideoDetails.vue'
import inquiryResultPage from '../views/inquiryResultPage.vue'
// =============================新版本 以下============================================
import FrontPage from '../views/FrontPage.vue'  // 首页
import RepositoryPage from '../views/RepositoryPage.vue'     // 知识库页
import XyRepositoryPage from '../views/XyRepositoryPage.vue'     // 西医知识库页
import ZyRepositoryPage from '../views/ZyRepositoryPage.vue'     // 中医知识库页
import NewDetails from '../views/NewDetails.vue'     // 知识库疾病详情页
import SearchPages from '../views/SearchPages.vue'  // 知识库疾病搜索页
import departmentDisasePages from '../views/departmentDisasePages.vue'  //  科室疾病页面
import DocumentGuidePages from '../views/DocumentGuidePages.vue'  //  指南文献页面
import litgDetails from '../views/litgDetails.vue'  //  文献详情页面
import authorDetails from '../views/authorDetails.vue'  //  文献作者详情页面
import CaseLibrary from '../views/CaseLibrary.vue'  //  病例库列表页面
import ImagesList from '../views/ImagesList.vue'  //  图像库列表页面
import ImagesListDetails from '../views/ImagesListDetails.vue'  //  图像库详情页面
// ================================新版本 以上=========================================

// ===============================  H5 页面 ============================================
import intelGuide from '../views/h5pages/intelGuide.vue' // h5 智能导诊页面
import department from '../views/h5pages/department.vue' // h5 智能导诊页面

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location)
}
Vue.use(VueRouter)

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
        // { path: '/litgDetails', name: 'litgDetails', component: () => import('@/views/litgDetails'),meta:{requireAuth:true} },
        // { path: '/authorDetails', name: 'authorDetails', component: () => import('@/views/authorDetails'),meta:{requireAuth:true} },
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
  // ===================  新版本添加 以下 ==============================
  {
    path:'/FrontPage',
    name: 'FrontPage',
    component: FrontPage,
  },
  {
    path: '/RepositoryPage',
    name : 'RepositoryPage',
    component: RepositoryPage,
  },
  {
    path: '/NewDetails',
    name : 'NewDetails',
    component: NewDetails,
  },
  {
    path: '/SearchPages',
    name : 'SearchPages',
    component: SearchPages,
  },
  {
    path: '/departmentDisasePages',
    name : 'departmentDisasePages',
    component: departmentDisasePages,
  },
  {
    path: '/DocumentGuidePages',
    name : 'DocumentGuidePages',
    component: DocumentGuidePages,
  },
  {
    path: '/litgDetails',
    name : 'litgDetails',
    component: litgDetails,
  },
  {
    path: '/authorDetails',
    name : 'authorDetails',
    component: authorDetails,
  },
  {
    path: '/ImagesList',
    name : 'ImagesList',
    component: ImagesList,
  },
  {
    path: '/ImagesListDetails',
    name : 'ImagesListDetails',
    component: ImagesListDetails,
  },
  {
    path: '/CaseLibrary',
    name : 'CaseLibrary',
    component: CaseLibrary,
  },
  {
    path: '/intelGuide',
    name : 'intelGuide',
    component: intelGuide,
  },
  {
    path: '/department',
    name : 'department',
    component: department,
  },
  // ===================  新版本添加 以上  ==============================

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


console.log(process.env.BASE_URL)
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
