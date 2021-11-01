import axios from './axios'

// 提交注册信息
export const RegisterUserInfo = (params) =>{
    return axios.request({
        url:'/register',
        method: 'post',
        data: params   //  注意； post请求的 不能直接写params, 需要写上 data 对应的值为params
    })
}
//  登录api
export const LoginUserInfo = (params) =>{
  return axios.request({
    url:'/login',
    method: 'post',
    data: params
  })
}
//  首页左侧列表
export const WesternMedicine = (params) =>{
  return axios.request({
    url:'/zsk/index',
    method: 'get',
    data: params
  })
}
//  首页左侧文献单独列表
// export const WesternMedicine = (params) =>{
//   return axios.request({
//     url:'/zsk/doc/menu',
//     method: 'get',
//     data: params
//   })
// }
//  西医首页右侧列表
export const getHomeRightList = (params) =>{
  return axios.request({
    url:'/zsk/department/SickNess',
    method: 'post',
    data: params
  })
}
//  中医首页右侧列表
export const getzyHomeRightList = (params) =>{
  return axios.request({
    url:'/zsk/getZyList',
    method: 'post',
    data: params
  })
}
//  详情页右侧
export const getSickNess = (params) =>{
  return axios.request({
    url:'/zsk/SickNess/detail',
    method: 'post',
    data: params
  })
}
//  列表页搜索
export const getSearch = (params) =>{
  return axios.request({
    url:'/zsk/search',
    method: 'post',
    data: params
  })
}
//  详情页知识图谱搜索
export const getD3Search = (params) =>{
  return axios.request({
    url:'/zsk/detailGraph',
    method: 'post',
    data: params
  })
}
// 文献指南右侧列表及搜索
export const getLitgSearch = (params) =>{
  return axios.request({
    url:'/zsk/doc/index',
    method: 'post',
    data: params
  })
}
// 文献指南详情
export const getDocDetail = (params) =>{
  return axios.request({
    url:'/zsk/doc/detail',
    method: 'post',
    data: params
  })
}
// 作者详情
export const getAuthorDetail = (params) =>{
  return axios.request({
    url:'/zsk/author/detail',
    method: 'post',
    data: params
  })
}
// 获取文献气泡图
export const getDochots = (params) =>{
  return axios.request({
    url:'/zsk/doc/hots',
    method: 'post',
    data: params
  })
}
// 获取文献图谱
export const getd3Atlas = (params) =>{
  return axios.request({
    url:'/zsk/author/graph',
    method: 'post',
    data: params
  })
}
