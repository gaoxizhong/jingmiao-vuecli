export const setIsAuthenticated = ({commit},data) =>{
  // 'setIsAuthenticated' 的名字要跟 mutations里的名字要一样
  commit('setIsAuthenticated',data);
}
export const setUser = ({commit},data) =>{
  commit('setUser',data);
}
export const setToken = ({commit},data) =>{
  commit('setToken',data);
}
export const delToken = ({commit},data) =>{
  commit('delToken',data);
}
