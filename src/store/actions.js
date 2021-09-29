export const setIsAuthenticated = ({commit},data) =>{
  // 'setIsAuthenticated' 的名字要跟 mutations里的名字要一样
  commit('setIsAuthenticated',data);
}
export const setUser = ({commit},data) =>{
  commit('setUser',data);
}
export const getlist_id = ({commit},data) =>{
  commit('getlist_id',data);
}
export const setToken = ({commit},data) =>{
  commit('setToken',data);
}
export const delToken = ({commit},data) =>{
  commit('delToken',data);
}
export const menuBtn = ({commit},data) =>{
  commit('menuBtn',data);
}
export const sickNess = ({commit},data) =>{
  commit('sickNess',data);
}
export const sickIndex = ({commit},data) =>{
  commit('sickIndex',data);
}
export const sickIdx = ({commit},data) =>{
  commit('sickIdx',data);
}
export const inputName = ({commit},data) =>{
  commit('inputName',data);
}

