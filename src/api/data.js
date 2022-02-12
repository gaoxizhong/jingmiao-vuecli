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
// 问答接口
export const getQuestion = (params) =>{
  return axios.request({
    url:'/zsk/qw',
    method: 'post',
    data: params
  })
}
// 临床试验、临床路径
export const getDepartment = (params) =>{
  return axios.request({
    url:'/zsk/department/SickNess',
    method: 'post',
    data: params
  })
}
// 视频列表
export const getVideoList = (params) =>{
  return axios.request({
    url:'/video',
    method: 'post',
    data: params
  })
}
// 视频阅读量
export const getVideoRecordPv = (params) =>{
  return axios.request({
    url:'/recordPv',
    method: 'post',
    data: params
  })
}
//cdss 获取西医问诊列表
export const getWesternSymptomList = (params) =>{
  return axios.request({
    url:'/cdss',
    method: 'post',
    data: params
  })
}
// cdss 结束问诊按钮
export const clickFinishBtn = (params) =>{
  return axios.request({
    url:'/result',
    method: 'post',
    data: params
  })
}
// cdss 点击疑似病例列表
export const clickYsbl = (params) =>{
  return axios.request({
    url:'/about_result',
    method: 'post',
    data: params
  })
}
