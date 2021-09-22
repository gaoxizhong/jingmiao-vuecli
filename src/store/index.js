import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex)
const state ={
  isAuthenticated: false,  // 是否授权认证
  suer: {},   // 用户信息存储,
  token:'',
  list_id:'',
  isCollapse: false // 左侧折叠状态
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
  }
})
