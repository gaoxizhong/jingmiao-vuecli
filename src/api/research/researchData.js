import researchAxios from './researchAxios'
// =================  科研探索api  ↓ ==================
// 首页分类浏览列表
export const getClassBrowseList = (params) =>{  
  return researchAxios.request({
    url:'/index',
    method: 'post',
    data: params
  })
}
// 文献默认首页
export const getEsIndex = (params) =>{
  return researchAxios.request({
    url:'/es-index',
    method: 'post',
    data: params
  })
}
// 文献首页普通检索右侧推荐
export const getSingleRecommendDisease = (params) =>{
  return researchAxios.request({
    url:'/es-single-recommend-disease',
    method: 'post',
    data: params
  })
}
// 文献详情页
export const literatureDetails = (params) =>{
  return researchAxios.request({
    url:'/es-detail',
    method: 'post',
    data: params
  })
}
// 文献首页搜索
export const literatureDocSearch = (params) =>{
  return researchAxios.request({
    url:'/doc-search',
    method: 'post',
    data: params
  })
}
// 期刊分析首页
export const journalAnalysisIndex = (params) =>{
  return researchAxios.request({
    url:'/es-album-index',
    method: 'post',
    data: params
  })
}
// 期刊详情页
export const journalAnalysisDetail = (params) =>{
  return researchAxios.request({
    url:'/es-album-detail',
    method: 'post',
    data: params
  })
}
// 文献搜索历史记录
export const getliteratureHistory = (params) =>{
  return researchAxios.request({
    url:'/es-history',
    method: 'post',
    data: params
  })
}
// 期刊详情相关文献
export const getalbumRecommend = (params) =>{
  return researchAxios.request({
    url:'/album-recommend',
    method: 'post',
    data: params
  })
}
// 文献详情页相关文献
export const getdocRecommend = (params) =>{
  return researchAxios.request({
    url:'/doc-recommend',
    method: 'post',
    data: params
  })
}
//点击收藏
export const clickCollection = (params) =>{
  return researchAxios.request({
    url:'/es-collection',
    method: 'post',
    data: params
  })
}
// 查看我的收藏
export const getMyCollection = (params) =>{
  return researchAxios.request({
    url:'/es-my-collection',
    method: 'post',
    data: params
  })
}
// 文献首页---- 换一批
export const getRandomDoc = (params) =>{
  return researchAxios.request({
    url:'/es-random-doc',
    method: 'post',
    data: params
  })
}
// 学者分析首页列表
export const getAuthorIndex = (params) =>{
  return researchAxios.request({
    url:'/es-author-index',
    method: 'post',
    data: params
  })
}
// 学者分析详情页 -- 分析接口
export const getAnalysisDetail = (params) =>{
  return researchAxios.request({
    url:'/es-author-detail',
    method: 'post',
    data: params
  })
}
// 学者分析首页 -- 开始分析
export const getAnalysisSearch = (params) =>{
  return researchAxios.request({
    url:'/es-author-search',
    method: 'post',
    data: params
  })
}
// 文献点击相关作者获取机构名
export const getTitleOrganization = (params) =>{
  return researchAxios.request({
    url:'/es-get-organization',
    method: 'post',
    data: params
  })
}
// 机构分析详情页
export const getOrganizationDetail = (params) =>{
  return researchAxios.request({
    url:'/es-organization-detail',
    method: 'post',
    data: params
  })
}

// 学科分析接口
export const getDepartmentIndex = (params) =>{
  return researchAxios.request({
    url:'/es-department-index',
    method: 'post',
    data: params
  })
}
// 学科分析接口
export const getRelationRecommend = (params) =>{
  return researchAxios.request({
    url:'/es-relation-recommend',
    method: 'post',
    data: params
  })
}

// 清除历史记录
export const clearHistory = (params) =>{
  return researchAxios.request({
    url:'/es-clear-history',
    method: 'post',
    data: params
  })
}
// 文献检索模糊匹配
export const searchTip = (params) =>{
  return researchAxios.request({
    url:'/search-tip',
    method: 'post',
    data: params
  })
}
// 学者分析检索匹配机构
export const getAuthorOrganization = (params) =>{
  return researchAxios.request({
    url:'/es-get-select-organization',
    method: 'post',
    data: params
  })
}

// 文献高级检索匹配关键词
export const getRecommendDisease = (params) =>{
  return researchAxios.request({
    url:'/es-recommend-disease',
    method: 'post',
    data: params
  })
}
// 学科分析匹配关键词
export const getXkfxDiseases = (params) =>{
  return researchAxios.request({
    url:'/es-search-diseases',
    method: 'post',
    data: params
  })
}
//学科分析/全部文献接口
export const getXkfxEsDocument = (params) =>{
  return researchAxios.request({
    url:'/es-all-document',
    method: 'post',
    data: params
  })
}
//文献中英切换
export const getSetLanguage = (params) =>{
  return researchAxios.request({
    url:'/set-language',
    method: 'post',
    data: params
  })
}
//个人中心
export const getProfile = (params) =>{
  return researchAxios.request({
    url:'/profile',
    method: 'post',
    data: params
  })
}
// 文献收藏添加标签
export const collectionAddTags = (params) =>{
  return researchAxios.request({
    url:'/es-collection-tags',
    method: 'post',
    data: params
  })
}
// =================  科研探索api  ↑ ==================