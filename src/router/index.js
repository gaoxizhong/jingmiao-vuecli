import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'


// import Main from '../views/Main.vue'
import Login from '../views/login.vue'
import QAhome from '../views/QAhome.vue'
import VideoDetails from '../views/VideoDetails.vue'
import inquiryResultPage from '../views/inquiryResultPage.vue'
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
import structureCopy from '../views/structureCopy.vue'  //  指南脑图结构文案页面
import drugTarget from '../views/drugTarget.vue'  //  药物靶点页面
import brainMap from '../views/brainMap.vue'  //  脑图页面
import guideDetails from '../views/guideDetails.vue'  //  诊断指南

// ===============================  H5 页面 ============================================
import intelGuide from '../views/h5pages/intelGuide.vue' // h5 智能导诊页面
import department from '../views/h5pages/department.vue' // h5 智能导诊页面

// ================================ 科研灵感模块 =========================================
import researchHome from '../views/researchPages/researchHome.vue'  //  科研灵感主页






const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/QAhome',
    name: 'QAhome',
    component: QAhome,
    meta:{
      title:'智能问答',
      requireAuth:true
    }
  },
  {
    path: '/',
    name: 'Main',
    component: () => import('@/App'),
    redirect: 'SearchPages',
    children: [
      {
        path: 'SearchPages',
        name : 'SearchPages',
        component: SearchPages,
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
      { 
        path: '/textTranslation',
        name: 'textTranslation',
        component: () => import('@/views/translation/textTranslation.vue'),
        meta: {
          title:'文字翻译',
          keepAlive: true,
          scollTopPosition: 0,
          requireAuth:true
        }
      },
      { 
        path: '/fileTranslation',
        name: 'fileTranslation',
        component: () => import('@/views/translation/fileTranslation.vue'),
        meta: {
          title:'文档翻译',
          keepAlive: true,
          scollTopPosition: 0,
          requireAuth:true
        }
      },
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
      {
        path: '/structureCopy',
        name : 'structureCopy',
        component: structureCopy,
      },
      {
        path: '/drugTarget',
        name : 'drugTarget',
        component: drugTarget,
      },
      {
        path: '/brainMap',
        name : 'brainMap',
        component: brainMap,
      },
      {
        path: '/guideDetails',
        name : 'guideDetails',
        component: guideDetails,
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
    ]
  },
  // {
  //   path:'/Main',
  //   name:'Main',
  //   component: Main,
  //   children: [
  //       { path: '/Home',
  //         name: 'home',
  //         component: () => import('@/views/Home'),
  //           meta: {
  //             keepAlive: true,
  //             scollTopPosition: 0,
  //             requireAuth:true
  //           }
  //       },
  //       { path: '/zyHome',
  //         name: 'zyHome',
  //         component: () => import('@/views/zyHome'),
  //         meta: {
  //           keepAlive: true,
  //           scollTopPosition: 0,
  //           requireAuth:true
  //         }
  //       },
  //       { path: '/litgHome',
  //         name: 'litgHome',
  //         component: () => import('@/views/litgHome'),
  //         meta: {
  //           keepAlive: true,
  //           scollTopPosition: 0,
  //           requireAuth:true
  //         }
  //       },
  //       { path: '/Details',
  //         name: 'Details',
  //         component: () => import('@/views/Details'),
  //         meta: {
  //           keepAlive: true,
  //           scollTopPosition: 0,
  //           requireAuth:true
  //         }
  //       },
  //       { path: '/LcsyHome',
  //         name: 'LcsyHome',
  //         component: () => import('@/views/LcsyHome'),
  //         meta: {
  //           keepAlive: true,
  //           scollTopPosition: 0,
  //           requireAuth:true
  //         }
  //       },
  //       { path: '/LcsyDetails',
  //         name: 'LcsyDetails',
  //         component: () => import('@/views/LcsyDetails'),
  //         meta:{requireAuth:true}

  //       },
  //       { path: '/VideoHome',
  //         name: 'VideoHome',
  //         component: () => import('@/views/VideoHome'),
  //         meta: {
  //           keepAlive: true,
  //           scollTopPosition: 0,
  //           requireAuth:true
  //         }
  //       },
  //   ]
  // },

  {  // 科研灵感界面
    path: '/researchHome',
    name : 'researchHome',
    component: researchHome,
    children:[
      { 
        path: '/popularLiterature', // 文献默认页面 --- 热门推荐
        name: 'popularLiterature',
        component: () => import('@/views/researchPages/popularLiterature'),
        meta: {
          keepAlive: true,
          scollTopPosition: 0,
          requireAuth:true
        }
      },
      { 
        path: '/literatureDetails', // 文献默认页面 --- 文献详情页
        name: 'literatureDetails',
        component: () => import('@/views/researchPages/literatureDetails'),
        meta: {
          keepAlive: false, // 刷新不缓存
          scollTopPosition: 0,
          requireAuth:true
        }
      },
      { 
        path: '/myFavorite', //  --- 我收藏的
        name: 'myFavorite',
        component: () => import('@/views/researchPages/myFavorite'),
        meta: {
          keepAlive: false,
          scollTopPosition: 0,
          requireAuth:true
        }
      },
      { 
        path: '/literatureAuthor', //  --- 作者详情页
        name: 'literatureAuthor',
        component: () => import('@/views/researchPages/literatureAuthor'),
        meta: {
          keepAlive: false,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
      { 
        path: '/scholarAnalysis', //  --- 学者分析首页
        name: 'scholarAnalysis',
        component: () => import('@/views/researchPages/scholarAnalysis'),
        meta: {
          keepAlive: true,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
      { 
        path: '/scholarAnalysisDetails', //  --- 学者分析详情页
        name: 'scholarAnalysisDetails',
        component: () => import('@/views/researchPages/scholarAnalysisDetails'),
        meta: {
          keepAlive: false,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
      { 
        path: '/subjectAnalysis', //  --- 学科分析首页
        name: 'subjectAnalysis',
        component: () => import('@/views/researchPages/subjectAnalysis'),
        meta: {
          keepAlive: true,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
      { 
        path: '/journalAnalysis', //  --- 期刊分析首页
        name: 'journalAnalysis',
        component: () => import('@/views/researchPages/journalAnalysis'),
        meta: {
          keepAlive: true,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
      { 
        path: '/journalDetails', //  --- 期刊分析详情页
        name: 'journalDetails',
        component: () => import('@/views/researchPages/journalDetails'),
        meta: {
          keepAlive: false,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
      { 
        path: '/useTutorial', //  --- 使用教程
        name: 'useTutorial',
        component: () => import('@/views/researchPages/useTutorial'),
        meta: {
          keepAlive: true,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
      { 
        path: '/institutionalAnalysis', //  --- 机构分析首页
        name: 'institutionalAnalysis',
        component: () => import('@/views/researchPages/institutionalAnalysis'),
        meta: {
          keepAlive: false,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
      { 
        path: '/user-center', //  --- 个人中心
        name: 'userCenter',
        component: () => import('@/views/researchPages/userCenter'),
        meta: {
          title: '个人中心',
          keepAlive: true,
          scollTopPosition: 0,
          requireAuth:true,
        }
      },
    ]
  },

]

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.dispatch("setToken",window.localStorage.getItem('token'));
}

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})
const whiteList = ['/login']; // 添加路由白名单
//路由判断
router.beforeEach(async (to, from, next) => {
  const token = window.localStorage.getItem('token');
  // 页面刷新时，重新赋值token
  if(token){
    store.dispatch("setToken",token);
    next();
  }else{
    if (whiteList.indexOf(to.path) !== -1) {
      // 在白名单内直接放行
      next();
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面。
      next(`/login?redirect=${to.path}`);
    }
  }

  if(to.path == from.path ){
    // 让 列表页 即不缓存，刷新
    to.meta.keepAlive = false; 
  }
  if(to.path == '/popularLiterature' && from.path == '/user-center' ){
    to.meta.keepAlive = false; 
  }
  next()

})
// console.log(process.env.BASE_URL)
router.afterEach((to) => {
  if(to.meta.title){
    document.title = to.meta.title
  }else{
    document.title = '菁苗健康'
  }
  window.scrollTo(0,0);

})

router.beforeEach(async(to, from, next) => {
  // to要进入的目标路由,到哪去from离开的路由
  //判断是否需要缓存
  if(to.path == from.path ){
    // 让 列表页 即不缓存，刷新
    to.meta.keepAlive = false; 
  }
  next()
})

// router.beforeEach(async(to, from, next) => {
//   // to要进入的目标路由,到哪去from离开的路由
//   //判断是否需要缓存
//   if(to.path == 'text' && from.path =='/orderInfo'){
//     // 让 列表页 缓存，即不刷新
//     to.meta.keepAlive = true;  
//   }else {
//      // 让 列表页 即不缓存，刷新
//     to.meta.keepAlive = false; 
//   }
//   next()
// })

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
