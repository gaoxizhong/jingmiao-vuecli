import CDSSiframeAxios from './CDSSiframeAxios'

// cdss 西医问诊 保存按钮
export const clickFinishBtn = (params) =>{
  return CDSSiframeAxios.request({
    // url:'/result',
    url:'/advisory/submit',
    method: 'post',
    data: params
  })
}
// cdss 点击疑似病例列表
export const clickYsbl = (params) =>{
  return CDSSiframeAxios.request({
    url:'/about_result',
    method: 'post',
    data: params
  })
}
// 知识库新详情
export const getNewBaseDetail = (params) =>{  
  return CDSSiframeAxios.request({
    url:'/new/detail',
    method: 'post',
    data: params
  })
}