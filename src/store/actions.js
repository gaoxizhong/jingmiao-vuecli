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

export const setStateurl = ({commit},data) =>{
  commit('setStateurl',data);
}
export const delStateurl = ({commit},data) =>{
  commit('delStateurl',data);
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
export const hotName = ({commit},data) =>{
  commit('hotName',data);
}
export const crumbsarr = ({commit},data) =>{
  commit('crumbsarr',data);
}
export const barckArr = ({commit},data) =>{
  commit('barckArr',data);
}
export const cdssInfo = ({commit},data) =>{
  commit('cdssInfo',data);
}
export const is_pom = ({commit},data) =>{
  commit('is_pom',data);
}
export const headerNavItems = ({commit},data) =>{
  commit('headerNavItems',data);
}
